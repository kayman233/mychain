import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName, defaultRpc } from '../config';
import { SigningStargateClient } from '@cosmjs/stargate';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { getSigningAbstractaccountClient } from '../codegen/codegen';
import { InstantiateMsg } from '../codegen/SocialRecovery.types';
import { Event } from '../codegen/codegen/tendermint/abci/types';
import { CreateAccountType, StoredAccount } from './types';
import { updateAccounts } from './useAA';

type CreateResponse = {
  result: string;
  txHash: string;
  events: Event[];
};

function uint8ArrayToBase64(data: Uint8Array) {
  return btoa(
    Array.from(data)
      .map(c => String.fromCharCode(c))
      .join('')
  );
}

export function useCreateAA(setTxHash: (v: string) => void) {
  const { address, username, getOfflineSigner, getAccount } = useChain(defaultChainName);

  const [signingClientCosmos, setSigningClientCosmos] = useState<SigningStargateClient | null>(
    null
  );
  const [contractAddress, setContractAddress] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!address || signingClientCosmos) {
      return;
    }

    getSigningAbstractaccountClient({
      rpcEndpoint: defaultRpc,
      signer: getOfflineSigner(),
    }).then(client => {
      if (!client) {
        return;
      }
      setSigningClientCosmos(client);
    });
  }, [address, getOfflineSigner, signingClientCosmos]);

  const handleCreateAA = useCallback(
    async (params: CreateAccountType) => {
      console.log('createAA', params);
      const { funds, guardians, threshold } = params;
      if (!funds || !guardians || !threshold || !address || !signingClientCosmos || !username) {
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
    [address, signingClientCosmos, username, getAccount, setTxHash]
  );

  return { contractAddress, handleCreateAA };
}
