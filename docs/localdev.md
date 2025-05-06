### To run local chain:

Prerequisites:
```
Go 1.19+
nvm
Docker
```

Install to get an executable `mychaind` in `$USER/go/bin`
```
make install
```

And run the chain with pregenerated users:

```
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

### Generated local users as a result:

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


cosmos18vu0vjeep5f4ljrctft3upn9jn7hy539wu7yns6sknk3gpkdaqssy2223f
AuFUt9g9uckLNgVlO7BCzqUCOL8OUg+zIgeHTxxeG4Fy


cosmos1ynym7edamc4s2vwjadtt6fqswgl7m7dq5yff3g0jp5lh6zj8729sk3s0ja
AuXpdpSX+8fH7lerOczty2EgGFd9MMoJADPcZ7pdaLir
