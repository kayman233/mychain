import { Account, accountFromAny as LegacyAccountFromAny } from "@cosmjs/stargate";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Uint64 } from "@cosmjs/math";
import { AbstractAccount } from "../codegen/codegen/abstractaccount/v1/account";

function uint64FromProto(input: number | bigint): Uint64 {
    return Uint64.fromString(input.toString());
}

function accountFromBaseAccount(input: AbstractAccount): Account {
    const { address, accountNumber, sequence } = input;
    return {
      address: address,
      pubkey: null,
      accountNumber: uint64FromProto(accountNumber).toNumber(),
      sequence: uint64FromProto(sequence).toNumber(),
    };
  }

/**
 * Basic implementation of AccountParser. This is supposed to support the most relevant
 * common Cosmos SDK account types. If you need support for exotic account types,
 * you'll need to write your own account decoder.
 */
export function accountFromAny(input: Any): Account {
  const { typeUrl, value } = input;

  switch (typeUrl) {
    case "/abstractaccount.v1.AbstractAccount": {
      const baseAccount = AbstractAccount.decode(value);
      return accountFromBaseAccount(baseAccount);
    }

    default:
        return LegacyAccountFromAny(input);
  }
}