import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryClassesRequest, QueryClassesResponseSDKType, QueryClassesByAdminRequest, QueryClassesByAdminResponseSDKType, QueryClassRequest, QueryClassResponseSDKType, QueryClassIssuersRequest, QueryClassIssuersResponseSDKType, QueryProjectsRequest, QueryProjectsResponseSDKType, QueryProjectsByReferenceIdRequest, QueryProjectsByReferenceIdResponseSDKType, QueryProjectRequest, QueryProjectResponseSDKType, QueryBatchesRequest, QueryBatchesResponseSDKType, QueryBatchesByIssuerRequest, QueryBatchesByIssuerResponseSDKType, QueryBatchesByClassRequest, QueryBatchesByClassResponseSDKType, QueryBatchRequest, QueryBatchResponseSDKType, QueryBalanceRequest, QueryBalanceResponseSDKType, QueryBalancesRequest, QueryBalancesResponseSDKType, QuerySupplyRequest, QuerySupplyResponseSDKType, QueryCreditTypesRequest, QueryCreditTypesResponseSDKType, QueryParamsRequest, QueryParamsResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
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
  /* Classes queries for all credit classes with pagination. */
  async classes(params: QueryClassesRequest = {
    pagination: undefined
  }): Promise<QueryClassesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/classes`;
    return await this.req.get<QueryClassesResponseSDKType>(endpoint, options);
  }
  /* ClassesByAdmin queries for all credit classes with a specific admin
   address. */
  async classesByAdmin(params: QueryClassesByAdminRequest): Promise<QueryClassesByAdminResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/classes/admin/${params.admin}`;
    return await this.req.get<QueryClassesByAdminResponseSDKType>(endpoint, options);
  }
  /* Class queries for information on a credit class. */
  async class(params: QueryClassRequest): Promise<QueryClassResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/classes/${params.classId}`;
    return await this.req.get<QueryClassResponseSDKType>(endpoint);
  }
  /* ClassIssuers queries for the addresses of the issuers for a credit class. */
  async classIssuers(params: QueryClassIssuersRequest): Promise<QueryClassIssuersResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/classes/${params.classId}/issuers`;
    return await this.req.get<QueryClassIssuersResponseSDKType>(endpoint, options);
  }
  /* Projects queries for all projects within a class with pagination. */
  async projects(params: QueryProjectsRequest): Promise<QueryProjectsResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/classes/${params.classId}/projects`;
    return await this.req.get<QueryProjectsResponseSDKType>(endpoint, options);
  }
  /* ProjectsByReferenceId queries for all projects by reference-id with
   pagination. */
  async projectsByReferenceId(params: QueryProjectsByReferenceIdRequest): Promise<QueryProjectsByReferenceIdResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/projects/by-reference-id/${params.referenceId}`;
    return await this.req.get<QueryProjectsByReferenceIdResponseSDKType>(endpoint, options);
  }
  /* Project queries for information on a project. */
  async project(params: QueryProjectRequest): Promise<QueryProjectResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/projects/${params.projectId}`;
    return await this.req.get<QueryProjectResponseSDKType>(endpoint);
  }
  /* Batches queries for all batches in the given project with pagination. */
  async batches(params: QueryBatchesRequest): Promise<QueryBatchesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/projects/${params.projectId}/batches`;
    return await this.req.get<QueryBatchesResponseSDKType>(endpoint, options);
  }
  /* BatchesByIssuer queries all batches issued from a given issuer address. */
  async batchesByIssuer(params: QueryBatchesByIssuerRequest): Promise<QueryBatchesByIssuerResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/batches/issuer/${params.issuer}`;
    return await this.req.get<QueryBatchesByIssuerResponseSDKType>(endpoint, options);
  }
  /* BatchesByClass queries all batches issued from a given class. */
  async batchesByClass(params: QueryBatchesByClassRequest): Promise<QueryBatchesByClassResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/classes/${params.classId}/batches`;
    return await this.req.get<QueryBatchesByClassResponseSDKType>(endpoint, options);
  }
  /* Batch queries for information on a credit batch. */
  async batch(params: QueryBatchRequest): Promise<QueryBatchResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/batches/${params.batchDenom}`;
    return await this.req.get<QueryBatchResponseSDKType>(endpoint);
  }
  /* Balance queries the balance (both tradable and retired) of a given credit
   batch for a given account. */
  async balance(params: QueryBalanceRequest): Promise<QueryBalanceResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/batches/${params.batchDenom}/balance/${params.account}`;
    return await this.req.get<QueryBalanceResponseSDKType>(endpoint);
  }
  /* Balances queries all credit balances the given account holds. */
  async balances(params: QueryBalancesRequest): Promise<QueryBalancesResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/ecocredit/v1/balances/${params.account}`;
    return await this.req.get<QueryBalancesResponseSDKType>(endpoint, options);
  }
  /* Supply queries the tradable and retired supply of a credit batch. */
  async supply(params: QuerySupplyRequest): Promise<QuerySupplyResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/batches/${params.batchDenom}/supply`;
    return await this.req.get<QuerySupplyResponseSDKType>(endpoint);
  }
  /* CreditTypes returns the list of allowed types that credit classes can have.
   See Types/CreditType for more details. */
  async creditTypes(_params: QueryCreditTypesRequest = {}): Promise<QueryCreditTypesResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/credit-types`;
    return await this.req.get<QueryCreditTypesResponseSDKType>(endpoint);
  }
  /* Params queries the ecocredit module parameters. */
  async params(_params: QueryParamsRequest = {}): Promise<QueryParamsResponseSDKType> {
    const endpoint = `regen/ecocredit/v1/params`;
    return await this.req.get<QueryParamsResponseSDKType>(endpoint);
  }
}