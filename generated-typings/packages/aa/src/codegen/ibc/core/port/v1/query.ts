import { Order, Counterparty, CounterpartySDKType, orderFromJSON } from "../../channel/v1/channel";
import { BinaryReader, BinaryWriter } from "../../../../binary";
import { isSet } from "../../../../helpers";
/** QueryAppVersionRequest is the request type for the Query/AppVersion RPC method */
export interface QueryAppVersionRequest {
  /** port unique identifier */
  portId: string;
  /** connection unique identifier */
  connectionId: string;
  /** whether the channel is ordered or unordered */
  ordering: Order;
  /** counterparty channel end */
  counterparty: Counterparty;
  /** proposed version */
  proposedVersion: string;
}
/** QueryAppVersionRequest is the request type for the Query/AppVersion RPC method */
export interface QueryAppVersionRequestSDKType {
  port_id: string;
  connection_id: string;
  ordering: Order;
  counterparty: CounterpartySDKType;
  proposed_version: string;
}
/** QueryAppVersionResponse is the response type for the Query/AppVersion RPC method. */
export interface QueryAppVersionResponse {
  /** port id associated with the request identifiers */
  portId: string;
  /** supported app version */
  version: string;
}
/** QueryAppVersionResponse is the response type for the Query/AppVersion RPC method. */
export interface QueryAppVersionResponseSDKType {
  port_id: string;
  version: string;
}
function createBaseQueryAppVersionRequest(): QueryAppVersionRequest {
  return {
    portId: "",
    connectionId: "",
    ordering: 0,
    counterparty: Counterparty.fromPartial({}),
    proposedVersion: ""
  };
}
export const QueryAppVersionRequest = {
  typeUrl: "/ibc.core.port.v1.QueryAppVersionRequest",
  encode(message: QueryAppVersionRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.connectionId !== "") {
      writer.uint32(18).string(message.connectionId);
    }
    if (message.ordering !== 0) {
      writer.uint32(24).int32(message.ordering);
    }
    if (message.counterparty !== undefined) {
      Counterparty.encode(message.counterparty, writer.uint32(34).fork()).ldelim();
    }
    if (message.proposedVersion !== "") {
      writer.uint32(42).string(message.proposedVersion);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAppVersionRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.connectionId = reader.string();
          break;
        case 3:
          message.ordering = (reader.int32() as any);
          break;
        case 4:
          message.counterparty = Counterparty.decode(reader, reader.uint32());
          break;
        case 5:
          message.proposedVersion = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAppVersionRequest>): QueryAppVersionRequest {
    const message = createBaseQueryAppVersionRequest();
    message.portId = object.portId ?? "";
    message.connectionId = object.connectionId ?? "";
    message.ordering = object.ordering ?? 0;
    message.counterparty = object.counterparty !== undefined && object.counterparty !== null ? Counterparty.fromPartial(object.counterparty) : undefined;
    message.proposedVersion = object.proposedVersion ?? "";
    return message;
  },
  fromAmino(object: QueryAppVersionRequestAmino): QueryAppVersionRequest {
    return {
      portId: object.port_id,
      connectionId: object.connection_id,
      ordering: isSet(object.ordering) ? orderFromJSON(object.ordering) : -1,
      counterparty: object?.counterparty ? Counterparty.fromAmino(object.counterparty) : undefined,
      proposedVersion: object.proposed_version
    };
  },
  toAmino(message: QueryAppVersionRequest): QueryAppVersionRequestAmino {
    const obj: any = {};
    obj.port_id = message.portId;
    obj.connection_id = message.connectionId;
    obj.ordering = message.ordering;
    obj.counterparty = message.counterparty ? Counterparty.toAmino(message.counterparty) : undefined;
    obj.proposed_version = message.proposedVersion;
    return obj;
  },
  fromAminoMsg(object: QueryAppVersionRequestAminoMsg): QueryAppVersionRequest {
    return QueryAppVersionRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAppVersionRequest): QueryAppVersionRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryAppVersionRequest",
      value: QueryAppVersionRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryAppVersionRequestProtoMsg): QueryAppVersionRequest {
    return QueryAppVersionRequest.decode(message.value);
  },
  toProto(message: QueryAppVersionRequest): Uint8Array {
    return QueryAppVersionRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryAppVersionRequest): QueryAppVersionRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.port.v1.QueryAppVersionRequest",
      value: QueryAppVersionRequest.encode(message).finish()
    };
  }
};
function createBaseQueryAppVersionResponse(): QueryAppVersionResponse {
  return {
    portId: "",
    version: ""
  };
}
export const QueryAppVersionResponse = {
  typeUrl: "/ibc.core.port.v1.QueryAppVersionResponse",
  encode(message: QueryAppVersionResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.portId !== "") {
      writer.uint32(10).string(message.portId);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryAppVersionResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryAppVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.portId = reader.string();
          break;
        case 2:
          message.version = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryAppVersionResponse>): QueryAppVersionResponse {
    const message = createBaseQueryAppVersionResponse();
    message.portId = object.portId ?? "";
    message.version = object.version ?? "";
    return message;
  },
  fromAmino(object: QueryAppVersionResponseAmino): QueryAppVersionResponse {
    return {
      portId: object.port_id,
      version: object.version
    };
  },
  toAmino(message: QueryAppVersionResponse): QueryAppVersionResponseAmino {
    const obj: any = {};
    obj.port_id = message.portId;
    obj.version = message.version;
    return obj;
  },
  fromAminoMsg(object: QueryAppVersionResponseAminoMsg): QueryAppVersionResponse {
    return QueryAppVersionResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryAppVersionResponse): QueryAppVersionResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryAppVersionResponse",
      value: QueryAppVersionResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryAppVersionResponseProtoMsg): QueryAppVersionResponse {
    return QueryAppVersionResponse.decode(message.value);
  },
  toProto(message: QueryAppVersionResponse): Uint8Array {
    return QueryAppVersionResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryAppVersionResponse): QueryAppVersionResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.port.v1.QueryAppVersionResponse",
      value: QueryAppVersionResponse.encode(message).finish()
    };
  }
};