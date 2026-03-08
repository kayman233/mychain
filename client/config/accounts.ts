import { Account, accountFromAny as LegacyAccountFromAny } from '@cosmjs/stargate';
import { Any } from 'cosmjs-types/google/protobuf/any';
import { Uint64 } from '@cosmjs/math';

type AbstractAccount = {
  address: string;
  accountNumber: bigint;
  sequence: bigint;
};

function readVarint(bytes: Uint8Array, offset: number): [bigint, number] {
  let result = 0n;
  let shift = 0n;
  let index = offset;

  while (index < bytes.length) {
    const byte = bytes[index];
    result |= BigInt(byte & 0x7f) << shift;
    index += 1;

    if ((byte & 0x80) === 0) {
      return [result, index];
    }
    shift += 7n;
  }

  throw new Error('Invalid protobuf varint');
}

function decodeAbstractAccount(bytes: Uint8Array): AbstractAccount {
  let address = '';
  let accountNumber = 0n;
  let sequence = 0n;
  let offset = 0;

  while (offset < bytes.length) {
    const [tag, nextOffset] = readVarint(bytes, offset);
    offset = nextOffset;

    const field = Number(tag >> 3n);
    const wireType = Number(tag & 0x7n);

    if (field === 1 && wireType === 2) {
      const [len, afterLen] = readVarint(bytes, offset);
      const length = Number(len);
      const end = afterLen + length;
      address = new TextDecoder().decode(bytes.slice(afterLen, end));
      offset = end;
      continue;
    }

    if ((field === 2 || field === 3) && wireType === 0) {
      const [value, afterValue] = readVarint(bytes, offset);
      if (field === 2) {
        accountNumber = value;
      } else {
        sequence = value;
      }
      offset = afterValue;
      continue;
    }

    if (wireType === 0) {
      const [, afterValue] = readVarint(bytes, offset);
      offset = afterValue;
      continue;
    }

    if (wireType === 2) {
      const [len, afterLen] = readVarint(bytes, offset);
      offset = afterLen + Number(len);
      continue;
    }

    throw new Error(`Unsupported protobuf wire type: ${wireType}`);
  }

  return { address, accountNumber, sequence };
}

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
    case '/abstractaccount.v1.AbstractAccount': {
      const baseAccount = decodeAbstractAccount(value);
      return accountFromBaseAccount(baseAccount);
    }

    default:
      return LegacyAccountFromAny(input);
  }
}
