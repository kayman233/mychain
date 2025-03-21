import { useChain } from '@cosmos-kit/react';
import { defaultBackendEndpoint, defaultChainName, defaultRpc } from '../config';
import { SigningStargateClient } from '@cosmjs/stargate';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import { getSigningAbstractaccountClient } from '../codegen/codegen';
import { InstantiateMsg } from '../codegen/SocialRecovery.types';
import { Event } from '../codegen/codegen/tendermint/abci/types';
import { CreateAccountType } from './types';

type CreateResponse = {
  result: string;
  txHash: string;
  events: Event[];
};

export function useCreateAA(setTxHash: (v: string) => void) {
  const { address, getOfflineSigner } = useChain(defaultChainName);

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
      const { funds, guardians, threshold } = params;
      if (!funds || !guardians || !threshold || !address || !signingClientCosmos) {
        return;
      }

      const pubKey = await signingClientCosmos.getAccount(address).then(acc => acc?.pubkey);

      if (!pubKey) {
        return;
      }

      const initMessage: InstantiateMsg = {
        pubkey: pubKey.value,
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

      const res = await axios.post<CreateResponse>(
        `${defaultBackendEndpoint}/create`,
        data,
        headers
      );

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

      setContractAddress(resContractAddress);
      localStorage.setItem('contractAddress', resContractAddress);
      setTxHash(res.data.txHash);

      return res.data.txHash as any;
    },
    [address, setContractAddress, setTxHash, signingClientCosmos]
  );

  return { contractAddress, handleCreateAA };
}
