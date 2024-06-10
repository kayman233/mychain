import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryByIRIRequest, QueryByIRIResponse, QueryByHashRequest, QueryByHashResponse, QueryByAttestorRequest, QueryByAttestorResponse, QueryIRIByHashRequest, QueryIRIByHashResponse, QueryIRIByRawHashRequest, QueryIRIByRawHashResponse, QueryIRIByGraphHashRequest, QueryIRIByGraphHashResponse, QueryHashByIRIRequest, QueryHashByIRIResponse, QueryAttestorsByIRIRequest, QueryAttestorsByIRIResponse, QueryAttestorsByHashRequest, QueryAttestorsByHashResponse, QueryResolversByIRIRequest, QueryResolversByIRIResponse, QueryResolversByHashRequest, QueryResolversByHashResponse, QueryResolverInfoRequest, QueryResolverInfoResponse } from "./query";
/** Query is the regen.data.v1 Query service */
export interface Query {
  /** ByIRI queries data based on IRI. */
  byIRI(request: QueryByIRIRequest): Promise<QueryByIRIResponse>;
  /** ByHash queries data based on ContentHash. */
  byHash(request: QueryByHashRequest): Promise<QueryByHashResponse>;
  /** ByAttestor queries data based on attestor. */
  byAttestor(request: QueryByAttestorRequest): Promise<QueryByAttestorResponse>;
  /** IRIByHash queries IRI based on ContentHash. */
  iRIByHash(request: QueryIRIByHashRequest): Promise<QueryIRIByHashResponse>;
  /** IRIByRawHash queries IRI based on ContentHash_Raw properties. */
  iRIByRawHash(request: QueryIRIByRawHashRequest): Promise<QueryIRIByRawHashResponse>;
  /** IRIByGraphHash queries IRI based on ContentHash_Graph properties. */
  iRIByGraphHash(request: QueryIRIByGraphHashRequest): Promise<QueryIRIByGraphHashResponse>;
  /** HashByIRI queries ContentHash based on IRI. */
  hashByIRI(request: QueryHashByIRIRequest): Promise<QueryHashByIRIResponse>;
  /** AttestorsByIRI queries attestors based on IRI. */
  attestorsByIRI(request: QueryAttestorsByIRIRequest): Promise<QueryAttestorsByIRIResponse>;
  /** AttestorsByHash queries attestors based on ContentHash. */
  attestorsByHash(request: QueryAttestorsByHashRequest): Promise<QueryAttestorsByHashResponse>;
  /** ResolversByIRI queries resolvers based on IRI. */
  resolversByIRI(request: QueryResolversByIRIRequest): Promise<QueryResolversByIRIResponse>;
  /** ResolversByHash queries resolvers based on ContentHash. */
  resolversByHash(request: QueryResolversByHashRequest): Promise<QueryResolversByHashResponse>;
  /** ResolverInfo queries information about a resolved based on URL. */
  resolverInfo(request: QueryResolverInfoRequest): Promise<QueryResolverInfoResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.byIRI = this.byIRI.bind(this);
    this.byHash = this.byHash.bind(this);
    this.byAttestor = this.byAttestor.bind(this);
    this.iRIByHash = this.iRIByHash.bind(this);
    this.iRIByRawHash = this.iRIByRawHash.bind(this);
    this.iRIByGraphHash = this.iRIByGraphHash.bind(this);
    this.hashByIRI = this.hashByIRI.bind(this);
    this.attestorsByIRI = this.attestorsByIRI.bind(this);
    this.attestorsByHash = this.attestorsByHash.bind(this);
    this.resolversByIRI = this.resolversByIRI.bind(this);
    this.resolversByHash = this.resolversByHash.bind(this);
    this.resolverInfo = this.resolverInfo.bind(this);
  }
  byIRI(request: QueryByIRIRequest): Promise<QueryByIRIResponse> {
    const data = QueryByIRIRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ByIRI", data);
    return promise.then(data => QueryByIRIResponse.decode(new BinaryReader(data)));
  }
  byHash(request: QueryByHashRequest): Promise<QueryByHashResponse> {
    const data = QueryByHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ByHash", data);
    return promise.then(data => QueryByHashResponse.decode(new BinaryReader(data)));
  }
  byAttestor(request: QueryByAttestorRequest): Promise<QueryByAttestorResponse> {
    const data = QueryByAttestorRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ByAttestor", data);
    return promise.then(data => QueryByAttestorResponse.decode(new BinaryReader(data)));
  }
  iRIByHash(request: QueryIRIByHashRequest): Promise<QueryIRIByHashResponse> {
    const data = QueryIRIByHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "IRIByHash", data);
    return promise.then(data => QueryIRIByHashResponse.decode(new BinaryReader(data)));
  }
  iRIByRawHash(request: QueryIRIByRawHashRequest): Promise<QueryIRIByRawHashResponse> {
    const data = QueryIRIByRawHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "IRIByRawHash", data);
    return promise.then(data => QueryIRIByRawHashResponse.decode(new BinaryReader(data)));
  }
  iRIByGraphHash(request: QueryIRIByGraphHashRequest): Promise<QueryIRIByGraphHashResponse> {
    const data = QueryIRIByGraphHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "IRIByGraphHash", data);
    return promise.then(data => QueryIRIByGraphHashResponse.decode(new BinaryReader(data)));
  }
  hashByIRI(request: QueryHashByIRIRequest): Promise<QueryHashByIRIResponse> {
    const data = QueryHashByIRIRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "HashByIRI", data);
    return promise.then(data => QueryHashByIRIResponse.decode(new BinaryReader(data)));
  }
  attestorsByIRI(request: QueryAttestorsByIRIRequest): Promise<QueryAttestorsByIRIResponse> {
    const data = QueryAttestorsByIRIRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "AttestorsByIRI", data);
    return promise.then(data => QueryAttestorsByIRIResponse.decode(new BinaryReader(data)));
  }
  attestorsByHash(request: QueryAttestorsByHashRequest): Promise<QueryAttestorsByHashResponse> {
    const data = QueryAttestorsByHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "AttestorsByHash", data);
    return promise.then(data => QueryAttestorsByHashResponse.decode(new BinaryReader(data)));
  }
  resolversByIRI(request: QueryResolversByIRIRequest): Promise<QueryResolversByIRIResponse> {
    const data = QueryResolversByIRIRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ResolversByIRI", data);
    return promise.then(data => QueryResolversByIRIResponse.decode(new BinaryReader(data)));
  }
  resolversByHash(request: QueryResolversByHashRequest): Promise<QueryResolversByHashResponse> {
    const data = QueryResolversByHashRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ResolversByHash", data);
    return promise.then(data => QueryResolversByHashResponse.decode(new BinaryReader(data)));
  }
  resolverInfo(request: QueryResolverInfoRequest): Promise<QueryResolverInfoResponse> {
    const data = QueryResolverInfoRequest.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1.Query", "ResolverInfo", data);
    return promise.then(data => QueryResolverInfoResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    byIRI(request: QueryByIRIRequest): Promise<QueryByIRIResponse> {
      return queryService.byIRI(request);
    },
    byHash(request: QueryByHashRequest): Promise<QueryByHashResponse> {
      return queryService.byHash(request);
    },
    byAttestor(request: QueryByAttestorRequest): Promise<QueryByAttestorResponse> {
      return queryService.byAttestor(request);
    },
    iRIByHash(request: QueryIRIByHashRequest): Promise<QueryIRIByHashResponse> {
      return queryService.iRIByHash(request);
    },
    iRIByRawHash(request: QueryIRIByRawHashRequest): Promise<QueryIRIByRawHashResponse> {
      return queryService.iRIByRawHash(request);
    },
    iRIByGraphHash(request: QueryIRIByGraphHashRequest): Promise<QueryIRIByGraphHashResponse> {
      return queryService.iRIByGraphHash(request);
    },
    hashByIRI(request: QueryHashByIRIRequest): Promise<QueryHashByIRIResponse> {
      return queryService.hashByIRI(request);
    },
    attestorsByIRI(request: QueryAttestorsByIRIRequest): Promise<QueryAttestorsByIRIResponse> {
      return queryService.attestorsByIRI(request);
    },
    attestorsByHash(request: QueryAttestorsByHashRequest): Promise<QueryAttestorsByHashResponse> {
      return queryService.attestorsByHash(request);
    },
    resolversByIRI(request: QueryResolversByIRIRequest): Promise<QueryResolversByIRIResponse> {
      return queryService.resolversByIRI(request);
    },
    resolversByHash(request: QueryResolversByHashRequest): Promise<QueryResolversByHashResponse> {
      return queryService.resolversByHash(request);
    },
    resolverInfo(request: QueryResolverInfoRequest): Promise<QueryResolverInfoResponse> {
      return queryService.resolverInfo(request);
    }
  };
};