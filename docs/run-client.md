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
