import { MsgCreateBid, MsgCreateBidResponse, MsgCloseBid, MsgCloseBidResponse } from "./bid";
import { MsgWithdrawLease, MsgWithdrawLeaseResponse, MsgCreateLease, MsgCreateLeaseResponse, MsgCloseLease, MsgCloseLeaseResponse } from "./lease";
import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
/** Msg defines the market Msg service */
export interface Msg {
  /** CreateBid defines a method to create a bid given proper inputs. */
  createBid(request: MsgCreateBid): Promise<MsgCreateBidResponse>;
  /** CloseBid defines a method to close a bid given proper inputs. */
  closeBid(request: MsgCloseBid): Promise<MsgCloseBidResponse>;
  /** WithdrawLease withdraws accrued funds from the lease payment */
  withdrawLease(request: MsgWithdrawLease): Promise<MsgWithdrawLeaseResponse>;
  /** CreateLease creates a new lease */
  createLease(request: MsgCreateLease): Promise<MsgCreateLeaseResponse>;
  /** CloseLease defines a method to close an order given proper inputs. */
  closeLease(request: MsgCloseLease): Promise<MsgCloseLeaseResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createBid = this.createBid.bind(this);
    this.closeBid = this.closeBid.bind(this);
    this.withdrawLease = this.withdrawLease.bind(this);
    this.createLease = this.createLease.bind(this);
    this.closeLease = this.closeLease.bind(this);
  }
  createBid(request: MsgCreateBid): Promise<MsgCreateBidResponse> {
    const data = MsgCreateBid.encode(request).finish();
    const promise = this.rpc.request("akash.market.v1beta2.Msg", "CreateBid", data);
    return promise.then(data => MsgCreateBidResponse.decode(new BinaryReader(data)));
  }
  closeBid(request: MsgCloseBid): Promise<MsgCloseBidResponse> {
    const data = MsgCloseBid.encode(request).finish();
    const promise = this.rpc.request("akash.market.v1beta2.Msg", "CloseBid", data);
    return promise.then(data => MsgCloseBidResponse.decode(new BinaryReader(data)));
  }
  withdrawLease(request: MsgWithdrawLease): Promise<MsgWithdrawLeaseResponse> {
    const data = MsgWithdrawLease.encode(request).finish();
    const promise = this.rpc.request("akash.market.v1beta2.Msg", "WithdrawLease", data);
    return promise.then(data => MsgWithdrawLeaseResponse.decode(new BinaryReader(data)));
  }
  createLease(request: MsgCreateLease): Promise<MsgCreateLeaseResponse> {
    const data = MsgCreateLease.encode(request).finish();
    const promise = this.rpc.request("akash.market.v1beta2.Msg", "CreateLease", data);
    return promise.then(data => MsgCreateLeaseResponse.decode(new BinaryReader(data)));
  }
  closeLease(request: MsgCloseLease): Promise<MsgCloseLeaseResponse> {
    const data = MsgCloseLease.encode(request).finish();
    const promise = this.rpc.request("akash.market.v1beta2.Msg", "CloseLease", data);
    return promise.then(data => MsgCloseLeaseResponse.decode(new BinaryReader(data)));
  }
}