import { Params, ParamsSDKType } from "./params";
import { TokenPairArbRoutes, TokenPairArbRoutesSDKType } from "./protorev";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the protorev module's genesis state. */
export interface GenesisState {
  /** Module Parameters */
  params: Params;
  /** Hot routes that are configured on genesis */
  tokenPairs: TokenPairArbRoutes[];
}
/** GenesisState defines the protorev module's genesis state. */
export interface GenesisStateSDKType {
  params: ParamsSDKType;
  token_pairs: TokenPairArbRoutesSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    params: Params.fromPartial({}),
    tokenPairs: []
  };
}
export const GenesisState = {
  typeUrl: "/osmosis.protorev.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.tokenPairs) {
      TokenPairArbRoutes.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 2:
          message.tokenPairs.push(TokenPairArbRoutes.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.tokenPairs = object.tokenPairs?.map(e => TokenPairArbRoutes.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      tokenPairs: Array.isArray(object?.token_pairs) ? object.token_pairs.map((e: any) => TokenPairArbRoutes.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.tokenPairs) {
      obj.token_pairs = message.tokenPairs.map(e => e ? TokenPairArbRoutes.toAmino(e) : undefined);
    } else {
      obj.token_pairs = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  toAminoMsg(message: GenesisState): GenesisStateAminoMsg {
    return {
      type: "osmosis/protorev/genesis-state",
      value: GenesisState.toAmino(message)
    };
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};