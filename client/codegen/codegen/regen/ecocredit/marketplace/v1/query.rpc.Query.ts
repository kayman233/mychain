import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QuerySellOrderRequest, QuerySellOrderResponse, QuerySellOrdersRequest, QuerySellOrdersResponse, QuerySellOrdersByBatchDenomRequest, QuerySellOrdersByBatchDenomResponse, QuerySellOrdersByAddressRequest, QuerySellOrdersByAddressResponse, QueryAllowedDenomsRequest, QueryAllowedDenomsResponse } from "./query";
/** Msg is the regen.ecocredit.marketplace.v1 Query service. */
export interface Query {
  /** SellOrder queries a sell order by its ID */
  sellOrder(request: QuerySellOrderRequest): Promise<QuerySellOrderResponse>;
  /** SellOrders queries a paginated list of all sell orders */
  sellOrders(request?: QuerySellOrdersRequest): Promise<QuerySellOrdersResponse>;
  /**
   * SellOrdersByDenom queries a paginated list of all sell orders of a specific
   * ecocredit denom
   */
  sellOrdersByBatchDenom(request: QuerySellOrdersByBatchDenomRequest): Promise<QuerySellOrdersByBatchDenomResponse>;
  /**
   * SellOrdersByAddress queries a paginated list of all sell orders from a
   * specific address
   */
  sellOrdersByAddress(request: QuerySellOrdersByAddressRequest): Promise<QuerySellOrdersByAddressResponse>;
  /**
   * AllowedDenoms queries all denoms allowed to be set in the AskPrice of a
   * sell order
   */
  allowedDenoms(request?: QueryAllowedDenomsRequest): Promise<QueryAllowedDenomsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.sellOrder = this.sellOrder.bind(this);
    this.sellOrders = this.sellOrders.bind(this);
    this.sellOrdersByBatchDenom = this.sellOrdersByBatchDenom.bind(this);
    this.sellOrdersByAddress = this.sellOrdersByAddress.bind(this);
    this.allowedDenoms = this.allowedDenoms.bind(this);
  }
  sellOrder(request: QuerySellOrderRequest): Promise<QuerySellOrderResponse> {
    const data = QuerySellOrderRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Query", "SellOrder", data);
    return promise.then(data => QuerySellOrderResponse.decode(new BinaryReader(data)));
  }
  sellOrders(request: QuerySellOrdersRequest = {
    pagination: undefined
  }): Promise<QuerySellOrdersResponse> {
    const data = QuerySellOrdersRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Query", "SellOrders", data);
    return promise.then(data => QuerySellOrdersResponse.decode(new BinaryReader(data)));
  }
  sellOrdersByBatchDenom(request: QuerySellOrdersByBatchDenomRequest): Promise<QuerySellOrdersByBatchDenomResponse> {
    const data = QuerySellOrdersByBatchDenomRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Query", "SellOrdersByBatchDenom", data);
    return promise.then(data => QuerySellOrdersByBatchDenomResponse.decode(new BinaryReader(data)));
  }
  sellOrdersByAddress(request: QuerySellOrdersByAddressRequest): Promise<QuerySellOrdersByAddressResponse> {
    const data = QuerySellOrdersByAddressRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Query", "SellOrdersByAddress", data);
    return promise.then(data => QuerySellOrdersByAddressResponse.decode(new BinaryReader(data)));
  }
  allowedDenoms(request: QueryAllowedDenomsRequest = {
    pagination: undefined
  }): Promise<QueryAllowedDenomsResponse> {
    const data = QueryAllowedDenomsRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.marketplace.v1.Query", "AllowedDenoms", data);
    return promise.then(data => QueryAllowedDenomsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    sellOrder(request: QuerySellOrderRequest): Promise<QuerySellOrderResponse> {
      return queryService.sellOrder(request);
    },
    sellOrders(request?: QuerySellOrdersRequest): Promise<QuerySellOrdersResponse> {
      return queryService.sellOrders(request);
    },
    sellOrdersByBatchDenom(request: QuerySellOrdersByBatchDenomRequest): Promise<QuerySellOrdersByBatchDenomResponse> {
      return queryService.sellOrdersByBatchDenom(request);
    },
    sellOrdersByAddress(request: QuerySellOrdersByAddressRequest): Promise<QuerySellOrdersByAddressResponse> {
      return queryService.sellOrdersByAddress(request);
    },
    allowedDenoms(request?: QueryAllowedDenomsRequest): Promise<QueryAllowedDenomsResponse> {
      return queryService.allowedDenoms(request);
    }
  };
};