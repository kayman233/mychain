import { BinaryReader, BinaryWriter } from "../../../../binary";
/** EventSell is an event emitted when a sell order is created. */
export interface EventSell {
  /** order_id is the unique identifier of the sell order. */
  orderId: bigint;
}
/** EventSell is an event emitted when a sell order is created. */
export interface EventSellSDKType {
  order_id: bigint;
}
/** EventUpdateSellOrder is an event emitted when a sell order is updated. */
export interface EventUpdateSellOrder {
  /** order_id is the unique identifier of the sell order. */
  orderId: bigint;
}
/** EventUpdateSellOrder is an event emitted when a sell order is updated. */
export interface EventUpdateSellOrderSDKType {
  order_id: bigint;
}
/**
 * EventAllowDenom is an event emitted when a new denom is added for use in the
 * marketplace.
 */
export interface EventAllowDenom {
  /**
   * denom is the bank denom (e.g. ibc/GLKHDSG423SGS) added to the list of
   * allowed denoms for use in the marketplace.
   */
  denom: string;
}
/**
 * EventAllowDenom is an event emitted when a new denom is added for use in the
 * marketplace.
 */
export interface EventAllowDenomSDKType {
  denom: string;
}
function createBaseEventSell(): EventSell {
  return {
    orderId: BigInt(0)
  };
}
export const EventSell = {
  typeUrl: "/regen.ecocredit.marketplace.v1.EventSell",
  encode(message: EventSell, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventSell {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSell();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSell>): EventSell {
    const message = createBaseEventSell();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventSellAmino): EventSell {
    return {
      orderId: BigInt(object.order_id)
    };
  },
  toAmino(message: EventSell): EventSellAmino {
    const obj: any = {};
    obj.order_id = message.orderId ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventSellAminoMsg): EventSell {
    return EventSell.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSellProtoMsg): EventSell {
    return EventSell.decode(message.value);
  },
  toProto(message: EventSell): Uint8Array {
    return EventSell.encode(message).finish();
  },
  toProtoMsg(message: EventSell): EventSellProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.EventSell",
      value: EventSell.encode(message).finish()
    };
  }
};
function createBaseEventUpdateSellOrder(): EventUpdateSellOrder {
  return {
    orderId: BigInt(0)
  };
}
export const EventUpdateSellOrder = {
  typeUrl: "/regen.ecocredit.marketplace.v1.EventUpdateSellOrder",
  encode(message: EventUpdateSellOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.orderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.orderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventUpdateSellOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.orderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventUpdateSellOrder>): EventUpdateSellOrder {
    const message = createBaseEventUpdateSellOrder();
    message.orderId = object.orderId !== undefined && object.orderId !== null ? BigInt(object.orderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: EventUpdateSellOrderAmino): EventUpdateSellOrder {
    return {
      orderId: BigInt(object.order_id)
    };
  },
  toAmino(message: EventUpdateSellOrder): EventUpdateSellOrderAmino {
    const obj: any = {};
    obj.order_id = message.orderId ? message.orderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: EventUpdateSellOrderAminoMsg): EventUpdateSellOrder {
    return EventUpdateSellOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: EventUpdateSellOrderProtoMsg): EventUpdateSellOrder {
    return EventUpdateSellOrder.decode(message.value);
  },
  toProto(message: EventUpdateSellOrder): Uint8Array {
    return EventUpdateSellOrder.encode(message).finish();
  },
  toProtoMsg(message: EventUpdateSellOrder): EventUpdateSellOrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.EventUpdateSellOrder",
      value: EventUpdateSellOrder.encode(message).finish()
    };
  }
};
function createBaseEventAllowDenom(): EventAllowDenom {
  return {
    denom: ""
  };
}
export const EventAllowDenom = {
  typeUrl: "/regen.ecocredit.marketplace.v1.EventAllowDenom",
  encode(message: EventAllowDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventAllowDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAllowDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAllowDenom>): EventAllowDenom {
    const message = createBaseEventAllowDenom();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: EventAllowDenomAmino): EventAllowDenom {
    return {
      denom: object.denom
    };
  },
  toAmino(message: EventAllowDenom): EventAllowDenomAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: EventAllowDenomAminoMsg): EventAllowDenom {
    return EventAllowDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAllowDenomProtoMsg): EventAllowDenom {
    return EventAllowDenom.decode(message.value);
  },
  toProto(message: EventAllowDenom): Uint8Array {
    return EventAllowDenom.encode(message).finish();
  },
  toProtoMsg(message: EventAllowDenom): EventAllowDenomProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.EventAllowDenom",
      value: EventAllowDenom.encode(message).finish()
    };
  }
};