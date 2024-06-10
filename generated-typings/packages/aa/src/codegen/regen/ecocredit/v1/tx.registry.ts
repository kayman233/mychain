import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgCreateClass, MsgCreateProject, MsgCreateBatch, MsgMintBatchCredits, MsgSealBatch, MsgSend, MsgRetire, MsgCancel, MsgUpdateClassAdmin, MsgUpdateClassIssuers, MsgUpdateClassMetadata, MsgUpdateProjectAdmin, MsgUpdateProjectMetadata } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/regen.ecocredit.v1.MsgCreateClass", MsgCreateClass], ["/regen.ecocredit.v1.MsgCreateProject", MsgCreateProject], ["/regen.ecocredit.v1.MsgCreateBatch", MsgCreateBatch], ["/regen.ecocredit.v1.MsgMintBatchCredits", MsgMintBatchCredits], ["/regen.ecocredit.v1.MsgSealBatch", MsgSealBatch], ["/regen.ecocredit.v1.MsgSend", MsgSend], ["/regen.ecocredit.v1.MsgRetire", MsgRetire], ["/regen.ecocredit.v1.MsgCancel", MsgCancel], ["/regen.ecocredit.v1.MsgUpdateClassAdmin", MsgUpdateClassAdmin], ["/regen.ecocredit.v1.MsgUpdateClassIssuers", MsgUpdateClassIssuers], ["/regen.ecocredit.v1.MsgUpdateClassMetadata", MsgUpdateClassMetadata], ["/regen.ecocredit.v1.MsgUpdateProjectAdmin", MsgUpdateProjectAdmin], ["/regen.ecocredit.v1.MsgUpdateProjectMetadata", MsgUpdateProjectMetadata]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateClass",
        value: MsgCreateClass.encode(value).finish()
      };
    },
    createProject(value: MsgCreateProject) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateProject",
        value: MsgCreateProject.encode(value).finish()
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateBatch",
        value: MsgCreateBatch.encode(value).finish()
      };
    },
    mintBatchCredits(value: MsgMintBatchCredits) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgMintBatchCredits",
        value: MsgMintBatchCredits.encode(value).finish()
      };
    },
    sealBatch(value: MsgSealBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSealBatch",
        value: MsgSealBatch.encode(value).finish()
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSend",
        value: MsgSend.encode(value).finish()
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgRetire",
        value: MsgRetire.encode(value).finish()
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCancel",
        value: MsgCancel.encode(value).finish()
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassAdmin",
        value: MsgUpdateClassAdmin.encode(value).finish()
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassIssuers",
        value: MsgUpdateClassIssuers.encode(value).finish()
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassMetadata",
        value: MsgUpdateClassMetadata.encode(value).finish()
      };
    },
    updateProjectAdmin(value: MsgUpdateProjectAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectAdmin",
        value: MsgUpdateProjectAdmin.encode(value).finish()
      };
    },
    updateProjectMetadata(value: MsgUpdateProjectMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectMetadata",
        value: MsgUpdateProjectMetadata.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateClass",
        value
      };
    },
    createProject(value: MsgCreateProject) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateProject",
        value
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateBatch",
        value
      };
    },
    mintBatchCredits(value: MsgMintBatchCredits) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgMintBatchCredits",
        value
      };
    },
    sealBatch(value: MsgSealBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSealBatch",
        value
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSend",
        value
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgRetire",
        value
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCancel",
        value
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassAdmin",
        value
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassIssuers",
        value
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassMetadata",
        value
      };
    },
    updateProjectAdmin(value: MsgUpdateProjectAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectAdmin",
        value
      };
    },
    updateProjectMetadata(value: MsgUpdateProjectMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectMetadata",
        value
      };
    }
  },
  fromPartial: {
    createClass(value: MsgCreateClass) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateClass",
        value: MsgCreateClass.fromPartial(value)
      };
    },
    createProject(value: MsgCreateProject) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateProject",
        value: MsgCreateProject.fromPartial(value)
      };
    },
    createBatch(value: MsgCreateBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCreateBatch",
        value: MsgCreateBatch.fromPartial(value)
      };
    },
    mintBatchCredits(value: MsgMintBatchCredits) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgMintBatchCredits",
        value: MsgMintBatchCredits.fromPartial(value)
      };
    },
    sealBatch(value: MsgSealBatch) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSealBatch",
        value: MsgSealBatch.fromPartial(value)
      };
    },
    send(value: MsgSend) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgSend",
        value: MsgSend.fromPartial(value)
      };
    },
    retire(value: MsgRetire) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgRetire",
        value: MsgRetire.fromPartial(value)
      };
    },
    cancel(value: MsgCancel) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgCancel",
        value: MsgCancel.fromPartial(value)
      };
    },
    updateClassAdmin(value: MsgUpdateClassAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassAdmin",
        value: MsgUpdateClassAdmin.fromPartial(value)
      };
    },
    updateClassIssuers(value: MsgUpdateClassIssuers) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassIssuers",
        value: MsgUpdateClassIssuers.fromPartial(value)
      };
    },
    updateClassMetadata(value: MsgUpdateClassMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateClassMetadata",
        value: MsgUpdateClassMetadata.fromPartial(value)
      };
    },
    updateProjectAdmin(value: MsgUpdateProjectAdmin) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectAdmin",
        value: MsgUpdateProjectAdmin.fromPartial(value)
      };
    },
    updateProjectMetadata(value: MsgUpdateProjectMetadata) {
      return {
        typeUrl: "/regen.ecocredit.v1.MsgUpdateProjectMetadata",
        value: MsgUpdateProjectMetadata.fromPartial(value)
      };
    }
  }
};