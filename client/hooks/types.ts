import {
  ArrayOfCountsResponse,
  ArrayOfVotesResponse,
  GuardiansListResp,
} from '../codegen/SocialRecovery.types';

export interface CreateAccountType {
  funds: string;
  guardians: string[];
  threshold: number;
}

export interface AccountInfoType {
  pubkey: string | null;
  threshold: number | null;
  guardians: GuardiansListResp | null;
  counts: ArrayOfCountsResponse | null;
  votes: ArrayOfVotesResponse | null;
}

export interface StoredAccount {
  address: string;
  contractAddress: string;
  username: string;
  createdAt: string;
}

export interface AccountsState {
  accounts: StoredAccount[];
  selectedAccount: StoredAccount | null;
}
