import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/**
 * BuyOrderSellOrderMatch defines the data the FIFO/price-time-priority matching
 * algorithm used to actually match buy and sell orders.
 */
export interface BuyOrderSellOrderMatch {
  /** market_id defines the market within which this match exists. */
  marketId: bigint;
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** sell_order_id is the sell order ID. */
  sellOrderId: bigint;
  /**
   * bid_price_complement is the the complement (^ operator) of the bid price
   * encoded as a uint32 (which should have sufficient precision) - effectively
   * ~price * 10^exponent (usually 10^6). The complement is used so that bids can
   * be sorted high to low.
   */
  bidPriceComplement: number;
  /**
   * ask_price is the ask price encoded to a uint32. Ask prices are sorted low to
   * high.
   */
  askPrice: number;
}
/**
 * BuyOrderSellOrderMatch defines the data the FIFO/price-time-priority matching
 * algorithm used to actually match buy and sell orders.
 */
export interface BuyOrderSellOrderMatchSDKType {
  market_id: bigint;
  buy_order_id: bigint;
  sell_order_id: bigint;
  bid_price_complement: number;
  ask_price: number;
}
/** BuyOrderClassSelector indexes a buy order with class selector. */
export interface BuyOrderClassSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** class_id is the class ID. */
  classId: bigint;
  /** project_location is the project location in the selector's criteria. */
  projectLocation: string;
  /** min_start_date is the minimum start date in the selector's criteria. */
  minStartDate: Date;
  /** max_end_date is the maximum end date in the selector's criteria. */
  maxEndDate: Date;
}
/** BuyOrderClassSelector indexes a buy order with class selector. */
export interface BuyOrderClassSelectorSDKType {
  buy_order_id: bigint;
  class_id: bigint;
  project_location: string;
  min_start_date: Date;
  max_end_date: Date;
}
/** BuyOrderProjectSelector indexes a buy order with project selector. */
export interface BuyOrderProjectSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** project_id is the project ID. */
  projectId: bigint;
  /** min_start_date is the minimum start date in the selector's criteria. */
  minStartDate: Date;
  /** max_end_date is the maximum end date in the selector's criteria. */
  maxEndDate: Date;
}
/** BuyOrderProjectSelector indexes a buy order with project selector. */
export interface BuyOrderProjectSelectorSDKType {
  buy_order_id: bigint;
  project_id: bigint;
  min_start_date: Date;
  max_end_date: Date;
}
/** BuyOrderBatchSelector indexes a buy order with batch selector. */
export interface BuyOrderBatchSelector {
  /** buy_order_id is the buy order ID. */
  buyOrderId: bigint;
  /** batch_id is the batch ID. */
  batchId: bigint;
}
/** BuyOrderBatchSelector indexes a buy order with batch selector. */
export interface BuyOrderBatchSelectorSDKType {
  buy_order_id: bigint;
  batch_id: bigint;
}
function createBaseBuyOrderSellOrderMatch(): BuyOrderSellOrderMatch {
  return {
    marketId: BigInt(0),
    buyOrderId: BigInt(0),
    sellOrderId: BigInt(0),
    bidPriceComplement: 0,
    askPrice: 0
  };
}
export const BuyOrderSellOrderMatch = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch",
  encode(message: BuyOrderSellOrderMatch, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.marketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.marketId);
    }
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(16).uint64(message.buyOrderId);
    }
    if (message.sellOrderId !== BigInt(0)) {
      writer.uint32(24).uint64(message.sellOrderId);
    }
    if (message.bidPriceComplement !== 0) {
      writer.uint32(37).fixed32(message.bidPriceComplement);
    }
    if (message.askPrice !== 0) {
      writer.uint32(45).fixed32(message.askPrice);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BuyOrderSellOrderMatch {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderSellOrderMatch();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.marketId = reader.uint64();
          break;
        case 2:
          message.buyOrderId = reader.uint64();
          break;
        case 3:
          message.sellOrderId = reader.uint64();
          break;
        case 4:
          message.bidPriceComplement = reader.fixed32();
          break;
        case 5:
          message.askPrice = reader.fixed32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderSellOrderMatch>): BuyOrderSellOrderMatch {
    const message = createBaseBuyOrderSellOrderMatch();
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.sellOrderId = object.sellOrderId !== undefined && object.sellOrderId !== null ? BigInt(object.sellOrderId.toString()) : BigInt(0);
    message.bidPriceComplement = object.bidPriceComplement ?? 0;
    message.askPrice = object.askPrice ?? 0;
    return message;
  },
  fromAmino(object: BuyOrderSellOrderMatchAmino): BuyOrderSellOrderMatch {
    return {
      marketId: BigInt(object.market_id),
      buyOrderId: BigInt(object.buy_order_id),
      sellOrderId: BigInt(object.sell_order_id),
      bidPriceComplement: object.bid_price_complement,
      askPrice: object.ask_price
    };
  },
  toAmino(message: BuyOrderSellOrderMatch): BuyOrderSellOrderMatchAmino {
    const obj: any = {};
    obj.market_id = message.marketId ? message.marketId.toString() : undefined;
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.sell_order_id = message.sellOrderId ? message.sellOrderId.toString() : undefined;
    obj.bid_price_complement = message.bidPriceComplement;
    obj.ask_price = message.askPrice;
    return obj;
  },
  fromAminoMsg(object: BuyOrderSellOrderMatchAminoMsg): BuyOrderSellOrderMatch {
    return BuyOrderSellOrderMatch.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderSellOrderMatchProtoMsg): BuyOrderSellOrderMatch {
    return BuyOrderSellOrderMatch.decode(message.value);
  },
  toProto(message: BuyOrderSellOrderMatch): Uint8Array {
    return BuyOrderSellOrderMatch.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderSellOrderMatch): BuyOrderSellOrderMatchProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderSellOrderMatch",
      value: BuyOrderSellOrderMatch.encode(message).finish()
    };
  }
};
function createBaseBuyOrderClassSelector(): BuyOrderClassSelector {
  return {
    buyOrderId: BigInt(0),
    classId: BigInt(0),
    projectLocation: "",
    minStartDate: new Date(),
    maxEndDate: new Date()
  };
}
export const BuyOrderClassSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector",
  encode(message: BuyOrderClassSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.classId !== BigInt(0)) {
      writer.uint32(16).uint64(message.classId);
    }
    if (message.projectLocation !== "") {
      writer.uint32(26).string(message.projectLocation);
    }
    if (message.minStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.minStartDate), writer.uint32(34).fork()).ldelim();
    }
    if (message.maxEndDate !== undefined) {
      Timestamp.encode(toTimestamp(message.maxEndDate), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BuyOrderClassSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderClassSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.classId = reader.uint64();
          break;
        case 3:
          message.projectLocation = reader.string();
          break;
        case 4:
          message.minStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 5:
          message.maxEndDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderClassSelector>): BuyOrderClassSelector {
    const message = createBaseBuyOrderClassSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.classId = object.classId !== undefined && object.classId !== null ? BigInt(object.classId.toString()) : BigInt(0);
    message.projectLocation = object.projectLocation ?? "";
    message.minStartDate = object.minStartDate ?? undefined;
    message.maxEndDate = object.maxEndDate ?? undefined;
    return message;
  },
  fromAmino(object: BuyOrderClassSelectorAmino): BuyOrderClassSelector {
    return {
      buyOrderId: BigInt(object.buy_order_id),
      classId: BigInt(object.class_id),
      projectLocation: object.project_location,
      minStartDate: object.min_start_date,
      maxEndDate: object.max_end_date
    };
  },
  toAmino(message: BuyOrderClassSelector): BuyOrderClassSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.class_id = message.classId ? message.classId.toString() : undefined;
    obj.project_location = message.projectLocation;
    obj.min_start_date = message.minStartDate;
    obj.max_end_date = message.maxEndDate;
    return obj;
  },
  fromAminoMsg(object: BuyOrderClassSelectorAminoMsg): BuyOrderClassSelector {
    return BuyOrderClassSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderClassSelectorProtoMsg): BuyOrderClassSelector {
    return BuyOrderClassSelector.decode(message.value);
  },
  toProto(message: BuyOrderClassSelector): Uint8Array {
    return BuyOrderClassSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderClassSelector): BuyOrderClassSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderClassSelector",
      value: BuyOrderClassSelector.encode(message).finish()
    };
  }
};
function createBaseBuyOrderProjectSelector(): BuyOrderProjectSelector {
  return {
    buyOrderId: BigInt(0),
    projectId: BigInt(0),
    minStartDate: new Date(),
    maxEndDate: new Date()
  };
}
export const BuyOrderProjectSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector",
  encode(message: BuyOrderProjectSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.projectId !== BigInt(0)) {
      writer.uint32(16).uint64(message.projectId);
    }
    if (message.minStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.minStartDate), writer.uint32(26).fork()).ldelim();
    }
    if (message.maxEndDate !== undefined) {
      Timestamp.encode(toTimestamp(message.maxEndDate), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BuyOrderProjectSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderProjectSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.projectId = reader.uint64();
          break;
        case 3:
          message.minStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 4:
          message.maxEndDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderProjectSelector>): BuyOrderProjectSelector {
    const message = createBaseBuyOrderProjectSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.projectId = object.projectId !== undefined && object.projectId !== null ? BigInt(object.projectId.toString()) : BigInt(0);
    message.minStartDate = object.minStartDate ?? undefined;
    message.maxEndDate = object.maxEndDate ?? undefined;
    return message;
  },
  fromAmino(object: BuyOrderProjectSelectorAmino): BuyOrderProjectSelector {
    return {
      buyOrderId: BigInt(object.buy_order_id),
      projectId: BigInt(object.project_id),
      minStartDate: object.min_start_date,
      maxEndDate: object.max_end_date
    };
  },
  toAmino(message: BuyOrderProjectSelector): BuyOrderProjectSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.project_id = message.projectId ? message.projectId.toString() : undefined;
    obj.min_start_date = message.minStartDate;
    obj.max_end_date = message.maxEndDate;
    return obj;
  },
  fromAminoMsg(object: BuyOrderProjectSelectorAminoMsg): BuyOrderProjectSelector {
    return BuyOrderProjectSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderProjectSelectorProtoMsg): BuyOrderProjectSelector {
    return BuyOrderProjectSelector.decode(message.value);
  },
  toProto(message: BuyOrderProjectSelector): Uint8Array {
    return BuyOrderProjectSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderProjectSelector): BuyOrderProjectSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderProjectSelector",
      value: BuyOrderProjectSelector.encode(message).finish()
    };
  }
};
function createBaseBuyOrderBatchSelector(): BuyOrderBatchSelector {
  return {
    buyOrderId: BigInt(0),
    batchId: BigInt(0)
  };
}
export const BuyOrderBatchSelector = {
  typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector",
  encode(message: BuyOrderBatchSelector, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.buyOrderId !== BigInt(0)) {
      writer.uint32(8).uint64(message.buyOrderId);
    }
    if (message.batchId !== BigInt(0)) {
      writer.uint32(16).uint64(message.batchId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BuyOrderBatchSelector {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBuyOrderBatchSelector();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.buyOrderId = reader.uint64();
          break;
        case 2:
          message.batchId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BuyOrderBatchSelector>): BuyOrderBatchSelector {
    const message = createBaseBuyOrderBatchSelector();
    message.buyOrderId = object.buyOrderId !== undefined && object.buyOrderId !== null ? BigInt(object.buyOrderId.toString()) : BigInt(0);
    message.batchId = object.batchId !== undefined && object.batchId !== null ? BigInt(object.batchId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: BuyOrderBatchSelectorAmino): BuyOrderBatchSelector {
    return {
      buyOrderId: BigInt(object.buy_order_id),
      batchId: BigInt(object.batch_id)
    };
  },
  toAmino(message: BuyOrderBatchSelector): BuyOrderBatchSelectorAmino {
    const obj: any = {};
    obj.buy_order_id = message.buyOrderId ? message.buyOrderId.toString() : undefined;
    obj.batch_id = message.batchId ? message.batchId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: BuyOrderBatchSelectorAminoMsg): BuyOrderBatchSelector {
    return BuyOrderBatchSelector.fromAmino(object.value);
  },
  fromProtoMsg(message: BuyOrderBatchSelectorProtoMsg): BuyOrderBatchSelector {
    return BuyOrderBatchSelector.decode(message.value);
  },
  toProto(message: BuyOrderBatchSelector): Uint8Array {
    return BuyOrderBatchSelector.encode(message).finish();
  },
  toProtoMsg(message: BuyOrderBatchSelector): BuyOrderBatchSelectorProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.orderbook.v1alpha1.BuyOrderBatchSelector",
      value: BuyOrderBatchSelector.encode(message).finish()
    };
  }
};