# OAuth Social Recovery: Архитектура, анализ и пути развития

## Оглавление

1. [Участники системы](#1-участники-системы)
2. [Сущности и хранение](#2-сущности-и-хранение)
3. [Потоки данных](#3-потоки-данных)
4. [Что видно на блокчейне](#4-что-видно-на-блокчейне)
5. [Модель голосования](#5-модель-голосования)
6. [Проблемы текущей реализации](#6-проблемы-текущей-реализации)
7. [ZK-подход: что он решает и чего стоит](#7-zk-подход-что-он-решает-и-чего-стоит)
8. [Практические улучшения без ZK](#8-практические-улучшения-без-zk)
9. [Дорожная карта](#9-дорожная-карта)

---

## 1. Участники системы

| Участник | Роль | Доверие |
|----------|------|---------|
| **Владелец аккаунта** | Создаёт абстрактный аккаунт (AA), владеет приватным ключом secp256k1 для авторизации транзакций | — |
| **Cosmos-гардиан** | Блокчейн-адрес, голосует за восстановление обычной транзакцией | Доверие к сохранности его приватного ключа |
| **OAuth-гардиан** | Google-аккаунт, идентифицируется через `SHA-256(google_sub)` | Доверие к Google как провайдеру идентификации |
| **Attestor** | Сервер (Next.js API), верифицирует Google JWT и подписывает attestation | **Полное доверие** — может подделать любой attestation |
| **Смарт-контракт** | CosmWasm-контракт = сам аккаунт. Хранит состояние, верифицирует подписи | Trustless — верификация on-chain |
| **Google OAuth** | Выдаёт JWT при авторизации. Не знает о блокчейне | Доверие к корректной аутентификации |

### Attestor — что делает и чего не делает

**Делает:** принимает JWT → верифицирует через Google API → формирует attestation с привязкой к контракту/сети/действию → подписывает secp256k1-ключом → возвращает клиенту.

**Не делает:** не хранит данные, не взаимодействует с блокчейном, не знает состояние контракта.

---

## 2. Сущности и хранение

### On-chain (в контракте)

```
┌────────────────────────────────────────────────────────────┐
│                      КОНТРАКТ (AA)                          │
├───────────────────────┬────────────────────────────────────┤
│ PUBKEY                │ текущий публичный ключ владельца    │
├───────────────────────┼────────────────────────────────────┤
│ GUARDIANS             │ [cosmos1aaa, cosmos1bbb]            │
│ OAUTH_GUARDIANS       │ [{google, sha256(sub1)}, ...]      │
│ THRESHOLD             │ 2 (общий для всех типов)           │
│ OAUTH_CONFIG          │ { attestor_pubkey: "A3xF..." }     │
├───────────────────────┼────────────────────────────────────┤
│ VOTES                 │ cosmos-адрес → pubkey               │
│ OAUTH_VOTES           │ sub_hash → pubkey                   │
│ COUNTS                │ pubkey → число голосов (общий)      │
├───────────────────────┼────────────────────────────────────┤
│ SHARES                │ cosmos-адрес → зашифр. доля         │
│ OAUTH_SHARES          │ sub_hash → зашифр. доля             │
├───────────────────────┼────────────────────────────────────┤
│ OAUTH_USED_ATTESTATIONS│ nonce_key → true (replay protect) │
└───────────────────────┴────────────────────────────────────┘
```

### Off-chain

| Где | Что |
|-----|-----|
| Браузер (localStorage) | Список аккаунтов `[{ address, contractAddress }]` |
| Attestor (env) | `OAUTH_ATTESTOR_PRIVKEY_HEX` — приватный ключ |
| Attestor (память) | Rate limit счётчики (не персистятся) |

### Ключевые структуры данных

**OAuthAttestation** — подписанное attestor'ом заявление:

```
{
  provider:    "google"           // провайдер
  contract:    "cosmos1abc..."    // привязка к контракту
  chain_id:    "mychain-1"       // привязка к сети
  sub_hash:    "a1b2c3..."       // SHA-256(google_sub)
  action:      "recover"         // recover | revoke | store_share
  new_pubkey:  "A4x..."          // (только recover)
  share_hash:  "d4e5f6..."       // (только store_share) SHA-256(доли)
  nonce:       "7f8a9b..."       // уникальный, для replay protection
  expires_at:  1708300000        // TTL (по умолч. 180 сек)
}
```

Signing message: `oauth_attestation:v1:{provider}:{contract}:{chain_id}:{sub_hash}:{action}:{new_pubkey|-}:{share_hash|-}:{nonce}:{expires_at}`

---

## 3. Потоки данных

### 3.1 Создание аккаунта с OAuth-гардианами

```
Владелец                        Backend                    Блокчейн
   │                               │                          │
   │  1. Вычисляет sub_hash        │                          │
   │     для Google-гардианов      │                          │
   │                               │                          │
   │  2. GET /api/oauth-           │                          │
   │     attestor-pubkey ─────────►│                          │
   │  ◄── attestor_pubkey ────────│                          │
   │                               │                          │
   │  3. POST /create ────────────►│                          │
   │     InstantiateMsg {          │  4. TX ──────────────────►
   │       pubkey, guardians,      │     instantiate()        │
   │       threshold,              │                          │
   │       oauth_guardians,        │                          │
   │       oauth_config            │                          │
   │     }                         │  ◄── contract address ──│
   │  ◄── contract address ───────│                          │
```

### 3.2 Голосование за восстановление (OAuth-гардиан)

```
OAuth-гардиан         Google          Attestor           Контракт
      │                  │                │                  │
  1.  │── sign in ──────►│                │                  │
      │◄── JWT (id_token)│                │                  │
      │                  │                │                  │
  2.  │── POST { idToken,│action:recover, │                  │
      │   contract,      │newPubkey } ───►│                  │
      │                  │                │                  │
      │                  │   3. GET ──────┼─► tokeninfo      │
      │                  │      ◄─────────┼── { sub, aud }   │
      │                  │                │                  │
      │                  │   4. sub_hash =│SHA-256(sub)      │
      │                  │      формирует │attestation       │
      │                  │      подписывает                  │
      │                  │                │                  │
      │◄── OAuthAttestation + signature ──│                  │
      │                  │                │                  │
  5.  │── TX: RecoverWithOAuth ──────────────────────────────►
      │   { attestation, new_pubkey }     │                  │
      │                  │                │   6. Проверяет:  │
      │                  │                │   • подпись      │
      │                  │                │   • contract     │
      │                  │                │   • chain_id     │
      │                  │                │   • expiry       │
      │                  │                │   • nonce        │
      │                  │                │   • guardian     │
      │                  │                │                  │
      │                  │                │   7. COUNTS += 1 │
      │                  │                │   Если >= threshold:
      │◄── result ───────────────────────────── PUBKEY обновлён
```

### 3.3 Голосование за восстановление (Cosmos-гардиан)

```
Cosmos-гардиан                                     Контракт
      │                                                │
  1.  │── TX: Recover { new_pubkey } ─────────────────►│
      │   (подписано кошельком)                         │
      │                                                │
      │                                  2. sender ∈ GUARDIANS? ✓
      │                                  3. COUNTS += 1
      │◄── result ────────────────────────────────────│
```

### 3.4 Сохранение Shamir-доли (OAuth-гардиан)

Аналогично 3.2, но `action: "store_share"`, `value: <доля>`.
Контракт дополнительно проверяет `SHA-256(value) == attestation.share_hash`.
Результат: `OAUTH_SHARES[sub_hash] = value`.

---

## 4. Что видно на блокчейне

### Приватность данных

| Данные | Блокчейн | Attestor | Google | Браузер |
|--------|:--------:|:--------:|:------:|:-------:|
| Google email | — | — | ✓ | ✓ |
| Google sub (ID) | — | — | ✓ | ✓ |
| sub_hash | **✓** | ✓ | — | ✓ |
| Связь «sub_hash → гардиан этого аккаунта» | **✓** | — | — | ✓ |
| JWT (id_token) | — | **✓** | ✓ | ✓ |
| Зашифрованная Shamir-доля | **✓** | ⚠ ✓ | — | ✓ |
| Кто за кого голосовал | **✓** | — | — | ✓ |

### Что конкретно видит наблюдатель блокчейна

В `OAUTH_GUARDIANS`:
```json
[
  { "provider": "google", "sub_hash": "a1b2c3d4..." },
  { "provider": "google", "sub_hash": "e5f6a7b8..." }
]
```

В транзакции `RecoverWithOAuth`:
```json
{
  "attestation": {
    "provider": "google",
    "sub_hash": "a1b2c3d4...",
    "action": "recover",
    "new_pubkey": "A4xF...",
    "nonce": "7f8a9b...",
    "expires_at": 1708300000
  },
  "signature": "MEUC..."
}
```

**Видно:** какие sub_hash являются гардианами, кто голосовал, за какой ключ.

**Не видно:** email, имя, Google sub, JWT.

**Проблема linkability:** если один Google-аккаунт — гардиан нескольких AA, один и тот же `sub_hash` фигурирует во всех контрактах. Наблюдатель может связать аккаунты.

---

## 5. Модель голосования

Cosmos-гардианы и OAuth-гардианы голосуют в **общий пул** с единым threshold:

```
Пример: threshold = 2
GUARDIANS = [cosmos1aaa]
OAUTH_GUARDIANS = [{ google, hash_alice }, { google, hash_bob }]

Сценарий A: cosmos1aaa + Alice (OAuth) → 2 >= 2 → ВОССТАНОВЛЕНИЕ
Сценарий B: Alice + Bob (оба OAuth)    → 2 >= 2 → ВОССТАНОВЛЕНИЕ
Сценарий C: только cosmos1aaa          → 1 <  2 → ожидание
```

---

## 6. Проблемы текущей реализации

### П1. Attestor — единая точка доверия

| Если attestor скомпрометирован | Последствие |
|-------------------------------|-------------|
| OAuth-гардианов ≥ threshold | **Полный захват аккаунта** |
| OAuth-гардианов < threshold | Частичная угроза (нужен ещё Cosmos-голос) |
| OAuth-гардианов = 0 | Никакого эффекта |

Атакующий знает все `sub_hash` из блокчейна и может подделать attestation для каждого.

### П2. Linkability — sub_hash стабилен

`SHA-256(google_sub)` одинаков во всех контрактах. Наблюдатель связывает аккаунты.

### П3. Список гардианов публичен

`OAUTH_GUARDIANS` хранит открытый список `sub_hash`. Видно количество и идентификаторы.

### П4. Attestor видит Shamir-доли

При `store_share` attestor получает `value` в запросе для вычисления `share_hash`.

### П5. Нет ротации ключа attestor'а

Нет `ExecuteMsg` для обновления `attestor_pubkey` без переинстанциации.

### П6. OAUTH_USED_ATTESTATIONS растёт бесконечно

Нет механизма очистки старых nonce.

---

## 7. ZK-подход: что он решает и чего стоит

### Как работает ZK-верификация OAuth

Системы zkLogin [1] и zkAA [2] реализуют следующую схему:

```
Пользователь          Google           ZK Prover          Контракт
     │                   │                 │                  │
     │── sign in ───────►│                 │                  │
     │◄── JWT ───────────│                 │                  │
     │                   │                 │                  │
     │── JWT + salt ─────────────────────►│                  │
     │                   │   генерирует ZK proof:            │
     │                   │   «Я знаю JWT от Google,          │
     │                   │    sub_hash = SHA256(sub+salt),    │
     │                   │    JWT подписан ключом Google»     │
     │◄── ZK proof ──────────────────────│                  │
     │                   │                 │                  │
     │── TX: { proof, commitment } ─────────────────────────►│
     │                   │                 │  verify_proof()  │
     │                   │                 │  (BN254 pairing) │
```

**Ключевое отличие:** контракт получает только математическое доказательство, не видя ни JWT, ни sub, ни email. Attestor не нужен.

### Что ZK решает

| Проблема | Attestor-подход | ZK-подход |
|----------|:-:|:-:|
| **П1.** Единая точка доверия | ⚠ Attestor может подделать | ✅ Cryptographic soundness |
| **П2.** Linkability | ⚠ sub_hash одинаков везде | ✅ salt делает commitment уникальным |
| **П3.** Публичный список гардианов | ⚠ sub_hash в открытом виде | ✅ Только commitments/merkle root |
| **П4.** Attestor видит доли | ⚠ Транзитно видит value | ✅ Нет attestor'а |
| **П5.** Ротация ключа | ⚠ Нет механизма | ✅ Нет ключа для ротации |

### Чего ZK стоит

**Инженерная сложность:**
- Circom circuit для JWT + RSA verification: ~1M constraints
- Trusted setup ceremony (Groth16) или универсальный setup (Plonk)
- Proving service: сервер 16 vCPU, 64GB RAM, генерация proof ~3 сек
- Salt service: хранит mapping sub → salt для каждого пользователя
- На CosmWasm нет production-ready Groth16 verifier'а

**Скрытые допущения доверия** (обнаружено в [3], [3b]):

- **Proving service видит полный JWT.** Авторы [3] указывают: *«JWTs frequently embed sensitive attributes (e.g., email addresses, profile information), which are disclosed to third-party services (salt or prover) that were not part of the user's original OIDC consent decision.»* Это нарушение приватности, но не эквивалент нашего attestor'а: proving service не может подделать proof без валидного JWT, тогда как наш attestor может подделать attestation полностью.

- **Salt service нарушает unlinkability.** Salt service хранит mapping `(iss, sub) → salt`. При его компрометации атакующий может связать on-chain адреса с OIDC-идентификаторами. Это не полная деанонимизация (email не раскрывается), но позволяет отслеживать пользователей.

- **JWT parsing: claim shadowing.** ZK-circuit выполняет substring matching по JWT-payload, а не полноценный JSON-парсинг: *«zkLogin never establishes that the JWT payload is a well-formed JSON object, let alone that it has a unique or unambiguous interpretation»* [3]. Дублирование ключей (`iss`, `sub`) в JWT позволяет атакующему «затенить» реальные значения. Proof остаётся математически корректным, но доказывает утверждение с неоднозначной семантикой.

- **Pattern-matching issuer allow-list.** Референсная реализация принимала любой URL вида `https://cognito-idp.<region>.amazonaws.com/<tenant_id>` как доверенный issuer. Атакующий мог зарегистрировать собственный AWS Cognito user pool и получить статус доверенного провайдера [3].

- **Browser storage.** Ephemeral keys, API-ключи и salt хранятся в `localStorage` / `sessionStorage`. Авторы отмечают: *«Browser isolation mechanisms (SOP, CSP) do not provide the confidentiality or integrity guarantees assumed by zkLogin»* [3]. XSS-атака на любой same-origin скрипт раскрывает все материалы.

### Вывод

> «Zero-knowledge proofs can't fix what they can't see.» — блог-пост Brave Research [3b]

> «None of the vulnerabilities identified are cryptographic in nature.» — ePrint 2026/227 [3]

ZK-подход **формально сильнее** в криптографических гарантиях, но на практике:
- Proving service и salt service создают новые точки доверия (хотя и с меньшими полномочиями, чем наш attestor)
- Сложность ZK-circuit'ов и отсутствие канонического JWT-парсинга создают уязвимости, которых нет в простых системах
- Для нашей задачи (social recovery — редкая операция) инженерный overhead не оправдан
- Инфраструктура для CosmWasm не готова (месяцы работы)

---

## 8. Практические улучшения без ZK

Каждое улучшение решает конкретную проблему из раздела 6, давая приватность уровня ~80% от ZK без его инфраструктурных затрат.

### У1. Per-contract salt → решает П2 (linkability)

**Суть:** вместо `SHA-256(google_sub)` использовать `SHA-256(google_sub + contract_address + salt)`.

```
Было:    sub_hash = SHA-256(sub)                    ← одинаков во всех контрактах
Стало:   sub_hash = SHA-256(sub + contract + salt)  ← уникален для каждого контракта
```

`salt` — случайное значение, хранится у владельца off-chain. Attestor получает salt от клиента при каждом запросе.

**Что даёт:** один Google-аккаунт имеет разные sub_hash в разных контрактах. Наблюдатель не может связать.

**Сложность:** ~1 день. Изменения в attestor + контракт + клиент.

### У2. Share hash на клиенте → решает П4 (утечка долей)

**Суть:** клиент вычисляет `share_hash = SHA-256(value)` самостоятельно и отправляет attestor'у только хеш.

```
Было:    Клиент → Attestor: { value: "<доля>" }
Стало:   Клиент → Attestor: { shareHash: "SHA256(<доля>)" }
```

**Что даёт:** attestor никогда не видит сами Shamir-доли.

**Сложность:** ~0.5 дня.

### У3. Merkle tree гардианов → решает П3 (публичный список)

**Суть:** вместо хранения списка `[sub_hash_1, sub_hash_2, ...]` — хранить Merkle root.

```
Было:    OAUTH_GUARDIANS = [{ sub_hash_1 }, { sub_hash_2 }]   ← виден весь список
Стало:   OAUTH_GUARDIANS_ROOT = Merkle_root([sub_hash_1, ...]) ← виден только 32-байтовый корень
```

При голосовании гардиан предоставляет `sub_hash + merkle_proof`. Контракт проверяет включение.

**Что даёт:** наблюдатель не знает количество и идентификаторы OAuth-гардианов до момента голосования.

**Сложность:** ~3-5 дней.

### У4. Nullifier pattern → решает П2 + П3 (скрытие голосов)

**Суть:** при голосовании вместо `sub_hash` используется одноразовый nullifier:

```
nullifier  = SHA-256(google_sub + "nullifier" + contract + recovery_round)
commitment = SHA-256(google_sub + salt)     ← в Merkle tree

Контракт проверяет:
  1. commitment ∈ Merkle tree (через proof)
  2. nullifier ещё не использован
  3. attestation валиден

Контракт сохраняет:
  USED_NULLIFIERS[nullifier] = true
  VOTE_COUNT += 1                           ← без раскрытия КТО голосовал
```

**Что даёт:** на блокчейне видно только «один из гардианов проголосовал», но не кто именно.

**Сложность:** ~1 неделя.

### У5. Multi-attestor → решает П1 (единая точка доверия)

**Суть:** N attestor'ов, каждый независимо верифицирует JWT, контракт требует M-of-N подписей.

```
ATTESTOR_PUBKEYS = [pubkey_1, pubkey_2, pubkey_3]
ATTESTOR_THRESHOLD = 2

Клиент запрашивает attestation у каждого из N attestor'ов.
Контракт проверяет >= M валидных подписей.
```

**Что даёт:** компрометация одного attestor'а не позволяет подделать attestation. Нужно взломать M из N.

**Сложность:** ~1-2 недели.

### У6. UpdateOAuthConfig → решает П5 (ротация ключа)

**Суть:** добавить `ExecuteMsg::UpdateOAuthConfig { new_config }` с проверкой `assert_self`.

**Что даёт:** владелец может обновить `attestor_pubkey` при компрометации без переинстанциации.

**Сложность:** ~0.5 дня.

### Сводная таблица улучшений

| # | Улучшение | Решает | Приватность | Trust | Effort |
|---|-----------|--------|:-----------:|:-----:|:------:|
| У1 | Per-contract salt | П2 linkability | ✅ | — | 1 день |
| У2 | Share hash на клиенте | П4 утечка долей | ✅ | — | 0.5 дня |
| У3 | Merkle tree гардианов | П3 публичный список | ✅ | — | 3-5 дней |
| У4 | Nullifier pattern | П2+П3 скрытие голосов | ✅✅ | — | 1 неделя |
| У5 | Multi-attestor | П1 единая точка доверия | — | ✅✅ | 1-2 нед. |
| У6 | UpdateOAuthConfig | П5 ротация ключа | — | ✅ | 0.5 дня |
| **Все вместе** | | **П1-П5** | **≈80% от ZK** | **✅✅** | **3-4 нед.** |
| ZK (для сравнения) | | П1-П5 | 100% | ✅✅✅ | 2-3 мес. |

---

## 9. Дорожная карта

### Фаза 1 — Быстрые исправления (1-2 дня)

- [ ] **У2** — share hash на клиенте (убрать утечку долей через attestor)
- [ ] **У6** — `UpdateOAuthConfig` (возможность ротации ключа attestor'а)
- [ ] Удалить мёртвый код (`jwt.rs`, `rsa_verify.rs`)

### Фаза 2 — Приватность (1-2 недели)

- [ ] **У1** — per-contract salt (устранение linkability)
- [ ] **У3** — Merkle tree гардианов (скрытие списка)
- [ ] **У4** — nullifier pattern (скрытие голосов)

### Фаза 3 — Минимизация доверия (1-2 недели)

- [ ] **У5** — multi-attestor (M-of-N подписи)
- [ ] HSM/KMS для ключей attestor'ов

### Фаза 4 — Перспектива (если необходимо)

- [ ] Исследование Groth16 verifier для CosmWasm (DoraFactory zk-cosmwasm, niftyzk)
- [ ] Адаптация Circom circuit из zkLogin для JWT RSA verification
- [ ] Переход на полный ZK при наличии production-ready инфраструктуры

---

## Ссылки

1. **zkLogin** — Baldimtsi et al., CCS 2024. Приватная аутентификация через OAuth на блокчейне Sui с использованием Groth16 ZK-proof'ов. Первое production-развёртывание (~100k аккаунтов). [arXiv:2401.11735](https://arxiv.org/abs/2401.11735)

2. **zkAA (Zero-Knowledge Address Abstraction)** — Park et al., ACM SAC 2025. Расширяет идею на кросс-чейн identity, добавляет proof aggregation (5.5x экономия gas), двухфазную архитектуру (registration + publication). [DOI:10.1145/3672608.3707839](https://dl.acm.org/doi/10.1145/3672608.3707839)

3. **Analysis and Vulnerabilities in zkLogin** — Celi, Haddadi, Den Hartog (Brave, Imperial College London), ePrint 2026/227. Академический анализ трёх классов уязвимостей zkLogin: (1) неоднозначный JWT-парсинг (claim shadowing), (2) отсутствие binding между authentication и authorization контекстами, (3) рецентрализация доверия через proving/salt сервисы. Ни одна из найденных уязвимостей не является криптографической. [ePrint:2026/227](https://eprint.iacr.org/2026/227)

3b. **zkLogin: when ZKP is not enough** — блог-пост Brave Research, популярное изложение результатов [3] с дополнительными цитатами и примерами. [brave.com/blog/zklogin](https://brave.com/blog/zklogin/)

4. **ERC-7522: OIDC ZK Verifier for AA Account** — Стандарт Ethereum для связывания OIDC-identity с ERC-4337 аккаунтами через ZK. [EIP-7522](https://eips.ethereum.org/EIPS/eip-7522)

5. **SoK: Web3 Recovery Mechanisms** — Систематический обзор всех подходов к recovery. [ePrint:2023/1575](https://eprint.iacr.org/2023/1575)
