import { DeploymentID, DeploymentIDSDKType } from "./deployment";
import { GroupSpec, GroupSpecSDKType } from "./groupspec";
import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** MsgCreateDeployment defines an SDK message for creating deployment */
export interface MsgCreateDeployment {
  id: DeploymentID;
  groups: GroupSpec[];
  version: Uint8Array;
  deposit: Coin;
  /** Depositor pays for the deposit */
  depositor: string;
}
/** MsgCreateDeployment defines an SDK message for creating deployment */
export interface MsgCreateDeploymentSDKType {
  id: DeploymentIDSDKType;
  groups: GroupSpecSDKType[];
  version: Uint8Array;
  deposit: CoinSDKType;
  depositor: string;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgCreateDeploymentResponse {}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgCreateDeploymentResponseSDKType {}
/** MsgDepositDeployment deposits more funds into the deposit account */
export interface MsgDepositDeployment {
  id: DeploymentID;
  amount: Coin;
  /** Depositor pays for the deposit */
  depositor: string;
}
/** MsgDepositDeployment deposits more funds into the deposit account */
export interface MsgDepositDeploymentSDKType {
  id: DeploymentIDSDKType;
  amount: CoinSDKType;
  depositor: string;
}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgDepositDeploymentResponse {}
/** MsgCreateDeploymentResponse defines the Msg/CreateDeployment response type. */
export interface MsgDepositDeploymentResponseSDKType {}
/** MsgUpdateDeployment defines an SDK message for updating deployment */
export interface MsgUpdateDeployment {
  id: DeploymentID;
  version: Uint8Array;
}
/** MsgUpdateDeployment defines an SDK message for updating deployment */
export interface MsgUpdateDeploymentSDKType {
  id: DeploymentIDSDKType;
  version: Uint8Array;
}
/** MsgUpdateDeploymentResponse defines the Msg/UpdateDeployment response type. */
export interface MsgUpdateDeploymentResponse {}
/** MsgUpdateDeploymentResponse defines the Msg/UpdateDeployment response type. */
export interface MsgUpdateDeploymentResponseSDKType {}
/** MsgCloseDeployment defines an SDK message for closing deployment */
export interface MsgCloseDeployment {
  id: DeploymentID;
}
/** MsgCloseDeployment defines an SDK message for closing deployment */
export interface MsgCloseDeploymentSDKType {
  id: DeploymentIDSDKType;
}
/** MsgCloseDeploymentResponse defines the Msg/CloseDeployment response type. */
export interface MsgCloseDeploymentResponse {}
/** MsgCloseDeploymentResponse defines the Msg/CloseDeployment response type. */
export interface MsgCloseDeploymentResponseSDKType {}
function createBaseMsgCreateDeployment(): MsgCreateDeployment {
  return {
    id: DeploymentID.fromPartial({}),
    groups: [],
    version: new Uint8Array(),
    deposit: Coin.fromPartial({}),
    depositor: ""
  };
}
export const MsgCreateDeployment = {
  typeUrl: "/akash.deployment.v1beta2.MsgCreateDeployment",
  encode(message: MsgCreateDeployment, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.groups) {
      GroupSpec.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.version.length !== 0) {
      writer.uint32(26).bytes(message.version);
    }
    if (message.deposit !== undefined) {
      Coin.encode(message.deposit, writer.uint32(34).fork()).ldelim();
    }
    if (message.depositor !== "") {
      writer.uint32(42).string(message.depositor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateDeployment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDeployment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = DeploymentID.decode(reader, reader.uint32());
          break;
        case 2:
          message.groups.push(GroupSpec.decode(reader, reader.uint32()));
          break;
        case 3:
          message.version = reader.bytes();
          break;
        case 4:
          message.deposit = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.depositor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCreateDeployment>): MsgCreateDeployment {
    const message = createBaseMsgCreateDeployment();
    message.id = object.id !== undefined && object.id !== null ? DeploymentID.fromPartial(object.id) : undefined;
    message.groups = object.groups?.map(e => GroupSpec.fromPartial(e)) || [];
    message.version = object.version ?? new Uint8Array();
    message.deposit = object.deposit !== undefined && object.deposit !== null ? Coin.fromPartial(object.deposit) : undefined;
    message.depositor = object.depositor ?? "";
    return message;
  },
  fromAmino(object: MsgCreateDeploymentAmino): MsgCreateDeployment {
    return {
      id: object?.id ? DeploymentID.fromAmino(object.id) : undefined,
      groups: Array.isArray(object?.groups) ? object.groups.map((e: any) => GroupSpec.fromAmino(e)) : [],
      version: object.version,
      deposit: object?.deposit ? Coin.fromAmino(object.deposit) : undefined,
      depositor: object.depositor
    };
  },
  toAmino(message: MsgCreateDeployment): MsgCreateDeploymentAmino {
    const obj: any = {};
    obj.id = message.id ? DeploymentID.toAmino(message.id) : undefined;
    if (message.groups) {
      obj.groups = message.groups.map(e => e ? GroupSpec.toAmino(e) : undefined);
    } else {
      obj.groups = [];
    }
    obj.version = message.version;
    obj.deposit = message.deposit ? Coin.toAmino(message.deposit) : undefined;
    obj.depositor = message.depositor;
    return obj;
  },
  fromAminoMsg(object: MsgCreateDeploymentAminoMsg): MsgCreateDeployment {
    return MsgCreateDeployment.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDeploymentProtoMsg): MsgCreateDeployment {
    return MsgCreateDeployment.decode(message.value);
  },
  toProto(message: MsgCreateDeployment): Uint8Array {
    return MsgCreateDeployment.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDeployment): MsgCreateDeploymentProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgCreateDeployment",
      value: MsgCreateDeployment.encode(message).finish()
    };
  }
};
function createBaseMsgCreateDeploymentResponse(): MsgCreateDeploymentResponse {
  return {};
}
export const MsgCreateDeploymentResponse = {
  typeUrl: "/akash.deployment.v1beta2.MsgCreateDeploymentResponse",
  encode(_: MsgCreateDeploymentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCreateDeploymentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDeploymentResponse();
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
  fromPartial(_: Partial<MsgCreateDeploymentResponse>): MsgCreateDeploymentResponse {
    const message = createBaseMsgCreateDeploymentResponse();
    return message;
  },
  fromAmino(_: MsgCreateDeploymentResponseAmino): MsgCreateDeploymentResponse {
    return {};
  },
  toAmino(_: MsgCreateDeploymentResponse): MsgCreateDeploymentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCreateDeploymentResponseAminoMsg): MsgCreateDeploymentResponse {
    return MsgCreateDeploymentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCreateDeploymentResponseProtoMsg): MsgCreateDeploymentResponse {
    return MsgCreateDeploymentResponse.decode(message.value);
  },
  toProto(message: MsgCreateDeploymentResponse): Uint8Array {
    return MsgCreateDeploymentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCreateDeploymentResponse): MsgCreateDeploymentResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgCreateDeploymentResponse",
      value: MsgCreateDeploymentResponse.encode(message).finish()
    };
  }
};
function createBaseMsgDepositDeployment(): MsgDepositDeployment {
  return {
    id: DeploymentID.fromPartial({}),
    amount: Coin.fromPartial({}),
    depositor: ""
  };
}
export const MsgDepositDeployment = {
  typeUrl: "/akash.deployment.v1beta2.MsgDepositDeployment",
  encode(message: MsgDepositDeployment, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.amount !== undefined) {
      Coin.encode(message.amount, writer.uint32(18).fork()).ldelim();
    }
    if (message.depositor !== "") {
      writer.uint32(26).string(message.depositor);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositDeployment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositDeployment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = DeploymentID.decode(reader, reader.uint32());
          break;
        case 2:
          message.amount = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.depositor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgDepositDeployment>): MsgDepositDeployment {
    const message = createBaseMsgDepositDeployment();
    message.id = object.id !== undefined && object.id !== null ? DeploymentID.fromPartial(object.id) : undefined;
    message.amount = object.amount !== undefined && object.amount !== null ? Coin.fromPartial(object.amount) : undefined;
    message.depositor = object.depositor ?? "";
    return message;
  },
  fromAmino(object: MsgDepositDeploymentAmino): MsgDepositDeployment {
    return {
      id: object?.id ? DeploymentID.fromAmino(object.id) : undefined,
      amount: object?.amount ? Coin.fromAmino(object.amount) : undefined,
      depositor: object.depositor
    };
  },
  toAmino(message: MsgDepositDeployment): MsgDepositDeploymentAmino {
    const obj: any = {};
    obj.id = message.id ? DeploymentID.toAmino(message.id) : undefined;
    obj.amount = message.amount ? Coin.toAmino(message.amount) : undefined;
    obj.depositor = message.depositor;
    return obj;
  },
  fromAminoMsg(object: MsgDepositDeploymentAminoMsg): MsgDepositDeployment {
    return MsgDepositDeployment.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositDeploymentProtoMsg): MsgDepositDeployment {
    return MsgDepositDeployment.decode(message.value);
  },
  toProto(message: MsgDepositDeployment): Uint8Array {
    return MsgDepositDeployment.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositDeployment): MsgDepositDeploymentProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgDepositDeployment",
      value: MsgDepositDeployment.encode(message).finish()
    };
  }
};
function createBaseMsgDepositDeploymentResponse(): MsgDepositDeploymentResponse {
  return {};
}
export const MsgDepositDeploymentResponse = {
  typeUrl: "/akash.deployment.v1beta2.MsgDepositDeploymentResponse",
  encode(_: MsgDepositDeploymentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgDepositDeploymentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDepositDeploymentResponse();
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
  fromPartial(_: Partial<MsgDepositDeploymentResponse>): MsgDepositDeploymentResponse {
    const message = createBaseMsgDepositDeploymentResponse();
    return message;
  },
  fromAmino(_: MsgDepositDeploymentResponseAmino): MsgDepositDeploymentResponse {
    return {};
  },
  toAmino(_: MsgDepositDeploymentResponse): MsgDepositDeploymentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgDepositDeploymentResponseAminoMsg): MsgDepositDeploymentResponse {
    return MsgDepositDeploymentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgDepositDeploymentResponseProtoMsg): MsgDepositDeploymentResponse {
    return MsgDepositDeploymentResponse.decode(message.value);
  },
  toProto(message: MsgDepositDeploymentResponse): Uint8Array {
    return MsgDepositDeploymentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgDepositDeploymentResponse): MsgDepositDeploymentResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgDepositDeploymentResponse",
      value: MsgDepositDeploymentResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateDeployment(): MsgUpdateDeployment {
  return {
    id: DeploymentID.fromPartial({}),
    version: new Uint8Array()
  };
}
export const MsgUpdateDeployment = {
  typeUrl: "/akash.deployment.v1beta2.MsgUpdateDeployment",
  encode(message: MsgUpdateDeployment, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    if (message.version.length !== 0) {
      writer.uint32(26).bytes(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDeployment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDeployment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = DeploymentID.decode(reader, reader.uint32());
          break;
        case 3:
          message.version = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateDeployment>): MsgUpdateDeployment {
    const message = createBaseMsgUpdateDeployment();
    message.id = object.id !== undefined && object.id !== null ? DeploymentID.fromPartial(object.id) : undefined;
    message.version = object.version ?? new Uint8Array();
    return message;
  },
  fromAmino(object: MsgUpdateDeploymentAmino): MsgUpdateDeployment {
    return {
      id: object?.id ? DeploymentID.fromAmino(object.id) : undefined,
      version: object.version
    };
  },
  toAmino(message: MsgUpdateDeployment): MsgUpdateDeploymentAmino {
    const obj: any = {};
    obj.id = message.id ? DeploymentID.toAmino(message.id) : undefined;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDeploymentAminoMsg): MsgUpdateDeployment {
    return MsgUpdateDeployment.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDeploymentProtoMsg): MsgUpdateDeployment {
    return MsgUpdateDeployment.decode(message.value);
  },
  toProto(message: MsgUpdateDeployment): Uint8Array {
    return MsgUpdateDeployment.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDeployment): MsgUpdateDeploymentProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgUpdateDeployment",
      value: MsgUpdateDeployment.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateDeploymentResponse(): MsgUpdateDeploymentResponse {
  return {};
}
export const MsgUpdateDeploymentResponse = {
  typeUrl: "/akash.deployment.v1beta2.MsgUpdateDeploymentResponse",
  encode(_: MsgUpdateDeploymentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateDeploymentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDeploymentResponse();
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
  fromPartial(_: Partial<MsgUpdateDeploymentResponse>): MsgUpdateDeploymentResponse {
    const message = createBaseMsgUpdateDeploymentResponse();
    return message;
  },
  fromAmino(_: MsgUpdateDeploymentResponseAmino): MsgUpdateDeploymentResponse {
    return {};
  },
  toAmino(_: MsgUpdateDeploymentResponse): MsgUpdateDeploymentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateDeploymentResponseAminoMsg): MsgUpdateDeploymentResponse {
    return MsgUpdateDeploymentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateDeploymentResponseProtoMsg): MsgUpdateDeploymentResponse {
    return MsgUpdateDeploymentResponse.decode(message.value);
  },
  toProto(message: MsgUpdateDeploymentResponse): Uint8Array {
    return MsgUpdateDeploymentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateDeploymentResponse): MsgUpdateDeploymentResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgUpdateDeploymentResponse",
      value: MsgUpdateDeploymentResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCloseDeployment(): MsgCloseDeployment {
  return {
    id: DeploymentID.fromPartial({})
  };
}
export const MsgCloseDeployment = {
  typeUrl: "/akash.deployment.v1beta2.MsgCloseDeployment",
  encode(message: MsgCloseDeployment, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      DeploymentID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseDeployment {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseDeployment();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = DeploymentID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCloseDeployment>): MsgCloseDeployment {
    const message = createBaseMsgCloseDeployment();
    message.id = object.id !== undefined && object.id !== null ? DeploymentID.fromPartial(object.id) : undefined;
    return message;
  },
  fromAmino(object: MsgCloseDeploymentAmino): MsgCloseDeployment {
    return {
      id: object?.id ? DeploymentID.fromAmino(object.id) : undefined
    };
  },
  toAmino(message: MsgCloseDeployment): MsgCloseDeploymentAmino {
    const obj: any = {};
    obj.id = message.id ? DeploymentID.toAmino(message.id) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCloseDeploymentAminoMsg): MsgCloseDeployment {
    return MsgCloseDeployment.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseDeploymentProtoMsg): MsgCloseDeployment {
    return MsgCloseDeployment.decode(message.value);
  },
  toProto(message: MsgCloseDeployment): Uint8Array {
    return MsgCloseDeployment.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseDeployment): MsgCloseDeploymentProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgCloseDeployment",
      value: MsgCloseDeployment.encode(message).finish()
    };
  }
};
function createBaseMsgCloseDeploymentResponse(): MsgCloseDeploymentResponse {
  return {};
}
export const MsgCloseDeploymentResponse = {
  typeUrl: "/akash.deployment.v1beta2.MsgCloseDeploymentResponse",
  encode(_: MsgCloseDeploymentResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseDeploymentResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseDeploymentResponse();
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
  fromPartial(_: Partial<MsgCloseDeploymentResponse>): MsgCloseDeploymentResponse {
    const message = createBaseMsgCloseDeploymentResponse();
    return message;
  },
  fromAmino(_: MsgCloseDeploymentResponseAmino): MsgCloseDeploymentResponse {
    return {};
  },
  toAmino(_: MsgCloseDeploymentResponse): MsgCloseDeploymentResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCloseDeploymentResponseAminoMsg): MsgCloseDeploymentResponse {
    return MsgCloseDeploymentResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseDeploymentResponseProtoMsg): MsgCloseDeploymentResponse {
    return MsgCloseDeploymentResponse.decode(message.value);
  },
  toProto(message: MsgCloseDeploymentResponse): Uint8Array {
    return MsgCloseDeploymentResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseDeploymentResponse): MsgCloseDeploymentResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta2.MsgCloseDeploymentResponse",
      value: MsgCloseDeploymentResponse.encode(message).finish()
    };
  }
};