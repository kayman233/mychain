import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { toTimestamp, fromTimestamp } from "../../../helpers";
/** DataID stores a compact data ID and its full IRI. */
export interface DataID {
  /** id is the compact automatically-generated data ID. */
  id: Uint8Array;
  /** iri is the IRI of the data which contains its full ContentHash. */
  iri: string;
}
/** DataID stores a compact data ID and its full IRI. */
export interface DataIDSDKType {
  id: Uint8Array;
  iri: string;
}
/** DataAnchor stores the anchor timestamp for a data object. */
export interface DataAnchor {
  /** id is the compact data ID. */
  id: Uint8Array;
  /**
   * timestamp is the anchor timestamp for this object - the time at which
   * it was first known to the blockchain.
   */
  timestamp: Date;
}
/** DataAnchor stores the anchor timestamp for a data object. */
export interface DataAnchorSDKType {
  id: Uint8Array;
  timestamp: Date;
}
/** DataAttestor is a join table for associating data IDs and attestors. */
export interface DataAttestor {
  /** id is the compact data ID. */
  id: Uint8Array;
  /** attestor is the account address of the attestor. */
  attestor: Uint8Array;
  /** timestamp is the time at which the attestor signed this data object. */
  timestamp: Date;
}
/** DataAttestor is a join table for associating data IDs and attestors. */
export interface DataAttestorSDKType {
  id: Uint8Array;
  attestor: Uint8Array;
  timestamp: Date;
}
/** ResolverInfo describes a data resolver. */
export interface ResolverInfo {
  /** id is the ID of the resolver. */
  id: bigint;
  /** url is the unique URL of the resolver. */
  url: string;
  /**
   * manager is the bytes address of the resolver manager who is allowed
   * to make calls to Msg/RegisterResolver for this resolver.
   */
  manager: Uint8Array;
}
/** ResolverInfo describes a data resolver. */
export interface ResolverInfoSDKType {
  id: bigint;
  url: string;
  manager: Uint8Array;
}
/**
 * DataResolver is a join table between data objects and resolvers and indicates
 * that a resolver claims to be able to resolve this data object.
 */
export interface DataResolver {
  /** id is the compact data ID. */
  id: Uint8Array;
  /** resolver_id is the ID of the resolver. */
  resolverId: bigint;
}
/**
 * DataResolver is a join table between data objects and resolvers and indicates
 * that a resolver claims to be able to resolve this data object.
 */
export interface DataResolverSDKType {
  id: Uint8Array;
  resolver_id: bigint;
}
function createBaseDataID(): DataID {
  return {
    id: new Uint8Array(),
    iri: ""
  };
}
export const DataID = {
  typeUrl: "/regen.data.v1.DataID",
  encode(message: DataID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.iri !== "") {
      writer.uint32(18).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DataID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.iri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataID>): DataID {
    const message = createBaseDataID();
    message.id = object.id ?? new Uint8Array();
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: DataIDAmino): DataID {
    return {
      id: object.id,
      iri: object.iri
    };
  },
  toAmino(message: DataID): DataIDAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.iri = message.iri;
    return obj;
  },
  fromAminoMsg(object: DataIDAminoMsg): DataID {
    return DataID.fromAmino(object.value);
  },
  fromProtoMsg(message: DataIDProtoMsg): DataID {
    return DataID.decode(message.value);
  },
  toProto(message: DataID): Uint8Array {
    return DataID.encode(message).finish();
  },
  toProtoMsg(message: DataID): DataIDProtoMsg {
    return {
      typeUrl: "/regen.data.v1.DataID",
      value: DataID.encode(message).finish()
    };
  }
};
function createBaseDataAnchor(): DataAnchor {
  return {
    id: new Uint8Array(),
    timestamp: new Date()
  };
}
export const DataAnchor = {
  typeUrl: "/regen.data.v1.DataAnchor",
  encode(message: DataAnchor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DataAnchor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAnchor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataAnchor>): DataAnchor {
    const message = createBaseDataAnchor();
    message.id = object.id ?? new Uint8Array();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: DataAnchorAmino): DataAnchor {
    return {
      id: object.id,
      timestamp: object.timestamp
    };
  },
  toAmino(message: DataAnchor): DataAnchorAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.timestamp = message.timestamp;
    return obj;
  },
  fromAminoMsg(object: DataAnchorAminoMsg): DataAnchor {
    return DataAnchor.fromAmino(object.value);
  },
  fromProtoMsg(message: DataAnchorProtoMsg): DataAnchor {
    return DataAnchor.decode(message.value);
  },
  toProto(message: DataAnchor): Uint8Array {
    return DataAnchor.encode(message).finish();
  },
  toProtoMsg(message: DataAnchor): DataAnchorProtoMsg {
    return {
      typeUrl: "/regen.data.v1.DataAnchor",
      value: DataAnchor.encode(message).finish()
    };
  }
};
function createBaseDataAttestor(): DataAttestor {
  return {
    id: new Uint8Array(),
    attestor: new Uint8Array(),
    timestamp: new Date()
  };
}
export const DataAttestor = {
  typeUrl: "/regen.data.v1.DataAttestor",
  encode(message: DataAttestor, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.attestor.length !== 0) {
      writer.uint32(18).bytes(message.attestor);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DataAttestor {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataAttestor();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.attestor = reader.bytes();
          break;
        case 3:
          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataAttestor>): DataAttestor {
    const message = createBaseDataAttestor();
    message.id = object.id ?? new Uint8Array();
    message.attestor = object.attestor ?? new Uint8Array();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: DataAttestorAmino): DataAttestor {
    return {
      id: object.id,
      attestor: object.attestor,
      timestamp: object.timestamp
    };
  },
  toAmino(message: DataAttestor): DataAttestorAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.attestor = message.attestor;
    obj.timestamp = message.timestamp;
    return obj;
  },
  fromAminoMsg(object: DataAttestorAminoMsg): DataAttestor {
    return DataAttestor.fromAmino(object.value);
  },
  fromProtoMsg(message: DataAttestorProtoMsg): DataAttestor {
    return DataAttestor.decode(message.value);
  },
  toProto(message: DataAttestor): Uint8Array {
    return DataAttestor.encode(message).finish();
  },
  toProtoMsg(message: DataAttestor): DataAttestorProtoMsg {
    return {
      typeUrl: "/regen.data.v1.DataAttestor",
      value: DataAttestor.encode(message).finish()
    };
  }
};
function createBaseResolverInfo(): ResolverInfo {
  return {
    id: BigInt(0),
    url: "",
    manager: new Uint8Array()
  };
}
export const ResolverInfo = {
  typeUrl: "/regen.data.v1.ResolverInfo",
  encode(message: ResolverInfo, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== BigInt(0)) {
      writer.uint32(8).uint64(message.id);
    }
    if (message.url !== "") {
      writer.uint32(18).string(message.url);
    }
    if (message.manager.length !== 0) {
      writer.uint32(26).bytes(message.manager);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ResolverInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResolverInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.uint64();
          break;
        case 2:
          message.url = reader.string();
          break;
        case 3:
          message.manager = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ResolverInfo>): ResolverInfo {
    const message = createBaseResolverInfo();
    message.id = object.id !== undefined && object.id !== null ? BigInt(object.id.toString()) : BigInt(0);
    message.url = object.url ?? "";
    message.manager = object.manager ?? new Uint8Array();
    return message;
  },
  fromAmino(object: ResolverInfoAmino): ResolverInfo {
    return {
      id: BigInt(object.id),
      url: object.url,
      manager: object.manager
    };
  },
  toAmino(message: ResolverInfo): ResolverInfoAmino {
    const obj: any = {};
    obj.id = message.id ? message.id.toString() : undefined;
    obj.url = message.url;
    obj.manager = message.manager;
    return obj;
  },
  fromAminoMsg(object: ResolverInfoAminoMsg): ResolverInfo {
    return ResolverInfo.fromAmino(object.value);
  },
  fromProtoMsg(message: ResolverInfoProtoMsg): ResolverInfo {
    return ResolverInfo.decode(message.value);
  },
  toProto(message: ResolverInfo): Uint8Array {
    return ResolverInfo.encode(message).finish();
  },
  toProtoMsg(message: ResolverInfo): ResolverInfoProtoMsg {
    return {
      typeUrl: "/regen.data.v1.ResolverInfo",
      value: ResolverInfo.encode(message).finish()
    };
  }
};
function createBaseDataResolver(): DataResolver {
  return {
    id: new Uint8Array(),
    resolverId: BigInt(0)
  };
}
export const DataResolver = {
  typeUrl: "/regen.data.v1.DataResolver",
  encode(message: DataResolver, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id.length !== 0) {
      writer.uint32(10).bytes(message.id);
    }
    if (message.resolverId !== BigInt(0)) {
      writer.uint32(16).uint64(message.resolverId);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): DataResolver {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataResolver();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.bytes();
          break;
        case 2:
          message.resolverId = reader.uint64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<DataResolver>): DataResolver {
    const message = createBaseDataResolver();
    message.id = object.id ?? new Uint8Array();
    message.resolverId = object.resolverId !== undefined && object.resolverId !== null ? BigInt(object.resolverId.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: DataResolverAmino): DataResolver {
    return {
      id: object.id,
      resolverId: BigInt(object.resolver_id)
    };
  },
  toAmino(message: DataResolver): DataResolverAmino {
    const obj: any = {};
    obj.id = message.id;
    obj.resolver_id = message.resolverId ? message.resolverId.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: DataResolverAminoMsg): DataResolver {
    return DataResolver.fromAmino(object.value);
  },
  fromProtoMsg(message: DataResolverProtoMsg): DataResolver {
    return DataResolver.decode(message.value);
  },
  toProto(message: DataResolver): Uint8Array {
    return DataResolver.encode(message).finish();
  },
  toProtoMsg(message: DataResolver): DataResolverProtoMsg {
    return {
      typeUrl: "/regen.data.v1.DataResolver",
      value: DataResolver.encode(message).finish()
    };
  }
};