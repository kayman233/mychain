import { AminoMsg } from "@cosmjs/amino";
import { MsgCreate, MsgPut, MsgTake } from "./tx";
export interface MsgCreateAminoType extends AminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgCreate";
  value: {
    curator: string;
    name: string;
    description: string;
    exponent: number;
    disable_auto_retire: boolean;
    credit_type_abbrev: string;
    allowed_classes: string[];
    date_criteria: {
      min_start_date: {
        seconds: string;
        nanos: number;
      };
      start_date_window: {
        seconds: string;
        nanos: number;
      };
      years_in_the_past: number;
    };
    fee: {
      denom: string;
      amount: string;
    }[];
  };
}
export interface MsgPutAminoType extends AminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgPut";
  value: {
    owner: string;
    basket_denom: string;
    credits: {
      batch_denom: string;
      amount: string;
    }[];
  };
}
export interface MsgTakeAminoType extends AminoMsg {
  type: "/regen.ecocredit.basket.v1.MsgTake";
  value: {
    owner: string;
    basket_denom: string;
    amount: string;
    retirement_jurisdiction: string;
    retire_on_take: boolean;
  };
}
export const AminoConverter = {
  "/regen.ecocredit.basket.v1.MsgCreate": {
    aminoType: "/regen.ecocredit.basket.v1.MsgCreate",
    toAmino: ({
      curator,
      name,
      description,
      exponent,
      disableAutoRetire,
      creditTypeAbbrev,
      allowedClasses,
      dateCriteria,
      fee
    }: MsgCreate): MsgCreateAminoType["value"] => {
      return {
        curator,
        name,
        description,
        exponent,
        disable_auto_retire: disableAutoRetire,
        credit_type_abbrev: creditTypeAbbrev,
        allowed_classes: allowedClasses,
        date_criteria: {
          min_start_date: dateCriteria.minStartDate,
          start_date_window: (dateCriteria.startDateWindow * 1_000_000_000).toString(),
          years_in_the_past: dateCriteria.yearsInThePast
        },
        fee: fee.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        }))
      };
    },
    fromAmino: ({
      curator,
      name,
      description,
      exponent,
      disable_auto_retire,
      credit_type_abbrev,
      allowed_classes,
      date_criteria,
      fee
    }: MsgCreateAminoType["value"]): MsgCreate => {
      return {
        curator,
        name,
        description,
        exponent,
        disableAutoRetire: disable_auto_retire,
        creditTypeAbbrev: credit_type_abbrev,
        allowedClasses: allowed_classes,
        dateCriteria: {
          minStartDate: date_criteria.min_start_date,
          startDateWindow: {
            seconds: BigInt(Math.floor(parseInt(date_criteria.start_date_window) / 1_000_000_000)),
            nanos: parseInt(date_criteria.start_date_window) % 1_000_000_000
          },
          yearsInThePast: date_criteria.years_in_the_past
        },
        fee: fee.map(el0 => ({
          denom: el0.denom,
          amount: el0.amount
        }))
      };
    }
  },
  "/regen.ecocredit.basket.v1.MsgPut": {
    aminoType: "/regen.ecocredit.basket.v1.MsgPut",
    toAmino: ({
      owner,
      basketDenom,
      credits
    }: MsgPut): MsgPutAminoType["value"] => {
      return {
        owner,
        basket_denom: basketDenom,
        credits: credits.map(el0 => ({
          batch_denom: el0.batchDenom,
          amount: el0.amount
        }))
      };
    },
    fromAmino: ({
      owner,
      basket_denom,
      credits
    }: MsgPutAminoType["value"]): MsgPut => {
      return {
        owner,
        basketDenom: basket_denom,
        credits: credits.map(el0 => ({
          batchDenom: el0.batch_denom,
          amount: el0.amount
        }))
      };
    }
  },
  "/regen.ecocredit.basket.v1.MsgTake": {
    aminoType: "/regen.ecocredit.basket.v1.MsgTake",
    toAmino: ({
      owner,
      basketDenom,
      amount,
      retirementJurisdiction,
      retireOnTake
    }: MsgTake): MsgTakeAminoType["value"] => {
      return {
        owner,
        basket_denom: basketDenom,
        amount,
        retirement_jurisdiction: retirementJurisdiction,
        retire_on_take: retireOnTake
      };
    },
    fromAmino: ({
      owner,
      basket_denom,
      amount,
      retirement_jurisdiction,
      retire_on_take
    }: MsgTakeAminoType["value"]): MsgTake => {
      return {
        owner,
        basketDenom: basket_denom,
        amount,
        retirementJurisdiction: retirement_jurisdiction,
        retireOnTake: retire_on_take
      };
    }
  }
};