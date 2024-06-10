import { MsgCloseGroup, MsgCloseGroupResponse, MsgPauseGroup, MsgPauseGroupResponse, MsgStartGroup, MsgStartGroupResponse } from "./group";
import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateDeployment, MsgCreateDeploymentResponse, MsgDepositDeployment, MsgDepositDeploymentResponse, MsgUpdateDeployment, MsgUpdateDeploymentResponse, MsgCloseDeployment, MsgCloseDeploymentResponse } from "./deployment";
/** Msg defines the deployment Msg service. */
export interface Msg {
  /** CreateDeployment defines a method to create new deployment given proper inputs. */
  createDeployment(request: MsgCreateDeployment): Promise<MsgCreateDeploymentResponse>;
  /** DepositDeployment deposits more funds into the deployment account */
  depositDeployment(request: MsgDepositDeployment): Promise<MsgDepositDeploymentResponse>;
  /** UpdateDeployment defines a method to update a deployment given proper inputs. */
  updateDeployment(request: MsgUpdateDeployment): Promise<MsgUpdateDeploymentResponse>;
  /** CloseDeployment defines a method to close a deployment given proper inputs. */
  closeDeployment(request: MsgCloseDeployment): Promise<MsgCloseDeploymentResponse>;
  /** CloseGroup defines a method to close a group of a deployment given proper inputs. */
  closeGroup(request: MsgCloseGroup): Promise<MsgCloseGroupResponse>;
  /** PauseGroup defines a method to close a group of a deployment given proper inputs. */
  pauseGroup(request: MsgPauseGroup): Promise<MsgPauseGroupResponse>;
  /** StartGroup defines a method to close a group of a deployment given proper inputs. */
  startGroup(request: MsgStartGroup): Promise<MsgStartGroupResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createDeployment = this.createDeployment.bind(this);
    this.depositDeployment = this.depositDeployment.bind(this);
    this.updateDeployment = this.updateDeployment.bind(this);
    this.closeDeployment = this.closeDeployment.bind(this);
    this.closeGroup = this.closeGroup.bind(this);
    this.pauseGroup = this.pauseGroup.bind(this);
    this.startGroup = this.startGroup.bind(this);
  }
  createDeployment(request: MsgCreateDeployment): Promise<MsgCreateDeploymentResponse> {
    const data = MsgCreateDeployment.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CreateDeployment", data);
    return promise.then(data => MsgCreateDeploymentResponse.decode(new BinaryReader(data)));
  }
  depositDeployment(request: MsgDepositDeployment): Promise<MsgDepositDeploymentResponse> {
    const data = MsgDepositDeployment.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "DepositDeployment", data);
    return promise.then(data => MsgDepositDeploymentResponse.decode(new BinaryReader(data)));
  }
  updateDeployment(request: MsgUpdateDeployment): Promise<MsgUpdateDeploymentResponse> {
    const data = MsgUpdateDeployment.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "UpdateDeployment", data);
    return promise.then(data => MsgUpdateDeploymentResponse.decode(new BinaryReader(data)));
  }
  closeDeployment(request: MsgCloseDeployment): Promise<MsgCloseDeploymentResponse> {
    const data = MsgCloseDeployment.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CloseDeployment", data);
    return promise.then(data => MsgCloseDeploymentResponse.decode(new BinaryReader(data)));
  }
  closeGroup(request: MsgCloseGroup): Promise<MsgCloseGroupResponse> {
    const data = MsgCloseGroup.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "CloseGroup", data);
    return promise.then(data => MsgCloseGroupResponse.decode(new BinaryReader(data)));
  }
  pauseGroup(request: MsgPauseGroup): Promise<MsgPauseGroupResponse> {
    const data = MsgPauseGroup.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "PauseGroup", data);
    return promise.then(data => MsgPauseGroupResponse.decode(new BinaryReader(data)));
  }
  startGroup(request: MsgStartGroup): Promise<MsgStartGroupResponse> {
    const data = MsgStartGroup.encode(request).finish();
    const promise = this.rpc.request("akash.deployment.v1beta1.Msg", "StartGroup", data);
    return promise.then(data => MsgStartGroupResponse.decode(new BinaryReader(data)));
  }
}