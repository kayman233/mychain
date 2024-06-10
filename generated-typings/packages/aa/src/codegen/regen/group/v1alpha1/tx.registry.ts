import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateGroup, MsgUpdateGroupMembers, MsgUpdateGroupAdmin, MsgUpdateGroupMetadata, MsgCreateGroupAccount, MsgUpdateGroupAccountAdmin, MsgUpdateGroupAccountDecisionPolicy, MsgUpdateGroupAccountMetadata, MsgCreateProposal, MsgVote, MsgExec } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/regen.group.v1alpha1.MsgCreateGroup", MsgCreateGroup], ["/regen.group.v1alpha1.MsgUpdateGroupMembers", MsgUpdateGroupMembers], ["/regen.group.v1alpha1.MsgUpdateGroupAdmin", MsgUpdateGroupAdmin], ["/regen.group.v1alpha1.MsgUpdateGroupMetadata", MsgUpdateGroupMetadata], ["/regen.group.v1alpha1.MsgCreateGroupAccount", MsgCreateGroupAccount], ["/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin", MsgUpdateGroupAccountAdmin], ["/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy", MsgUpdateGroupAccountDecisionPolicy], ["/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata", MsgUpdateGroupAccountMetadata], ["/regen.group.v1alpha1.MsgCreateProposal", MsgCreateProposal], ["/regen.group.v1alpha1.MsgVote", MsgVote], ["/regen.group.v1alpha1.MsgExec", MsgExec]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroup",
        value: MsgCreateGroup.encode(value).finish()
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.encode(value).finish()
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.encode(value).finish()
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.encode(value).finish()
      };
    },
    createGroupAccount(value: MsgCreateGroupAccount) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroupAccount",
        value: MsgCreateGroupAccount.encode(value).finish()
      };
    },
    updateGroupAccountAdmin(value: MsgUpdateGroupAccountAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin",
        value: MsgUpdateGroupAccountAdmin.encode(value).finish()
      };
    },
    updateGroupAccountDecisionPolicy(value: MsgUpdateGroupAccountDecisionPolicy) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy",
        value: MsgUpdateGroupAccountDecisionPolicy.encode(value).finish()
      };
    },
    updateGroupAccountMetadata(value: MsgUpdateGroupAccountMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata",
        value: MsgUpdateGroupAccountMetadata.encode(value).finish()
      };
    },
    createProposal(value: MsgCreateProposal) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateProposal",
        value: MsgCreateProposal.encode(value).finish()
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgVote",
        value: MsgVote.encode(value).finish()
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgExec",
        value: MsgExec.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroup",
        value
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMembers",
        value
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAdmin",
        value
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMetadata",
        value
      };
    },
    createGroupAccount(value: MsgCreateGroupAccount) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroupAccount",
        value
      };
    },
    updateGroupAccountAdmin(value: MsgUpdateGroupAccountAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin",
        value
      };
    },
    updateGroupAccountDecisionPolicy(value: MsgUpdateGroupAccountDecisionPolicy) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy",
        value
      };
    },
    updateGroupAccountMetadata(value: MsgUpdateGroupAccountMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata",
        value
      };
    },
    createProposal(value: MsgCreateProposal) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateProposal",
        value
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgVote",
        value
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgExec",
        value
      };
    }
  },
  fromPartial: {
    createGroup(value: MsgCreateGroup) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroup",
        value: MsgCreateGroup.fromPartial(value)
      };
    },
    updateGroupMembers(value: MsgUpdateGroupMembers) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMembers",
        value: MsgUpdateGroupMembers.fromPartial(value)
      };
    },
    updateGroupAdmin(value: MsgUpdateGroupAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAdmin",
        value: MsgUpdateGroupAdmin.fromPartial(value)
      };
    },
    updateGroupMetadata(value: MsgUpdateGroupMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupMetadata",
        value: MsgUpdateGroupMetadata.fromPartial(value)
      };
    },
    createGroupAccount(value: MsgCreateGroupAccount) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateGroupAccount",
        value: MsgCreateGroupAccount.fromPartial(value)
      };
    },
    updateGroupAccountAdmin(value: MsgUpdateGroupAccountAdmin) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountAdmin",
        value: MsgUpdateGroupAccountAdmin.fromPartial(value)
      };
    },
    updateGroupAccountDecisionPolicy(value: MsgUpdateGroupAccountDecisionPolicy) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountDecisionPolicy",
        value: MsgUpdateGroupAccountDecisionPolicy.fromPartial(value)
      };
    },
    updateGroupAccountMetadata(value: MsgUpdateGroupAccountMetadata) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgUpdateGroupAccountMetadata",
        value: MsgUpdateGroupAccountMetadata.fromPartial(value)
      };
    },
    createProposal(value: MsgCreateProposal) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgCreateProposal",
        value: MsgCreateProposal.fromPartial(value)
      };
    },
    vote(value: MsgVote) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgVote",
        value: MsgVote.fromPartial(value)
      };
    },
    exec(value: MsgExec) {
      return {
        typeUrl: "/regen.group.v1alpha1.MsgExec",
        value: MsgExec.fromPartial(value)
      };
    }
  }
};