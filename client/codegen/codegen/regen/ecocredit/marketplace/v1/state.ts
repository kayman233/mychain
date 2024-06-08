import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/** SellOrder represents the information for a sell order. */
export interface SellOrder {
  /** id is the unique ID of sell order. */
  id: bigint;
  /** seller is the bytes address of the owner of the credits being sold. */
  seller: Uint8Array;
  /** batch_id is ID of the credit batch being sold. */
  batchId: bigint;
  /** quantity is the decimal quantity of credits being sold. */
  quantity: string;
  /**
   * market_id is the market in which this sell order exists and specifies
   * the bank_denom that ask_price corresponds to.
   */
  marketId: bigint;
  /**
   * ask_price is the integer price (encoded as a string) the seller is asking
   * for each unit of the batch_denom. Each credit unit of the batch will be
   * sold for at least the ask_price or more.
   */
  askPrice: string;
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
  /**
   * maker indicates that this is a maker order, meaning that when it hit
   * the order book, there were no matching buy orders.
   */
  maker: boolean;
}
/** SellOrder represents the information for a sell order. */
export interface SellOrderSDKType {
  id: bigint;
  seller: Uint8Array;
  batch_id: bigint;
  quantity: string;
  market_id: bigint;
  ask_price: string;
  disable_auto_retire: boolean;
  expiration: Date;
  maker: boolean;
}
/** AllowedDenom represents the information for an allowed ask/bid denom. */
export interface AllowedDenom {
  /** denom is the bank denom to allow (ex. ibc/GLKHDSG423SGS) */
  bankDenom: string;
  /**
   * display_denom is the denom to display to the user and is informational.
   * Because the denom is likely an IBC denom, this should be chosen by
   * governance to represent the consensus trusted name of the denom.
   */
  displayDenom: string;
  /**
   * exponent is the exponent that relates the denom to the display_denom and is
   * informational
   */
  exponent: number;
}
/** AllowedDenom represents the information for an allowed ask/bid denom. */
export interface AllowedDenomSDKType {
  bank_denom: string;
  display_denom: string;
  exponent: number;
}
/**
 * Market describes a distinctly processed market between a credit type and
 * allowed bank denom. Each market has its own precision in the order book
 * and is processed independently of other markets. Governance must enable
 * markets one by one. Every additional enabled market potentially adds more
 * processing overhead to the blockchain and potentially weakens liquidity in
 * competing markets. For instance, enabling side by side USD/Carbon and
 * EUR/Carbon markets may have the end result that each market individually has
 * less liquidity and longer settlement times. Such decisions should be taken
 * with care.
 */
export interface Market {
  /** id is the unique ID of the market. */
  id: bigint;
  /** credit_type is the abbreviation of the credit type. */
  creditType: string;
  /** bank_denom is an allowed bank denom. */
  bankDenom: string;
  /**
   * precision_modifier is an optional modifier used to convert arbitrary
   * precision integer bank amounts to uint32 values used for sorting in the
   * order book. Given an arbitrary precision integer x, its uint32 conversion
   * will be x / 10^precision_modifier using round half away from zero
   * rounding.
   * 
   * uint32 values range from 0 to 4,294,967,295.
   * This allows for a full 9 digits of precision. In most real world markets
   * this amount of precision is sufficient and most common downside -
   * that some orders with very miniscule price differences may be ordered
   * equivalently (because of rounding) - is acceptable.
   * Note that this rounding will not affect settlement price which will
   * always be done exactly.
   * 
   * Given a USD stable coin with 6 decimal digits, a precision_modifier
   * of 0 is probably acceptable as long as credits are always less than
   * $4,294/unit. With precision down to $0.001 (a precision_modifier of 3
   * in this case), prices can rise up to $4,294,000/unit. Either scenario
   * is probably quite acceptable given that carbon prices are unlikely to
   * rise above $1000/ton any time in the near future.
   * 
   * If credit prices, exceed the maximum range of uint32 with this
   * precision_modifier, orders with high prices will fail and governance
   * will need to adjust precision_modifier to allow for higher prices in
   * exchange for less precision at the lower end.
   */
  precisionModifier: number;
}
/**
 * Market describes a distinctly processed market between a credit type and
 * allowed bank denom. Each market has its own precision in the order book
 * and is processed independently of other markets. Governance must enable
 * markets one by one. Every additional enabled market potentially adds more
 * processing overhead to the blockchain and potentially weakens liquidity in
 * competing markets. For instance, enabling side by side USD/Carbon and
 * EUR/Carbon markets may have the end result that each market individually has
 * less liquidity and longer settlement times. Such decisions should be taken
 * with care.
 */
export interface MarketSDKType {
  id: bigint;
  credit_type: string;
  bank_denom: string;
  precision_modifier: number;
}
function createBaseSellOrder(): SellOrder {
  return {
    id: BigInt(0),
    seller: new Uint8Array(),
    batchId: BigInt(0),
    quantity: "",
    marketId: BigInt(0),
    askPrice: "",
    disableAutoRetire: false,
    expiration: new Date(),
    maker: false
  };
}
export const SellOrder = {
  typeUrl: "/regen.ecocredit.marketplace.v1.SellOrder",
  encode(message: SellOrder, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.seller.length !== 0) {
      writer.uint32(18).bytes(message.seller);
    }
    if (message.batchId !== BigInt(0)) {
      writer.uint32(24).uint64(message.batchId);
    }
    if (message.quantity !== "") {
      writer.uint32(34).string(message.quantity);
    }
    if (message.marketId !== BigInt(0)) {
      writer.uint32(40).uint64(message.marketId);
    }
    if (message.askPrice !== "") {
      writer.uint32(50).string(message.askPrice);
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(56).bool(message.disableAutoRetire);
    }
    if (message.expiration !== undefined) {
      Timestamp.encode(toTimestamp(message.expiration), writer.uint32(74).fork()).ldelim();
    }
    if (message.maker === true) {
      writer.uint32(80).bool(message.maker);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): SellOrder {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSellOrder();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.seller = reader.bytes();
          break;
        case 3:
          message.batchId = reader.uint64();
          break;
        case 4:
          message.quantity = reader.string();
          break;
        case 5:
          message.marketId = reader.uint64();
          break;
        case 6:
          message.askPrice = reader.string();
          break;
        case 7:
          message.disableAutoRetire = reader.bool();
          break;
        case 9:
          message.expiration = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 10:
          message.maker = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<SellOrder>): SellOrder {
    const message = createBaseSellOrder();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.seller = object.seller ?? new Uint8Array();
    message.batchId = object.batchId !== undefined && object.batchId !== null ? BigInt(object.batchId.toString()) : BigInt(0);
    message.quantity = object.quantity ?? "";
    message.marketId = object.marketId !== undefined && object.marketId !== null ? BigInt(object.marketId.toString()) : BigInt(0);
    message.askPrice = object.askPrice ?? "";
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.expiration = object.expiration ?? undefined;
    message.maker = object.maker ?? false;
    return message;
  },
  fromAmino(object: SellOrderAmino): SellOrder {
    return {
      id: BigInt(object.id),
      seller: object.seller,
      batchId: BigInt(object.batch_id),
      quantity: object.quantity,
      marketId: BigInt(object.market_id),
      askPrice: object.ask_price,
      disableAutoRetire: object.disable_auto_retire,
      expiration: object.expiration,
      maker: object.maker
    };
  },
  toAmino(message: SellOrder): SellOrderAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.seller = message.seller;
    obj.batch_id = message.batchId ? message.batchId.toString() : undefined;
    obj.quantity = message.quantity;
    obj.market_id = message.marketId ? message.marketId.toString() : undefined;
    obj.ask_price = message.askPrice;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.expiration = message.expiration;
    obj.maker = message.maker;
    return obj;
  },
  fromAminoMsg(object: SellOrderAminoMsg): SellOrder {
    return SellOrder.fromAmino(object.value);
  },
  fromProtoMsg(message: SellOrderProtoMsg): SellOrder {
    return SellOrder.decode(message.value);
  },
  toProto(message: SellOrder): Uint8Array {
    return SellOrder.encode(message).finish();
  },
  toProtoMsg(message: SellOrder): SellOrderProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.SellOrder",
      value: SellOrder.encode(message).finish()
    };
  }
};
function createBaseAllowedDenom(): AllowedDenom {
  return {
    bankDenom: "",
    displayDenom: "",
    exponent: 0
  };
}
export const AllowedDenom = {
  typeUrl: "/regen.ecocredit.marketplace.v1.AllowedDenom",
  encode(message: AllowedDenom, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.bankDenom !== "") {
      writer.uint32(10).string(message.bankDenom);
    }
    if (message.displayDenom !== "") {
      writer.uint32(18).string(message.displayDenom);
    }
    if (message.exponent !== 0) {
      writer.uint32(24).uint32(message.exponent);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AllowedDenom {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllowedDenom();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bankDenom = reader.string();
          break;
        case 2:
          message.displayDenom = reader.string();
          break;
        case 3:
          message.exponent = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AllowedDenom>): AllowedDenom {
    const message = createBaseAllowedDenom();
    message.bankDenom = object.bankDenom ?? "";
    message.displayDenom = object.displayDenom ?? "";
    message.exponent = object.exponent ?? 0;
    return message;
  },
  fromAmino(object: AllowedDenomAmino): AllowedDenom {
    return {
      bankDenom: object.bank_denom,
      displayDenom: object.display_denom,
      exponent: object.exponent
    };
  },
  toAmino(message: AllowedDenom): AllowedDenomAmino {
    const obj: any = {};
    obj.bank_denom = message.bankDenom;
    obj.display_denom = message.displayDenom;
    obj.exponent = message.exponent;
    return obj;
  },
  fromAminoMsg(object: AllowedDenomAminoMsg): AllowedDenom {
    return AllowedDenom.fromAmino(object.value);
  },
  fromProtoMsg(message: AllowedDenomProtoMsg): AllowedDenom {
    return AllowedDenom.decode(message.value);
  },
  toProto(message: AllowedDenom): Uint8Array {
    return AllowedDenom.encode(message).finish();
  },
  toProtoMsg(message: AllowedDenom): AllowedDenomProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.AllowedDenom",
      value: AllowedDenom.encode(message).finish()
    };
  }
};
function createBaseMarket(): Market {
  return {
    id: BigInt(0),
    creditType: "",
    bankDenom: "",
    precisionModifier: 0
  };
}
export const Market = {
  typeUrl: "/regen.ecocredit.marketplace.v1.Market",
  encode(message: Market, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.creditType !== "") {
      writer.uint32(18).string(message.creditType);
    }
    if (message.bankDenom !== "") {
      writer.uint32(26).string(message.bankDenom);
    }
    if (message.precisionModifier !== 0) {
      writer.uint32(32).uint32(message.precisionModifier);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Market {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMarket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.creditType = reader.string();
          break;
        case 3:
          message.bankDenom = reader.string();
          break;
        case 4:
          message.precisionModifier = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Market>): Market {
    const message = createBaseMarket();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.creditType = object.creditType ?? "";
    message.bankDenom = object.bankDenom ?? "";
    message.precisionModifier = object.precisionModifier ?? 0;
    return message;
  },
  fromAmino(object: MarketAmino): Market {
    return {
      id: BigInt(object.id),
      creditType: object.credit_type,
      bankDenom: object.bank_denom,
      precisionModifier: object.precision_modifier
    };
  },
  toAmino(message: Market): MarketAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.credit_type = message.creditType;
    obj.bank_denom = message.bankDenom;
    obj.precision_modifier = message.precisionModifier;
    return obj;
  },
  fromAminoMsg(object: MarketAminoMsg): Market {
    return Market.fromAmino(object.value);
  },
  fromProtoMsg(message: MarketProtoMsg): Market {
    return Market.decode(message.value);
  },
  toProto(message: Market): Uint8Array {
    return Market.encode(message).finish();
  },
  toProtoMsg(message: Market): MarketProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.marketplace.v1.Market",
      value: Market.encode(message).finish()
    };
  }
};