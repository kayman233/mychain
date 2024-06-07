import * as _195 from "./downtime-detector/v1beta1/downtime_duration";
import * as _196 from "./downtime-detector/v1beta1/genesis";
import * as _197 from "./downtime-detector/v1beta1/query";
import * as _198 from "./epochs/genesis";
import * as _199 from "./epochs/query";
import * as _200 from "./gamm/pool-models/balancer/balancerPool";
import * as _201 from "./gamm/v1beta1/genesis";
import * as _202 from "./gamm/v1beta1/query";
import * as _203 from "./gamm/v1beta1/tx";
import * as _204 from "./gamm/pool-models/balancer/tx/tx";
import * as _205 from "./gamm/pool-models/stableswap/stableswap_pool";
import * as _206 from "./gamm/pool-models/stableswap/tx";
import * as _207 from "./gamm/v2/query";
import * as _208 from "./ibc-rate-limit/v1beta1/params";
import * as _209 from "./ibc-rate-limit/v1beta1/query";
import * as _210 from "./incentives/gauge";
import * as _211 from "./incentives/genesis";
import * as _212 from "./incentives/params";
import * as _213 from "./incentives/query";
import * as _214 from "./incentives/tx";
import * as _215 from "./lockup/genesis";
import * as _216 from "./lockup/lock";
import * as _217 from "./lockup/params";
import * as _218 from "./lockup/query";
import * as _219 from "./lockup/tx";
import * as _220 from "./mint/v1beta1/genesis";
import * as _221 from "./mint/v1beta1/mint";
import * as _222 from "./mint/v1beta1/query";
import * as _223 from "./pool-incentives/v1beta1/genesis";
import * as _224 from "./pool-incentives/v1beta1/gov";
import * as _225 from "./pool-incentives/v1beta1/incentives";
import * as _226 from "./pool-incentives/v1beta1/query";
import * as _227 from "./protorev/v1beta1/genesis";
import * as _228 from "./protorev/v1beta1/gov";
import * as _229 from "./protorev/v1beta1/params";
import * as _230 from "./protorev/v1beta1/protorev";
import * as _231 from "./protorev/v1beta1/query";
import * as _232 from "./protorev/v1beta1/tx";
import * as _233 from "./sumtree/v1beta1/tree";
import * as _234 from "./superfluid/genesis";
import * as _235 from "./superfluid/params";
import * as _236 from "./superfluid/query";
import * as _237 from "./superfluid/superfluid";
import * as _238 from "./superfluid/tx";
import * as _239 from "./swaprouter/v1beta1/genesis";
import * as _240 from "./swaprouter/v1beta1/module_route";
import * as _241 from "./swaprouter/v1beta1/query";
import * as _242 from "./swaprouter/v1beta1/swap_route";
import * as _243 from "./swaprouter/v1beta1/tx";
import * as _244 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _245 from "./tokenfactory/v1beta1/genesis";
import * as _246 from "./tokenfactory/v1beta1/params";
import * as _247 from "./tokenfactory/v1beta1/query";
import * as _248 from "./tokenfactory/v1beta1/tx";
import * as _249 from "./twap/v1beta1/genesis";
import * as _250 from "./twap/v1beta1/query";
import * as _251 from "./twap/v1beta1/twap_record";
import * as _252 from "./txfees/v1beta1/feetoken";
import * as _253 from "./txfees/v1beta1/genesis";
import * as _254 from "./txfees/v1beta1/gov";
import * as _255 from "./txfees/v1beta1/query";
import * as _256 from "./valset-pref/v1beta1/query";
import * as _257 from "./valset-pref/v1beta1/state";
import * as _258 from "./valset-pref/v1beta1/tx";
import * as _468 from "./gamm/pool-models/balancer/tx/tx.amino";
import * as _469 from "./gamm/pool-models/stableswap/tx.amino";
import * as _470 from "./gamm/v1beta1/tx.amino";
import * as _471 from "./incentives/tx.amino";
import * as _472 from "./lockup/tx.amino";
import * as _473 from "./protorev/v1beta1/tx.amino";
import * as _474 from "./superfluid/tx.amino";
import * as _475 from "./swaprouter/v1beta1/tx.amino";
import * as _476 from "./tokenfactory/v1beta1/tx.amino";
import * as _477 from "./valset-pref/v1beta1/tx.amino";
import * as _478 from "./gamm/pool-models/balancer/tx/tx.registry";
import * as _479 from "./gamm/pool-models/stableswap/tx.registry";
import * as _480 from "./gamm/v1beta1/tx.registry";
import * as _481 from "./incentives/tx.registry";
import * as _482 from "./lockup/tx.registry";
import * as _483 from "./protorev/v1beta1/tx.registry";
import * as _484 from "./superfluid/tx.registry";
import * as _485 from "./swaprouter/v1beta1/tx.registry";
import * as _486 from "./tokenfactory/v1beta1/tx.registry";
import * as _487 from "./valset-pref/v1beta1/tx.registry";
import * as _488 from "./downtime-detector/v1beta1/query.lcd";
import * as _489 from "./epochs/query.lcd";
import * as _490 from "./gamm/v1beta1/query.lcd";
import * as _491 from "./gamm/v2/query.lcd";
import * as _492 from "./ibc-rate-limit/v1beta1/query.lcd";
import * as _493 from "./incentives/query.lcd";
import * as _494 from "./lockup/query.lcd";
import * as _495 from "./mint/v1beta1/query.lcd";
import * as _496 from "./pool-incentives/v1beta1/query.lcd";
import * as _497 from "./protorev/v1beta1/query.lcd";
import * as _498 from "./superfluid/query.lcd";
import * as _499 from "./swaprouter/v1beta1/query.lcd";
import * as _500 from "./tokenfactory/v1beta1/query.lcd";
import * as _501 from "./twap/v1beta1/query.lcd";
import * as _502 from "./txfees/v1beta1/query.lcd";
import * as _503 from "./valset-pref/v1beta1/query.lcd";
import * as _504 from "./downtime-detector/v1beta1/query.rpc.Query";
import * as _505 from "./epochs/query.rpc.Query";
import * as _506 from "./gamm/v1beta1/query.rpc.Query";
import * as _507 from "./gamm/v2/query.rpc.Query";
import * as _508 from "./ibc-rate-limit/v1beta1/query.rpc.Query";
import * as _509 from "./incentives/query.rpc.Query";
import * as _510 from "./lockup/query.rpc.Query";
import * as _511 from "./mint/v1beta1/query.rpc.Query";
import * as _512 from "./pool-incentives/v1beta1/query.rpc.Query";
import * as _513 from "./protorev/v1beta1/query.rpc.Query";
import * as _514 from "./superfluid/query.rpc.Query";
import * as _515 from "./swaprouter/v1beta1/query.rpc.Query";
import * as _516 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _517 from "./twap/v1beta1/query.rpc.Query";
import * as _518 from "./txfees/v1beta1/query.rpc.Query";
import * as _519 from "./valset-pref/v1beta1/query.rpc.Query";
import * as _520 from "./gamm/pool-models/balancer/tx/tx.rpc.msg";
import * as _521 from "./gamm/pool-models/stableswap/tx.rpc.msg";
import * as _522 from "./gamm/v1beta1/tx.rpc.msg";
import * as _523 from "./incentives/tx.rpc.msg";
import * as _524 from "./lockup/tx.rpc.msg";
import * as _525 from "./protorev/v1beta1/tx.rpc.msg";
import * as _526 from "./superfluid/tx.rpc.msg";
import * as _527 from "./swaprouter/v1beta1/tx.rpc.msg";
import * as _528 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _529 from "./valset-pref/v1beta1/tx.rpc.msg";
import * as _594 from "./lcd";
import * as _595 from "./rpc.query";
import * as _596 from "./rpc.tx";
export namespace osmosis {
  export namespace downtimedetector {
    export const v1beta1 = {
      ..._195,
      ..._196,
      ..._197,
      ..._488,
      ..._504
    };
  }
  export namespace epochs {
    export const v1beta1 = {
      ..._198,
      ..._199,
      ..._489,
      ..._505
    };
  }
  export namespace gamm {
    export const v1beta1 = {
      ..._200,
      ..._201,
      ..._202,
      ..._203,
      ..._470,
      ..._480,
      ..._490,
      ..._506,
      ..._522
    };
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._204,
          ..._468,
          ..._478,
          ..._520
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._205,
          ..._206,
          ..._469,
          ..._479,
          ..._521
        };
      }
    }
    export const v2 = {
      ..._207,
      ..._491,
      ..._507
    };
  }
  export namespace ibcratelimit {
    export const v1beta1 = {
      ..._208,
      ..._209,
      ..._492,
      ..._508
    };
  }
  export const incentives = {
    ..._210,
    ..._211,
    ..._212,
    ..._213,
    ..._214,
    ..._471,
    ..._481,
    ..._493,
    ..._509,
    ..._523
  };
  export const lockup = {
    ..._215,
    ..._216,
    ..._217,
    ..._218,
    ..._219,
    ..._472,
    ..._482,
    ..._494,
    ..._510,
    ..._524
  };
  export namespace mint {
    export const v1beta1 = {
      ..._220,
      ..._221,
      ..._222,
      ..._495,
      ..._511
    };
  }
  export namespace poolincentives {
    export const v1beta1 = {
      ..._223,
      ..._224,
      ..._225,
      ..._226,
      ..._496,
      ..._512
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._231,
      ..._232,
      ..._473,
      ..._483,
      ..._497,
      ..._513,
      ..._525
    };
  }
  export namespace store {
    export const v1beta1 = {
      ..._233
    };
  }
  export const superfluid = {
    ..._234,
    ..._235,
    ..._236,
    ..._237,
    ..._238,
    ..._474,
    ..._484,
    ..._498,
    ..._514,
    ..._526
  };
  export namespace swaprouter {
    export const v1beta1 = {
      ..._239,
      ..._240,
      ..._241,
      ..._242,
      ..._243,
      ..._475,
      ..._485,
      ..._499,
      ..._515,
      ..._527
    };
  }
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._248,
      ..._476,
      ..._486,
      ..._500,
      ..._516,
      ..._528
    };
  }
  export namespace twap {
    export const v1beta1 = {
      ..._249,
      ..._250,
      ..._251,
      ..._501,
      ..._517
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._252,
      ..._253,
      ..._254,
      ..._255,
      ..._502,
      ..._518
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._256,
      ..._257,
      ..._258,
      ..._477,
      ..._487,
      ..._503,
      ..._519,
      ..._529
    };
  }
  export const ClientFactory = {
    ..._594,
    ..._595,
    ..._596
  };
}