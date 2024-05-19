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

### Generate account and get addr

```
export CODE_ID=1
export INIT_MSG='{"pubkey":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir","guardians":["cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny","cosmos1zaavvzxez0elundtn32qnk9lkm8kmcszzsv80v"],"threshold":2}'
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
In last attributes(before raw_log), key: contract_addr is the address. To export it:
```
export ACCOUNT_ADDR=<contract_addr>
```

Also change address in testing/*.json files

### View state of the account
```
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"guardians_list":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"threshold":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"pubkey":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"votes":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"counts":{}}' --output json | jq
```

### To run send tx use sign/main.go, for example:

```
cd testing
go run sign/main.go
mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
mychaind tx broadcast 1-bank-send.json
mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
```

### To run social recovery tx use simple sign, for example:

```
mychaind tx sign ./update-unsigned.json \
    --from user2 \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test > update.json

mychaind tx broadcast update.json
```