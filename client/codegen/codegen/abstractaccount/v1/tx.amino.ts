import { AminoMsg } from "@cosmjs/amino";
import { MsgUpdateParams, MsgRegisterAccount } from "./tx";
export interface MsgUpdateParamsAminoType extends AminoMsg {
  type: "/abstractaccount.v1.MsgUpdateParams";
  value: {
    sender: string;
    params: {
      allow_all_code_ids: boolean;
      allowed_code_ids: string[];
      max_gas_before: string;
      max_gas_after: string;
    };
  };
}
export interface MsgRegisterAccountAminoType extends AminoMsg {
  type: "/abstractaccount.v1.MsgRegisterAccount";
  value: {
    sender: string;
    code_id: string;
    msg: Uint8Array;
    funds: {
      denom: string;
      amount: string;
    }[];
    salt: Uint8Array;
  };
}
export const AminoConverter = {
  "/abstractaccount.v1.MsgUpdateParams": {
    aminoType: "/abstractaccount.v1.MsgUpdateParams",
    toAmino: ({
      sender,
      params
    }: MsgUpdateParams): MsgUpdateParamsAminoType["value"] => {
      return {
        sender,
        params: {
          allow_all_code_ids: params.allowAllCodeIds,
          allowed_code_ids: params.allowedCodeIds.map(el0 => el0.toString()),
          max_gas_before: params.maxGasBefore.toString(),
          max_gas_after: params.maxGasAfter.toString()
        }
      };
    },
    fromAmino: ({
      sender,
      params
    }: MsgUpdateParamsAminoType["value"]): MsgUpdateParams => {
      return {
        sender,
        params: {
          allowAllCodeIds: params.allow_all_code_ids,
          allowedCodeIds: params.allowed_code_ids.map(el1 => BigInt(el1)),
          maxGasBefore: BigInt(params.max_gas_before),
          maxGasAfter: BigInt(params.max_gas_after)
        }
      };
    }
  },
  "/abstractaccount.v1.MsgRegisterAccount": {
    aminoType: "/abstractaccount.v1.MsgRegisterAccount",
    toAmino: ({
      sender,
      codeId,
      msg,
      funds,
      salt
    }: MsgRegisterAccount): MsgRegisterAccountAminoType["value"] => {
      return {
        sender,
        code_id: codeId.toString(),
        msg,
        funds: funds.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        salt
      };
    },
    fromAmino: ({
      sender,
      code_id,
      msg,
      funds,
      salt
    }: MsgRegisterAccountAminoType["value"]): MsgRegisterAccount => {
      return {
        sender,
        codeId: BigInt(code_id),
        msg,
        funds: funds.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        salt
      };
    }
  }
};