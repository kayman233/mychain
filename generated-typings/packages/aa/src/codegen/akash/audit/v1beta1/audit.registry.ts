import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSignProviderAttributes, MsgDeleteProviderAttributes } from "./audit";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/akash.audit.v1beta1.MsgSignProviderAttributes", MsgSignProviderAttributes], ["/akash.audit.v1beta1.MsgDeleteProviderAttributes", MsgDeleteProviderAttributes]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    signProviderAttributes(value: MsgSignProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgSignProviderAttributes",
        value: MsgSignProviderAttributes.encode(value).finish()
      };
    },
    deleteProviderAttributes(value: MsgDeleteProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgDeleteProviderAttributes",
        value: MsgDeleteProviderAttributes.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    signProviderAttributes(value: MsgSignProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgSignProviderAttributes",
        value
      };
    },
    deleteProviderAttributes(value: MsgDeleteProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgDeleteProviderAttributes",
        value
      };
    }
  },
  fromPartial: {
    signProviderAttributes(value: MsgSignProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgSignProviderAttributes",
        value: MsgSignProviderAttributes.fromPartial(value)
      };
    },
    deleteProviderAttributes(value: MsgDeleteProviderAttributes) {
      return {
        typeUrl: "/akash.audit.v1beta1.MsgDeleteProviderAttributes",
        value: MsgDeleteProviderAttributes.fromPartial(value)
      };
    }
  }
};