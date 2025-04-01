import { useChain } from '@cosmos-kit/react';
import { defaultChainName } from '../config';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SocialRecoveryClient } from '../codegen/SocialRecovery.client';
import {
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  ArrayOfKeyValueResponse,
  GuardiansListResp,
} from '../codegen/SocialRecovery.types';
import { AccountsState, StoredAccount } from './types';
import axios from 'axios';
import { defaultBackendEndpoint } from '../config';

// to wait until the tx is in the block
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const updateAccounts = (newAccount: StoredAccount) => {
  if (typeof window === 'undefined') return;

  const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
  storedAccounts.push(newAccount);
  localStorage.setItem('accounts', JSON.stringify(storedAccounts));
  return storedAccounts;
};

export function useAA(
  contractAddress: string | undefined,
  txHash: string,
  setTxHash: (v: string) => void
) {
  const { address, username, getSigningCosmWasmClient } = useChain(defaultChainName);

  const [pubkey, setPubkey] = useState<string | null>(null);
  const [threshold, setThreshold] = useState<number | null>(null);
  const [isGuardian, setIsGuardian] = useState<boolean>(false);
  const [guardians, setGuardians] = useState<GuardiansListResp | null>(null);
  const [votes, setVotes] = useState<ArrayOfVotesResponse | null>(null);
  const [counts, setCounts] = useState<ArrayOfCountsResponse | null>(null);
  const [data, setData] = useState<ArrayOfKeyValueResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [accountsState, setAccountsState] = useState<AccountsState>({
    accounts: [],
    selectedAccount: null,
  });

  // Храним клиенты в ref
  const clientRef = useRef<{
    cosmWasm: any;
    socialRecovery: SocialRecoveryClient | null;
  }>({
    cosmWasm: null,
    socialRecovery: null,
  });

  // Храним предыдущие значения для сравнения
  const prevRef = useRef<{
    txHash: string;
    selectedAccount: string | null;
  }>({
    txHash: '',
    selectedAccount: null,
  });

  // Таймер для дебаунса
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Функция для очистки клиента
  const cleanupClient = useCallback(async () => {
    try {
      if (clientRef.current.cosmWasm) {
        await clientRef.current.cosmWasm.disconnect();
      }
      clientRef.current = {
        cosmWasm: null,
        socialRecovery: null,
      };
    } catch (error) {
      console.error('Error cleaning up client:', error);
    }
  }, []);

  // Функция для инициализации клиента
  const initClient = useCallback(async () => {
    if (!address || !accountsState.selectedAccount) {
      return null;
    }

    try {
      await cleanupClient();

      const cosmWasmClient = await getSigningCosmWasmClient();
      if (!cosmWasmClient) return null;

      const socialRecoveryClient = new SocialRecoveryClient(
        cosmWasmClient,
        address,
        accountsState.selectedAccount.contractAddress
      );

      clientRef.current = {
        cosmWasm: cosmWasmClient,
        socialRecovery: socialRecoveryClient,
      };

      return socialRecoveryClient;
    } catch (error) {
      console.error('Error initializing client:', error);
      await cleanupClient();
      return null;
    }
  }, [address, accountsState.selectedAccount, cleanupClient, getSigningCosmWasmClient]);

  // Функция для обновления состояния accounts
  const updateAccountsState = useCallback(() => {
    if (typeof window !== 'undefined') {
      const storedAccounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      setAccountsState({
        accounts: storedAccounts,
        selectedAccount: storedAccounts[0] || null,
      });
    }
  }, []);

  // Инициализация accounts при монтировании
  useEffect(() => {
    updateAccountsState();
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      cleanupClient();
    };
  }, [updateAccountsState, cleanupClient]);

  // Слушатель событий для обновления accounts при изменении localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'accounts') {
        updateAccountsState();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [updateAccountsState]);

  // Функция для обновления данных аккаунта
  const updateAccountInfo = useCallback(async () => {
    setIsLoading(true);
    try {
      const client = await initClient();
      if (!client || !address) return;

      const [pubkeyRes, thresholdRes, guardiansRes, countsRes, votesRes, dataRes] =
        await Promise.all([
          client.pubkey(),
          client.threshold(),
          client.guardiansList(),
          client.counts(),
          client.votes(),
          client.getAllData(),
        ]);

      setPubkey(pubkeyRes);
      setThreshold(thresholdRes);
      setGuardians(guardiansRes);
      if (address) {
        const foundGuardian = guardiansRes.guardians.includes(address);
        setIsGuardian(foundGuardian);
      }
      setCounts(countsRes);
      setVotes(votesRes);
      setData(dataRes);
    } catch (error) {
      console.error('Error updating account info:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initClient, address]);

  // Автоматическое обновление данных при изменении клиента или транзакции
  useEffect(() => {
    const currentSelectedAccount = accountsState.selectedAccount?.contractAddress || null;

    // Проверяем, действительно ли что-то изменилось
    if (
      prevRef.current.txHash === txHash &&
      prevRef.current.selectedAccount === currentSelectedAccount
    ) {
      return;
    }

    // Обновляем предыдущие значения
    prevRef.current = {
      txHash,
      selectedAccount: currentSelectedAccount,
    };

    // Очищаем предыдущий таймер
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Устанавливаем новый таймер для дебаунса
    timerRef.current = setTimeout(() => {
      updateAccountInfo();
    }, 1000); // Задержка в 1 секунду

    // Очищаем таймер при размонтировании
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [updateAccountInfo, txHash, accountsState.selectedAccount]);

  const handleRecover = useCallback(
    async (newPubkey: string | undefined) => {
      if (!newPubkey || !address) return;

      try {
        const client = await initClient();
        if (!client) return;

        const result = await client.recover({ newPubkey }, { gas: '1000000', amount: [] });
        await delay(3000);
        setTxHash(result.transactionHash);
        return result.transactionHash as any;
      } catch (error) {
        console.error('Error in handleRecover:', error);
      }
    },
    [address, initClient, setTxHash]
  );

  const handleRevoke = useCallback(async () => {
    setIsLoading(true);
    try {
      const client = await initClient();
      if (!client || !address) return;

      const result = await client.revoke();
      setTxHash(result.transactionHash);
    } catch (error) {
      console.error('Error revoking:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initClient, address, setTxHash]);

  const handleSetData = useCallback(
    async (key: string, value: string) => {
      if (!accountsState.selectedAccount?.contractAddress || !address || !key || !value) {
        return;
      }

      setIsLoading(true);
      try {
        const data = {
          sender: accountsState.selectedAccount.contractAddress,
          contract: accountsState.selectedAccount.contractAddress,
          msg: {
            store_data: {
              key: key,
              value: btoa(value),
            },
          },
          user: username,
        };

        const headers = {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        };

        const response = await axios.post(`${defaultBackendEndpoint}/execute`, data, headers);
        await delay(3000);
        setTxHash(response.data.txHash);
        return response.data.result;
      } catch (error) {
        console.error('Error in handleSetData:', error);
      } finally {
        setIsLoading(false);
      }
    },
    [accountsState.selectedAccount?.contractAddress, address, username, setTxHash]
  );

  const selectAccount = useCallback((account: StoredAccount) => {
    setAccountsState(prev => ({
      ...prev,
      selectedAccount: account,
    }));
  }, []);

  return {
    accountInfo: { pubkey, threshold, guardians, counts, votes, data },
    isGuardian,
    txHash,
    accounts: accountsState.accounts,
    selectedAccount: accountsState.selectedAccount,
    selectAccount,
    handleRecover,
    handleRevoke,
    handleSetData,
    updateAccountInfo,
    isLoading,
  };
}
