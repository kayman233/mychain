import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgUpdateParams, MsgRegisterAccount } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/abstractaccount.v1.MsgUpdateParams", MsgUpdateParams], ["/abstractaccount.v1.MsgRegisterAccount", MsgRegisterAccount]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/abstractaccount.v1.MsgUpdateParams",
        value: MsgUpdateParams.encode(value).finish()
      };
    },
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/abstractaccount.v1.MsgRegisterAccount",
        value: MsgRegisterAccount.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/abstractaccount.v1.MsgUpdateParams",
        value
      };
    },
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/abstractaccount.v1.MsgRegisterAccount",
        value
      };
    }
  },
  fromPartial: {
    updateParams(value: MsgUpdateParams) {
      return {
        typeUrl: "/abstractaccount.v1.MsgUpdateParams",
        value: MsgUpdateParams.fromPartial(value)
      };
    },
    registerAccount(value: MsgRegisterAccount) {
      return {
        typeUrl: "/abstractaccount.v1.MsgRegisterAccount",
        value: MsgRegisterAccount.fromPartial(value)
      };
    }
  }
};