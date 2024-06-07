import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryProvidersRequest, QueryProvidersResponse, QueryProviderRequest, QueryProviderResponse } from "./query";
/** Query defines the gRPC querier service */
export interface Query {
  /** Providers queries providers */
  providers(request?: QueryProvidersRequest): Promise<QueryProvidersResponse>;
  /** Provider queries provider details */
  provider(request: QueryProviderRequest): Promise<QueryProviderResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.providers = this.providers.bind(this);
    this.provider = this.provider.bind(this);
  }
  providers(request: QueryProvidersRequest = {
    pagination: undefined
  }): Promise<QueryProvidersResponse> {
    const data = QueryProvidersRequest.encode(request).finish();
    const promise = this.rpc.request("akash.provider.v1beta2.Query", "Providers", data);
    return promise.then(data => QueryProvidersResponse.decode(new BinaryReader(data)));
  }
  provider(request: QueryProviderRequest): Promise<QueryProviderResponse> {
    const data = QueryProviderRequest.encode(request).finish();
    const promise = this.rpc.request("akash.provider.v1beta2.Query", "Provider", data);
    return promise.then(data => QueryProviderResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    providers(request?: QueryProvidersRequest): Promise<QueryProvidersResponse> {
      return queryService.providers(request);
    },
    provider(request: QueryProviderRequest): Promise<QueryProviderResponse> {
      return queryService.provider(request);
    }
  };
};