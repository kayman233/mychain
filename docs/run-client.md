## To use client(example on social recovery):

If you already did Compile and Upload, you can skip them

### Compile
```
cd cosmwasm

docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.13.0

cd ..
```

### Upload

```
export PATH_TO_WASM_FILE="./cosmwasm/artifacts/social_recovery.wasm"
export SIGNER=user1
export CHAIN_ID=mychain

mychaind tx wasm store \
    $PATH_TO_WASM_FILE \
    --from $SIGNER \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test
```
If for some reason it doesn't work, try uploading an already compiled contract `./testing/social_recovery.wasm`.

### Run local go server for sending, creating txs of Smart Account

In a new terminal:
```
cd testing/server
go run main.go
```

### Run local client server

In a new terminal:
```
nvm use

cd client

npm ci
npm run dev
```

Now you can open your browser [http://localhost:3000](http://localhost:3000).

Make sure, your browser supports Kepler wallet (Chrome supports it).

Add wallets in Kepler with mnemonics from [localdev file](localdev.md).

You can only use them (you can add more as it was described, so that they appear in the local keyring) to interact with the blockchain.

### OAuth Recovery (Google) setup

To use the OAuth self-guardian feature (off-chain JWT verification + on-chain attestation verification):

1. Create a Google Cloud project and get an OAuth 2.0 Client ID:
   - Go to https://console.cloud.google.com/apis/credentials
   - Create an OAuth 2.0 Client ID (Web application type)
   - Add `http://localhost:3000` to Authorized JavaScript origins
   - Copy the Client ID

2. Add the Client ID to the client environment:
```
# in client/.env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<your_client_id>.apps.googleusercontent.com
# used by /api/oauth-attest on server side
GOOGLE_CLIENT_ID=<your_client_id>.apps.googleusercontent.com
# local signer mode: secp256k1 private key (hex, 32 bytes) for attestation signing
OAUTH_ATTESTOR_PRIVKEY_HEX=<64_hex_chars>
# remote signer mode: URL of signer service (if set, takes precedence over local key)
OAUTH_ATTEST_SIGNER_URL=https://your-signer.example.com/sign
# optional bearer token for remote signer
OAUTH_ATTEST_SIGNER_API_KEY=<signer_api_key>
# optional timeout for remote signer request, default 3000
OAUTH_ATTEST_SIGNER_TIMEOUT_MS=3000
# required in remote signer mode (or optional override in local mode):
# base64 compressed secp256k1 pubkey (33 bytes) that corresponds to signer key
OAUTH_ATTESTOR_PUBKEY=<base64_compressed_pubkey>
# optional, default 180
OAUTH_ATTESTATION_TTL_SEC=180
# optional rate limit for /api/oauth-attest (defaults: 20 req / 60s per IP)
OAUTH_ATTEST_RATE_MAX=20
OAUTH_ATTEST_RATE_WINDOW_MS=60000
```

You can generate `OAUTH_ATTESTOR_PRIVKEY_HEX` with:
```
openssl rand -hex 32
```

Remote signer contract expected by `/api/oauth-attest`:
```
POST $OAUTH_ATTEST_SIGNER_URL
Authorization: Bearer <OAUTH_ATTEST_SIGNER_API_KEY>   # optional
Content-Type: application/json

{
  "message_hash_hex": "<sha256_hex>",
  "context": {
    "provider": "google",
    "contract": "<bech32_contract_addr>",
    "chain_id": "<chain_id>",
    "action": "recover|revoke|store_share",
    "sub_hash": "<sha256_hex>",
    "nonce": "<hex_nonce>",
    "expires_at": 1730000000
  }
}
```

Remote signer should return:
```
{
  "signature_base64": "<base64_compact_64_byte_secp256k1_signature>"
}
```

3. Add the Google Identity Services script to the app. In `client/pages/_document.tsx` (or your HTML head), add:
```html
<script src="https://accounts.google.com/gsi/client" async defer></script>
```

4. Get the attestor pubkey from the running client server:
```
curl -s http://localhost:3000/api/oauth-attestor-pubkey | jq
```

Use `attestor_pubkey` in `oauth_config` during account instantiation.

5. When creating a smart account with OAuth guardian:
   - Log in with Google in the OAuth Recovery panel (the client will show your `sub_hash`)
   - Use this `sub_hash` value when instantiating the contract as an `oauth_guardian`

6. To recover with OAuth:
   - Log in with Google to get a fresh JWT token
   - Enter the new public key (base64)
   - Submit the OAuth recovery vote — client backend verifies JWT with Google and signs attestation
   - Contract verifies attestation signature, chain_id, nonce and expiry (JWT never goes on-chain)
   - OAuth votes count toward the same threshold as regular Cosmos guardian votes
