import { Coin, CoinSDKType } from "../../../../cosmos/base/v1beta1/coin";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/** MsgSell is the Msg/Sell request type. */
export interface MsgSell {
  /** owner is the address of the owner of the credits being sold. */
  owner: string;
  /** orders are the sell orders being created. */
  orders: MsgSell_Order[];
}
/** MsgSell is the Msg/Sell request type. */
export interface MsgSellSDKType {
  owner: string;
  orders: MsgSell_OrderSDKType[];
}
/** Order is the content of a new sell order. */
export interface MsgSell_Order {
  /** batch_denom is the credit batch being sold. */
  batchDenom: string;
  /**
   * quantity is the quantity of credits being sold from this batch. If it is
   * less then the balance of credits the owner has available at the time this
   * sell order is matched, the quantity will be adjusted downwards to the
   * owner's balance. However, if the balance of credits is less than this
   * quantity at the time the sell order is created, the operation will fail.
   */
  quantity: string;
  /**
   * ask_price is the price the seller is asking for each unit of the
   * batch_denom. Each credit unit of the batch will be sold for at least the
   * ask_price or more.
   */
  askPrice: Coin;
  /**
   * disable_auto_retire disables auto-retirement of credits which allows a
   * buyer to disable auto-retirement in their buy order enabling them to
   * resell the credits to another buyer.
   */
  disableAutoRetire: boolean;
  /**
   * expiration is an optional timestamp when the sell order expires. When the
   * expiration time is reached, the sell order is removed from state.
   */
  expiration: Date;
}
/** Order is the content of a new sell order. */
export interface MsgSell_OrderSDKType {
  batch_denom: string;
  quantity: string;
  ask_price: CoinSDKType;
  disable_auto_retire: boolean;
  expiration: Date;
}
/** MsgSellResponse is the Msg/Sell response type. */
export interface MsgSellResponse {
  /** sell_order_ids are the sell order IDs of the newly created sell orders. */
  sellOrderIds: bigint[];
}
/** MsgSellResponse is the Msg/Sell response type. */
export interface MsgSellResponseSDKType {
  sell_order_ids: bigint[];
}
/** MsgUpdateSellOrders is the Msg/UpdateSellOrders request type. */
export interface MsgUpdateSellOrders {
  /** owner is the owner of the sell orders. */
  owner: string;
  /** updates are updates to existing sell orders. */
  updates: MsgUpdateSellOrders_Update[];
}
/** MsgUpdateSellOrders is the Msg/UpdateSellOrders request type. */
export interface MsgUpdateSellOrdersSDKType {
  owner: string;
  updates: MsgUpdateSellOrders_UpdateSDKType[];
}
/** Update is an update to an existing sell order. */
export interface MsgUpdateSellOrders_Update {
  /** sell_order_id is the ID of an existing sell order. */
  sellOrderId: bigint;
  /**
   * new_quantity is the updated quantity of credits available to sell, if it
   * is set to zero then the order is cancelled.
   */
  newQuantity: string;
  /** new_ask_price is the new ask price for this sell order */
  newAskPrice: Coin;
  /**
   * disable_auto_retire updates the disable_auto_retire field in the sell
   * order.
   */
  disableAutoRetire: boolean;
  /**
   * new_expiration is an optional timestamp when the sell order expires. When
   * the expiration time is reached, the sell order is removed from state.
   */
  newExpiration: Date;
}
/** Update is an update to an existing sell order. */
export interface MsgUpdateSellOrders_UpdateSDKType {
  sell_order_id: bigint;
  new_quantity: string;
  new_ask_price: CoinSDKType;
  disable_auto_retire: boolean;
  new_expiration: Date;
}
/** MsgUpdateSellOrdersResponse is the Msg/UpdateSellOrders response type. */
export interface MsgUpdateSellOrdersResponse {}
/** MsgUpdateSellOrdersResponse is the Msg/UpdateSellOrders response type. */
export interface MsgUpdateSellOrdersResponseSDKType {}
/** MsgCancelSellOrder is the Msg/CancelSellOrder request type. */
export interface MsgCancelSellOrder {
  /** seller is the address of the seller. */
  seller: string;
  /** sell_order_id is the id of the seller order to cancel. */
  sellOrderId: bigint;
}
/** MsgCancelSellOrder is the Msg/CancelSellOrder request type. */
export interface MsgCancelSellOrderSDKType {
  seller: string;
  sell_order_id: bigint;
}
/** MsgCancelSellOrder is the Msg/CancelSellOrder response type. */
export interface MsgCancelSellOrderResponse {}
/** MsgCancelSellOrder is the Msg/CancelSellOrder response type. */
export interface MsgCancelSellOrderResponseSDKType {}
/** MsgBuyDirect is the Msg/BuyDirect request type. */
export interface MsgBuyDirect {
  /** buyer is the address of the credit buyer. */
  buyer: string;
  /** orders is a list of orders for ecocredits. */
  orders: MsgBuyDirect_Order[];
}
/** MsgBuyDirect is the Msg/BuyDirect request type. */
export interface MsgBuyDirectSDKType {
  buyer: string;
  orders: MsgBuyDirect_OrderSDKType[];
}
/** Order contains the information needed to purchase an ecocredit. */
export interface MsgBuyDirect_Order {
  /**
   * sell_order_id is the sell order ID against which the buyer is trying
   * to buy.
   */
  sellOrderId: bigint;
  /** quantity is the quantity of credits to buy. */
  quantity: string;
  /** bid_price is the price the buyer is willing to pay per credit. */
  bidPrice: Coin;
  /**
   * disable_auto_retire allows auto-retirement to be disabled. If it is set
   * to true the credits will not auto-retire and can be resold assuming that
   * the corresponding sell order has auto-retirement disabled. If the sell
   * order hasn't disabled auto-retirement and the buy order tries to disable
   * it, that buy order will fail.
   */
  disableAutoRetire: boolean;
  /**
   * retirement_jurisdiction is the optional retirement jurisdiction for the
   * credits which will be used only if disable_auto_retire is false.
   */
  retirementJurisdiction: string;
}
/** Order contains the information needed to purchase an ecocredit. */
export interface MsgBuyDirect_OrderSDKType {
  sell_order_id: bigint;
  quantity: string;
  bid_price: CoinSDKType;
  disable_auto_retire: boolean;
  retirement_jurisdiction: string;
}
/** MsgBuyDirectResponse is the Msg/BuyDirect response type. */
export interface MsgBuyDirectResponse {}
/** MsgBuyDirectResponse is the Msg/BuyDirect response type. */
export interface MsgBuyDirectResponseSDKType {}
function createBaseMsgSell(): MsgSell {
  return {
    owner: "",
    orders: []
  };
}
export const MsgSell = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgSell",
  encode(message: MsgSell, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    for (const v of message.orders) {
      MsgSell_Order.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSell {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSell();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.orders.push(MsgSell_Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSell>): MsgSell {
    const message = createBaseMsgSell();
    message.owner = object.owner ?? "";
    message.orders = object.orders?.map(e => MsgSell_Order.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgSellAmino): MsgSell {
    return {
      owner: object.owner,
      orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => MsgSell_Order.fromAmino(e)) : []
    };
  },
  toAmino(message: MsgSell): MsgSellAmino {
    const obj: any = {};
    obj.owner = message.owner;
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? MsgSell_Order.toAmino(e) : undefined);
    } else {
      obj.orders = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgSellAminoMsg): MsgSell {
    return MsgSell.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSellProtoMsg): MsgSell {
    return MsgSell.decode(message.value);
  },
  toProto(message: MsgSell): Uint8Array {
    return MsgSell.encode(message).finish();
  },
  toProtoMsg(message: MsgSell): MsgSellProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgSell",
      value: MsgSell.encode(message).finish()
    };
  }
};
function createBaseMsgSell_Order(): MsgSell_Order {
  return {
    batchDenom: "",
    quantity: "",
    askPrice: Coin.fromPartial({}),
    disableAutoRetire: false,
    expiration: new Date()
  };
}
export const MsgSell_Order = {
  typeUrl: "/regen.ecocredit.marketplace.v1.Order",
  encode(message: MsgSell_Order, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    if (message.quantity !== "") {
      writer.uint32(18).string(message.quantity);
    }
    if (message.askPrice !== undefined) {
      Coin.encode(message.askPrice, writer.uint32(26).fork()).ldelim();
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(32).bool(message.disableAutoRetire);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSell_Order {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSell_Order();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        case 2:
          message.quantity = reader.string();
          break;
        case 3:
          message.askPrice = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.disableAutoRetire = reader.bool();
          break;
        case 5:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSell_Order>): MsgSell_Order {
    const message = createBaseMsgSell_Order();
    message.batchDenom = object.batchDenom ?? "";
    message.quantity = object.quantity ?? "";
    message.askPrice = object.askPrice !== undefined && object.askPrice !== null ? Coin.fromPartial(object.askPrice) : undefined;
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.expiration = object.expiration ?? undefined;
    return message;
  },
  fromAmino(object: MsgSell_OrderAmino): MsgSell_Order {
    return {
      batchDenom: object.batch_denom,
      quantity: object.quantity,
      askPrice: object?.ask_price ? Coin.fromAmino(object.ask_price) : undefined,
      disableAutoRetire: object.disable_auto_retire,
      expiration: object.expiration
    };
  },
  toAmino(message: MsgSell_Order): MsgSell_OrderAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    obj.quantity = message.quantity;
    obj.ask_price = message.askPrice ? Coin.toAmino(message.askPrice) : undefined;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.expiration = message.expiration;
    return obj;
  },
  fromAminoMsg(object: MsgSell_OrderAminoMsg): MsgSell_Order {
    return MsgSell_Order.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSell_OrderProtoMsg): MsgSell_Order {
    return MsgSell_Order.decode(message.value);
  },
  toProto(message: MsgSell_Order): Uint8Array {
    return MsgSell_Order.encode(message).finish();
  },
  toProtoMsg(message: MsgSell_Order): MsgSell_OrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.Order",
      value: MsgSell_Order.encode(message).finish()
    };
  }
};
function createBaseMsgSellResponse(): MsgSellResponse {
  return {
    sellOrderIds: []
  };
}
export const MsgSellResponse = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgSellResponse",
  encode(message: MsgSellResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.sellOrderIds) {
      writer.uint64(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgSellResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSellResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.sellOrderIds.push(reader.uint64());
            }
          } else {
            message.sellOrderIds.push(reader.uint64());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgSellResponse>): MsgSellResponse {
    const message = createBaseMsgSellResponse();
    message.sellOrderIds = object.sellOrderIds?.map(e => BigInt(e.toString())) || [];
    return message;
  },
  fromAmino(object: MsgSellResponseAmino): MsgSellResponse {
    return {
      sellOrderIds: Array.isArray(object?.sell_order_ids) ? object.sell_order_ids.map((e: any) => BigInt(e)) : []
    };
  },
  toAmino(message: MsgSellResponse): MsgSellResponseAmino {
    const obj: any = {};
    if (message.sellOrderIds) {
      obj.sell_order_ids = message.sellOrderIds.map(e => e.toString());
    } else {
      obj.sell_order_ids = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgSellResponseAminoMsg): MsgSellResponse {
    return MsgSellResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgSellResponseProtoMsg): MsgSellResponse {
    return MsgSellResponse.decode(message.value);
  },
  toProto(message: MsgSellResponse): Uint8Array {
    return MsgSellResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgSellResponse): MsgSellResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgSellResponse",
      value: MsgSellResponse.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSellOrders(): MsgUpdateSellOrders {
  return {
    owner: "",
    updates: []
  };
}
export const MsgUpdateSellOrders = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders",
  encode(message: MsgUpdateSellOrders, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    for (const v of message.updates) {
      MsgUpdateSellOrders_Update.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSellOrders {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSellOrders();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.updates.push(MsgUpdateSellOrders_Update.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateSellOrders>): MsgUpdateSellOrders {
    const message = createBaseMsgUpdateSellOrders();
    message.owner = object.owner ?? "";
    message.updates = object.updates?.map(e => MsgUpdateSellOrders_Update.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgUpdateSellOrdersAmino): MsgUpdateSellOrders {
    return {
      owner: object.owner,
      updates: Array.isArray(object?.updates) ? object.updates.map((e: any) => MsgUpdateSellOrders_Update.fromAmino(e)) : []
    };
  },
  toAmino(message: MsgUpdateSellOrders): MsgUpdateSellOrdersAmino {
    const obj: any = {};
    obj.owner = message.owner;
    if (message.updates) {
      obj.updates = message.updates.map(e => e ? MsgUpdateSellOrders_Update.toAmino(e) : undefined);
    } else {
      obj.updates = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSellOrdersAminoMsg): MsgUpdateSellOrders {
    return MsgUpdateSellOrders.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSellOrdersProtoMsg): MsgUpdateSellOrders {
    return MsgUpdateSellOrders.decode(message.value);
  },
  toProto(message: MsgUpdateSellOrders): Uint8Array {
    return MsgUpdateSellOrders.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSellOrders): MsgUpdateSellOrdersProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders",
      value: MsgUpdateSellOrders.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSellOrders_Update(): MsgUpdateSellOrders_Update {
  return {
    sellOrderId: BigInt(0),
    newQuantity: "",
    newAskPrice: Coin.fromPartial({}),
    disableAutoRetire: false,
    newExpiration: new Date()
  };
}
export const MsgUpdateSellOrders_Update = {
  typeUrl: "/regen.ecocredit.marketplace.v1.Update",
  encode(message: MsgUpdateSellOrders_Update, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sellOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.sellOrderId);
    }
    if (message.newQuantity !== "") {
      writer.uint32(18).string(message.newQuantity);
    }
    if (message.newAskPrice !== undefined) {
      Coin.encode(message.newAskPrice, writer.uint32(26).fork()).ldelim();
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(32).bool(message.disableAutoRetire);
    }
    if (message.newExpiration !== undefined) {
      Timestamp.encode(toTimestamp(message.newExpiration), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSellOrders_Update {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSellOrders_Update();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sellOrderId = reader.uint64();
          break;
        case 2:
          message.newQuantity = reader.string();
          break;
        case 3:
          message.newAskPrice = Coin.decode(reader, reader.uint32());
          break;
        case 4:
          message.disableAutoRetire = reader.bool();
          break;
        case 5:
          message.newExpiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgUpdateSellOrders_Update>): MsgUpdateSellOrders_Update {
    const message = createBaseMsgUpdateSellOrders_Update();
    message.sellOrderId = object.sellOrderId !== undefined && object.sellOrderId !== null ? BigInt(object.sellOrderId.toString()) : BigInt(0);
    message.newQuantity = object.newQuantity ?? "";
    message.newAskPrice = object.newAskPrice !== undefined && object.newAskPrice !== null ? Coin.fromPartial(object.newAskPrice) : undefined;
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.newExpiration = object.newExpiration ?? undefined;
    return message;
  },
  fromAmino(object: MsgUpdateSellOrders_UpdateAmino): MsgUpdateSellOrders_Update {
    return {
      sellOrderId: BigInt(object.sell_order_id),
      newQuantity: object.new_quantity,
      newAskPrice: object?.new_ask_price ? Coin.fromAmino(object.new_ask_price) : undefined,
      disableAutoRetire: object.disable_auto_retire,
      newExpiration: object.new_expiration
    };
  },
  toAmino(message: MsgUpdateSellOrders_Update): MsgUpdateSellOrders_UpdateAmino {
    const obj: any = {};
    obj.sell_order_id = message.sellOrderId ? message.sellOrderId.toString() : undefined;
    obj.new_quantity = message.newQuantity;
    obj.new_ask_price = message.newAskPrice ? Coin.toAmino(message.newAskPrice) : undefined;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.new_expiration = message.newExpiration;
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSellOrders_UpdateAminoMsg): MsgUpdateSellOrders_Update {
    return MsgUpdateSellOrders_Update.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSellOrders_UpdateProtoMsg): MsgUpdateSellOrders_Update {
    return MsgUpdateSellOrders_Update.decode(message.value);
  },
  toProto(message: MsgUpdateSellOrders_Update): Uint8Array {
    return MsgUpdateSellOrders_Update.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSellOrders_Update): MsgUpdateSellOrders_UpdateProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.Update",
      value: MsgUpdateSellOrders_Update.encode(message).finish()
    };
  }
};
function createBaseMsgUpdateSellOrdersResponse(): MsgUpdateSellOrdersResponse {
  return {};
}
export const MsgUpdateSellOrdersResponse = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrdersResponse",
  encode(_: MsgUpdateSellOrdersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgUpdateSellOrdersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateSellOrdersResponse();
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
  fromPartial(_: Partial<MsgUpdateSellOrdersResponse>): MsgUpdateSellOrdersResponse {
    const message = createBaseMsgUpdateSellOrdersResponse();
    return message;
  },
  fromAmino(_: MsgUpdateSellOrdersResponseAmino): MsgUpdateSellOrdersResponse {
    return {};
  },
  toAmino(_: MsgUpdateSellOrdersResponse): MsgUpdateSellOrdersResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgUpdateSellOrdersResponseAminoMsg): MsgUpdateSellOrdersResponse {
    return MsgUpdateSellOrdersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgUpdateSellOrdersResponseProtoMsg): MsgUpdateSellOrdersResponse {
    return MsgUpdateSellOrdersResponse.decode(message.value);
  },
  toProto(message: MsgUpdateSellOrdersResponse): Uint8Array {
    return MsgUpdateSellOrdersResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgUpdateSellOrdersResponse): MsgUpdateSellOrdersResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrdersResponse",
      value: MsgUpdateSellOrdersResponse.encode(message).finish()
    };
  }
};
function createBaseMsgCancelSellOrder(): MsgCancelSellOrder {
  return {
    seller: "",
    sellOrderId: BigInt(0)
  };
}
export const MsgCancelSellOrder = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder",
  encode(message: MsgCancelSellOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.seller !== "") {
      writer.uint32(10).string(message.seller);
    }
    if (message.sellOrderId !== BigInt(0)) {
      writer.uint32(16).uint64(message.sellOrderId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelSellOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seller = reader.string();
          break;
        case 2:
          message.sellOrderId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCancelSellOrder>): MsgCancelSellOrder {
    const message = createBaseMsgCancelSellOrder();
    message.seller = object.seller ?? "";
    message.sellOrderId = object.sellOrderId !== undefined && object.sellOrderId !== null ? BigInt(object.sellOrderId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: MsgCancelSellOrderAmino): MsgCancelSellOrder {
    return {
      seller: object.seller,
      sellOrderId: BigInt(object.sell_order_id)
    };
  },
  toAmino(message: MsgCancelSellOrder): MsgCancelSellOrderAmino {
    const obj: any = {};
    obj.seller = message.seller;
    obj.sell_order_id = message.sellOrderId ? message.sellOrderId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCancelSellOrderAminoMsg): MsgCancelSellOrder {
    return MsgCancelSellOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelSellOrderProtoMsg): MsgCancelSellOrder {
    return MsgCancelSellOrder.decode(message.value);
  },
  toProto(message: MsgCancelSellOrder): Uint8Array {
    return MsgCancelSellOrder.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelSellOrder): MsgCancelSellOrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder",
      value: MsgCancelSellOrder.encode(message).finish()
    };
  }
};
function createBaseMsgCancelSellOrderResponse(): MsgCancelSellOrderResponse {
  return {};
}
export const MsgCancelSellOrderResponse = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrderResponse",
  encode(_: MsgCancelSellOrderResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCancelSellOrderResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCancelSellOrderResponse();
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
  fromPartial(_: Partial<MsgCancelSellOrderResponse>): MsgCancelSellOrderResponse {
    const message = createBaseMsgCancelSellOrderResponse();
    return message;
  },
  fromAmino(_: MsgCancelSellOrderResponseAmino): MsgCancelSellOrderResponse {
    return {};
  },
  toAmino(_: MsgCancelSellOrderResponse): MsgCancelSellOrderResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCancelSellOrderResponseAminoMsg): MsgCancelSellOrderResponse {
    return MsgCancelSellOrderResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCancelSellOrderResponseProtoMsg): MsgCancelSellOrderResponse {
    return MsgCancelSellOrderResponse.decode(message.value);
  },
  toProto(message: MsgCancelSellOrderResponse): Uint8Array {
    return MsgCancelSellOrderResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCancelSellOrderResponse): MsgCancelSellOrderResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrderResponse",
      value: MsgCancelSellOrderResponse.encode(message).finish()
    };
  }
};
function createBaseMsgBuyDirect(): MsgBuyDirect {
  return {
    buyer: "",
    orders: []
  };
}
export const MsgBuyDirect = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgBuyDirect",
  encode(message: MsgBuyDirect, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyer !== "") {
      writer.uint32(10).string(message.buyer);
    }
    for (const v of message.orders) {
      MsgBuyDirect_Order.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBuyDirect {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyDirect();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyer = reader.string();
          break;
        case 2:
          message.orders.push(MsgBuyDirect_Order.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBuyDirect>): MsgBuyDirect {
    const message = createBaseMsgBuyDirect();
    message.buyer = object.buyer ?? "";
    message.orders = object.orders?.map(e => MsgBuyDirect_Order.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: MsgBuyDirectAmino): MsgBuyDirect {
    return {
      buyer: object.buyer,
      orders: Array.isArray(object?.orders) ? object.orders.map((e: any) => MsgBuyDirect_Order.fromAmino(e)) : []
    };
  },
  toAmino(message: MsgBuyDirect): MsgBuyDirectAmino {
    const obj: any = {};
    obj.buyer = message.buyer;
    if (message.orders) {
      obj.orders = message.orders.map(e => e ? MsgBuyDirect_Order.toAmino(e) : undefined);
    } else {
      obj.orders = [];
    }
    return obj;
  },
  fromAminoMsg(object: MsgBuyDirectAminoMsg): MsgBuyDirect {
    return MsgBuyDirect.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBuyDirectProtoMsg): MsgBuyDirect {
    return MsgBuyDirect.decode(message.value);
  },
  toProto(message: MsgBuyDirect): Uint8Array {
    return MsgBuyDirect.encode(message).finish();
  },
  toProtoMsg(message: MsgBuyDirect): MsgBuyDirectProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgBuyDirect",
      value: MsgBuyDirect.encode(message).finish()
    };
  }
};
function createBaseMsgBuyDirect_Order(): MsgBuyDirect_Order {
  return {
    sellOrderId: BigInt(0),
    quantity: "",
    bidPrice: Coin.fromPartial({}),
    disableAutoRetire: false,
    retirementJurisdiction: ""
  };
}
export const MsgBuyDirect_Order = {
  typeUrl: "/regen.ecocredit.marketplace.v1.Order",
  encode(message: MsgBuyDirect_Order, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sellOrderId !== BigInt(0)) {
      writer.uint32(16).uint64(message.sellOrderId);
    }
    if (message.quantity !== "") {
      writer.uint32(26).string(message.quantity);
    }
    if (message.bidPrice !== undefined) {
      Coin.encode(message.bidPrice, writer.uint32(34).fork()).ldelim();
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(40).bool(message.disableAutoRetire);
    }
    if (message.retirementJurisdiction !== "") {
      writer.uint32(50).string(message.retirementJurisdiction);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBuyDirect_Order {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyDirect_Order();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.sellOrderId = reader.uint64();
          break;
        case 3:
          message.quantity = reader.string();
          break;
        case 4:
          message.bidPrice = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.disableAutoRetire = reader.bool();
          break;
        case 6:
          message.retirementJurisdiction = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgBuyDirect_Order>): MsgBuyDirect_Order {
    const message = createBaseMsgBuyDirect_Order();
    message.sellOrderId = object.sellOrderId !== undefined && object.sellOrderId !== null ? BigInt(object.sellOrderId.toString()) : BigInt(0);
    message.quantity = object.quantity ?? "";
    message.bidPrice = object.bidPrice !== undefined && object.bidPrice !== null ? Coin.fromPartial(object.bidPrice) : undefined;
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.retirementJurisdiction = object.retirementJurisdiction ?? "";
    return message;
  },
  fromAmino(object: MsgBuyDirect_OrderAmino): MsgBuyDirect_Order {
    return {
      sellOrderId: BigInt(object.sell_order_id),
      quantity: object.quantity,
      bidPrice: object?.bid_price ? Coin.fromAmino(object.bid_price) : undefined,
      disableAutoRetire: object.disable_auto_retire,
      retirementJurisdiction: object.retirement_jurisdiction
    };
  },
  toAmino(message: MsgBuyDirect_Order): MsgBuyDirect_OrderAmino {
    const obj: any = {};
    obj.sell_order_id = message.sellOrderId ? message.sellOrderId.toString() : undefined;
    obj.quantity = message.quantity;
    obj.bid_price = message.bidPrice ? Coin.toAmino(message.bidPrice) : undefined;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.retirement_jurisdiction = message.retirementJurisdiction;
    return obj;
  },
  fromAminoMsg(object: MsgBuyDirect_OrderAminoMsg): MsgBuyDirect_Order {
    return MsgBuyDirect_Order.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBuyDirect_OrderProtoMsg): MsgBuyDirect_Order {
    return MsgBuyDirect_Order.decode(message.value);
  },
  toProto(message: MsgBuyDirect_Order): Uint8Array {
    return MsgBuyDirect_Order.encode(message).finish();
  },
  toProtoMsg(message: MsgBuyDirect_Order): MsgBuyDirect_OrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.Order",
      value: MsgBuyDirect_Order.encode(message).finish()
    };
  }
};
function createBaseMsgBuyDirectResponse(): MsgBuyDirectResponse {
  return {};
}
export const MsgBuyDirectResponse = {
  typeUrl: "/regen.ecocredit.marketplace.v1.MsgBuyDirectResponse",
  encode(_: MsgBuyDirectResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgBuyDirectResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBuyDirectResponse();
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
  fromPartial(_: Partial<MsgBuyDirectResponse>): MsgBuyDirectResponse {
    const message = createBaseMsgBuyDirectResponse();
    return message;
  },
  fromAmino(_: MsgBuyDirectResponseAmino): MsgBuyDirectResponse {
    return {};
  },
  toAmino(_: MsgBuyDirectResponse): MsgBuyDirectResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgBuyDirectResponseAminoMsg): MsgBuyDirectResponse {
    return MsgBuyDirectResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgBuyDirectResponseProtoMsg): MsgBuyDirectResponse {
    return MsgBuyDirectResponse.decode(message.value);
  },
  toProto(message: MsgBuyDirectResponse): Uint8Array {
    return MsgBuyDirectResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgBuyDirectResponse): MsgBuyDirectResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.MsgBuyDirectResponse",
      value: MsgBuyDirectResponse.encode(message).finish()
    };
  }
};