export const chain = {
  $schema: "../../chain.schema.json",
  chain_name: "gmrollup",
  chain_id: "mychain",
  pretty_name: "Mychain",
  status: "live",
  network_type: "testnet",
  bech32_prefix: "cosmos",
  daemon_name: "mychaind",
  node_home: "$HOME/.mychain",
  key_algos: ["secp256k1"],
  slip44: 118,
  fees: {
    fee_tokens: [
      {
        // ustake??
        denom: "stake",
        fixed_min_gas_price: 0,
      },
    ],
  },
  apis: {
    rpc: [
      {
        // "address": "http://localhost:26657",
        address: "127.0.0.1:26657",
        provider: "JCS",
      },
    ],
    rest: [
      {
        address: "http://localhost:1317",
        provider: "JCS",
      },
    ],
  },
  beta: true,
  // "explorers": [
  //   {
  //     "kind": "Mintscan",
  //     "url": "https://testnet.mintscan.io/celestia-incentivized-testnet",
  //     "tx_page": "https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${txHash}"
  //   }
  // ]
};
