import { useChain } from '@cosmos-kit/react';
import { defaultChainName } from '../config';
import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from 'react';

const rpc = "127.0.0.1:26657"

export function useBalances(amount: string | undefined, recipient: string | undefined) {
    const { address, getStargateClient, getSigningStargateClient, signAndBroadcast } = useChain(defaultChainName);

    const [clientCosmos, setClientCosmos] = useState<StargateClient | null>(null); 
    const [signingClientCosmos, setSigningClientCosmos] = useState<SigningStargateClient | null>(null); 
    const [txHash, setTxHash] = useState<string | undefined>(undefined); 
    const [balance, setBalance] = useState<string | null>(null);

    useEffect(() => {
        if (!address) {
            return;
        }
        getStargateClient().then((client) => {
            if (!client) {
                return;
            }
            setClientCosmos(client);
        })
    }, [address, getStargateClient]);
    // cosmos1j0hxmkg349vnx6wfnxwg85uu9fkpzvtyet7zty
    useEffect(() => {
        if (!address) {
            return;
        }
        getSigningStargateClient().then((client) => {
              if (!client) {
                  return;
              }
              setSigningClientCosmos(client);
          })
      }, [address, getSigningStargateClient]);

    // "auth_info": {
    //     "signer_infos": [],
    //     "fee": { "amount": [], "gas_limit": "200000", "payer": "", "granter": "" },
    //     "tip": null
    //   }

    useEffect(() => {
        if (clientCosmos && address) {
            clientCosmos.getBalance(address, "stake")
            .then((res) => setBalance(res.amount))
        }
    });

    const handleSend = useCallback(async () => {
        if (!clientCosmos) {
          return;
        }
    
        if (!amount || !recipient || !address || !signingClientCosmos) {
          return;
        }
    
        const message = [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: address,
              toAddress: recipient,
              amount: [
                {
                  amount: String(amount),
                  denom: 'stake',
                },
              ],
            },
          },
        ];

        const result = await signingClientCosmos.signAndBroadcast(address, message, { gas: "200000", amount: []});
        // await signAndBroadcast(message, { gas: "2000000", amount: []} );
    
        // console.log(result);
        setTxHash(result.transactionHash);
    }, [signAndBroadcast, address, amount, recipient, setTxHash, signingClientCosmos]);

    return { balance: balance ?? undefined, txHash, handleSend };
}