import { Rpc } from "../../../../helpers";
import { BinaryReader } from "../../../../binary";
import { MsgCreate, MsgCreateResponse, MsgPut, MsgPutResponse, MsgTake, MsgTakeResponse } from "./tx";
/** Msg is the regen.ecocredit.basket.v1 Msg service. */
export interface Msg {
  /** Create creates a bank denom which wraps credits. */
  create(request: MsgCreate): Promise<MsgCreateResponse>;
  /** Put puts credits into a basket in return for basket tokens. */
  put(request: MsgPut): Promise<MsgPutResponse>;
  /**
   * Take takes credits from a basket starting from the oldest
   * credits first.
   */
  take(request: MsgTake): Promise<MsgTakeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.create = this.create.bind(this);
    this.put = this.put.bind(this);
    this.take = this.take.bind(this);
  }
  create(request: MsgCreate): Promise<MsgCreateResponse> {
    const data = MsgCreate.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.basket.v1.Msg", "Create", data);
    return promise.then(data => MsgCreateResponse.decode(new BinaryReader(data)));
  }
  put(request: MsgPut): Promise<MsgPutResponse> {
    const data = MsgPut.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.basket.v1.Msg", "Put", data);
    return promise.then(data => MsgPutResponse.decode(new BinaryReader(data)));
  }
  take(request: MsgTake): Promise<MsgTakeResponse> {
    const data = MsgTake.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.basket.v1.Msg", "Take", data);
    return promise.then(data => MsgTakeResponse.decode(new BinaryReader(data)));
  }
}