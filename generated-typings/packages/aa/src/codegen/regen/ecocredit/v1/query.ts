import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { CreditType, CreditTypeSDKType } from "./state";
import { Params, ParamsSDKType } from "./types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
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
/** QueryClassesByAdminRequest is the Query/ClassesByAdmin request type. */
export interface QueryClassesByAdminRequest {
  /** admin is the address of the admin of the class. */
  admin: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryClassesByAdminRequest is the Query/ClassesByAdmin request type. */
export interface QueryClassesByAdminRequestSDKType {
  admin: string;
  pagination: PageRequestSDKType;
}
/** QueryClassesByAdminResponse is the Query/ClassesByAdmin response type. */
export interface QueryClassesByAdminResponse {
  /** classes are the fetched credit classes. */
  classes: ClassInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryClassesByAdminResponse is the Query/ClassesByAdmin response type. */
export interface QueryClassesByAdminResponseSDKType {
  classes: ClassInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryClassRequest is the Query/Class request type. */
export interface QueryClassRequest {
  /** class_id is the unique identifier of the credit class to query. */
  classId: string;
}
/** QueryClassRequest is the Query/Class request type. */
export interface QueryClassRequestSDKType {
  class_id: string;
}
/** QueryClassResponse is the Query/Class request type. */
export interface QueryClassResponse {
  /** class is the fetched credit class. */
  class: ClassInfo;
}
/** QueryClassResponse is the Query/Class request type. */
export interface QueryClassResponseSDKType {
  class: ClassInfoSDKType;
}
/** QueryClassIssuersRequest is the Query/ClassIssuers request type. */
export interface QueryClassIssuersRequest {
  /** class_id is the unique identifier of the credit class to query. */
  classId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryClassIssuersRequest is the Query/ClassIssuers request type. */
export interface QueryClassIssuersRequestSDKType {
  class_id: string;
  pagination: PageRequestSDKType;
}
/** QueryClassIssuersRequest is the Query/ClassIssuers response type. */
export interface QueryClassIssuersResponse {
  /** issuers is a list of issuers for the credit class */
  issuers: string[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryClassIssuersRequest is the Query/ClassIssuers response type. */
export interface QueryClassIssuersResponseSDKType {
  issuers: string[];
  pagination: PageResponseSDKType;
}
/** QueryProjectsRequest is the Query/Projects request type. */
export interface QueryProjectsRequest {
  /** class_id is the unique identifier of the credit class to query. */
  classId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryProjectsRequest is the Query/Projects request type. */
export interface QueryProjectsRequestSDKType {
  class_id: string;
  pagination: PageRequestSDKType;
}
/** QueryProjectsResponse is the Query/Projects response type. */
export interface QueryProjectsResponse {
  /** projects are the fetched projects. */
  projects: ProjectInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryProjectsResponse is the Query/Projects response type. */
export interface QueryProjectsResponseSDKType {
  projects: ProjectInfoSDKType[];
  pagination: PageResponseSDKType;
}
/**
 * QueryProjectsByReferenceIdRequest is the Query/ProjectsByReferenceId request
 * type.
 */
export interface QueryProjectsByReferenceIdRequest {
  /** reference_id is the project reference id. */
  referenceId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/**
 * QueryProjectsByReferenceIdRequest is the Query/ProjectsByReferenceId request
 * type.
 */
export interface QueryProjectsByReferenceIdRequestSDKType {
  reference_id: string;
  pagination: PageRequestSDKType;
}
/**
 * QueryProjectsByReferenceIdResponse is the Query/ProjectsByReferenceId
 * response type.
 */
export interface QueryProjectsByReferenceIdResponse {
  /** projects are the fetched projects. */
  projects: ProjectInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/**
 * QueryProjectsByReferenceIdResponse is the Query/ProjectsByReferenceId
 * response type.
 */
export interface QueryProjectsByReferenceIdResponseSDKType {
  projects: ProjectInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryProjectRequest is the Query/Project request type. */
export interface QueryProjectRequest {
  /** project_id is the unique identifier of the project to query. */
  projectId: string;
}
/** QueryProjectRequest is the Query/Project request type. */
export interface QueryProjectRequestSDKType {
  project_id: string;
}
/** QueryProjectResponse is the Query/Project response type. */
export interface QueryProjectResponse {
  /** project is the fetched project. */
  project: ProjectInfo;
}
/** QueryProjectResponse is the Query/Project response type. */
export interface QueryProjectResponseSDKType {
  project: ProjectInfoSDKType;
}
/** QueryBatchesRequest is the Query/Batches request type. */
export interface QueryBatchesRequest {
  /** project_id is the unique identifier of the project to query. */
  projectId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryBatchesRequest is the Query/Batches request type. */
export interface QueryBatchesRequestSDKType {
  project_id: string;
  pagination: PageRequestSDKType;
}
/** QueryBatchesResponse is the Query/Batches response type. */
export interface QueryBatchesResponse {
  /** batches are the fetched credit batches. */
  batches: BatchInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryBatchesResponse is the Query/Batches response type. */
export interface QueryBatchesResponseSDKType {
  batches: BatchInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryBatchesByIssuerRequest is the Query/BatchesByIssuer request type. */
export interface QueryBatchesByIssuerRequest {
  /** issuer is the address that issued the batch */
  issuer: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryBatchesByIssuerRequest is the Query/BatchesByIssuer request type. */
export interface QueryBatchesByIssuerRequestSDKType {
  issuer: string;
  pagination: PageRequestSDKType;
}
/** QueryBatchesByIssuerResponse is the Query/BatchesByIssuer response type. */
export interface QueryBatchesByIssuerResponse {
  /** batches are the fetched credit batches. */
  batches: BatchInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryBatchesByIssuerResponse is the Query/BatchesByIssuer response type. */
export interface QueryBatchesByIssuerResponseSDKType {
  batches: BatchInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryBatchesByClassRequest is the Query/BatchesByClass request type. */
export interface QueryBatchesByClassRequest {
  /** class_id is the unique identifier of the credit class to query. */
  classId: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryBatchesByClassRequest is the Query/BatchesByClass request type. */
export interface QueryBatchesByClassRequestSDKType {
  class_id: string;
  pagination: PageRequestSDKType;
}
/** QueryBatchesByClassResponse is the Query/BatchesByClass response type. */
export interface QueryBatchesByClassResponse {
  /** batches are the fetched credit batches. */
  batches: BatchInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryBatchesByClassResponse is the Query/BatchesByClass response type. */
export interface QueryBatchesByClassResponseSDKType {
  batches: BatchInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QueryBatchRequest is the Query/Batch request type. */
export interface QueryBatchRequest {
  /** batch_denom is the unique identifier of the credit batch to query. */
  batchDenom: string;
}
/** QueryBatchRequest is the Query/Batch request type. */
export interface QueryBatchRequestSDKType {
  batch_denom: string;
}
/** QueryBatchResponse is the Query/Batch response type. */
export interface QueryBatchResponse {
  /** batch is the fetched credit batch. */
  batch: BatchInfo;
}
/** QueryBatchResponse is the Query/Batch response type. */
export interface QueryBatchResponseSDKType {
  batch: BatchInfoSDKType;
}
/** QueryBalanceRequest is the Query/Balance request type. */
export interface QueryBalanceRequest {
  /** account is the address of the account whose balance is being queried. */
  account: string;
  /** batch_denom is the unique identifier of the credit batch to query. */
  batchDenom: string;
}
/** QueryBalanceRequest is the Query/Balance request type. */
export interface QueryBalanceRequestSDKType {
  account: string;
  batch_denom: string;
}
/** QueryBalanceResponse is the Query/Balance response type. */
export interface QueryBalanceResponse {
  /** balance is the balance of the given account. */
  balance: BatchBalanceInfo;
}
/** QueryBalanceResponse is the Query/Balance response type. */
export interface QueryBalanceResponseSDKType {
  balance: BatchBalanceInfoSDKType;
}
/** QueryBalancesRequest is the Query/Balances request type. */
export interface QueryBalancesRequest {
  /** account is the address of the account whose balance is being queried. */
  account: string;
  /** pagination defines an optional pagination for the request. */
  pagination: PageRequest;
}
/** QueryBalancesRequest is the Query/Balances request type. */
export interface QueryBalancesRequestSDKType {
  account: string;
  pagination: PageRequestSDKType;
}
/** QueryBalancesResponse is the Query/Balances response type. */
export interface QueryBalancesResponse {
  /**
   * balances are a list of balances from different credit batches that the
   * account holds.
   */
  balances: BatchBalanceInfo[];
  /** pagination defines the pagination in the response. */
  pagination: PageResponse;
}
/** QueryBalancesResponse is the Query/Balances response type. */
export interface QueryBalancesResponseSDKType {
  balances: BatchBalanceInfoSDKType[];
  pagination: PageResponseSDKType;
}
/** QuerySupplyRequest is the Query/Supply request type. */
export interface QuerySupplyRequest {
  /** batch_denom is the unique identifier of the credit batch to query. */
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
  /**
   * cancelled_amount is the decimal number of cancelled credits in the batch
   * supply.
   */
  cancelledAmount: string;
}
/** QuerySupplyResponse is the Query/Supply response type. */
export interface QuerySupplyResponseSDKType {
  tradable_supply: string;
  retired_supply: string;
  cancelled_amount: string;
}
/** QueryCreditTypesRequest is the Query/Credit_Types request type */
export interface QueryCreditTypesRequest {}
/** QueryCreditTypesRequest is the Query/Credit_Types request type */
export interface QueryCreditTypesRequestSDKType {}
/** QueryCreditTypesRequest is the Query/Credit_Types response type */
export interface QueryCreditTypesResponse {
  /** credit_types are the fetched credit types. */
  creditTypes: CreditType[];
}
/** QueryCreditTypesRequest is the Query/Credit_Types response type */
export interface QueryCreditTypesResponseSDKType {
  credit_types: CreditTypeSDKType[];
}
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
/** ClassInfo is the human-readable credit class information. */
export interface ClassInfo {
  /** id is the unique identifier of the credit class. */
  id: string;
  /** admin is the admin of the credit class. */
  admin: string;
  /** metadata is the arbitrary metadata attached to the credit class. */
  metadata: string;
  /**
   * credit_type_abbrev is the abbreviation of the credit type within which this
   * credit class was created.
   */
  creditTypeAbbrev: string;
}
/** ClassInfo is the human-readable credit class information. */
export interface ClassInfoSDKType {
  id: string;
  admin: string;
  metadata: string;
  credit_type_abbrev: string;
}
/** ProjectInfo is the human-readable project information. */
export interface ProjectInfo {
  /** id is the unique identifier of the project. */
  id: string;
  /** admin is the admin of the project. */
  admin: string;
  /**
   * class_id is the unique identifier of the credit class within which the
   * project was created.
   */
  classId: string;
  /**
   * jurisdiction is the jurisdiction of the project. Full documentation can be
   * found in MsgCreateProject.jurisdiction.
   */
  jurisdiction: string;
  /** metadata is the arbitrary metadata attached to the project. */
  metadata: string;
  /** reference_id is any arbitrary string that can be use to reference project. */
  referenceId: string;
}
/** ProjectInfo is the human-readable project information. */
export interface ProjectInfoSDKType {
  id: string;
  admin: string;
  class_id: string;
  jurisdiction: string;
  metadata: string;
  reference_id: string;
}
/** BatchInfo is the human-readable credit batch information. */
export interface BatchInfo {
  /**
   * issuer is the address that created the batch and the address authorized to
   * mint new credits to the credit batch if the credit batch is open.
   */
  issuer: string;
  /**
   * project_id is the unique identifier of the project within which this credit
   * batch was created.
   */
  projectId: string;
  /**
   * denom is the unique identifier of the credit batch formed from the project
   * name, batch sequence number and dates.
   */
  denom: string;
  /** metadata is any arbitrary metadata attached to the credit batch. */
  metadata: string;
  /**
   * start_date is the beginning of the period during which this credit batch
   * was quantified and verified.
   */
  startDate: Date;
  /**
   * end_date is the end of the period during which this credit batch was
   * quantified and verified.
   */
  endDate: Date;
  /** issuance_date is the timestamp when the credit batch was issued. */
  issuanceDate: Date;
  /**
   * open determines whether or not the credit batch is open, i.e. whether or
   * not new credits can be minted to the credit batch.
   */
  open: boolean;
}
/** BatchInfo is the human-readable credit batch information. */
export interface BatchInfoSDKType {
  issuer: string;
  project_id: string;
  denom: string;
  metadata: string;
  start_date: Date;
  end_date: Date;
  issuance_date: Date;
  open: boolean;
}
/** BatchBalanceInfo is the human-readable batch balance information. */
export interface BatchBalanceInfo {
  /** address is the address of the credit holder. */
  address: string;
  /** batch_denom is the unique identifier of the credit batch. */
  batchDenom: string;
  /** tradable is the tradable amount of credits. */
  tradable: string;
  /** retired is the retired amount of credits. */
  retired: string;
  /** escrowed is the amount of credits locked up in escrow for the marketplace. */
  escrowed: string;
}
/** BatchBalanceInfo is the human-readable batch balance information. */
export interface BatchBalanceInfoSDKType {
  address: string;
  batch_denom: string;
  tradable: string;
  retired: string;
  escrowed: string;
}
function createBaseQueryClassesRequest(): QueryClassesRequest {
  return {
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryClassesRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryClassesRequest",
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
      typeUrl: "/regen.ecocredit.v1.QueryClassesRequest",
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
  typeUrl: "/regen.ecocredit.v1.QueryClassesResponse",
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
      typeUrl: "/regen.ecocredit.v1.QueryClassesResponse",
      value: QueryClassesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClassesByAdminRequest(): QueryClassesByAdminRequest {
  return {
    admin: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryClassesByAdminRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryClassesByAdminRequest",
  encode(message: QueryClassesByAdminRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.admin !== "") {
      writer.uint32(10).string(message.admin);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassesByAdminRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassesByAdminRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.admin = reader.string();
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
  fromPartial(object: Partial<QueryClassesByAdminRequest>): QueryClassesByAdminRequest {
    const message = createBaseQueryClassesByAdminRequest();
    message.admin = object.admin ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassesByAdminRequestAmino): QueryClassesByAdminRequest {
    return {
      admin: object.admin,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassesByAdminRequest): QueryClassesByAdminRequestAmino {
    const obj: any = {};
    obj.admin = message.admin;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassesByAdminRequestAminoMsg): QueryClassesByAdminRequest {
    return QueryClassesByAdminRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassesByAdminRequestProtoMsg): QueryClassesByAdminRequest {
    return QueryClassesByAdminRequest.decode(message.value);
  },
  toProto(message: QueryClassesByAdminRequest): Uint8Array {
    return QueryClassesByAdminRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClassesByAdminRequest): QueryClassesByAdminRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassesByAdminRequest",
      value: QueryClassesByAdminRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClassesByAdminResponse(): QueryClassesByAdminResponse {
  return {
    classes: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryClassesByAdminResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryClassesByAdminResponse",
  encode(message: QueryClassesByAdminResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.classes) {
      ClassInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassesByAdminResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassesByAdminResponse();
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
  fromPartial(object: Partial<QueryClassesByAdminResponse>): QueryClassesByAdminResponse {
    const message = createBaseQueryClassesByAdminResponse();
    message.classes = object.classes?.map(e => ClassInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassesByAdminResponseAmino): QueryClassesByAdminResponse {
    return {
      classes: Array.isArray(object?.classes) ? object.classes.map((e: any) => ClassInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassesByAdminResponse): QueryClassesByAdminResponseAmino {
    const obj: any = {};
    if (message.classes) {
      obj.classes = message.classes.map(e => e ? ClassInfo.toAmino(e) : undefined);
    } else {
      obj.classes = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassesByAdminResponseAminoMsg): QueryClassesByAdminResponse {
    return QueryClassesByAdminResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassesByAdminResponseProtoMsg): QueryClassesByAdminResponse {
    return QueryClassesByAdminResponse.decode(message.value);
  },
  toProto(message: QueryClassesByAdminResponse): Uint8Array {
    return QueryClassesByAdminResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClassesByAdminResponse): QueryClassesByAdminResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassesByAdminResponse",
      value: QueryClassesByAdminResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClassRequest(): QueryClassRequest {
  return {
    classId: ""
  };
}
export const QueryClassRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryClassRequest",
  encode(message: QueryClassRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassRequest();
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
  fromPartial(object: Partial<QueryClassRequest>): QueryClassRequest {
    const message = createBaseQueryClassRequest();
    message.classId = object.classId ?? "";
    return message;
  },
  fromAmino(object: QueryClassRequestAmino): QueryClassRequest {
    return {
      classId: object.class_id
    };
  },
  toAmino(message: QueryClassRequest): QueryClassRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    return obj;
  },
  fromAminoMsg(object: QueryClassRequestAminoMsg): QueryClassRequest {
    return QueryClassRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassRequestProtoMsg): QueryClassRequest {
    return QueryClassRequest.decode(message.value);
  },
  toProto(message: QueryClassRequest): Uint8Array {
    return QueryClassRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClassRequest): QueryClassRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassRequest",
      value: QueryClassRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClassResponse(): QueryClassResponse {
  return {
    class: ClassInfo.fromPartial({})
  };
}
export const QueryClassResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryClassResponse",
  encode(message: QueryClassResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.class !== undefined) {
      ClassInfo.encode(message.class, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.class = ClassInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClassResponse>): QueryClassResponse {
    const message = createBaseQueryClassResponse();
    message.class = object.class !== undefined && object.class !== null ? ClassInfo.fromPartial(object.class) : undefined;
    return message;
  },
  fromAmino(object: QueryClassResponseAmino): QueryClassResponse {
    return {
      class: object?.class ? ClassInfo.fromAmino(object.class) : undefined
    };
  },
  toAmino(message: QueryClassResponse): QueryClassResponseAmino {
    const obj: any = {};
    obj.class = message.class ? ClassInfo.toAmino(message.class) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassResponseAminoMsg): QueryClassResponse {
    return QueryClassResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassResponseProtoMsg): QueryClassResponse {
    return QueryClassResponse.decode(message.value);
  },
  toProto(message: QueryClassResponse): Uint8Array {
    return QueryClassResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClassResponse): QueryClassResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassResponse",
      value: QueryClassResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClassIssuersRequest(): QueryClassIssuersRequest {
  return {
    classId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryClassIssuersRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryClassIssuersRequest",
  encode(message: QueryClassIssuersRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassIssuersRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassIssuersRequest();
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
  fromPartial(object: Partial<QueryClassIssuersRequest>): QueryClassIssuersRequest {
    const message = createBaseQueryClassIssuersRequest();
    message.classId = object.classId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassIssuersRequestAmino): QueryClassIssuersRequest {
    return {
      classId: object.class_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassIssuersRequest): QueryClassIssuersRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassIssuersRequestAminoMsg): QueryClassIssuersRequest {
    return QueryClassIssuersRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassIssuersRequestProtoMsg): QueryClassIssuersRequest {
    return QueryClassIssuersRequest.decode(message.value);
  },
  toProto(message: QueryClassIssuersRequest): Uint8Array {
    return QueryClassIssuersRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClassIssuersRequest): QueryClassIssuersRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassIssuersRequest",
      value: QueryClassIssuersRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClassIssuersResponse(): QueryClassIssuersResponse {
  return {
    issuers: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryClassIssuersResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryClassIssuersResponse",
  encode(message: QueryClassIssuersResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.issuers) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClassIssuersResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassIssuersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issuers.push(reader.string());
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
  fromPartial(object: Partial<QueryClassIssuersResponse>): QueryClassIssuersResponse {
    const message = createBaseQueryClassIssuersResponse();
    message.issuers = object.issuers?.map(e => e) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClassIssuersResponseAmino): QueryClassIssuersResponse {
    return {
      issuers: Array.isArray(object?.issuers) ? object.issuers.map((e: any) => e) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClassIssuersResponse): QueryClassIssuersResponseAmino {
    const obj: any = {};
    if (message.issuers) {
      obj.issuers = message.issuers.map(e => e);
    } else {
      obj.issuers = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClassIssuersResponseAminoMsg): QueryClassIssuersResponse {
    return QueryClassIssuersResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryClassIssuersResponseProtoMsg): QueryClassIssuersResponse {
    return QueryClassIssuersResponse.decode(message.value);
  },
  toProto(message: QueryClassIssuersResponse): Uint8Array {
    return QueryClassIssuersResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClassIssuersResponse): QueryClassIssuersResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryClassIssuersResponse",
      value: QueryClassIssuersResponse.encode(message).finish()
    };
  }
};
function createBaseQueryProjectsRequest(): QueryProjectsRequest {
  return {
    classId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryProjectsRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectsRequest",
  encode(message: QueryProjectsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectsRequest();
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
  fromPartial(object: Partial<QueryProjectsRequest>): QueryProjectsRequest {
    const message = createBaseQueryProjectsRequest();
    message.classId = object.classId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProjectsRequestAmino): QueryProjectsRequest {
    return {
      classId: object.class_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryProjectsRequest): QueryProjectsRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProjectsRequestAminoMsg): QueryProjectsRequest {
    return QueryProjectsRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectsRequestProtoMsg): QueryProjectsRequest {
    return QueryProjectsRequest.decode(message.value);
  },
  toProto(message: QueryProjectsRequest): Uint8Array {
    return QueryProjectsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectsRequest): QueryProjectsRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectsRequest",
      value: QueryProjectsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProjectsResponse(): QueryProjectsResponse {
  return {
    projects: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryProjectsResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectsResponse",
  encode(message: QueryProjectsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.projects) {
      ProjectInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projects.push(ProjectInfo.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryProjectsResponse>): QueryProjectsResponse {
    const message = createBaseQueryProjectsResponse();
    message.projects = object.projects?.map(e => ProjectInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProjectsResponseAmino): QueryProjectsResponse {
    return {
      projects: Array.isArray(object?.projects) ? object.projects.map((e: any) => ProjectInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryProjectsResponse): QueryProjectsResponseAmino {
    const obj: any = {};
    if (message.projects) {
      obj.projects = message.projects.map(e => e ? ProjectInfo.toAmino(e) : undefined);
    } else {
      obj.projects = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProjectsResponseAminoMsg): QueryProjectsResponse {
    return QueryProjectsResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectsResponseProtoMsg): QueryProjectsResponse {
    return QueryProjectsResponse.decode(message.value);
  },
  toProto(message: QueryProjectsResponse): Uint8Array {
    return QueryProjectsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectsResponse): QueryProjectsResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectsResponse",
      value: QueryProjectsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryProjectsByReferenceIdRequest(): QueryProjectsByReferenceIdRequest {
  return {
    referenceId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryProjectsByReferenceIdRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectsByReferenceIdRequest",
  encode(message: QueryProjectsByReferenceIdRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.referenceId !== "") {
      writer.uint32(10).string(message.referenceId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectsByReferenceIdRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectsByReferenceIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.referenceId = reader.string();
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
  fromPartial(object: Partial<QueryProjectsByReferenceIdRequest>): QueryProjectsByReferenceIdRequest {
    const message = createBaseQueryProjectsByReferenceIdRequest();
    message.referenceId = object.referenceId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProjectsByReferenceIdRequestAmino): QueryProjectsByReferenceIdRequest {
    return {
      referenceId: object.reference_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryProjectsByReferenceIdRequest): QueryProjectsByReferenceIdRequestAmino {
    const obj: any = {};
    obj.reference_id = message.referenceId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProjectsByReferenceIdRequestAminoMsg): QueryProjectsByReferenceIdRequest {
    return QueryProjectsByReferenceIdRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectsByReferenceIdRequestProtoMsg): QueryProjectsByReferenceIdRequest {
    return QueryProjectsByReferenceIdRequest.decode(message.value);
  },
  toProto(message: QueryProjectsByReferenceIdRequest): Uint8Array {
    return QueryProjectsByReferenceIdRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectsByReferenceIdRequest): QueryProjectsByReferenceIdRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectsByReferenceIdRequest",
      value: QueryProjectsByReferenceIdRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProjectsByReferenceIdResponse(): QueryProjectsByReferenceIdResponse {
  return {
    projects: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryProjectsByReferenceIdResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectsByReferenceIdResponse",
  encode(message: QueryProjectsByReferenceIdResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.projects) {
      ProjectInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectsByReferenceIdResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectsByReferenceIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projects.push(ProjectInfo.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryProjectsByReferenceIdResponse>): QueryProjectsByReferenceIdResponse {
    const message = createBaseQueryProjectsByReferenceIdResponse();
    message.projects = object.projects?.map(e => ProjectInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryProjectsByReferenceIdResponseAmino): QueryProjectsByReferenceIdResponse {
    return {
      projects: Array.isArray(object?.projects) ? object.projects.map((e: any) => ProjectInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryProjectsByReferenceIdResponse): QueryProjectsByReferenceIdResponseAmino {
    const obj: any = {};
    if (message.projects) {
      obj.projects = message.projects.map(e => e ? ProjectInfo.toAmino(e) : undefined);
    } else {
      obj.projects = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProjectsByReferenceIdResponseAminoMsg): QueryProjectsByReferenceIdResponse {
    return QueryProjectsByReferenceIdResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectsByReferenceIdResponseProtoMsg): QueryProjectsByReferenceIdResponse {
    return QueryProjectsByReferenceIdResponse.decode(message.value);
  },
  toProto(message: QueryProjectsByReferenceIdResponse): Uint8Array {
    return QueryProjectsByReferenceIdResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectsByReferenceIdResponse): QueryProjectsByReferenceIdResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectsByReferenceIdResponse",
      value: QueryProjectsByReferenceIdResponse.encode(message).finish()
    };
  }
};
function createBaseQueryProjectRequest(): QueryProjectRequest {
  return {
    projectId: ""
  };
}
export const QueryProjectRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectRequest",
  encode(message: QueryProjectRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.projectId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryProjectRequest>): QueryProjectRequest {
    const message = createBaseQueryProjectRequest();
    message.projectId = object.projectId ?? "";
    return message;
  },
  fromAmino(object: QueryProjectRequestAmino): QueryProjectRequest {
    return {
      projectId: object.project_id
    };
  },
  toAmino(message: QueryProjectRequest): QueryProjectRequestAmino {
    const obj: any = {};
    obj.project_id = message.projectId;
    return obj;
  },
  fromAminoMsg(object: QueryProjectRequestAminoMsg): QueryProjectRequest {
    return QueryProjectRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectRequestProtoMsg): QueryProjectRequest {
    return QueryProjectRequest.decode(message.value);
  },
  toProto(message: QueryProjectRequest): Uint8Array {
    return QueryProjectRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectRequest): QueryProjectRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectRequest",
      value: QueryProjectRequest.encode(message).finish()
    };
  }
};
function createBaseQueryProjectResponse(): QueryProjectResponse {
  return {
    project: ProjectInfo.fromPartial({})
  };
}
export const QueryProjectResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryProjectResponse",
  encode(message: QueryProjectResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.project !== undefined) {
      ProjectInfo.encode(message.project, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryProjectResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryProjectResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.project = ProjectInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryProjectResponse>): QueryProjectResponse {
    const message = createBaseQueryProjectResponse();
    message.project = object.project !== undefined && object.project !== null ? ProjectInfo.fromPartial(object.project) : undefined;
    return message;
  },
  fromAmino(object: QueryProjectResponseAmino): QueryProjectResponse {
    return {
      project: object?.project ? ProjectInfo.fromAmino(object.project) : undefined
    };
  },
  toAmino(message: QueryProjectResponse): QueryProjectResponseAmino {
    const obj: any = {};
    obj.project = message.project ? ProjectInfo.toAmino(message.project) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryProjectResponseAminoMsg): QueryProjectResponse {
    return QueryProjectResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryProjectResponseProtoMsg): QueryProjectResponse {
    return QueryProjectResponse.decode(message.value);
  },
  toProto(message: QueryProjectResponse): Uint8Array {
    return QueryProjectResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryProjectResponse): QueryProjectResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryProjectResponse",
      value: QueryProjectResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesRequest(): QueryBatchesRequest {
  return {
    projectId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryBatchesRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchesRequest",
  encode(message: QueryBatchesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.projectId !== "") {
      writer.uint32(10).string(message.projectId);
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
          message.projectId = reader.string();
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
    message.projectId = object.projectId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesRequestAmino): QueryBatchesRequest {
    return {
      projectId: object.project_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesRequest): QueryBatchesRequestAmino {
    const obj: any = {};
    obj.project_id = message.projectId;
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
      typeUrl: "/regen.ecocredit.v1.QueryBatchesRequest",
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
  typeUrl: "/regen.ecocredit.v1.QueryBatchesResponse",
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
      typeUrl: "/regen.ecocredit.v1.QueryBatchesResponse",
      value: QueryBatchesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesByIssuerRequest(): QueryBatchesByIssuerRequest {
  return {
    issuer: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryBatchesByIssuerRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchesByIssuerRequest",
  encode(message: QueryBatchesByIssuerRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesByIssuerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesByIssuerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issuer = reader.string();
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
  fromPartial(object: Partial<QueryBatchesByIssuerRequest>): QueryBatchesByIssuerRequest {
    const message = createBaseQueryBatchesByIssuerRequest();
    message.issuer = object.issuer ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesByIssuerRequestAmino): QueryBatchesByIssuerRequest {
    return {
      issuer: object.issuer,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesByIssuerRequest): QueryBatchesByIssuerRequestAmino {
    const obj: any = {};
    obj.issuer = message.issuer;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesByIssuerRequestAminoMsg): QueryBatchesByIssuerRequest {
    return QueryBatchesByIssuerRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesByIssuerRequestProtoMsg): QueryBatchesByIssuerRequest {
    return QueryBatchesByIssuerRequest.decode(message.value);
  },
  toProto(message: QueryBatchesByIssuerRequest): Uint8Array {
    return QueryBatchesByIssuerRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesByIssuerRequest): QueryBatchesByIssuerRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchesByIssuerRequest",
      value: QueryBatchesByIssuerRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesByIssuerResponse(): QueryBatchesByIssuerResponse {
  return {
    batches: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryBatchesByIssuerResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchesByIssuerResponse",
  encode(message: QueryBatchesByIssuerResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.batches) {
      BatchInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesByIssuerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesByIssuerResponse();
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
  fromPartial(object: Partial<QueryBatchesByIssuerResponse>): QueryBatchesByIssuerResponse {
    const message = createBaseQueryBatchesByIssuerResponse();
    message.batches = object.batches?.map(e => BatchInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesByIssuerResponseAmino): QueryBatchesByIssuerResponse {
    return {
      batches: Array.isArray(object?.batches) ? object.batches.map((e: any) => BatchInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesByIssuerResponse): QueryBatchesByIssuerResponseAmino {
    const obj: any = {};
    if (message.batches) {
      obj.batches = message.batches.map(e => e ? BatchInfo.toAmino(e) : undefined);
    } else {
      obj.batches = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesByIssuerResponseAminoMsg): QueryBatchesByIssuerResponse {
    return QueryBatchesByIssuerResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesByIssuerResponseProtoMsg): QueryBatchesByIssuerResponse {
    return QueryBatchesByIssuerResponse.decode(message.value);
  },
  toProto(message: QueryBatchesByIssuerResponse): Uint8Array {
    return QueryBatchesByIssuerResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesByIssuerResponse): QueryBatchesByIssuerResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchesByIssuerResponse",
      value: QueryBatchesByIssuerResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesByClassRequest(): QueryBatchesByClassRequest {
  return {
    classId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryBatchesByClassRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchesByClassRequest",
  encode(message: QueryBatchesByClassRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesByClassRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesByClassRequest();
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
  fromPartial(object: Partial<QueryBatchesByClassRequest>): QueryBatchesByClassRequest {
    const message = createBaseQueryBatchesByClassRequest();
    message.classId = object.classId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesByClassRequestAmino): QueryBatchesByClassRequest {
    return {
      classId: object.class_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesByClassRequest): QueryBatchesByClassRequestAmino {
    const obj: any = {};
    obj.class_id = message.classId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesByClassRequestAminoMsg): QueryBatchesByClassRequest {
    return QueryBatchesByClassRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesByClassRequestProtoMsg): QueryBatchesByClassRequest {
    return QueryBatchesByClassRequest.decode(message.value);
  },
  toProto(message: QueryBatchesByClassRequest): Uint8Array {
    return QueryBatchesByClassRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesByClassRequest): QueryBatchesByClassRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchesByClassRequest",
      value: QueryBatchesByClassRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBatchesByClassResponse(): QueryBatchesByClassResponse {
  return {
    batches: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryBatchesByClassResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchesByClassResponse",
  encode(message: QueryBatchesByClassResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.batches) {
      BatchInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchesByClassResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchesByClassResponse();
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
  fromPartial(object: Partial<QueryBatchesByClassResponse>): QueryBatchesByClassResponse {
    const message = createBaseQueryBatchesByClassResponse();
    message.batches = object.batches?.map(e => BatchInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchesByClassResponseAmino): QueryBatchesByClassResponse {
    return {
      batches: Array.isArray(object?.batches) ? object.batches.map((e: any) => BatchInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBatchesByClassResponse): QueryBatchesByClassResponseAmino {
    const obj: any = {};
    if (message.batches) {
      obj.batches = message.batches.map(e => e ? BatchInfo.toAmino(e) : undefined);
    } else {
      obj.batches = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchesByClassResponseAminoMsg): QueryBatchesByClassResponse {
    return QueryBatchesByClassResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchesByClassResponseProtoMsg): QueryBatchesByClassResponse {
    return QueryBatchesByClassResponse.decode(message.value);
  },
  toProto(message: QueryBatchesByClassResponse): Uint8Array {
    return QueryBatchesByClassResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchesByClassResponse): QueryBatchesByClassResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchesByClassResponse",
      value: QueryBatchesByClassResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBatchRequest(): QueryBatchRequest {
  return {
    batchDenom: ""
  };
}
export const QueryBatchRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchRequest",
  encode(message: QueryBatchRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batchDenom !== "") {
      writer.uint32(10).string(message.batchDenom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchRequest();
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
  fromPartial(object: Partial<QueryBatchRequest>): QueryBatchRequest {
    const message = createBaseQueryBatchRequest();
    message.batchDenom = object.batchDenom ?? "";
    return message;
  },
  fromAmino(object: QueryBatchRequestAmino): QueryBatchRequest {
    return {
      batchDenom: object.batch_denom
    };
  },
  toAmino(message: QueryBatchRequest): QueryBatchRequestAmino {
    const obj: any = {};
    obj.batch_denom = message.batchDenom;
    return obj;
  },
  fromAminoMsg(object: QueryBatchRequestAminoMsg): QueryBatchRequest {
    return QueryBatchRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchRequestProtoMsg): QueryBatchRequest {
    return QueryBatchRequest.decode(message.value);
  },
  toProto(message: QueryBatchRequest): Uint8Array {
    return QueryBatchRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchRequest): QueryBatchRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchRequest",
      value: QueryBatchRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBatchResponse(): QueryBatchResponse {
  return {
    batch: BatchInfo.fromPartial({})
  };
}
export const QueryBatchResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryBatchResponse",
  encode(message: QueryBatchResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.batch !== undefined) {
      BatchInfo.encode(message.batch, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBatchResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBatchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.batch = BatchInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryBatchResponse>): QueryBatchResponse {
    const message = createBaseQueryBatchResponse();
    message.batch = object.batch !== undefined && object.batch !== null ? BatchInfo.fromPartial(object.batch) : undefined;
    return message;
  },
  fromAmino(object: QueryBatchResponseAmino): QueryBatchResponse {
    return {
      batch: object?.batch ? BatchInfo.fromAmino(object.batch) : undefined
    };
  },
  toAmino(message: QueryBatchResponse): QueryBatchResponseAmino {
    const obj: any = {};
    obj.batch = message.batch ? BatchInfo.toAmino(message.batch) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBatchResponseAminoMsg): QueryBatchResponse {
    return QueryBatchResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBatchResponseProtoMsg): QueryBatchResponse {
    return QueryBatchResponse.decode(message.value);
  },
  toProto(message: QueryBatchResponse): Uint8Array {
    return QueryBatchResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBatchResponse): QueryBatchResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBatchResponse",
      value: QueryBatchResponse.encode(message).finish()
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
  typeUrl: "/regen.ecocredit.v1.QueryBalanceRequest",
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
      typeUrl: "/regen.ecocredit.v1.QueryBalanceRequest",
      value: QueryBalanceRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBalanceResponse(): QueryBalanceResponse {
  return {
    balance: BatchBalanceInfo.fromPartial({})
  };
}
export const QueryBalanceResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryBalanceResponse",
  encode(message: QueryBalanceResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.balance !== undefined) {
      BatchBalanceInfo.encode(message.balance, writer.uint32(10).fork()).ldelim();
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
          message.balance = BatchBalanceInfo.decode(reader, reader.uint32());
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
    message.balance = object.balance !== undefined && object.balance !== null ? BatchBalanceInfo.fromPartial(object.balance) : undefined;
    return message;
  },
  fromAmino(object: QueryBalanceResponseAmino): QueryBalanceResponse {
    return {
      balance: object?.balance ? BatchBalanceInfo.fromAmino(object.balance) : undefined
    };
  },
  toAmino(message: QueryBalanceResponse): QueryBalanceResponseAmino {
    const obj: any = {};
    obj.balance = message.balance ? BatchBalanceInfo.toAmino(message.balance) : undefined;
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
      typeUrl: "/regen.ecocredit.v1.QueryBalanceResponse",
      value: QueryBalanceResponse.encode(message).finish()
    };
  }
};
function createBaseQueryBalancesRequest(): QueryBalancesRequest {
  return {
    account: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryBalancesRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryBalancesRequest",
  encode(message: QueryBalancesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.account !== "") {
      writer.uint32(10).string(message.account);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalancesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalancesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.account = reader.string();
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
  fromPartial(object: Partial<QueryBalancesRequest>): QueryBalancesRequest {
    const message = createBaseQueryBalancesRequest();
    message.account = object.account ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBalancesRequestAmino): QueryBalancesRequest {
    return {
      account: object.account,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBalancesRequest): QueryBalancesRequestAmino {
    const obj: any = {};
    obj.account = message.account;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBalancesRequestAminoMsg): QueryBalancesRequest {
    return QueryBalancesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBalancesRequestProtoMsg): QueryBalancesRequest {
    return QueryBalancesRequest.decode(message.value);
  },
  toProto(message: QueryBalancesRequest): Uint8Array {
    return QueryBalancesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryBalancesRequest): QueryBalancesRequestProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBalancesRequest",
      value: QueryBalancesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryBalancesResponse(): QueryBalancesResponse {
  return {
    balances: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryBalancesResponse = {
  typeUrl: "/regen.ecocredit.v1.QueryBalancesResponse",
  encode(message: QueryBalancesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.balances) {
      BatchBalanceInfo.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryBalancesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryBalancesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.balances.push(BatchBalanceInfo.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryBalancesResponse>): QueryBalancesResponse {
    const message = createBaseQueryBalancesResponse();
    message.balances = object.balances?.map(e => BatchBalanceInfo.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryBalancesResponseAmino): QueryBalancesResponse {
    return {
      balances: Array.isArray(object?.balances) ? object.balances.map((e: any) => BatchBalanceInfo.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryBalancesResponse): QueryBalancesResponseAmino {
    const obj: any = {};
    if (message.balances) {
      obj.balances = message.balances.map(e => e ? BatchBalanceInfo.toAmino(e) : undefined);
    } else {
      obj.balances = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryBalancesResponseAminoMsg): QueryBalancesResponse {
    return QueryBalancesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryBalancesResponseProtoMsg): QueryBalancesResponse {
    return QueryBalancesResponse.decode(message.value);
  },
  toProto(message: QueryBalancesResponse): Uint8Array {
    return QueryBalancesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryBalancesResponse): QueryBalancesResponseProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.QueryBalancesResponse",
      value: QueryBalancesResponse.encode(message).finish()
    };
  }
};
function createBaseQuerySupplyRequest(): QuerySupplyRequest {
  return {
    batchDenom: ""
  };
}
export const QuerySupplyRequest = {
  typeUrl: "/regen.ecocredit.v1.QuerySupplyRequest",
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
      typeUrl: "/regen.ecocredit.v1.QuerySupplyRequest",
      value: QuerySupplyRequest.encode(message).finish()
    };
  }
};
function createBaseQuerySupplyResponse(): QuerySupplyResponse {
  return {
    tradableSupply: "",
    retiredSupply: "",
    cancelledAmount: ""
  };
}
export const QuerySupplyResponse = {
  typeUrl: "/regen.ecocredit.v1.QuerySupplyResponse",
  encode(message: QuerySupplyResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tradableSupply !== "") {
      writer.uint32(10).string(message.tradableSupply);
    }
    if (message.retiredSupply !== "") {
      writer.uint32(18).string(message.retiredSupply);
    }
    if (message.cancelledAmount !== "") {
      writer.uint32(26).string(message.cancelledAmount);
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
        case 3:
          message.cancelledAmount = reader.string();
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
    message.cancelledAmount = object.cancelledAmount ?? "";
    return message;
  },
  fromAmino(object: QuerySupplyResponseAmino): QuerySupplyResponse {
    return {
      tradableSupply: object.tradable_supply,
      retiredSupply: object.retired_supply,
      cancelledAmount: object.cancelled_amount
    };
  },
  toAmino(message: QuerySupplyResponse): QuerySupplyResponseAmino {
    const obj: any = {};
    obj.tradable_supply = message.tradableSupply;
    obj.retired_supply = message.retiredSupply;
    obj.cancelled_amount = message.cancelledAmount;
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
      typeUrl: "/regen.ecocredit.v1.QuerySupplyResponse",
      value: QuerySupplyResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCreditTypesRequest(): QueryCreditTypesRequest {
  return {};
}
export const QueryCreditTypesRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryCreditTypesRequest",
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
      typeUrl: "/regen.ecocredit.v1.QueryCreditTypesRequest",
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
  typeUrl: "/regen.ecocredit.v1.QueryCreditTypesResponse",
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
      typeUrl: "/regen.ecocredit.v1.QueryCreditTypesResponse",
      value: QueryCreditTypesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/regen.ecocredit.v1.QueryParamsRequest",
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
      typeUrl: "/regen.ecocredit.v1.QueryParamsRequest",
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
  typeUrl: "/regen.ecocredit.v1.QueryParamsResponse",
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
      typeUrl: "/regen.ecocredit.v1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseClassInfo(): ClassInfo {
  return {
    id: "",
    admin: "",
    metadata: "",
    creditTypeAbbrev: ""
  };
}
export const ClassInfo = {
  typeUrl: "/regen.ecocredit.v1.ClassInfo",
  encode(message: ClassInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.creditTypeAbbrev !== "") {
      writer.uint32(34).string(message.creditTypeAbbrev);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ClassInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.admin = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.creditTypeAbbrev = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ClassInfo>): ClassInfo {
    const message = createBaseClassInfo();
    message.id = object.id ?? "";
    message.admin = object.admin ?? "";
    message.metadata = object.metadata ?? "";
    message.creditTypeAbbrev = object.creditTypeAbbrev ?? "";
    return message;
  },
  fromAmino(object: ClassInfoAmino): ClassInfo {
    return {
      id: object.id,
      admin: object.admin,
      metadata: object.metadata,
      creditTypeAbbrev: object.credit_type_abbrev
    };
  },
  toAmino(message: ClassInfo): ClassInfoAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.admin = message.admin;
    obj.metadata = message.metadata;
    obj.credit_type_abbrev = message.creditTypeAbbrev;
    return obj;
  },
  fromAminoMsg(object: ClassInfoAminoMsg): ClassInfo {
    return ClassInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ClassInfoProtoMsg): ClassInfo {
    return ClassInfo.decode(message.value);
  },
  toProto(message: ClassInfo): Uint8Array {
    return ClassInfo.encode(message).finish();
  },
  toProtoMsg(message: ClassInfo): ClassInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ClassInfo",
      value: ClassInfo.encode(message).finish()
    };
  }
};
function createBaseProjectInfo(): ProjectInfo {
  return {
    id: "",
    admin: "",
    classId: "",
    jurisdiction: "",
    metadata: "",
    referenceId: ""
  };
}
export const ProjectInfo = {
  typeUrl: "/regen.ecocredit.v1.ProjectInfo",
  encode(message: ProjectInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.admin !== "") {
      writer.uint32(18).string(message.admin);
    }
    if (message.classId !== "") {
      writer.uint32(26).string(message.classId);
    }
    if (message.jurisdiction !== "") {
      writer.uint32(34).string(message.jurisdiction);
    }
    if (message.metadata !== "") {
      writer.uint32(42).string(message.metadata);
    }
    if (message.referenceId !== "") {
      writer.uint32(50).string(message.referenceId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ProjectInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProjectInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.admin = reader.string();
          break;
        case 3:
          message.classId = reader.string();
          break;
        case 4:
          message.jurisdiction = reader.string();
          break;
        case 5:
          message.metadata = reader.string();
          break;
        case 6:
          message.referenceId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ProjectInfo>): ProjectInfo {
    const message = createBaseProjectInfo();
    message.id = object.id ?? "";
    message.admin = object.admin ?? "";
    message.classId = object.classId ?? "";
    message.jurisdiction = object.jurisdiction ?? "";
    message.metadata = object.metadata ?? "";
    message.referenceId = object.referenceId ?? "";
    return message;
  },
  fromAmino(object: ProjectInfoAmino): ProjectInfo {
    return {
      id: object.id,
      admin: object.admin,
      classId: object.class_id,
      jurisdiction: object.jurisdiction,
      metadata: object.metadata,
      referenceId: object.reference_id
    };
  },
  toAmino(message: ProjectInfo): ProjectInfoAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.admin = message.admin;
    obj.class_id = message.classId;
    obj.jurisdiction = message.jurisdiction;
    obj.metadata = message.metadata;
    obj.reference_id = message.referenceId;
    return obj;
  },
  fromAminoMsg(object: ProjectInfoAminoMsg): ProjectInfo {
    return ProjectInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ProjectInfoProtoMsg): ProjectInfo {
    return ProjectInfo.decode(message.value);
  },
  toProto(message: ProjectInfo): Uint8Array {
    return ProjectInfo.encode(message).finish();
  },
  toProtoMsg(message: ProjectInfo): ProjectInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.ProjectInfo",
      value: ProjectInfo.encode(message).finish()
    };
  }
};
function createBaseBatchInfo(): BatchInfo {
  return {
    issuer: "",
    projectId: "",
    denom: "",
    metadata: "",
    startDate: new Date(),
    endDate: new Date(),
    issuanceDate: new Date(),
    open: false
  };
}
export const BatchInfo = {
  typeUrl: "/regen.ecocredit.v1.BatchInfo",
  encode(message: BatchInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.issuer !== "") {
      writer.uint32(10).string(message.issuer);
    }
    if (message.projectId !== "") {
      writer.uint32(18).string(message.projectId);
    }
    if (message.denom !== "") {
      writer.uint32(26).string(message.denom);
    }
    if (message.metadata !== "") {
      writer.uint32(34).string(message.metadata);
    }
    if (message.startDate !== undefined) {
      Timestamp.encode(toTimestamp(message.startDate), writer.uint32(42).fork()).ldelim();
    }
    if (message.endDate !== undefined) {
      Timestamp.encode(toTimestamp(message.endDate), writer.uint32(50).fork()).ldelim();
    }
    if (message.issuanceDate !== undefined) {
      Timestamp.encode(toTimestamp(message.issuanceDate), writer.uint32(58).fork()).ldelim();
    }
    if (message.open === true) {
      writer.uint32(64).bool(message.open);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BatchInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.issuer = reader.string();
          break;
        case 2:
          message.projectId = reader.string();
          break;
        case 3:
          message.denom = reader.string();
          break;
        case 4:
          message.metadata = reader.string();
          break;
        case 5:
          message.startDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 6:
          message.endDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 7:
          message.issuanceDate = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 8:
          message.open = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchInfo>): BatchInfo {
    const message = createBaseBatchInfo();
    message.issuer = object.issuer ?? "";
    message.projectId = object.projectId ?? "";
    message.denom = object.denom ?? "";
    message.metadata = object.metadata ?? "";
    message.startDate = object.startDate ?? undefined;
    message.endDate = object.endDate ?? undefined;
    message.issuanceDate = object.issuanceDate ?? undefined;
    message.open = object.open ?? false;
    return message;
  },
  fromAmino(object: BatchInfoAmino): BatchInfo {
    return {
      issuer: object.issuer,
      projectId: object.project_id,
      denom: object.denom,
      metadata: object.metadata,
      startDate: object.start_date,
      endDate: object.end_date,
      issuanceDate: object.issuance_date,
      open: object.open
    };
  },
  toAmino(message: BatchInfo): BatchInfoAmino {
    const obj: any = {};
    obj.issuer = message.issuer;
    obj.project_id = message.projectId;
    obj.denom = message.denom;
    obj.metadata = message.metadata;
    obj.start_date = message.startDate;
    obj.end_date = message.endDate;
    obj.issuance_date = message.issuanceDate;
    obj.open = message.open;
    return obj;
  },
  fromAminoMsg(object: BatchInfoAminoMsg): BatchInfo {
    return BatchInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchInfoProtoMsg): BatchInfo {
    return BatchInfo.decode(message.value);
  },
  toProto(message: BatchInfo): Uint8Array {
    return BatchInfo.encode(message).finish();
  },
  toProtoMsg(message: BatchInfo): BatchInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchInfo",
      value: BatchInfo.encode(message).finish()
    };
  }
};
function createBaseBatchBalanceInfo(): BatchBalanceInfo {
  return {
    address: "",
    batchDenom: "",
    tradable: "",
    retired: "",
    escrowed: ""
  };
}
export const BatchBalanceInfo = {
  typeUrl: "/regen.ecocredit.v1.BatchBalanceInfo",
  encode(message: BatchBalanceInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.batchDenom !== "") {
      writer.uint32(18).string(message.batchDenom);
    }
    if (message.tradable !== "") {
      writer.uint32(26).string(message.tradable);
    }
    if (message.retired !== "") {
      writer.uint32(34).string(message.retired);
    }
    if (message.escrowed !== "") {
      writer.uint32(42).string(message.escrowed);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): BatchBalanceInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchBalanceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.batchDenom = reader.string();
          break;
        case 3:
          message.tradable = reader.string();
          break;
        case 4:
          message.retired = reader.string();
          break;
        case 5:
          message.escrowed = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<BatchBalanceInfo>): BatchBalanceInfo {
    const message = createBaseBatchBalanceInfo();
    message.address = object.address ?? "";
    message.batchDenom = object.batchDenom ?? "";
    message.tradable = object.tradable ?? "";
    message.retired = object.retired ?? "";
    message.escrowed = object.escrowed ?? "";
    return message;
  },
  fromAmino(object: BatchBalanceInfoAmino): BatchBalanceInfo {
    return {
      address: object.address,
      batchDenom: object.batch_denom,
      tradable: object.tradable,
      retired: object.retired,
      escrowed: object.escrowed
    };
  },
  toAmino(message: BatchBalanceInfo): BatchBalanceInfoAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.batch_denom = message.batchDenom;
    obj.tradable = message.tradable;
    obj.retired = message.retired;
    obj.escrowed = message.escrowed;
    return obj;
  },
  fromAminoMsg(object: BatchBalanceInfoAminoMsg): BatchBalanceInfo {
    return BatchBalanceInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: BatchBalanceInfoProtoMsg): BatchBalanceInfo {
    return BatchBalanceInfo.decode(message.value);
  },
  toProto(message: BatchBalanceInfo): Uint8Array {
    return BatchBalanceInfo.encode(message).finish();
  },
  toProtoMsg(message: BatchBalanceInfo): BatchBalanceInfoProtoMsg {
    return {
      typeUrl: "/regen.ecocredit.v1.BatchBalanceInfo",
      value: BatchBalanceInfo.encode(message).finish()
    };
  }
};