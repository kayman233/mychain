import { PlacementRequirements, PlacementRequirementsSDKType } from "../../base/v1beta1/attribute";
import { ResourceUnits, ResourceUnitsSDKType } from "../../base/v1beta1/resource";
import { Coin, CoinSDKType } from "../../../cosmos/base/v1beta1/coin";
import { BinaryReader, BinaryWriter } from "../../../binary";
import { isSet } from "../../../helpers";
/** State is an enum which refers to state of group */
export enum Group_State {
  /** invalid - Prefix should start with 0 in enum. So declaring dummy state */
  invalid = 0,
  /** open - GroupOpen denotes state for group open */
  open = 1,
  /** paused - GroupOrdered denotes state for group ordered */
  paused = 2,
  /** insufficient_funds - GroupInsufficientFunds denotes state for group insufficient_funds */
  insufficient_funds = 3,
  /** closed - GroupClosed denotes state for group closed */
  closed = 4,
  UNRECOGNIZED = -1,
}
export const Group_StateSDKType = Group_State;
export function group_StateFromJSON(object: any): Group_State {
  switch (object) {
    case 0:
    case "invalid":
      return Group_State.invalid;
    case 1:
    case "open":
      return Group_State.open;
    case 2:
    case "paused":
      return Group_State.paused;
    case 3:
    case "insufficient_funds":
      return Group_State.insufficient_funds;
    case 4:
    case "closed":
      return Group_State.closed;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Group_State.UNRECOGNIZED;
  }
}
export function group_StateToJSON(object: Group_State): string {
  switch (object) {
    case Group_State.invalid:
      return "invalid";
    case Group_State.open:
      return "open";
    case Group_State.paused:
      return "paused";
    case Group_State.insufficient_funds:
      return "insufficient_funds";
    case Group_State.closed:
      return "closed";
    case Group_State.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}
/** MsgCloseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgCloseGroup {
  id: GroupID;
}
/** MsgCloseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgCloseGroupSDKType {
  id: GroupIDSDKType;
}
/** MsgCloseGroupResponse defines the Msg/CloseGroup response type. */
export interface MsgCloseGroupResponse {}
/** MsgCloseGroupResponse defines the Msg/CloseGroup response type. */
export interface MsgCloseGroupResponseSDKType {}
/** MsgPauseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgPauseGroup {
  id: GroupID;
}
/** MsgPauseGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgPauseGroupSDKType {
  id: GroupIDSDKType;
}
/** MsgPauseGroupResponse defines the Msg/PauseGroup response type. */
export interface MsgPauseGroupResponse {}
/** MsgPauseGroupResponse defines the Msg/PauseGroup response type. */
export interface MsgPauseGroupResponseSDKType {}
/** MsgStartGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgStartGroup {
  id: GroupID;
}
/** MsgStartGroup defines SDK message to close a single Group within a Deployment. */
export interface MsgStartGroupSDKType {
  id: GroupIDSDKType;
}
/** MsgStartGroupResponse defines the Msg/StartGroup response type. */
export interface MsgStartGroupResponse {}
/** MsgStartGroupResponse defines the Msg/StartGroup response type. */
export interface MsgStartGroupResponseSDKType {}
/** GroupID stores owner, deployment sequence number and group sequence number */
export interface GroupID {
  owner: string;
  dseq: bigint;
  gseq: number;
}
/** GroupID stores owner, deployment sequence number and group sequence number */
export interface GroupIDSDKType {
  owner: string;
  dseq: bigint;
  gseq: number;
}
/** GroupSpec stores group specifications */
export interface GroupSpec {
  name: string;
  requirements: PlacementRequirements;
  resources: Resource[];
}
/** GroupSpec stores group specifications */
export interface GroupSpecSDKType {
  name: string;
  requirements: PlacementRequirementsSDKType;
  resources: ResourceSDKType[];
}
/** Group stores group id, state and specifications of group */
export interface Group {
  groupId: GroupID;
  state: Group_State;
  groupSpec: GroupSpec;
  createdAt: bigint;
}
/** Group stores group id, state and specifications of group */
export interface GroupSDKType {
  group_id: GroupIDSDKType;
  state: Group_State;
  group_spec: GroupSpecSDKType;
  created_at: bigint;
}
/** Resource stores unit, total count and price of resource */
export interface Resource {
  resources: ResourceUnits;
  count: number;
  price: Coin;
}
/** Resource stores unit, total count and price of resource */
export interface ResourceSDKType {
  resources: ResourceUnitsSDKType;
  count: number;
  price: CoinSDKType;
}
function createBaseMsgCloseGroup(): MsgCloseGroup {
  return {
    id: GroupID.fromPartial({})
  };
}
export const MsgCloseGroup = {
  typeUrl: "/akash.deployment.v1beta1.MsgCloseGroup",
  encode(message: MsgCloseGroup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseGroup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = GroupID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgCloseGroup>): MsgCloseGroup {
    const message = createBaseMsgCloseGroup();
    message.id = object.id !== undefined && object.id !== null ? GroupID.fromPartial(object.id) : undefined;
    return message;
  },
  fromAmino(object: MsgCloseGroupAmino): MsgCloseGroup {
    return {
      id: object?.id ? GroupID.fromAmino(object.id) : undefined
    };
  },
  toAmino(message: MsgCloseGroup): MsgCloseGroupAmino {
    const obj: any = {};
    obj.id = message.id ? GroupID.toAmino(message.id) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgCloseGroupAminoMsg): MsgCloseGroup {
    return MsgCloseGroup.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseGroupProtoMsg): MsgCloseGroup {
    return MsgCloseGroup.decode(message.value);
  },
  toProto(message: MsgCloseGroup): Uint8Array {
    return MsgCloseGroup.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseGroup): MsgCloseGroupProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgCloseGroup",
      value: MsgCloseGroup.encode(message).finish()
    };
  }
};
function createBaseMsgCloseGroupResponse(): MsgCloseGroupResponse {
  return {};
}
export const MsgCloseGroupResponse = {
  typeUrl: "/akash.deployment.v1beta1.MsgCloseGroupResponse",
  encode(_: MsgCloseGroupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgCloseGroupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCloseGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgCloseGroupResponse>): MsgCloseGroupResponse {
    const message = createBaseMsgCloseGroupResponse();
    return message;
  },
  fromAmino(_: MsgCloseGroupResponseAmino): MsgCloseGroupResponse {
    return {};
  },
  toAmino(_: MsgCloseGroupResponse): MsgCloseGroupResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgCloseGroupResponseAminoMsg): MsgCloseGroupResponse {
    return MsgCloseGroupResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgCloseGroupResponseProtoMsg): MsgCloseGroupResponse {
    return MsgCloseGroupResponse.decode(message.value);
  },
  toProto(message: MsgCloseGroupResponse): Uint8Array {
    return MsgCloseGroupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgCloseGroupResponse): MsgCloseGroupResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgCloseGroupResponse",
      value: MsgCloseGroupResponse.encode(message).finish()
    };
  }
};
function createBaseMsgPauseGroup(): MsgPauseGroup {
  return {
    id: GroupID.fromPartial({})
  };
}
export const MsgPauseGroup = {
  typeUrl: "/akash.deployment.v1beta1.MsgPauseGroup",
  encode(message: MsgPauseGroup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPauseGroup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = GroupID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgPauseGroup>): MsgPauseGroup {
    const message = createBaseMsgPauseGroup();
    message.id = object.id !== undefined && object.id !== null ? GroupID.fromPartial(object.id) : undefined;
    return message;
  },
  fromAmino(object: MsgPauseGroupAmino): MsgPauseGroup {
    return {
      id: object?.id ? GroupID.fromAmino(object.id) : undefined
    };
  },
  toAmino(message: MsgPauseGroup): MsgPauseGroupAmino {
    const obj: any = {};
    obj.id = message.id ? GroupID.toAmino(message.id) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgPauseGroupAminoMsg): MsgPauseGroup {
    return MsgPauseGroup.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseGroupProtoMsg): MsgPauseGroup {
    return MsgPauseGroup.decode(message.value);
  },
  toProto(message: MsgPauseGroup): Uint8Array {
    return MsgPauseGroup.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseGroup): MsgPauseGroupProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgPauseGroup",
      value: MsgPauseGroup.encode(message).finish()
    };
  }
};
function createBaseMsgPauseGroupResponse(): MsgPauseGroupResponse {
  return {};
}
export const MsgPauseGroupResponse = {
  typeUrl: "/akash.deployment.v1beta1.MsgPauseGroupResponse",
  encode(_: MsgPauseGroupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgPauseGroupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgPauseGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgPauseGroupResponse>): MsgPauseGroupResponse {
    const message = createBaseMsgPauseGroupResponse();
    return message;
  },
  fromAmino(_: MsgPauseGroupResponseAmino): MsgPauseGroupResponse {
    return {};
  },
  toAmino(_: MsgPauseGroupResponse): MsgPauseGroupResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgPauseGroupResponseAminoMsg): MsgPauseGroupResponse {
    return MsgPauseGroupResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgPauseGroupResponseProtoMsg): MsgPauseGroupResponse {
    return MsgPauseGroupResponse.decode(message.value);
  },
  toProto(message: MsgPauseGroupResponse): Uint8Array {
    return MsgPauseGroupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgPauseGroupResponse): MsgPauseGroupResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgPauseGroupResponse",
      value: MsgPauseGroupResponse.encode(message).finish()
    };
  }
};
function createBaseMsgStartGroup(): MsgStartGroup {
  return {
    id: GroupID.fromPartial({})
  };
}
export const MsgStartGroup = {
  typeUrl: "/akash.deployment.v1beta1.MsgStartGroup",
  encode(message: MsgStartGroup, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.id !== undefined) {
      GroupID.encode(message.id, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStartGroup {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = GroupID.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<MsgStartGroup>): MsgStartGroup {
    const message = createBaseMsgStartGroup();
    message.id = object.id !== undefined && object.id !== null ? GroupID.fromPartial(object.id) : undefined;
    return message;
  },
  fromAmino(object: MsgStartGroupAmino): MsgStartGroup {
    return {
      id: object?.id ? GroupID.fromAmino(object.id) : undefined
    };
  },
  toAmino(message: MsgStartGroup): MsgStartGroupAmino {
    const obj: any = {};
    obj.id = message.id ? GroupID.toAmino(message.id) : undefined;
    return obj;
  },
  fromAminoMsg(object: MsgStartGroupAminoMsg): MsgStartGroup {
    return MsgStartGroup.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStartGroupProtoMsg): MsgStartGroup {
    return MsgStartGroup.decode(message.value);
  },
  toProto(message: MsgStartGroup): Uint8Array {
    return MsgStartGroup.encode(message).finish();
  },
  toProtoMsg(message: MsgStartGroup): MsgStartGroupProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgStartGroup",
      value: MsgStartGroup.encode(message).finish()
    };
  }
};
function createBaseMsgStartGroupResponse(): MsgStartGroupResponse {
  return {};
}
export const MsgStartGroupResponse = {
  typeUrl: "/akash.deployment.v1beta1.MsgStartGroupResponse",
  encode(_: MsgStartGroupResponse, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): MsgStartGroupResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgStartGroupResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(_: Partial<MsgStartGroupResponse>): MsgStartGroupResponse {
    const message = createBaseMsgStartGroupResponse();
    return message;
  },
  fromAmino(_: MsgStartGroupResponseAmino): MsgStartGroupResponse {
    return {};
  },
  toAmino(_: MsgStartGroupResponse): MsgStartGroupResponseAmino {
    const obj: any = {};
    return obj;
  },
  fromAminoMsg(object: MsgStartGroupResponseAminoMsg): MsgStartGroupResponse {
    return MsgStartGroupResponse.fromAmino(object.value);
  },
  fromProtoMsg(message: MsgStartGroupResponseProtoMsg): MsgStartGroupResponse {
    return MsgStartGroupResponse.decode(message.value);
  },
  toProto(message: MsgStartGroupResponse): Uint8Array {
    return MsgStartGroupResponse.encode(message).finish();
  },
  toProtoMsg(message: MsgStartGroupResponse): MsgStartGroupResponseProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.MsgStartGroupResponse",
      value: MsgStartGroupResponse.encode(message).finish()
    };
  }
};
function createBaseGroupID(): GroupID {
  return {
    owner: "",
    dseq: BigInt(0),
    gseq: 0
  };
}
export const GroupID = {
  typeUrl: "/akash.deployment.v1beta1.GroupID",
  encode(message: GroupID, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.dseq !== BigInt(0)) {
      writer.uint32(16).uint64(message.dseq);
    }
    if (message.gseq !== 0) {
      writer.uint32(24).uint32(message.gseq);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GroupID {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupID();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.owner = reader.string();
          break;
        case 2:
          message.dseq = reader.uint64();
          break;
        case 3:
          message.gseq = reader.uint32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GroupID>): GroupID {
    const message = createBaseGroupID();
    message.owner = object.owner ?? "";
    message.dseq = object.dseq !== undefined && object.dseq !== null ? BigInt(object.dseq.toString()) : BigInt(0);
    message.gseq = object.gseq ?? 0;
    return message;
  },
  fromAmino(object: GroupIDAmino): GroupID {
    return {
      owner: object.owner,
      dseq: BigInt(object.dseq),
      gseq: object.gseq
    };
  },
  toAmino(message: GroupID): GroupIDAmino {
    const obj: any = {};
    obj.owner = message.owner;
    obj.dseq = message.dseq ? message.dseq.toString() : undefined;
    obj.gseq = message.gseq;
    return obj;
  },
  fromAminoMsg(object: GroupIDAminoMsg): GroupID {
    return GroupID.fromAmino(object.value);
  },
  fromProtoMsg(message: GroupIDProtoMsg): GroupID {
    return GroupID.decode(message.value);
  },
  toProto(message: GroupID): Uint8Array {
    return GroupID.encode(message).finish();
  },
  toProtoMsg(message: GroupID): GroupIDProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.GroupID",
      value: GroupID.encode(message).finish()
    };
  }
};
function createBaseGroupSpec(): GroupSpec {
  return {
    name: "",
    requirements: PlacementRequirements.fromPartial({}),
    resources: []
  };
}
export const GroupSpec = {
  typeUrl: "/akash.deployment.v1beta1.GroupSpec",
  encode(message: GroupSpec, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.requirements !== undefined) {
      PlacementRequirements.encode(message.requirements, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.resources) {
      Resource.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): GroupSpec {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroupSpec();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.requirements = PlacementRequirements.decode(reader, reader.uint32());
          break;
        case 3:
          message.resources.push(Resource.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<GroupSpec>): GroupSpec {
    const message = createBaseGroupSpec();
    message.name = object.name ?? "";
    message.requirements = object.requirements !== undefined && object.requirements !== null ? PlacementRequirements.fromPartial(object.requirements) : undefined;
    message.resources = object.resources?.map(e => Resource.fromPartial(e)) || [];
    return message;
  },
  fromAmino(object: GroupSpecAmino): GroupSpec {
    return {
      name: object.name,
      requirements: object?.requirements ? PlacementRequirements.fromAmino(object.requirements) : undefined,
      resources: Array.isArray(object?.resources) ? object.resources.map((e: any) => Resource.fromAmino(e)) : []
    };
  },
  toAmino(message: GroupSpec): GroupSpecAmino {
    const obj: any = {};
    obj.name = message.name;
    obj.requirements = message.requirements ? PlacementRequirements.toAmino(message.requirements) : undefined;
    if (message.resources) {
      obj.resources = message.resources.map(e => e ? Resource.toAmino(e) : undefined);
    } else {
      obj.resources = [];
    }
    return obj;
  },
  fromAminoMsg(object: GroupSpecAminoMsg): GroupSpec {
    return GroupSpec.fromAmino(object.value);
  },
  fromProtoMsg(message: GroupSpecProtoMsg): GroupSpec {
    return GroupSpec.decode(message.value);
  },
  toProto(message: GroupSpec): Uint8Array {
    return GroupSpec.encode(message).finish();
  },
  toProtoMsg(message: GroupSpec): GroupSpecProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.GroupSpec",
      value: GroupSpec.encode(message).finish()
    };
  }
};
function createBaseGroup(): Group {
  return {
    groupId: GroupID.fromPartial({}),
    state: 0,
    groupSpec: GroupSpec.fromPartial({}),
    createdAt: BigInt(0)
  };
}
export const Group = {
  typeUrl: "/akash.deployment.v1beta1.Group",
  encode(message: Group, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.groupId !== undefined) {
      GroupID.encode(message.groupId, writer.uint32(10).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(16).int32(message.state);
    }
    if (message.groupSpec !== undefined) {
      GroupSpec.encode(message.groupSpec, writer.uint32(26).fork()).ldelim();
    }
    if (message.createdAt !== BigInt(0)) {
      writer.uint32(32).int64(message.createdAt);
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Group {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGroup();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.groupId = GroupID.decode(reader, reader.uint32());
          break;
        case 2:
          message.state = (reader.int32() as any);
          break;
        case 3:
          message.groupSpec = GroupSpec.decode(reader, reader.uint32());
          break;
        case 4:
          message.createdAt = reader.int64();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Group>): Group {
    const message = createBaseGroup();
    message.groupId = object.groupId !== undefined && object.groupId !== null ? GroupID.fromPartial(object.groupId) : undefined;
    message.state = object.state ?? 0;
    message.groupSpec = object.groupSpec !== undefined && object.groupSpec !== null ? GroupSpec.fromPartial(object.groupSpec) : undefined;
    message.createdAt = object.createdAt !== undefined && object.createdAt !== null ? BigInt(object.createdAt.toString()) : BigInt(0);
    return message;
  },
  fromAmino(object: GroupAmino): Group {
    return {
      groupId: object?.group_id ? GroupID.fromAmino(object.group_id) : undefined,
      state: isSet(object.state) ? group_StateFromJSON(object.state) : -1,
      groupSpec: object?.group_spec ? GroupSpec.fromAmino(object.group_spec) : undefined,
      createdAt: BigInt(object.created_at)
    };
  },
  toAmino(message: Group): GroupAmino {
    const obj: any = {};
    obj.group_id = message.groupId ? GroupID.toAmino(message.groupId) : undefined;
    obj.state = message.state;
    obj.group_spec = message.groupSpec ? GroupSpec.toAmino(message.groupSpec) : undefined;
    obj.created_at = message.createdAt ? message.createdAt.toString() : undefined;
    return obj;
  },
  fromAminoMsg(object: GroupAminoMsg): Group {
    return Group.fromAmino(object.value);
  },
  fromProtoMsg(message: GroupProtoMsg): Group {
    return Group.decode(message.value);
  },
  toProto(message: Group): Uint8Array {
    return Group.encode(message).finish();
  },
  toProtoMsg(message: Group): GroupProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.Group",
      value: Group.encode(message).finish()
    };
  }
};
function createBaseResource(): Resource {
  return {
    resources: ResourceUnits.fromPartial({}),
    count: 0,
    price: Coin.fromPartial({})
  };
}
export const Resource = {
  typeUrl: "/akash.deployment.v1beta1.Resource",
  encode(message: Resource, writer: BinaryWriter = BinaryWriter.create()): BinaryWriter {
    if (message.resources !== undefined) {
      ResourceUnits.encode(message.resources, writer.uint32(10).fork()).ldelim();
    }
    if (message.count !== 0) {
      writer.uint32(16).uint32(message.count);
    }
    if (message.price !== undefined) {
      Coin.encode(message.price, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: BinaryReader | Uint8Array, length?: number): Resource {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResource();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.resources = ResourceUnits.decode(reader, reader.uint32());
          break;
        case 2:
          message.count = reader.uint32();
          break;
        case 3:
          message.price = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromPartial(object: Partial<Resource>): Resource {
    const message = createBaseResource();
    message.resources = object.resources !== undefined && object.resources !== null ? ResourceUnits.fromPartial(object.resources) : undefined;
    message.count = object.count ?? 0;
    message.price = object.price !== undefined && object.price !== null ? Coin.fromPartial(object.price) : undefined;
    return message;
  },
  fromAmino(object: ResourceAmino): Resource {
    return {
      resources: object?.resources ? ResourceUnits.fromAmino(object.resources) : undefined,
      count: object.count,
      price: object?.price ? Coin.fromAmino(object.price) : undefined
    };
  },
  toAmino(message: Resource): ResourceAmino {
    const obj: any = {};
    obj.resources = message.resources ? ResourceUnits.toAmino(message.resources) : undefined;
    obj.count = message.count;
    obj.price = message.price ? Coin.toAmino(message.price) : undefined;
    return obj;
  },
  fromAminoMsg(object: ResourceAminoMsg): Resource {
    return Resource.fromAmino(object.value);
  },
  fromProtoMsg(message: ResourceProtoMsg): Resource {
    return Resource.decode(message.value);
  },
  toProto(message: Resource): Uint8Array {
    return Resource.encode(message).finish();
  },
  toProtoMsg(message: Resource): ResourceProtoMsg {
    return {
      typeUrl: "/akash.deployment.v1beta1.Resource",
      value: Resource.encode(message).finish()
    };
  }
};