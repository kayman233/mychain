import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { QueryClient, createProtobufRpcClient } from "@cosmjs/stargate";
import { QueryGroupInfoRequest, QueryGroupInfoResponse, QueryGroupAccountInfoRequest, QueryGroupAccountInfoResponse, QueryGroupMembersRequest, QueryGroupMembersResponse, QueryGroupsByAdminRequest, QueryGroupsByAdminResponse, QueryGroupAccountsByGroupRequest, QueryGroupAccountsByGroupResponse, QueryGroupAccountsByAdminRequest, QueryGroupAccountsByAdminResponse, QueryProposalRequest, QueryProposalResponse, QueryProposalsByGroupAccountRequest, QueryProposalsByGroupAccountResponse, QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponse, QueryVotesByProposalRequest, QueryVotesByProposalResponse, QueryVotesByVoterRequest, QueryVotesByVoterResponse } from "./query";
/** Query is the regen.group.v1alpha1 Query service. */
export interface Query {
  /** GroupInfo queries group info based on group id. */
  groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse>;
  /** GroupAccountInfo queries group account info based on group account address. */
  groupAccountInfo(request: QueryGroupAccountInfoRequest): Promise<QueryGroupAccountInfoResponse>;
  /** GroupMembers queries members of a group */
  groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse>;
  /** GroupsByAdmin queries groups by admin address. */
  groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse>;
  /** GroupAccountsByGroup queries group accounts by group id. */
  groupAccountsByGroup(request: QueryGroupAccountsByGroupRequest): Promise<QueryGroupAccountsByGroupResponse>;
  /** GroupsByAdmin queries group accounts by admin address. */
  groupAccountsByAdmin(request: QueryGroupAccountsByAdminRequest): Promise<QueryGroupAccountsByAdminResponse>;
  /** Proposal queries a proposal based on proposal id. */
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse>;
  /** ProposalsByGroupAccount queries proposals based on group account address. */
  proposalsByGroupAccount(request: QueryProposalsByGroupAccountRequest): Promise<QueryProposalsByGroupAccountResponse>;
  /** VoteByProposalVoter queries a vote by proposal id and voter. */
  voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse>;
  /** VotesByProposal queries a vote by proposal. */
  votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse>;
  /** VotesByVoter queries a vote by voter. */
  votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse>;
}
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.groupInfo = this.groupInfo.bind(this);
    this.groupAccountInfo = this.groupAccountInfo.bind(this);
    this.groupMembers = this.groupMembers.bind(this);
    this.groupsByAdmin = this.groupsByAdmin.bind(this);
    this.groupAccountsByGroup = this.groupAccountsByGroup.bind(this);
    this.groupAccountsByAdmin = this.groupAccountsByAdmin.bind(this);
    this.proposal = this.proposal.bind(this);
    this.proposalsByGroupAccount = this.proposalsByGroupAccount.bind(this);
    this.voteByProposalVoter = this.voteByProposalVoter.bind(this);
    this.votesByProposal = this.votesByProposal.bind(this);
    this.votesByVoter = this.votesByVoter.bind(this);
  }
  groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse> {
    const data = QueryGroupInfoRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupInfo", data);
    return promise.then(data => QueryGroupInfoResponse.decode(new BinaryReader(data)));
  }
  groupAccountInfo(request: QueryGroupAccountInfoRequest): Promise<QueryGroupAccountInfoResponse> {
    const data = QueryGroupAccountInfoRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupAccountInfo", data);
    return promise.then(data => QueryGroupAccountInfoResponse.decode(new BinaryReader(data)));
  }
  groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse> {
    const data = QueryGroupMembersRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupMembers", data);
    return promise.then(data => QueryGroupMembersResponse.decode(new BinaryReader(data)));
  }
  groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse> {
    const data = QueryGroupsByAdminRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupsByAdmin", data);
    return promise.then(data => QueryGroupsByAdminResponse.decode(new BinaryReader(data)));
  }
  groupAccountsByGroup(request: QueryGroupAccountsByGroupRequest): Promise<QueryGroupAccountsByGroupResponse> {
    const data = QueryGroupAccountsByGroupRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupAccountsByGroup", data);
    return promise.then(data => QueryGroupAccountsByGroupResponse.decode(new BinaryReader(data)));
  }
  groupAccountsByAdmin(request: QueryGroupAccountsByAdminRequest): Promise<QueryGroupAccountsByAdminResponse> {
    const data = QueryGroupAccountsByAdminRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "GroupAccountsByAdmin", data);
    return promise.then(data => QueryGroupAccountsByAdminResponse.decode(new BinaryReader(data)));
  }
  proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
    const data = QueryProposalRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "Proposal", data);
    return promise.then(data => QueryProposalResponse.decode(new BinaryReader(data)));
  }
  proposalsByGroupAccount(request: QueryProposalsByGroupAccountRequest): Promise<QueryProposalsByGroupAccountResponse> {
    const data = QueryProposalsByGroupAccountRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "ProposalsByGroupAccount", data);
    return promise.then(data => QueryProposalsByGroupAccountResponse.decode(new BinaryReader(data)));
  }
  voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse> {
    const data = QueryVoteByProposalVoterRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "VoteByProposalVoter", data);
    return promise.then(data => QueryVoteByProposalVoterResponse.decode(new BinaryReader(data)));
  }
  votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse> {
    const data = QueryVotesByProposalRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "VotesByProposal", data);
    return promise.then(data => QueryVotesByProposalResponse.decode(new BinaryReader(data)));
  }
  votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse> {
    const data = QueryVotesByVoterRequest.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Query", "VotesByVoter", data);
    return promise.then(data => QueryVotesByVoterResponse.decode(new BinaryReader(data)));
  }
}
export const createRpcQueryExtension = (base: QueryClient) => {
  const rpc = createProtobufRpcClient(base);
  const queryService = new QueryClientImpl(rpc);
  return {
    groupInfo(request: QueryGroupInfoRequest): Promise<QueryGroupInfoResponse> {
      return queryService.groupInfo(request);
    },
    groupAccountInfo(request: QueryGroupAccountInfoRequest): Promise<QueryGroupAccountInfoResponse> {
      return queryService.groupAccountInfo(request);
    },
    groupMembers(request: QueryGroupMembersRequest): Promise<QueryGroupMembersResponse> {
      return queryService.groupMembers(request);
    },
    groupsByAdmin(request: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponse> {
      return queryService.groupsByAdmin(request);
    },
    groupAccountsByGroup(request: QueryGroupAccountsByGroupRequest): Promise<QueryGroupAccountsByGroupResponse> {
      return queryService.groupAccountsByGroup(request);
    },
    groupAccountsByAdmin(request: QueryGroupAccountsByAdminRequest): Promise<QueryGroupAccountsByAdminResponse> {
      return queryService.groupAccountsByAdmin(request);
    },
    proposal(request: QueryProposalRequest): Promise<QueryProposalResponse> {
      return queryService.proposal(request);
    },
    proposalsByGroupAccount(request: QueryProposalsByGroupAccountRequest): Promise<QueryProposalsByGroupAccountResponse> {
      return queryService.proposalsByGroupAccount(request);
    },
    voteByProposalVoter(request: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponse> {
      return queryService.voteByProposalVoter(request);
    },
    votesByProposal(request: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponse> {
      return queryService.votesByProposal(request);
    },
    votesByVoter(request: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponse> {
      return queryService.votesByVoter(request);
    }
  };
};