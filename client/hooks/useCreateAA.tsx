import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName } from '../config';
import { useCallback, useState } from 'react';
import axios from 'axios';

import { InstantiateMsg } from '../codegen/SocialRecovery.types';
import { CreateAccountType, StoredAccount } from './types';
import { updateAccounts } from './useAA';

type TxEventAttribute = {
  key: Uint8Array | string;
  value: Uint8Array | string;
};

type TxEvent = {
  type: string;
  attributes: TxEventAttribute[];
};

type CreateResponse = {
  result: string;
  txHash: string;
  events: TxEvent[];
};

function uint8ArrayToBase64(data: Uint8Array) {
  return btoa(
    Array.from(data)
      .map(c => String.fromCharCode(c))
      .join('')
  );
}

export function useCreateAA(setTxHash: (v: string) => void) {
  const { address, username, getAccount } = useChain(defaultChainName);
  const [contractAddress, setContractAddress] = useState<string | undefined>(undefined);

  const handleCreateAA = useCallback(
    async (params: CreateAccountType) => {
      console.log('createAA', params);
      const { funds, guardians, threshold } = params;
      if (!funds || !guardians || !threshold || !address || !username) {
        return;
      }

      const account = await getAccount();
      console.log(account);

      const pubkey = uint8ArrayToBase64(account.pubkey);

      console.log(pubkey);

      if (!pubkey) {
        return;
      }

      const initMessage: InstantiateMsg = {
        pubkey,
        guardians,
        threshold,
      };

      const data = {
        sender: address,
        code_id: 1,
        msg: JSON.stringify(initMessage),
        funds: `${funds}stake`,
        salt: crypto.randomUUID(),
      };

      const headers = {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      };

      console.log(data, headers);

      const res = await axios.post<CreateResponse>(
        `${defaultBackendEndpoint}/create`,
        data,
        headers
      );

      console.log(res);

      if (!res.data.events) {
        return;
      }

      const createEvent = res.data.events.find(e => e.type === 'account_registered');

      if (!createEvent) {
        return;
      }

      const attr = createEvent.attributes.find(
        attr => Buffer.from(attr.key).toString() === 'contract_addr'
      );

      if (!attr) {
        return;
      }

      const resContractAddress = Buffer.from(attr.value).toString();

      // Сохраняем информацию об аккаунте
      const storedAccount: StoredAccount = {
        address,
        contractAddress: resContractAddress,
        username,
        createdAt: new Date().toISOString(),
      };

      console.log(storedAccount);

      // Используем функцию updateAccounts для обновления localStorage
      updateAccounts(storedAccount);

      setContractAddress(resContractAddress);
      setTxHash(res.data.txHash);

      return res.data.txHash as any;
    },
    [address, username, getAccount, setTxHash]
  );

  return { contractAddress, handleCreateAA };
}
