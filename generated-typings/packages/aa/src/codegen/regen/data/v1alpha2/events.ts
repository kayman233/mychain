import { BinaryReader, BinaryWriter } from "../../../binary";
/** EventAnchorData is an event emitted when data is anchored on-chain. */
export interface EventAnchorData {
  /** iri is the data IRI */
  iri: string;
}
/** EventAnchorData is an event emitted when data is anchored on-chain. */
export interface EventAnchorDataSDKType {
  iri: string;
}
/** EventSignData is an event emitted when data is signed on-chain. */
export interface EventSignData {
  /** iri is the data IRI */
  iri: string;
  /** signers are the addresses of the accounts which have signed the data. */
  signers: string[];
}
/** EventSignData is an event emitted when data is signed on-chain. */
export interface EventSignDataSDKType {
  iri: string;
  signers: string[];
}
/** EventStoreRawData is an event emitted when data is stored on-chain. */
export interface EventStoreRawData {
  /** iri is the data IRI */
  iri: string;
}
/** EventStoreRawData is an event emitted when data is stored on-chain. */
export interface EventStoreRawDataSDKType {
  iri: string;
}
function createBaseEventAnchorData(): EventAnchorData {
  return {
    iri: ""
  };
}
export const EventAnchorData = {
  typeUrl: "/regen.data.v1alpha2.EventAnchorData",
  encode(message: EventAnchorData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventAnchorData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventAnchorData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventAnchorData>): EventAnchorData {
    const message = createBaseEventAnchorData();
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: EventAnchorDataAmino): EventAnchorData {
    return {
      iri: object.iri
    };
  },
  toAmino(message: EventAnchorData): EventAnchorDataAmino {
    const obj: any = {};
    obj.iri = message.iri;
    return obj;
  },
  fromAminoMsg(object: EventAnchorDataAminoMsg): EventAnchorData {
    return EventAnchorData.fromAmino(object.value);
  },
  fromProtoMsg(message: EventAnchorDataProtoMsg): EventAnchorData {
    return EventAnchorData.decode(message.value);
  },
  toProto(message: EventAnchorData): Uint8Array {
    return EventAnchorData.encode(message).finish();
  },
  toProtoMsg(message: EventAnchorData): EventAnchorDataProtoMsg {
    return {
      typeUrl: "/regen.data.v1alpha2.EventAnchorData",
      value: EventAnchorData.encode(message).finish()
    };
  }
};
function createBaseEventSignData(): EventSignData {
  return {
    iri: "",
    signers: []
  };
}
export const EventSignData = {
  typeUrl: "/regen.data.v1alpha2.EventSignData",
  encode(message: EventSignData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    for (const v of message.signers) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventSignData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSignData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        case 2:
          message.signers.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventSignData>): EventSignData {
    const message = createBaseEventSignData();
    message.iri = object.iri ?? "";
    message.signers = object.signers?.map(e => e) || [];
    return message;
  },
  fromAmino(object: EventSignDataAmino): EventSignData {
    return {
      iri: object.iri,
      signers: Array.isArray(object?.signers) ? object.signers.map((e: any) => e) : []
    };
  },
  toAmino(message: EventSignData): EventSignDataAmino {
    const obj: any = {};
    obj.iri = message.iri;
    if (message.signers) {
      obj.signers = message.signers.map(e => e);
    } else {
      obj.signers = [];
    }
    return obj;
  },
  fromAminoMsg(object: EventSignDataAminoMsg): EventSignData {
    return EventSignData.fromAmino(object.value);
  },
  fromProtoMsg(message: EventSignDataProtoMsg): EventSignData {
    return EventSignData.decode(message.value);
  },
  toProto(message: EventSignData): Uint8Array {
    return EventSignData.encode(message).finish();
  },
  toProtoMsg(message: EventSignData): EventSignDataProtoMsg {
    return {
      typeUrl: "/regen.data.v1alpha2.EventSignData",
      value: EventSignData.encode(message).finish()
    };
  }
};
function createBaseEventStoreRawData(): EventStoreRawData {
  return {
    iri: ""
  };
}
export const EventStoreRawData = {
  typeUrl: "/regen.data.v1alpha2.EventStoreRawData",
  encode(message: EventStoreRawData, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): EventStoreRawData {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventStoreRawData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<EventStoreRawData>): EventStoreRawData {
    const message = createBaseEventStoreRawData();
    message.iri = object.iri ?? "";
    return message;
  },
  fromAmino(object: EventStoreRawDataAmino): EventStoreRawData {
    return {
      iri: object.iri
    };
  },
  toAmino(message: EventStoreRawData): EventStoreRawDataAmino {
    const obj: any = {};
    obj.iri = message.iri;
    return obj;
  },
  fromAminoMsg(object: EventStoreRawDataAminoMsg): EventStoreRawData {
    return EventStoreRawData.fromAmino(object.value);
  },
  fromProtoMsg(message: EventStoreRawDataProtoMsg): EventStoreRawData {
    return EventStoreRawData.decode(message.value);
  },
  toProto(message: EventStoreRawData): Uint8Array {
    return EventStoreRawData.encode(message).finish();
  },
  toProtoMsg(message: EventStoreRawData): EventStoreRawDataProtoMsg {
    return {
      typeUrl: "/regen.data.v1alpha2.EventStoreRawData",
      value: EventStoreRawData.encode(message).finish()
    };
  }
};