import { BinaryReader, BinaryWriter } from "../../binary";
export interface Params {
  /**
   * AllowAllCodeIDs determines whether a Wasm code ID can be used to register
   * AbstractAccounts:
   * - if set to true, any code ID can be used;
   * - if set to false, only code IDs whitelisted in the AllowedCodeIDs list can
   * be used.
   */
  allowAllCodeIds: boolean;
  /**
   * AllowedCodeIDs is the whitelist of Wasm code IDs that can be used to
   * regiseter AbstractAccounts.
   */
  allowedCodeIds: bigint[];
  /**
   * MaxGasBefore is the maximum amount of gas that can be consumed by the
   * contract call in the before_tx decorator.
   * 
   * Must be greater than zero.
   */
  maxGasBefore: bigint;
  /**
   * MaxGasAfter is the maximum amount of gas that can be consumed by the
   * contract call in the after_tx decorator.
   * 
   * Must be greater than zero.
   */
  maxGasAfter: bigint;
}
export interface ParamsSDKType {
  allow_all_code_ids: boolean;
  allowed_code_ids: bigint[];
  max_gas_before: bigint;
  max_gas_after: bigint;
}
function createBaseParams(): Params {
  return {
    allowAllCodeIds: false,
    allowedCodeIds: [],
    maxGasBefore: BigInt(0),
    maxGasAfter: BigInt(0)
  };
}
export const Params = {
  typeUrl: "/abstractaccount.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.allowAllCodeIds === true) {
      writer.uint32(8).bool(message.allowAllCodeIds);
    }
    writer.uint32(18).fork();
    for (const v of message.allowedCodeIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    if (message.maxGasBefore !== BigInt(0)) {
      writer.uint32(24).uint64(message.maxGasBefore);
    }
    if (message.maxGasAfter !== BigInt(0)) {
      writer.uint32(32).uint64(message.maxGasAfter);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.allowAllCodeIds = reader.bool();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.allowedCodeIds.push(reader.uint64());
            }
          } else {
            message.allowedCodeIds.push(reader.uint64());
          }
          break;
        case 3:
          message.maxGasBefore = reader.uint64();
          break;
        case 4:
          message.maxGasAfter = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.allowAllCodeIds = object.allowAllCodeIds ?? false;
    message.allowedCodeIds = object.allowedCodeIds?.map(e => BigInt(e.toString())) || [];
    message.maxGasBefore = object.maxGasBefore !== undefined && object.maxGasBefore !== null ? BigInt(object.maxGasBefore.toString()) : BigInt(0);
    message.maxGasAfter = object.maxGasAfter !== undefined && object.maxGasAfter !== null ? BigInt(object.maxGasAfter.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      allowAllCodeIds: object.allow_all_code_ids,
      allowedCodeIds: Array.isArray(object?.allowed_code_ids) ? object.allowed_code_ids.map((e: any) => BigInt(e)) : [],
      maxGasBefore: BigInt(object.max_gas_before),
      maxGasAfter: BigInt(object.max_gas_after)
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    obj.allow_all_code_ids = message.allowAllCodeIds;
    if (message.allowedCodeIds) {
      obj.allowed_code_ids = message.allowedCodeIds.map(e => e.toString());
    } else {
      obj.allowed_code_ids = [];
    }
    obj.max_gas_before = message.maxGasBefore ? message.maxGasBefore.toString() : undefined;
    obj.max_gas_after = message.maxGasAfter ? message.maxGasAfter.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/abstractaccount.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};