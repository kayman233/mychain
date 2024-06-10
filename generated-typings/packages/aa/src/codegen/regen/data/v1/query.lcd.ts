import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryByIRIRequest, QueryByIRIResponseSDKType, QueryByAttestorRequest, QueryByAttestorResponseSDKType, QueryIRIByRawHashRequest, QueryIRIByRawHashResponseSDKType, QueryIRIByGraphHashRequest, QueryIRIByGraphHashResponseSDKType, QueryHashByIRIRequest, QueryHashByIRIResponseSDKType, QueryAttestorsByIRIRequest, QueryAttestorsByIRIResponseSDKType, QueryResolversByIRIRequest, QueryResolversByIRIResponseSDKType, QueryResolverInfoRequest, QueryResolverInfoResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.byIRI = this.byIRI.bind(this);
    this.byAttestor = this.byAttestor.bind(this);
    this.iRIByRawHash = this.iRIByRawHash.bind(this);
    this.iRIByGraphHash = this.iRIByGraphHash.bind(this);
    this.hashByIRI = this.hashByIRI.bind(this);
    this.attestorsByIRI = this.attestorsByIRI.bind(this);
    this.resolversByIRI = this.resolversByIRI.bind(this);
    this.resolverInfo = this.resolverInfo.bind(this);
  }
  /* ByIRI queries data based on IRI. */
  async byIRI(params: QueryByIRIRequest): Promise<QueryByIRIResponseSDKType> {
    const endpoint = `regen/data/v1/by-iri/${params.iri}`;
    return await this.req.get<QueryByIRIResponseSDKType>(endpoint);
  }
  /* ByAttestor queries data based on attestor. */
  async byAttestor(params: QueryByAttestorRequest): Promise<QueryByAttestorResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/data/v1/by-attestor/${params.attestor}`;
    return await this.req.get<QueryByAttestorResponseSDKType>(endpoint, options);
  }
  /* IRIByRawHash queries IRI based on ContentHash_Raw properties. */
  async iRIByRawHash(params: QueryIRIByRawHashRequest): Promise<QueryIRIByRawHashResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.hash !== "undefined") {
      options.params.hash = params.hash;
    }
    if (typeof params?.digestAlgorithm !== "undefined") {
      options.params.digest_algorithm = params.digestAlgorithm;
    }
    if (typeof params?.mediaType !== "undefined") {
      options.params.media_type = params.mediaType;
    }
    const endpoint = `regen/data/v1/iri-by-raw`;
    return await this.req.get<QueryIRIByRawHashResponseSDKType>(endpoint, options);
  }
  /* IRIByGraphHash queries IRI based on ContentHash_Graph properties. */
  async iRIByGraphHash(params: QueryIRIByGraphHashRequest): Promise<QueryIRIByGraphHashResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.hash !== "undefined") {
      options.params.hash = params.hash;
    }
    if (typeof params?.digestAlgorithm !== "undefined") {
      options.params.digest_algorithm = params.digestAlgorithm;
    }
    if (typeof params?.canonicalizationAlgorithm !== "undefined") {
      options.params.canonicalization_algorithm = params.canonicalizationAlgorithm;
    }
    if (typeof params?.merkleTree !== "undefined") {
      options.params.merkle_tree = params.merkleTree;
    }
    const endpoint = `regen/data/v1/iri-by-graph`;
    return await this.req.get<QueryIRIByGraphHashResponseSDKType>(endpoint, options);
  }
  /* HashByIRI queries ContentHash based on IRI. */
  async hashByIRI(params: QueryHashByIRIRequest): Promise<QueryHashByIRIResponseSDKType> {
    const endpoint = `regen/data/v1/hash/${params.iri}`;
    return await this.req.get<QueryHashByIRIResponseSDKType>(endpoint);
  }
  /* AttestorsByIRI queries attestors based on IRI. */
  async attestorsByIRI(params: QueryAttestorsByIRIRequest): Promise<QueryAttestorsByIRIResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/data/v1/attestors/${params.iri}`;
    return await this.req.get<QueryAttestorsByIRIResponseSDKType>(endpoint, options);
  }
  /* ResolversByIRI queries resolvers based on IRI. */
  async resolversByIRI(params: QueryResolversByIRIRequest): Promise<QueryResolversByIRIResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/data/v1/resolvers/${params.iri}`;
    return await this.req.get<QueryResolversByIRIResponseSDKType>(endpoint, options);
  }
  /* ResolverInfo queries information about a resolved based on URL. */
  async resolverInfo(params: QueryResolverInfoRequest): Promise<QueryResolverInfoResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.url !== "undefined") {
      options.params.url = params.url;
    }
    const endpoint = `regen/data/v1/resolver`;
    return await this.req.get<QueryResolverInfoResponseSDKType>(endpoint, options);
  }
}