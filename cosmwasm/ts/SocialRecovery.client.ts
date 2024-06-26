/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { CosmWasmClient, SigningCosmWasmClient, ExecuteResult } from "@cosmjs/cosmwasm-stargate";
import { Coin, StdFee } from "@cosmjs/amino";
import { Binary, InstantiateMsg, ExecuteMsg, QueryMsg, ArrayOfCountsResponse, CountsResponse, Addr, GuardiansListResp, Uint64, ArrayOfVotesResponse, VotesResponse } from "./SocialRecovery.types";
export interface SocialRecoveryReadOnlyInterface {
  contractAddress: string;
  pubkey: () => Promise<Binary>;
  guardiansList: () => Promise<GuardiansListResp>;
  threshold: () => Promise<Uint64>;
  votes: () => Promise<ArrayOfVotesResponse>;
  counts: () => Promise<ArrayOfCountsResponse>;
}
export class SocialRecoveryQueryClient implements SocialRecoveryReadOnlyInterface {
  client: CosmWasmClient;
  contractAddress: string;
  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client;
    this.contractAddress = contractAddress;
    this.pubkey = this.pubkey.bind(this);
    this.guardiansList = this.guardiansList.bind(this);
    this.threshold = this.threshold.bind(this);
    this.votes = this.votes.bind(this);
    this.counts = this.counts.bind(this);
  }
  pubkey = async (): Promise<Binary> => {
    return this.client.queryContractSmart(this.contractAddress, {
      pubkey: {}
    });
  };
  guardiansList = async (): Promise<GuardiansListResp> => {
    return this.client.queryContractSmart(this.contractAddress, {
      guardians_list: {}
    });
  };
  threshold = async (): Promise<Uint64> => {
    return this.client.queryContractSmart(this.contractAddress, {
      threshold: {}
    });
  };
  votes = async (): Promise<ArrayOfVotesResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      votes: {}
    });
  };
  counts = async (): Promise<ArrayOfCountsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      counts: {}
    });
  };
}
export interface SocialRecoveryInterface extends SocialRecoveryReadOnlyInterface {
  contractAddress: string;
  sender: string;
  updatePubkey: ({
    newPubkey
  }: {
    newPubkey: Binary;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  recover: ({
    newPubkey
  }: {
    newPubkey: Binary;
  }, fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
  revoke: (fee?: number | StdFee | "auto", memo?: string, _funds?: Coin[]) => Promise<ExecuteResult>;
}
export class SocialRecoveryClient extends SocialRecoveryQueryClient implements SocialRecoveryInterface {
  client: SigningCosmWasmClient;
  sender: string;
  contractAddress: string;
  constructor(client: SigningCosmWasmClient, sender: string, contractAddress: string) {
    super(client, contractAddress);
    this.client = client;
    this.sender = sender;
    this.contractAddress = contractAddress;
    this.updatePubkey = this.updatePubkey.bind(this);
    this.recover = this.recover.bind(this);
    this.revoke = this.revoke.bind(this);
  }
  updatePubkey = async ({
    newPubkey
  }: {
    newPubkey: Binary;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      update_pubkey: {
        new_pubkey: newPubkey
      }
    }, fee, memo, _funds);
  };
  recover = async ({
    newPubkey
  }: {
    newPubkey: Binary;
  }, fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      recover: {
        new_pubkey: newPubkey
      }
    }, fee, memo, _funds);
  };
  revoke = async (fee: number | StdFee | "auto" = "auto", memo?: string, _funds?: Coin[]): Promise<ExecuteResult> => {
    return await this.client.execute(this.sender, this.contractAddress, {
      revoke: {}
    }, fee, memo, _funds);
  };
}