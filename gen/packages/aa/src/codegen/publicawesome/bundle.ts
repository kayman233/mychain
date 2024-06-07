import * as _295 from "../stargaze/alloc/v1beta1/genesis";
import * as _296 from "../stargaze/alloc/v1beta1/params";
import * as _297 from "../stargaze/alloc/v1beta1/query";
import * as _298 from "../stargaze/alloc/v1beta1/tx";
import * as _299 from "../stargaze/claim/v1beta1/claim_record";
import * as _300 from "../stargaze/claim/v1beta1/genesis";
import * as _301 from "../stargaze/claim/v1beta1/params";
import * as _302 from "../stargaze/claim/v1beta1/query";
import * as _303 from "../stargaze/claim/v1beta1/tx";
import * as _565 from "../stargaze/alloc/v1beta1/tx.amino";
import * as _566 from "../stargaze/claim/v1beta1/tx.amino";
import * as _567 from "../stargaze/alloc/v1beta1/tx.registry";
import * as _568 from "../stargaze/claim/v1beta1/tx.registry";
import * as _569 from "../stargaze/alloc/v1beta1/query.lcd";
import * as _570 from "../stargaze/claim/v1beta1/query.lcd";
import * as _571 from "../stargaze/alloc/v1beta1/query.rpc.Query";
import * as _572 from "../stargaze/claim/v1beta1/query.rpc.Query";
import * as _573 from "../stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _574 from "../stargaze/claim/v1beta1/tx.rpc.msg";
import * as _600 from "./lcd";
import * as _601 from "./rpc.query";
import * as _602 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._295,
        ..._296,
        ..._297,
        ..._298,
        ..._565,
        ..._567,
        ..._569,
        ..._571,
        ..._573
      };
    }
    export namespace claim {
      export const v1beta1 = {
        ..._299,
        ..._300,
        ..._301,
        ..._302,
        ..._303,
        ..._566,
        ..._568,
        ..._570,
        ..._572,
        ..._574
      };
    }
  }
  export const ClientFactory = {
    ..._600,
    ..._601,
    ..._602
  };
}