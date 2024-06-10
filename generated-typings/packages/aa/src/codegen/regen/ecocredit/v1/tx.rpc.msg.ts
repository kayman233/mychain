import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgCreateClass, MsgCreateClassResponse, MsgCreateProject, MsgCreateProjectResponse, MsgCreateBatch, MsgCreateBatchResponse, MsgMintBatchCredits, MsgMintBatchCreditsResponse, MsgSealBatch, MsgSealBatchResponse, MsgSend, MsgSendResponse, MsgRetire, MsgRetireResponse, MsgCancel, MsgCancelResponse, MsgUpdateClassAdmin, MsgUpdateClassAdminResponse, MsgUpdateClassIssuers, MsgUpdateClassIssuersResponse, MsgUpdateClassMetadata, MsgUpdateClassMetadataResponse, MsgUpdateProjectAdmin, MsgUpdateProjectAdminResponse, MsgUpdateProjectMetadata, MsgUpdateProjectMetadataResponse } from "./tx";
/** Msg is the regen.ecocredit.v1 Msg service. */
export interface Msg {
  /**
   * CreateClass creates a new credit class with an approved list of issuers and
   * optional metadata.
   */
  createClass(request: MsgCreateClass): Promise<MsgCreateClassResponse>;
  /** CreateProject creates a new project within a credit class. */
  createProject(request: MsgCreateProject): Promise<MsgCreateProjectResponse>;
  /**
   * CreateBatch creates a new batch of credits for an existing project.
   * This will create a new batch denom with a fixed supply. Issued credits can
   * be distributed to recipients in either tradable or retired form.
   */
  createBatch(request: MsgCreateBatch): Promise<MsgCreateBatchResponse>;
  /**
   * MintBatchCredits issues new token in a given batch.
   * The issuer must be the account who created (or delegated using x/authz),
   * the batch.
   * The request will fail if the batch is not open (is sealed).
   * NOTE: this method is only for bridge purpose. It must not be used
   * for issuing native credits on Regen. More specifically, we
   * enable minting more credits in an existing batch, when the batch
   * represents a vintage originally registered in another chain.
   */
  mintBatchCredits(request: MsgMintBatchCredits): Promise<MsgMintBatchCreditsResponse>;
  /**
   * MsgSealBatch sets the `batch.open` attribute to false. Sealed batch
   * can't issue more credits. Once batch is sealed it can't be toggled any
   * more. Only batch creator can seal a batch.
   */
  sealBatch(request: MsgSealBatch): Promise<MsgSealBatchResponse>;
  /**
   * Send sends tradable credits from one account to another account. Sent
   * credits can either be tradable or retired on receipt.
   */
  send(request: MsgSend): Promise<MsgSendResponse>;
  /** Retire retires a specified number of credits in the holder's account. */
  retire(request: MsgRetire): Promise<MsgRetireResponse>;
  /**
   * Cancel removes a number of credits from the holder's account and also
   * deducts them from the tradable supply, effectively cancelling their
   * issuance on Regen Ledger
   */
  cancel(request: MsgCancel): Promise<MsgCancelResponse>;
  /** UpdateClassAdmin updates the credit class admin */
  updateClassAdmin(request: MsgUpdateClassAdmin): Promise<MsgUpdateClassAdminResponse>;
  /** UpdateClassIssuers updates the credit class issuer list */
  updateClassIssuers(request: MsgUpdateClassIssuers): Promise<MsgUpdateClassIssuersResponse>;
  /** UpdateClassMetadata updates the credit class metadata */
  updateClassMetadata(request: MsgUpdateClassMetadata): Promise<MsgUpdateClassMetadataResponse>;
  /** UpdateProjectAdmin updates the project admin address */
  updateProjectAdmin(request: MsgUpdateProjectAdmin): Promise<MsgUpdateProjectAdminResponse>;
  /** UpdateProjectMetadata updates the project metadata */
  updateProjectMetadata(request: MsgUpdateProjectMetadata): Promise<MsgUpdateProjectMetadataResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.createClass = this.createClass.bind(this);
    this.createProject = this.createProject.bind(this);
    this.createBatch = this.createBatch.bind(this);
    this.mintBatchCredits = this.mintBatchCredits.bind(this);
    this.sealBatch = this.sealBatch.bind(this);
    this.send = this.send.bind(this);
    this.retire = this.retire.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updateClassAdmin = this.updateClassAdmin.bind(this);
    this.updateClassIssuers = this.updateClassIssuers.bind(this);
    this.updateClassMetadata = this.updateClassMetadata.bind(this);
    this.updateProjectAdmin = this.updateProjectAdmin.bind(this);
    this.updateProjectMetadata = this.updateProjectMetadata.bind(this);
  }
  createClass(request: MsgCreateClass): Promise<MsgCreateClassResponse> {
    const data = MsgCreateClass.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateClass", data);
    return promise.then(data => MsgCreateClassResponse.decode(new BinaryReader(data)));
  }
  createProject(request: MsgCreateProject): Promise<MsgCreateProjectResponse> {
    const data = MsgCreateProject.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateProject", data);
    return promise.then(data => MsgCreateProjectResponse.decode(new BinaryReader(data)));
  }
  createBatch(request: MsgCreateBatch): Promise<MsgCreateBatchResponse> {
    const data = MsgCreateBatch.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "CreateBatch", data);
    return promise.then(data => MsgCreateBatchResponse.decode(new BinaryReader(data)));
  }
  mintBatchCredits(request: MsgMintBatchCredits): Promise<MsgMintBatchCreditsResponse> {
    const data = MsgMintBatchCredits.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "MintBatchCredits", data);
    return promise.then(data => MsgMintBatchCreditsResponse.decode(new BinaryReader(data)));
  }
  sealBatch(request: MsgSealBatch): Promise<MsgSealBatchResponse> {
    const data = MsgSealBatch.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "SealBatch", data);
    return promise.then(data => MsgSealBatchResponse.decode(new BinaryReader(data)));
  }
  send(request: MsgSend): Promise<MsgSendResponse> {
    const data = MsgSend.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Send", data);
    return promise.then(data => MsgSendResponse.decode(new BinaryReader(data)));
  }
  retire(request: MsgRetire): Promise<MsgRetireResponse> {
    const data = MsgRetire.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Retire", data);
    return promise.then(data => MsgRetireResponse.decode(new BinaryReader(data)));
  }
  cancel(request: MsgCancel): Promise<MsgCancelResponse> {
    const data = MsgCancel.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "Cancel", data);
    return promise.then(data => MsgCancelResponse.decode(new BinaryReader(data)));
  }
  updateClassAdmin(request: MsgUpdateClassAdmin): Promise<MsgUpdateClassAdminResponse> {
    const data = MsgUpdateClassAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassAdmin", data);
    return promise.then(data => MsgUpdateClassAdminResponse.decode(new BinaryReader(data)));
  }
  updateClassIssuers(request: MsgUpdateClassIssuers): Promise<MsgUpdateClassIssuersResponse> {
    const data = MsgUpdateClassIssuers.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassIssuers", data);
    return promise.then(data => MsgUpdateClassIssuersResponse.decode(new BinaryReader(data)));
  }
  updateClassMetadata(request: MsgUpdateClassMetadata): Promise<MsgUpdateClassMetadataResponse> {
    const data = MsgUpdateClassMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateClassMetadata", data);
    return promise.then(data => MsgUpdateClassMetadataResponse.decode(new BinaryReader(data)));
  }
  updateProjectAdmin(request: MsgUpdateProjectAdmin): Promise<MsgUpdateProjectAdminResponse> {
    const data = MsgUpdateProjectAdmin.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateProjectAdmin", data);
    return promise.then(data => MsgUpdateProjectAdminResponse.decode(new BinaryReader(data)));
  }
  updateProjectMetadata(request: MsgUpdateProjectMetadata): Promise<MsgUpdateProjectMetadataResponse> {
    const data = MsgUpdateProjectMetadata.encode(request).finish();
    const promise = this.rpc.request("regen.ecocredit.v1.Msg", "UpdateProjectMetadata", data);
    return promise.then(data => MsgUpdateProjectMetadataResponse.decode(new BinaryReader(data)));
  }
}