import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryByHashRequest, QueryByHashResponse, QueryBySignerRequest, QueryBySignerResponse } from "./query";
/** Query is the regen.data.v1alpha2 Query service */
export interface Query {
  /** ByHash queries data based on its ContentHash. */
  byHash(request: QueryByHashRequest): Promise<QueryByHashResponse>;
  /** BySigner queries data based on signers. */
  bySigner(request: QueryBySignerRequest): Promise<QueryBySignerResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.byHash = this.byHash.bind(this);
    this.bySigner = this.bySigner.bind(this);
  }
  byHash(request: QueryByHashRequest): Promise<QueryByHashResponse> {
    const data = QueryByHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1alpha2.Query", "ByHash", data);
    return promise.then(data => QueryByHashResponse.decode(new BinaryReader(data)));
  }
  bySigner(request: QueryBySignerRequest): Promise<QueryBySignerResponse> {
    const data = QueryBySignerRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1alpha2.Query", "BySigner", data);
    return promise.then(data => QueryBySignerResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    byHash(request: QueryByHashRequest): Promise<QueryByHashResponse> {
      return queryService.byHash(request);
    },
    bySigner(request: QueryBySignerRequest): Promise<QueryBySignerResponse> {
      return queryService.bySigner(request);
    }
  };
};