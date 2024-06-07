import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryClassesRequest, QueryClassesResponse, QueryClassesByAdminRequest, QueryClassesByAdminResponse, QueryClassRequest, QueryClassResponse, QueryClassIssuersRequest, QueryClassIssuersResponse, QueryProjectsRequest, QueryProjectsResponse, QueryProjectsByReferenceIdRequest, QueryProjectsByReferenceIdResponse, QueryProjectRequest, QueryProjectResponse, QueryBatchesRequest, QueryBatchesResponse, QueryBatchesByIssuerRequest, QueryBatchesByIssuerResponse, QueryBatchesByClassRequest, QueryBatchesByClassResponse, QueryBatchRequest, QueryBatchResponse, QueryBalanceRequest, QueryBalanceResponse, QueryBalancesRequest, QueryBalancesResponse, QuerySupplyRequest, QuerySupplyResponse, QueryCreditTypesRequest, QueryCreditTypesResponse, QueryParamsRequest, QueryParamsResponse } from "./query";
/** Msg is the regen.ecocredit.v1 Query service. */
export interface Query {
  /** Classes queries for all credit classes with pagination. */
  classes(request?: QueryClassesRequest): Promise<QueryClassesResponse>;
  /**
   * ClassesByAdmin queries for all credit classes with a specific admin
   * address.
   */
  classesByAdmin(request: QueryClassesByAdminRequest): Promise<QueryClassesByAdminResponse>;
  /** Class queries for information on a credit class. */
  class(request: QueryClassRequest): Promise<QueryClassResponse>;
  /** ClassIssuers queries for the addresses of the issuers for a credit class. */
  classIssuers(request: QueryClassIssuersRequest): Promise<QueryClassIssuersResponse>;
  /** Projects queries for all projects within a class with pagination. */
  projects(request: QueryProjectsRequest): Promise<QueryProjectsResponse>;
  /**
   * ProjectsByReferenceId queries for all projects by reference-id with
   * pagination.
   */
  projectsByReferenceId(request: QueryProjectsByReferenceIdRequest): Promise<QueryProjectsByReferenceIdResponse>;
  /** Project queries for information on a project. */
  project(request: QueryProjectRequest): Promise<QueryProjectResponse>;
  /** Batches queries for all batches in the given project with pagination. */
  batches(request: QueryBatchesRequest): Promise<QueryBatchesResponse>;
  /** BatchesByIssuer queries all batches issued from a given issuer address. */
  batchesByIssuer(request: QueryBatchesByIssuerRequest): Promise<QueryBatchesByIssuerResponse>;
  /** BatchesByClass queries all batches issued from a given class. */
  batchesByClass(request: QueryBatchesByClassRequest): Promise<QueryBatchesByClassResponse>;
  /** Batch queries for information on a credit batch. */
  batch(request: QueryBatchRequest): Promise<QueryBatchResponse>;
  /**
   * Balance queries the balance (both tradable and retired) of a given credit
   * batch for a given account.
   */
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse>;
  /** Balances queries all credit balances the given account holds. */
  balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse>;
  /** Supply queries the tradable and retired supply of a credit batch. */
  supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse>;
  /**
   * CreditTypes returns the list of allowed types that credit classes can have.
   * See Types/CreditType for more details.
   */
  creditTypes(request?: QueryCreditTypesRequest): Promise<QueryCreditTypesResponse>;
  /** Params queries the ecocredit module parameters. */
  params(request?: QueryParamsRequest): Promise<QueryParamsResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.classes = this.classes.bind(this);
    this.classesByAdmin = this.classesByAdmin.bind(this);
    this.class = this.class.bind(this);
    this.classIssuers = this.classIssuers.bind(this);
    this.projects = this.projects.bind(this);
    this.projectsByReferenceId = this.projectsByReferenceId.bind(this);
    this.project = this.project.bind(this);
    this.batches = this.batches.bind(this);
    this.batchesByIssuer = this.batchesByIssuer.bind(this);
    this.batchesByClass = this.batchesByClass.bind(this);
    this.batch = this.batch.bind(this);
    this.balance = this.balance.bind(this);
    this.balances = this.balances.bind(this);
    this.supply = this.supply.bind(this);
    this.creditTypes = this.creditTypes.bind(this);
    this.params = this.params.bind(this);
  }
  classes(request: QueryClassesRequest = {
    pagination: undefined
  }): Promise<QueryClassesResponse> {
    const data = QueryClassesRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Classes", data);
    return promise.then(data => QueryClassesResponse.decode(new BinaryReader(data)));
  }
  classesByAdmin(request: QueryClassesByAdminRequest): Promise<QueryClassesByAdminResponse> {
    const data = QueryClassesByAdminRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "ClassesByAdmin", data);
    return promise.then(data => QueryClassesByAdminResponse.decode(new BinaryReader(data)));
  }
  class(request: QueryClassRequest): Promise<QueryClassResponse> {
    const data = QueryClassRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Class", data);
    return promise.then(data => QueryClassResponse.decode(new BinaryReader(data)));
  }
  classIssuers(request: QueryClassIssuersRequest): Promise<QueryClassIssuersResponse> {
    const data = QueryClassIssuersRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "ClassIssuers", data);
    return promise.then(data => QueryClassIssuersResponse.decode(new BinaryReader(data)));
  }
  projects(request: QueryProjectsRequest): Promise<QueryProjectsResponse> {
    const data = QueryProjectsRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Projects", data);
    return promise.then(data => QueryProjectsResponse.decode(new BinaryReader(data)));
  }
  projectsByReferenceId(request: QueryProjectsByReferenceIdRequest): Promise<QueryProjectsByReferenceIdResponse> {
    const data = QueryProjectsByReferenceIdRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "ProjectsByReferenceId", data);
    return promise.then(data => QueryProjectsByReferenceIdResponse.decode(new BinaryReader(data)));
  }
  project(request: QueryProjectRequest): Promise<QueryProjectResponse> {
    const data = QueryProjectRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Project", data);
    return promise.then(data => QueryProjectResponse.decode(new BinaryReader(data)));
  }
  batches(request: QueryBatchesRequest): Promise<QueryBatchesResponse> {
    const data = QueryBatchesRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Batches", data);
    return promise.then(data => QueryBatchesResponse.decode(new BinaryReader(data)));
  }
  batchesByIssuer(request: QueryBatchesByIssuerRequest): Promise<QueryBatchesByIssuerResponse> {
    const data = QueryBatchesByIssuerRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "BatchesByIssuer", data);
    return promise.then(data => QueryBatchesByIssuerResponse.decode(new BinaryReader(data)));
  }
  batchesByClass(request: QueryBatchesByClassRequest): Promise<QueryBatchesByClassResponse> {
    const data = QueryBatchesByClassRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "BatchesByClass", data);
    return promise.then(data => QueryBatchesByClassResponse.decode(new BinaryReader(data)));
  }
  batch(request: QueryBatchRequest): Promise<QueryBatchResponse> {
    const data = QueryBatchRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Batch", data);
    return promise.then(data => QueryBatchResponse.decode(new BinaryReader(data)));
  }
  balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
    const data = QueryBalanceRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Balance", data);
    return promise.then(data => QueryBalanceResponse.decode(new BinaryReader(data)));
  }
  balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse> {
    const data = QueryBalancesRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Balances", data);
    return promise.then(data => QueryBalancesResponse.decode(new BinaryReader(data)));
  }
  supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
    const data = QuerySupplyRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Supply", data);
    return promise.then(data => QuerySupplyResponse.decode(new BinaryReader(data)));
  }
  creditTypes(request: QueryCreditTypesRequest = {}): Promise<QueryCreditTypesResponse> {
    const data = QueryCreditTypesRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "CreditTypes", data);
    return promise.then(data => QueryCreditTypesResponse.decode(new BinaryReader(data)));
  }
  params(request: QueryParamsRequest = {}): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Query", "Params", data);
    return promise.then(data => QueryParamsResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    classes(request?: QueryClassesRequest): Promise<QueryClassesResponse> {
      return queryService.classes(request);
    },
    classesByAdmin(request: QueryClassesByAdminRequest): Promise<QueryClassesByAdminResponse> {
      return queryService.classesByAdmin(request);
    },
    class(request: QueryClassRequest): Promise<QueryClassResponse> {
      return queryService.class(request);
    },
    classIssuers(request: QueryClassIssuersRequest): Promise<QueryClassIssuersResponse> {
      return queryService.classIssuers(request);
    },
    projects(request: QueryProjectsRequest): Promise<QueryProjectsResponse> {
      return queryService.projects(request);
    },
    projectsByReferenceId(request: QueryProjectsByReferenceIdRequest): Promise<QueryProjectsByReferenceIdResponse> {
      return queryService.projectsByReferenceId(request);
    },
    project(request: QueryProjectRequest): Promise<QueryProjectResponse> {
      return queryService.project(request);
    },
    batches(request: QueryBatchesRequest): Promise<QueryBatchesResponse> {
      return queryService.batches(request);
    },
    batchesByIssuer(request: QueryBatchesByIssuerRequest): Promise<QueryBatchesByIssuerResponse> {
      return queryService.batchesByIssuer(request);
    },
    batchesByClass(request: QueryBatchesByClassRequest): Promise<QueryBatchesByClassResponse> {
      return queryService.batchesByClass(request);
    },
    batch(request: QueryBatchRequest): Promise<QueryBatchResponse> {
      return queryService.batch(request);
    },
    balance(request: QueryBalanceRequest): Promise<QueryBalanceResponse> {
      return queryService.balance(request);
    },
    balances(request: QueryBalancesRequest): Promise<QueryBalancesResponse> {
      return queryService.balances(request);
    },
    supply(request: QuerySupplyRequest): Promise<QuerySupplyResponse> {
      return queryService.supply(request);
    },
    creditTypes(request?: QueryCreditTypesRequest): Promise<QueryCreditTypesResponse> {
      return queryService.creditTypes(request);
    },
    params(request?: QueryParamsRequest): Promise<QueryParamsResponse> {
      return queryService.params(request);
    }
  };
};