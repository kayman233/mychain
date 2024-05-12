/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "mychain.smartaccount";

export interface CodeID {
  /** whitelist code id */
  code_id: number;
  /** status of code id */
  status: boolean;
}

/** Params defines the parameters for the module. */
export interface Params {
  /**
   * code_id whitelist indicates which contract can be initialized as smart account
   * using gov proposal for updates
   */
  whitelist_code_id: CodeID[];
  /** limit how much gas can be consumed by the `pre_execute` method */
  max_gas_execute: number;
}

const baseCodeID: object = { code_id: 0, status: false };

export const CodeID = {
  encode(message: CodeID, writer: Writer = Writer.create()): Writer {
    if (message.code_id !== 0) {
      writer.uint32(8).uint64(message.code_id);
    }
    if (message.status === true) {
      writer.uint32(16).bool(message.status);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CodeID {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseCodeID } as CodeID;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.code_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.status = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeID {
    const message = { ...baseCodeID } as CodeID;
    if (object.code_id !== undefined && object.code_id !== null) {
      message.code_id = Number(object.code_id);
    } else {
      message.code_id = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = Boolean(object.status);
    } else {
      message.status = false;
    }
    return message;
  },

  toJSON(message: CodeID): unknown {
    const obj: any = {};
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<CodeID>): CodeID {
    const message = { ...baseCodeID } as CodeID;
    if (object.code_id !== undefined && object.code_id !== null) {
      message.code_id = object.code_id;
    } else {
      message.code_id = 0;
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = false;
    }
    return message;
  },
};

const baseParams: object = { max_gas_execute: 0 };

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    for (const v of message.whitelist_code_id) {
      CodeID.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.max_gas_execute !== 0) {
      writer.uint32(16).uint64(message.max_gas_execute);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseParams } as Params;
    message.whitelist_code_id = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.whitelist_code_id.push(
            CodeID.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.max_gas_execute = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params;
    message.whitelist_code_id = [];
    if (
      object.whitelist_code_id !== undefined &&
      object.whitelist_code_id !== null
    ) {
      for (const e of object.whitelist_code_id) {
        message.whitelist_code_id.push(CodeID.fromJSON(e));
      }
    }
    if (
      object.max_gas_execute !== undefined &&
      object.max_gas_execute !== null
    ) {
      message.max_gas_execute = Number(object.max_gas_execute);
    } else {
      message.max_gas_execute = 0;
    }
    return message;
  },

  toJSON(message: Params): unknown {
    const obj: any = {};
    if (message.whitelist_code_id) {
      obj.whitelist_code_id = message.whitelist_code_id.map((e) =>
        e ? CodeID.toJSON(e) : undefined
      );
    } else {
      obj.whitelist_code_id = [];
    }
    message.max_gas_execute !== undefined &&
      (obj.max_gas_execute = message.max_gas_execute);
    return obj;
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params;
    message.whitelist_code_id = [];
    if (
      object.whitelist_code_id !== undefined &&
      object.whitelist_code_id !== null
    ) {
      for (const e of object.whitelist_code_id) {
        message.whitelist_code_id.push(CodeID.fromPartial(e));
      }
    }
    if (
      object.max_gas_execute !== undefined &&
      object.max_gas_execute !== null
    ) {
      message.max_gas_execute = object.max_gas_execute;
    } else {
      message.max_gas_execute = 0;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
