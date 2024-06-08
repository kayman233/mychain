### To run local chain:

```
make install

BINARY=mychaind

MNEMONIC_1="guard cream sadness conduct invite crumble clock pudding hole grit liar hotel maid produce squeeze return argue turtle know drive eight casino maze host"
MNEMONIC_2="friend excite rough reopen cover wheel spoon convince island path clean monkey play snow number walnut pull lock shoot hurry dream divide concert discover"
MNEMONIC_3="fuel obscure melt april direct second usual hair leave hobby beef bacon solid drum used law mercy worry fat super must ritual bring faculty"
MNEMONIC_4="silly rebel tattoo style furnace gorilla giggle engine grass ticket friend act spell film achieve usage fatal crew notice seminar cute eagle grit consider"
GENESIS_COINS=10000000000000stake,10000000000000uatom

echo $MNEMONIC_1 | $BINARY keys add validator --recover --keyring-backend=test
echo $MNEMONIC_2 | $BINARY keys add user1 --recover --keyring-backend=test
echo $MNEMONIC_3 | $BINARY keys add user2 --recover --keyring-backend=test
echo $MNEMONIC_4 | $BINARY keys add user3 --recover --keyring-backend=test

export CHAIN_ID=mychain

$BINARY init test --chain-id $CHAIN_ID

$BINARY add-genesis-account $($BINARY keys show validator --keyring-backend test -a) $GENESIS_COINS
$BINARY add-genesis-account $($BINARY keys show user1 --keyring-backend test -a) $GENESIS_COINS
$BINARY add-genesis-account $($BINARY keys show user2 --keyring-backend test -a) $GENESIS_COINS
$BINARY add-genesis-account $($BINARY keys show user3 --keyring-backend test -a) $GENESIS_COINS

$BINARY gentx validator 100000000stake --chain-id $CHAIN_ID --keyring-backend test

$BINARY collect-gentxs

$BINARY start
```

### Local keys:

```
- address: cosmos1zaavvzxez0elundtn32qnk9lkm8kmcszzsv80v
  name: validator
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AvzwBOriY8sVwEXrXf1gXanhT9imlfWeUWLQ8pMxrRsg"}'
  type: local


- address: cosmos1mzgucqnfr2l8cj5apvdpllhzt4zeuh2cshz5xu
  name: user1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir"}'
  type: local


- address: cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
  name: user2
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuFUt9g9uckLNgVlO7BCzqUCOL8OUg+zIgeHTxxeG4Fy"}'
  type: local

- address: cosmos1w3egyz0x8qs3c6sg8mx37y3fz4mu6zz0s5slpu
  name: user3
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"A4laXcJDXxb8qNewM8eQB1/1sWPpFABWZ4LtzPDt0db8"}'
  type: local
```

user1
address: cosmos1mzg...z5xu
pubkey: AuXp...aLir

user2
address: cosmos185f...x0ny  
pubkey: AuFU...G4Fy
  
user3
address: cosmos1w3e...slpu

contract 
address: cosmos1mss...y649







docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.13.0

export PATH_TO_WASM_FILE="./social_recovery.wasm"
export SIGNER=user1
export CHAIN_ID=newtest

mychaind tx wasm store \
    $PATH_TO_WASM_FILE \
    --from $SIGNER \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test

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

mychaind q tx _

export ACCOUNT_ADDR=cosmos1mssg28kaflv6g25phn7ncv25ygtky0najzqvjl0cay8fg95ry3ls5ny649

mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"pubkey":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"guardians_list":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"threshold":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"votes":{}}' --output json | jq
mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"counts":{}}' --output json | jq

mychaind tx sign ./update-unsigned.json \
    --from user2 \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test > update.json

mychaind tx broadcast update.json

mychaind tx bank send $(mychaind keys show $SIGNER -a) $ACCOUNT_ADDR 100000000stake \
    --from $SIGNER \
    --fees 200stake \
    --chain-id $CHAIN_ID

node activate.js $CODE_ID $SALT $PUBKEY $INIT_MSG

mnemonic: stomach winner ramp label shadow funny atom gaze goose riot soda boring wrist broken sleep benefit slot tube custom obscure way problem sibling gold
address: aura1ru5pcrc4p8gquqvcmv6eggasm7cnr4t2yqwfsz
pubkey: {
  '@type': '/cosmos.crypto.secp256k1.PubKey',
  key: 'A19/xMNzzvUPAZeuaRB7hlBE0NubhVqDcfSpcmlV7HEX'
}

mychaind q bank balances $ACCOUNT_ADDR

export TO_ADDRESS=aura130yqqmwf9nyz7r75z5jvqcwqpfphc6vuqrk0er
export AMOUNT=5000
node send.js $TO_ADDRESS $AMOUNT

mychaind q bank balances $TO_ADDRESS


- address: cosmos1zaavvzxez0elundtn32qnk9lkm8kmcszzsv80v
  name: validator
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AvzwBOriY8sVwEXrXf1gXanhT9imlfWeUWLQ8pMxrRsg"}'
  type: local


- address: cosmos1mzgucqnfr2l8cj5apvdpllhzt4zeuh2cshz5xu
  name: user1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir"}'
  type: local


- address: cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
  name: user2
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuFUt9g9uckLNgVlO7BCzqUCOL8OUg+zIgeHTxxeG4Fy"}'
  type: local

contract_addr
cosmos13rwp77gu37fs5s96wal9vvtvtq9m4dkyrxwy58edz8kutahsmy4sm876fm







ivan@MacBook-Air-ivan newtest % echo $MNEMONIC_1 | $BINARY keys add validator --recover --keyring-backend=test
echo $MNEMONIC_2 | $BINARY keys add user1 --recover --keyring-backend=test
echo $MNEMONIC_3 | $BINARY keys add user2 --recover --keyring-backend=test


- address: cosmos1zaavvzxez0elundtn32qnk9lkm8kmcszzsv80v
  name: validator
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AvzwBOriY8sVwEXrXf1gXanhT9imlfWeUWLQ8pMxrRsg"}'
  type: local


- address: cosmos1mzgucqnfr2l8cj5apvdpllhzt4zeuh2cshz5xu
  name: user1
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir"}'
  type: local


- address: cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
  name: user2
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AuFUt9g9uckLNgVlO7BCzqUCOL8OUg+zIgeHTxxeG4Fy"}'
  type: local



make install

docker run --rm -v "$(pwd)":/code \
    --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
    --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
    --platform linux/arm64 \
    cosmwasm/workspace-optimizer-arm64:0.12.13

docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.13.0

BINARY=mychaind

MNEMONIC_1="guard cream sadness conduct invite crumble clock pudding hole grit liar hotel maid produce squeeze return argue turtle know drive eight casino maze host"
MNEMONIC_2="friend excite rough reopen cover wheel spoon convince island path clean monkey play snow number walnut pull lock shoot hurry dream divide concert discover"
MNEMONIC_3="fuel obscure melt april direct second usual hair leave hobby beef bacon solid drum used law mercy worry fat super must ritual bring faculty"
GENESIS_COINS=10000000000000stake,10000000000000uatom

echo $MNEMONIC_1 | $BINARY keys add validator --recover --keyring-backend=test
echo $MNEMONIC_2 | $BINARY keys add user1 --recover --keyring-backend=test
echo $MNEMONIC_3 | $BINARY keys add user2 --recover --keyring-backend=test

export CHAIN_ID=newtest

$BINARY init test --chain-id $CHAIN_ID

$BINARY add-genesis-account $($BINARY keys show validator --keyring-backend test -a) $GENESIS_COINS
$BINARY add-genesis-account $($BINARY keys show user1 --keyring-backend test -a) $GENESIS_COINS
$BINARY add-genesis-account $($BINARY keys show user2 --keyring-backend test -a) $GENESIS_COINS

$BINARY gentx validator 100000000stake --chain-id $CHAIN_ID --keyring-backend test

$BINARY collect-gentxs

$BINARY start

export PATH_TO_WASM_FILE="./cosmwasm/artifacts/account_updatable-aarch64.wasm"
export SIGNER=user1

mychaind tx wasm store \                           
    $PATH_TO_WASM_FILE \
    --from $SIGNER \   
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test

mychaind q wasm list-code

mychaind keys --keyring-backend test

export CODE_ID=2                              
export INIT_MSG='{"pubkey":"AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir"}'
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

mychaind q tx E97D5BF0A7D1369954209D7E299A32D7B455184E8AA046F61A7A9E68300992DD

export ACCOUNT_ADDR=cosmos13rwp77gu37fs5s96wal9vvtvtq9m4dkyrxwy58edz8kutahsmy4sm876fm

mychaind q wasm contract-state smart $ACCOUNT_ADDR '{"pubkey":{}}' --output json | jq

cd testing
go run sign/main.go
mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny
mychaind tx broadcast 1-bank-send.json
mychaind q bank balances cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny

- address: cosmos1qg26wrk66u634um53msc0t7nplux7saral2rc3
  name: test
  pubkey: '{"@type":"/cosmos.crypto.secp256k1.PubKey","key":"AgQU66P9RK7sTvnG86rmbO6CLp/7gARLX1FPoM0qDDF5"}'
  type: local


npm install -g @cosmology/telescope@0.102.0
npm install -g @cosmology/telescope@0.102.0 create-cosmos-app@1.4.2

npx create-cosmos-app@1.4.2 --boilerplate telescope
npm install -g @cosmwasm/ts-codegen


mychaind tx sign ./1-bank-send-unsigned.json \
    --from user1 \
    --chain-id $CHAIN_ID \
    --gas=auto \
    --gas-adjustment 1.4 \
    --keyring-backend test > 1-bank-send.json

    {"body":{"messages":[{"@type":"/cosmos.bank.v1beta1.MsgSend","from_address":"cosmos1mssg28kaflv6g25phn7ncv25ygtky0najzqvjl0cay8fg95ry3ls5ny649","to_address":"cosmos185fflsvwrz0cx46w6qada7mdy92m6kx4gqx0ny","amount":[{"denom":"uatom","amount":"12345"}]}],"memo":"","timeout_height":"0","extension_options":[],"non_critical_extension_options":[]},"auth_info":{"signer_infos":[{"public_key":{"@type":"/abstractaccount.v1.NilPubKey","address_bytes":"3CCFHt1P2aQqgbz9PDFUIhdiPn2QgMl9+OkOlBaDJH8="},"mode_info":{"single":{"mode":"SIGN_MODE_DIRECT"}},"sequence":"1"}],"fee":{"amount":[],"gas_limit":"200000","payer":"","granter":""},"tip":null},"signatures":["ta0/7SquAcW9iEOAMNGnu4lT+I6aU/3QCBowcTgRXeoC9f9e+0e2CslgYvVI5bADflYxoFxtQAWkPzkLb9vKqg=="]}


npx create-vite my-react-wasm-app --template react