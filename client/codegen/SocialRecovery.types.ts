/**
* This file was automatically generated by @cosmwasm/ts-codegen@1.10.0.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

export type Binary = string;
export interface InstantiateMsg {
  guardians: string[];
  pubkey: Binary;
  threshold: number;
}
export type ExecuteMsg = {
  update_pubkey: {
    new_pubkey: Binary;
  };
} | {
  recover: {
    new_pubkey: Binary;
  };
} | {
  revoke: {};
};
export type QueryMsg = {
  pubkey: {};
} | {
  guardians_list: {};
} | {
  threshold: {};
} | {
  votes: {};
} | {
  counts: {};
};
export type ArrayOfCountsResponse = CountsResponse[];
export interface CountsResponse {
  pubkey: string;
  votes: number;
}
export type Addr = string;
export interface GuardiansListResp {
  guardians: Addr[];
}
export type Uint64 = number;
export type ArrayOfVotesResponse = VotesResponse[];
export interface VotesResponse {
  addr: Addr;
  vote: string;
}