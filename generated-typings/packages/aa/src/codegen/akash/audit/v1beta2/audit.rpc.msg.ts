import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgSignProviderAttributes, MsgSignProviderAttributesResponse, MsgDeleteProviderAttributes, MsgDeleteProviderAttributesResponse } from "./audit";
/** Msg defines the provider Msg service */
export interface Msg {
  /** SignProviderAttributes defines a method that signs provider attributes */
  signProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse>;
  /** DeleteProviderAttributes defines a method that deletes provider attributes */
  deleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.signProviderAttributes = this.signProviderAttributes.bind(this);
    this.deleteProviderAttributes = this.deleteProviderAttributes.bind(this);
  }
  signProviderAttributes(request: MsgSignProviderAttributes): Promise<MsgSignProviderAttributesResponse> {
    const data = MsgSignProviderAttributes.encode(request).finish();
    const promise = this.rpc.request("akash.audit.v1beta2.Msg", "SignProviderAttributes", data);
    return promise.then(data => MsgSignProviderAttributesResponse.decode(new BinaryReader(data)));
  }
  deleteProviderAttributes(request: MsgDeleteProviderAttributes): Promise<MsgDeleteProviderAttributesResponse> {
    const data = MsgDeleteProviderAttributes.encode(request).finish();
    const promise = this.rpc.request("akash.audit.v1beta2.Msg", "DeleteProviderAttributes", data);
    return promise.then(data => MsgDeleteProviderAttributesResponse.decode(new BinaryReader(data)));
  }
}