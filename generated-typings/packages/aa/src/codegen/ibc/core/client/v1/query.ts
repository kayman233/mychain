import { PageRequest, PageRequestSDKType, PageResponse, PageResponseSDKType } from "../../../../cosmos/base/query/v1beta1/pagination";
import { Any, AnySDKType } from "../../../../google/protobuf/any";
import { Height, HeightSDKType, IdentifiedClientState, IdentifiedClientStateSDKType, ConsensusStateWithHeight, ConsensusStateWithHeightSDKType, Params, ParamsSDKType } from "./client";
import { BinaryReader, BinaryWriter } from "../../../../binary";
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequest {
  /** client state unique identifier */
  clientId: string;
}
/**
 * QueryClientStateRequest is the request type for the Query/ClientState RPC
 * method
 */
export interface QueryClientStateRequestSDKType {
  client_id: string;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponse {
  /** client state associated with the request identifier */
  clientState: Any;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height;
}
/**
 * QueryClientStateResponse is the response type for the Query/ClientState RPC
 * method. Besides the client state, it includes a proof and the height from
 * which the proof was retrieved.
 */
export interface QueryClientStateResponseSDKType {
  client_state: AnySDKType;
  proof: Uint8Array;
  proof_height: HeightSDKType;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequest {
  /** pagination request */
  pagination: PageRequest;
}
/**
 * QueryClientStatesRequest is the request type for the Query/ClientStates RPC
 * method
 */
export interface QueryClientStatesRequestSDKType {
  pagination: PageRequestSDKType;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponse {
  /** list of stored ClientStates of the chain. */
  clientStates: IdentifiedClientState[];
  /** pagination response */
  pagination: PageResponse;
}
/**
 * QueryClientStatesResponse is the response type for the Query/ClientStates RPC
 * method.
 */
export interface QueryClientStatesResponseSDKType {
  client_states: IdentifiedClientStateSDKType[];
  pagination: PageResponseSDKType;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequest {
  /** client identifier */
  clientId: string;
  /** consensus state revision number */
  revisionNumber: bigint;
  /** consensus state revision height */
  revisionHeight: bigint;
  /**
   * latest_height overrrides the height field and queries the latest stored
   * ConsensusState
   */
  latestHeight: boolean;
}
/**
 * QueryConsensusStateRequest is the request type for the Query/ConsensusState
 * RPC method. Besides the consensus state, it includes a proof and the height
 * from which the proof was retrieved.
 */
export interface QueryConsensusStateRequestSDKType {
  client_id: string;
  revision_number: bigint;
  revision_height: bigint;
  latest_height: boolean;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponse {
  /** consensus state associated with the client identifier at the given height */
  consensusState: Any;
  /** merkle proof of existence */
  proof: Uint8Array;
  /** height at which the proof was retrieved */
  proofHeight: Height;
}
/**
 * QueryConsensusStateResponse is the response type for the Query/ConsensusState
 * RPC method
 */
export interface QueryConsensusStateResponseSDKType {
  consensus_state: AnySDKType;
  proof: Uint8Array;
  proof_height: HeightSDKType;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequest {
  /** client identifier */
  clientId: string;
  /** pagination request */
  pagination: PageRequest;
}
/**
 * QueryConsensusStatesRequest is the request type for the Query/ConsensusStates
 * RPC method.
 */
export interface QueryConsensusStatesRequestSDKType {
  client_id: string;
  pagination: PageRequestSDKType;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponse {
  /** consensus states associated with the identifier */
  consensusStates: ConsensusStateWithHeight[];
  /** pagination response */
  pagination: PageResponse;
}
/**
 * QueryConsensusStatesResponse is the response type for the
 * Query/ConsensusStates RPC method
 */
export interface QueryConsensusStatesResponseSDKType {
  consensus_states: ConsensusStateWithHeightSDKType[];
  pagination: PageResponseSDKType;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequest {
  /** client unique identifier */
  clientId: string;
}
/**
 * QueryClientStatusRequest is the request type for the Query/ClientStatus RPC
 * method
 */
export interface QueryClientStatusRequestSDKType {
  client_id: string;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponse {
  status: string;
}
/**
 * QueryClientStatusResponse is the response type for the Query/ClientStatus RPC
 * method. It returns the current status of the IBC client.
 */
export interface QueryClientStatusResponseSDKType {
  status: string;
}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequest {}
/**
 * QueryClientParamsRequest is the request type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsRequestSDKType {}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponse {
  /** params defines the parameters of the module. */
  params: Params;
}
/**
 * QueryClientParamsResponse is the response type for the Query/ClientParams RPC
 * method.
 */
export interface QueryClientParamsResponseSDKType {
  params: ParamsSDKType;
}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequest {}
/**
 * QueryUpgradedClientStateRequest is the request type for the
 * Query/UpgradedClientState RPC method
 */
export interface QueryUpgradedClientStateRequestSDKType {}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponse {
  /** client state associated with the request identifier */
  upgradedClientState: Any;
}
/**
 * QueryUpgradedClientStateResponse is the response type for the
 * Query/UpgradedClientState RPC method.
 */
export interface QueryUpgradedClientStateResponseSDKType {
  upgraded_client_state: AnySDKType;
}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequest {}
/**
 * QueryUpgradedConsensusStateRequest is the request type for the
 * Query/UpgradedConsensusState RPC method
 */
export interface QueryUpgradedConsensusStateRequestSDKType {}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  /** Consensus state associated with the request identifier */
  upgradedConsensusState: Any;
}
/**
 * QueryUpgradedConsensusStateResponse is the response type for the
 * Query/UpgradedConsensusState RPC method.
 */
export interface QueryUpgradedConsensusStateResponseSDKType {
  upgraded_consensus_state: AnySDKType;
}
function createBaseQueryClientStateRequest(): QueryClientStateRequest {
  return {
    clientId: ""
  };
}
export const QueryClientStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStateRequest",
  encode(message: QueryClientStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStateRequest>): QueryClientStateRequest {
    const message = createBaseQueryClientStateRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: QueryClientStateRequestAmino): QueryClientStateRequest {
    return {
      clientId: object.client_id
    };
  },
  toAmino(message: QueryClientStateRequest): QueryClientStateRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    return obj;
  },
  fromAminoMsg(object: QueryClientStateRequestAminoMsg): QueryClientStateRequest {
    return QueryClientStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStateRequest): QueryClientStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStateRequest",
      value: QueryClientStateRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStateRequestProtoMsg): QueryClientStateRequest {
    return QueryClientStateRequest.decode(message.value);
  },
  toProto(message: QueryClientStateRequest): Uint8Array {
    return QueryClientStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStateRequest): QueryClientStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStateRequest",
      value: QueryClientStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStateResponse(): QueryClientStateResponse {
  return {
    clientState: Any.fromPartial({}),
    proof: new Uint8Array(),
    proofHeight: Height.fromPartial({})
  };
}
export const QueryClientStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStateResponse",
  encode(message: QueryClientStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientState !== undefined) {
      Any.encode(message.clientState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientState = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStateResponse>): QueryClientStateResponse {
    const message = createBaseQueryClientStateResponse();
    message.clientState = object.clientState !== undefined && object.clientState !== null ? Any.fromPartial(object.clientState) : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStateResponseAmino): QueryClientStateResponse {
    return {
      clientState: object?.client_state ? Any.fromAmino(object.client_state) : undefined,
      proof: object.proof,
      proofHeight: object?.proof_height ? Height.fromAmino(object.proof_height) : undefined
    };
  },
  toAmino(message: QueryClientStateResponse): QueryClientStateResponseAmino {
    const obj: any = {};
    obj.client_state = message.clientState ? Any.toAmino(message.clientState) : undefined;
    obj.proof = message.proof;
    obj.proof_height = message.proofHeight ? Height.toAmino(message.proofHeight) : {};
    return obj;
  },
  fromAminoMsg(object: QueryClientStateResponseAminoMsg): QueryClientStateResponse {
    return QueryClientStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStateResponse): QueryClientStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStateResponse",
      value: QueryClientStateResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStateResponseProtoMsg): QueryClientStateResponse {
    return QueryClientStateResponse.decode(message.value);
  },
  toProto(message: QueryClientStateResponse): Uint8Array {
    return QueryClientStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStateResponse): QueryClientStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStateResponse",
      value: QueryClientStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatesRequest(): QueryClientStatesRequest {
  return {
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryClientStatesRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesRequest",
  encode(message: QueryClientStatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesRequest();
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
  fromPartial(object: Partial<QueryClientStatesRequest>): QueryClientStatesRequest {
    const message = createBaseQueryClientStatesRequest();
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStatesRequestAmino): QueryClientStatesRequest {
    return {
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClientStatesRequest): QueryClientStatesRequestAmino {
    const obj: any = {};
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatesRequestAminoMsg): QueryClientStatesRequest {
    return QueryClientStatesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatesRequest): QueryClientStatesRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatesRequest",
      value: QueryClientStatesRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStatesRequestProtoMsg): QueryClientStatesRequest {
    return QueryClientStatesRequest.decode(message.value);
  },
  toProto(message: QueryClientStatesRequest): Uint8Array {
    return QueryClientStatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatesRequest): QueryClientStatesRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatesRequest",
      value: QueryClientStatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatesResponse(): QueryClientStatesResponse {
  return {
    clientStates: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryClientStatesResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatesResponse",
  encode(message: QueryClientStatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.clientStates) {
      IdentifiedClientState.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientStates.push(IdentifiedClientState.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryClientStatesResponse>): QueryClientStatesResponse {
    const message = createBaseQueryClientStatesResponse();
    message.clientStates = object.clientStates?.map(e => IdentifiedClientState.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryClientStatesResponseAmino): QueryClientStatesResponse {
    return {
      clientStates: Array.isArray(object?.client_states) ? object.client_states.map((e: any) => IdentifiedClientState.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryClientStatesResponse): QueryClientStatesResponseAmino {
    const obj: any = {};
    if (message.clientStates) {
      obj.client_states = message.clientStates.map(e => e ? IdentifiedClientState.toAmino(e) : undefined);
    } else {
      obj.client_states = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatesResponseAminoMsg): QueryClientStatesResponse {
    return QueryClientStatesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatesResponse): QueryClientStatesResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatesResponse",
      value: QueryClientStatesResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStatesResponseProtoMsg): QueryClientStatesResponse {
    return QueryClientStatesResponse.decode(message.value);
  },
  toProto(message: QueryClientStatesResponse): Uint8Array {
    return QueryClientStatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatesResponse): QueryClientStatesResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatesResponse",
      value: QueryClientStatesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateRequest(): QueryConsensusStateRequest {
  return {
    clientId: "",
    revisionNumber: BigInt(0),
    revisionHeight: BigInt(0),
    latestHeight: false
  };
}
export const QueryConsensusStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateRequest",
  encode(message: QueryConsensusStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.revisionNumber !== BigInt(0)) {
      writer.uint32(16).uint64(message.revisionNumber);
    }
    if (message.revisionHeight !== BigInt(0)) {
      writer.uint32(24).uint64(message.revisionHeight);
    }
    if (message.latestHeight === true) {
      writer.uint32(32).bool(message.latestHeight);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        case 2:
          message.revisionNumber = reader.uint64();
          break;
        case 3:
          message.revisionHeight = reader.uint64();
          break;
        case 4:
          message.latestHeight = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateRequest>): QueryConsensusStateRequest {
    const message = createBaseQueryConsensusStateRequest();
    message.clientId = object.clientId ?? "";
    message.revisionNumber = object.revisionNumber !== undefined && object.revisionNumber !== null ? BigInt(object.revisionNumber.toString()) : BigInt(0);
    message.revisionHeight = object.revisionHeight !== undefined && object.revisionHeight !== null ? BigInt(object.revisionHeight.toString()) : BigInt(0);
    message.latestHeight = object.latestHeight ?? false;
    return message;
  },
  fromAmino(object: QueryConsensusStateRequestAmino): QueryConsensusStateRequest {
    return {
      clientId: object.client_id,
      revisionNumber: BigInt(object.revision_number),
      revisionHeight: BigInt(object.revision_height),
      latestHeight: object.latest_height
    };
  },
  toAmino(message: QueryConsensusStateRequest): QueryConsensusStateRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.revision_number = message.revisionNumber ? message.revisionNumber.toString() : undefined;
    obj.revision_height = message.revisionHeight ? message.revisionHeight.toString() : undefined;
    obj.latest_height = message.latestHeight;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateRequestAminoMsg): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateRequest): QueryConsensusStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateRequest",
      value: QueryConsensusStateRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryConsensusStateRequestProtoMsg): QueryConsensusStateRequest {
    return QueryConsensusStateRequest.decode(message.value);
  },
  toProto(message: QueryConsensusStateRequest): Uint8Array {
    return QueryConsensusStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateRequest): QueryConsensusStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateRequest",
      value: QueryConsensusStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStateResponse(): QueryConsensusStateResponse {
  return {
    consensusState: Any.fromPartial({}),
    proof: new Uint8Array(),
    proofHeight: Height.fromPartial({})
  };
}
export const QueryConsensusStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStateResponse",
  encode(message: QueryConsensusStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.consensusState !== undefined) {
      Any.encode(message.consensusState, writer.uint32(10).fork()).ldelim();
    }
    if (message.proof.length !== 0) {
      writer.uint32(18).bytes(message.proof);
    }
    if (message.proofHeight !== undefined) {
      Height.encode(message.proofHeight, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusState = Any.decode(reader, reader.uint32());
          break;
        case 2:
          message.proof = reader.bytes();
          break;
        case 3:
          message.proofHeight = Height.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryConsensusStateResponse>): QueryConsensusStateResponse {
    const message = createBaseQueryConsensusStateResponse();
    message.consensusState = object.consensusState !== undefined && object.consensusState !== null ? Any.fromPartial(object.consensusState) : undefined;
    message.proof = object.proof ?? new Uint8Array();
    message.proofHeight = object.proofHeight !== undefined && object.proofHeight !== null ? Height.fromPartial(object.proofHeight) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStateResponseAmino): QueryConsensusStateResponse {
    return {
      consensusState: object?.consensus_state ? Any.fromAmino(object.consensus_state) : undefined,
      proof: object.proof,
      proofHeight: object?.proof_height ? Height.fromAmino(object.proof_height) : undefined
    };
  },
  toAmino(message: QueryConsensusStateResponse): QueryConsensusStateResponseAmino {
    const obj: any = {};
    obj.consensus_state = message.consensusState ? Any.toAmino(message.consensusState) : undefined;
    obj.proof = message.proof;
    obj.proof_height = message.proofHeight ? Height.toAmino(message.proofHeight) : {};
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStateResponseAminoMsg): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStateResponse): QueryConsensusStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStateResponse",
      value: QueryConsensusStateResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryConsensusStateResponseProtoMsg): QueryConsensusStateResponse {
    return QueryConsensusStateResponse.decode(message.value);
  },
  toProto(message: QueryConsensusStateResponse): Uint8Array {
    return QueryConsensusStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStateResponse): QueryConsensusStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStateResponse",
      value: QueryConsensusStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStatesRequest(): QueryConsensusStatesRequest {
  return {
    clientId: "",
    pagination: PageRequest.fromPartial({})
  };
}
export const QueryConsensusStatesRequest = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesRequest",
  encode(message: QueryConsensusStatesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusStatesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
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
  fromPartial(object: Partial<QueryConsensusStatesRequest>): QueryConsensusStatesRequest {
    const message = createBaseQueryConsensusStatesRequest();
    message.clientId = object.clientId ?? "";
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageRequest.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStatesRequestAmino): QueryConsensusStatesRequest {
    return {
      clientId: object.client_id,
      pagination: object?.pagination ? PageRequest.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryConsensusStatesRequest): QueryConsensusStatesRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    obj.pagination = message.pagination ? PageRequest.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStatesRequestAminoMsg): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStatesRequest): QueryConsensusStatesRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStatesRequest",
      value: QueryConsensusStatesRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryConsensusStatesRequestProtoMsg): QueryConsensusStatesRequest {
    return QueryConsensusStatesRequest.decode(message.value);
  },
  toProto(message: QueryConsensusStatesRequest): Uint8Array {
    return QueryConsensusStatesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStatesRequest): QueryConsensusStatesRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStatesRequest",
      value: QueryConsensusStatesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryConsensusStatesResponse(): QueryConsensusStatesResponse {
  return {
    consensusStates: [],
    pagination: PageResponse.fromPartial({})
  };
}
export const QueryConsensusStatesResponse = {
  typeUrl: "/ibc.core.client.v1.QueryConsensusStatesResponse",
  encode(message: QueryConsensusStatesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.consensusStates) {
      ConsensusStateWithHeight.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryConsensusStatesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryConsensusStatesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consensusStates.push(ConsensusStateWithHeight.decode(reader, reader.uint32()));
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
  fromPartial(object: Partial<QueryConsensusStatesResponse>): QueryConsensusStatesResponse {
    const message = createBaseQueryConsensusStatesResponse();
    message.consensusStates = object.consensusStates?.map(e => ConsensusStateWithHeight.fromPartial(e)) || [];
    message.pagination = object.pagination !== undefined && object.pagination !== null ? PageResponse.fromPartial(object.pagination) : undefined;
    return message;
  },
  fromAmino(object: QueryConsensusStatesResponseAmino): QueryConsensusStatesResponse {
    return {
      consensusStates: Array.isArray(object?.consensus_states) ? object.consensus_states.map((e: any) => ConsensusStateWithHeight.fromAmino(e)) : [],
      pagination: object?.pagination ? PageResponse.fromAmino(object.pagination) : undefined
    };
  },
  toAmino(message: QueryConsensusStatesResponse): QueryConsensusStatesResponseAmino {
    const obj: any = {};
    if (message.consensusStates) {
      obj.consensus_states = message.consensusStates.map(e => e ? ConsensusStateWithHeight.toAmino(e) : undefined);
    } else {
      obj.consensus_states = [];
    }
    obj.pagination = message.pagination ? PageResponse.toAmino(message.pagination) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryConsensusStatesResponseAminoMsg): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryConsensusStatesResponse): QueryConsensusStatesResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryConsensusStatesResponse",
      value: QueryConsensusStatesResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryConsensusStatesResponseProtoMsg): QueryConsensusStatesResponse {
    return QueryConsensusStatesResponse.decode(message.value);
  },
  toProto(message: QueryConsensusStatesResponse): Uint8Array {
    return QueryConsensusStatesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryConsensusStatesResponse): QueryConsensusStatesResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryConsensusStatesResponse",
      value: QueryConsensusStatesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatusRequest(): QueryClientStatusRequest {
  return {
    clientId: ""
  };
}
export const QueryClientStatusRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusRequest",
  encode(message: QueryClientStatusRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.clientId !== "") {
      writer.uint32(10).string(message.clientId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStatusRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.clientId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatusRequest>): QueryClientStatusRequest {
    const message = createBaseQueryClientStatusRequest();
    message.clientId = object.clientId ?? "";
    return message;
  },
  fromAmino(object: QueryClientStatusRequestAmino): QueryClientStatusRequest {
    return {
      clientId: object.client_id
    };
  },
  toAmino(message: QueryClientStatusRequest): QueryClientStatusRequestAmino {
    const obj: any = {};
    obj.client_id = message.clientId;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatusRequestAminoMsg): QueryClientStatusRequest {
    return QueryClientStatusRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatusRequest): QueryClientStatusRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatusRequest",
      value: QueryClientStatusRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStatusRequestProtoMsg): QueryClientStatusRequest {
    return QueryClientStatusRequest.decode(message.value);
  },
  toProto(message: QueryClientStatusRequest): Uint8Array {
    return QueryClientStatusRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatusRequest): QueryClientStatusRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatusRequest",
      value: QueryClientStatusRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientStatusResponse(): QueryClientStatusResponse {
  return {
    status: ""
  };
}
export const QueryClientStatusResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientStatusResponse",
  encode(message: QueryClientStatusResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.status !== "") {
      writer.uint32(10).string(message.status);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientStatusResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientStatusResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryClientStatusResponse>): QueryClientStatusResponse {
    const message = createBaseQueryClientStatusResponse();
    message.status = object.status ?? "";
    return message;
  },
  fromAmino(object: QueryClientStatusResponseAmino): QueryClientStatusResponse {
    return {
      status: object.status
    };
  },
  toAmino(message: QueryClientStatusResponse): QueryClientStatusResponseAmino {
    const obj: any = {};
    obj.status = message.status;
    return obj;
  },
  fromAminoMsg(object: QueryClientStatusResponseAminoMsg): QueryClientStatusResponse {
    return QueryClientStatusResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientStatusResponse): QueryClientStatusResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientStatusResponse",
      value: QueryClientStatusResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientStatusResponseProtoMsg): QueryClientStatusResponse {
    return QueryClientStatusResponse.decode(message.value);
  },
  toProto(message: QueryClientStatusResponse): Uint8Array {
    return QueryClientStatusResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientStatusResponse): QueryClientStatusResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientStatusResponse",
      value: QueryClientStatusResponse.encode(message).finish()
    };
  }
};
function createBaseQueryClientParamsRequest(): QueryClientParamsRequest {
  return {};
}
export const QueryClientParamsRequest = {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsRequest",
  encode(_: QueryClientParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsRequest();
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
  fromPartial(_: Partial<QueryClientParamsRequest>): QueryClientParamsRequest {
    const message = createBaseQueryClientParamsRequest();
    return message;
  },
  fromAmino(_: QueryClientParamsRequestAmino): QueryClientParamsRequest {
    return {};
  },
  toAmino(_: QueryClientParamsRequest): QueryClientParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryClientParamsRequestAminoMsg): QueryClientParamsRequest {
    return QueryClientParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientParamsRequest): QueryClientParamsRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientParamsRequest",
      value: QueryClientParamsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientParamsRequestProtoMsg): QueryClientParamsRequest {
    return QueryClientParamsRequest.decode(message.value);
  },
  toProto(message: QueryClientParamsRequest): Uint8Array {
    return QueryClientParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryClientParamsRequest): QueryClientParamsRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientParamsRequest",
      value: QueryClientParamsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryClientParamsResponse(): QueryClientParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const QueryClientParamsResponse = {
  typeUrl: "/ibc.core.client.v1.QueryClientParamsResponse",
  encode(message: QueryClientParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryClientParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClientParamsResponse();
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
  fromPartial(object: Partial<QueryClientParamsResponse>): QueryClientParamsResponse {
    const message = createBaseQueryClientParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: QueryClientParamsResponseAmino): QueryClientParamsResponse {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: QueryClientParamsResponse): QueryClientParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryClientParamsResponseAminoMsg): QueryClientParamsResponse {
    return QueryClientParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryClientParamsResponse): QueryClientParamsResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryClientParamsResponse",
      value: QueryClientParamsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryClientParamsResponseProtoMsg): QueryClientParamsResponse {
    return QueryClientParamsResponse.decode(message.value);
  },
  toProto(message: QueryClientParamsResponse): Uint8Array {
    return QueryClientParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryClientParamsResponse): QueryClientParamsResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryClientParamsResponse",
      value: QueryClientParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedClientStateRequest(): QueryUpgradedClientStateRequest {
  return {};
}
export const QueryUpgradedClientStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateRequest",
  encode(_: QueryUpgradedClientStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUpgradedClientStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateRequest();
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
  fromPartial(_: Partial<QueryUpgradedClientStateRequest>): QueryUpgradedClientStateRequest {
    const message = createBaseQueryUpgradedClientStateRequest();
    return message;
  },
  fromAmino(_: QueryUpgradedClientStateRequestAmino): QueryUpgradedClientStateRequest {
    return {};
  },
  toAmino(_: QueryUpgradedClientStateRequest): QueryUpgradedClientStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedClientStateRequestAminoMsg): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedClientStateRequest): QueryUpgradedClientStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedClientStateRequest",
      value: QueryUpgradedClientStateRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryUpgradedClientStateRequestProtoMsg): QueryUpgradedClientStateRequest {
    return QueryUpgradedClientStateRequest.decode(message.value);
  },
  toProto(message: QueryUpgradedClientStateRequest): Uint8Array {
    return QueryUpgradedClientStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedClientStateRequest): QueryUpgradedClientStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateRequest",
      value: QueryUpgradedClientStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedClientStateResponse(): QueryUpgradedClientStateResponse {
  return {
    upgradedClientState: Any.fromPartial({})
  };
}
export const QueryUpgradedClientStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateResponse",
  encode(message: QueryUpgradedClientStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.upgradedClientState !== undefined) {
      Any.encode(message.upgradedClientState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUpgradedClientStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedClientStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgradedClientState = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUpgradedClientStateResponse>): QueryUpgradedClientStateResponse {
    const message = createBaseQueryUpgradedClientStateResponse();
    message.upgradedClientState = object.upgradedClientState !== undefined && object.upgradedClientState !== null ? Any.fromPartial(object.upgradedClientState) : undefined;
    return message;
  },
  fromAmino(object: QueryUpgradedClientStateResponseAmino): QueryUpgradedClientStateResponse {
    return {
      upgradedClientState: object?.upgraded_client_state ? Any.fromAmino(object.upgraded_client_state) : undefined
    };
  },
  toAmino(message: QueryUpgradedClientStateResponse): QueryUpgradedClientStateResponseAmino {
    const obj: any = {};
    obj.upgraded_client_state = message.upgradedClientState ? Any.toAmino(message.upgradedClientState) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedClientStateResponseAminoMsg): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedClientStateResponse): QueryUpgradedClientStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedClientStateResponse",
      value: QueryUpgradedClientStateResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryUpgradedClientStateResponseProtoMsg): QueryUpgradedClientStateResponse {
    return QueryUpgradedClientStateResponse.decode(message.value);
  },
  toProto(message: QueryUpgradedClientStateResponse): Uint8Array {
    return QueryUpgradedClientStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedClientStateResponse): QueryUpgradedClientStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedClientStateResponse",
      value: QueryUpgradedClientStateResponse.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedConsensusStateRequest(): QueryUpgradedConsensusStateRequest {
  return {};
}
export const QueryUpgradedConsensusStateRequest = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateRequest",
  encode(_: QueryUpgradedConsensusStateRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateRequest();
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
  fromPartial(_: Partial<QueryUpgradedConsensusStateRequest>): QueryUpgradedConsensusStateRequest {
    const message = createBaseQueryUpgradedConsensusStateRequest();
    return message;
  },
  fromAmino(_: QueryUpgradedConsensusStateRequestAmino): QueryUpgradedConsensusStateRequest {
    return {};
  },
  toAmino(_: QueryUpgradedConsensusStateRequest): QueryUpgradedConsensusStateRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedConsensusStateRequestAminoMsg): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedConsensusStateRequest): QueryUpgradedConsensusStateRequestAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedConsensusStateRequest",
      value: QueryUpgradedConsensusStateRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryUpgradedConsensusStateRequestProtoMsg): QueryUpgradedConsensusStateRequest {
    return QueryUpgradedConsensusStateRequest.decode(message.value);
  },
  toProto(message: QueryUpgradedConsensusStateRequest): Uint8Array {
    return QueryUpgradedConsensusStateRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedConsensusStateRequest): QueryUpgradedConsensusStateRequestProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateRequest",
      value: QueryUpgradedConsensusStateRequest.encode(message).finish()
    };
  }
};
function createBaseQueryUpgradedConsensusStateResponse(): QueryUpgradedConsensusStateResponse {
  return {
    upgradedConsensusState: Any.fromPartial({})
  };
}
export const QueryUpgradedConsensusStateResponse = {
  typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateResponse",
  encode(message: QueryUpgradedConsensusStateResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.upgradedConsensusState !== undefined) {
      Any.encode(message.upgradedConsensusState, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryUpgradedConsensusStateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.upgradedConsensusState = Any.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryUpgradedConsensusStateResponse>): QueryUpgradedConsensusStateResponse {
    const message = createBaseQueryUpgradedConsensusStateResponse();
    message.upgradedConsensusState = object.upgradedConsensusState !== undefined && object.upgradedConsensusState !== null ? Any.fromPartial(object.upgradedConsensusState) : undefined;
    return message;
  },
  fromAmino(object: QueryUpgradedConsensusStateResponseAmino): QueryUpgradedConsensusStateResponse {
    return {
      upgradedConsensusState: object?.upgraded_consensus_state ? Any.fromAmino(object.upgraded_consensus_state) : undefined
    };
  },
  toAmino(message: QueryUpgradedConsensusStateResponse): QueryUpgradedConsensusStateResponseAmino {
    const obj: any = {};
    obj.upgraded_consensus_state = message.upgradedConsensusState ? Any.toAmino(message.upgradedConsensusState) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryUpgradedConsensusStateResponseAminoMsg): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryUpgradedConsensusStateResponse): QueryUpgradedConsensusStateResponseAminoMsg {
    return {
      type: "cosmos-sdk/QueryUpgradedConsensusStateResponse",
      value: QueryUpgradedConsensusStateResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryUpgradedConsensusStateResponseProtoMsg): QueryUpgradedConsensusStateResponse {
    return QueryUpgradedConsensusStateResponse.decode(message.value);
  },
  toProto(message: QueryUpgradedConsensusStateResponse): Uint8Array {
    return QueryUpgradedConsensusStateResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryUpgradedConsensusStateResponse): QueryUpgradedConsensusStateResponseProtoMsg {
    return {
      typeUrl: "/ibc.core.client.v1.QueryUpgradedConsensusStateResponse",
      value: QueryUpgradedConsensusStateResponse.encode(message).finish()
    };
  }
};