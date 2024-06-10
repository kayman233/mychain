import { BasketCredit, BasketCreditSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/** EventCreate is an event emitted when a basket is created. */
export interface EventCreate {
  /** basket_denom is the basket bank denom. */
  basketDenom: string;
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   * Deprecated: This field is still populated and will be removed in the
   * next version.
   */
  /** @deprecated */
  curator: string;
}
/** EventCreate is an event emitted when a basket is created. */
export interface EventCreateSDKType {
  basket_denom: string;
  /** @deprecated */
  curator: string;
}
/**
 * EventPut is an event emitted when credits are put into a basket in return for
 * basket tokens.
 */
export interface EventPut {
  /** owner is the owner of the credits put into the basket. */
  owner: string;
  /** basket_denom is the basket bank denom that the credits were added to. */
  basketDenom: string;
  /**
   * credits are the credits that were added to the basket.
   * Deprecated: This field is still populated and will be removed in the
   * next version.
   */
  /** @deprecated */
  credits: BasketCredit[];
  /**
   * amount is the integer number of basket tokens converted from credits.
   * Deprecated: This field is still populated and will be removed in the
   * next version.
   */
  /** @deprecated */
  amount: string;
}
/**
 * EventPut is an event emitted when credits are put into a basket in return for
 * basket tokens.
 */
export interface EventPutSDKType {
  owner: string;
  basket_denom: string;
  /** @deprecated */
  credits: BasketCreditSDKType[];
  /** @deprecated */
  amount: string;
}
/**
 * EventTake is an event emitted when credits are taken from a basket starting
 * from the oldest credits first.
 */
export interface EventTake {
  /** owner is the owner of the credits taken from the basket. */
  owner: string;
  /** basket_denom is the basket bank denom that credits were taken from. */
  basketDenom: string;
  /**
   * credits are the credits that were taken from the basket.
   * Deprecated: This field is still populated and will be removed in the
   * next version.
   */
  /** @deprecated */
  credits: BasketCredit[];
  /**
   * amount is the integer number of basket tokens converted to credits.
   * Deprecated: This field is still populated and will be removed in the
   * next version.
   */
  /** @deprecated */
  amount: string;
}
/**
 * EventTake is an event emitted when credits are taken from a basket starting
 * from the oldest credits first.
 */
export interface EventTakeSDKType {
  owner: string;
  basket_denom: string;
  /** @deprecated */
  credits: BasketCreditSDKType[];
  /** @deprecated */
  amount: string;
}
function createBaseEventCreate(): EventCreate {
  return {
    basketDenom: "",
    curator: ""
  };
}
export const EventCreate = {
  typeUrl: "/regen.ecocredit.basket.v1.EventCreate",
  encode(message: EventCreate, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketDenom !== "") {
      writer.uint32(10).string(message.basketDenom);
    }
    if (message.curator !== "") {
      writer.uint32(18).string(message.curator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventCreate {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventCreate();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketDenom = reader.string();
          break;
        case 2:
          message.curator = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventCreate>): EventCreate {
    const message = createBaseEventCreate();
    message.basketDenom = object.basketDenom ?? "";
    message.curator = object.curator ?? "";
    return message;
  },
  fromAmino(object: EventCreateAmino): EventCreate {
    return {
      basketDenom: object.basket_denom,
      curator: object.curator
    };
  },
  toAmino(message: EventCreate): EventCreateAmino {
    const obj: any = {};
    obj.basket_denom = message.basketDenom;
    obj.curator = message.curator;
    return obj;
  },
  fromAminoMsg(object: EventCreateAminoMsg): EventCreate {
    return EventCreate.fromAmino(object.value);
  },
  fromProtoMsg(message: EventCreateProtoMsg): EventCreate {
    return EventCreate.decode(message.value);
  },
  toProto(message: EventCreate): Uint8Array {
    return EventCreate.encode(message).finish();
  },
  toProtoMsg(message: EventCreate): EventCreateProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.EventCreate",
      value: EventCreate.encode(message).finish()
    };
  }
};
function createBaseEventPut(): EventPut {
  return {
    owner: "",
    basketDenom: "",
    credits: [],
    amount: ""
  };
}
export const EventPut = {
  typeUrl: "/regen.ecocredit.basket.v1.EventPut",
  encode(message: EventPut, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    for (const v of message.credits) {
      BasketCredit.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventPut {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventPut();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.credits.push(BasketCredit.decode(reader, reader.uint32()));
          break;
        case 4:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventPut>): EventPut {
    const message = createBaseEventPut();
    message.owner = object.owner ?? "";
    message.basketDenom = object.basketDenom ?? "";
    message.credits = object.credits?.map(e => BasketCredit.fromPartial(e)) || [];
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: EventPutAmino): EventPut {
    return {
      owner: object.owner,
      basketDenom: object.basket_denom,
      credits: Array.isArray(object?.credits) ? object.credits.map((e: any) => BasketCredit.fromAmino(e)) : [],
      amount: object.amount
    };
  },
  toAmino(message: EventPut): EventPutAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.basket_denom = message.basketDenom;
    if (message.credits) {
      obj.credits = message.credits.map(e => e ? BasketCredit.toAmino(e) : undefined);
    } else {
      obj.credits = [];
    }
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: EventPutAminoMsg): EventPut {
    return EventPut.fromAmino(object.value);
  },
  fromProtoMsg(message: EventPutProtoMsg): EventPut {
    return EventPut.decode(message.value);
  },
  toProto(message: EventPut): Uint8Array {
    return EventPut.encode(message).finish();
  },
  toProtoMsg(message: EventPut): EventPutProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.EventPut",
      value: EventPut.encode(message).finish()
    };
  }
};
function createBaseEventTake(): EventTake {
  return {
    owner: "",
    basketDenom: "",
    credits: [],
    amount: ""
  };
}
export const EventTake = {
  typeUrl: "/regen.ecocredit.basket.v1.EventTake",
  encode(message: EventTake, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    for (const v of message.credits) {
      BasketCredit.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.amount !== "") {
      writer.uint32(34).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventTake {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTake();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.credits.push(BasketCredit.decode(reader, reader.uint32()));
          break;
        case 4:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventTake>): EventTake {
    const message = createBaseEventTake();
    message.owner = object.owner ?? "";
    message.basketDenom = object.basketDenom ?? "";
    message.credits = object.credits?.map(e => BasketCredit.fromPartial(e)) || [];
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: EventTakeAmino): EventTake {
    return {
      owner: object.owner,
      basketDenom: object.basket_denom,
      credits: Array.isArray(object?.credits) ? object.credits.map((e: any) => BasketCredit.fromAmino(e)) : [],
      amount: object.amount
    };
  },
  toAmino(message: EventTake): EventTakeAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.basket_denom = message.basketDenom;
    if (message.credits) {
      obj.credits = message.credits.map(e => e ? BasketCredit.toAmino(e) : undefined);
    } else {
      obj.credits = [];
    }
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: EventTakeAminoMsg): EventTake {
    return EventTake.fromAmino(object.value);
  },
  fromProtoMsg(message: EventTakeProtoMsg): EventTake {
    return EventTake.decode(message.value);
  },
  toProto(message: EventTake): Uint8Array {
    return EventTake.encode(message).finish();
  },
  toProtoMsg(message: EventTake): EventTakeProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.EventTake",
      value: EventTake.encode(message).finish()
    };
  }
};