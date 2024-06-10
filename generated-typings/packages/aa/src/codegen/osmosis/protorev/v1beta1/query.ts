import { Params, ParamsSDKType } from "./params";
import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { PoolStatistics, PoolStatisticsSDKType, TokenPairArbRoutes, TokenPairArbRoutesSDKType } from "./protorev";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequestSDKType {}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params;
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponseSDKType {
  params: ParamsSDKType;
}
/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequest {}
/**
 * QueryGetProtoRevNumberOfTradesRequest is request type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesRequestSDKType {}
/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponse {
  /** number_of_trades is the number of trades the module has executed */
  numberOfTrades: string;
}
/**
 * QueryGetProtoRevNumberOfTradesResponse is response type for the
 * Query/GetProtoRevNumberOfTrades RPC method.
 */
export interface QueryGetProtoRevNumberOfTradesResponseSDKType {
  number_of_trades: string;
}
/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequest {
  /** denom is the denom to query profits by */
  denom: string;
}
/**
 * QueryGetProtoRevProfitsByDenomRequest is request type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomRequestSDKType {
  denom: string;
}
/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponse {
  /** profit is the profits of the module by the selected denom */
  profit: Coin;
}
/**
 * QueryGetProtoRevProfitsByDenomResponse is response type for the
 * Query/GetProtoRevProfitsByDenom RPC method.
 */
export interface QueryGetProtoRevProfitsByDenomResponseSDKType {
  profit: CoinSDKType;
}
/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequest {}
/**
 * QueryGetProtoRevAllProfitsRequest is request type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsRequestSDKType {}
/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponse {
  /** profits is a list of all of the profits from the module */
  profits: Coin[];
}
/**
 * QueryGetProtoRevAllProfitsResponse is response type for the
 * Query/GetProtoRevAllProfits RPC method.
 */
export interface QueryGetProtoRevAllProfitsResponseSDKType {
  profits: CoinSDKType[];
}
/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByPool RPC method.
 */
export interface QueryGetProtoRevStatisticsByPoolRequest {
  /** pool_id is the pool id to query statistics by */
  poolId: bigint;
}
/**
 * QueryGetProtoRevStatisticsByPoolRequest is request type for the
 * Query/GetProtoRevStatisticsByPool RPC method.
 */
export interface QueryGetProtoRevStatisticsByPoolRequestSDKType {
  pool_id: bigint;
}
/**
 * QueryGetProtoRevStatisticsByPoolResponse is response type for the
 * Query/GetProtoRevStatisticsByPool RPC method.
 */
export interface QueryGetProtoRevStatisticsByPoolResponse {
  /**
   * statistics contains the number of trades the module has executed after a
   * swap on a given pool and the profits from the trades
   */
  statistics: PoolStatistics;
}
/**
 * QueryGetProtoRevStatisticsByPoolResponse is response type for the
 * Query/GetProtoRevStatisticsByPool RPC method.
 */
export interface QueryGetProtoRevStatisticsByPoolResponseSDKType {
  statistics: PoolStatisticsSDKType;
}
/**
 * QueryGetProtoRevAllStatisticsRequest is request type for the
 * Query/GetProtoRevAllStatistics RPC method.
 */
export interface QueryGetProtoRevAllStatisticsRequest {}
/**
 * QueryGetProtoRevAllStatisticsRequest is request type for the
 * Query/GetProtoRevAllStatistics RPC method.
 */
export interface QueryGetProtoRevAllStatisticsRequestSDKType {}
/**
 * QueryGetProtoRevAllStatisticsResponse is response type for the
 * Query/GetProtoRevAllStatistics RPC method.
 */
export interface QueryGetProtoRevAllStatisticsResponse {
  /**
   * statistics contains the number of trades the module has executed after a
   * swap on a given pool and the profits from the trades for all pools
   */
  statistics: PoolStatistics[];
}
/**
 * QueryGetProtoRevAllStatisticsResponse is response type for the
 * Query/GetProtoRevAllStatistics RPC method.
 */
export interface QueryGetProtoRevAllStatisticsResponseSDKType {
  statistics: PoolStatisticsSDKType[];
}
/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequest {}
/**
 * QueryGetProtoRevTokenPairArbRoutesRequest is request type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesRequestSDKType {}
/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponse {
  /**
   * routes is a list of all of the hot routes that the module is currently
   * arbitraging
   */
  routes: TokenPairArbRoutes[];
}
/**
 * QueryGetProtoRevTokenPairArbRoutesResponse is response type for the
 * Query/GetProtoRevTokenPairArbRoutes RPC method.
 */
export interface QueryGetProtoRevTokenPairArbRoutesResponseSDKType {
  routes: TokenPairArbRoutesSDKType[];
}
function createBaseQueryParamsRequest(): QueryParamsRequest {
  return {};
}
export const QueryParamsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsRequest",
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
  toAminoMsg(message: QueryParamsRequest): QueryParamsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-params-request",
      value: QueryParamsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryParamsRequestProtoMsg): QueryParamsRequest {
    return QueryParamsRequest.decode(message.value);
  },
  toProto(message: QueryParamsRequest): Uint8Array {
    return QueryParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsRequest): QueryParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryParamsRequest",
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
  typeUrl: "/osmosis.protorev.v1beta1.QueryParamsResponse",
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
  toAminoMsg(message: QueryParamsResponse): QueryParamsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-params-response",
      value: QueryParamsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryParamsResponseProtoMsg): QueryParamsResponse {
    return QueryParamsResponse.decode(message.value);
  },
  toProto(message: QueryParamsResponse): Uint8Array {
    return QueryParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryParamsResponse): QueryParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryParamsResponse",
      value: QueryParamsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevNumberOfTradesRequest(): QueryGetProtoRevNumberOfTradesRequest {
  return {};
}
export const QueryGetProtoRevNumberOfTradesRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesRequest",
  encode(_: QueryGetProtoRevNumberOfTradesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevNumberOfTradesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
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
  fromPartial(_: Partial<QueryGetProtoRevNumberOfTradesRequest>): QueryGetProtoRevNumberOfTradesRequest {
    const message = createBaseQueryGetProtoRevNumberOfTradesRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevNumberOfTradesRequestAmino): QueryGetProtoRevNumberOfTradesRequest {
    return {};
  },
  toAmino(_: QueryGetProtoRevNumberOfTradesRequest): QueryGetProtoRevNumberOfTradesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevNumberOfTradesRequestAminoMsg): QueryGetProtoRevNumberOfTradesRequest {
    return QueryGetProtoRevNumberOfTradesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevNumberOfTradesRequest): QueryGetProtoRevNumberOfTradesRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-number-of-trades-request",
      value: QueryGetProtoRevNumberOfTradesRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevNumberOfTradesRequestProtoMsg): QueryGetProtoRevNumberOfTradesRequest {
    return QueryGetProtoRevNumberOfTradesRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevNumberOfTradesRequest): Uint8Array {
    return QueryGetProtoRevNumberOfTradesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevNumberOfTradesRequest): QueryGetProtoRevNumberOfTradesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesRequest",
      value: QueryGetProtoRevNumberOfTradesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevNumberOfTradesResponse(): QueryGetProtoRevNumberOfTradesResponse {
  return {
    numberOfTrades: ""
  };
}
export const QueryGetProtoRevNumberOfTradesResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesResponse",
  encode(message: QueryGetProtoRevNumberOfTradesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.numberOfTrades !== "") {
      writer.uint32(10).string(message.numberOfTrades);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevNumberOfTradesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numberOfTrades = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevNumberOfTradesResponse>): QueryGetProtoRevNumberOfTradesResponse {
    const message = createBaseQueryGetProtoRevNumberOfTradesResponse();
    message.numberOfTrades = object.numberOfTrades ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevNumberOfTradesResponseAmino): QueryGetProtoRevNumberOfTradesResponse {
    return {
      numberOfTrades: object.number_of_trades
    };
  },
  toAmino(message: QueryGetProtoRevNumberOfTradesResponse): QueryGetProtoRevNumberOfTradesResponseAmino {
    const obj: any = {};
    obj.number_of_trades = message.numberOfTrades;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevNumberOfTradesResponseAminoMsg): QueryGetProtoRevNumberOfTradesResponse {
    return QueryGetProtoRevNumberOfTradesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevNumberOfTradesResponse): QueryGetProtoRevNumberOfTradesResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-number-of-trades-response",
      value: QueryGetProtoRevNumberOfTradesResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevNumberOfTradesResponseProtoMsg): QueryGetProtoRevNumberOfTradesResponse {
    return QueryGetProtoRevNumberOfTradesResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevNumberOfTradesResponse): Uint8Array {
    return QueryGetProtoRevNumberOfTradesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevNumberOfTradesResponse): QueryGetProtoRevNumberOfTradesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevNumberOfTradesResponse",
      value: QueryGetProtoRevNumberOfTradesResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevProfitsByDenomRequest(): QueryGetProtoRevProfitsByDenomRequest {
  return {
    denom: ""
  };
}
export const QueryGetProtoRevProfitsByDenomRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomRequest",
  encode(message: QueryGetProtoRevProfitsByDenomRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.denom !== "") {
      writer.uint32(10).string(message.denom);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevProfitsByDenomRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevProfitsByDenomRequest>): QueryGetProtoRevProfitsByDenomRequest {
    const message = createBaseQueryGetProtoRevProfitsByDenomRequest();
    message.denom = object.denom ?? "";
    return message;
  },
  fromAmino(object: QueryGetProtoRevProfitsByDenomRequestAmino): QueryGetProtoRevProfitsByDenomRequest {
    return {
      denom: object.denom
    };
  },
  toAmino(message: QueryGetProtoRevProfitsByDenomRequest): QueryGetProtoRevProfitsByDenomRequestAmino {
    const obj: any = {};
    obj.denom = message.denom;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevProfitsByDenomRequestAminoMsg): QueryGetProtoRevProfitsByDenomRequest {
    return QueryGetProtoRevProfitsByDenomRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevProfitsByDenomRequest): QueryGetProtoRevProfitsByDenomRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-request",
      value: QueryGetProtoRevProfitsByDenomRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevProfitsByDenomRequestProtoMsg): QueryGetProtoRevProfitsByDenomRequest {
    return QueryGetProtoRevProfitsByDenomRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevProfitsByDenomRequest): Uint8Array {
    return QueryGetProtoRevProfitsByDenomRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevProfitsByDenomRequest): QueryGetProtoRevProfitsByDenomRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomRequest",
      value: QueryGetProtoRevProfitsByDenomRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevProfitsByDenomResponse(): QueryGetProtoRevProfitsByDenomResponse {
  return {
    profit: Coin.fromPartial({})
  };
}
export const QueryGetProtoRevProfitsByDenomResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomResponse",
  encode(message: QueryGetProtoRevProfitsByDenomResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.profit !== undefined) {
      Coin.encode(message.profit, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevProfitsByDenomResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profit = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevProfitsByDenomResponse>): QueryGetProtoRevProfitsByDenomResponse {
    const message = createBaseQueryGetProtoRevProfitsByDenomResponse();
    message.profit = object.profit !== undefined && object.profit !== null ? Coin.fromPartial(object.profit) : undefined;
    return message;
  },
  fromAmino(object: QueryGetProtoRevProfitsByDenomResponseAmino): QueryGetProtoRevProfitsByDenomResponse {
    return {
      profit: object?.profit ? Coin.fromAmino(object.profit) : undefined
    };
  },
  toAmino(message: QueryGetProtoRevProfitsByDenomResponse): QueryGetProtoRevProfitsByDenomResponseAmino {
    const obj: any = {};
    obj.profit = message.profit ? Coin.toAmino(message.profit) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevProfitsByDenomResponseAminoMsg): QueryGetProtoRevProfitsByDenomResponse {
    return QueryGetProtoRevProfitsByDenomResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevProfitsByDenomResponse): QueryGetProtoRevProfitsByDenomResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-profits-by-denom-response",
      value: QueryGetProtoRevProfitsByDenomResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevProfitsByDenomResponseProtoMsg): QueryGetProtoRevProfitsByDenomResponse {
    return QueryGetProtoRevProfitsByDenomResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevProfitsByDenomResponse): Uint8Array {
    return QueryGetProtoRevProfitsByDenomResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevProfitsByDenomResponse): QueryGetProtoRevProfitsByDenomResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevProfitsByDenomResponse",
      value: QueryGetProtoRevProfitsByDenomResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllProfitsRequest(): QueryGetProtoRevAllProfitsRequest {
  return {};
}
export const QueryGetProtoRevAllProfitsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsRequest",
  encode(_: QueryGetProtoRevAllProfitsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevAllProfitsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
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
  fromPartial(_: Partial<QueryGetProtoRevAllProfitsRequest>): QueryGetProtoRevAllProfitsRequest {
    const message = createBaseQueryGetProtoRevAllProfitsRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevAllProfitsRequestAmino): QueryGetProtoRevAllProfitsRequest {
    return {};
  },
  toAmino(_: QueryGetProtoRevAllProfitsRequest): QueryGetProtoRevAllProfitsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllProfitsRequestAminoMsg): QueryGetProtoRevAllProfitsRequest {
    return QueryGetProtoRevAllProfitsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllProfitsRequest): QueryGetProtoRevAllProfitsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-profits-request",
      value: QueryGetProtoRevAllProfitsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllProfitsRequestProtoMsg): QueryGetProtoRevAllProfitsRequest {
    return QueryGetProtoRevAllProfitsRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevAllProfitsRequest): Uint8Array {
    return QueryGetProtoRevAllProfitsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllProfitsRequest): QueryGetProtoRevAllProfitsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsRequest",
      value: QueryGetProtoRevAllProfitsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllProfitsResponse(): QueryGetProtoRevAllProfitsResponse {
  return {
    profits: []
  };
}
export const QueryGetProtoRevAllProfitsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsResponse",
  encode(message: QueryGetProtoRevAllProfitsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.profits) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevAllProfitsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.profits.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevAllProfitsResponse>): QueryGetProtoRevAllProfitsResponse {
    const message = createBaseQueryGetProtoRevAllProfitsResponse();
    message.profits = object.profits?.map(e => Coin.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevAllProfitsResponseAmino): QueryGetProtoRevAllProfitsResponse {
    return {
      profits: Array.isArray(object?.profits) ? object.profits.map((e: any) => Coin.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryGetProtoRevAllProfitsResponse): QueryGetProtoRevAllProfitsResponseAmino {
    const obj: any = {};
    if (message.profits) {
      obj.profits = message.profits.map(e => e ? Coin.toAmino(e) : undefined);
    } else {
      obj.profits = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllProfitsResponseAminoMsg): QueryGetProtoRevAllProfitsResponse {
    return QueryGetProtoRevAllProfitsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllProfitsResponse): QueryGetProtoRevAllProfitsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-profits-response",
      value: QueryGetProtoRevAllProfitsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllProfitsResponseProtoMsg): QueryGetProtoRevAllProfitsResponse {
    return QueryGetProtoRevAllProfitsResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevAllProfitsResponse): Uint8Array {
    return QueryGetProtoRevAllProfitsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllProfitsResponse): QueryGetProtoRevAllProfitsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllProfitsResponse",
      value: QueryGetProtoRevAllProfitsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevStatisticsByPoolRequest(): QueryGetProtoRevStatisticsByPoolRequest {
  return {
    poolId: BigInt(0)
  };
}
export const QueryGetProtoRevStatisticsByPoolRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByPoolRequest",
  encode(message: QueryGetProtoRevStatisticsByPoolRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.poolId !== BigInt(0)) {
      writer.uint32(8).uint64(message.poolId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevStatisticsByPoolRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByPoolRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.poolId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevStatisticsByPoolRequest>): QueryGetProtoRevStatisticsByPoolRequest {
    const message = createBaseQueryGetProtoRevStatisticsByPoolRequest();
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: QueryGetProtoRevStatisticsByPoolRequestAmino): QueryGetProtoRevStatisticsByPoolRequest {
    return {
      poolId: BigInt(object.pool_id)
    };
  },
  toAmino(message: QueryGetProtoRevStatisticsByPoolRequest): QueryGetProtoRevStatisticsByPoolRequestAmino {
    const obj: any = {};
    obj.pool_id = message.poolId ? message.poolId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevStatisticsByPoolRequestAminoMsg): QueryGetProtoRevStatisticsByPoolRequest {
    return QueryGetProtoRevStatisticsByPoolRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevStatisticsByPoolRequest): QueryGetProtoRevStatisticsByPoolRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-statistics-by-pool-request",
      value: QueryGetProtoRevStatisticsByPoolRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevStatisticsByPoolRequestProtoMsg): QueryGetProtoRevStatisticsByPoolRequest {
    return QueryGetProtoRevStatisticsByPoolRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevStatisticsByPoolRequest): Uint8Array {
    return QueryGetProtoRevStatisticsByPoolRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevStatisticsByPoolRequest): QueryGetProtoRevStatisticsByPoolRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByPoolRequest",
      value: QueryGetProtoRevStatisticsByPoolRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevStatisticsByPoolResponse(): QueryGetProtoRevStatisticsByPoolResponse {
  return {
    statistics: PoolStatistics.fromPartial({})
  };
}
export const QueryGetProtoRevStatisticsByPoolResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByPoolResponse",
  encode(message: QueryGetProtoRevStatisticsByPoolResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.statistics !== undefined) {
      PoolStatistics.encode(message.statistics, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevStatisticsByPoolResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevStatisticsByPoolResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statistics = PoolStatistics.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevStatisticsByPoolResponse>): QueryGetProtoRevStatisticsByPoolResponse {
    const message = createBaseQueryGetProtoRevStatisticsByPoolResponse();
    message.statistics = object.statistics !== undefined && object.statistics !== null ? PoolStatistics.fromPartial(object.statistics) : undefined;
    return message;
  },
  fromAmino(object: QueryGetProtoRevStatisticsByPoolResponseAmino): QueryGetProtoRevStatisticsByPoolResponse {
    return {
      statistics: object?.statistics ? PoolStatistics.fromAmino(object.statistics) : undefined
    };
  },
  toAmino(message: QueryGetProtoRevStatisticsByPoolResponse): QueryGetProtoRevStatisticsByPoolResponseAmino {
    const obj: any = {};
    obj.statistics = message.statistics ? PoolStatistics.toAmino(message.statistics) : undefined;
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevStatisticsByPoolResponseAminoMsg): QueryGetProtoRevStatisticsByPoolResponse {
    return QueryGetProtoRevStatisticsByPoolResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevStatisticsByPoolResponse): QueryGetProtoRevStatisticsByPoolResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-statistics-by-pool-response",
      value: QueryGetProtoRevStatisticsByPoolResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevStatisticsByPoolResponseProtoMsg): QueryGetProtoRevStatisticsByPoolResponse {
    return QueryGetProtoRevStatisticsByPoolResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevStatisticsByPoolResponse): Uint8Array {
    return QueryGetProtoRevStatisticsByPoolResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevStatisticsByPoolResponse): QueryGetProtoRevStatisticsByPoolResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevStatisticsByPoolResponse",
      value: QueryGetProtoRevStatisticsByPoolResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllStatisticsRequest(): QueryGetProtoRevAllStatisticsRequest {
  return {};
}
export const QueryGetProtoRevAllStatisticsRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllStatisticsRequest",
  encode(_: QueryGetProtoRevAllStatisticsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevAllStatisticsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllStatisticsRequest();
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
  fromPartial(_: Partial<QueryGetProtoRevAllStatisticsRequest>): QueryGetProtoRevAllStatisticsRequest {
    const message = createBaseQueryGetProtoRevAllStatisticsRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevAllStatisticsRequestAmino): QueryGetProtoRevAllStatisticsRequest {
    return {};
  },
  toAmino(_: QueryGetProtoRevAllStatisticsRequest): QueryGetProtoRevAllStatisticsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllStatisticsRequestAminoMsg): QueryGetProtoRevAllStatisticsRequest {
    return QueryGetProtoRevAllStatisticsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllStatisticsRequest): QueryGetProtoRevAllStatisticsRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-statistics-request",
      value: QueryGetProtoRevAllStatisticsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllStatisticsRequestProtoMsg): QueryGetProtoRevAllStatisticsRequest {
    return QueryGetProtoRevAllStatisticsRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevAllStatisticsRequest): Uint8Array {
    return QueryGetProtoRevAllStatisticsRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllStatisticsRequest): QueryGetProtoRevAllStatisticsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllStatisticsRequest",
      value: QueryGetProtoRevAllStatisticsRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevAllStatisticsResponse(): QueryGetProtoRevAllStatisticsResponse {
  return {
    statistics: []
  };
}
export const QueryGetProtoRevAllStatisticsResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllStatisticsResponse",
  encode(message: QueryGetProtoRevAllStatisticsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.statistics) {
      PoolStatistics.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevAllStatisticsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevAllStatisticsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.statistics.push(PoolStatistics.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevAllStatisticsResponse>): QueryGetProtoRevAllStatisticsResponse {
    const message = createBaseQueryGetProtoRevAllStatisticsResponse();
    message.statistics = object.statistics?.map(e => PoolStatistics.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevAllStatisticsResponseAmino): QueryGetProtoRevAllStatisticsResponse {
    return {
      statistics: Array.isArray(object?.statistics) ? object.statistics.map((e: any) => PoolStatistics.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryGetProtoRevAllStatisticsResponse): QueryGetProtoRevAllStatisticsResponseAmino {
    const obj: any = {};
    if (message.statistics) {
      obj.statistics = message.statistics.map(e => e ? PoolStatistics.toAmino(e) : undefined);
    } else {
      obj.statistics = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevAllStatisticsResponseAminoMsg): QueryGetProtoRevAllStatisticsResponse {
    return QueryGetProtoRevAllStatisticsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevAllStatisticsResponse): QueryGetProtoRevAllStatisticsResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-all-statistics-response",
      value: QueryGetProtoRevAllStatisticsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevAllStatisticsResponseProtoMsg): QueryGetProtoRevAllStatisticsResponse {
    return QueryGetProtoRevAllStatisticsResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevAllStatisticsResponse): Uint8Array {
    return QueryGetProtoRevAllStatisticsResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevAllStatisticsResponse): QueryGetProtoRevAllStatisticsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevAllStatisticsResponse",
      value: QueryGetProtoRevAllStatisticsResponse.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevTokenPairArbRoutesRequest(): QueryGetProtoRevTokenPairArbRoutesRequest {
  return {};
}
export const QueryGetProtoRevTokenPairArbRoutesRequest = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesRequest",
  encode(_: QueryGetProtoRevTokenPairArbRoutesRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevTokenPairArbRoutesRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
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
  fromPartial(_: Partial<QueryGetProtoRevTokenPairArbRoutesRequest>): QueryGetProtoRevTokenPairArbRoutesRequest {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesRequest();
    return message;
  },
  fromAmino(_: QueryGetProtoRevTokenPairArbRoutesRequestAmino): QueryGetProtoRevTokenPairArbRoutesRequest {
    return {};
  },
  toAmino(_: QueryGetProtoRevTokenPairArbRoutesRequest): QueryGetProtoRevTokenPairArbRoutesRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevTokenPairArbRoutesRequestAminoMsg): QueryGetProtoRevTokenPairArbRoutesRequest {
    return QueryGetProtoRevTokenPairArbRoutesRequest.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequest): QueryGetProtoRevTokenPairArbRoutesRequestAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-request",
      value: QueryGetProtoRevTokenPairArbRoutesRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequestProtoMsg): QueryGetProtoRevTokenPairArbRoutesRequest {
    return QueryGetProtoRevTokenPairArbRoutesRequest.decode(message.value);
  },
  toProto(message: QueryGetProtoRevTokenPairArbRoutesRequest): Uint8Array {
    return QueryGetProtoRevTokenPairArbRoutesRequest.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesRequest): QueryGetProtoRevTokenPairArbRoutesRequestProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesRequest",
      value: QueryGetProtoRevTokenPairArbRoutesRequest.encode(message).finish()
    };
  }
};
function createBaseQueryGetProtoRevTokenPairArbRoutesResponse(): QueryGetProtoRevTokenPairArbRoutesResponse {
  return {
    routes: []
  };
}
export const QueryGetProtoRevTokenPairArbRoutesResponse = {
  typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesResponse",
  encode(message: QueryGetProtoRevTokenPairArbRoutesResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.routes) {
      TokenPairArbRoutes.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): QueryGetProtoRevTokenPairArbRoutesResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.routes.push(TokenPairArbRoutes.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<QueryGetProtoRevTokenPairArbRoutesResponse>): QueryGetProtoRevTokenPairArbRoutesResponse {
    const message = createBaseQueryGetProtoRevTokenPairArbRoutesResponse();
    message.routes = object.routes?.map(e => TokenPairArbRoutes.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: QueryGetProtoRevTokenPairArbRoutesResponseAmino): QueryGetProtoRevTokenPairArbRoutesResponse {
    return {
      routes: Array.isArray(object?.routes) ? object.routes.map((e: any) => TokenPairArbRoutes.fromAmino(e)) : []
    };
  },
  toAmino(message: QueryGetProtoRevTokenPairArbRoutesResponse): QueryGetProtoRevTokenPairArbRoutesResponseAmino {
    const obj: any = {};
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? TokenPairArbRoutes.toAmino(e) : undefined);
    } else {
      obj.routes = [];
    }
    return obj;
  },
  fromAminoMsg(object: QueryGetProtoRevTokenPairArbRoutesResponseAminoMsg): QueryGetProtoRevTokenPairArbRoutesResponse {
    return QueryGetProtoRevTokenPairArbRoutesResponse.fromAmino(object.value);
  },
  toAminoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponse): QueryGetProtoRevTokenPairArbRoutesResponseAminoMsg {
    return {
      type: "osmosis/protorev/query-get-proto-rev-token-pair-arb-routes-response",
      value: QueryGetProtoRevTokenPairArbRoutesResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponseProtoMsg): QueryGetProtoRevTokenPairArbRoutesResponse {
    return QueryGetProtoRevTokenPairArbRoutesResponse.decode(message.value);
  },
  toProto(message: QueryGetProtoRevTokenPairArbRoutesResponse): Uint8Array {
    return QueryGetProtoRevTokenPairArbRoutesResponse.encode(message).finish();
  },
  toProtoMsg(message: QueryGetProtoRevTokenPairArbRoutesResponse): QueryGetProtoRevTokenPairArbRoutesResponseProtoMsg {
    return {
      typeUrl: "/osmosis.protorev.v1beta1.QueryGetProtoRevTokenPairArbRoutesResponse",
      value: QueryGetProtoRevTokenPairArbRoutesResponse.encode(message).finish()
    };
  }
};