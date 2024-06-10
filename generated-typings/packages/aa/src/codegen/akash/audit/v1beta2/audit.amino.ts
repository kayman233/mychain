import { AminoMsg } from "@cosmjs/amino";
import { MsgSignProviderAttributes, MsgDeleteProviderAttributes } from "./audit";
export interface MsgSignProviderAttributesAminoType extends AminoMsg {
  type: "/akash.audit.v1beta2.MsgSignProviderAttributes";
  value: {
    owner: string;
    auditor: string;
    attributes: {
      key: string;
      value: string;
    }[];
  };
}
export interface MsgDeleteProviderAttributesAminoType extends AminoMsg {
  type: "/akash.audit.v1beta2.MsgDeleteProviderAttributes";
  value: {
    owner: string;
    auditor: string;
    keys: string[];
  };
}
export const AminoConverter = {
  "/akash.audit.v1beta2.MsgSignProviderAttributes": {
    aminoType: "/akash.audit.v1beta2.MsgSignProviderAttributes",
    toAmino: ({
      owner,
      auditor,
      attributes
    }: MsgSignProviderAttributes): MsgSignProviderAttributesAminoType["value"] => {
      return {
        owner,
        auditor,
        attributes: attributes.map(el0 => ({
          key: el0.key,
          value: el0.value
        }))
      };
    },
    fromAmino: ({
      owner,
      auditor,
      attributes
    }: MsgSignProviderAttributesAminoType["value"]): MsgSignProviderAttributes => {
      return {
        owner,
        auditor,
        attributes: attributes.map(el0 => ({
          key: el0.key,
          value: el0.value
        }))
      };
    }
  },
  "/akash.audit.v1beta2.MsgDeleteProviderAttributes": {
    aminoType: "/akash.audit.v1beta2.MsgDeleteProviderAttributes",
    toAmino: ({
      owner,
      auditor,
      keys
    }: MsgDeleteProviderAttributes): MsgDeleteProviderAttributesAminoType["value"] => {
      return {
        owner,
        auditor,
        keys
      };
    },
    fromAmino: ({
      owner,
      auditor,
      keys
    }: MsgDeleteProviderAttributesAminoType["value"]): MsgDeleteProviderAttributes => {
      return {
        owner,
        auditor,
        keys
      };
    }
  }
};