import * as _153 from "./wasm/v1/authz";
import * as _154 from "./wasm/v1/genesis";
import * as _155 from "./wasm/v1/ibc";
import * as _156 from "./wasm/v1/proposal";
import * as _157 from "./wasm/v1/query";
import * as _158 from "./wasm/v1/tx";
import * as _159 from "./wasm/v1/types";
import * as _440 from "./wasm/v1/tx.amino";
import * as _441 from "./wasm/v1/tx.registry";
import * as _442 from "./wasm/v1/query.lcd";
import * as _443 from "./wasm/v1/query.rpc.Query";
import * as _444 from "./wasm/v1/tx.rpc.msg";
import * as _586 from "./lcd";
import * as _587 from "./rpc.query";
import * as _588 from "./rpc.tx";
export namespace cosmwasm {
  export namespace wasm {
    export const v1 = {
      ..._153,
      ..._154,
      ..._155,
      ..._156,
      ..._157,
      ..._158,
      ..._159,
      ..._440,
      ..._441,
      ..._442,
      ..._443,
      ..._444
    };
  }
  export const ClientFactory = {
    ..._586,
    ..._587,
    ..._588
  };
}