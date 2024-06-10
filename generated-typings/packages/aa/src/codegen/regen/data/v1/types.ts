import { Timestamp } from "../../../google/protobuf/timestamp";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet, toTimestamp, fromTimestamp } from "../../../helpers";
/** DigestAlgorithm is the hash digest algorithm */
export enum DigestAlgorithm {
  /** DIGEST_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  DIGEST_ALGORITHM_UNSPECIFIED = 0,
  /** DIGEST_ALGORITHM_BLAKE2B_256 - BLAKE2b-256 */
  DIGEST_ALGORITHM_BLAKE2B_256 = 1,
  UNRECOGNIZED = -1,
}
export const DigestAlgorithmSDKType = DigestAlgorithm;
export function digestAlgorithmFromJSON(object: any): DigestAlgorithm {
  switch (object) {
    case 0:
    case "DIGEST_ALGORITHM_UNSPECIFIED":
      return DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED;
    case 1:
    case "DIGEST_ALGORITHM_BLAKE2B_256":
      return DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DigestAlgorithm.UNRECOGNIZED;
  }
}
export function digestAlgorithmToJSON(object: DigestAlgorithm): string {
  switch (object) {
    case DigestAlgorithm.DIGEST_ALGORITHM_UNSPECIFIED:
      return "DIGEST_ALGORITHM_UNSPECIFIED";
    case DigestAlgorithm.DIGEST_ALGORITHM_BLAKE2B_256:
      return "DIGEST_ALGORITHM_BLAKE2B_256";
    case DigestAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** RawMediaType defines MIME media types to be used with a ContentHash.Raw hash. */
export enum RawMediaType {
  /** RAW_MEDIA_TYPE_UNSPECIFIED - RAW_MEDIA_TYPE_UNSPECIFIED can be used for raw binary data */
  RAW_MEDIA_TYPE_UNSPECIFIED = 0,
  /** RAW_MEDIA_TYPE_TEXT_PLAIN - plain text */
  RAW_MEDIA_TYPE_TEXT_PLAIN = 1,
  /** RAW_MEDIA_TYPE_JSON - JSON */
  RAW_MEDIA_TYPE_JSON = 2,
  /** RAW_MEDIA_TYPE_CSV - CSV */
  RAW_MEDIA_TYPE_CSV = 3,
  /** RAW_MEDIA_TYPE_XML - XML */
  RAW_MEDIA_TYPE_XML = 4,
  /** RAW_MEDIA_TYPE_PDF - PDF */
  RAW_MEDIA_TYPE_PDF = 5,
  /** RAW_MEDIA_TYPE_TIFF - TIIF */
  RAW_MEDIA_TYPE_TIFF = 16,
  /** RAW_MEDIA_TYPE_JPG - JPG */
  RAW_MEDIA_TYPE_JPG = 17,
  /** RAW_MEDIA_TYPE_PNG - PNG */
  RAW_MEDIA_TYPE_PNG = 18,
  /** RAW_MEDIA_TYPE_SVG - SVG */
  RAW_MEDIA_TYPE_SVG = 19,
  /** RAW_MEDIA_TYPE_WEBP - WEBP */
  RAW_MEDIA_TYPE_WEBP = 20,
  /** RAW_MEDIA_TYPE_AVIF - AVIF */
  RAW_MEDIA_TYPE_AVIF = 21,
  /** RAW_MEDIA_TYPE_GIF - GIF */
  RAW_MEDIA_TYPE_GIF = 22,
  /** RAW_MEDIA_TYPE_APNG - APNG */
  RAW_MEDIA_TYPE_APNG = 23,
  /** RAW_MEDIA_TYPE_MPEG - MPEG */
  RAW_MEDIA_TYPE_MPEG = 32,
  /** RAW_MEDIA_TYPE_MP4 - MP4 */
  RAW_MEDIA_TYPE_MP4 = 33,
  /** RAW_MEDIA_TYPE_WEBM - WEBM */
  RAW_MEDIA_TYPE_WEBM = 34,
  /** RAW_MEDIA_TYPE_OGG - OGG */
  RAW_MEDIA_TYPE_OGG = 35,
  UNRECOGNIZED = -1,
}
export const RawMediaTypeSDKType = RawMediaType;
export function rawMediaTypeFromJSON(object: any): RawMediaType {
  switch (object) {
    case 0:
    case "RAW_MEDIA_TYPE_UNSPECIFIED":
      return RawMediaType.RAW_MEDIA_TYPE_UNSPECIFIED;
    case 1:
    case "RAW_MEDIA_TYPE_TEXT_PLAIN":
      return RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN;
    case 2:
    case "RAW_MEDIA_TYPE_JSON":
      return RawMediaType.RAW_MEDIA_TYPE_JSON;
    case 3:
    case "RAW_MEDIA_TYPE_CSV":
      return RawMediaType.RAW_MEDIA_TYPE_CSV;
    case 4:
    case "RAW_MEDIA_TYPE_XML":
      return RawMediaType.RAW_MEDIA_TYPE_XML;
    case 5:
    case "RAW_MEDIA_TYPE_PDF":
      return RawMediaType.RAW_MEDIA_TYPE_PDF;
    case 16:
    case "RAW_MEDIA_TYPE_TIFF":
      return RawMediaType.RAW_MEDIA_TYPE_TIFF;
    case 17:
    case "RAW_MEDIA_TYPE_JPG":
      return RawMediaType.RAW_MEDIA_TYPE_JPG;
    case 18:
    case "RAW_MEDIA_TYPE_PNG":
      return RawMediaType.RAW_MEDIA_TYPE_PNG;
    case 19:
    case "RAW_MEDIA_TYPE_SVG":
      return RawMediaType.RAW_MEDIA_TYPE_SVG;
    case 20:
    case "RAW_MEDIA_TYPE_WEBP":
      return RawMediaType.RAW_MEDIA_TYPE_WEBP;
    case 21:
    case "RAW_MEDIA_TYPE_AVIF":
      return RawMediaType.RAW_MEDIA_TYPE_AVIF;
    case 22:
    case "RAW_MEDIA_TYPE_GIF":
      return RawMediaType.RAW_MEDIA_TYPE_GIF;
    case 23:
    case "RAW_MEDIA_TYPE_APNG":
      return RawMediaType.RAW_MEDIA_TYPE_APNG;
    case 32:
    case "RAW_MEDIA_TYPE_MPEG":
      return RawMediaType.RAW_MEDIA_TYPE_MPEG;
    case 33:
    case "RAW_MEDIA_TYPE_MP4":
      return RawMediaType.RAW_MEDIA_TYPE_MP4;
    case 34:
    case "RAW_MEDIA_TYPE_WEBM":
      return RawMediaType.RAW_MEDIA_TYPE_WEBM;
    case 35:
    case "RAW_MEDIA_TYPE_OGG":
      return RawMediaType.RAW_MEDIA_TYPE_OGG;
    case -1:
    case "UNRECOGNIZED":
    default:
      return RawMediaType.UNRECOGNIZED;
  }
}
export function rawMediaTypeToJSON(object: RawMediaType): string {
  switch (object) {
    case RawMediaType.RAW_MEDIA_TYPE_UNSPECIFIED:
      return "RAW_MEDIA_TYPE_UNSPECIFIED";
    case RawMediaType.RAW_MEDIA_TYPE_TEXT_PLAIN:
      return "RAW_MEDIA_TYPE_TEXT_PLAIN";
    case RawMediaType.RAW_MEDIA_TYPE_JSON:
      return "RAW_MEDIA_TYPE_JSON";
    case RawMediaType.RAW_MEDIA_TYPE_CSV:
      return "RAW_MEDIA_TYPE_CSV";
    case RawMediaType.RAW_MEDIA_TYPE_XML:
      return "RAW_MEDIA_TYPE_XML";
    case RawMediaType.RAW_MEDIA_TYPE_PDF:
      return "RAW_MEDIA_TYPE_PDF";
    case RawMediaType.RAW_MEDIA_TYPE_TIFF:
      return "RAW_MEDIA_TYPE_TIFF";
    case RawMediaType.RAW_MEDIA_TYPE_JPG:
      return "RAW_MEDIA_TYPE_JPG";
    case RawMediaType.RAW_MEDIA_TYPE_PNG:
      return "RAW_MEDIA_TYPE_PNG";
    case RawMediaType.RAW_MEDIA_TYPE_SVG:
      return "RAW_MEDIA_TYPE_SVG";
    case RawMediaType.RAW_MEDIA_TYPE_WEBP:
      return "RAW_MEDIA_TYPE_WEBP";
    case RawMediaType.RAW_MEDIA_TYPE_AVIF:
      return "RAW_MEDIA_TYPE_AVIF";
    case RawMediaType.RAW_MEDIA_TYPE_GIF:
      return "RAW_MEDIA_TYPE_GIF";
    case RawMediaType.RAW_MEDIA_TYPE_APNG:
      return "RAW_MEDIA_TYPE_APNG";
    case RawMediaType.RAW_MEDIA_TYPE_MPEG:
      return "RAW_MEDIA_TYPE_MPEG";
    case RawMediaType.RAW_MEDIA_TYPE_MP4:
      return "RAW_MEDIA_TYPE_MP4";
    case RawMediaType.RAW_MEDIA_TYPE_WEBM:
      return "RAW_MEDIA_TYPE_WEBM";
    case RawMediaType.RAW_MEDIA_TYPE_OGG:
      return "RAW_MEDIA_TYPE_OGG";
    case RawMediaType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** GraphCanonicalizationAlgorithm is the graph canonicalization algorithm */
export enum GraphCanonicalizationAlgorithm {
  /** GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED - unspecified and invalid */
  GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED = 0,
  /** GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015 - URDNA2015 graph hashing */
  GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015 = 1,
  UNRECOGNIZED = -1,
}
export const GraphCanonicalizationAlgorithmSDKType = GraphCanonicalizationAlgorithm;
export function graphCanonicalizationAlgorithmFromJSON(object: any): GraphCanonicalizationAlgorithm {
  switch (object) {
    case 0:
    case "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED;
    case 1:
    case "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015":
      return GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphCanonicalizationAlgorithm.UNRECOGNIZED;
  }
}
export function graphCanonicalizationAlgorithmToJSON(object: GraphCanonicalizationAlgorithm): string {
  switch (object) {
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED:
      return "GRAPH_CANONICALIZATION_ALGORITHM_UNSPECIFIED";
    case GraphCanonicalizationAlgorithm.GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015:
      return "GRAPH_CANONICALIZATION_ALGORITHM_URDNA2015";
    case GraphCanonicalizationAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** GraphMerkleTree is the graph merkle tree type used for hashing, if any */
export enum GraphMerkleTree {
  /** GRAPH_MERKLE_TREE_NONE_UNSPECIFIED - no merkle tree */
  GRAPH_MERKLE_TREE_NONE_UNSPECIFIED = 0,
  UNRECOGNIZED = -1,
}
export const GraphMerkleTreeSDKType = GraphMerkleTree;
export function graphMerkleTreeFromJSON(object: any): GraphMerkleTree {
  switch (object) {
    case 0:
    case "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED":
      return GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return GraphMerkleTree.UNRECOGNIZED;
  }
}
export function graphMerkleTreeToJSON(object: GraphMerkleTree): string {
  switch (object) {
    case GraphMerkleTree.GRAPH_MERKLE_TREE_NONE_UNSPECIFIED:
      return "GRAPH_MERKLE_TREE_NONE_UNSPECIFIED";
    case GraphMerkleTree.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** ContentHash specifies a hash-based content identifier for a piece of data. */
export interface ContentHash {
  /**
   * Raw specifies "raw" data which does not specify a deterministic, canonical
   * encoding. Users of these hashes MUST maintain a copy of the hashed data
   * which is preserved bit by bit. All other content encodings specify a
   * deterministic, canonical encoding allowing implementations to choose from a
   * variety of alternative formats for transport and encoding while maintaining
   * the guarantee that the canonical hash will not change. The media type for
   * "raw" data is defined by the MediaType enum.
   */
  raw: ContentHash_Raw;
  /**
   * Graph specifies graph data that conforms to the RDF data model.
   * The canonicalization algorithm used for an RDF graph is specified by
   * GraphCanonicalizationAlgorithm.
   */
  graph: ContentHash_Graph;
}
/** ContentHash specifies a hash-based content identifier for a piece of data. */
export interface ContentHashSDKType {
  raw: ContentHash_RawSDKType;
  graph: ContentHash_GraphSDKType;
}
/** Raw is the content hash type used for raw data. */
export interface ContentHash_Raw {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm. */
  digestAlgorithm: DigestAlgorithm;
  /** media_type represents the media type for raw data. */
  mediaType: RawMediaType;
}
/** Raw is the content hash type used for raw data. */
export interface ContentHash_RawSDKType {
  hash: Uint8Array;
  digest_algorithm: DigestAlgorithm;
  media_type: RawMediaType;
}
/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_Graph {
  /**
   * hash represents the hash of the data based on the specified
   * digest_algorithm.
   */
  hash: Uint8Array;
  /** digest_algorithm represents the hash digest algorithm. */
  digestAlgorithm: DigestAlgorithm;
  /**
   * graph_canonicalization_algorithm represents the RDF graph
   * canonicalization algorithm.
   */
  canonicalizationAlgorithm: GraphCanonicalizationAlgorithm;
  /** merkle_tree is the merkle tree type used for the graph hash, if any. */
  merkleTree: GraphMerkleTree;
}
/** Graph is the content hash type used for RDF graph data. */
export interface ContentHash_GraphSDKType {
  hash: Uint8Array;
  digest_algorithm: DigestAlgorithm;
  canonicalization_algorithm: GraphCanonicalizationAlgorithm;
  merkle_tree: GraphMerkleTree;
}
/** ContentEntry describes data referenced and possibly stored on chain */
export interface ContentEntry {
  /** content_hash is the content hash of the anchored data. */
  contentHash: ContentHash;
  /** iri is the IRI of the anchored data. */
  iri: string;
  /** timestamp is the timestamp of the anchored data. */
  timestamp: Date;
}
/** ContentEntry describes data referenced and possibly stored on chain */
export interface ContentEntrySDKType {
  content_hash: ContentHashSDKType;
  iri: string;
  timestamp: Date;
}
/**
 * AttestorEntry is an attestor entry including the attestor, the IRI, and the
 * timestamp.
 */
export interface AttestorEntry {
  /** iri is the IRI of the data attested to. */
  iri: string;
  /**
   * attestor is the address of the account that has attested to the veracity of
   * the data.
   */
  attestor: string;
  /** timestamp is the timestamp at which the data was attested to. */
  timestamp: Date;
}
/**
 * AttestorEntry is an attestor entry including the attestor, the IRI, and the
 * timestamp.
 */
export interface AttestorEntrySDKType {
  iri: string;
  attestor: string;
  timestamp: Date;
}
/** ContentHashes contains list of content ContentHash. */
export interface ContentHashes {
  /** data is a list of content hashes which the resolver claims to serve. */
  contentHashes: ContentHash[];
}
/** ContentHashes contains list of content ContentHash. */
export interface ContentHashesSDKType {
  content_hashes: ContentHashSDKType[];
}
function createBaseContentHash(): ContentHash {
  return {
    raw: Raw.fromPartial({}),
    graph: Graph.fromPartial({})
  };
}
export const ContentHash = {
  typeUrl: "/regen.data.v1.ContentHash",
  encode(message: ContentHash, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.raw !== undefined) {
      ContentHash_Raw.encode(message.raw, writer.uint32(10).fork()).ldelim();
    }
    if (message.graph !== undefined) {
      ContentHash_Graph.encode(message.graph, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ContentHash {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.raw = ContentHash_Raw.decode(reader, reader.uint32());
          break;
        case 2:
          message.graph = ContentHash_Graph.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash>): ContentHash {
    const message = createBaseContentHash();
    message.raw = object.raw !== undefined && object.raw !== null ? ContentHash_Raw.fromPartial(object.raw) : undefined;
    message.graph = object.graph !== undefined && object.graph !== null ? ContentHash_Graph.fromPartial(object.graph) : undefined;
    return message;
  },
  fromAmino(object: ContentHashAmino): ContentHash {
    return {
      raw: object?.raw ? ContentHash_Raw.fromAmino(object.raw) : undefined,
      graph: object?.graph ? ContentHash_Graph.fromAmino(object.graph) : undefined
    };
  },
  toAmino(message: ContentHash): ContentHashAmino {
    const obj: any = {};
    obj.raw = message.raw ? ContentHash_Raw.toAmino(message.raw) : undefined;
    obj.graph = message.graph ? ContentHash_Graph.toAmino(message.graph) : undefined;
    return obj;
  },
  fromAminoMsg(object: ContentHashAminoMsg): ContentHash {
    return ContentHash.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHashProtoMsg): ContentHash {
    return ContentHash.decode(message.value);
  },
  toProto(message: ContentHash): Uint8Array {
    return ContentHash.encode(message).finish();
  },
  toProtoMsg(message: ContentHash): ContentHashProtoMsg {
    return {
      typeUrl: "/regen.data.v1.ContentHash",
      value: ContentHash.encode(message).finish()
    };
  }
};
function createBaseContentHash_Raw(): ContentHash_Raw {
  return {
    hash: new Uint8Array(),
    digestAlgorithm: 0,
    mediaType: 0
  };
}
export const ContentHash_Raw = {
  typeUrl: "/regen.data.v1.Raw",
  encode(message: ContentHash_Raw, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).int32(message.digestAlgorithm);
    }
    if (message.mediaType !== 0) {
      writer.uint32(24).int32(message.mediaType);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ContentHash_Raw {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Raw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.digestAlgorithm = (reader.int32() as any);
          break;
        case 3:
          message.mediaType = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash_Raw>): ContentHash_Raw {
    const message = createBaseContentHash_Raw();
    message.hash = object.hash ?? new Uint8Array();
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.mediaType = object.mediaType ?? 0;
    return message;
  },
  fromAmino(object: ContentHash_RawAmino): ContentHash_Raw {
    return {
      hash: object.hash,
      digestAlgorithm: isSet(object.digest_algorithm) ? digestAlgorithmFromJSON(object.digest_algorithm) : -1,
      mediaType: isSet(object.media_type) ? rawMediaTypeFromJSON(object.media_type) : -1
    };
  },
  toAmino(message: ContentHash_Raw): ContentHash_RawAmino {
    const obj: any = {};
    obj.hash = message.hash;
    obj.digest_algorithm = message.digestAlgorithm;
    obj.media_type = message.mediaType;
    return obj;
  },
  fromAminoMsg(object: ContentHash_RawAminoMsg): ContentHash_Raw {
    return ContentHash_Raw.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHash_RawProtoMsg): ContentHash_Raw {
    return ContentHash_Raw.decode(message.value);
  },
  toProto(message: ContentHash_Raw): Uint8Array {
    return ContentHash_Raw.encode(message).finish();
  },
  toProtoMsg(message: ContentHash_Raw): ContentHash_RawProtoMsg {
    return {
      typeUrl: "/regen.data.v1.Raw",
      value: ContentHash_Raw.encode(message).finish()
    };
  }
};
function createBaseContentHash_Graph(): ContentHash_Graph {
  return {
    hash: new Uint8Array(),
    digestAlgorithm: 0,
    canonicalizationAlgorithm: 0,
    merkleTree: 0
  };
}
export const ContentHash_Graph = {
  typeUrl: "/regen.data.v1.Graph",
  encode(message: ContentHash_Graph, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.hash.length !== 0) {
      writer.uint32(10).bytes(message.hash);
    }
    if (message.digestAlgorithm !== 0) {
      writer.uint32(16).int32(message.digestAlgorithm);
    }
    if (message.canonicalizationAlgorithm !== 0) {
      writer.uint32(24).int32(message.canonicalizationAlgorithm);
    }
    if (message.merkleTree !== 0) {
      writer.uint32(32).int32(message.merkleTree);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ContentHash_Graph {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHash_Graph();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hash = reader.bytes();
          break;
        case 2:
          message.digestAlgorithm = (reader.int32() as any);
          break;
        case 3:
          message.canonicalizationAlgorithm = (reader.int32() as any);
          break;
        case 4:
          message.merkleTree = (reader.int32() as any);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHash_Graph>): ContentHash_Graph {
    const message = createBaseContentHash_Graph();
    message.hash = object.hash ?? new Uint8Array();
    message.digestAlgorithm = object.digestAlgorithm ?? 0;
    message.canonicalizationAlgorithm = object.canonicalizationAlgorithm ?? 0;
    message.merkleTree = object.merkleTree ?? 0;
    return message;
  },
  fromAmino(object: ContentHash_GraphAmino): ContentHash_Graph {
    return {
      hash: object.hash,
      digestAlgorithm: isSet(object.digest_algorithm) ? digestAlgorithmFromJSON(object.digest_algorithm) : -1,
      canonicalizationAlgorithm: isSet(object.canonicalization_algorithm) ? graphCanonicalizationAlgorithmFromJSON(object.canonicalization_algorithm) : -1,
      merkleTree: isSet(object.merkle_tree) ? graphMerkleTreeFromJSON(object.merkle_tree) : -1
    };
  },
  toAmino(message: ContentHash_Graph): ContentHash_GraphAmino {
    const obj: any = {};
    obj.hash = message.hash;
    obj.digest_algorithm = message.digestAlgorithm;
    obj.canonicalization_algorithm = message.canonicalizationAlgorithm;
    obj.merkle_tree = message.merkleTree;
    return obj;
  },
  fromAminoMsg(object: ContentHash_GraphAminoMsg): ContentHash_Graph {
    return ContentHash_Graph.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHash_GraphProtoMsg): ContentHash_Graph {
    return ContentHash_Graph.decode(message.value);
  },
  toProto(message: ContentHash_Graph): Uint8Array {
    return ContentHash_Graph.encode(message).finish();
  },
  toProtoMsg(message: ContentHash_Graph): ContentHash_GraphProtoMsg {
    return {
      typeUrl: "/regen.data.v1.Graph",
      value: ContentHash_Graph.encode(message).finish()
    };
  }
};
function createBaseContentEntry(): ContentEntry {
  return {
    contentHash: ContentHash.fromPartial({}),
    iri: "",
    timestamp: new Date()
  };
}
export const ContentEntry = {
  typeUrl: "/regen.data.v1.ContentEntry",
  encode(message: ContentEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.contentHash !== undefined) {
      ContentHash.encode(message.contentHash, writer.uint32(10).fork()).ldelim();
    }
    if (message.iri !== "") {
      writer.uint32(18).string(message.iri);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ContentEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contentHash = ContentHash.decode(reader, reader.uint32());
          break;
        case 2:
          message.iri = reader.string();
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
  fromPartial(object: Partial<ContentEntry>): ContentEntry {
    const message = createBaseContentEntry();
    message.contentHash = object.contentHash !== undefined && object.contentHash !== null ? ContentHash.fromPartial(object.contentHash) : undefined;
    message.iri = object.iri ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: ContentEntryAmino): ContentEntry {
    return {
      contentHash: object?.content_hash ? ContentHash.fromAmino(object.content_hash) : undefined,
      iri: object.iri,
      timestamp: object.timestamp
    };
  },
  toAmino(message: ContentEntry): ContentEntryAmino {
    const obj: any = {};
    obj.content_hash = message.contentHash ? ContentHash.toAmino(message.contentHash) : undefined;
    obj.iri = message.iri;
    obj.timestamp = message.timestamp;
    return obj;
  },
  fromAminoMsg(object: ContentEntryAminoMsg): ContentEntry {
    return ContentEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentEntryProtoMsg): ContentEntry {
    return ContentEntry.decode(message.value);
  },
  toProto(message: ContentEntry): Uint8Array {
    return ContentEntry.encode(message).finish();
  },
  toProtoMsg(message: ContentEntry): ContentEntryProtoMsg {
    return {
      typeUrl: "/regen.data.v1.ContentEntry",
      value: ContentEntry.encode(message).finish()
    };
  }
};
function createBaseAttestorEntry(): AttestorEntry {
  return {
    iri: "",
    attestor: "",
    timestamp: new Date()
  };
}
export const AttestorEntry = {
  typeUrl: "/regen.data.v1.AttestorEntry",
  encode(message: AttestorEntry, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.iri !== "") {
      writer.uint32(10).string(message.iri);
    }
    if (message.attestor !== "") {
      writer.uint32(18).string(message.attestor);
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): AttestorEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAttestorEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.iri = reader.string();
          break;
        case 2:
          message.attestor = reader.string();
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
  fromPartial(object: Partial<AttestorEntry>): AttestorEntry {
    const message = createBaseAttestorEntry();
    message.iri = object.iri ?? "";
    message.attestor = object.attestor ?? "";
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
  fromAmino(object: AttestorEntryAmino): AttestorEntry {
    return {
      iri: object.iri,
      attestor: object.attestor,
      timestamp: object.timestamp
    };
  },
  toAmino(message: AttestorEntry): AttestorEntryAmino {
    const obj: any = {};
    obj.iri = message.iri;
    obj.attestor = message.attestor;
    obj.timestamp = message.timestamp;
    return obj;
  },
  fromAminoMsg(object: AttestorEntryAminoMsg): AttestorEntry {
    return AttestorEntry.fromAmino(object.value);
  },
  fromProtoMsg(message: AttestorEntryProtoMsg): AttestorEntry {
    return AttestorEntry.decode(message.value);
  },
  toProto(message: AttestorEntry): Uint8Array {
    return AttestorEntry.encode(message).finish();
  },
  toProtoMsg(message: AttestorEntry): AttestorEntryProtoMsg {
    return {
      typeUrl: "/regen.data.v1.AttestorEntry",
      value: AttestorEntry.encode(message).finish()
    };
  }
};
function createBaseContentHashes(): ContentHashes {
  return {
    contentHashes: []
  };
}
export const ContentHashes = {
  typeUrl: "/regen.data.v1.ContentHashes",
  encode(message: ContentHashes, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    for (const v of message.contentHashes) {
      ContentHash.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): ContentHashes {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContentHashes();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contentHashes.push(ContentHash.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<ContentHashes>): ContentHashes {
    const message = createBaseContentHashes();
    message.contentHashes = object.contentHashes?.map(e => ContentHash.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: ContentHashesAmino): ContentHashes {
    return {
      contentHashes: Array.isArray(object?.content_hashes) ? object.content_hashes.map((e: any) => ContentHash.fromAmino(e)) : []
    };
  },
  toAmino(message: ContentHashes): ContentHashesAmino {
    const obj: any = {};
    if (message.contentHashes) {
      obj.content_hashes = message.contentHashes.map(e => e ? ContentHash.toAmino(e) : undefined);
    } else {
      obj.content_hashes = [];
    }
    return obj;
  },
  fromAminoMsg(object: ContentHashesAminoMsg): ContentHashes {
    return ContentHashes.fromAmino(object.value);
  },
  fromProtoMsg(message: ContentHashesProtoMsg): ContentHashes {
    return ContentHashes.decode(message.value);
  },
  toProto(message: ContentHashes): Uint8Array {
    return ContentHashes.encode(message).finish();
  },
  toProtoMsg(message: ContentHashes): ContentHashesProtoMsg {
    return {
      typeUrl: "/regen.data.v1.ContentHashes",
      value: ContentHashes.encode(message).finish()
    };
  }
};