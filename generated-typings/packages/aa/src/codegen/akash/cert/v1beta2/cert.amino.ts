import { AminoMsg } from "@cosmjs/amino";
import { MsgCreateCertificate, MsgRevokeCertificate } from "./cert";
export interface MsgCreateCertificateAminoType extends AminoMsg {
  type: "/akash.cert.v1beta2.MsgCreateCertificate";
  value: {
    owner: string;
    cert: Uint8Array;
    pubkey: Uint8Array;
  };
}
export interface MsgRevokeCertificateAminoType extends AminoMsg {
  type: "/akash.cert.v1beta2.MsgRevokeCertificate";
  value: {
    id: {
      owner: string;
      serial: string;
    };
  };
}
export const AminoConverter = {
  "/akash.cert.v1beta2.MsgCreateCertificate": {
    aminoType: "/akash.cert.v1beta2.MsgCreateCertificate",
    toAmino: ({
      owner,
      cert,
      pubkey
    }: MsgCreateCertificate): MsgCreateCertificateAminoType["value"] => {
      return {
        owner,
        cert,
        pubkey
      };
    },
    fromAmino: ({
      owner,
      cert,
      pubkey
    }: MsgCreateCertificateAminoType["value"]): MsgCreateCertificate => {
      return {
        owner,
        cert,
        pubkey
      };
    }
  },
  "/akash.cert.v1beta2.MsgRevokeCertificate": {
    aminoType: "/akash.cert.v1beta2.MsgRevokeCertificate",
    toAmino: ({
      id
    }: MsgRevokeCertificate): MsgRevokeCertificateAminoType["value"] => {
      return {
        id: {
          owner: id.owner,
          serial: id.serial
        }
      };
    },
    fromAmino: ({
      id
    }: MsgRevokeCertificateAminoType["value"]): MsgRevokeCertificate => {
      return {
        id: {
          owner: id.owner,
          serial: id.serial
        }
      };
    }
  }
};