import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { Params, ParamsSDKType } from "./params";
import { ClaimRecord, ClaimRecordSDKType } from "./claim_record";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** GenesisState defines the claim module's genesis state. */
export interface GenesisState {
  /**
   * this line is used by starport scaffolding # genesis/proto/state
   * balance of the claim module's account
   */
  moduleAccountBalance: Coin;
  /** params defines all the parameters of the module. */
  params: Params;
  /** list of claim records, one for every airdrop recipient */
  claimRecords: ClaimRecord[];
}
/** GenesisState defines the claim module's genesis state. */
export interface GenesisStateSDKType {
  module_account_balance: CoinSDKType;
  params: ParamsSDKType;
  claim_records: ClaimRecordSDKType[];
}
function createBaseGenesisState(): GenesisState {
  return {
    moduleAccountBalance: Coin.fromPartial({}),
    params: Params.fromPartial({}),
    claimRecords: []
  };
}
export const GenesisState = {
  typeUrl: "/publicawesome.stargaze.claim.v1beta1.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.moduleAccountBalance !== undefined) {
      Coin.encode(message.moduleAccountBalance, writer.uint32(10).fork()).ldelim();
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.claimRecords) {
      ClaimRecord.encode(v!, writer.uint32(26).fork()).ldelim();
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
          message.moduleAccountBalance = Coin.decode(reader, reader.uint32());
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        case 3:
          message.claimRecords.push(ClaimRecord.decode(reader, reader.uint32()));
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
    message.moduleAccountBalance = object.moduleAccountBalance !== undefined && object.moduleAccountBalance !== null ? Coin.fromPartial(object.moduleAccountBalance) : undefined;
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    message.claimRecords = object.claimRecords?.map(e => ClaimRecord.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      moduleAccountBalance: object?.module_account_balance ? Coin.fromAmino(object.module_account_balance) : undefined,
      params: object?.params ? Params.fromAmino(object.params) : undefined,
      claimRecords: Array.isArray(object?.claim_records) ? object.claim_records.map((e: any) => ClaimRecord.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    obj.module_account_balance = message.moduleAccountBalance ? Coin.toAmino(message.moduleAccountBalance) : undefined;
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    if (message.claimRecords) {
      obj.claim_records = message.claimRecords.map(e => e ? ClaimRecord.toAmino(e) : undefined);
    } else {
      obj.claim_records = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/publicawesome.stargaze.claim.v1beta1.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};