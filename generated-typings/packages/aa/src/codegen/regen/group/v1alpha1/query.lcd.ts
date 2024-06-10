import { setPaginationParams } from "../../../helpers";
import { LCDClient } from "@cosmology/lcd";
import { QueryGroupInfoRequest, QueryGroupInfoResponseSDKType, QueryGroupAccountInfoRequest, QueryGroupAccountInfoResponseSDKType, QueryGroupMembersRequest, QueryGroupMembersResponseSDKType, QueryGroupsByAdminRequest, QueryGroupsByAdminResponseSDKType, QueryGroupAccountsByGroupRequest, QueryGroupAccountsByGroupResponseSDKType, QueryGroupAccountsByAdminRequest, QueryGroupAccountsByAdminResponseSDKType, QueryProposalRequest, QueryProposalResponseSDKType, QueryProposalsByGroupAccountRequest, QueryProposalsByGroupAccountResponseSDKType, QueryVoteByProposalVoterRequest, QueryVoteByProposalVoterResponseSDKType, QueryVotesByProposalRequest, QueryVotesByProposalResponseSDKType, QueryVotesByVoterRequest, QueryVotesByVoterResponseSDKType } from "./query";
export class LCDQueryClient {
  req: LCDClient;
  constructor({
    requestClient
  }: {
    requestClient: LCDClient;
  }) {
    this.req = requestClient;
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
  /* GroupInfo queries group info based on group id. */
  async groupInfo(params: QueryGroupInfoRequest): Promise<QueryGroupInfoResponseSDKType> {
    const endpoint = `regen/group/v1alpha1/groups/${params.groupId}/info`;
    return await this.req.get<QueryGroupInfoResponseSDKType>(endpoint);
  }
  /* GroupAccountInfo queries group account info based on group account address. */
  async groupAccountInfo(params: QueryGroupAccountInfoRequest): Promise<QueryGroupAccountInfoResponseSDKType> {
    const endpoint = `regen/group/v1alpha1/groups/accounts/${params.address}`;
    return await this.req.get<QueryGroupAccountInfoResponseSDKType>(endpoint);
  }
  /* GroupMembers queries members of a group */
  async groupMembers(params: QueryGroupMembersRequest): Promise<QueryGroupMembersResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/groups/${params.groupId}/members`;
    return await this.req.get<QueryGroupMembersResponseSDKType>(endpoint, options);
  }
  /* GroupsByAdmin queries groups by admin address. */
  async groupsByAdmin(params: QueryGroupsByAdminRequest): Promise<QueryGroupsByAdminResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/groups/admins/${params.admin}`;
    return await this.req.get<QueryGroupsByAdminResponseSDKType>(endpoint, options);
  }
  /* GroupAccountsByGroup queries group accounts by group id. */
  async groupAccountsByGroup(params: QueryGroupAccountsByGroupRequest): Promise<QueryGroupAccountsByGroupResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/groups/${params.groupId}/accounts`;
    return await this.req.get<QueryGroupAccountsByGroupResponseSDKType>(endpoint, options);
  }
  /* GroupsByAdmin queries group accounts by admin address. */
  async groupAccountsByAdmin(params: QueryGroupAccountsByAdminRequest): Promise<QueryGroupAccountsByAdminResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/admins/${params.admin}/accounts`;
    return await this.req.get<QueryGroupAccountsByAdminResponseSDKType>(endpoint, options);
  }
  /* Proposal queries a proposal based on proposal id. */
  async proposal(params: QueryProposalRequest): Promise<QueryProposalResponseSDKType> {
    const endpoint = `regen/group/v1alpha1/proposals/${params.proposalId}`;
    return await this.req.get<QueryProposalResponseSDKType>(endpoint);
  }
  /* ProposalsByGroupAccount queries proposals based on group account address. */
  async proposalsByGroupAccount(params: QueryProposalsByGroupAccountRequest): Promise<QueryProposalsByGroupAccountResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/group-accounts/${params.address}/proposals`;
    return await this.req.get<QueryProposalsByGroupAccountResponseSDKType>(endpoint, options);
  }
  /* VoteByProposalVoter queries a vote by proposal id and voter. */
  async voteByProposalVoter(params: QueryVoteByProposalVoterRequest): Promise<QueryVoteByProposalVoterResponseSDKType> {
    const endpoint = `regen/group/v1alpha1/proposals/${params.proposalId}/votes/${params.voter}`;
    return await this.req.get<QueryVoteByProposalVoterResponseSDKType>(endpoint);
  }
  /* VotesByProposal queries a vote by proposal. */
  async votesByProposal(params: QueryVotesByProposalRequest): Promise<QueryVotesByProposalResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/proposals/${params.proposalId}/votes`;
    return await this.req.get<QueryVotesByProposalResponseSDKType>(endpoint, options);
  }
  /* VotesByVoter queries a vote by voter. */
  async votesByVoter(params: QueryVotesByVoterRequest): Promise<QueryVotesByVoterResponseSDKType> {
    const options: any = {
      params: {}
    };
    if (typeof params?.pagination !== "undefined") {
      setPaginationParams(options, params.pagination);
    }
    const endpoint = `regen/group/v1alpha1/voters/${params.voter}`;
    return await this.req.get<QueryVotesByVoterResponseSDKType>(endpoint, options);
  }
}