import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { Params, ParamsSDKType, ClassInfo, ClassInfoSDKType, BatchInfo, BatchInfoSDKType, CreditType, CreditTypeSDKType } from "./types";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is the Query/Params request type. */
export interface QueryParamsRequest {}
/** QueryParamsRequest is the Query/Params request type. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is the Query/Params response type. */
export interface QueryParamsResponse {
  /** params defines the parameters of the ecocredit module. */
  params: Params;
}
/** QueryParamsResponse is the Query/Params response type. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/** QueryClassesRequest is the Query/Classes request type. */
export interface QueryClassesRequest {
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryClassesRequest is the Query/Classes request type. */
export interface QueryClassesRequestSDKType {
  pagination: PageRequestSDKType;
}
/** QueryClassesResponse is the Query/Classes response type. */
export interface QueryClassesResponse {
  /** classes are the fetched credit classes. */
  classes: ClassInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryClassesResponse is the Query/Classes response type. */
export interface QueryClassesResponseSDKType {
  classes: ClassInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryClassInfoRequest is the Query/ClassInfo request type. */
export interface QueryClassInfoRequest {
  /** class_id is the unique ID of credit class to query. */
  classId: string;
}
/** QueryClassInfoRequest is the Query/ClassInfo request type. */
export interface QueryClassInfoRequestSDKType {
  class_id: string;
}
/** QueryClassInfoResponse is the Query/ClassInfo request type. */
export interface QueryClassInfoResponse {
  /** info is the ClassInfo for the credit class. */
  info: ClassInfo;
}
/** QueryClassInfoResponse is the Query/ClassInfo request type. */
export interface QueryClassInfoResponseSDKType {
  info: ClassInfoSDKType;
}
/** QueryBatchesRequest is the Query/Batches request type. */
export interface QueryBatchesRequest {
  /** class_id is the unique ID of the credit class to query. */
  classId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryBatchesRequest is the Query/Batches request type. */
export interface QueryBatchesRequestSDKType {
  class_id: string;
  pagination: PageRequestSDKType;
}
/** QueryBatchesResponse is the Query/Batches response type. */
export interface QueryBatchesResponse {
  /** batches are the fetched credit batches within the class. */
  batches: BatchInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryBatchesResponse is the Query/Batches response type. */
export interface QueryBatchesResponseSDKType {
  batches: BatchInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryBatchInfoRequest is the Query/BatchInfo request type. */
export interface QueryBatchInfoRequest {
  /** batch_denom is the unique ID of credit batch to query. */
  batchDenom: string;
}
/** QueryBatchInfoRequest is the Query/BatchInfo request type. */
export interface QueryBatchInfoRequestSDKType {
  batch_denom: string;
}
/** QueryBatchInfoResponse is the Query/BatchInfo response type. */
export interface QueryBatchInfoResponse {
  /** info is the BatchInfo for the credit batch. */
  info: BatchInfo;
}
/** QueryBatchInfoResponse is the Query/BatchInfo response type. */
export interface QueryBatchInfoResponseSDKType {
  info: BatchInfoSDKType;
}
/** QueryBalanceRequest is the Query/Balance request type. */
export interface QueryBalanceRequest {
  /** account is the address of the account whose balance is being queried. */
  account: string;
  /** batch_denom is the unique ID of credit batch balance to query. */
  batchDenom: string;
}
/** QueryBalanceRequest is the Query/Balance request type. */
export interface QueryBalanceRequestSDKType {
  account: string;
  batch_denom: string;
}
/** QueryBalanceResponse is the Query/Balance response type. */
export interface QueryBalanceResponse {
  /** tradable_amount is the decimal number of tradable credits. */
  tradableAmount: string;
  /** retired_amount is the decimal number of retired credits. */
  retiredAmount: string;
}
/** QueryBalanceResponse is the Query/Balance response type. */
export interface QueryBalanceResponseSDKType {
  tradable_amount: string;
  retired_amount: string;
}
/** QuerySupplyRequest is the Query/Supply request type. */
export interface QuerySupplyRequest {
  /** batch_denom is the unique ID of credit batch to query. */
  batchDenom: string;
}
/** QuerySupplyRequest is the Query/Supply request type. */
export interface QuerySupplyRequestSDKType {
  batch_denom: string;
}
/** QuerySupplyResponse is the Query/Supply response type. */
export interface QuerySupplyResponse {
  /**
   * tradable_supply is the decimal number of tradable credits in the batch
   * supply.
   */
  tradableSupply: string;
  /**
   * retired_supply is the decimal number of retired credits in the batch
   * supply.
   */
  retiredSupply: string;
}
/** QuerySupplyResponse is the Query/Supply response type. */
export interface QuerySupplyResponseSDKType {
  tradable_supply: string;
  retired_supply: string;
}
/** QueryCreditTypesRequest is the Query/Credit_Types request type */
export interface QueryCreditTypesRequest {}
/** QueryCreditTypesRequest is the Query/Credit_Types request type */
export interface QueryCreditTypesRequestSDKType {}
/** QueryCreditTypesRequest is the Query/Credit_Types response type */
export interface QueryCreditTypesResponse {
  /** list of credit types */
  creditTypes: CreditType[];
}
/** QueryCreditTypesRequest is the Query/Credit_Types response type */
export interface QueryCreditTypesResponseSDKType {
  credit_types: CreditTypeSDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryParamsRequest",
  encode(_: QueryParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsRequest();
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
  fromPartial(_: Partial<QueryParamsRequest>): QueryParamsRequest {
    const message = createBaseQueryParamsRequest();
    return message;
  },
  fromAmino(_: QueryParamsRequestAmino): QueryParamsRequest {
    return {};
  },
  toAmino(_: QueryParamsRequest): QueryParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryParamsRequestAminoMsg): QueryParamsRequest {
    return QueryParamsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryParamsRequest",
      value: QueryParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryParamsResponse(): QueryParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryParamsResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryParamsResponse",
  encode(message: QueryParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryParamsResponse>): QueryParamsResponse {
    const message = createBaseQueryParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryParamsResponseAmino): QueryParamsResponse {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: QueryParamsResponse): QueryParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryParamsResponseAminoMsg): QueryParamsResponse {
    return QueryParamsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClassesRequest(): QueryClassesRequest {
  return {
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryClassesRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryClassesRequest",
  encode(message: QueryClassesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClassesRequest>): QueryClassesRequest {
    const message = createBaseQueryClassesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassesRequestAmino): QueryClassesRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassesRequest): QueryClassesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassesRequestAminoMsg): QueryClassesRequest {
    return QueryClassesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassesRequestProtoMsg): QueryClassesRequest {
    return QueryClassesRequest.decode(message.value);
  },
  toProto(message: QueryClassesRequest): Uint8Array {
    return QueryClassesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClassesRequest): QueryClassesRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryClassesRequest",
      value: QueryClassesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClassesResponse(): QueryClassesResponse {
  return {
    classes: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryClassesResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryClassesResponse",
  encode(message: QueryClassesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.classes) {
      ClassInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classes.push(ClassInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClassesResponse>): QueryClassesResponse {
    const message = createBaseQueryClassesResponse();
    message.classes = object.classes?.map(e => ClassInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassesResponseAmino): QueryClassesResponse {
    return {
      classes: Array.isArray(object?.classes) ? object.classes.map((e: any) => ClassInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassesResponse): QueryClassesResponseAmino {
    const obj: any = {};
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? ClassInfo.toAmino(e) : undefined);
    } else {
      obj.classes = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassesResponseAminoMsg): QueryClassesResponse {
    return QueryClassesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassesResponseProtoMsg): QueryClassesResponse {
    return QueryClassesResponse.decode(message.value);
  },
  toProto(message: QueryClassesResponse): Uint8Array {
    return QueryClassesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClassesResponse): QueryClassesResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryClassesResponse",
      value: QueryClassesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClassInfoRequest(): QueryClassInfoRequest {
  return {
    classId: ""
  };
}
export const QueryClassInfoRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryClassInfoRequest",
  encode(message: QueryClassInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassInfoRequest();
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
  fromPartial(object: Partial<QueryClassInfoRequest>): QueryClassInfoRequest {
    const message = createBaseQueryClassInfoRequest();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: QueryClassInfoRequestAmino): QueryClassInfoRequest {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: QueryClassInfoRequest): QueryClassInfoRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: QueryClassInfoRequestAminoMsg): QueryClassInfoRequest {
    return QueryClassInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassInfoRequestProtoMsg): QueryClassInfoRequest {
    return QueryClassInfoRequest.decode(message.value);
  },
  toProto(message: QueryClassInfoRequest): Uint8Array {
    return QueryClassInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClassInfoRequest): QueryClassInfoRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryClassInfoRequest",
      value: QueryClassInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClassInfoResponse(): QueryClassInfoResponse {
  return {
    info: ClassInfo.fromPartial({})
  };
}
export const QueryClassInfoResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryClassInfoResponse",
  encode(message: QueryClassInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.info !== undefined) {
      ClassInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = ClassInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClassInfoResponse>): QueryClassInfoResponse {
    const message = createBaseQueryClassInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? ClassInfo.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: QueryClassInfoResponseAmino): QueryClassInfoResponse {
    return {
      info: object?.info ? ClassInfo.fromAmino(object.info) : undefined
    };
  },
  toAmino(message: QueryClassInfoResponse): QueryClassInfoResponseAmino {
    const obj: any = {};
    obj.info = message.info ? ClassInfo.toAmino(message.info) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassInfoResponseAminoMsg): QueryClassInfoResponse {
    return QueryClassInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassInfoResponseProtoMsg): QueryClassInfoResponse {
    return QueryClassInfoResponse.decode(message.value);
  },
  toProto(message: QueryClassInfoResponse): Uint8Array {
    return QueryClassInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClassInfoResponse): QueryClassInfoResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryClassInfoResponse",
      value: QueryClassInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesRequest(): QueryBatchesRequest {
  return {
    classId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryBatchesRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchesRequest",
  encode(message: QueryBatchesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.classId = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBatchesRequest>): QueryBatchesRequest {
    const message = createBaseQueryBatchesRequest();
    message.classId = object.classId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesRequestAmino): QueryBatchesRequest {
    return {
      classId: object.class_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesRequest): QueryBatchesRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesRequestAminoMsg): QueryBatchesRequest {
    return QueryBatchesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesRequestProtoMsg): QueryBatchesRequest {
    return QueryBatchesRequest.decode(message.value);
  },
  toProto(message: QueryBatchesRequest): Uint8Array {
    return QueryBatchesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesRequest): QueryBatchesRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchesRequest",
      value: QueryBatchesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesResponse(): QueryBatchesResponse {
  return {
    batches: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryBatchesResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchesResponse",
  encode(message: QueryBatchesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.batches) {
      BatchInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batches.push(BatchInfo.decode(reader, reader.uint32()));
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBatchesResponse>): QueryBatchesResponse {
    const message = createBaseQueryBatchesResponse();
    message.batches = object.batches?.map(e => BatchInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesResponseAmino): QueryBatchesResponse {
    return {
      batches: Array.isArray(object?.batches) ? object.batches.map((e: any) => BatchInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesResponse): QueryBatchesResponseAmino {
    const obj: any = {};
    if (message.batches) {
      obj.batches = message.batches.map(e => e ? BatchInfo.toAmino(e) : undefined);
    } else {
      obj.batches = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesResponseAminoMsg): QueryBatchesResponse {
    return QueryBatchesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesResponseProtoMsg): QueryBatchesResponse {
    return QueryBatchesResponse.decode(message.value);
  },
  toProto(message: QueryBatchesResponse): Uint8Array {
    return QueryBatchesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesResponse): QueryBatchesResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchesResponse",
      value: QueryBatchesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchInfoRequest(): QueryBatchInfoRequest {
  return {
    batchDenom: ""
  };
}
export const QueryBatchInfoRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchInfoRequest",
  encode(message: QueryBatchInfoRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchInfoRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchInfoRequest();
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
  fromPartial(object: Partial<QueryBatchInfoRequest>): QueryBatchInfoRequest {
    const message = createBaseQueryBatchInfoRequest();
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: QueryBatchInfoRequestAmino): QueryBatchInfoRequest {
    return {
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: QueryBatchInfoRequest): QueryBatchInfoRequestAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: QueryBatchInfoRequestAminoMsg): QueryBatchInfoRequest {
    return QueryBatchInfoRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchInfoRequestProtoMsg): QueryBatchInfoRequest {
    return QueryBatchInfoRequest.decode(message.value);
  },
  toProto(message: QueryBatchInfoRequest): Uint8Array {
    return QueryBatchInfoRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchInfoRequest): QueryBatchInfoRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchInfoRequest",
      value: QueryBatchInfoRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBatchInfoResponse(): QueryBatchInfoResponse {
  return {
    info: BatchInfo.fromPartial({})
  };
}
export const QueryBatchInfoResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchInfoResponse",
  encode(message: QueryBatchInfoResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.info !== undefined) {
      BatchInfo.encode(message.info, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchInfoResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchInfoResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.info = BatchInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBatchInfoResponse>): QueryBatchInfoResponse {
    const message = createBaseQueryBatchInfoResponse();
    message.info = object.info !== undefined && object.info !== null ? BatchInfo.fromPartial(object.info) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchInfoResponseAmino): QueryBatchInfoResponse {
    return {
      info: object?.info ? BatchInfo.fromAmino(object.info) : undefined
    };
  },
  toAmino(message: QueryBatchInfoResponse): QueryBatchInfoResponseAmino {
    const obj: any = {};
    obj.info = message.info ? BatchInfo.toAmino(message.info) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchInfoResponseAminoMsg): QueryBatchInfoResponse {
    return QueryBatchInfoResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchInfoResponseProtoMsg): QueryBatchInfoResponse {
    return QueryBatchInfoResponse.decode(message.value);
  },
  toProto(message: QueryBatchInfoResponse): Uint8Array {
    return QueryBatchInfoResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchInfoResponse): QueryBatchInfoResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBatchInfoResponse",
      value: QueryBatchInfoResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBalanceRequest(): QueryBalanceRequest {
  return {
    account: "",
    batchDenom: ""
  };
}
export const QueryBalanceRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBalanceRequest",
  encode(message: QueryBalanceRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalanceRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBalanceRequest>): QueryBalanceRequest {
    const message = createBaseQueryBalanceRequest();
    message.account = object.account ?? "";
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: QueryBalanceRequestAmino): QueryBalanceRequest {
    return {
      account: object.account,
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: QueryBalanceRequest): QueryBalanceRequestAmino {
    const obj: any = {};
    obj.account = message.account;
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: QueryBalanceRequestAminoMsg): QueryBalanceRequest {
    return QueryBalanceRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBalanceRequestProtoMsg): QueryBalanceRequest {
    return QueryBalanceRequest.decode(message.value);
  },
  toProto(message: QueryBalanceRequest): Uint8Array {
    return QueryBalanceRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBalanceRequest): QueryBalanceRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBalanceRequest",
      value: QueryBalanceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBalanceResponse(): QueryBalanceResponse {
  return {
    tradableAmount: "",
    retiredAmount: ""
  };
}
export const QueryBalanceResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryBalanceResponse",
  encode(message: QueryBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradableAmount !== "") {
      writer.uint32(10).string(message.tradableAmount);
    }
    if (message.retiredAmount !== "") {
      writer.uint32(18).string(message.retiredAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalanceResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalanceResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradableAmount = reader.string();
          break;
        case 2:
          message.retiredAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBalanceResponse>): QueryBalanceResponse {
    const message = createBaseQueryBalanceResponse();
    message.tradableAmount = object.tradableAmount ?? "";
    message.retiredAmount = object.retiredAmount ?? "";
    return message;
  },
  fromAmino(object: QueryBalanceResponseAmino): QueryBalanceResponse {
    return {
      tradableAmount: object.tradable_amount,
      retiredAmount: object.retired_amount
    };
  },
  toAmino(message: QueryBalanceResponse): QueryBalanceResponseAmino {
    const obj: any = {};
    obj.tradable_amount = message.tradableAmount;
    obj.retired_amount = message.retiredAmount;
    return obj;
  },
  fromAminoMsg(object: QueryBalanceResponseAminoMsg): QueryBalanceResponse {
    return QueryBalanceResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBalanceResponseProtoMsg): QueryBalanceResponse {
    return QueryBalanceResponse.decode(message.value);
  },
  toProto(message: QueryBalanceResponse): Uint8Array {
    return QueryBalanceResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBalanceResponse): QueryBalanceResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryBalanceResponse",
      value: QueryBalanceResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySupplyRequest(): QuerySupplyRequest {
  return {
    batchDenom: ""
  };
}
export const QuerySupplyRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QuerySupplyRequest",
  encode(message: QuerySupplyRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySupplyRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyRequest();
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
  fromPartial(object: Partial<QuerySupplyRequest>): QuerySupplyRequest {
    const message = createBaseQuerySupplyRequest();
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: QuerySupplyRequestAmino): QuerySupplyRequest {
    return {
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: QuerySupplyRequest): QuerySupplyRequestAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: QuerySupplyRequestAminoMsg): QuerySupplyRequest {
    return QuerySupplyRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySupplyRequestProtoMsg): QuerySupplyRequest {
    return QuerySupplyRequest.decode(message.value);
  },
  toProto(message: QuerySupplyRequest): Uint8Array {
    return QuerySupplyRequest.encode(message).finish();
  },
  toProtoMsg(message: QuerySupplyRequest): QuerySupplyRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QuerySupplyRequest",
      value: QuerySupplyRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySupplyResponse(): QuerySupplyResponse {
  return {
    tradableSupply: "",
    retiredSupply: ""
  };
}
export const QuerySupplyResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QuerySupplyResponse",
  encode(message: QuerySupplyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradableSupply !== "") {
      writer.uint32(10).string(message.tradableSupply);
    }
    if (message.retiredSupply !== "") {
      writer.uint32(18).string(message.retiredSupply);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QuerySupplyResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQuerySupplyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tradableSupply = reader.string();
          break;
        case 2:
          message.retiredSupply = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QuerySupplyResponse>): QuerySupplyResponse {
    const message = createBaseQuerySupplyResponse();
    message.tradableSupply = object.tradableSupply ?? "";
    message.retiredSupply = object.retiredSupply ?? "";
    return message;
  },
  fromAmino(object: QuerySupplyResponseAmino): QuerySupplyResponse {
    return {
      tradableSupply: object.tradable_supply,
      retiredSupply: object.retired_supply
    };
  },
  toAmino(message: QuerySupplyResponse): QuerySupplyResponseAmino {
    const obj: any = {};
    obj.tradable_supply = message.tradableSupply;
    obj.retired_supply = message.retiredSupply;
    return obj;
  },
  fromAminoMsg(object: QuerySupplyResponseAminoMsg): QuerySupplyResponse {
    return QuerySupplyResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QuerySupplyResponseProtoMsg): QuerySupplyResponse {
    return QuerySupplyResponse.decode(message.value);
  },
  toProto(message: QuerySupplyResponse): Uint8Array {
    return QuerySupplyResponse.encode(message).finish();
  },
  toProtoMsg(message: QuerySupplyResponse): QuerySupplyResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QuerySupplyResponse",
      value: QuerySupplyResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCreditTypesRequest(): QueryCreditTypesRequest {
  return {};
}
export const QueryCreditTypesRequest = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryCreditTypesRequest",
  encode(_: QueryCreditTypesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditTypesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditTypesRequest();
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
  fromPartial(_: Partial<QueryCreditTypesRequest>): QueryCreditTypesRequest {
    const message = createBaseQueryCreditTypesRequest();
    return message;
  },
  fromAmino(_: QueryCreditTypesRequestAmino): QueryCreditTypesRequest {
    return {};
  },
  toAmino(_: QueryCreditTypesRequest): QueryCreditTypesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryCreditTypesRequestAminoMsg): QueryCreditTypesRequest {
    return QueryCreditTypesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditTypesRequestProtoMsg): QueryCreditTypesRequest {
    return QueryCreditTypesRequest.decode(message.value);
  },
  toProto(message: QueryCreditTypesRequest): Uint8Array {
    return QueryCreditTypesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditTypesRequest): QueryCreditTypesRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryCreditTypesRequest",
      value: QueryCreditTypesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCreditTypesResponse(): QueryCreditTypesResponse {
  return {
    creditTypes: []
  };
}
export const QueryCreditTypesResponse = {
  typeUrl: "/regen.ecocredit.v1alpha1.QueryCreditTypesResponse",
  encode(message: QueryCreditTypesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.creditTypes) {
      CreditType.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCreditTypesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCreditTypesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creditTypes.push(CreditType.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryCreditTypesResponse>): QueryCreditTypesResponse {
    const message = createBaseQueryCreditTypesResponse();
    message.creditTypes = object.creditTypes?.map(e => CreditType.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryCreditTypesResponseAmino): QueryCreditTypesResponse {
    return {
      creditTypes: Array.isArray(object?.credit_types) ? object.credit_types.map((e: any) => CreditType.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryCreditTypesResponse): QueryCreditTypesResponseAmino {
    const obj: any = {};
    if (message.creditTypes) {
      obj.credit_types = message.creditTypes.map(e => e ? CreditType.toAmino(e) : undefined);
    } else {
      obj.credit_types = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryCreditTypesResponseAminoMsg): QueryCreditTypesResponse {
    return QueryCreditTypesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCreditTypesResponseProtoMsg): QueryCreditTypesResponse {
    return QueryCreditTypesResponse.decode(message.value);
  },
  toProto(message: QueryCreditTypesResponse): Uint8Array {
    return QueryCreditTypesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCreditTypesResponse): QueryCreditTypesResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1alpha1.QueryCreditTypesResponse",
      value: QueryCreditTypesResponse.encode(message).finish()
    };
  }
};