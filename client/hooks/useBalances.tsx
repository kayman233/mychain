import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName, defaultRpc } from '../config';
import {
  SigningStargateClient,
  SigningStargateClientOptions,
  StargateClient,
} from '@cosmjs/stargate';
import { useCallback, useEffect, useRef, useState } from 'react';
import { accountFromAny } from '../config/accounts';
import axios from 'axios';
import { delay } from './useAA';

export function useBalances(
  localContractAddress: string | undefined,
  txHash: string,
  setTxHash: (v: string) => void
) {
  const { address, getStargateClient, getOfflineSigner, username } = useChain(defaultChainName);

  const [accountBalance, setAccountBalance] = useState<string>('');
  const [balance, setBalance] = useState<string>('');
  const [result] = useState('');

  // Храним клиенты в ref
  const clientsRef = useRef<{
    cosmos: StargateClient | null;
    signingCosmos: SigningStargateClient | null;
  }>({
    cosmos: null,
    signingCosmos: null,
  });

  // Функция для очистки клиентов
  const cleanupClients = useCallback(async () => {
    try {
      if (clientsRef.current.cosmos) {
        await clientsRef.current.cosmos.disconnect();
      }
      if (clientsRef.current.signingCosmos) {
        await clientsRef.current.signingCosmos.disconnect();
      }
      clientsRef.current = {
        cosmos: null,
        signingCosmos: null,
      };
    } catch (error) {
      console.error('Error cleaning up clients:', error);
    }
  }, []);

  // Функция для инициализации клиентов
  const initClients = useCallback(async () => {
    if (!address) return null;

    try {
      await cleanupClients();

      const [cosmosClient, options] = await Promise.all([
        getStargateClient(),
        {
          accountParser: accountFromAny,
        } as SigningStargateClientOptions,
      ]);

      if (!cosmosClient) return null;

      const signingClient = await SigningStargateClient.connectWithSigner(
        defaultRpc,
        getOfflineSigner(),
        options
      );

      clientsRef.current = {
        cosmos: cosmosClient,
        signingCosmos: signingClient,
      };

      return clientsRef.current;
    } catch (error) {
      console.error('Error initializing clients:', error);
      await cleanupClients();
      return null;
    }
  }, [address, getStargateClient, getOfflineSigner, cleanupClients]);

  // Функция для обновления балансов
  const updateBalances = useCallback(async () => {
    const clients = await initClients();
    if (!clients?.cosmos || !address) return;

    try {
      const [userBalance, contractBalance] = await Promise.all([
        clients.cosmos.getBalance(address, 'stake'),
        localContractAddress
          ? clients.cosmos.getBalance(localContractAddress, 'stake')
          : Promise.resolve(null),
      ]);

      setBalance(userBalance.amount);
      if (contractBalance) {
        setAccountBalance(contractBalance.amount);
      }
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  }, [initClients, address, localContractAddress]);

  // Обновляем балансы при изменении адреса или транзакции
  useEffect(() => {
    updateBalances();
  }, [updateBalances, txHash]);

  // Очищаем клиенты при размонтировании
  useEffect(
    () => () => {
      cleanupClients();
    },
    [cleanupClients]
  );

  const handleSend = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!amount || !recipient || !address) return;

      try {
        const clients = await initClients();
        if (!clients?.signingCosmos) return;

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

        const result = await clients.signingCosmos.signAndBroadcast(address, message, {
          gas: '200000',
          amount: [],
        });
        await delay(3000);
        setTxHash(result.transactionHash);
        await updateBalances();
        return result.transactionHash as any;
      } catch (error) {
        console.error('Error in handleSend:', error);
      }
    },
    [address, initClients, setTxHash, updateBalances]
  );

  const handleSendAA = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!localContractAddress || !recipient || !amount || !username) {
        return;
      }
      const data = {
        sender: localContractAddress,
        recipient: recipient,
        denom: 'stake',
        amount: amount,
        user: username,
      };
      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };

      try {
        const response = await axios.post(`${defaultBackendEndpoint}/send`, data, headers);
        await delay(3000);
        setTxHash(response.data.txHash);
        await updateBalances();
        return response.data.result;
      } catch (error) {
        console.error('Error in handleSendAA:', error);
      }
    },
    [localContractAddress, username, setTxHash, updateBalances]
  );

  return {
    balance: balance ?? undefined,
    txHash,
    result,
    accountBalance,
    handleSend,
    handleSendAA,
    updateBalances,
  };
}
