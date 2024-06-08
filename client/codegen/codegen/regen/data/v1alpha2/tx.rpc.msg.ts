import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgAnchorData, MsgAnchorDataResponse, MsgSignData, MsgSignDataResponse, MsgStoreRawData, MsgStoreRawDataResponse } from "./tx";
/** Msg is the regen.data.v1alpha1 Msg service */
export interface Msg {
  /**
   * AnchorData "anchors" a piece of data to the blockchain based on its secure
   * hash, effectively providing a tamper resistant timestamp.
   * 
   * The sender in AnchorData is not attesting to the veracity of the underlying
   * data. They can simply be a intermediary providing timestamp services.
   * SignData should be used to create a digital signature attesting to the
   * veracity of some piece of data.
   */
  anchorData(request: MsgAnchorData): Promise<MsgAnchorDataResponse>;
  /**
   * SignData allows for signing of an arbitrary piece of data on the
   * blockchain. By "signing" data the signers are making a statement about the
   * veracity of the data itself. It is like signing a legal document, meaning
   * that I agree to all conditions and to the best of my knowledge everything
   * is true. When anchoring data, the sender is not attesting to the veracity
   * of the data, they are simply communicating that it exists.
   * 
   * On-chain signatures have the following benefits:
   * - on-chain identities can be managed using different cryptographic keys
   *   that change over time through key rotation practices
   * - an on-chain identity may represent an organization and through delegation
   *   individual members may sign on behalf of the group
   * - the blockchain transaction envelope provides built-in replay protection
   *   and timestamping
   * 
   * SignData implicitly calls AnchorData if the data was not already anchored.
   * 
   * SignData can be called multiple times for the same content hash with
   * different signers and those signers will be appended to the list of
   * signers.
   */
  signData(request: MsgSignData): Promise<MsgSignDataResponse>;
  /**
   * StoreRawData stores a piece of raw data corresponding to an ContentHash.Raw
   * on the blockchain.
   * 
   * StoreRawData implicitly calls AnchorData if the data was not already
   * anchored.
   * 
   * The sender in StoreRawData is not attesting to the veracity of the
   * underlying data. They can simply be a intermediary providing storage
   * services. SignData should be used to create a digital signature attesting
   * to the veracity of some piece of data.
   */
  storeRawData(request: MsgStoreRawData): Promise<MsgStoreRawDataResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.anchorData = this.anchorData.bind(this);
    this.signData = this.signData.bind(this);
    this.storeRawData = this.storeRawData.bind(this);
  }
  anchorData(request: MsgAnchorData): Promise<MsgAnchorDataResponse> {
    const data = MsgAnchorData.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1alpha2.Msg", "AnchorData", data);
    return promise.then(data => MsgAnchorDataResponse.decode(new BinaryReader(data)));
  }
  signData(request: MsgSignData): Promise<MsgSignDataResponse> {
    const data = MsgSignData.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1alpha2.Msg", "SignData", data);
    return promise.then(data => MsgSignDataResponse.decode(new BinaryReader(data)));
  }
  storeRawData(request: MsgStoreRawData): Promise<MsgStoreRawDataResponse> {
    const data = MsgStoreRawData.encode(request).finish();
    const promise = this.rpc.request("regen.data.v1alpha2.Msg", "StoreRawData", data);
    return promise.then(data => MsgStoreRawDataResponse.decode(new BinaryReader(data)));
  }
}