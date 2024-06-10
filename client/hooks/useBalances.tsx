import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName, defaultRpc } from '../config';
import { SigningStargateClient, SigningStargateClientOptions, StargateClient } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from 'react';
import { accountFromAny } from '../config/accounts';
import axios from 'axios';

export function useBalances(localContractAddress: string | undefined) {
    const { address, getStargateClient, signAndBroadcast, getOfflineSigner, username } = useChain(defaultChainName);

    const [clientCosmos, setClientCosmos] = useState<StargateClient | null>(null); 
    const [signingClientCosmos, setSigningClientCosmos] = useState<SigningStargateClient | null>(null); 
    const [txHash, setTxHash] = useState<string>(''); 
    const [accountBalance, setAccountBalance] = useState<string>('');
    const [balance, setBalance] = useState<string>('');
    const [result, setResult] = useState('');

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
    }, [address]);

    useEffect(() => {
        if (!address) {
            return;
        }
        const options: SigningStargateClientOptions = { accountParser: accountFromAny };

        SigningStargateClient.connectWithSigner(defaultRpc, getOfflineSigner(), options).then((client) => {
              if (!client) {
                  return;
              }
              setSigningClientCosmos(client);
          })
      }, [address]);

    useEffect(() => {
        if (clientCosmos && address) {
            clientCosmos.getBalance(address, "stake").then((res) => setBalance(res.amount));
            if (localContractAddress) {
                clientCosmos.getBalance(localContractAddress, "stake").then((res) => setAccountBalance(res.amount))
            }
        }
    }, [address, clientCosmos, localContractAddress]);

    const handleSend = useCallback(async (amount: string | undefined, recipient: string | undefined) => {
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
        setTxHash(result.transactionHash);
    }, [signAndBroadcast, address, setTxHash, signingClientCosmos]);

    const handleSendAA = useCallback(async (amount: string | undefined, recipient: string | undefined) => {    
        if (!localContractAddress || !recipient || !amount || !username) {
            console.error('Error sending', localContractAddress, recipient, amount, username);
            return;
        }
        const data = {
            sender: localContractAddress,
            recipient: recipient,
            denom: "stake",
            amount: amount,
            user: username
        };
        const headers = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        await axios.post(`${defaultBackendEndpoint}/send`, data, headers)
            .then(response => {
                setResult(response.data.result);
            })
            .catch(error => {
                console.error('Error sending:', error);
            });
    }, [localContractAddress, username, setResult]);

    return { balance: balance ?? undefined, txHash, result, accountBalance, handleSend, handleSendAA };
}