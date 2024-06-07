import { ContentHash, ContentHashSDKType, SignerEntry, SignerEntrySDKType, Content, ContentSDKType } from "./types";
import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** GenesisState is the genesis state */
export interface GenesisState {
  /** entries are the content entries */
  entries: GenesisContentEntry[];
}
/** GenesisState is the genesis state */
export interface GenesisStateSDKType {
  entries: GenesisContentEntrySDKType[];
}
/** GenesisContentEntry is a genesis content entry */
export interface GenesisContentEntry {
  /** hash is the ContentHash */
  hash: ContentHash;
  /** timestamp is the anchor Timestamp */
  timestamp: Date;
  /** signers are the signers, if any */
  signers: SignerEntry[];
  /** content is the actual content if stored on-chain */
  content: Content;
}
/** GenesisContentEntry is a genesis content entry */
export interface GenesisContentEntrySDKType {
  hash: ContentHashSDKType;
  timestamp: Date;
  signers: SignerEntrySDKType[];
  content: ContentSDKType;
}
function createBaseGenesisState(): GenesisState {
  return {
    entries: []
  };
}
export const GenesisState = {
  typeUrl: "/regen.data.v1alpha2.GenesisState",
  encode(message: GenesisState, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.entries) {
      GenesisContentEntry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(GenesisContentEntry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisState>): GenesisState {
    const message = createBaseGenesisState();
    message.entries = object.entries?.map(e => GenesisContentEntry.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GenesisStateAmino): GenesisState {
    return {
      entries: Array.isArray(object?.entries) ? object.entries.map((e: any) => GenesisContentEntry.fromAmino(e)) : []
    };
  },
  toAmino(message: GenesisState): GenesisStateAmino {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map(e => e ? GenesisContentEntry.toAmino(e) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },
  fromAminoMsg(object: GenesisStateAminoMsg): GenesisState {
    return GenesisState.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisStateProtoMsg): GenesisState {
    return GenesisState.decode(message.value);
  },
  toProto(message: GenesisState): Uint8Array {
    return GenesisState.encode(message).finish();
  },
  toProtoMsg(message: GenesisState): GenesisStateProtoMsg {
    return {
      typeUrl: "/regen.data.v1alpha2.GenesisState",
      value: GenesisState.encode(message).finish()
    };
  }
};
function createBaseGenesisContentEntry(): GenesisContentEntry {
  return {
    hash: ContentHash.fromPartial({}),
    timestamp: new Date(),
    signers: [],
    content: Content.fromPartial({})
  };
}
export const GenesisContentEntry = {
  typeUrl: "/regen.data.v1alpha2.GenesisContentEntry",
  encode(message: GenesisContentEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash !== undefined) {
      ContentHash.encode(message.hash, writer.uint32(10).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.signers) {
      SignerEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.content !== undefined) {
      Content.encode(message.content, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GenesisContentEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisContentEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = ContentHash.decode(reader, reader.uint32());
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.signers.push(SignerEntry.decode(reader, reader.uint32()));
          break;
        case 4:
          message.content = Content.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GenesisContentEntry>): GenesisContentEntry {
    const message = createBaseGenesisContentEntry();
    message.hash = object.hash !== undefined && object.hash !== null ? ContentHash.fromPartial(object.hash) : undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.signers = object.signers?.map(e => SignerEntry.fromPartial(e)) || [];
    message.content = object.content !== undefined && object.content !== null ? Content.fromPartial(object.content) : undefined;
    return message;
  },
  fromAmino(object: GenesisContentEntryAmino): GenesisContentEntry {
    return {
      hash: object?.hash ? ContentHash.fromAmino(object.hash) : undefined,
      timestamp: object.timestamp,
      signers: Array.isArray(object?.signers) ? object.signers.map((e: any) => SignerEntry.fromAmino(e)) : [],
      content: object?.content ? Content.fromAmino(object.content) : undefined
    };
  },
  toAmino(message: GenesisContentEntry): GenesisContentEntryAmino {
    const obj: any = {};
    obj.hash = message.hash ? ContentHash.toAmino(message.hash) : undefined;
    obj.timestamp = message.timestamp;
    if (message.signers) {
      obj.signers = message.signers.map(e => e ? SignerEntry.toAmino(e) : undefined);
    } else {
      obj.signers = [];
    }
    obj.content = message.content ? Content.toAmino(message.content) : undefined;
    return obj;
  },
  fromAminoMsg(object: GenesisContentEntryAminoMsg): GenesisContentEntry {
    return GenesisContentEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: GenesisContentEntryProtoMsg): GenesisContentEntry {
    return GenesisContentEntry.decode(message.value);
  },
  toProto(message: GenesisContentEntry): Uint8Array {
    return GenesisContentEntry.encode(message).finish();
  },
  toProtoMsg(message: GenesisContentEntry): GenesisContentEntryProtoMsg {
    return {
      typeUrl: "/regen.data.v1alpha2.GenesisContentEntry",
      value: GenesisContentEntry.encode(message).finish()
    };
  }
};