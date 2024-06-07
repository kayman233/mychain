import { Rpc } from "../../helpers";
import { BinaryReader } from "../../binary";
import { MsgUpdateParams, MsgUpdateParamsResponse, MsgRegisterAccount, MsgRegisterAccountResponse } from "./tx";
export interface Msg {
  /** Update the module's parameters. Can only be called by the authority. */
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse>;
  /** Register a new AbstractAccount. */
  registerAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.updateParams = this.updateParams.bind(this);
    this.registerAccount = this.registerAccount.bind(this);
  }
  updateParams(request: MsgUpdateParams): Promise<MsgUpdateParamsResponse> {
    const data = MsgUpdateParams.encode(request).finish();
    const promise = this.rpc.request("abstractaccount.v1.Msg", "UpdateParams", data);
    return promise.then(data => MsgUpdateParamsResponse.decode(new BinaryReader(data)));
  }
  registerAccount(request: MsgRegisterAccount): Promise<MsgRegisterAccountResponse> {
    const data = MsgRegisterAccount.encode(request).finish();
    const promise = this.rpc.request("abstractaccount.v1.Msg", "RegisterAccount", data);
    return promise.then(data => MsgRegisterAccountResponse.decode(new BinaryReader(data)));
  }
}