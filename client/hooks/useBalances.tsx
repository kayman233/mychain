import { useChain } from '@cosmos-kit/react';
import { defaultCA, defaultChainID, defaultChainName } from '../config';
import { SigningStargateClient, SigningStargateClientOptions, StargateClient } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from 'react';
import { accountFromAny } from '../config/accounts';
import { TxRaw, Tx } from "cosmjs-types/cosmos/tx/v1beta1/tx";

import {
    EncodeObject,
    encodePubkey,
    GeneratedType,
    isOfflineDirectSigner,
    makeAuthInfoBytes,
    makeSignDoc,
    OfflineSigner,
    Registry,
    TxBodyEncodeObject,
  } from "@cosmjs/proto-signing";
import { sendTx } from './send';

const rpc = "127.0.0.1:26657"

export function useBalances(amount: string | undefined, recipient: string | undefined) {
    const { address, wallet, getStargateClient, getSigningStargateClient, signAndBroadcast, getOfflineSigner } = useChain(defaultChainName);

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
    }, [address]);
    // cosmos1j0hxmkg349vnx6wfnxwg85uu9fkpzvtyet7zty
    useEffect(() => {
        if (!address) {
            return;
        }
        const options: SigningStargateClientOptions = { accountParser: accountFromAny };

        SigningStargateClient.connectWithSigner(rpc, getOfflineSigner(), options).then((client) => {
              if (!client) {
                  return;
              }
            //   client.connectWithSigner()
              setSigningClientCosmos(client);
          })
      }, [address]);

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

        // const offlineSigner = window.keplr.getOfflineSigner(keplrChainId);

        // const accounts = await offlineSigner.getAccounts();

        // const cosmJS = await SigningStargateClient.connectWithSigner(
        //     'https://rpc-cosmoshub.keplr.app',
        //     offlineSigner,
        // );

    
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

    const handleSendAA = useCallback(async () => {    
        if (!amount || !recipient || !address || !signingClientCosmos || !clientCosmos) {
          return;
        }

        const acc = await signingClientCosmos.getAccount(defaultCA);

        if (!acc) {
            console.log('no acc');
            return;
        } else {
            console.log('acc', acc);
        }
    
        const message = [
          {
            typeUrl: '/cosmos.bank.v1beta1.MsgSend',
            value: {
              fromAddress: defaultCA,
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

        console.log("isOffline", signingClientCosmos);

        const result = await signingClientCosmos.sign(address, message, { gas: "200000", amount: []}, "", {
            accountNumber: acc.accountNumber,
            sequence: acc.sequence,
            chainId: defaultChainID,
        });

        // const result = await signingClientCosmos.signAndBroadcast(address, message, { gas: "200000", amount: []});
        // await signAndBroadcast(message, { gas: "2000000", amount: []} );
    
        console.log("result", result);

        console.log("result json", TxRaw.toJSON(result));

        // console.log("authInfoBytes", Buffer.from(result.authInfoBytes).toString('base64'));
        // console.log("bodyBytes", Buffer.from(result.bodyBytes).toString('base64'));
        // console.log("signatures", Buffer.from(result.signatures[0]).toString('base64'));

        const mytx = Tx.fromJSON(sendTx);

        console.log("mytx", mytx);

        console.log("mytx json", Tx.toJSON(mytx));

        const myTxBytes = Tx.encode(mytx).finish();

        console.log("myTx str? ",Buffer.from(myTxBytes).toString('base64'))

        // const br = await signingClientCosmos.broadcastTx(txBytes);

        // console.log("res br", br);

        // setTxHash(br.transactionHash);
    }, [signAndBroadcast, address, amount, recipient, setTxHash, clientCosmos, signingClientCosmos, defaultCA]);

    return { balance: balance ?? undefined, txHash, handleSend, handleSendAA };
}