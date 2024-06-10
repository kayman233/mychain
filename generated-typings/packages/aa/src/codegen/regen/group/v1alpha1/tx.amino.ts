import { choiceFromJSON } from "./types";
import { AminoMsg } from "@cosmjs/amino";
import { execFromJSON, MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupAccount, MsgUpdateGroupAccountAdmin, MsgUpdateGroupAccountDecisionPolicy, MsgUpdateGroupAccountMetadata, MsgCreateProposal, MsgVote, MsgExec } from "./tx";
export interface MsgCreateGroupAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgCreateGroup";
  value: {
    admin: string;
    members: {
      address: string;
      weight: string;
      metadata: Uint8Array;
    }[];
    metadata: Uint8Array;
  };
}
export interface MsgUpdateGroupMembersAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupMembers";
  value: {
    admin: string;
    group_id: string;
    member_updates: {
      address: string;
      weight: string;
      metadata: Uint8Array;
    }[];
  };
}
export interface MsgUpdateGroupAdminAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupAdmin";
  value: {
    admin: string;
    group_id: string;
    new_admin: string;
  };
}
export interface MsgUpdateGroupMetadataAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupMetadata";
  value: {
    admin: string;
    group_id: string;
    metadata: Uint8Array;
  };
}
export interface MsgCreateGroupAccountAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgCreateGroupAccount";
  value: {
    admin: string;
    group_id: string;
    metadata: Uint8Array;
    decision_policy: {
      type_url: string;
      value: Uint8Array;
    };
  };
}
export interface MsgUpdateGroupAccountAdminAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin";
  value: {
    admin: string;
    address: string;
    new_admin: string;
  };
}
export interface MsgUpdateGroupAccountDecisionPolicyAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy";
  value: {
    admin: string;
    address: string;
    decision_policy: {
      type_url: string;
      value: Uint8Array;
    };
  };
}
export interface MsgUpdateGroupAccountMetadataAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata";
  value: {
    admin: string;
    address: string;
    metadata: Uint8Array;
  };
}
export interface MsgCreateProposalAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgCreateProposal";
  value: {
    address: string;
    proposers: string[];
    metadata: Uint8Array;
    msgs: {
      type_url: string;
      value: Uint8Array;
    }[];
    exec: number;
  };
}
export interface MsgVoteAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgVote";
  value: {
    proposal_id: string;
    voter: string;
    choice: number;
    metadata: Uint8Array;
    exec: number;
  };
}
export interface MsgExecAminoType extends AminoMsg {
  type: "/regen.group.v1alpha1.MsgExec";
  value: {
    proposal_id: string;
    signer: string;
  };
}
export const AminoConverter = {
  "/regen.group.v1alpha1.MsgCreateGroup": {
    aminoType: "/regen.group.v1alpha1.MsgCreateGroup",
    toAmino: ({
      admin,
      members,
      metadata
    }: MsgCreateGroup): MsgCreateGroupAminoType["value"] => {
      return {
        admin,
        members: members.map(el0 => ({
          address: el0.address,
          weight: el0.weight,
          metadata: el0.metadata
        })),
        metadata
      };
    },
    fromAmino: ({
      admin,
      members,
      metadata
    }: MsgCreateGroupAminoType["value"]): MsgCreateGroup => {
      return {
        admin,
        members: members.map(el0 => ({
          address: el0.address,
          weight: el0.weight,
          metadata: el0.metadata
        })),
        metadata
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupMembers": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupMembers",
    toAmino: ({
      admin,
      groupId,
      memberUpdates
    }: MsgUpdateGroupMembers): MsgUpdateGroupMembersAminoType["value"] => {
      return {
        admin,
        group_id: groupId.toString(),
        member_updates: memberUpdates.map(el0 => ({
          address: el0.address,
          weight: el0.weight,
          metadata: el0.metadata
        }))
      };
    },
    fromAmino: ({
      admin,
      group_id,
      member_updates
    }: MsgUpdateGroupMembersAminoType["value"]): MsgUpdateGroupMembers => {
      return {
        admin,
        groupId: BigInt(group_id),
        memberUpdates: member_updates.map(el0 => ({
          address: el0.address,
          weight: el0.weight,
          metadata: el0.metadata
        }))
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupAdmin": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupAdmin",
    toAmino: ({
      admin,
      groupId,
      newAdmin
    }: MsgUpdateGroupAdmin): MsgUpdateGroupAdminAminoType["value"] => {
      return {
        admin,
        group_id: groupId.toString(),
        new_admin: newAdmin
      };
    },
    fromAmino: ({
      admin,
      group_id,
      new_admin
    }: MsgUpdateGroupAdminAminoType["value"]): MsgUpdateGroupAdmin => {
      return {
        admin,
        groupId: BigInt(group_id),
        newAdmin: new_admin
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupMetadata": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupMetadata",
    toAmino: ({
      admin,
      groupId,
      metadata
    }: MsgUpdateGroupMetadata): MsgUpdateGroupMetadataAminoType["value"] => {
      return {
        admin,
        group_id: groupId.toString(),
        metadata
      };
    },
    fromAmino: ({
      admin,
      group_id,
      metadata
    }: MsgUpdateGroupMetadataAminoType["value"]): MsgUpdateGroupMetadata => {
      return {
        admin,
        groupId: BigInt(group_id),
        metadata
      };
    }
  },
  "/regen.group.v1alpha1.MsgCreateGroupAccount": {
    aminoType: "/regen.group.v1alpha1.MsgCreateGroupAccount",
    toAmino: ({
      admin,
      groupId,
      metadata,
      decisionPolicy
    }: MsgCreateGroupAccount): MsgCreateGroupAccountAminoType["value"] => {
      return {
        admin,
        group_id: groupId.toString(),
        metadata,
        decision_policy: {
          type_url: decisionPolicy.typeUrl,
          value: decisionPolicy.value
        }
      };
    },
    fromAmino: ({
      admin,
      group_id,
      metadata,
      decision_policy
    }: MsgCreateGroupAccountAminoType["value"]): MsgCreateGroupAccount => {
      return {
        admin,
        groupId: BigInt(group_id),
        metadata,
        decisionPolicy: {
          typeUrl: decision_policy.type_url,
          value: decision_policy.value
        }
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin",
    toAmino: ({
      admin,
      address,
      newAdmin
    }: MsgUpdateGroupAccountAdmin): MsgUpdateGroupAccountAdminAminoType["value"] => {
      return {
        admin,
        address,
        new_admin: newAdmin
      };
    },
    fromAmino: ({
      admin,
      address,
      new_admin
    }: MsgUpdateGroupAccountAdminAminoType["value"]): MsgUpdateGroupAccountAdmin => {
      return {
        admin,
        address,
        newAdmin: new_admin
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy",
    toAmino: ({
      admin,
      address,
      decisionPolicy
    }: MsgUpdateGroupAccountDecisionPolicy): MsgUpdateGroupAccountDecisionPolicyAminoType["value"] => {
      return {
        admin,
        address,
        decision_policy: {
          type_url: decisionPolicy.typeUrl,
          value: decisionPolicy.value
        }
      };
    },
    fromAmino: ({
      admin,
      address,
      decision_policy
    }: MsgUpdateGroupAccountDecisionPolicyAminoType["value"]): MsgUpdateGroupAccountDecisionPolicy => {
      return {
        admin,
        address,
        decisionPolicy: {
          typeUrl: decision_policy.type_url,
          value: decision_policy.value
        }
      };
    }
  },
  "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata": {
    aminoType: "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata",
    toAmino: ({
      admin,
      address,
      metadata
    }: MsgUpdateGroupAccountMetadata): MsgUpdateGroupAccountMetadataAminoType["value"] => {
      return {
        admin,
        address,
        metadata
      };
    },
    fromAmino: ({
      admin,
      address,
      metadata
    }: MsgUpdateGroupAccountMetadataAminoType["value"]): MsgUpdateGroupAccountMetadata => {
      return {
        admin,
        address,
        metadata
      };
    }
  },
  "/regen.group.v1alpha1.MsgCreateProposal": {
    aminoType: "/regen.group.v1alpha1.MsgCreateProposal",
    toAmino: ({
      address,
      proposers,
      metadata,
      msgs,
      exec
    }: MsgCreateProposal): MsgCreateProposalAminoType["value"] => {
      return {
        address,
        proposers,
        metadata,
        msgs: msgs.map(el0 => ({
          type_url: el0.typeUrl,
          value: el0.value
        })),
        exec
      };
    },
    fromAmino: ({
      address,
      proposers,
      metadata,
      msgs,
      exec
    }: MsgCreateProposalAminoType["value"]): MsgCreateProposal => {
      return {
        address,
        proposers,
        metadata,
        msgs: msgs.map(el0 => ({
          typeUrl: el0.type_url,
          value: el0.value
        })),
        exec: execFromJSON(exec)
      };
    }
  },
  "/regen.group.v1alpha1.MsgVote": {
    aminoType: "/regen.group.v1alpha1.MsgVote",
    toAmino: ({
      proposalId,
      voter,
      choice,
      metadata,
      exec
    }: MsgVote): MsgVoteAminoType["value"] => {
      return {
        proposal_id: proposalId.toString(),
        voter,
        choice,
        metadata,
        exec
      };
    },
    fromAmino: ({
      proposal_id,
      voter,
      choice,
      metadata,
      exec
    }: MsgVoteAminoType["value"]): MsgVote => {
      return {
        proposalId: BigInt(proposal_id),
        voter,
        choice: choiceFromJSON(choice),
        metadata,
        exec: execFromJSON(exec)
      };
    }
  },
  "/regen.group.v1alpha1.MsgExec": {
    aminoType: "/regen.group.v1alpha1.MsgExec",
    toAmino: ({
      proposalId,
      signer
    }: MsgExec): MsgExecAminoType["value"] => {
      return {
        proposal_id: proposalId.toString(),
        signer
      };
    },
    fromAmino: ({
      proposal_id,
      signer
    }: MsgExecAminoType["value"]): MsgExec => {
      return {
        proposalId: BigInt(proposal_id),
        signer
      };
    }
  }
};