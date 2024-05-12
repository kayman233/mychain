/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";
import { Any } from "../google/protobuf/any";

export const protobufPackage = "mychain.smartaccount";

export interface MsgRecover {
  /** Sender is the actor who signs the message */
  creator: string;
  /** smart-account address that need update */
  address: string;
  /** New PubKey using for signature verification of this account */
  public_key: Any | undefined;
  /** Credentials */
  credentials: string;
}

export interface MsgRecoverResponse {}

export interface MsgActivateAccount {
  /** AccountAddress is the actor who signs the message */
  account_address: string;
  /** CodeID indicates which wasm binary code is to be used for this contract */
  code_id: number;
  /** an arbitrary value provided by the sender. Size can be 1 to 64. */
  salt: Uint8Array;
  /** InitMsg is the JSON-encoded instantiate message for the contract */
  init_msg: Uint8Array;
  /** Public key of smart account */
  pub_key: Any | undefined;
}

export interface MsgActivateAccountResponse {
  address: string;
}

const baseMsgRecover: object = { creator: "", address: "", credentials: "" };

export const MsgRecover = {
  encode(message: MsgRecover, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.address !== "") {
      writer.uint32(18).string(message.address);
    }
    if (message.public_key !== undefined) {
      Any.encode(message.public_key, writer.uint32(26).fork()).ldelim();
    }
    if (message.credentials !== "") {
      writer.uint32(34).string(message.credentials);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRecover {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRecover } as MsgRecover;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.address = reader.string();
          break;
        case 3:
          message.public_key = Any.decode(reader, reader.uint32());
          break;
        case 4:
          message.credentials = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgRecover {
    const message = { ...baseMsgRecover } as MsgRecover;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.public_key = Any.fromJSON(object.public_key);
    } else {
      message.public_key = undefined;
    }
    if (object.credentials !== undefined && object.credentials !== null) {
      message.credentials = String(object.credentials);
    } else {
      message.credentials = "";
    }
    return message;
  },

  toJSON(message: MsgRecover): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.address !== undefined && (obj.address = message.address);
    message.public_key !== undefined &&
      (obj.public_key = message.public_key
        ? Any.toJSON(message.public_key)
        : undefined);
    message.credentials !== undefined &&
      (obj.credentials = message.credentials);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgRecover>): MsgRecover {
    const message = { ...baseMsgRecover } as MsgRecover;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (object.public_key !== undefined && object.public_key !== null) {
      message.public_key = Any.fromPartial(object.public_key);
    } else {
      message.public_key = undefined;
    }
    if (object.credentials !== undefined && object.credentials !== null) {
      message.credentials = object.credentials;
    } else {
      message.credentials = "";
    }
    return message;
  },
};

const baseMsgRecoverResponse: object = {};

export const MsgRecoverResponse = {
  encode(_: MsgRecoverResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgRecoverResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgRecoverResponse } as MsgRecoverResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgRecoverResponse {
    const message = { ...baseMsgRecoverResponse } as MsgRecoverResponse;
    return message;
  },

  toJSON(_: MsgRecoverResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgRecoverResponse>): MsgRecoverResponse {
    const message = { ...baseMsgRecoverResponse } as MsgRecoverResponse;
    return message;
  },
};

const baseMsgActivateAccount: object = { account_address: "", code_id: 0 };

export const MsgActivateAccount = {
  encode(
    message: MsgActivateAccount,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.account_address !== "") {
      writer.uint32(10).string(message.account_address);
    }
    if (message.code_id !== 0) {
      writer.uint32(24).uint64(message.code_id);
    }
    if (message.salt.length !== 0) {
      writer.uint32(18).bytes(message.salt);
    }
    if (message.init_msg.length !== 0) {
      writer.uint32(42).bytes(message.init_msg);
    }
    if (message.pub_key !== undefined) {
      Any.encode(message.pub_key, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgActivateAccount {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgActivateAccount } as MsgActivateAccount;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account_address = reader.string();
          break;
        case 3:
          message.code_id = longToNumber(reader.uint64() as Long);
          break;
        case 2:
          message.salt = reader.bytes();
          break;
        case 5:
          message.init_msg = reader.bytes();
          break;
        case 4:
          message.pub_key = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgActivateAccount {
    const message = { ...baseMsgActivateAccount } as MsgActivateAccount;
    if (
      object.account_address !== undefined &&
      object.account_address !== null
    ) {
      message.account_address = String(object.account_address);
    } else {
      message.account_address = "";
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.code_id = Number(object.code_id);
    } else {
      message.code_id = 0;
    }
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = bytesFromBase64(object.salt);
    }
    if (object.init_msg !== undefined && object.init_msg !== null) {
      message.init_msg = bytesFromBase64(object.init_msg);
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pub_key = Any.fromJSON(object.pub_key);
    } else {
      message.pub_key = undefined;
    }
    return message;
  },

  toJSON(message: MsgActivateAccount): unknown {
    const obj: any = {};
    message.account_address !== undefined &&
      (obj.account_address = message.account_address);
    message.code_id !== undefined && (obj.code_id = message.code_id);
    message.salt !== undefined &&
      (obj.salt = base64FromBytes(
        message.salt !== undefined ? message.salt : new Uint8Array()
      ));
    message.init_msg !== undefined &&
      (obj.init_msg = base64FromBytes(
        message.init_msg !== undefined ? message.init_msg : new Uint8Array()
      ));
    message.pub_key !== undefined &&
      (obj.pub_key = message.pub_key ? Any.toJSON(message.pub_key) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgActivateAccount>): MsgActivateAccount {
    const message = { ...baseMsgActivateAccount } as MsgActivateAccount;
    if (
      object.account_address !== undefined &&
      object.account_address !== null
    ) {
      message.account_address = object.account_address;
    } else {
      message.account_address = "";
    }
    if (object.code_id !== undefined && object.code_id !== null) {
      message.code_id = object.code_id;
    } else {
      message.code_id = 0;
    }
    if (object.salt !== undefined && object.salt !== null) {
      message.salt = object.salt;
    } else {
      message.salt = new Uint8Array();
    }
    if (object.init_msg !== undefined && object.init_msg !== null) {
      message.init_msg = object.init_msg;
    } else {
      message.init_msg = new Uint8Array();
    }
    if (object.pub_key !== undefined && object.pub_key !== null) {
      message.pub_key = Any.fromPartial(object.pub_key);
    } else {
      message.pub_key = undefined;
    }
    return message;
  },
};

const baseMsgActivateAccountResponse: object = { address: "" };

export const MsgActivateAccountResponse = {
  encode(
    message: MsgActivateAccountResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgActivateAccountResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgActivateAccountResponse,
    } as MsgActivateAccountResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgActivateAccountResponse {
    const message = {
      ...baseMsgActivateAccountResponse,
    } as MsgActivateAccountResponse;
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    return message;
  },

  toJSON(message: MsgActivateAccountResponse): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgActivateAccountResponse>
  ): MsgActivateAccountResponse {
    const message = {
      ...baseMsgActivateAccountResponse,
    } as MsgActivateAccountResponse;
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  Recover(request: MsgRecover): Promise<MsgRecoverResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  ActivateAccount(
    request: MsgActivateAccount
  ): Promise<MsgActivateAccountResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  Recover(request: MsgRecover): Promise<MsgRecoverResponse> {
    const data = MsgRecover.encode(request).finish();
    const promise = this.rpc.request(
      "mychain.smartaccount.Msg",
      "Recover",
      data
    );
    return promise.then((data) => MsgRecoverResponse.decode(new Reader(data)));
  }

  ActivateAccount(
    request: MsgActivateAccount
  ): Promise<MsgActivateAccountResponse> {
    const data = MsgActivateAccount.encode(request).finish();
    const promise = this.rpc.request(
      "mychain.smartaccount.Msg",
      "ActivateAccount",
      data
    );
    return promise.then((data) =>
      MsgActivateAccountResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

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
