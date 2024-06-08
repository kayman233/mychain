import { setPaginationParams } from "../../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QuerySellOrderRequest, QuerySellOrderResponseSDKType, QuerySellOrdersRequest, QuerySellOrdersResponseSDKType, QuerySellOrdersByBatchDenomRequest, QuerySellOrdersByBatchDenomResponseSDKType, QuerySellOrdersByAddressRequest, QuerySellOrdersByAddressResponseSDKType, QueryAllowedDenomsRequest, QueryAllowedDenomsResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.sellOrder = this.sellOrder.bind(this);
    this.sellOrders = this.sellOrders.bind(this);
    this.sellOrdersByBatchDenom = this.sellOrdersByBatchDenom.bind(this);
    this.sellOrdersByAddress = this.sellOrdersByAddress.bind(this);
    this.allowedDenoms = this.allowedDenoms.bind(this);
  }
  /* SellOrder queries a sell order by its ID */
  async sellOrder(params: QuerySellOrderRequest): Promise<QuerySellOrderResponseSDKType> {
    const endpoint = `regen/ecocredit/marketplace/v1/sell-orders/${params.sellOrderId}`;
    return await this.req.get<QuerySellOrderResponseSDKType>(endpoint);
  }
  /* SellOrders queries a paginated list of all sell orders */
  async sellOrders(params: QuerySellOrdersRequest = {
    pagination: undefined
  }): Promise<QuerySellOrdersResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/marketplace/v1/sell-orders`;
    return await this.req.get<QuerySellOrdersResponseSDKType>(endpoint, options);
  }
  /* SellOrdersByDenom queries a paginated list of all sell orders of a specific
   ecocredit denom */
  async sellOrdersByBatchDenom(params: QuerySellOrdersByBatchDenomRequest): Promise<QuerySellOrdersByBatchDenomResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/marketplace/v1/sell-orders/batch-denom/${params.batchDenom}`;
    return await this.req.get<QuerySellOrdersByBatchDenomResponseSDKType>(endpoint, options);
  }
  /* SellOrdersByAddress queries a paginated list of all sell orders from a
   specific address */
  async sellOrdersByAddress(params: QuerySellOrdersByAddressRequest): Promise<QuerySellOrdersByAddressResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/marketplace/v1/sell-orders/address/${params.address}`;
    return await this.req.get<QuerySellOrdersByAddressResponseSDKType>(endpoint, options);
  }
  /* AllowedDenoms queries all denoms allowed to be set in the AskPrice of a
   sell order */
  async allowedDenoms(params: QueryAllowedDenomsRequest = {
    pagination: undefined
  }): Promise<QueryAllowedDenomsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/marketplace/v1/allowed-denoms`;
    return await this.req.get<QueryAllowedDenomsResponseSDKType>(endpoint, options);
  }
}