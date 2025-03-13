import {
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  GuardiansListResp,
} from "../codegen/SocialRecovery.types";

export type CreateAccountType = {
  funds?: string;
  guardians?: string[];
  threshold?: number;
};

export type AccountInfoType = {
  pubkey?: string;
  threshold?: number;
  guardians?: GuardiansListResp;
  counts?: ArrayOfCountsResponse;
  votes?: ArrayOfVotesResponse;
};
