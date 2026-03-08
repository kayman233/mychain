# OAuth Social Recovery: Архитектура и анализ

## Оглавление

1. [Обзор архитектуры](#обзор-архитектуры)
2. [Компоненты системы](#компоненты-системы)
3. [Потоки данных](#потоки-данных)
4. [Анализ безопасности](#анализ-безопасности)
5. [Текущие проблемы и TODO](#текущие-проблемы-и-todo)
6. [Файловая структура](#файловая-структура)

---

## Обзор архитектуры

Система расширяет механизм social recovery для абстрактных аккаунтов (Abstract Accounts) на CosmWasm,
добавляя возможность использовать Google-аккаунты в качестве гардианов.

### Ключевой принцип

JWT-токен Google **не попадает на блокчейн**. Вместо этого используется паттерн
**off-chain attestor**: доверенный сервер верифицирует JWT через Google API,
а затем выдаёт подписанный attestation, который отправляется в смарт-контракт.
Контракт проверяет только подпись attestor'а (secp256k1), не зная содержимого JWT.

### Высокоуровневая схема

```
┌───────────┐       ┌──────────────┐       ┌────────────────┐       ┌────────────┐
│  Браузер  │──JWT──▶  Attestor    │──sub──▶  Google API     │       │            │
│  (клиент) │       │  /api/oauth- │◀──ok───  tokeninfo      │       │  CosmWasm  │
│           │◀─proof─  attest      │       └────────────────┘       │  контракт  │
│           │       └──────────────┘                                │            │
│           │──attestation+sig─────────────────────────────────────▶│  verify    │
│           │◀─tx result───────────────────────────────────────────│  secp256k1 │
└───────────┘                                                       └────────────┘
```

---

## Компоненты системы

### 1. Смарт-контракт (`social-recovery`)

**Расположение:** `cosmwasm/contracts/social-recovery/`

#### Хранилище (state.rs)

| Ключ                       | Тип                         | Описание                                                   |
|----------------------------|-----------------------------|------------------------------------------------------------|
| `GUARDIANS`                | `Item<Vec<Addr>>`           | Cosmos-адреса гардианов                                    |
| `THRESHOLD`                | `Item<u64>`                 | Порог голосов для восстановления                           |
| `VOTES`                    | `Map<&Addr, Binary>`        | Голоса Cosmos-гардианов (адрес → pubkey)                   |
| `COUNTS`                   | `Map<&str, u64>`            | Общий счётчик голосов за pubkey (объединённый)             |
| `OAUTH_GUARDIANS`          | `Item<Vec<OAuthGuardian>>`  | Список OAuth-гардианов (provider + sub_hash)               |
| `OAUTH_CONFIG`             | `Item<OAuthConfig>`         | Настройки OAuth (issuer, audience, attestor_pubkey)        |
| `OAUTH_VOTES`              | `Map<&str, Binary>`         | Голоса OAuth-гардианов (sub_hash → pubkey)                 |
| `OAUTH_SHARES`             | `Map<&str, Binary>`         | Зашифрованные Shamir-доли (sub_hash → encrypted share)     |
| `OAUTH_USED_ATTESTATIONS`  | `Map<&str, bool>`           | Использованные nonce для replay protection                 |

#### Execute-сообщения (OAuth)

| Сообщение           | Описание                                                  |
|---------------------|-----------------------------------------------------------|
| `RecoverWithOAuth`  | OAuth-гардиан голосует за новый pubkey                    |
| `RevokeOAuth`       | OAuth-гардиан отзывает свой голос                         |
| `StoreOAuthShare`   | Сохранение зашифрованной Shamir-доли через OAuth          |

#### Query-сообщения (OAuth)

| Запрос                | Описание                                          |
|-----------------------|---------------------------------------------------|
| `OAuthGuardiansList`  | Список зарегистрированных OAuth-гардианов         |
| `OAuthVotes`          | Текущие голоса OAuth-гардианов                    |
| `OAuthConfigQuery`    | Текущая OAuth-конфигурация                        |
| `GetOAuthShare`       | Получение зашифрованной доли по sub_hash          |

#### Верификация attestation (execute.rs)

Функция `verify_oauth_attestation` проверяет:

1. **Наличие конфигурации** — `OAUTH_CONFIG` и `attestor_pubkey` существуют
2. **Provider** — строго `"google"` (case-insensitive)
3. **Contract binding** — `attestation.contract == env.contract.address`
4. **Chain binding** — `attestation.chain_id == env.block.chain_id`
5. **Action matching** — действие совпадает с ожидаемым
6. **Sub hash формат** — 64 hex-символа (валидный SHA-256)
7. **Nonce** — не пустой
8. **Expiration** — `block.time <= expires_at`
9. **Payload consistency** — `new_pubkey` и `share_hash` соответствуют действию
10. **Replay protection** — nonce ещё не использован
11. **Подпись** — secp256k1 верификация `SHA-256(signing_message)` относительно `attestor_pubkey`

Формат signing message:
```
oauth_attestation:v1:{provider}:{contract}:{chain_id}:{sub_hash}:{action}:{new_pubkey}:{share_hash}:{nonce}:{expires_at}
```

### 2. Off-chain Attestor (`/api/oauth-attest`)

**Расположение:** `client/pages/api/oauth-attest.ts`

#### Логика работы

1. Принимает `{ idToken, contract, chainId, action, newPubkey?, value? }`
2. Проверяет rate limit по IP (20 запросов/мин по умолчанию)
3. Верифицирует JWT через `https://oauth2.googleapis.com/tokeninfo`
4. Проверяет issuer (`accounts.google.com` или `https://accounts.google.com`)
5. Проверяет audience (совпадение с `GOOGLE_CLIENT_ID`)
6. Проверяет expiration
7. Вычисляет `sub_hash = SHA-256(sub)` (hex)
8. Для `store_share`: вычисляет `share_hash = SHA-256(value)` (hex)
9. Генерирует случайный nonce (16 байт hex)
10. Устанавливает `expires_at = now + TTL` (по умолчанию 180 сек)
11. Формирует `OAuthAttestation` и подписывает `SHA-256(signing_message)` ключом attestor'а
12. Возвращает `{ attestation, signature }` — `OAuthAttestationProof`

#### Режимы подписи

- **Локальный ключ:** `OAUTH_ATTESTOR_PRIVKEY_HEX` — secp256k1 приватный ключ в hex
- **Удалённый сервис:** `OAUTH_ATTEST_SIGNER_URL` — HTTP POST к внешнему signing service

#### Переменные окружения

| Переменная                       | Обязательная | Описание                                      |
|----------------------------------|-------------|-----------------------------------------------|
| `GOOGLE_CLIENT_ID`               | Да*         | Google OAuth Client ID для верификации audience|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID`   | Да*         | Альтернатива (доступна и клиенту)             |
| `OAUTH_ATTESTOR_PRIVKEY_HEX`    | Да**        | Приватный ключ attestor'а (32 байта hex)      |
| `OAUTH_ATTEST_SIGNER_URL`       | Да**        | URL удалённого signing-сервиса                |
| `OAUTH_ATTEST_SIGNER_API_KEY`   | Нет         | API-ключ для удалённого сервиса               |
| `OAUTH_ATTESTATION_TTL_SEC`     | Нет         | TTL attestation'а (по умолч. 180 сек)         |
| `OAUTH_ATTEST_RATE_WINDOW_MS`   | Нет         | Окно rate limit'а (по умолч. 60000 мс)        |
| `OAUTH_ATTEST_RATE_MAX`         | Нет         | Макс. запросов в окне (по умолч. 20)          |

\* Нужен хотя бы один из двух
\** Нужен хотя бы один из двух

### 3. Endpoint публичного ключа (`/api/oauth-attestor-pubkey`)

**Расположение:** `client/pages/api/oauth-attestor-pubkey.ts`

Возвращает compressed secp256k1 pubkey attestor'а в base64.
Используется при инстанциации контракта для записи `attestor_pubkey` в `OAuthConfig`.

### 4. Клиентский React-компонент (`OAuthRecovery`)

**Расположение:** `client/components/react/oauth-recovery.tsx`

- Использует Google Identity Services (GIS) для входа через Google
- Получает `id_token` (JWT) через GIS callback
- Отправляет JWT на `/api/oauth-attest` для получения attestation
- Отправляет `RecoverWithOAuth { attestation, new_pubkey }` в контракт

### 5. Хук `useGoogleOAuth`

**Расположение:** `client/hooks/useGoogleOAuth.tsx`

- Динамически загружает GIS-скрипт (`ensureGisLoaded`)
- Декодирует JWT payload для отображения email/sub
- Вычисляет `sub_hash` через Web Crypto `SHA-256`

---

## Потоки данных

### Регистрация OAuth-гардиана

```
1. Владелец аккаунта вычисляет sub_hash для Google-аккаунта гардиана
2. При инстанциации контракта указывает:
   - oauth_guardians: [{ provider: "google", sub_hash: "<sha256_hex>" }]
   - oauth_config: {
       google_issuer: "https://accounts.google.com",
       expected_audience: "<google-client-id>",
       max_clock_skew: 120,
       attestor_pubkey: "<base64 compressed pubkey>"
     }
```

### Голосование за восстановление

```
1. OAuth-гардиан входит через Google → получает id_token (JWT)
2. Клиент отправляет POST /api/oauth-attest:
   { idToken, contract, chainId, action: "recover", newPubkey }
3. Attestor:
   a) Верифицирует JWT через Google tokeninfo API
   b) Извлекает sub, вычисляет sub_hash
   c) Формирует OAuthAttestation с nonce и expires_at
   d) Подписывает signing_message secp256k1 ключом
   e) Возвращает OAuthAttestationProof
4. Клиент отправляет транзакцию в контракт:
   ExecuteMsg::RecoverWithOAuth { attestation: proof, new_pubkey }
5. Контракт:
   a) Верифицирует attestation (подпись, contract, chain, expiry, nonce)
   b) Проверяет что sub_hash — зарегистрированный гардиан
   c) Проверяет что гардиан ещё не голосовал
   d) Помечает nonce как использованный
   e) Увеличивает счётчик голосов в COUNTS
   f) Если count >= threshold → обновляет PUBKEY
```

### Сохранение Shamir-доли

```
1. OAuth-гардиан входит через Google → id_token
2. POST /api/oauth-attest { ..., action: "store_share", value: "<base64 share>" }
3. Attestor верифицирует JWT, вычисляет share_hash = SHA-256(value)
4. Контракт проверяет attestation + что sub_hash — гардиан
5. Сохраняет долю в OAUTH_SHARES[sub_hash]
```

---

## Анализ безопасности

### Что реализовано корректно

1. **JWT не попадает на блокчейн** — основная проблема предыдущей версии решена.
   Attestation содержит только `sub_hash`, приватные данные из JWT не утекают.

2. **Replay protection** — каждый attestation имеет уникальный nonce, который
   сохраняется в `OAUTH_USED_ATTESTATIONS`. Повторное использование невозможно.

3. **Contract/chain binding** — attestation привязан к конкретному контракту
   и chain_id. Переиспользование между контрактами или сетями невозможно.

4. **Expiration** — attestation имеет TTL (по умолчанию 180 секунд),
   после чего контракт отклонит его.

5. **Action-specific payload validation** — для `Recover` обязателен `new_pubkey`,
   для `StoreShare` обязателен `share_hash`, для `Revoke` — оба отсутствуют.
   Контракт проверяет consistency между attestation и фактическими аргументами.

6. **Проверка провайдера** — `is_google_guardian` проверяет и `sub_hash`, и `provider`.

7. **Проверка гардиана в `store_oauth_share`** — функция проверяет, что вызывающий
   зарегистрирован как OAuth-гардиан.

8. **Underflow protection** — `revoke_oauth` проверяет `count == 0` перед декрементом.

9. **Rate limiting** — attestor ограничивает запросы по IP.

10. **Remote signer support** — приватный ключ attestor'а может храниться
    на отдельном сервисе (HSM, KMS), а не в переменных окружения.

11. **Threshold validation** — `instantiate` проверяет `threshold > 0`.

12. **Единый COUNTS** — голоса Cosmos-гардианов и OAuth-гардианов учитываются
    в общем пуле. Это позволяет гибко комбинировать типы гардианов.

### Модель доверия

Attestor является **доверенным посредником** (trusted third party). Это компромисс:

| Аспект                 | On-chain JWT                  | Attestor-паттерн                   |
|------------------------|-------------------------------|------------------------------------|
| Приватность            | JWT виден на блокчейне        | Только sub_hash на блокчейне       |
| Доверие                | Trustless (верификация on-chain) | Доверие attestor'у              |
| Зависимости            | RSA-библиотеки on-chain       | Минимальный контракт               |
| Gas-стоимость          | Высокая (RSA верификация)     | Низкая (secp256k1)                 |
| Точка отказа           | Google JWKS ротация           | Attestor-сервер                    |

---

## Текущие проблемы и TODO

### Критические

#### 1. `OAUTH_USED_ATTESTATIONS` растёт бесконечно

**Файл:** `state.rs:20`, `execute.rs:319-332`

Map `OAUTH_USED_ATTESTATIONS` только пополняется, но никогда не очищается.
Со временем это приведёт к неограниченному росту хранилища контракта.

**Решение:** Добавить механизм очистки старых nonce.
Например, хранить `(nonce_key, expires_at)` и периодически удалять записи,
у которых `expires_at < block.time`. Или при проверке nonce: если `expires_at`
attestation'а уже прошёл, можно безопасно удалять запись (attestation всё равно
будет отклонён по expiration).

#### 2. Мёртвый код: `jwt.rs` и `rsa_verify.rs`

**Файлы:** `cosmwasm/contracts/social-recovery/src/jwt.rs`, `rsa_verify.rs`

Эти модули не подключены в `lib.rs` и не используются новой архитектурой.
Однако зависимости `rsa`, `sha2`, `serde_json_wasm` могут оставаться в `Cargo.toml`,
увеличивая размер Wasm-бинарника.

**Решение:** Удалить файлы `jwt.rs` и `rsa_verify.rs`.
Убрать неиспользуемые зависимости из `Cargo.toml` (если `rsa`, `sha2`,
`serde_json_wasm`, `base64` больше нигде не нужны).

#### 3. Attestor — единая точка отказа и доверия

Если attestor-сервер скомпрометирован (утечка приватного ключа),
атакующий может генерировать произвольные attestation'ы для любого sub_hash.
Это позволит:
- Голосовать от имени любого OAuth-гардиана
- Перезаписывать Shamir-доли
- Потенциально провести полное восстановление без ведома гардианов

**Решения (по мере сложности):**
- **Минимум:** Использовать remote signer (HSM/KMS) вместо локального ключа
- **Улучшение:** Добавить мониторинг и alerting на аномальные attestation'ы
- **Идеально:** Схема multi-attestor (N-of-M attestor'ов должны подписать)

#### 4. Отсутствует механизм ротации ключа attestor'а

Если ключ attestor'а нужно заменить (компрометация, плановая ротация),
необходим вызов от самого контракта для обновления `attestor_pubkey` в `OAuthConfig`.
Сейчас для этого нет отдельного `ExecuteMsg` — нужно переинстанциировать контракт
или добавить `UpdateOAuthConfig` сообщение.

**Решение:** Добавить `ExecuteMsg::UpdateOAuthConfig { ... }` с проверкой `assert_self`.

### Средние

#### 5. Codegen типы могут рассинхронизироваться

**Файл:** `client/codegen/SocialRecovery.client.ts`

Клиентский codegen сгенерирован ts-codegen и может содержать устаревшие методы
(например, `updateGoogleJwks`, `googleJwks` из предыдущей версии).
Необходимо перегенерировать после каждого изменения msg.rs.

**Решение:** Запустить `cargo schema` + `ts-codegen generate` и убедиться,
что клиентские типы и методы соответствуют текущему контракту.

#### 6. Google tokeninfo endpoint — потенциальная задержка

**Файл:** `client/pages/api/oauth-attest.ts:88`

Attestor вызывает `https://oauth2.googleapis.com/tokeninfo` синхронно.
Если Google API медленно отвечает или недоступен, attestor зависнет.

**Решение:** Добавить timeout на вызов `fetchTokenInfo` (аналогично `signWithRemoteSigner`).

#### 7. Rate limit хранится в памяти процесса

**Файл:** `client/pages/api/oauth-attest.ts:58-61`

`global.__oauthAttestRateLimit` привязан к процессу Node.js.
В serverless-окружении (Vercel, AWS Lambda) каждый инвайт — новый процесс,
rate limit не работает. При множественных инстансах — тоже.

**Решение:** Для продакшена использовать Redis, Upstash или аналог.

#### 8. `handleStoreOAuthShare` убран из UI, но логика в контракте есть

**Файл:** `client/components/react/oauth-recovery.tsx`

В обновлённом UI-компоненте функция `handleStoreOAuthShare` удалена,
хотя контракт поддерживает `StoreOAuthShare`.
Нет UI для сохранения и получения Shamir-долей через OAuth.

**Решение:** Добавить UI для `StoreOAuthShare` и `GetOAuthShare`,
либо задокументировать, что эта функциональность доступна только через CLI/API.

### Незначительные

#### 9. Дублирование проверки nonce

**Файл:** `execute.rs:409` и `execute.rs:323-331`

Функция `verify_oauth_attestation` проверяет nonce на строке 409,
а затем `consume_oauth_attestation_nonce` проверяет ещё раз на строке 323.
Дублирование безвредно (CosmWasm однопоточный), но избыточно.

**Решение:** Убрать проверку из `verify_oauth_attestation` и оставить
только в `consume_oauth_attestation_nonce`, который и сохраняет запись.

#### 10. `OAuthConfig.google_issuer` и `max_clock_skew` не используются

**Файл:** `types.rs:12-14`

В новой архитектуре контракт не верифицирует JWT напрямую,
поэтому поля `google_issuer`, `expected_audience` и `max_clock_skew`
в `OAuthConfig` не используются on-chain. Они были нужны для предыдущей
архитектуры с on-chain JWT-верификацией.

**Решение:** Удалить неиспользуемые поля из `OAuthConfig`,
оставить только `attestor_pubkey`. Или оставить для информационных целей
(query по `OAuthConfigQuery`), но тогда это просто метаданные.

#### 11. Подпись attestor'а: формат secp256k1

**Файл:** `oauth-attest.ts:288`, `execute.rs:416`

`@noble/secp256k1` v2 по умолчанию создаёт low-S подписи
и возвращает compact формат (64 байта: r || s).
CosmWasm `secp256k1_verify` ожидает такой же формат.
Совместимость должна быть ок, но стоит покрыть интеграционным тестом.

---

## Файловая структура

```
cosmwasm/contracts/social-recovery/
├── Cargo.toml
└── src/
    ├── lib.rs              # Подключение модулей
    ├── contract.rs         # Entry points: instantiate, sudo, execute, query
    ├── execute.rs          # Бизнес-логика (recovery, OAuth, shares)
    ├── query.rs            # Query-хендлеры
    ├── msg.rs              # Сообщения (InstantiateMsg, ExecuteMsg, QueryMsg)
    ├── state.rs            # Определения хранилища
    ├── types.rs            # Типы (OAuthGuardian, OAuthAttestation, etc.)
    ├── error.rs            # Ошибки контракта
    ├── jwt.rs              # ⚠️ МЁРТВЫЙ КОД (предыдущая архитектура)
    └── rsa_verify.rs       # ⚠️ МЁРТВЫЙ КОД (предыдущая архитектура)

client/
├── hooks/
│   └── useGoogleOAuth.tsx      # Хук для Google Identity Services
├── components/react/
│   └── oauth-recovery.tsx      # UI-компонент OAuth recovery
├── pages/api/
│   ├── oauth-attest.ts         # Attestor endpoint
│   └── oauth-attestor-pubkey.ts # Pubkey endpoint
├── codegen/
│   ├── SocialRecovery.client.ts # Авто-сгенерированный клиент
│   └── SocialRecovery.types.ts  # Авто-сгенерированные типы
└── pages/
    └── _document.tsx           # Google GIS script loading
```

---

## Итоговая оценка

Обновлённая архитектура **значительно лучше** предыдущей версии:

- Решена главная проблема утечки JWT на блокчейн
- Добавлена replay protection с nonce
- Добавлен binding к контракту и chain
- Добавлена expiration для attestation'ов
- Добавлена проверка гардианов при хранении shares
- Удалены тяжёлые RSA-зависимости из on-chain кода

Основной компромисс — **доверие attestor-серверу**, который является
центральной точкой верификации. Для учебного/демонстрационного проекта
это приемлемо. Для продакшена необходимо усиление через HSM/KMS,
мониторинг и, в идеале, multi-attestor схему.
