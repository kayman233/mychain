# OAuth Social Recovery: Архитектура, анализ и пути развития

## Оглавление

1. [Участники системы](#1-участники-системы)
2. [Сущности и хранение](#2-сущности-и-хранение)
3. [Потоки данных](#3-потоки-данных)
4. [Что видно на блокчейне](#4-что-видно-на-блокчейне)
5. [Модель голосования](#5-модель-голосования)
6. [Проблемы и реализованные решения](#6-проблемы-и-реализованные-решения)
7. [ZK-подход: что он решает и чего стоит](#7-zk-подход-что-он-решает-и-чего-стоит)
8. [Оставшиеся задачи и перспективы](#8-оставшиеся-задачи-и-перспективы)

---

## 1. Участники системы

| Участник | Роль | Доверие |
|----------|------|---------|
| **Владелец аккаунта** | Создаёт абстрактный аккаунт (AA), владеет приватным ключом secp256k1 для авторизации транзакций | — |
| **Cosmos-гардиан** | Блокчейн-адрес, голосует за восстановление обычной транзакцией | Доверие к сохранности его приватного ключа |
| **OAuth-гардиан** | Google-аккаунт, идентифицируется через `SHA-256(google_sub:contract:salt)` | Доверие к Google как провайдеру идентификации |
| **Attestor(ы)** | Сервер(ы) (Next.js API), верифицирует Google JWT и подписывает attestation | M-of-N доверие (при multi-attestor) |
| **Смарт-контракт** | CosmWasm-контракт = сам аккаунт. Хранит состояние, верифицирует подписи | Trustless — верификация on-chain |
| **Google OAuth** | Выдаёт JWT при авторизации. Не знает о блокчейне | Доверие к корректной аутентификации |

### Attestor — что делает и чего не делает

**Делает:** принимает JWT → верифицирует через Google API → формирует attestation с привязкой к контракту/сети/действию → подписывает secp256k1-ключом → возвращает клиенту.

**Не делает:** не хранит данные, не взаимодействует с блокчейном, не знает состояние контракта, **не видит Shamir-доли** (получает только их хеш).

**Multi-attestor режим:** клиент получает полный attestation от первого attestor'а, затем отправляет его остальным для co-sign. Контракт требует M-of-N подписей.

---

## 2. Сущности и хранение

### On-chain (в контракте)

```
┌──────────────────────────────────────────────────────────────────┐
│                         КОНТРАКТ (AA)                             │
├──────────────────────────┬───────────────────────────────────────┤
│ PUBKEY                   │ текущий публичный ключ владельца       │
├──────────────────────────┼───────────────────────────────────────┤
│ GUARDIANS                │ [cosmos1aaa, cosmos1bbb]               │
│ OAUTH_GUARDIANS          │ [{google, sub_hash}, ...] (fallback)  │
│ OAUTH_GUARDIANS_ROOT     │ Merkle root (при использовании дерева)│
│ THRESHOLD                │ 2 (общий для всех типов)              │
│ OAUTH_CONFIG             │ { attestor_pubkeys: [...],            │
│                          │   attestor_threshold: 2 }             │
├──────────────────────────┼───────────────────────────────────────┤
│ VOTES                    │ cosmos-адрес → pubkey                  │
│ OAUTH_VOTES              │ sub_hash → pubkey                      │
│ COUNTS                   │ pubkey → число голосов (общий)         │
├──────────────────────────┼───────────────────────────────────────┤
│ SHARES                   │ cosmos-адрес → зашифр. доля            │
│ OAUTH_SHARES             │ sub_hash → зашифр. доля                │
├──────────────────────────┼───────────────────────────────────────┤
│ OAUTH_USED_ATTESTATIONS  │ nonce_key → true (replay protect)     │
└──────────────────────────┴───────────────────────────────────────┘
```

### Off-chain

| Где | Что |
|-----|-----|
| Браузер (localStorage) | Список аккаунтов, salt для каждого контракта (`oauth_salt_{addr}`) |
| Attestor(ы) (env) | `OAUTH_ATTESTOR_PRIVKEY_HEX` — приватный ключ каждого attestor'а |
| Attestor (память) | Rate limit счётчики (не персистятся) |

### Ключевые структуры данных

**OAuthAttestation** — подписанное attestor'ами заявление:

```
{
  provider:    "google"
  contract:    "cosmos1abc..."    // привязка к контракту
  chain_id:    "mychain-1"       // привязка к сети
  sub_hash:    "a1b2c3..."       // SHA-256(sub:contract:salt)
  action:      "recover"         // recover | revoke | store_share
  new_pubkey:  "A4x..."          // (только recover)
  share_hash:  "d4e5f6..."       // (только store_share) SHA-256(доли)
  nonce:       "7f8a9b..."       // уникальный, для replay protection
  expires_at:  1708300000        // TTL (по умолч. 180 сек)
}
```

**OAuthAttestationProof** — attestation + подписи:

```
{
  attestation: { ... }
  signature:   "..."             // одиночная подпись (backward compat)
  signatures:  ["...", "..."]    // множественные подписи (multi-attestor)
}
```

**MerkleProof** — доказательство принадлежности к дереву гардианов:

```
{
  leaf:         "a1b2c3..."      // sub_hash
  siblings:     ["d4e5...", ...] // хеши соседних узлов на пути
  path_indices: [false, true]    // false=left, true=right
}
```

Signing message: `oauth_attestation:v1:{provider}:{contract}:{chain_id}:{sub_hash}:{action}:{new_pubkey|-}:{share_hash|-}:{nonce}:{expires_at}`

---

## 3. Потоки данных

### 3.1 Создание аккаунта с OAuth-гардианами

```
Владелец                        Backend                    Блокчейн
   │                               │                          │
   │  1. Генерирует salt,          │                          │
   │     вычисляет sub_hash =      │                          │
   │     SHA-256(sub:contract:salt) │                          │
   │     или Merkle root           │                          │
   │                               │                          │
   │  2. GET /api/oauth-           │                          │
   │     attestor-pubkey ─────────►│                          │
   │  ◄── attestor_pubkeys ───────│                          │
   │                               │                          │
   │  3. POST /create ────────────►│                          │
   │     InstantiateMsg {          │  4. TX ──────────────────►
   │       pubkey, guardians,      │     instantiate()        │
   │       threshold,              │                          │
   │       oauth_guardians_root,   │                          │
   │       oauth_config {          │                          │
   │         attestor_pubkeys,     │                          │
   │         attestor_threshold    │                          │
   │       }                       │                          │
   │     }                         │  ◄── contract address ──│
   │  ◄── contract address ───────│                          │
```

### 3.2 Голосование за восстановление (OAuth, multi-attestor)

```
OAuth-гардиан       Google       Attestor #1      Attestor #2     Контракт
      │                │              │                │              │
  1.  │── sign in ────►│              │                │              │
      │◄── JWT ────────│              │                │              │
      │                │              │                │              │
  2.  │── { idToken, contract,        │                │              │
      │    action, newPubkey,         │                │              │
      │    salt } ───────────────────►│                │              │
      │                │              │                │              │
      │                │  3. verify JWT via Google     │              │
      │                │     sub_hash = SHA-256(       │              │
      │                │       sub:contract:salt)      │              │
      │                │     формирует attestation     │              │
      │                │     подписывает (sig #1)      │              │
      │                │              │                │              │
      │◄── { attestation, sig #1 } ──│                │              │
      │                │              │                │              │
  4.  │── { idToken, attestation } ──────────────────►│              │
      │                │              │   verify JWT   │              │
      │                │              │   co-sign      │              │
      │◄── { sig #2 } ──────────────────────────────│              │
      │                │              │                │              │
  5.  │── TX: RecoverWithOAuth ──────────────────────────────────────►
      │   { attestation,             │                │              │
      │     signatures: [sig1, sig2],│                │   6. Проверяет:
      │     new_pubkey,              │                │   • M-of-N
      │     merkle_proof }           │                │     подписей
      │                │              │                │   • contract
      │                │              │                │   • chain_id
      │                │              │                │   • expiry
      │                │              │                │   • nonce
      │                │              │                │   • Merkle
      │                │              │                │     proof
      │                │              │                │              │
      │                │              │                │   7. COUNTS += 1
      │                │              │                │   Если >= threshold:
      │◄── result ──────────────────────────────────────── PUBKEY обновлён
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

Аналогично 3.2, но `action: "store_share"`. Клиент вычисляет `share_hash = SHA-256(value)` локально и отправляет attestor'у **только хеш** (не саму долю). Attestor подписывает attestation с `share_hash`. Контракт получает raw value и проверяет `SHA-256(value) == attestation.share_hash`.

---

## 4. Что видно на блокчейне

### Приватность данных

| Данные | Блокчейн | Attestor | Google | Браузер |
|--------|:--------:|:--------:|:------:|:-------:|
| Google email | — | — | ✓ | ✓ |
| Google sub (ID) | — | — | ✓ | ✓ |
| sub_hash (per-contract) | ✓ (при голосовании) | ✓ | — | ✓ |
| Список гардианов | Merkle root (32 байта) | — | — | ✓ |
| JWT (id_token) | — | **✓** | ✓ | ✓ |
| Зашифрованная Shamir-доля | **✓** | — | — | ✓ |
| Кто за кого голосовал | **✓** (sub_hash при голосовании) | — | — | ✓ |

### Что видит наблюдатель блокчейна

**До голосования:**
- `OAUTH_GUARDIANS_ROOT = "3f7a..."` — 32-байтовый Merkle root, не раскрывает ни количество, ни identity гардианов

**При голосовании (в транзакции):**
```json
{
  "attestation": {
    "sub_hash": "a1b2c3d4...",
    "action": "recover",
    "new_pubkey": "A4xF...",
    "nonce": "7f8a9b...",
    "expires_at": 1708300000
  },
  "signatures": ["MEUC...", "MEYx..."],
  "merkle_proof": { "leaf": "a1b2c3d4...", "siblings": [...] }
}
```

**Видно:** sub_hash (per-contract, не связывается между контрактами), действие, новый ключ.

**Не видно:** email, имя, Google sub, JWT, список гардианов.

---

## 5. Модель голосования

Cosmos-гардианы и OAuth-гардианы голосуют в **общий пул** с единым threshold:

```
Пример: threshold = 2
GUARDIANS = [cosmos1aaa]
OAUTH_GUARDIANS_ROOT = Merkle_root([hash_alice, hash_bob])

Сценарий A: cosmos1aaa + Alice (OAuth) → 2 >= 2 → ВОССТАНОВЛЕНИЕ
Сценарий B: Alice + Bob (оба OAuth)    → 2 >= 2 → ВОССТАНОВЛЕНИЕ
Сценарий C: только cosmos1aaa          → 1 <  2 → ожидание
```

---

## 6. Проблемы и реализованные решения

### Исходные проблемы и их статус

| # | Проблема | Статус | Решение |
|---|----------|:------:|---------|
| П1 | Attestor — единая точка доверия | ✅ Решено | **Multi-attestor (M-of-N)** — контракт хранит N pubkeys и threshold M, требует M валидных подписей. Two-phase протокол: первый attestor формирует attestation, остальные co-sign. |
| П2 | Linkability — sub_hash стабилен | ✅ Решено | **Per-contract salt** — `sub_hash = SHA-256(sub:contract:salt)`, salt генерируется UUID при первом использовании, хранится в localStorage. Один Google-аккаунт имеет разные sub_hash в разных контрактах. |
| П3 | Список гардианов публичен | ✅ Решено | **Merkle tree** — контракт хранит `OAUTH_GUARDIANS_ROOT` вместо списка. При голосовании гардиан предоставляет `MerkleProof { leaf, siblings, path_indices }`. Полная обратная совместимость с list-based хранением. |
| П4 | Attestor видит Shamir-доли | ✅ Решено | **Share hash на клиенте** — клиент вычисляет `SHA-256(value)` через Web Crypto и отправляет attestor'у только `shareHash` (64-char hex). Attestor никогда не видит саму долю. |
| П5 | Нет ротации ключа attestor'а | ✅ Решено | **UpdateOAuthConfig** — новый `ExecuteMsg::UpdateOAuthConfig { oauth_config }` с `assert_self`. Позволяет обновить attestor pubkeys / threshold без переинстанциации. |
| П6 | OAUTH_USED_ATTESTATIONS растёт | ⚠ Открыто | Нет механизма очистки старых nonce. Потенциальное решение: очищать записи с `expires_at < block.time`. |

### Детали реализованных решений

#### Multi-attestor (М-of-N)

**Контракт:**
```rust
OAuthConfig {
    attestor_pubkey: Option<Binary>,           // одиночный (backward compat)
    attestor_pubkeys: Option<Vec<Binary>>,     // множественные
    attestor_threshold: Option<u64>,           // M (по умолч. = N)
}

OAuthAttestationProof {
    attestation: OAuthAttestation,
    signature: Option<Binary>,                 // одиночная (backward compat)
    signatures: Option<Vec<Binary>>,           // множественные
}
```

Верификация: каждый pubkey может быть использован максимум один раз (предотвращает replay одной подписи). Если `valid_count < threshold` → ошибка `InsufficientAttestorSignatures`.

**Клиент (two-phase протокол):**
1. POST на attestor #1: `{ idToken, contract, action, salt, ... }` → получает полный `{ attestation, signature }`
2. POST на attestor #2..N: `{ idToken, attestation }` (co-sign mode) → каждый верифицирует JWT и подписывает предоставленную attestation
3. Собирает все подписи в `signatures: [sig1, sig2, ...]`

Конфигурация: `NEXT_PUBLIC_OAUTH_ATTESTOR_URLS=url1,url2,url3`

#### Merkle tree гардианов

```rust
MerkleProof {
    leaf: String,            // sub_hash (hex)
    siblings: Vec<String>,   // sibling hashes at each level
    path_indices: Vec<bool>, // false=left, true=right
}
```

Верификация: `verify_merkle_proof(root, proof)` — SHA-256 binary Merkle tree. Leaf хешируется, затем попарно с siblings до корня. Если `OAUTH_GUARDIANS_ROOT` не задан — fallback на list-based проверку.

#### Per-contract salt

```
sub_hash = SHA-256(google_sub + ":" + contract_address + ":" + salt)
```

Salt: UUID, генерируется при первом использовании, хранится в `localStorage` как `oauth_salt_{contractAddress}`. Attestor получает salt в каждом запросе и использует для вычисления sub_hash.

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

### Сравнение: наша реализация vs ZK vs исходная версия

| Проблема | Исходная версия | Наша реализация (сейчас) | ZK-подход |
|----------|:-:|:-:|:-:|
| **П1.** Точка доверия | ⚠ 1 attestor | ✅ M-of-N attestor'ов | ✅ Trustless |
| **П2.** Linkability | ⚠ sub_hash одинаков | ✅ Per-contract salt | ✅ salt в commitment |
| **П3.** Публичный список | ⚠ Открытый список | ✅ Merkle root | ✅ Только commitments |
| **П4.** Видимость долей | ⚠ Attestor видит | ✅ Только hash на attestor | ✅ Нет attestor'а |
| **П5.** Ротация ключа | ⚠ Нет механизма | ✅ UpdateOAuthConfig | ✅ Нет ключа |

### Чего ZK стоит

**Инженерная сложность:**
- Circom circuit для JWT + RSA verification: ~1M constraints
- Trusted setup ceremony (Groth16) или универсальный setup (Plonk)
- Proving service: сервер 16 vCPU, 64GB RAM, генерация proof ~3 сек
- Salt service: хранит mapping sub → salt для каждого пользователя
- На CosmWasm нет production-ready Groth16 verifier'а

**Скрытые допущения доверия** (обнаружено в [3], [3b]):

- **Proving service видит полный JWT.** Авторы [3] указывают: *«JWTs frequently embed sensitive attributes (e.g., email addresses, profile information), which are disclosed to third-party services (salt or prover) that were not part of the user's original OIDC consent decision.»* Это нарушение приватности, но не эквивалент нашего attestor'а: proving service не может подделать proof без валидного JWT, тогда как единичный attestor может подделать attestation полностью (поэтому мы реализовали multi-attestor).

- **Salt service нарушает unlinkability.** Salt service хранит mapping `(iss, sub) → salt`. При его компрометации атакующий может связать on-chain адреса с OIDC-идентификаторами. Это не полная деанонимизация (email не раскрывается), но позволяет отслеживать пользователей.

- **JWT parsing: claim shadowing.** ZK-circuit выполняет substring matching по JWT-payload, а не полноценный JSON-парсинг: *«zkLogin never establishes that the JWT payload is a well-formed JSON object, let alone that it has a unique or unambiguous interpretation»* [3]. Дублирование ключей (`iss`, `sub`) в JWT позволяет атакующему «затенить» реальные значения. Proof остаётся математически корректным, но доказывает утверждение с неоднозначной семантикой.

- **Pattern-matching issuer allow-list.** Референсная реализация принимала любой URL вида `https://cognito-idp.<region>.amazonaws.com/<tenant_id>` как доверенный issuer. Атакующий мог зарегистрировать собственный AWS Cognito user pool и получить статус доверенного провайдера [3].

- **Browser storage.** Ephemeral keys, API-ключи и salt хранятся в `localStorage` / `sessionStorage`. Авторы отмечают: *«Browser isolation mechanisms (SOP, CSP) do not provide the confidentiality or integrity guarantees assumed by zkLogin»* [3]. XSS-атака на любой same-origin скрипт раскрывает все материалы.

### Вывод

> «Zero-knowledge proofs can't fix what they can't see.» — блог-пост Brave Research [3b]

> «None of the vulnerabilities identified are cryptographic in nature.» — ePrint 2026/227 [3]

ZK-подход **формально сильнее** в криптографических гарантиях, но на практике:
- Proving service и salt service создают новые точки доверия (хотя и с меньшими полномочиями, чем единичный attestor)
- Сложность ZK-circuit'ов и отсутствие канонического JWT-парсинга создают уязвимости, которых нет в простых системах
- Наша реализация с multi-attestor + Merkle tree + per-contract salt **закрывает большинство тех же проблем** практическими средствами
- Для нашей задачи (social recovery — редкая операция) инженерный overhead ZK не оправдан
- Инфраструктура для CosmWasm не готова (месяцы работы)

---

## 8. Оставшиеся задачи и перспективы

### Открытые задачи

| # | Задача | Приоритет | Описание |
|---|--------|:---------:|----------|
| 1 | Очистка `OAUTH_USED_ATTESTATIONS` | Средний | Удалять записи с `expires_at < block.time` при каждом новом attestation |
| 2 | Nullifier pattern | Низкий | Скрытие КТО именно голосовал. Усложняет revoke-логику. |
| 3 | HSM/KMS для attestor'ов | Средний | Ключи attestor'ов в аппаратных модулях для production |
| 4 | Перегенерация codegen | Высокий | `cargo schema` + `ts-codegen generate` для синхронизации типов |

### Перспективы ZK

При появлении production-ready инфраструктуры для CosmWasm:

- **[DoraFactory zk-cosmwasm](https://github.com/DoraFactory/zk-cosmwasm)** — Groth16 verifier для CosmWasm
- **[niftyzk](https://github.com/NiftyZk/niftyzk)** — генератор CosmWasm verifier'ов из Circom
- **Circom circuit из zkLogin** — open source, адаптируем для JWT RSA verification
- **ERC-7522** [4] — стандарт Ethereum для OIDC ZK Verifier, адаптируем интерфейс

Переход на ZK позволит полностью убрать attestor'ов, но потребует 2-3 месяца работы и значительной инфраструктуры (proving service, trusted setup).

---

## Ссылки

1. **zkLogin** — Baldimtsi et al., CCS 2024. Приватная аутентификация через OAuth на блокчейне Sui с использованием Groth16 ZK-proof'ов. Первое production-развёртывание (~100k аккаунтов). [arXiv:2401.11735](https://arxiv.org/abs/2401.11735)

2. **zkAA (Zero-Knowledge Address Abstraction)** — Park et al., ACM SAC 2025. Расширяет идею на кросс-чейн identity, добавляет proof aggregation (5.5x экономия gas), двухфазную архитектуру (registration + publication). [DOI:10.1145/3672608.3707839](https://dl.acm.org/doi/10.1145/3672608.3707839)

3. **Analysis and Vulnerabilities in zkLogin** — Celi, Haddadi, Den Hartog (Brave, Imperial College London), ePrint 2026/227. Академический анализ трёх классов уязвимостей zkLogin: (1) неоднозначный JWT-парсинг (claim shadowing), (2) отсутствие binding между authentication и authorization контекстами, (3) рецентрализация доверия через proving/salt сервисы. Ни одна из найденных уязвимостей не является криптографической. [ePrint:2026/227](https://eprint.iacr.org/2026/227)

3b. **zkLogin: when ZKP is not enough** — блог-пост Brave Research, популярное изложение результатов [3] с дополнительными цитатами и примерами. [brave.com/blog/zklogin](https://brave.com/blog/zklogin/)

4. **ERC-7522: OIDC ZK Verifier for AA Account** — Стандарт Ethereum для связывания OIDC-identity с ERC-4337 аккаунтами через ZK. [EIP-7522](https://eips.ethereum.org/EIPS/eip-7522)

5. **SoK: Web3 Recovery Mechanisms** — Систематический обзор всех подходов к recovery. [ePrint:2023/1575](https://eprint.iacr.org/2023/1575)
