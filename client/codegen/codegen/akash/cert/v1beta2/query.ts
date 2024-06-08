import { CertificateFilter, CertificateFilterSDKType, Certificate, CertificateSDKType } from "./cert";
import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../cosmos/base/query/v1beta1/pagination";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** CertificateResponse contains a single X509 certificate and its serial number */
export interface CertificateResponse {
  certificate: Certificate;
  serial: string;
}
/** CertificateResponse contains a single X509 certificate and its serial number */
export interface CertificateResponseSDKType {
  certificate: CertificateSDKType;
  serial: string;
}
/** QueryDeploymentsRequest is request type for the Query/Deployments RPC method */
export interface QueryCertificatesRequest {
  filter: CertificateFilter;
  pagination: PageRequest;
}
/** QueryDeploymentsRequest is request type for the Query/Deployments RPC method */
export interface QueryCertificatesRequestSDKType {
  filter: CertificateFilterSDKType;
  pagination: PageRequestSDKType;
}
/** QueryCertificatesResponse is response type for the Query/Certificates RPC method */
export interface QueryCertificatesResponse {
  certificates: CertificateResponse[];
  pagination: PageResponse;
}
/** QueryCertificatesResponse is response type for the Query/Certificates RPC method */
export interface QueryCertificatesResponseSDKType {
  certificates: CertificateResponseSDKType[];
  pagination: PageResponseSDKType;
}
function createBaseCertificateResponse(): CertificateResponse {
  return {
    certificate: Certificate.fromPartial({}),
    serial: ""
  };
}
export const CertificateResponse = {
  typeUrl: "/akash.cert.v1beta2.CertificateResponse",
  encode(message: CertificateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.certificate !== undefined) {
      Certificate.encode(message.certificate, writer.uint32(10).fork()).ldelim();
    }
    if (message.serial !== "") {
      writer.uint32(18).string(message.serial);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): CertificateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCertificateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.certificate = Certificate.decode(reader, reader.uint32());
          break;
        case 2:
          message.serial = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<CertificateResponse>): CertificateResponse {
    const message = createBaseCertificateResponse();
    message.certificate = object.certificate !== undefined && object.certificate !== null ? Certificate.fromPartial(object.certificate) : undefined;
    message.serial = object.serial ?? "";
    return message;
  },
  fromAmino(object: CertificateResponseAmino): CertificateResponse {
    return {
      certificate: object?.certificate ? Certificate.fromAmino(object.certificate) : undefined,
      serial: object.serial
    };
  },
  toAmino(message: CertificateResponse): CertificateResponseAmino {
    const obj: any = {};
    obj.certificate = message.certificate ? Certificate.toAmino(message.certificate) : undefined;
    obj.serial = message.serial;
    return obj;
  },
  fromAminoMsg(object: CertificateResponseAminoMsg): CertificateResponse {
    return CertificateResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: CertificateResponseProtoMsg): CertificateResponse {
    return CertificateResponse.decode(message.value);
  },
  toProto(message: CertificateResponse): Uint8Array {
    return CertificateResponse.encode(message).finish();
  },
  toProtoMsg(message: CertificateResponse): CertificateResponseProtoMsg {
    return {
      typeUrl: "/akash.cert.v1beta2.CertificateResponse",
      value: CertificateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryCertificatesRequest(): QueryCertificatesRequest {
  return {
    filter: CertificateFilter.fromPartial({}),
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryCertificatesRequest = {
  typeUrl: "/akash.cert.v1beta2.QueryCertificatesRequest",
  encode(message: QueryCertificatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.filter !== undefined) {
      CertificateFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCertificatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCertificatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.filter = CertificateFilter.decode(reader, reader.uint32());
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
  fromPartial(object: Partial<QueryCertificatesRequest>): QueryCertificatesRequest {
    const message = createBaseQueryCertificatesRequest();
    message.filter = object.filter !== undefined && object.filter !== null ? CertificateFilter.fromPartial(object.filter) : undefined;
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCertificatesRequestAmino): QueryCertificatesRequest {
    return {
      filter: object?.filter ? CertificateFilter.fromAmino(object.filter) : undefined,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryCertificatesRequest): QueryCertificatesRequestAmino {
    const obj: any = {};
    obj.filter = message.filter ? CertificateFilter.toAmino(message.filter) : undefined;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCertificatesRequestAminoMsg): QueryCertificatesRequest {
    return QueryCertificatesRequest.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCertificatesRequestProtoMsg): QueryCertificatesRequest {
    return QueryCertificatesRequest.decode(message.value);
  },
  toProto(message: QueryCertificatesRequest): Uint8Array {
    return QueryCertificatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryCertificatesRequest): QueryCertificatesRequestProtoMsg {
    return {
      typeUrl: "/akash.cert.v1beta2.QueryCertificatesRequest",
      value: QueryCertificatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryCertificatesResponse(): QueryCertificatesResponse {
  return {
    certificates: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryCertificatesResponse = {
  typeUrl: "/akash.cert.v1beta2.QueryCertificatesResponse",
  encode(message: QueryCertificatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.certificates) {
      CertificateResponse.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryCertificatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryCertificatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.certificates.push(CertificateResponse.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryCertificatesResponse>): QueryCertificatesResponse {
    const message = createBaseQueryCertificatesResponse();
    message.certificates = object.certificates?.map(e => CertificateResponse.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryCertificatesResponseAmino): QueryCertificatesResponse {
    return {
      certificates: Array.isArray(object?.certificates) ? object.certificates.map((e: any) => CertificateResponse.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryCertificatesResponse): QueryCertificatesResponseAmino {
    const obj: any = {};
    if (message.certificates) {
      obj.certificates = message.certificates.map(e => e ? CertificateResponse.toAmino(e) : undefined);
    } else {
      obj.certificates = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryCertificatesResponseAminoMsg): QueryCertificatesResponse {
    return QueryCertificatesResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: QueryCertificatesResponseProtoMsg): QueryCertificatesResponse {
    return QueryCertificatesResponse.decode(message.value);
  },
  toProto(message: QueryCertificatesResponse): Uint8Array {
    return QueryCertificatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryCertificatesResponse): QueryCertificatesResponseProtoMsg {
    return {
      typeUrl: "/akash.cert.v1beta2.QueryCertificatesResponse",
      value: QueryCertificatesResponse.encode(message).finish()
    };
  }
};