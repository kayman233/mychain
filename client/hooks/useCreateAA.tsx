import { useChain } from '@cosmos-kit/react';
import { defaultChainName } from '../config';
import { SigningStargateClient } from "@cosmjs/stargate"
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';


import { abstractaccount, getSigningAbstractaccountClient } from '../codegen/codegen';
import { InstantiateMsg } from '../codegen/SocialRecovery.types';
import { Event } from '../codegen/codegen/tendermint/abci/types';

const rpc = "127.0.0.1:26657"

var JsonToArray = function(json: any): Uint8Array {
	var str = JSON.stringify(json, null, 0);
	var ret = new Uint8Array(str.length);
	for (var i = 0; i < str.length; i++) {
		ret[i] = str.charCodeAt(i);
	}
	return ret
};

type CreateResponse = {
    result: string
    txHash: string,
    events: Event[],
}

export function useCreateAA(funds: string | undefined, guardians: string[] | undefined, threshold: number | undefined) {
    const { address, getOfflineSigner } = useChain(defaultChainName);

    const [signingClientCosmos, setSigningClientCosmos] = useState<SigningStargateClient | null>(null); 
    const [contractAddress, setContractAddress] = useState<string | undefined>(undefined); 

    useEffect(() => {
        if (!address || signingClientCosmos) {
            return;
        }

        getSigningAbstractaccountClient({rpcEndpoint: rpc, signer: getOfflineSigner()}).then((client) => {
              if (!client) {
                  return;
              }
              setSigningClientCosmos(client);
          })
      }, [address]);

    const handleCreateAA = useCallback(async () => {    
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
            "sender": address,
            "code_id": 1,
            "msg": JSON.stringify(initMessage),
            "funds": `${funds}stake`,
            "salt": crypto.randomUUID(),
        };

        const headers = {
            headers: {
              "Content-Type": "application/json",
            }
          };

        const res = await axios.post<CreateResponse>('http://localhost:8080/create', data, headers);

        if (!res.data.events) {
            console.log("error events");
            return;
        }

        const createEvent = res.data.events.find((e) => {
            return e.type === "account_registered"
        });

        if (!createEvent) {
            console.log("No create event");
            return;
        }

        const attr = createEvent.attributes.find((attr) => Buffer.from(attr.key).toString() === "contract_addr");

        if (!attr) {
            console.log("No attribute");
            return;
        }

        const resContractAddress = Buffer.from(attr.value).toString();

        setContractAddress(resContractAddress);
        localStorage.setItem('contractAddress', resContractAddress);
    }, [address, funds, guardians, threshold, setContractAddress, signingClientCosmos]);

    return { contractAddress, handleCreateAA };
}