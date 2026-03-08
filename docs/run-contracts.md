## To compile, upload and test smart accounts(example on social recovery):


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

### Generate account and get addr

```
export CODE_ID=1
export INIT_MSG='{"pubkey":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir","guardians":["cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny","cosmos1w3egyz0x8qs3c6sg8mx37y3fz4mu6zz0s5slpu"],"threshold":2}'
export FUNDS="100000000uatom"
export SALT="account1"

mychaind tx abstract-account register $CODE_ID $INIT_MSG \
    --salt $SALT \
    --funds $FUNDS \
    --from $SIGNER \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test

mychaind q tx <insert_txhash>
```
In last attributes of the last event `account_registered`(above raw_log), `key: contract_addr` is the address. To export it (if you follow the file, then the address should be the same as here):
```
export ACCOUNT_ADDR=cosmos133yxxnfvphnyh0dlsa0z2hurqek8pcy955nyd9qddcgnfexxxujq0aegp6
```

Also change contract address in `testing/*.json` files

### View state of the account
```
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"guardians_list":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"threshold":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"pubkey":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"votes":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"counts":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"get_all_data":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"get_all_shares":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"get_all_recover_data":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"get_secret":{}}' --output json | jq
```

### OAuth queries (if OAuth guardians were configured)
```
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"o_auth_guardians_list":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"o_auth_votes":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"o_auth_config_query":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"get_o_auth_share":{"sub_hash":"<sha256_hex_of_google_sub>"}}' --output json | jq
```

### Generate account with OAuth guardian

To create an account with both Cosmos guardians and an OAuth (Google) self-guardian:

1. Get your Google `sub` claim (unique user ID) by logging into Google OAuth in the client UI
2. Compute SHA-256 hash of the `sub` value (the client does this automatically via `computeSubHash()`)
3. Get attestor pubkey (from client server):

```
curl -s http://localhost:3000/api/oauth-attestor-pubkey | jq
```

If you use remote signer mode (`OAUTH_ATTEST_SIGNER_URL`), set `OAUTH_ATTESTOR_PUBKEY` in client env first.

4. Instantiate with OAuth config:

```
export SUB_HASH="<sha256_hex_of_your_google_sub>"
export GOOGLE_CLIENT_ID="<your_google_cloud_client_id>"
export OAUTH_ATTESTOR_PUBKEY="<base64_compressed_secp256k1_pubkey>"

export INIT_MSG='{
  "pubkey":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir",
  "guardians":["cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny","cosmos1w3egyz0x8qs3c6sg8mx37y3fz4mu6zz0s5slpu"],
  "threshold":2,
  "oauth_guardians":[{"provider":"google","sub_hash":"'$SUB_HASH'"}],
  "oauth_config":{
    "google_issuer":"https://accounts.google.com",
    "expected_audience":"'$GOOGLE_CLIENT_ID'",
    "max_clock_skew":120,
    "attestor_pubkey":"'$OAUTH_ATTESTOR_PUBKEY'"
  }
}'

mychaind tx abstract-account register $CODE_ID "$INIT_MSG" \
    --salt $SALT \
    --funds $FUNDS \
    --from $SIGNER \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test
```

OAuth guardian votes count toward the same threshold as Cosmos guardian votes.
JWT is verified off-chain by `/api/oauth-attest`; only signed attestation goes on-chain.
Legacy on-chain JWT/JWKS path is removed from contract interface.

### To run send tx use sign/main.go, for example:

```
cd testing
go run sign/main.go

mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
mychaind q bank balances $ACCOUNT_ADDR

mychaind tx broadcast 1-bank-send.json

mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
mychaind q bank balances $ACCOUNT_ADDR
```

You can change `keyName` in the `sign/main.go` file to modify the user for signing

### To run social recovery tx use simple sign, for example:

Use `cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny` as sender in `recover-unsigned.json` and run:

```
mychaind tx sign ./recover-unsigned.json \
    --from user2 \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test > recover.json

mychaind tx broadcast recover.json
```

Use `cosmos1w3egyz0x8qs3c6sg8mx37y3fz4mu6zz0s5slpu` as sender in `recover-unsigned.json` and run:

```
mychaind tx sign ./recover-unsigned.json \
    --from user3 \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test > recover.json

mychaind tx broadcast recover.json
```
