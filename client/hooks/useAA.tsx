import { useChain } from '@cosmos-kit/react';
import { defaultCA, defaultChainName } from '../config';
// import { SigningStargateClient, StargateClient } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from 'react';
import { SocialRecoveryClient, SocialRecoveryQueryClient } from '../codegen/SocialRecovery.client';
import { WalletAccount } from '@cosmos-kit/core';
import { ArrayOfCountsResponse, ArrayOfVotesResponse, GuardiansListResp } from '../codegen/SocialRecovery.types';

// const rpc = "127.0.0.1:26657"

export function useAA(newPubkey: string | undefined) {
    const { address, getCosmWasmClient, getSigningCosmWasmClient, getAccount } = useChain(defaultChainName);

    const [socialClient, setSocialClient] = useState<SocialRecoveryQueryClient | null>(null);
    const [signingClient, setSigningClient] = useState<SocialRecoveryClient | null>(null); 
    const [account, setAccount] = useState<WalletAccount | null>(null); 
    const [txHash, setTxHash] = useState<string | undefined>(undefined); 
    const [pubkey, setPubkey] = useState<string | null>(null);
    const [threshold, setThreshold] = useState<number | null>(null);
    const [guardians, setGuardians] = useState<GuardiansListResp | null>(null);
    const [votes, setVotes] = useState<ArrayOfVotesResponse | null>(null);
    const [counts, setCounts] = useState<ArrayOfCountsResponse | null>(null);

    const [userPubkey, setUserPubkey] = useState<string | null>(null);

    useEffect(() => {
        if (!address) {
            return;
        }
        getCosmWasmClient().then((client) => {
            if (!client || !defaultCA) {
                return;
            }
            const newClient = new SocialRecoveryQueryClient(client, defaultCA);
            setSocialClient(newClient);
        })
    }, [address, defaultCA]);

    useEffect(() => {
        if (!address) {
            return;
        }
        getSigningCosmWasmClient().then((client) => {
            if (!client || !defaultCA) {
                return;
            }
            const newClient = new SocialRecoveryClient(client, address, defaultCA);
            setSigningClient(newClient);
        })
    }, [address, defaultCA]);

    useEffect(() => {
        if (!address) {
            return;
        }
        getAccount().then((acc) => {
            if (!acc) {
                return;
            }
            setAccount(acc);
        })
    }, [address, getAccount]);

    useEffect(() => {
        if (socialClient) {
            socialClient.pubkey().then((res) => setPubkey(res));
            socialClient.threshold().then((res) => setThreshold(res));
            socialClient.guardiansList().then((res) => setGuardians(res));
            socialClient.counts().then((res) => setCounts(res));
            socialClient.votes().then((res) => setVotes(res));
        }
    }, [socialClient]);

    useEffect(() => {
        if (account) {
            const str = Buffer.from(account.pubkey).toString('base64');
            setUserPubkey(str);
        }
    }, [account]);

    const handleRecover = useCallback(async () => {
        if (!signingClient) {
          return;
        }
    
        if (!address || !newPubkey) {
          return;
        }
    
        // const message = [
        //   {
        //     typeUrl: '/cosmos.bank.v1beta1.MsgSend',
        //     value: {
        //       fromAddress: address,
        //       toAddress: recipient,
        //       amount: [
        //         {
        //           amount: String(amount),
        //           denom: 'stake',
        //         },
        //       ],
        //     },
        //   },
        // ];

        const result = await signingClient.recover({newPubkey}, { gas: "1000000", amount: []});
        // await signAndBroadcast(message, { gas: "2000000", amount: []} );
    
        // console.log(result);
        setTxHash(result.transactionHash);
    }, [address, signingClient, newPubkey]);

    return { pubkey, userPubkey, threshold, guardians, counts, votes, txHash, handleRecover};
}

    // cosmos1j0hxmkg349vnx6wfnxwg85uu9fkpzvtyet7zty
    // "auth_info": {
    //     "signer_infos": [],
    //     "fee": { "amount": [], "gas_limit": "200000", "payer": "", "granter": "" },
    //     "tip": null
    //   }