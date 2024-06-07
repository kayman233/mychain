import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateGroup, MsgCreateGroupResponse, MsgUpdateGroupMembers, MsgUpdateGroupMembersResponse, MsgUpdateGroupAdmin, MsgUpdateGroupAdminResponse, MsgUpdateGroupMetadata, MsgUpdateGroupMetadataResponse, MsgCreateGroupAccount, MsgCreateGroupAccountResponse, MsgUpdateGroupAccountAdmin, MsgUpdateGroupAccountAdminResponse, MsgUpdateGroupAccountDecisionPolicy, MsgUpdateGroupAccountDecisionPolicyResponse, MsgUpdateGroupAccountMetadata, MsgUpdateGroupAccountMetadataResponse, MsgCreateProposal, MsgCreateProposalResponse, MsgVote, MsgVoteResponse, MsgExec, MsgExecResponse } from "./tx";
/** Msg is the regen.group.v1alpha1 Msg service. */
export interface Msg {
  /**
   * CreateGroup creates a new group with an admin account address, a list of
   * members and some optional metadata.
   */
  createGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse>;
  /**
   * UpdateGroupMembers updates the group members with given group id and admin
   * address.
   */
  updateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse>;
  /**
   * UpdateGroupAdmin updates the group admin with given group id and previous
   * admin address.
   */
  updateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse>;
  /**
   * UpdateGroupMetadata updates the group metadata with given group id and
   * admin address.
   */
  updateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse>;
  /** CreateGroupAccount creates a new group account using given DecisionPolicy. */
  createGroupAccount(request: MsgCreateGroupAccount): Promise<MsgCreateGroupAccountResponse>;
  /** UpdateGroupAccountAdmin updates a group account admin. */
  updateGroupAccountAdmin(request: MsgUpdateGroupAccountAdmin): Promise<MsgUpdateGroupAccountAdminResponse>;
  /**
   * UpdateGroupAccountDecisionPolicy allows a group account decision policy to
   * be updated.
   */
  updateGroupAccountDecisionPolicy(request: MsgUpdateGroupAccountDecisionPolicy): Promise<MsgUpdateGroupAccountDecisionPolicyResponse>;
  /** UpdateGroupAccountMetadata updates a group account metadata. */
  updateGroupAccountMetadata(request: MsgUpdateGroupAccountMetadata): Promise<MsgUpdateGroupAccountMetadataResponse>;
  /** CreateProposal submits a new proposal. */
  createProposal(request: MsgCreateProposal): Promise<MsgCreateProposalResponse>;
  /** Vote allows a voter to vote on a proposal. */
  vote(request: MsgVote): Promise<MsgVoteResponse>;
  /** Exec executes a proposal. */
  exec(request: MsgExec): Promise<MsgExecResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createGroup = this.createGroup.bind(this);
    this.updateGroupMembers = this.updateGroupMembers.bind(this);
    this.updateGroupAdmin = this.updateGroupAdmin.bind(this);
    this.updateGroupMetadata = this.updateGroupMetadata.bind(this);
    this.createGroupAccount = this.createGroupAccount.bind(this);
    this.updateGroupAccountAdmin = this.updateGroupAccountAdmin.bind(this);
    this.updateGroupAccountDecisionPolicy = this.updateGroupAccountDecisionPolicy.bind(this);
    this.updateGroupAccountMetadata = this.updateGroupAccountMetadata.bind(this);
    this.createProposal = this.createProposal.bind(this);
    this.vote = this.vote.bind(this);
    this.exec = this.exec.bind(this);
  }
  createGroup(request: MsgCreateGroup): Promise<MsgCreateGroupResponse> {
    const data = MsgCreateGroup.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "CreateGroup", data);
    return promise.then(data => MsgCreateGroupResponse.decode(new BinaryReader(data)));
  }
  updateGroupMembers(request: MsgUpdateGroupMembers): Promise<MsgUpdateGroupMembersResponse> {
    const data = MsgUpdateGroupMembers.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupMembers", data);
    return promise.then(data => MsgUpdateGroupMembersResponse.decode(new BinaryReader(data)));
  }
  updateGroupAdmin(request: MsgUpdateGroupAdmin): Promise<MsgUpdateGroupAdminResponse> {
    const data = MsgUpdateGroupAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupAdmin", data);
    return promise.then(data => MsgUpdateGroupAdminResponse.decode(new BinaryReader(data)));
  }
  updateGroupMetadata(request: MsgUpdateGroupMetadata): Promise<MsgUpdateGroupMetadataResponse> {
    const data = MsgUpdateGroupMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupMetadata", data);
    return promise.then(data => MsgUpdateGroupMetadataResponse.decode(new BinaryReader(data)));
  }
  createGroupAccount(request: MsgCreateGroupAccount): Promise<MsgCreateGroupAccountResponse> {
    const data = MsgCreateGroupAccount.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "CreateGroupAccount", data);
    return promise.then(data => MsgCreateGroupAccountResponse.decode(new BinaryReader(data)));
  }
  updateGroupAccountAdmin(request: MsgUpdateGroupAccountAdmin): Promise<MsgUpdateGroupAccountAdminResponse> {
    const data = MsgUpdateGroupAccountAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupAccountAdmin", data);
    return promise.then(data => MsgUpdateGroupAccountAdminResponse.decode(new BinaryReader(data)));
  }
  updateGroupAccountDecisionPolicy(request: MsgUpdateGroupAccountDecisionPolicy): Promise<MsgUpdateGroupAccountDecisionPolicyResponse> {
    const data = MsgUpdateGroupAccountDecisionPolicy.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupAccountDecisionPolicy", data);
    return promise.then(data => MsgUpdateGroupAccountDecisionPolicyResponse.decode(new BinaryReader(data)));
  }
  updateGroupAccountMetadata(request: MsgUpdateGroupAccountMetadata): Promise<MsgUpdateGroupAccountMetadataResponse> {
    const data = MsgUpdateGroupAccountMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "UpdateGroupAccountMetadata", data);
    return promise.then(data => MsgUpdateGroupAccountMetadataResponse.decode(new BinaryReader(data)));
  }
  createProposal(request: MsgCreateProposal): Promise<MsgCreateProposalResponse> {
    const data = MsgCreateProposal.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "CreateProposal", data);
    return promise.then(data => MsgCreateProposalResponse.decode(new BinaryReader(data)));
  }
  vote(request: MsgVote): Promise<MsgVoteResponse> {
    const data = MsgVote.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "Vote", data);
    return promise.then(data => MsgVoteResponse.decode(new BinaryReader(data)));
  }
  exec(request: MsgExec): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request("regen.group.v1alpha1.Msg", "Exec", data);
    return promise.then(data => MsgExecResponse.decode(new BinaryReader(data)));
  }
}