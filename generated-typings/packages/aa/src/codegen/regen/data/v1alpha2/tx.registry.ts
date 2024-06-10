import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgAnchorData, MsgSignData, MsgStoreRawData } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/regen.data.v1alpha2.MsgAnchorData", MsgAnchorData], ["/regen.data.v1alpha2.MsgSignData", MsgSignData], ["/regen.data.v1alpha2.MsgStoreRawData", MsgStoreRawData]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    anchorData(value: MsgAnchorData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgAnchorData",
        value: MsgAnchorData.encode(value).finish()
      };
    },
    signData(value: MsgSignData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgSignData",
        value: MsgSignData.encode(value).finish()
      };
    },
    storeRawData(value: MsgStoreRawData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgStoreRawData",
        value: MsgStoreRawData.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    anchorData(value: MsgAnchorData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgAnchorData",
        value
      };
    },
    signData(value: MsgSignData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgSignData",
        value
      };
    },
    storeRawData(value: MsgStoreRawData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgStoreRawData",
        value
      };
    }
  },
  fromPartial: {
    anchorData(value: MsgAnchorData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgAnchorData",
        value: MsgAnchorData.fromPartial(value)
      };
    },
    signData(value: MsgSignData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgSignData",
        value: MsgSignData.fromPartial(value)
      };
    },
    storeRawData(value: MsgStoreRawData) {
      return {
        typeUrl: "/regen.data.v1alpha2.MsgStoreRawData",
        value: MsgStoreRawData.fromPartial(value)
      };
    }
  }
};