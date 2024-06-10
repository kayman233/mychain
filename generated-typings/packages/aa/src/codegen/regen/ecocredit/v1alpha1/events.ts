import { BinaryReader, BinaryWriter } from "../../../binary";
/** EventCreateClass is an event emitted when a credit class is created. */
export interface EventCreateClass {
  /** class_id is the unique ID of credit class. */
  classId: string;
  /** admin is the admin of the credit class. */
  admin: string;
}
/** EventCreateClass is an event emitted when a credit class is created. */
export interface EventCreateClassSDKType {
  class_id: string;
  admin: string;
}
/** EventCreateBatch is an event emitted when a credit batch is created. */
export interface EventCreateBatch {
  /** class_id is the unique ID of credit class. */
  classId: string;
  /** batch_denom is the unique ID of credit batch. */
  batchDenom: string;
  /** issuer is the account address of the issuer of the credit batch. */
  issuer: string;
  /** total_amount is the total number of credits in the credit batch. */
  totalAmount: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  startDate: string;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  endDate: string;
  /**
   * project_location is the location of the project backing the credits in this
   * batch. Full documentation can be found in MsgCreateBatch.project_location.
   */
  projectLocation: string;
}
/** EventCreateBatch is an event emitted when a credit batch is created. */
export interface EventCreateBatchSDKType {
  class_id: string;
  batch_denom: string;
  issuer: string;
  total_amount: string;
  start_date: string;
  end_date: string;
  project_location: string;
}
/**
 * EventReceive is an event emitted when credits are received either via
 * creation of a new batch, transfer of credits, or taking credits from a
 * basket. Each batch_denom created, transferred or taken from a baset will
 * result in a separate EventReceive for easy indexing.
 */
export interface EventReceive {
  /**
   * sender is the sender of the credits in the case that this event is the
   * result of a transfer. It will not be set when credits are received at
   * initial issuance or taken from a basket.
   */
  sender: string;
  /** recipient is the recipient of the credits. */
  recipient: string;
  /** batch_denom is the unique ID of credit batch. */
  batchDenom: string;
  /** tradable_amount is the decimal number of tradable credits received. */
  tradableAmount: string;
  /** retired_amount is the decimal number of retired credits received. */
  retiredAmount: string;
  /**
   * basket_denom is the denom of the basket. when the basket_denom field is
   * set, it indicates that this event was triggered by the transfer of credits
   * from a basket. It will not be set if the credits were sent by a user, or by
   * initial issuance.
   */
  basketDenom: string;
}
/**
 * EventReceive is an event emitted when credits are received either via
 * creation of a new batch, transfer of credits, or taking credits from a
 * basket. Each batch_denom created, transferred or taken from a baset will
 * result in a separate EventReceive for easy indexing.
 */
export interface EventReceiveSDKType {
  sender: string;
  recipient: string;
  batch_denom: string;
  tradable_amount: string;
  retired_amount: string;
  basket_denom: string;
}
/**
 * EventRetire is an event emitted when credits are retired. When credits are
 * retired from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventRetire {
  /**
   * retirer is the account which has done the "retiring". This will be the
   * account receiving credits in the case that credits were retired upon
   * issuance using Msg/CreateBatch or retired upon transfer using Msg/Send.
   */
  retirer: string;
  /** batch_denom is the unique ID of credit batch. */
  batchDenom: string;
  /** amount is the decimal number of credits that have been retired. */
  amount: string;
  /**
   * location is the location of the beneficiary or buyer of the retired
   * credits. It is a string of the form
   * <country-code>[-<sub-national-code>[ <postal-code>]], with the first two
   * fields conforming to ISO 3166-2, and postal-code being up to 64
   * alphanumeric characters.
   */
  location: string;
}
/**
 * EventRetire is an event emitted when credits are retired. When credits are
 * retired from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventRetireSDKType {
  retirer: string;
  batch_denom: string;
  amount: string;
  location: string;
}
/**
 * EventCancel is an event emitted when credits are cancelled. When credits are
 * cancelled from multiple batches in the same transaction, a separate event is
 * emitted for each batch_denom. This allows for easier indexing.
 */
export interface EventCancel {
  /**
   * canceller is the account which has cancelled the credits, which should be
   * the holder of the credits.
   */
  canceller: string;
  /** batch_denom is the unique ID of credit batch. */
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
  canceller: string;
  batch_denom: string;
  amount: string;
}
function createBaseEventCreateClass(): EventCreateClass {
  return {
    classId: "",
    admin: ""
  };
}
export const EventCreateClass = {
  typeUrl: "/regen.ecocredit.v1alpha1.EventCreateClass",
  encode(message: EventCreateClass, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
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
        case 2:
          message.admin = reader.string();
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
    message.admin = object.admin ?? "";
    return message;
  },
  fromAmino(object: EventCreateClassAmino): EventCreateClass {
    return {
      classId: object.class_id,
      admin: object.admin
    };
  },
  toAmino(message: EventCreateClass): EventCreateClassAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.admin = message.admin;
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
      typeUrl: "/regen.ecocredit.v1alpha1.EventCreateClass",
      value: EventCreateClass.encode(message).finish()
    };
  }
};
function createBaseEventCreateBatch(): EventCreateBatch {
  return {
    classId: "",
    batchDenom: "",
    issuer: "",
    totalAmount: "",
    startDate: "",
    endDate: "",
    projectLocation: ""
  };
}
export const EventCreateBatch = {
  typeUrl: "/regen.ecocredit.v1alpha1.EventCreateBatch",
  encode(message: EventCreateBatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.issuer !== "") {
      writer.uint32(26).string(message.issuer);
    }
    if (message.totalAmount !== "") {
      writer.uint32(34).string(message.totalAmount);
    }
    if (message.startDate !== "") {
      writer.uint32(42).string(message.startDate);
    }
    if (message.endDate !== "") {
      writer.uint32(50).string(message.endDate);
    }
    if (message.projectLocation !== "") {
      writer.uint32(58).string(message.projectLocation);
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
          message.classId = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.issuer = reader.string();
          break;
        case 4:
          message.totalAmount = reader.string();
          break;
        case 5:
          message.startDate = reader.string();
          break;
        case 6:
          message.endDate = reader.string();
          break;
        case 7:
          message.projectLocation = reader.string();
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
    message.classId = object.classId ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.issuer = object.issuer ?? "";
    message.totalAmount = object.totalAmount ?? "";
    message.startDate = object.startDate ?? "";
    message.endDate = object.endDate ?? "";
    message.projectLocation = object.projectLocation ?? "";
    return message;
  },
  fromAmino(object: EventCreateBatchAmino): EventCreateBatch {
    return {
      classId: object.class_id,
      batchDenom: object.batch_denom,
      issuer: object.issuer,
      totalAmount: object.total_amount,
      startDate: object.start_date,
      endDate: object.end_date,
      projectLocation: object.project_location
    };
  },
  toAmino(message: EventCreateBatch): EventCreateBatchAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.batch_denom = message.batchDenom;
    obj.issuer = message.issuer;
    obj.total_amount = message.totalAmount;
    obj.start_date = message.startDate;
    obj.end_date = message.endDate;
    obj.project_location = message.projectLocation;
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
      typeUrl: "/regen.ecocredit.v1alpha1.EventCreateBatch",
      value: EventCreateBatch.encode(message).finish()
    };
  }
};
function createBaseEventReceive(): EventReceive {
  return {
    sender: "",
    recipient: "",
    batchDenom: "",
    tradableAmount: "",
    retiredAmount: "",
    basketDenom: ""
  };
}
export const EventReceive = {
  typeUrl: "/regen.ecocredit.v1alpha1.EventReceive",
  encode(message: EventReceive, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
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
    if (message.basketDenom !== "") {
      writer.uint32(50).string(message.basketDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventReceive {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventReceive();
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
        case 6:
          message.basketDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventReceive>): EventReceive {
    const message = createBaseEventReceive();
    message.sender = object.sender ?? "";
    message.recipient = object.recipient ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    message.basketDenom = object.basketDenom ?? "";
    return message;
  },
  fromAmino(object: EventReceiveAmino): EventReceive {
    return {
      sender: object.sender,
      recipient: object.recipient,
      batchDenom: object.batch_denom,
      tradableAmount: object.tradable_amount,
      retiredAmount: object.retired_amount,
      basketDenom: object.basket_denom
    };
  },
  toAmino(message: EventReceive): EventReceiveAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.recipient = message.recipient;
    obj.batch_denom = message.batchDenom;
    obj.tradable_amount = message.tradableAmount;
    obj.retired_amount = message.retiredAmount;
    obj.basket_denom = message.basketDenom;
    return obj;
  },
  fromAminoMsg(object: EventReceiveAminoMsg): EventReceive {
    return EventReceive.fromAmino(object.value);
  },
  fromProtoMsg(message: EventReceiveProtoMsg): EventReceive {
    return EventReceive.decode(message.value);
  },
  toProto(message: EventReceive): Uint8Array {
    return EventReceive.encode(message).finish();
  },
  toProtoMsg(message: EventReceive): EventReceiveProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.EventReceive",
      value: EventReceive.encode(message).finish()
    };
  }
};
function createBaseEventRetire(): EventRetire {
  return {
    retirer: "",
    batchDenom: "",
    amount: "",
    location: ""
  };
}
export const EventRetire = {
  typeUrl: "/regen.ecocredit.v1alpha1.EventRetire",
  encode(message: EventRetire, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.retirer !== "") {
      writer.uint32(10).string(message.retirer);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.amount !== "") {
      writer.uint32(26).string(message.amount);
    }
    if (message.location !== "") {
      writer.uint32(34).string(message.location);
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
          message.retirer = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.amount = reader.string();
          break;
        case 4:
          message.location = reader.string();
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
    message.retirer = object.retirer ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    message.location = object.location ?? "";
    return message;
  },
  fromAmino(object: EventRetireAmino): EventRetire {
    return {
      retirer: object.retirer,
      batchDenom: object.batch_denom,
      amount: object.amount,
      location: object.location
    };
  },
  toAmino(message: EventRetire): EventRetireAmino {
    const obj: any = {};
    obj.retirer = message.retirer;
    obj.batch_denom = message.batchDenom;
    obj.amount = message.amount;
    obj.location = message.location;
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
      typeUrl: "/regen.ecocredit.v1alpha1.EventRetire",
      value: EventRetire.encode(message).finish()
    };
  }
};
function createBaseEventCancel(): EventCancel {
  return {
    canceller: "",
    batchDenom: "",
    amount: ""
  };
}
export const EventCancel = {
  typeUrl: "/regen.ecocredit.v1alpha1.EventCancel",
  encode(message: EventCancel, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.canceller !== "") {
      writer.uint32(10).string(message.canceller);
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
          message.canceller = reader.string();
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
    message.canceller = object.canceller ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: EventCancelAmino): EventCancel {
    return {
      canceller: object.canceller,
      batchDenom: object.batch_denom,
      amount: object.amount
    };
  },
  toAmino(message: EventCancel): EventCancelAmino {
    const obj: any = {};
    obj.canceller = message.canceller;
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
      typeUrl: "/regen.ecocredit.v1alpha1.EventCancel",
      value: EventCancel.encode(message).finish()
    };
  }
};