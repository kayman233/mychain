import { DateCriteria, DateCriteriaSDKType } from "./types";
import { Timestamp } from "../../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/** Basket represents a basket in state. */
export interface Basket {
  /**
   * id is the uint64 ID of the basket. It is used internally for reducing
   * storage space.
   */
  id: bigint;
  /** basket_denom is the basket bank denom. */
  basketDenom: string;
  /**
   * name is the unique name of the basket specified in MsgCreate. Basket
   * names must be unique across all credit types and choices of exponent
   * above and beyond the uniqueness constraint on basket_denom.
   */
  name: string;
  /**
   * disable_auto_retire indicates whether or not the credits will be retired
   * upon withdraw from the basket.
   */
  disableAutoRetire: boolean;
  /**
   * credit_type_abbrev is the abbreviation of the credit type this basket is
   * able to hold.
   */
  creditTypeAbbrev: string;
  /** date_criteria is the date criteria for batches admitted to the basket. */
  dateCriteria: DateCriteria;
  /** exponent is the exponent for converting credits to/from basket tokens. */
  exponent: number;
  /**
   * curator is the address of the basket curator who is able to change certain
   * basket settings.
   * 
   * Since Revision 1
   */
  curator: Uint8Array;
}
/** Basket represents a basket in state. */
export interface BasketSDKType {
  id: bigint;
  basket_denom: string;
  name: string;
  disable_auto_retire: boolean;
  credit_type_abbrev: string;
  date_criteria: DateCriteriaSDKType;
  exponent: number;
  curator: Uint8Array;
}
/** BasketClass describes a credit class that can be deposited in a basket. */
export interface BasketClass {
  /** basket_id is the ID of the basket */
  basketId: bigint;
  /**
   * class_id is the id of the credit class that is allowed to be deposited in
   * the basket
   */
  classId: string;
}
/** BasketClass describes a credit class that can be deposited in a basket. */
export interface BasketClassSDKType {
  basket_id: bigint;
  class_id: string;
}
/** BasketBalance stores the amount of credits from a batch in a basket */
export interface BasketBalance {
  /** basket_id is the ID of the basket */
  basketId: bigint;
  /** batch_denom is the denom of the credit batch */
  batchDenom: string;
  /** balance is the amount of ecocredits held in the basket */
  balance: string;
  /**
   * batch_start_date is the start date of the batch. This field is used
   * to create an index which is used to remove the oldest credits first.
   */
  batchStartDate: Date;
}
/** BasketBalance stores the amount of credits from a batch in a basket */
export interface BasketBalanceSDKType {
  basket_id: bigint;
  batch_denom: string;
  balance: string;
  batch_start_date: Date;
}
function createBaseBasket(): Basket {
  return {
    id: BigInt(0),
    basketDenom: "",
    name: "",
    disableAutoRetire: false,
    creditTypeAbbrev: "",
    dateCriteria: DateCriteria.fromPartial({}),
    exponent: 0,
    curator: new Uint8Array()
  };
}
export const Basket = {
  typeUrl: "/regen.ecocredit.basket.v1.Basket",
  encode(message: Basket, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.basketDenom !== "") {
      writer.uint32(18).string(message.basketDenom);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.disableAutoRetire === true) {
      writer.uint32(32).bool(message.disableAutoRetire);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(42).string(message.creditTypeAbbrev);
    }
    if (message.dateCriteria !== undefined) {
      DateCriteria.encode(message.dateCriteria, writer.uint32(50).fork()).ldelim();
    }
    if (message.exponent !== 0) {
      writer.uint32(56).uint32(message.exponent);
    }
    if (message.curator.length !== 0) {
      writer.uint32(66).bytes(message.curator);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Basket {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasket();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.basketDenom = reader.string();
          break;
        case 3:
          message.name = reader.string();
          break;
        case 4:
          message.disableAutoRetire = reader.bool();
          break;
        case 5:
          message.creditTypeAbbrev = reader.string();
          break;
        case 6:
          message.dateCriteria = DateCriteria.decode(reader, reader.uint32());
          break;
        case 7:
          message.exponent = reader.uint32();
          break;
        case 8:
          message.curator = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Basket>): Basket {
    const message = createBaseBasket();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.basketDenom = object.basketDenom ?? "";
    message.name = object.name ?? "";
    message.disableAutoRetire = object.disableAutoRetire ?? false;
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    message.dateCriteria = object.dateCriteria !== undefined && object.dateCriteria !== null ? DateCriteria.fromPartial(object.dateCriteria) : undefined;
    message.exponent = object.exponent ?? 0;
    message.curator = object.curator ?? new Uint8Array();
    return message;
  },
  fromAmino(object: BasketAmino): Basket {
    return {
      id: BigInt(object.id),
      basketDenom: object.basket_denom,
      name: object.name,
      disableAutoRetire: object.disable_auto_retire,
      creditTypeAbbrev: object.credit_type_abbrev,
      dateCriteria: object?.date_criteria ? DateCriteria.fromAmino(object.date_criteria) : undefined,
      exponent: object.exponent,
      curator: object.curator
    };
  },
  toAmino(message: Basket): BasketAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.basket_denom = message.basketDenom;
    obj.name = message.name;
    obj.disable_auto_retire = message.disableAutoRetire;
    obj.credit_type_abbrev = message.creditTypeAbbrev;
    obj.date_criteria = message.dateCriteria ? DateCriteria.toAmino(message.dateCriteria) : undefined;
    obj.exponent = message.exponent;
    obj.curator = message.curator;
    return obj;
  },
  fromAminoMsg(object: BasketAminoMsg): Basket {
    return Basket.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketProtoMsg): Basket {
    return Basket.decode(message.value);
  },
  toProto(message: Basket): Uint8Array {
    return Basket.encode(message).finish();
  },
  toProtoMsg(message: Basket): BasketProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.Basket",
      value: Basket.encode(message).finish()
    };
  }
};
function createBaseBasketClass(): BasketClass {
  return {
    basketId: BigInt(0),
    classId: ""
  };
}
export const BasketClass = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketClass",
  encode(message: BasketClass, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.basketId);
    }
    if (message.classId !== "") {
      writer.uint32(18).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BasketClass {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketClass();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketId = reader.uint64();
          break;
        case 2:
          message.classId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketClass>): BasketClass {
    const message = createBaseBasketClass();
    message.basketId = object.basketId !== undefined && object.basketId !== null ? BigInt(object.basketId.toString()) : BigInt(0);
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: BasketClassAmino): BasketClass {
    return {
      basketId: BigInt(object.basket_id),
      classId: object.class_id
    };
  },
  toAmino(message: BasketClass): BasketClassAmino {
    const obj: any = {};
    obj.basket_id = message.basketId ? message.basketId.toString() : undefined;
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: BasketClassAminoMsg): BasketClass {
    return BasketClass.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketClassProtoMsg): BasketClass {
    return BasketClass.decode(message.value);
  },
  toProto(message: BasketClass): Uint8Array {
    return BasketClass.encode(message).finish();
  },
  toProtoMsg(message: BasketClass): BasketClassProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketClass",
      value: BasketClass.encode(message).finish()
    };
  }
};
function createBaseBasketBalance(): BasketBalance {
  return {
    basketId: BigInt(0),
    batchDenom: "",
    balance: "",
    batchStartDate: new Date()
  };
}
export const BasketBalance = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketBalance",
  encode(message: BasketBalance, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.basketId !== BigInt(0)) {
      writer.uint32(8).uint64(message.basketId);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.balance !== "") {
      writer.uint32(26).string(message.balance);
    }
    if (message.batchStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.batchStartDate), writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BasketBalance {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketBalance();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.basketId = reader.uint64();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.balance = reader.string();
          break;
        case 4:
          message.batchStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketBalance>): BasketBalance {
    const message = createBaseBasketBalance();
    message.basketId = object.basketId !== undefined && object.basketId !== null ? BigInt(object.basketId.toString()) : BigInt(0);
    message.batchDenom = object.batchDenom ?? "";
    message.balance = object.balance ?? "";
    message.batchStartDate = object.batchStartDate ?? undefined;
    return message;
  },
  fromAmino(object: BasketBalanceAmino): BasketBalance {
    return {
      basketId: BigInt(object.basket_id),
      batchDenom: object.batch_denom,
      balance: object.balance,
      batchStartDate: object.batch_start_date
    };
  },
  toAmino(message: BasketBalance): BasketBalanceAmino {
    const obj: any = {};
    obj.basket_id = message.basketId ? message.basketId.toString() : undefined;
    obj.batch_denom = message.batchDenom;
    obj.balance = message.balance;
    obj.batch_start_date = message.batchStartDate;
    return obj;
  },
  fromAminoMsg(object: BasketBalanceAminoMsg): BasketBalance {
    return BasketBalance.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketBalanceProtoMsg): BasketBalance {
    return BasketBalance.decode(message.value);
  },
  toProto(message: BasketBalance): Uint8Array {
    return BasketBalance.encode(message).finish();
  },
  toProtoMsg(message: BasketBalance): BasketBalanceProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketBalance",
      value: BasketBalance.encode(message).finish()
    };
  }
};