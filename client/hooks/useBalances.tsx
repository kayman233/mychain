import { useChain } from "@cosmos-kit/react";
import {
  defaultBackendEndpoint,
  defaultChainName,
  defaultRpc,
} from "../config";
import {
  SigningStargateClient,
  SigningStargateClientOptions,
  StargateClient,
} from "@cosmjs/stargate";
import { useCallback, useEffect, useState } from "react";
import { accountFromAny } from "../config/accounts";
import axios from "axios";
import { delay } from "./useAA";

export function useBalances(
  localContractAddress: string | undefined,
  txHash: string,
  setTxHash: (v: string) => void,
) {
  const { address, getStargateClient, getOfflineSigner, username } =
    useChain(defaultChainName);

  const [clientCosmos, setClientCosmos] = useState<StargateClient | null>(null);
  const [signingClientCosmos, setSigningClientCosmos] =
    useState<SigningStargateClient | null>(null);
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [result] = useState("");

  useEffect(() => {
    if (!address) {
      return;
    }
    getStargateClient().then((client) => {
      if (!client) {
        return;
      }
      setClientCosmos(client);
    });
  }, [address, getStargateClient]);

  useEffect(() => {
    if (!address) {
      return;
    }
    const options: SigningStargateClientOptions = {
      accountParser: accountFromAny,
    };

    SigningStargateClient.connectWithSigner(
      defaultRpc,
      getOfflineSigner(),
      options,
    ).then((client) => {
      if (!client) {
        return;
      }
      setSigningClientCosmos(client);
    });
  }, [address]);

  useEffect(() => {
    if (clientCosmos && address) {
      clientCosmos
        .getBalance(address, "stake")
        .then((res) => setBalance(res.amount));
      if (localContractAddress) {
        clientCosmos
          .getBalance(localContractAddress, "stake")
          .then((res) => setAccountBalance(res.amount));
      }
    }
  }, [address, clientCosmos, txHash, localContractAddress]);

  const handleSend = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!clientCosmos) {
        return;
      }

      if (!amount || !recipient || !address || !signingClientCosmos) {
        return;
      }

      const message = [
        {
          typeUrl: "/cosmos.bank.v1beta1.MsgSend",
          value: {
            fromAddress: address,
            toAddress: recipient,
            amount: [
              {
                amount: String(amount),
                denom: "stake",
              },
            ],
          },
        },
      ];

      const result = await signingClientCosmos.signAndBroadcast(
        address,
        message,
        {
          gas: "200000",
          amount: [],
        },
      );
      await delay(3000);
      setTxHash(result.transactionHash);
      return result.transactionHash as any;
    },
    [clientCosmos, address, signingClientCosmos, setTxHash],
  );

  const handleSendAA = useCallback(
    async (amount: string | undefined, recipient: string | undefined) => {
      if (!localContractAddress || !recipient || !amount || !username) {
        return;
      }
      const data = {
        sender: localContractAddress,
        recipient: recipient,
        denom: "stake",
        amount: amount,
        user: username,
      };
      const headers = {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      };

      const response = await axios.post(
        `${defaultBackendEndpoint}/send`,
        data,
        headers,
      );
      await delay(3000);
      setTxHash(response.data.txHash);
      return response.data.result;
    },
    [localContractAddress, username, setTxHash],
  );

  return {
    balance: balance ?? undefined,
    txHash,
    result,
    accountBalance,
    handleSend,
    handleSendAA,
  };
}
