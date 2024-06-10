import { OriginTx, OriginTxSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** EventCreateClass is an event emitted when a credit class is created. */
export interface EventCreateClass {
  /** class_id is the unique identifier of the credit class. */
  classId: string;
}
/** EventCreateClass is an event emitted when a credit class is created. */
export interface EventCreateClassSDKType {
  class_id: string;
}
/** EventCreateProject is an event emitted when a project is created. */
export interface EventCreateProject {
  /** project_id is the unique identifier of the project. */
  projectId: string;
}
/** EventCreateProject is an event emitted when a project is created. */
export interface EventCreateProjectSDKType {
  project_id: string;
}
/** EventCreateBatch is an event emitted when a credit batch is created. */
export interface EventCreateBatch {
  /** batch_denom is the unique identifier of the credit batch. */
  batchDenom: string;
}
/** EventCreateBatch is an event emitted when a credit batch is created. */
export interface EventCreateBatchSDKType {
  batch_denom: string;
}
/** EventMint is an event emitted when credits are minted to a credit batch. */
export interface EventMint {
  /**
   * batch_denom is the unique identifier of the credit batch within which the
   * credits were minted.
   */
  batchDenom: string;
  /**
   * origin_tx is the transaction from another chain or registry that triggered
   * the minting of credits within the credit batch.
   */
  originTx: OriginTx;
}
/** EventMint is an event emitted when credits are minted to a credit batch. */
export interface EventMintSDKType {
  batch_denom: string;
  origin_tx: OriginTxSDKType;
}
/**
 * EventTransfer is an event emitted when credits are transferred from one
 * account to another including transfers to or from a module account.
 */
export interface EventTransfer {
  /**
   * sender is the sender of the credits. In the case that the credits were
   * transferred from a base account, this will be the account address. In the
   * case that the credits were transferred from a module, this will be the
   * module address (i.e. either the ecocredit module or basket submodule).
   */
  sender: string;
  /**
   * recipient is the recipient of the credits. In the case that the credits
   * were transferred to a base account, this will be the account address. In
   * the case that the credits were transferred to a module, this will be the
   * module address (i.e. either the ecocredit module or basket submodule).
   */
  recipient: string;
  /** batch_denom is the unique identifier of the credit batch. */
  batchDenom: string;
  /** tradable_amount is the decimal number of tradable credits received. */
  tradableAmount: string;
  /** retired_amount is the decimal number of retired credits received. */
  retiredAmount: string;
}
/**
 * EventTransfer is an event emitted when credits are transferred from one
 * account to another including transfers to or from a module account.
 */
export interface EventTransferSDKType {
  sender: string;
  recipient: string;
  batch_denom: string;
  tradable_amount: string;
  retired_amount: string;
}
/**
 * EventRetire is an event emitted when credits are retired. When credits are
 * retired from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventRetire {
  /**
   * owner is the account that owns the retired credits. This will be the
   * account receiving credits in the case that credits were retired upon
   * issuance using Msg/CreateBatch, retired upon transfer using Msg/Send,
   * retired upon taking from a basket using basket.Msg/Take, or retired
   * upon purchase using marketplace.Msg/BuyDirect.
   */
  owner: string;
  /**
   * batch_denom is the unique identifier of the credit batch within which the
   * credits were retired.
   */
  batchDenom: string;
  /** amount is the decimal number of credits that have been retired. */
  amount: string;
  /**
   * jurisdiction is the jurisdiction of the beneficiary or buyer of the retired
   * credits. It is a string of the form
   * <country-code>[-<sub-national-code>[ <postal-code>]], with the first two
   * fields conforming to ISO 3166-2, and postal-code being up to 64
   * alphanumeric characters.
   */
  jurisdiction: string;
}
/**
 * EventRetire is an event emitted when credits are retired. When credits are
 * retired from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventRetireSDKType {
  owner: string;
  batch_denom: string;
  amount: string;
  jurisdiction: string;
}
/**
 * EventCancel is an event emitted when credits are cancelled. When credits are
 * cancelled from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventCancel {
  /** owner is the account which has cancelled the credits. */
  owner: string;
  /**
   * batch_denom is the unique identifier of the credit batch within which the
   * credits were cancelled.
   */
  batchDenom: string;
  /** amount is the decimal number of credits that have been cancelled. */
  amount: string;
}
/**
 * EventCancel is an event emitted when credits are cancelled. When credits are
 * cancelled from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventCancelSDKType {
  owner: string;
  batch_denom: string;
  amount: string;
}
/**
 * EventUpdateClassAdmin is emitted when the admin address of a credit class is
 * changed.
 */
export interface EventUpdateClassAdmin {
  /** class_id is the unique identifier of the class that was updated. */
  classId: string;
}
/**
 * EventUpdateClassAdmin is emitted when the admin address of a credit class is
 * changed.
 */
export interface EventUpdateClassAdminSDKType {
  class_id: string;
}
/**
 * EventUpdateClassIssuers is emitted when the issuer list for a credit class
 * is updated.
 */
export interface EventUpdateClassIssuers {
  /** class_id is the unique identifier of the class that was updated. */
  classId: string;
}
/**
 * EventUpdateClassIssuers is emitted when the issuer list for a credit class
 * is updated.
 */
export interface EventUpdateClassIssuersSDKType {
  class_id: string;
}
/**
 * EventUpdateClassMetadata is emitted when the credit class metadata is
 * changed.
 */
export interface EventUpdateClassMetadata {
  /** class_id is the unique identifier of the class that was updated. */
  classId: string;
}
/**
 * EventUpdateClassMetadata is emitted when the credit class metadata is
 * changed.
 */
export interface EventUpdateClassMetadataSDKType {
  class_id: string;
}
/** EventUpdateProjectAdmin is emitted when the project admin is changed. */
export interface EventUpdateProjectAdmin {
  /** project_id is the unique identifier of the project that was updated. */
  projectId: string;
}
/** EventUpdateProjectAdmin is emitted when the project admin is changed. */
export interface EventUpdateProjectAdminSDKType {
  project_id: string;
}
/** EventUpdateProjectMetadata is emitted when the project metadata is changed. */
export interface EventUpdateProjectMetadata {
  /** project_id is the unique identifier of the project that was updated. */
  projectId: string;
}
/** EventUpdateProjectMetadata is emitted when the project metadata is changed. */
export interface EventUpdateProjectMetadataSDKType {
  project_id: string;
}
/** EventSealBatch is emitted when a batch is sealed. */
export interface EventSealBatch {
  /** batch_denom is the denom of the batch that was sealed. */
  batchDenom: string;
}
/** EventSealBatch is emitted when a batch is sealed. */
export interface EventSealBatchSDKType {
  batch_denom: string;
}
/** EventAddCreditType is emitted when governance approves a new credit type. */
export interface EventAddCreditType {
  /** abbreviation is the abbreviation of the credit type. */
  abbreviation: string;
}
/** EventAddCreditType is emitted when governance approves a new credit type. */
export interface EventAddCreditTypeSDKType {
  abbreviation: string;
}
function createBaseEventCreateClass(): EventCreateClass {
  return {
    classId: ""
  };
}
export const EventCreateClass = {
  typeUrl: "/regen.ecocredit.v1.EventCreateClass",
  encode(message: EventCreateClass, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateClass {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCreateClass>): EventCreateClass {
    const message = createBaseEventCreateClass();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: EventCreateClassAmino): EventCreateClass {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: EventCreateClass): EventCreateClassAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: EventCreateClassAminoMsg): EventCreateClass {
    return EventCreateClass.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateClassProtoMsg): EventCreateClass {
    return EventCreateClass.decode(message.value);
  },
  toProto(message: EventCreateClass): Uint8Array {
    return EventCreateClass.encode(message).finish();
  },
  toProtoMsg(message: EventCreateClass): EventCreateClassProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventCreateClass",
      value: EventCreateClass.encode(message).finish()
    };
  }
};
function createBaseEventCreateProject(): EventCreateProject {
  return {
    projectId: ""
  };
}
export const EventCreateProject = {
  typeUrl: "/regen.ecocredit.v1.EventCreateProject",
  encode(message: EventCreateProject, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateProject {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateProject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCreateProject>): EventCreateProject {
    const message = createBaseEventCreateProject();
    message.projectId = object.projectId ?? "";
    return message;
  },
  fromAmino(object: EventCreateProjectAmino): EventCreateProject {
    return {
      projectId: object.project_id
    };
  },
  toAmino(message: EventCreateProject): EventCreateProjectAmino {
    const obj: any = {};
    obj.project_id = message.projectId;
    return obj;
  },
  fromAminoMsg(object: EventCreateProjectAminoMsg): EventCreateProject {
    return EventCreateProject.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateProjectProtoMsg): EventCreateProject {
    return EventCreateProject.decode(message.value);
  },
  toProto(message: EventCreateProject): Uint8Array {
    return EventCreateProject.encode(message).finish();
  },
  toProtoMsg(message: EventCreateProject): EventCreateProjectProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventCreateProject",
      value: EventCreateProject.encode(message).finish()
    };
  }
};
function createBaseEventCreateBatch(): EventCreateBatch {
  return {
    batchDenom: ""
  };
}
export const EventCreateBatch = {
  typeUrl: "/regen.ecocredit.v1.EventCreateBatch",
  encode(message: EventCreateBatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreateBatch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreateBatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCreateBatch>): EventCreateBatch {
    const message = createBaseEventCreateBatch();
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: EventCreateBatchAmino): EventCreateBatch {
    return {
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: EventCreateBatch): EventCreateBatchAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: EventCreateBatchAminoMsg): EventCreateBatch {
    return EventCreateBatch.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateBatchProtoMsg): EventCreateBatch {
    return EventCreateBatch.decode(message.value);
  },
  toProto(message: EventCreateBatch): Uint8Array {
    return EventCreateBatch.encode(message).finish();
  },
  toProtoMsg(message: EventCreateBatch): EventCreateBatchProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventCreateBatch",
      value: EventCreateBatch.encode(message).finish()
    };
  }
};
function createBaseEventMint(): EventMint {
  return {
    batchDenom: "",
    originTx: OriginTx.fromPartial({})
  };
}
export const EventMint = {
  typeUrl: "/regen.ecocredit.v1.EventMint",
  encode(message: EventMint, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    if (message.originTx !== undefined) {
      OriginTx.encode(message.originTx, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventMint {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        case 2:
          message.originTx = OriginTx.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventMint>): EventMint {
    const message = createBaseEventMint();
    message.batchDenom = object.batchDenom ?? "";
    message.originTx = object.originTx !== undefined && object.originTx !== null ? OriginTx.fromPartial(object.originTx) : undefined;
    return message;
  },
  fromAmino(object: EventMintAmino): EventMint {
    return {
      batchDenom: object.batch_denom,
      originTx: object?.origin_tx ? OriginTx.fromAmino(object.origin_tx) : undefined
    };
  },
  toAmino(message: EventMint): EventMintAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    obj.origin_tx = message.originTx ? OriginTx.toAmino(message.originTx) : undefined;
    return obj;
  },
  fromAminoMsg(object: EventMintAminoMsg): EventMint {
    return EventMint.fromAmino(object.value);
  },
  fromProtoMsg(message: EventMintProtoMsg): EventMint {
    return EventMint.decode(message.value);
  },
  toProto(message: EventMint): Uint8Array {
    return EventMint.encode(message).finish();
  },
  toProtoMsg(message: EventMint): EventMintProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventMint",
      value: EventMint.encode(message).finish()
    };
  }
};
function createBaseEventTransfer(): EventTransfer {
  return {
    sender: "",
    recipient: "",
    batchDenom: "",
    tradableAmount: "",
    retiredAmount: ""
  };
}
export const EventTransfer = {
  typeUrl: "/regen.ecocredit.v1.EventTransfer",
  encode(message: EventTransfer, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.recipient !== "") {
      writer.uint32(18).string(message.recipient);
    }
    if (message.batchDenom !== "") {
      writer.uint32(26).string(message.batchDenom);
    }
    if (message.tradableAmount !== "") {
      writer.uint32(34).string(message.tradableAmount);
    }
    if (message.retiredAmount !== "") {
      writer.uint32(42).string(message.retiredAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventTransfer {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTransfer();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.recipient = reader.string();
          break;
        case 3:
          message.batchDenom = reader.string();
          break;
        case 4:
          message.tradableAmount = reader.string();
          break;
        case 5:
          message.retiredAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventTransfer>): EventTransfer {
    const message = createBaseEventTransfer();
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    return message;
  },
  fromAmino(object: EventTransferAmino): EventTransfer {
    return {
      sender: object.sender,
      recipient: object.recipient,
      batchDenom: object.batch_denom,
      tradableAmount: object.tradable_amount,
      retiredAmount: object.retired_amount
    };
  },
  toAmino(message: EventTransfer): EventTransferAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.recipient = message.recipient;
    obj.batch_denom = message.batchDenom;
    obj.tradable_amount = message.tradableAmount;
    obj.retired_amount = message.retiredAmount;
    return obj;
  },
  fromAminoMsg(object: EventTransferAminoMsg): EventTransfer {
    return EventTransfer.fromAmino(object.value);
  },
  fromProtoMsg(message: EventTransferProtoMsg): EventTransfer {
    return EventTransfer.decode(message.value);
  },
  toProto(message: EventTransfer): Uint8Array {
    return EventTransfer.encode(message).finish();
  },
  toProtoMsg(message: EventTransfer): EventTransferProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventTransfer",
      value: EventTransfer.encode(message).finish()
    };
  }
};
function createBaseEventRetire(): EventRetire {
  return {
    owner: "",
    batchDenom: "",
    amount: "",
    jurisdiction: ""
  };
}
export const EventRetire = {
  typeUrl: "/regen.ecocredit.v1.EventRetire",
  encode(message: EventRetire, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.jurisdiction !== "") {
      writer.uint32(34).string(message.jurisdiction);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventRetire {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventRetire();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.jurisdiction = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventRetire>): EventRetire {
    const message = createBaseEventRetire();
    message.owner = object.owner ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    message.jurisdiction = object.jurisdiction ?? "";
    return message;
  },
  fromAmino(object: EventRetireAmino): EventRetire {
    return {
      owner: object.owner,
      batchDenom: object.batch_denom,
      amount: object.amount,
      jurisdiction: object.jurisdiction
    };
  },
  toAmino(message: EventRetire): EventRetireAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.batch_denom = message.batchDenom;
    obj.amount = message.amount;
    obj.jurisdiction = message.jurisdiction;
    return obj;
  },
  fromAminoMsg(object: EventRetireAminoMsg): EventRetire {
    return EventRetire.fromAmino(object.value);
  },
  fromProtoMsg(message: EventRetireProtoMsg): EventRetire {
    return EventRetire.decode(message.value);
  },
  toProto(message: EventRetire): Uint8Array {
    return EventRetire.encode(message).finish();
  },
  toProtoMsg(message: EventRetire): EventRetireProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventRetire",
      value: EventRetire.encode(message).finish()
    };
  }
};
function createBaseEventCancel(): EventCancel {
  return {
    owner: "",
    batchDenom: "",
    amount: ""
  };
}
export const EventCancel = {
  typeUrl: "/regen.ecocredit.v1.EventCancel",
  encode(message: EventCancel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCancel {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCancel();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCancel>): EventCancel {
    const message = createBaseEventCancel();
    message.owner = object.owner ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: EventCancelAmino): EventCancel {
    return {
      owner: object.owner,
      batchDenom: object.batch_denom,
      amount: object.amount
    };
  },
  toAmino(message: EventCancel): EventCancelAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.batch_denom = message.batchDenom;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: EventCancelAminoMsg): EventCancel {
    return EventCancel.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCancelProtoMsg): EventCancel {
    return EventCancel.decode(message.value);
  },
  toProto(message: EventCancel): Uint8Array {
    return EventCancel.encode(message).finish();
  },
  toProtoMsg(message: EventCancel): EventCancelProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventCancel",
      value: EventCancel.encode(message).finish()
    };
  }
};
function createBaseEventUpdateClassAdmin(): EventUpdateClassAdmin {
  return {
    classId: ""
  };
}
export const EventUpdateClassAdmin = {
  typeUrl: "/regen.ecocredit.v1.EventUpdateClassAdmin",
  encode(message: EventUpdateClassAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateClassAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateClassAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateClassAdmin>): EventUpdateClassAdmin {
    const message = createBaseEventUpdateClassAdmin();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: EventUpdateClassAdminAmino): EventUpdateClassAdmin {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: EventUpdateClassAdmin): EventUpdateClassAdminAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: EventUpdateClassAdminAminoMsg): EventUpdateClassAdmin {
    return EventUpdateClassAdmin.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateClassAdminProtoMsg): EventUpdateClassAdmin {
    return EventUpdateClassAdmin.decode(message.value);
  },
  toProto(message: EventUpdateClassAdmin): Uint8Array {
    return EventUpdateClassAdmin.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateClassAdmin): EventUpdateClassAdminProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventUpdateClassAdmin",
      value: EventUpdateClassAdmin.encode(message).finish()
    };
  }
};
function createBaseEventUpdateClassIssuers(): EventUpdateClassIssuers {
  return {
    classId: ""
  };
}
export const EventUpdateClassIssuers = {
  typeUrl: "/regen.ecocredit.v1.EventUpdateClassIssuers",
  encode(message: EventUpdateClassIssuers, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateClassIssuers {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateClassIssuers();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateClassIssuers>): EventUpdateClassIssuers {
    const message = createBaseEventUpdateClassIssuers();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: EventUpdateClassIssuersAmino): EventUpdateClassIssuers {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: EventUpdateClassIssuers): EventUpdateClassIssuersAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: EventUpdateClassIssuersAminoMsg): EventUpdateClassIssuers {
    return EventUpdateClassIssuers.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateClassIssuersProtoMsg): EventUpdateClassIssuers {
    return EventUpdateClassIssuers.decode(message.value);
  },
  toProto(message: EventUpdateClassIssuers): Uint8Array {
    return EventUpdateClassIssuers.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateClassIssuers): EventUpdateClassIssuersProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventUpdateClassIssuers",
      value: EventUpdateClassIssuers.encode(message).finish()
    };
  }
};
function createBaseEventUpdateClassMetadata(): EventUpdateClassMetadata {
  return {
    classId: ""
  };
}
export const EventUpdateClassMetadata = {
  typeUrl: "/regen.ecocredit.v1.EventUpdateClassMetadata",
  encode(message: EventUpdateClassMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateClassMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateClassMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateClassMetadata>): EventUpdateClassMetadata {
    const message = createBaseEventUpdateClassMetadata();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: EventUpdateClassMetadataAmino): EventUpdateClassMetadata {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: EventUpdateClassMetadata): EventUpdateClassMetadataAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: EventUpdateClassMetadataAminoMsg): EventUpdateClassMetadata {
    return EventUpdateClassMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateClassMetadataProtoMsg): EventUpdateClassMetadata {
    return EventUpdateClassMetadata.decode(message.value);
  },
  toProto(message: EventUpdateClassMetadata): Uint8Array {
    return EventUpdateClassMetadata.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateClassMetadata): EventUpdateClassMetadataProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventUpdateClassMetadata",
      value: EventUpdateClassMetadata.encode(message).finish()
    };
  }
};
function createBaseEventUpdateProjectAdmin(): EventUpdateProjectAdmin {
  return {
    projectId: ""
  };
}
export const EventUpdateProjectAdmin = {
  typeUrl: "/regen.ecocredit.v1.EventUpdateProjectAdmin",
  encode(message: EventUpdateProjectAdmin, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateProjectAdmin {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateProjectAdmin();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateProjectAdmin>): EventUpdateProjectAdmin {
    const message = createBaseEventUpdateProjectAdmin();
    message.projectId = object.projectId ?? "";
    return message;
  },
  fromAmino(object: EventUpdateProjectAdminAmino): EventUpdateProjectAdmin {
    return {
      projectId: object.project_id
    };
  },
  toAmino(message: EventUpdateProjectAdmin): EventUpdateProjectAdminAmino {
    const obj: any = {};
    obj.project_id = message.projectId;
    return obj;
  },
  fromAminoMsg(object: EventUpdateProjectAdminAminoMsg): EventUpdateProjectAdmin {
    return EventUpdateProjectAdmin.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateProjectAdminProtoMsg): EventUpdateProjectAdmin {
    return EventUpdateProjectAdmin.decode(message.value);
  },
  toProto(message: EventUpdateProjectAdmin): Uint8Array {
    return EventUpdateProjectAdmin.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateProjectAdmin): EventUpdateProjectAdminProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventUpdateProjectAdmin",
      value: EventUpdateProjectAdmin.encode(message).finish()
    };
  }
};
function createBaseEventUpdateProjectMetadata(): EventUpdateProjectMetadata {
  return {
    projectId: ""
  };
}
export const EventUpdateProjectMetadata = {
  typeUrl: "/regen.ecocredit.v1.EventUpdateProjectMetadata",
  encode(message: EventUpdateProjectMetadata, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateProjectMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateProjectMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateProjectMetadata>): EventUpdateProjectMetadata {
    const message = createBaseEventUpdateProjectMetadata();
    message.projectId = object.projectId ?? "";
    return message;
  },
  fromAmino(object: EventUpdateProjectMetadataAmino): EventUpdateProjectMetadata {
    return {
      projectId: object.project_id
    };
  },
  toAmino(message: EventUpdateProjectMetadata): EventUpdateProjectMetadataAmino {
    const obj: any = {};
    obj.project_id = message.projectId;
    return obj;
  },
  fromAminoMsg(object: EventUpdateProjectMetadataAminoMsg): EventUpdateProjectMetadata {
    return EventUpdateProjectMetadata.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateProjectMetadataProtoMsg): EventUpdateProjectMetadata {
    return EventUpdateProjectMetadata.decode(message.value);
  },
  toProto(message: EventUpdateProjectMetadata): Uint8Array {
    return EventUpdateProjectMetadata.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateProjectMetadata): EventUpdateProjectMetadataProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventUpdateProjectMetadata",
      value: EventUpdateProjectMetadata.encode(message).finish()
    };
  }
};
function createBaseEventSealBatch(): EventSealBatch {
  return {
    batchDenom: ""
  };
}
export const EventSealBatch = {
  typeUrl: "/regen.ecocredit.v1.EventSealBatch",
  encode(message: EventSealBatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventSealBatch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSealBatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSealBatch>): EventSealBatch {
    const message = createBaseEventSealBatch();
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: EventSealBatchAmino): EventSealBatch {
    return {
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: EventSealBatch): EventSealBatchAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: EventSealBatchAminoMsg): EventSealBatch {
    return EventSealBatch.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSealBatchProtoMsg): EventSealBatch {
    return EventSealBatch.decode(message.value);
  },
  toProto(message: EventSealBatch): Uint8Array {
    return EventSealBatch.encode(message).finish();
  },
  toProtoMsg(message: EventSealBatch): EventSealBatchProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventSealBatch",
      value: EventSealBatch.encode(message).finish()
    };
  }
};
function createBaseEventAddCreditType(): EventAddCreditType {
  return {
    abbreviation: ""
  };
}
export const EventAddCreditType = {
  typeUrl: "/regen.ecocredit.v1.EventAddCreditType",
  encode(message: EventAddCreditType, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.abbreviation !== "") {
      writer.uint32(10).string(message.abbreviation);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventAddCreditType {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAddCreditType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.abbreviation = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAddCreditType>): EventAddCreditType {
    const message = createBaseEventAddCreditType();
    message.abbreviation = object.abbreviation ?? "";
    return message;
  },
  fromAmino(object: EventAddCreditTypeAmino): EventAddCreditType {
    return {
      abbreviation: object.abbreviation
    };
  },
  toAmino(message: EventAddCreditType): EventAddCreditTypeAmino {
    const obj: any = {};
    obj.abbreviation = message.abbreviation;
    return obj;
  },
  fromAminoMsg(object: EventAddCreditTypeAminoMsg): EventAddCreditType {
    return EventAddCreditType.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAddCreditTypeProtoMsg): EventAddCreditType {
    return EventAddCreditType.decode(message.value);
  },
  toProto(message: EventAddCreditType): Uint8Array {
    return EventAddCreditType.encode(message).finish();
  },
  toProtoMsg(message: EventAddCreditType): EventAddCreditTypeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.EventAddCreditType",
      value: EventAddCreditType.encode(message).finish()
    };
  }
};