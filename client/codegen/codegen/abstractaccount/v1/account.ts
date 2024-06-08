import { BinaryReader, BinaryWriter } from "../../binary";
/**
 * AbstractAccount is a smart contract that is capable of initiating txs.
 * 
 * This account type is similar to BaseAccount except for it doesn't have a
 * pubkey. If a pubkey is needed, it creates and returns a new NilPubKey.
 */
export interface AbstractAccount {
  address: string;
  accountNumber: bigint;
  sequence: bigint;
}
/**
 * AbstractAccount is a smart contract that is capable of initiating txs.
 * 
 * This account type is similar to BaseAccount except for it doesn't have a
 * pubkey. If a pubkey is needed, it creates and returns a new NilPubKey.
 */
export interface AbstractAccountSDKType {
  address: string;
  account_number: bigint;
  sequence: bigint;
}
/**
 * NilPubKey is the pubkey type of the AbstractAccount. Basically, it represents
 * a pubkey that doesn't exist.
 * 
 * The actual pubkey of an AbstractAccount (if it has one) is to be stored
 * inside the contract, not at the SDK level. Signature verification is also
 * done inside the contract, typically in the BeforeTx hook.
 */
export interface NilPubKey {
  addressBytes: Uint8Array;
}
/**
 * NilPubKey is the pubkey type of the AbstractAccount. Basically, it represents
 * a pubkey that doesn't exist.
 * 
 * The actual pubkey of an AbstractAccount (if it has one) is to be stored
 * inside the contract, not at the SDK level. Signature verification is also
 * done inside the contract, typically in the BeforeTx hook.
 */
export interface NilPubKeySDKType {
  address_bytes: Uint8Array;
}
function createBaseAbstractAccount(): AbstractAccount {
  return {
    address: "",
    accountNumber: BigInt(0),
    sequence: BigInt(0)
  };
}
export const AbstractAccount = {
  typeUrl: "/abstractaccount.v1.AbstractAccount",
  encode(message: AbstractAccount, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.accountNumber !== BigInt(0)) {
      writer.uint32(16).uint64(message.accountNumber);
    }
    if (message.sequence !== BigInt(0)) {
      writer.uint32(24).uint64(message.sequence);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AbstractAccount {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAbstractAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.accountNumber = reader.uint64();
          break;
        case 3:
          message.sequence = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<AbstractAccount>): AbstractAccount {
    const message = createBaseAbstractAccount();
    message.address = object.address ?? "";
    message.accountNumber = object.accountNumber !== undefined && object.accountNumber !== null ? BigInt(object.accountNumber.toString()) : BigInt(0);
    message.sequence = object.sequence !== undefined && object.sequence !== null ? BigInt(object.sequence.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: AbstractAccountAmino): AbstractAccount {
    return {
      address: object.address,
      accountNumber: BigInt(object.account_number),
      sequence: BigInt(object.sequence)
    };
  },
  toAmino(message: AbstractAccount): AbstractAccountAmino {
    const obj: any = {};
    obj.address = message.address;
    obj.account_number = message.accountNumber ? message.accountNumber.toString() : undefined;
    obj.sequence = message.sequence ? message.sequence.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: AbstractAccountAminoMsg): AbstractAccount {
    return AbstractAccount.fromAmino(object.value);
  },
  fromProtoMsg(message: AbstractAccountProtoMsg): AbstractAccount {
    return AbstractAccount.decode(message.value);
  },
  toProto(message: AbstractAccount): Uint8Array {
    return AbstractAccount.encode(message).finish();
  },
  toProtoMsg(message: AbstractAccount): AbstractAccountProtoMsg {
    return {
      typeUrl: "/abstractaccount.v1.AbstractAccount",
      value: AbstractAccount.encode(message).finish()
    };
  }
};
function createBaseNilPubKey(): NilPubKey {
  return {
    addressBytes: new Uint8Array()
  };
}
export const NilPubKey = {
  typeUrl: "/abstractaccount.v1.NilPubKey",
  encode(message: NilPubKey, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.addressBytes.length !== 0) {
      writer.uint32(10).bytes(message.addressBytes);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): NilPubKey {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNilPubKey();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.addressBytes = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<NilPubKey>): NilPubKey {
    const message = createBaseNilPubKey();
    message.addressBytes = object.addressBytes ?? new Uint8Array();
    return message;
  },
  fromAmino(object: NilPubKeyAmino): NilPubKey {
    return {
      addressBytes: object.address_bytes
    };
  },
  toAmino(message: NilPubKey): NilPubKeyAmino {
    const obj: any = {};
    obj.address_bytes = message.addressBytes;
    return obj;
  },
  fromAminoMsg(object: NilPubKeyAminoMsg): NilPubKey {
    return NilPubKey.fromAmino(object.value);
  },
  fromProtoMsg(message: NilPubKeyProtoMsg): NilPubKey {
    return NilPubKey.decode(message.value);
  },
  toProto(message: NilPubKey): Uint8Array {
    return NilPubKey.encode(message).finish();
  },
  toProtoMsg(message: NilPubKey): NilPubKeyProtoMsg {
    return {
      typeUrl: "/abstractaccount.v1.NilPubKey",
      value: NilPubKey.encode(message).finish()
    };
  }
};