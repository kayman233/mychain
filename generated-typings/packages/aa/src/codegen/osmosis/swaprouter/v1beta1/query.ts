import { SwapAmountInRoute, SwapAmountInRouteSDKType, SwapAmountOutRoute, SwapAmountOutRouteSDKType } from "./swap_route";
import { Params, ParamsSDKType } from "./genesis";
import { BinaryReader, BinaryWriter } from "../../../binary";
/** =============================== Params */
export interface ParamsRequest {}
/** =============================== Params */
export interface ParamsRequestSDKType {}
export interface ParamsResponse {
  params: Params;
}
export interface ParamsResponseSDKType {
  params: ParamsSDKType;
}
/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequest {
  /** TODO: CHANGE THIS TO RESERVED IN A PATCH RELEASE */
  sender: string;
  poolId: bigint;
  tokenIn: string;
  routes: SwapAmountInRoute[];
}
/** =============================== EstimateSwapExactAmountIn */
export interface EstimateSwapExactAmountInRequestSDKType {
  sender: string;
  pool_id: bigint;
  token_in: string;
  routes: SwapAmountInRouteSDKType[];
}
export interface EstimateSwapExactAmountInResponse {
  tokenOutAmount: string;
}
export interface EstimateSwapExactAmountInResponseSDKType {
  token_out_amount: string;
}
/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequest {
  /** TODO: CHANGE THIS TO RESERVED IN A PATCH RELEASE */
  sender: string;
  poolId: bigint;
  routes: SwapAmountOutRoute[];
  tokenOut: string;
}
/** =============================== EstimateSwapExactAmountOut */
export interface EstimateSwapExactAmountOutRequestSDKType {
  sender: string;
  pool_id: bigint;
  routes: SwapAmountOutRouteSDKType[];
  token_out: string;
}
export interface EstimateSwapExactAmountOutResponse {
  tokenInAmount: string;
}
export interface EstimateSwapExactAmountOutResponseSDKType {
  token_in_amount: string;
}
/** =============================== NumPools */
export interface NumPoolsRequest {}
/** =============================== NumPools */
export interface NumPoolsRequestSDKType {}
export interface NumPoolsResponse {
  numPools: bigint;
}
export interface NumPoolsResponseSDKType {
  num_pools: bigint;
}
function createBaseParamsRequest(): ParamsRequest {
  return {};
}
export const ParamsRequest = {
  typeUrl: "/osmosis.swaprouter.v1beta1.ParamsRequest",
  encode(_: ParamsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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
  fromPartial(_: Partial<ParamsRequest>): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
  fromAmino(_: ParamsRequestAmino): ParamsRequest {
    return {};
  },
  toAmino(_: ParamsRequest): ParamsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: ParamsRequestAminoMsg): ParamsRequest {
    return ParamsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: ParamsRequest): ParamsRequestAminoMsg {
    return {
      type: "osmosis/swaprouter/params-request",
      value: ParamsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: ParamsRequestProtoMsg): ParamsRequest {
    return ParamsRequest.decode(message.value);
  },
  toProto(message: ParamsRequest): Uint8Array {
    return ParamsRequest.encode(message).finish();
  },
  toProtoMsg(message: ParamsRequest): ParamsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.ParamsRequest",
      value: ParamsRequest.encode(message).finish()
    };
  }
};
function createBaseParamsResponse(): ParamsResponse {
  return {
    params: Params.fromPartial({})
  };
}
export const ParamsResponse = {
  typeUrl: "/osmosis.swaprouter.v1beta1.ParamsResponse",
  encode(message: ParamsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
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
  fromPartial(object: Partial<ParamsResponse>): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params = object.params !== undefined && object.params !== null ? Params.fromPartial(object.params) : undefined;
    return message;
  },
  fromAmino(object: ParamsResponseAmino): ParamsResponse {
    return {
      params: object?.params ? Params.fromAmino(object.params) : undefined
    };
  },
  toAmino(message: ParamsResponse): ParamsResponseAmino {
    const obj: any = {};
    obj.params = message.params ? Params.toAmino(message.params) : undefined;
    return obj;
  },
  fromAminoMsg(object: ParamsResponseAminoMsg): ParamsResponse {
    return ParamsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: ParamsResponse): ParamsResponseAminoMsg {
    return {
      type: "osmosis/swaprouter/params-response",
      value: ParamsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: ParamsResponseProtoMsg): ParamsResponse {
    return ParamsResponse.decode(message.value);
  },
  toProto(message: ParamsResponse): Uint8Array {
    return ParamsResponse.encode(message).finish();
  },
  toProtoMsg(message: ParamsResponse): ParamsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.ParamsResponse",
      value: ParamsResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountInRequest(): EstimateSwapExactAmountInRequest {
  return {
    sender: "",
    poolId: BigInt(0),
    tokenIn: "",
    routes: []
  };
}
export const EstimateSwapExactAmountInRequest = {
  typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountInRequest",
  encode(message: EstimateSwapExactAmountInRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    if (message.tokenIn !== "") {
      writer.uint32(26).string(message.tokenIn);
    }
    for (const v of message.routes) {
      SwapAmountInRoute.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EstimateSwapExactAmountInRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.tokenIn = reader.string();
          break;
        case 4:
          message.routes.push(SwapAmountInRoute.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountInRequest>): EstimateSwapExactAmountInRequest {
    const message = createBaseEstimateSwapExactAmountInRequest();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.tokenIn = object.tokenIn ?? "";
    message.routes = object.routes?.map(e => SwapAmountInRoute.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInRequestAmino): EstimateSwapExactAmountInRequest {
    return {
      sender: object.sender,
      poolId: BigInt(object.pool_id),
      tokenIn: object.token_in,
      routes: Array.isArray(object?.routes) ? object.routes.map((e: any) => SwapAmountInRoute.fromAmino(e)) : []
    };
  },
  toAmino(message: EstimateSwapExactAmountInRequest): EstimateSwapExactAmountInRequestAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.pool_id = message.poolId ? message.poolId.toString() : undefined;
    obj.token_in = message.tokenIn;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountInRoute.toAmino(e) : undefined);
    } else {
      obj.routes = [];
    }
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountInRequestAminoMsg): EstimateSwapExactAmountInRequest {
    return EstimateSwapExactAmountInRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountInRequest): EstimateSwapExactAmountInRequestAminoMsg {
    return {
      type: "osmosis/swaprouter/estimate-swap-exact-amount-in-request",
      value: EstimateSwapExactAmountInRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountInRequestProtoMsg): EstimateSwapExactAmountInRequest {
    return EstimateSwapExactAmountInRequest.decode(message.value);
  },
  toProto(message: EstimateSwapExactAmountInRequest): Uint8Array {
    return EstimateSwapExactAmountInRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountInRequest): EstimateSwapExactAmountInRequestProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountInRequest",
      value: EstimateSwapExactAmountInRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountInResponse(): EstimateSwapExactAmountInResponse {
  return {
    tokenOutAmount: ""
  };
}
export const EstimateSwapExactAmountInResponse = {
  typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountInResponse",
  encode(message: EstimateSwapExactAmountInResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenOutAmount !== "") {
      writer.uint32(10).string(message.tokenOutAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EstimateSwapExactAmountInResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountInResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenOutAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountInResponse>): EstimateSwapExactAmountInResponse {
    const message = createBaseEstimateSwapExactAmountInResponse();
    message.tokenOutAmount = object.tokenOutAmount ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountInResponseAmino): EstimateSwapExactAmountInResponse {
    return {
      tokenOutAmount: object.token_out_amount
    };
  },
  toAmino(message: EstimateSwapExactAmountInResponse): EstimateSwapExactAmountInResponseAmino {
    const obj: any = {};
    obj.token_out_amount = message.tokenOutAmount;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountInResponseAminoMsg): EstimateSwapExactAmountInResponse {
    return EstimateSwapExactAmountInResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountInResponse): EstimateSwapExactAmountInResponseAminoMsg {
    return {
      type: "osmosis/swaprouter/estimate-swap-exact-amount-in-response",
      value: EstimateSwapExactAmountInResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountInResponseProtoMsg): EstimateSwapExactAmountInResponse {
    return EstimateSwapExactAmountInResponse.decode(message.value);
  },
  toProto(message: EstimateSwapExactAmountInResponse): Uint8Array {
    return EstimateSwapExactAmountInResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountInResponse): EstimateSwapExactAmountInResponseProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountInResponse",
      value: EstimateSwapExactAmountInResponse.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountOutRequest(): EstimateSwapExactAmountOutRequest {
  return {
    sender: "",
    poolId: BigInt(0),
    routes: [],
    tokenOut: ""
  };
}
export const EstimateSwapExactAmountOutRequest = {
  typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountOutRequest",
  encode(message: EstimateSwapExactAmountOutRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    if (message.poolId !== BigInt(0)) {
      writer.uint32(16).uint64(message.poolId);
    }
    for (const v of message.routes) {
      SwapAmountOutRoute.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.tokenOut !== "") {
      writer.uint32(34).string(message.tokenOut);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EstimateSwapExactAmountOutRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        case 2:
          message.poolId = reader.uint64();
          break;
        case 3:
          message.routes.push(SwapAmountOutRoute.decode(reader, reader.uint32()));
          break;
        case 4:
          message.tokenOut = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountOutRequest>): EstimateSwapExactAmountOutRequest {
    const message = createBaseEstimateSwapExactAmountOutRequest();
    message.sender = object.sender ?? "";
    message.poolId = object.poolId !== undefined && object.poolId !== null ? BigInt(object.poolId.toString()) : BigInt(0);
    message.routes = object.routes?.map(e => SwapAmountOutRoute.fromPartial(e)) || [];
    message.tokenOut = object.tokenOut ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutRequestAmino): EstimateSwapExactAmountOutRequest {
    return {
      sender: object.sender,
      poolId: BigInt(object.pool_id),
      routes: Array.isArray(object?.routes) ? object.routes.map((e: any) => SwapAmountOutRoute.fromAmino(e)) : [],
      tokenOut: object.token_out
    };
  },
  toAmino(message: EstimateSwapExactAmountOutRequest): EstimateSwapExactAmountOutRequestAmino {
    const obj: any = {};
    obj.sender = message.sender;
    obj.pool_id = message.poolId ? message.poolId.toString() : undefined;
    if (message.routes) {
      obj.routes = message.routes.map(e => e ? SwapAmountOutRoute.toAmino(e) : undefined);
    } else {
      obj.routes = [];
    }
    obj.token_out = message.tokenOut;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountOutRequestAminoMsg): EstimateSwapExactAmountOutRequest {
    return EstimateSwapExactAmountOutRequest.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountOutRequest): EstimateSwapExactAmountOutRequestAminoMsg {
    return {
      type: "osmosis/swaprouter/estimate-swap-exact-amount-out-request",
      value: EstimateSwapExactAmountOutRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountOutRequestProtoMsg): EstimateSwapExactAmountOutRequest {
    return EstimateSwapExactAmountOutRequest.decode(message.value);
  },
  toProto(message: EstimateSwapExactAmountOutRequest): Uint8Array {
    return EstimateSwapExactAmountOutRequest.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountOutRequest): EstimateSwapExactAmountOutRequestProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountOutRequest",
      value: EstimateSwapExactAmountOutRequest.encode(message).finish()
    };
  }
};
function createBaseEstimateSwapExactAmountOutResponse(): EstimateSwapExactAmountOutResponse {
  return {
    tokenInAmount: ""
  };
}
export const EstimateSwapExactAmountOutResponse = {
  typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountOutResponse",
  encode(message: EstimateSwapExactAmountOutResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.tokenInAmount !== "") {
      writer.uint32(10).string(message.tokenInAmount);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EstimateSwapExactAmountOutResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEstimateSwapExactAmountOutResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.tokenInAmount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EstimateSwapExactAmountOutResponse>): EstimateSwapExactAmountOutResponse {
    const message = createBaseEstimateSwapExactAmountOutResponse();
    message.tokenInAmount = object.tokenInAmount ?? "";
    return message;
  },
  fromAmino(object: EstimateSwapExactAmountOutResponseAmino): EstimateSwapExactAmountOutResponse {
    return {
      tokenInAmount: object.token_in_amount
    };
  },
  toAmino(message: EstimateSwapExactAmountOutResponse): EstimateSwapExactAmountOutResponseAmino {
    const obj: any = {};
    obj.token_in_amount = message.tokenInAmount;
    return obj;
  },
  fromAminoMsg(object: EstimateSwapExactAmountOutResponseAminoMsg): EstimateSwapExactAmountOutResponse {
    return EstimateSwapExactAmountOutResponse.fromAmino(object.value);
  },
  toAminoMsg(message: EstimateSwapExactAmountOutResponse): EstimateSwapExactAmountOutResponseAminoMsg {
    return {
      type: "osmosis/swaprouter/estimate-swap-exact-amount-out-response",
      value: EstimateSwapExactAmountOutResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: EstimateSwapExactAmountOutResponseProtoMsg): EstimateSwapExactAmountOutResponse {
    return EstimateSwapExactAmountOutResponse.decode(message.value);
  },
  toProto(message: EstimateSwapExactAmountOutResponse): Uint8Array {
    return EstimateSwapExactAmountOutResponse.encode(message).finish();
  },
  toProtoMsg(message: EstimateSwapExactAmountOutResponse): EstimateSwapExactAmountOutResponseProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.EstimateSwapExactAmountOutResponse",
      value: EstimateSwapExactAmountOutResponse.encode(message).finish()
    };
  }
};
function createBaseNumPoolsRequest(): NumPoolsRequest {
  return {};
}
export const NumPoolsRequest = {
  typeUrl: "/osmosis.swaprouter.v1beta1.NumPoolsRequest",
  encode(_: NumPoolsRequest, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NumPoolsRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsRequest();
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
  fromPartial(_: Partial<NumPoolsRequest>): NumPoolsRequest {
    const message = createBaseNumPoolsRequest();
    return message;
  },
  fromAmino(_: NumPoolsRequestAmino): NumPoolsRequest {
    return {};
  },
  toAmino(_: NumPoolsRequest): NumPoolsRequestAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: NumPoolsRequestAminoMsg): NumPoolsRequest {
    return NumPoolsRequest.fromAmino(object.value);
  },
  toAminoMsg(message: NumPoolsRequest): NumPoolsRequestAminoMsg {
    return {
      type: "osmosis/swaprouter/num-pools-request",
      value: NumPoolsRequest.toAmino(message)
    };
  },
  fromProtoMsg(message: NumPoolsRequestProtoMsg): NumPoolsRequest {
    return NumPoolsRequest.decode(message.value);
  },
  toProto(message: NumPoolsRequest): Uint8Array {
    return NumPoolsRequest.encode(message).finish();
  },
  toProtoMsg(message: NumPoolsRequest): NumPoolsRequestProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.NumPoolsRequest",
      value: NumPoolsRequest.encode(message).finish()
    };
  }
};
function createBaseNumPoolsResponse(): NumPoolsResponse {
  return {
    numPools: BigInt(0)
  };
}
export const NumPoolsResponse = {
  typeUrl: "/osmosis.swaprouter.v1beta1.NumPoolsResponse",
  encode(message: NumPoolsResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.numPools !== BigInt(0)) {
      writer.uint32(8).uint64(message.numPools);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NumPoolsResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumPoolsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numPools = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NumPoolsResponse>): NumPoolsResponse {
    const message = createBaseNumPoolsResponse();
    message.numPools = object.numPools !== undefined && object.numPools !== null ? BigInt(object.numPools.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: NumPoolsResponseAmino): NumPoolsResponse {
    return {
      numPools: BigInt(object.num_pools)
    };
  },
  toAmino(message: NumPoolsResponse): NumPoolsResponseAmino {
    const obj: any = {};
    obj.num_pools = message.numPools ? message.numPools.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: NumPoolsResponseAminoMsg): NumPoolsResponse {
    return NumPoolsResponse.fromAmino(object.value);
  },
  toAminoMsg(message: NumPoolsResponse): NumPoolsResponseAminoMsg {
    return {
      type: "osmosis/swaprouter/num-pools-response",
      value: NumPoolsResponse.toAmino(message)
    };
  },
  fromProtoMsg(message: NumPoolsResponseProtoMsg): NumPoolsResponse {
    return NumPoolsResponse.decode(message.value);
  },
  toProto(message: NumPoolsResponse): Uint8Array {
    return NumPoolsResponse.encode(message).finish();
  },
  toProtoMsg(message: NumPoolsResponse): NumPoolsResponseProtoMsg {
    return {
      typeUrl: "/osmosis.swaprouter.v1beta1.NumPoolsResponse",
      value: NumPoolsResponse.encode(message).finish()
    };
  }
};