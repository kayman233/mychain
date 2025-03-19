import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName, defaultRpc } from '../config';
import { StargateClient } from '@cosmjs/stargate';
import { StdFee } from '@cosmjs/amino';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { delay } from './useAA';

export function useBalances(
  localContractAddress: string | undefined,
  txHash: string,
  setTxHash: (v: string) => void
) {
  const { address, getSigningStargateClient, username, status, getRpcEndpoint } =
    useChain(defaultChainName);

  const [balance, setBalance] = useState<string>('');
  const [accountBalance, setAccountBalance] = useState<string>('');
  const [isFetchingBalance, setFetchingBalance] = useState(false);

  // Функция для получения баланса
  const getBalance = useCallback(async () => {
    if (!address) {
      setBalance('0');
      setFetchingBalance(false);
      return;
    }

    setFetchingBalance(true);

    try {
      // Получаем RPC endpoint
      let rpcEndpoint = await getRpcEndpoint();

      if (!rpcEndpoint) {
        console.info('no rpc endpoint — using a fallback');
        rpcEndpoint = defaultRpc;
      }

      // Создаем клиент
      const client = await StargateClient.connect(
        typeof rpcEndpoint === 'string' ? rpcEndpoint : rpcEndpoint.url
      );

      // Получаем баланс
      const balanceResponse = await client.getBalance(address, 'stake');
      setBalance(balanceResponse.amount);

      // Если есть адрес контракта, получаем его баланс
      if (localContractAddress) {
        const contractBalanceResponse = await client.getBalance(localContractAddress, 'stake');
        setAccountBalance(contractBalanceResponse.amount);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    } finally {
      setFetchingBalance(false);
    }
  }, [address, localContractAddress, getRpcEndpoint]);

  // Загружаем баланс при изменении адреса или txHash
  useEffect(() => {
    getBalance();
  }, [getBalance, txHash]);

  // Функция для отправки токенов
  const handleSend = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!amount || !recipient || !address) {
        return;
      }

      try {
        const stargateClient = await getSigningStargateClient();
        if (!stargateClient) {
          console.error('stargateClient undefined');
          return;
        }

        const message = {
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
        };

        const fee: StdFee = {
          amount: [
            {
              denom: 'stake',
              amount: '1',
            },
          ],
          gas: '200000',
        };

        const response = await stargateClient.signAndBroadcast(address, [message], fee);

        await delay(3000);
        setTxHash(response.transactionHash);
        return response.transactionHash;
      } catch (error) {
        console.error('Error sending tokens:', error);
      }
    },
    [address, getSigningStargateClient, setTxHash]
  );

  // Функция для отправки токенов через AA
  const handleSendAA = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!localContractAddress || !recipient || !amount || !username) {
        return;
      }

      try {
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

        const response = await axios.post(`${defaultBackendEndpoint}/send`, data, headers);
        await delay(3000);
        setTxHash(response.data.txHash);
        return response.data.result;
      } catch (error) {
        console.error('Error sending tokens via AA:', error);
      }
    },
    [localContractAddress, username, setTxHash]
  );

  return {
    balance,
    accountBalance,
    txHash,
    isFetchingBalance,
    isConnected: status === 'Connected',
    handleSend,
    handleSendAA,
    getBalance,
  };
}
