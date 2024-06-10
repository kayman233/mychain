import { Timestamp } from "../../../../google/protobuf/timestamp";
import { Duration, DurationSDKType } from "../../../../google/protobuf/duration";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { toTimestamp, fromTimestamp } from "../../../../helpers";
/** BasketCredit represents the information for a credit batch inside a basket. */
export interface BasketCredit {
  /** batch_denom is the unique ID of the credit batch. */
  batchDenom: string;
  /**
   * amount is the number of credits being put into or taken out of the basket.
   * Decimal values are acceptable within the precision of the corresponding
   *  credit type for this batch.
   */
  amount: string;
}
/** BasketCredit represents the information for a credit batch inside a basket. */
export interface BasketCreditSDKType {
  batch_denom: string;
  amount: string;
}
/**
 * DateCriteria represents the information for credit acceptance in a basket.
 * At most, only one of the values should be set.
 * NOTE: gogo proto `oneof` is not compatible with Amino signing, hence we
 * directly define both `start_date_window` and `min_start_date`. In the future,
 * with pulsar, this should change and we should use `oneof`.
 */
export interface DateCriteria {
  /**
   * min_start_date (optional) is the earliest start date for batches of credits
   * allowed into the basket. At most only one of `start_date_window`,
   * `min_start_date`, and `years_in_the_past` can be set for a basket.
   */
  minStartDate: Date;
  /**
   * start_date_window (optional) is a duration of time measured into the past
   * which sets a cutoff for batch start dates when adding new credits to the
   * basket. Based on the current block timestamp, credits whose start date is
   * before `block_timestamp - start_date_window` will not be allowed into the
   * basket. At most only one of `start_date_window`, `min_start_date`, and
   * `years_in_the_past` can be set for a basket.
   */
  startDateWindow: Duration;
  /**
   * years_in_the_past (optional) is the number of years into the past which
   * sets a cutoff for the batch start dates when adding new credits to the
   * basket. Based on the current block timestamp, credits whose start date year
   * is less than `block_timestamp_year - years_in_the_past` will not be allowed
   * into the basket. At most only one of `start_date_window`, `min_start_date`,
   * and `years_in_the_past` can be set for a basket.
   * 
   * Since Revision 1
   */
  yearsInThePast: number;
}
/**
 * DateCriteria represents the information for credit acceptance in a basket.
 * At most, only one of the values should be set.
 * NOTE: gogo proto `oneof` is not compatible with Amino signing, hence we
 * directly define both `start_date_window` and `min_start_date`. In the future,
 * with pulsar, this should change and we should use `oneof`.
 */
export interface DateCriteriaSDKType {
  min_start_date: Date;
  start_date_window: DurationSDKType;
  years_in_the_past: number;
}
function createBaseBasketCredit(): BasketCredit {
  return {
    batchDenom: "",
    amount: ""
  };
}
export const BasketCredit = {
  typeUrl: "/regen.ecocredit.basket.v1.BasketCredit",
  encode(message: BasketCredit, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BasketCredit {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasketCredit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batchDenom = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BasketCredit>): BasketCredit {
    const message = createBaseBasketCredit();
    message.batchDenom = object.batchDenom ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
  fromAmino(object: BasketCreditAmino): BasketCredit {
    return {
      batchDenom: object.batch_denom,
      amount: object.amount
    };
  },
  toAmino(message: BasketCredit): BasketCreditAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    obj.amount = message.amount;
    return obj;
  },
  fromAminoMsg(object: BasketCreditAminoMsg): BasketCredit {
    return BasketCredit.fromAmino(object.value);
  },
  fromProtoMsg(message: BasketCreditProtoMsg): BasketCredit {
    return BasketCredit.decode(message.value);
  },
  toProto(message: BasketCredit): Uint8Array {
    return BasketCredit.encode(message).finish();
  },
  toProtoMsg(message: BasketCredit): BasketCreditProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.BasketCredit",
      value: BasketCredit.encode(message).finish()
    };
  }
};
function createBaseDateCriteria(): DateCriteria {
  return {
    minStartDate: new Date(),
    startDateWindow: Duration.fromPartial({}),
    yearsInThePast: 0
  };
}
export const DateCriteria = {
  typeUrl: "/regen.ecocredit.basket.v1.DateCriteria",
  encode(message: DateCriteria, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.minStartDate !== undefined) {
      Timestamp.encode(toTimestamp(message.minStartDate), writer.uint32(10).fork()).ldelim();
    }
    if (message.startDateWindow !== undefined) {
      Duration.encode(message.startDateWindow, writer.uint32(18).fork()).ldelim();
    }
    if (message.yearsInThePast !== 0) {
      writer.uint32(24).uint32(message.yearsInThePast);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DateCriteria {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDateCriteria();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.minStartDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 2:
          message.startDateWindow = Duration.decode(reader, reader.uint32());
          break;
        case 3:
          message.yearsInThePast = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DateCriteria>): DateCriteria {
    const message = createBaseDateCriteria();
    message.minStartDate = object.minStartDate ?? undefined;
    message.startDateWindow = object.startDateWindow !== undefined && object.startDateWindow !== null ? Duration.fromPartial(object.startDateWindow) : undefined;
    message.yearsInThePast = object.yearsInThePast ?? 0;
    return message;
  },
  fromAmino(object: DateCriteriaAmino): DateCriteria {
    return {
      minStartDate: object.min_start_date,
      startDateWindow: object?.start_date_window ? Duration.fromAmino(object.start_date_window) : undefined,
      yearsInThePast: object.years_in_the_past
    };
  },
  toAmino(message: DateCriteria): DateCriteriaAmino {
    const obj: any = {};
    obj.min_start_date = message.minStartDate;
    obj.start_date_window = message.startDateWindow ? Duration.toAmino(message.startDateWindow) : undefined;
    obj.years_in_the_past = message.yearsInThePast;
    return obj;
  },
  fromAminoMsg(object: DateCriteriaAminoMsg): DateCriteria {
    return DateCriteria.fromAmino(object.value);
  },
  fromProtoMsg(message: DateCriteriaProtoMsg): DateCriteria {
    return DateCriteria.decode(message.value);
  },
  toProto(message: DateCriteria): Uint8Array {
    return DateCriteria.encode(message).finish();
  },
  toProtoMsg(message: DateCriteria): DateCriteriaProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.basket.v1.DateCriteria",
      value: DateCriteria.encode(message).finish()
    };
  }
};