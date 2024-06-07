import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryByHashRequest, QueryByHashResponseSDKType, QueryBySignerRequest, QueryBySignerResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
    this.byHash = this.byHash.bind(this);
    this.bySigner = this.bySigner.bind(this);
  }
  /* ByHash queries data based on its ContentHash. */
  async byHash(params: QueryByHashRequest): Promise<QueryByHashResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.hash !== "undefined") {
      options.params.hash = params.hash;
    }
    const endpoint = `regen/data/v1alpha2/by_hash`;
    return await this.req.get<QueryByHashResponseSDKType>(endpoint, options);
  }
  /* BySigner queries data based on signers. */
  async bySigner(params: QueryBySignerRequest): Promise<QueryBySignerResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/data/v1alpha2/signers/${params.signer}`;
    return await this.req.get<QueryBySignerResponseSDKType>(endpoint, options);
  }
}