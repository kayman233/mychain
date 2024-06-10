import * as _304 from "./mint/v1beta1/genesis";
import * as _305 from "./mint/v1beta1/mint";
import * as _306 from "./mint/v1beta1/query";
import * as _575 from "./mint/v1beta1/query.lcd";
import * as _576 from "./mint/v1beta1/query.rpc.Query";
import * as _603 from "./lcd";
import * as _604 from "./rpc.query";
export namespace stargaze {
  export namespace mint {
    export const v1beta1 = {
      ..._304,
      ..._305,
      ..._306,
      ..._575,
      ..._576
    };
  }
  export const ClientFactory = {
    ..._603,
    ..._604
  };
}