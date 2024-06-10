import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as abstractaccountV1TxRegistry from "./v1/tx.registry";
import * as abstractaccountV1TxAmino from "./v1/tx.amino";
export const abstractaccountAminoConverters = {
  ...abstractaccountV1TxAmino.AminoConverter
};
export const abstractaccountProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...abstractaccountV1TxRegistry.registry];
export const getSigningAbstractaccountClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...abstractaccountProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...abstractaccountAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningAbstractaccountClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningAbstractaccountClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry: (registry as any),
    aminoTypes
  });
  return client;
};