import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { CreditType, CreditTypeSDKType } from "./state";
import { BinaryReader, BinaryWriter } from "../../../binary";
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface Params {
  /** credit_class_fee is the fixed fee charged on creation of a new credit class */
  creditClassFee: Coin[];
  /** basket_fee is the fixed fee charged on creation of a new basket */
  basketFee: Coin[];
  /**
   * allowed_class_creators is an allowlist defining the addresses with
   * the required permissions to create credit classes
   */
  allowedClassCreators: string[];
  /**
   * allowlist_enabled is a param that enables/disables the allowlist for credit
   * creation
   */
  allowlistEnabled: boolean;
}
/**
 * Params defines the updatable global parameters of the ecocredit module for
 * use with the x/params module.
 */
export interface ParamsSDKType {
  credit_class_fee: CoinSDKType[];
  basket_fee: CoinSDKType[];
  allowed_class_creators: string[];
  allowlist_enabled: boolean;
}
/**
 * OriginTx is a reference to an external transaction or an operation
 * related to an action on Regen Ledger.
 */
export interface OriginTx {
  /**
   * type of the transaction originating the mint process. Eg: Polygon,
   * Ethereum, Verra...
   */
  typ: string;
  /** the id of a transaction based on a type (tx id, serial number) */
  id: string;
}
/**
 * OriginTx is a reference to an external transaction or an operation
 * related to an action on Regen Ledger.
 */
export interface OriginTxSDKType {
  typ: string;
  id: string;
}
/** CreditTypeProposal is a gov Content type for adding a credit type. */
export interface CreditTypeProposal {
  /** title is the title of the proposal. */
  title: string;
  /** description is the description of the proposal. */
  description: string;
  /**
   * credit_type is the credit type to be added to the network if the proposal
   * passes.
   */
  creditType: CreditType;
}
/** CreditTypeProposal is a gov Content type for adding a credit type. */
export interface CreditTypeProposalSDKType {
  title: string;
  description: string;
  credit_type: CreditTypeSDKType;
}
function createBaseParams(): Params {
  return {
    creditClassFee: [],
    basketFee: [],
    allowedClassCreators: [],
    allowlistEnabled: false
  };
}
export const Params = {
  typeUrl: "/regen.ecocredit.v1.Params",
  encode(message: Params, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creditClassFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.basketFee) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.allowedClassCreators) {
      writer.uint32(26).string(v!);
    }
    if (message.allowlistEnabled === true) {
      writer.uint32(32).bool(message.allowlistEnabled);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Params {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditClassFee.push(Coin.decode(reader, reader.uint32()));
          break;
        case 2:
          message.basketFee.push(Coin.decode(reader, reader.uint32()));
          break;
        case 3:
          message.allowedClassCreators.push(reader.string());
          break;
        case 4:
          message.allowlistEnabled = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Params>): Params {
    const message = createBaseParams();
    message.creditClassFee = object.creditClassFee?.map(e => Coin.fromPartial(e)) || [];
    message.basketFee = object.basketFee?.map(e => Coin.fromPartial(e)) || [];
    message.allowedClassCreators = object.allowedClassCreators?.map(e => e) || [];
    message.allowlistEnabled = object.allowlistEnabled ?? false;
    return message;
  },
  fromAmino(object: ParamsAmino): Params {
    return {
      creditClassFee: Array.isArray(object?.credit_class_fee) ? object.credit_class_fee.map((e: any) => Coin.fromAmino(e)) : [],
      basketFee: Array.isArray(object?.basket_fee) ? object.basket_fee.map((e: any) => Coin.fromAmino(e)) : [],
      allowedClassCreators: Array.isArray(object?.allowed_class_creators) ? object.allowed_class_creators.map((e: any) => e) : [],
      allowlistEnabled: object.allowlist_enabled
    };
  },
  toAmino(message: Params): ParamsAmino {
    const obj: any = {};
    if (message.creditClassFee) {
      obj.credit_class_fee = message.creditClassFee.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.credit_class_fee = [];
    }
    if (message.basketFee) {
      obj.basket_fee = message.basketFee.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.basket_fee = [];
    }
    if (message.allowedClassCreators) {
      obj.allowed_class_creators = message.allowedClassCreators.map(e => e);
    } else {
      obj.allowed_class_creators = [];
    }
    obj.allowlist_enabled = message.allowlistEnabled;
    return obj;
  },
  fromAminoMsg(object: ParamsAminoMsg): Params {
    return Params.fromAmino(object.value);
  },
  fromProtoMsg(message: ParamsProtoMsg): Params {
    return Params.decode(message.value);
  },
  toProto(message: Params): Uint8Array {
    return Params.encode(message).finish();
  },
  toProtoMsg(message: Params): ParamsProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.Params",
      value: Params.encode(message).finish()
    };
  }
};
function createBaseOriginTx(): OriginTx {
  return {
    typ: "",
    id: ""
  };
}
export const OriginTx = {
  typeUrl: "/regen.ecocredit.v1.OriginTx",
  encode(message: OriginTx, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.typ !== "") {
      writer.uint32(10).string(message.typ);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): OriginTx {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOriginTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.typ = reader.string();
          break;
        case 2:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<OriginTx>): OriginTx {
    const message = createBaseOriginTx();
    message.typ = object.typ ?? "";
    message.id = object.id ?? "";
    return message;
  },
  fromAmino(object: OriginTxAmino): OriginTx {
    return {
      typ: object.typ,
      id: object.id
    };
  },
  toAmino(message: OriginTx): OriginTxAmino {
    const obj: any = {};
    obj.typ = message.typ;
    obj.id = message.id;
    return obj;
  },
  fromAminoMsg(object: OriginTxAminoMsg): OriginTx {
    return OriginTx.fromAmino(object.value);
  },
  fromProtoMsg(message: OriginTxProtoMsg): OriginTx {
    return OriginTx.decode(message.value);
  },
  toProto(message: OriginTx): Uint8Array {
    return OriginTx.encode(message).finish();
  },
  toProtoMsg(message: OriginTx): OriginTxProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.OriginTx",
      value: OriginTx.encode(message).finish()
    };
  }
};
function createBaseCreditTypeProposal(): CreditTypeProposal {
  return {
    title: "",
    description: "",
    creditType: CreditType.fromPartial({})
  };
}
export const CreditTypeProposal = {
  typeUrl: "/regen.ecocredit.v1.CreditTypeProposal",
  encode(message: CreditTypeProposal, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.title !== "") {
      writer.uint32(10).string(message.title);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.creditType !== undefined) {
      CreditType.encode(message.creditType, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CreditTypeProposal {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreditTypeProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.title = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.creditType = CreditType.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CreditTypeProposal>): CreditTypeProposal {
    const message = createBaseCreditTypeProposal();
    message.title = object.title ?? "";
    message.description = object.description ?? "";
    message.creditType = object.creditType !== undefined && object.creditType !== null ? CreditType.fromPartial(object.creditType) : undefined;
    return message;
  },
  fromAmino(object: CreditTypeProposalAmino): CreditTypeProposal {
    return {
      title: object.title,
      description: object.description,
      creditType: object?.credit_type ? CreditType.fromAmino(object.credit_type) : undefined
    };
  },
  toAmino(message: CreditTypeProposal): CreditTypeProposalAmino {
    const obj: any = {};
    obj.title = message.title;
    obj.description = message.description;
    obj.credit_type = message.creditType ? CreditType.toAmino(message.creditType) : undefined;
    return obj;
  },
  fromAminoMsg(object: CreditTypeProposalAminoMsg): CreditTypeProposal {
    return CreditTypeProposal.fromAmino(object.value);
  },
  fromProtoMsg(message: CreditTypeProposalProtoMsg): CreditTypeProposal {
    return CreditTypeProposal.decode(message.value);
  },
  toProto(message: CreditTypeProposal): Uint8Array {
    return CreditTypeProposal.encode(message).finish();
  },
  toProtoMsg(message: CreditTypeProposal): CreditTypeProposalProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.CreditTypeProposal",
      value: CreditTypeProposal.encode(message).finish()
    };
  }
};