import { AminoMsg } from "@cosmjs/amino";
import { MsgCreateVestingAccount } from "./tx";
export interface MsgCreateVestingAccountAminoType extends AminoMsg {
  type: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount";
  value: {
    from_address: string;
    to_address: string;
    amount: {
      denom: string;
      amount: string;
    }[];
    start_time: string;
    end_time: string;
    delayed: boolean;
  };
}
export const AminoConverter = {
  "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount": {
    aminoType: "/publicawesome.stargaze.alloc.v1beta1.MsgCreateVestingAccount",
    toAmino: ({
      fromAddress,
      toAddress,
      amount,
      startTime,
      endTime,
      delayed
    }: MsgCreateVestingAccount): MsgCreateVestingAccountAminoType["value"] => {
      return {
        from_address: fromAddress,
        to_address: toAddress,
        amount: amount.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        start_time: startTime.toString(),
        end_time: endTime.toString(),
        delayed
      };
    },
    fromAmino: ({
      from_address,
      to_address,
      amount,
      start_time,
      end_time,
      delayed
    }: MsgCreateVestingAccountAminoType["value"]): MsgCreateVestingAccount => {
      return {
        fromAddress: from_address,
        toAddress: to_address,
        amount: amount.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        })),
        startTime: BigInt(start_time),
        endTime: BigInt(end_time),
        delayed
      };
    }
  }
};