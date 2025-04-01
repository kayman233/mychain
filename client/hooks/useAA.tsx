import { useChain } from '@cosmos-kit/react';
import { defaultChainName } from '../config';
import { useCallback, useEffect, useState } from 'react';
import { SocialRecoveryClient } from '../codegen/SocialRecovery.client';
import {
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  GuardiansListResp,
} from '../codegen/SocialRecovery.types';
import { AccountsState, StoredAccount } from './types';

// to wait until the tx is in the block
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export function useAA(
  contractAddress: string | undefined,
  txHash: string,
  setTxHash: (v: string) => void
) {
  const { address, getSigningCosmWasmClient } = useChain(defaultChainName);

  const [signingClient, setSigningClient] = useState<SocialRecoveryClient | null>(null);
  const [pubkey, setPubkey] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [isGuardian, setIsGuardian] = useState<boolean>(false);
  const [guardians, setGuardians] = useState<GuardiansListResp | null>(null);
  const [votes, setVotes] = useState<ArrayOfVotesResponse | null>(null);
  const [counts, setCounts] = useState<ArrayOfCountsResponse | null>(null);

  const [accountsState, setAccountsState] = useState<AccountsState>({
    accounts: [],
    selectedAccount: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      console.log('storedAccounts', storedAccounts);
      setAccountsState({
        accounts: storedAccounts,
        selectedAccount: storedAccounts[0] || null,
      });
    }
  }, []);

  useEffect(() => {
    if (!address || !accountsState.selectedAccount) {
      return;
    }

    getSigningCosmWasmClient().then(client => {
      if (!client) {
        return;
      }
      const newClient = new SocialRecoveryClient(
        client,
        address,
        accountsState.selectedAccount?.contractAddress || ''
      );
      setSigningClient(newClient);
    });
  }, [address, accountsState.selectedAccount, getSigningCosmWasmClient]);

  useEffect(() => {
    if (signingClient) {
      console.log('signingClient', signingClient);
      signingClient.pubkey().then(res => setPubkey(res));
      signingClient.threshold().then(res => setThreshold(res));
      signingClient.guardiansList().then(res => {
        setGuardians(res);
        if (address) {
          const foundGuardian = res.guardians.includes(address);
          setIsGuardian(foundGuardian);
        }
      });
      signingClient.counts().then(res => setCounts(res));
      signingClient.votes().then(res => setVotes(res));
    }
  }, [signingClient, address, txHash, contractAddress]);

  const handleRecover = useCallback(
    async (newPubkey: string | undefined) => {
      if (!signingClient || !address || !newPubkey) {
        return;
      }

      const result = await signingClient.recover({ newPubkey }, { gas: '1000000', amount: [] });
      await delay(3000);
      setTxHash(result.transactionHash);
      return result.transactionHash as any;
    },
    [address, signingClient, setTxHash]
  );

  const handleRevoke = useCallback(async () => {
    if (!signingClient || !address) {
      return;
    }

    const result = await signingClient.revoke({ gas: '1000000', amount: [] });
    await delay(3000);
    setTxHash(result.transactionHash);
    return result.transactionHash as any;
  }, [address, signingClient, setTxHash]);

  const selectAccount = useCallback((account: StoredAccount) => {
    setAccountsState(prev => ({
      ...prev,
      selectedAccount: account,
    }));
  }, []);

  return {
    accountInfo: { pubkey, threshold, guardians, counts, votes },
    isGuardian,
    txHash,
    accounts: accountsState.accounts,
    selectedAccount: accountsState.selectedAccount,
    selectAccount,
    handleRecover,
    handleRevoke,
  };
}
