import { AminoMsg } from "@cosmjs/amino";
import { MsgCreateClass, MsgCreateProject, MsgCreateBatch, MsgMintBatchCredits, MsgSealBatch, MsgSend, MsgRetire, MsgCancel, MsgUpdateClassAdmin, MsgUpdateClassIssuers, MsgUpdateClassMetadata, MsgUpdateProjectAdmin, MsgUpdateProjectMetadata } from "./tx";
export interface MsgCreateClassAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgCreateClass";
  value: {
    admin: string;
    issuers: string[];
    metadata: string;
    credit_type_abbrev: string;
    fee: {
      denom: string;
      amount: string;
    };
  };
}
export interface MsgCreateProjectAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgCreateProject";
  value: {
    issuer: string;
    class_id: string;
    metadata: string;
    jurisdiction: string;
    reference_id: string;
  };
}
export interface MsgCreateBatchAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgCreateBatch";
  value: {
    issuer: string;
    project_id: string;
    issuance: {
      recipient: string;
      tradable_amount: string;
      retired_amount: string;
      retirement_jurisdiction: string;
    }[];
    metadata: string;
    start_date: {
      seconds: string;
      nanos: number;
    };
    end_date: {
      seconds: string;
      nanos: number;
    };
    open: boolean;
    origin_tx: {
      typ: string;
      id: string;
    };
    note: string;
  };
}
export interface MsgMintBatchCreditsAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgMintBatchCredits";
  value: {
    issuer: string;
    batch_denom: string;
    issuance: {
      recipient: string;
      tradable_amount: string;
      retired_amount: string;
      retirement_jurisdiction: string;
    }[];
    origin_tx: {
      typ: string;
      id: string;
    };
    note: string;
  };
}
export interface MsgSealBatchAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgSealBatch";
  value: {
    issuer: string;
    batch_denom: string;
  };
}
export interface MsgSendAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgSend";
  value: {
    sender: string;
    recipient: string;
    credits: {
      batch_denom: string;
      tradable_amount: string;
      retired_amount: string;
      retirement_jurisdiction: string;
    }[];
  };
}
export interface MsgRetireAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgRetire";
  value: {
    holder: string;
    credits: {
      batch_denom: string;
      amount: string;
    }[];
    jurisdiction: string;
  };
}
export interface MsgCancelAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgCancel";
  value: {
    holder: string;
    credits: {
      batch_denom: string;
      amount: string;
    }[];
  };
}
export interface MsgUpdateClassAdminAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgUpdateClassAdmin";
  value: {
    admin: string;
    class_id: string;
    new_admin: string;
  };
}
export interface MsgUpdateClassIssuersAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgUpdateClassIssuers";
  value: {
    admin: string;
    class_id: string;
    add_issuers: string[];
    remove_issuers: string[];
  };
}
export interface MsgUpdateClassMetadataAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgUpdateClassMetadata";
  value: {
    admin: string;
    class_id: string;
    metadata: string;
  };
}
export interface MsgUpdateProjectAdminAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgUpdateProjectAdmin";
  value: {
    admin: string;
    new_admin: string;
    project_id: string;
  };
}
export interface MsgUpdateProjectMetadataAminoType extends AminoMsg {
  type: "/regen.ecocredit.v1.MsgUpdateProjectMetadata";
  value: {
    admin: string;
    new_metadata: string;
    project_id: string;
  };
}
export const AminoConverter = {
  "/regen.ecocredit.v1.MsgCreateClass": {
    aminoType: "/regen.ecocredit.v1.MsgCreateClass",
    toAmino: ({
      admin,
      issuers,
      metadata,
      creditTypeAbbrev,
      fee
    }: MsgCreateClass): MsgCreateClassAminoType["value"] => {
      return {
        admin,
        issuers,
        metadata,
        credit_type_abbrev: creditTypeAbbrev,
        fee: {
          denom: fee.denom,
          amount: fee.amount
        }
      };
    },
    fromAmino: ({
      admin,
      issuers,
      metadata,
      credit_type_abbrev,
      fee
    }: MsgCreateClassAminoType["value"]): MsgCreateClass => {
      return {
        admin,
        issuers,
        metadata,
        creditTypeAbbrev: credit_type_abbrev,
        fee: {
          denom: fee.denom,
          amount: fee.amount
        }
      };
    }
  },
  "/regen.ecocredit.v1.MsgCreateProject": {
    aminoType: "/regen.ecocredit.v1.MsgCreateProject",
    toAmino: ({
      issuer,
      classId,
      metadata,
      jurisdiction,
      referenceId
    }: MsgCreateProject): MsgCreateProjectAminoType["value"] => {
      return {
        issuer,
        class_id: classId,
        metadata,
        jurisdiction,
        reference_id: referenceId
      };
    },
    fromAmino: ({
      issuer,
      class_id,
      metadata,
      jurisdiction,
      reference_id
    }: MsgCreateProjectAminoType["value"]): MsgCreateProject => {
      return {
        issuer,
        classId: class_id,
        metadata,
        jurisdiction,
        referenceId: reference_id
      };
    }
  },
  "/regen.ecocredit.v1.MsgCreateBatch": {
    aminoType: "/regen.ecocredit.v1.MsgCreateBatch",
    toAmino: ({
      issuer,
      projectId,
      issuance,
      metadata,
      startDate,
      endDate,
      open,
      originTx,
      note
    }: MsgCreateBatch): MsgCreateBatchAminoType["value"] => {
      return {
        issuer,
        project_id: projectId,
        issuance: issuance.map(el0 => ({
          recipient: el0.recipient,
          tradable_amount: el0.tradableAmount,
          retired_amount: el0.retiredAmount,
          retirement_jurisdiction: el0.retirementJurisdiction
        })),
        metadata,
        start_date: startDate,
        end_date: endDate,
        open,
        origin_tx: {
          typ: originTx.typ,
          id: originTx.id
        },
        note
      };
    },
    fromAmino: ({
      issuer,
      project_id,
      issuance,
      metadata,
      start_date,
      end_date,
      open,
      origin_tx,
      note
    }: MsgCreateBatchAminoType["value"]): MsgCreateBatch => {
      return {
        issuer,
        projectId: project_id,
        issuance: issuance.map(el0 => ({
          recipient: el0.recipient,
          tradableAmount: el0.tradable_amount,
          retiredAmount: el0.retired_amount,
          retirementJurisdiction: el0.retirement_jurisdiction
        })),
        metadata,
        startDate: start_date,
        endDate: end_date,
        open,
        originTx: {
          typ: origin_tx.typ,
          id: origin_tx.id
        },
        note
      };
    }
  },
  "/regen.ecocredit.v1.MsgMintBatchCredits": {
    aminoType: "/regen.ecocredit.v1.MsgMintBatchCredits",
    toAmino: ({
      issuer,
      batchDenom,
      issuance,
      originTx,
      note
    }: MsgMintBatchCredits): MsgMintBatchCreditsAminoType["value"] => {
      return {
        issuer,
        batch_denom: batchDenom,
        issuance: issuance.map(el0 => ({
          recipient: el0.recipient,
          tradable_amount: el0.tradableAmount,
          retired_amount: el0.retiredAmount,
          retirement_jurisdiction: el0.retirementJurisdiction
        })),
        origin_tx: {
          typ: originTx.typ,
          id: originTx.id
        },
        note
      };
    },
    fromAmino: ({
      issuer,
      batch_denom,
      issuance,
      origin_tx,
      note
    }: MsgMintBatchCreditsAminoType["value"]): MsgMintBatchCredits => {
      return {
        issuer,
        batchDenom: batch_denom,
        issuance: issuance.map(el0 => ({
          recipient: el0.recipient,
          tradableAmount: el0.tradable_amount,
          retiredAmount: el0.retired_amount,
          retirementJurisdiction: el0.retirement_jurisdiction
        })),
        originTx: {
          typ: origin_tx.typ,
          id: origin_tx.id
        },
        note
      };
    }
  },
  "/regen.ecocredit.v1.MsgSealBatch": {
    aminoType: "/regen.ecocredit.v1.MsgSealBatch",
    toAmino: ({
      issuer,
      batchDenom
    }: MsgSealBatch): MsgSealBatchAminoType["value"] => {
      return {
        issuer,
        batch_denom: batchDenom
      };
    },
    fromAmino: ({
      issuer,
      batch_denom
    }: MsgSealBatchAminoType["value"]): MsgSealBatch => {
      return {
        issuer,
        batchDenom: batch_denom
      };
    }
  },
  "/regen.ecocredit.v1.MsgSend": {
    aminoType: "/regen.ecocredit.v1.MsgSend",
    toAmino: ({
      sender,
      recipient,
      credits
    }: MsgSend): MsgSendAminoType["value"] => {
      return {
        sender,
        recipient,
        credits: credits.map(el0 => ({
          batch_denom: el0.batchDenom,
          tradable_amount: el0.tradableAmount,
          retired_amount: el0.retiredAmount,
          retirement_jurisdiction: el0.retirementJurisdiction
        }))
      };
    },
    fromAmino: ({
      sender,
      recipient,
      credits
    }: MsgSendAminoType["value"]): MsgSend => {
      return {
        sender,
        recipient,
        credits: credits.map(el0 => ({
          batchDenom: el0.batch_denom,
          tradableAmount: el0.tradable_amount,
          retiredAmount: el0.retired_amount,
          retirementJurisdiction: el0.retirement_jurisdiction
        }))
      };
    }
  },
  "/regen.ecocredit.v1.MsgRetire": {
    aminoType: "/regen.ecocredit.v1.MsgRetire",
    toAmino: ({
      holder,
      credits,
      jurisdiction
    }: MsgRetire): MsgRetireAminoType["value"] => {
      return {
        holder,
        credits: credits.map(el0 => ({
          batch_denom: el0.batchDenom,
          amount: el0.amount
        })),
        jurisdiction
      };
    },
    fromAmino: ({
      holder,
      credits,
      jurisdiction
    }: MsgRetireAminoType["value"]): MsgRetire => {
      return {
        holder,
        credits: credits.map(el0 => ({
          batchDenom: el0.batch_denom,
          amount: el0.amount
        })),
        jurisdiction
      };
    }
  },
  "/regen.ecocredit.v1.MsgCancel": {
    aminoType: "/regen.ecocredit.v1.MsgCancel",
    toAmino: ({
      holder,
      credits
    }: MsgCancel): MsgCancelAminoType["value"] => {
      return {
        holder,
        credits: credits.map(el0 => ({
          batch_denom: el0.batchDenom,
          amount: el0.amount
        }))
      };
    },
    fromAmino: ({
      holder,
      credits
    }: MsgCancelAminoType["value"]): MsgCancel => {
      return {
        holder,
        credits: credits.map(el0 => ({
          batchDenom: el0.batch_denom,
          amount: el0.amount
        }))
      };
    }
  },
  "/regen.ecocredit.v1.MsgUpdateClassAdmin": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassAdmin",
    toAmino: ({
      admin,
      classId,
      newAdmin
    }: MsgUpdateClassAdmin): MsgUpdateClassAdminAminoType["value"] => {
      return {
        admin,
        class_id: classId,
        new_admin: newAdmin
      };
    },
    fromAmino: ({
      admin,
      class_id,
      new_admin
    }: MsgUpdateClassAdminAminoType["value"]): MsgUpdateClassAdmin => {
      return {
        admin,
        classId: class_id,
        newAdmin: new_admin
      };
    }
  },
  "/regen.ecocredit.v1.MsgUpdateClassIssuers": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassIssuers",
    toAmino: ({
      admin,
      classId,
      addIssuers,
      removeIssuers
    }: MsgUpdateClassIssuers): MsgUpdateClassIssuersAminoType["value"] => {
      return {
        admin,
        class_id: classId,
        add_issuers: addIssuers,
        remove_issuers: removeIssuers
      };
    },
    fromAmino: ({
      admin,
      class_id,
      add_issuers,
      remove_issuers
    }: MsgUpdateClassIssuersAminoType["value"]): MsgUpdateClassIssuers => {
      return {
        admin,
        classId: class_id,
        addIssuers: add_issuers,
        removeIssuers: remove_issuers
      };
    }
  },
  "/regen.ecocredit.v1.MsgUpdateClassMetadata": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateClassMetadata",
    toAmino: ({
      admin,
      classId,
      metadata
    }: MsgUpdateClassMetadata): MsgUpdateClassMetadataAminoType["value"] => {
      return {
        admin,
        class_id: classId,
        metadata
      };
    },
    fromAmino: ({
      admin,
      class_id,
      metadata
    }: MsgUpdateClassMetadataAminoType["value"]): MsgUpdateClassMetadata => {
      return {
        admin,
        classId: class_id,
        metadata
      };
    }
  },
  "/regen.ecocredit.v1.MsgUpdateProjectAdmin": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateProjectAdmin",
    toAmino: ({
      admin,
      newAdmin,
      projectId
    }: MsgUpdateProjectAdmin): MsgUpdateProjectAdminAminoType["value"] => {
      return {
        admin,
        new_admin: newAdmin,
        project_id: projectId
      };
    },
    fromAmino: ({
      admin,
      new_admin,
      project_id
    }: MsgUpdateProjectAdminAminoType["value"]): MsgUpdateProjectAdmin => {
      return {
        admin,
        newAdmin: new_admin,
        projectId: project_id
      };
    }
  },
  "/regen.ecocredit.v1.MsgUpdateProjectMetadata": {
    aminoType: "/regen.ecocredit.v1.MsgUpdateProjectMetadata",
    toAmino: ({
      admin,
      newMetadata,
      projectId
    }: MsgUpdateProjectMetadata): MsgUpdateProjectMetadataAminoType["value"] => {
      return {
        admin,
        new_metadata: newMetadata,
        project_id: projectId
      };
    },
    fromAmino: ({
      admin,
      new_metadata,
      project_id
    }: MsgUpdateProjectMetadataAminoType["value"]): MsgUpdateProjectMetadata => {
      return {
        admin,
        newMetadata: new_metadata,
        projectId: project_id
      };
    }
  }
};