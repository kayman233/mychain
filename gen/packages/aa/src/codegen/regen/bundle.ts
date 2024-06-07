import * as _259 from "./data/v1/events";
import * as _260 from "./data/v1/query";
import * as _261 from "./data/v1/state";
import * as _262 from "./data/v1/tx";
import * as _263 from "./data/v1/types";
import * as _264 from "./data/v1alpha2/events";
import * as _265 from "./data/v1alpha2/genesis";
import * as _266 from "./data/v1alpha2/query";
import * as _267 from "./data/v1alpha2/tx";
import * as _268 from "./data/v1alpha2/types";
import * as _269 from "./ecocredit/basket/v1/events";
import * as _270 from "./ecocredit/basket/v1/query";
import * as _271 from "./ecocredit/basket/v1/state";
import * as _272 from "./ecocredit/basket/v1/tx";
import * as _273 from "./ecocredit/basket/v1/types";
import * as _274 from "./ecocredit/marketplace/v1/events";
import * as _275 from "./ecocredit/marketplace/v1/query";
import * as _276 from "./ecocredit/marketplace/v1/state";
import * as _277 from "./ecocredit/marketplace/v1/tx";
import * as _278 from "./ecocredit/marketplace/v1/types";
import * as _279 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _280 from "./ecocredit/v1/events";
import * as _281 from "./ecocredit/v1/query";
import * as _282 from "./ecocredit/v1/state";
import * as _283 from "./ecocredit/v1/tx";
import * as _284 from "./ecocredit/v1/types";
import * as _285 from "./ecocredit/v1alpha1/events";
import * as _286 from "./ecocredit/v1alpha1/genesis";
import * as _287 from "./ecocredit/v1alpha1/query";
import * as _288 from "./ecocredit/v1alpha1/tx";
import * as _289 from "./ecocredit/v1alpha1/types";
import * as _290 from "./group/v1alpha1/events";
import * as _291 from "./group/v1alpha1/genesis";
import * as _292 from "./group/v1alpha1/query";
import * as _293 from "./group/v1alpha1/tx";
import * as _294 from "./group/v1alpha1/types";
import * as _530 from "./data/v1/tx.amino";
import * as _531 from "./data/v1alpha2/tx.amino";
import * as _532 from "./ecocredit/basket/v1/tx.amino";
import * as _533 from "./ecocredit/marketplace/v1/tx.amino";
import * as _534 from "./ecocredit/v1/tx.amino";
import * as _535 from "./ecocredit/v1alpha1/tx.amino";
import * as _536 from "./group/v1alpha1/tx.amino";
import * as _537 from "./data/v1/tx.registry";
import * as _538 from "./data/v1alpha2/tx.registry";
import * as _539 from "./ecocredit/basket/v1/tx.registry";
import * as _540 from "./ecocredit/marketplace/v1/tx.registry";
import * as _541 from "./ecocredit/v1/tx.registry";
import * as _542 from "./ecocredit/v1alpha1/tx.registry";
import * as _543 from "./group/v1alpha1/tx.registry";
import * as _544 from "./data/v1/query.lcd";
import * as _545 from "./data/v1alpha2/query.lcd";
import * as _546 from "./ecocredit/basket/v1/query.lcd";
import * as _547 from "./ecocredit/marketplace/v1/query.lcd";
import * as _548 from "./ecocredit/v1/query.lcd";
import * as _549 from "./ecocredit/v1alpha1/query.lcd";
import * as _550 from "./group/v1alpha1/query.lcd";
import * as _551 from "./data/v1/query.rpc.Query";
import * as _552 from "./data/v1alpha2/query.rpc.Query";
import * as _553 from "./ecocredit/basket/v1/query.rpc.Query";
import * as _554 from "./ecocredit/marketplace/v1/query.rpc.Query";
import * as _555 from "./ecocredit/v1/query.rpc.Query";
import * as _556 from "./ecocredit/v1alpha1/query.rpc.Query";
import * as _557 from "./group/v1alpha1/query.rpc.Query";
import * as _558 from "./data/v1/tx.rpc.msg";
import * as _559 from "./data/v1alpha2/tx.rpc.msg";
import * as _560 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _561 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _562 from "./ecocredit/v1/tx.rpc.msg";
import * as _563 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _564 from "./group/v1alpha1/tx.rpc.msg";
import * as _597 from "./lcd";
import * as _598 from "./rpc.query";
import * as _599 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._259,
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._530,
      ..._537,
      ..._544,
      ..._551,
      ..._558
    };
    export const v1alpha2 = {
      ..._264,
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._531,
      ..._538,
      ..._545,
      ..._552,
      ..._559
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._269,
        ..._270,
        ..._271,
        ..._272,
        ..._273,
        ..._532,
        ..._539,
        ..._546,
        ..._553,
        ..._560
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._274,
        ..._275,
        ..._276,
        ..._277,
        ..._278,
        ..._533,
        ..._540,
        ..._547,
        ..._554,
        ..._561
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._279
      };
    }
    export const v1 = {
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._284,
      ..._534,
      ..._541,
      ..._548,
      ..._555,
      ..._562
    };
    export const v1alpha1 = {
      ..._285,
      ..._286,
      ..._287,
      ..._288,
      ..._289,
      ..._535,
      ..._542,
      ..._549,
      ..._556,
      ..._563
    };
  }
  export namespace group {
    export const v1alpha1 = {
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._294,
      ..._536,
      ..._543,
      ..._550,
      ..._557,
      ..._564
    };
  }
  export const ClientFactory = {
    ..._597,
    ..._598,
    ..._599
  };
}