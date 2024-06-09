import { useChain } from '@cosmos-kit/react';
import { defaultChainName } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { SocialRecoveryClient } from '../codegen/SocialRecovery.client';
import { WalletAccount } from '@cosmos-kit/core';
import { ArrayOfCountsResponse, ArrayOfVotesResponse, GuardiansListResp } from '../codegen/SocialRecovery.types';

export function useAA(newPubkey: string | undefined, contractAddress: string | undefined) {
    const { address, getSigningCosmWasmClient, getAccount } = useChain(defaultChainName);

    const [signingClient, setSigningClient] = useState<SocialRecoveryClient | null>(null); 
    const [account, setAccount] = useState<WalletAccount | null>(null); 
    const [txHash, setTxHash] = useState<string | undefined>(undefined); 
    const [pubkey, setPubkey] = useState<string | null>(null);
    const [threshold, setThreshold] = useState<number | null>(null);
    const [isGuardian, setIsGuardian] = useState<boolean>(false);
    const [guardians, setGuardians] = useState<GuardiansListResp | null>(null);
    const [votes, setVotes] = useState<ArrayOfVotesResponse | null>(null);
    const [counts, setCounts] = useState<ArrayOfCountsResponse | null>(null);
    
    const [contractAddressLocal, setLocalContractAddress] = useState<string>('');

    const [userPubkey, setUserPubkey] = useState<string | null>(null);

    useEffect(() => {
        const contractAddressFromLocal = localStorage.getItem('contractAddress');
        if (contractAddressFromLocal) {
            setLocalContractAddress(contractAddressFromLocal);
        }
    }, [contractAddress]);

    useEffect(() => {
        if (!address || contractAddressLocal.length === 0) {
            return;
        }
        getSigningCosmWasmClient().then((client) => {
            if (!client) {
                return;
            }
            const newClient = new SocialRecoveryClient(client, address, contractAddressLocal);
            setSigningClient(newClient);
        })
    }, [address]);

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
        if (signingClient) {
            signingClient.pubkey().then((res) => setPubkey(res));
            signingClient.threshold().then((res) => setThreshold(res));
            signingClient.guardiansList().then((res) => {
                setGuardians(res);
                if (address) {
                    const foundGuardian = res.guardians.includes(address);
                    setIsGuardian(foundGuardian);
                }
            });
            signingClient.counts().then((res) => setCounts(res));
            signingClient.votes().then((res) => setVotes(res));
        }
    }, [signingClient, address]);

    useEffect(() => {
        if (account) {
            const str = Buffer.from(account.pubkey).toString('base64');
            setUserPubkey(str);
        }
    }, [account]);

    const handleRecover = useCallback(async () => {
        if (!signingClient || !address || !newPubkey) {
          return;
        }

        const result = await signingClient.recover({newPubkey}, { gas: "1000000", amount: []});
        setTxHash(result.transactionHash);
    }, [address, signingClient, newPubkey]);

    const handleRevoke = useCallback(async () => {
        if (!signingClient || !address) {
          return;
        }

        const result = await signingClient.revoke({ gas: "1000000", amount: []});
        setTxHash(result.transactionHash);
    }, [address, signingClient, newPubkey]);

    return { pubkey, userPubkey, isGuardian, threshold, guardians, counts, votes, txHash, contractAddressLocal, handleRecover, handleRevoke};
}
