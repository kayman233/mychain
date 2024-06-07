import * as _5 from "./audit/v1beta1/audit";
import * as _6 from "./audit/v1beta2/audit";
import * as _7 from "./audit/v1beta2/genesis";
import * as _8 from "./audit/v1beta2/query";
import * as _9 from "./base/v1beta1/attribute";
import * as _10 from "./base/v1beta1/endpoint";
import * as _11 from "./base/v1beta1/resource";
import * as _12 from "./base/v1beta1/resourcevalue";
import * as _13 from "./base/v1beta2/attribute";
import * as _14 from "./base/v1beta2/endpoint";
import * as _15 from "./base/v1beta2/resource";
import * as _16 from "./base/v1beta2/resourceunits";
import * as _17 from "./base/v1beta2/resourcevalue";
import * as _18 from "./cert/v1beta2/cert";
import * as _19 from "./cert/v1beta2/genesis";
import * as _20 from "./cert/v1beta2/query";
import * as _21 from "./deployment/v1beta1/authz";
import * as _22 from "./deployment/v1beta1/deployment";
import * as _23 from "./deployment/v1beta1/genesis";
import * as _24 from "./deployment/v1beta1/group";
import * as _25 from "./deployment/v1beta1/params";
import * as _26 from "./deployment/v1beta1/query";
import * as _27 from "./deployment/v1beta2/authz";
import * as _28 from "./deployment/v1beta2/deployment";
import * as _29 from "./deployment/v1beta2/deploymentmsg";
import * as _30 from "./deployment/v1beta2/genesis";
import * as _31 from "./deployment/v1beta2/group";
import * as _32 from "./deployment/v1beta2/groupid";
import * as _33 from "./deployment/v1beta2/groupmsg";
import * as _34 from "./deployment/v1beta2/groupspec";
import * as _35 from "./deployment/v1beta2/params";
import * as _36 from "./deployment/v1beta2/query";
import * as _37 from "./deployment/v1beta2/resource";
import * as _38 from "./deployment/v1beta2/service";
import * as _39 from "./escrow/v1beta1/genesis";
import * as _40 from "./escrow/v1beta1/query";
import * as _41 from "./escrow/v1beta1/types";
import * as _42 from "./escrow/v1beta2/genesis";
import * as _43 from "./escrow/v1beta2/query";
import * as _44 from "./escrow/v1beta2/types";
import * as _45 from "./inflation/v1beta2/genesis";
import * as _46 from "./inflation/v1beta2/params";
import * as _47 from "./market/v1beta2/bid";
import * as _48 from "./market/v1beta2/genesis";
import * as _49 from "./market/v1beta2/lease";
import * as _50 from "./market/v1beta2/order";
import * as _51 from "./market/v1beta2/params";
import * as _52 from "./market/v1beta2/query";
import * as _53 from "./market/v1beta2/service";
import * as _54 from "./provider/v1beta1/provider";
import * as _55 from "./provider/v1beta2/genesis";
import * as _56 from "./provider/v1beta2/provider";
import * as _57 from "./provider/v1beta2/query";
import * as _323 from "./audit/v1beta1/audit.amino";
import * as _324 from "./audit/v1beta2/audit.amino";
import * as _325 from "./cert/v1beta2/cert.amino";
import * as _326 from "./deployment/v1beta1/deployment.amino";
import * as _327 from "./deployment/v1beta2/service.amino";
import * as _328 from "./market/v1beta2/service.amino";
import * as _329 from "./provider/v1beta1/provider.amino";
import * as _330 from "./provider/v1beta2/provider.amino";
import * as _331 from "./audit/v1beta1/audit.registry";
import * as _332 from "./audit/v1beta2/audit.registry";
import * as _333 from "./cert/v1beta2/cert.registry";
import * as _334 from "./deployment/v1beta1/deployment.registry";
import * as _335 from "./deployment/v1beta2/service.registry";
import * as _336 from "./market/v1beta2/service.registry";
import * as _337 from "./provider/v1beta1/provider.registry";
import * as _338 from "./provider/v1beta2/provider.registry";
import * as _339 from "./audit/v1beta2/query.lcd";
import * as _340 from "./cert/v1beta2/query.lcd";
import * as _341 from "./deployment/v1beta1/query.lcd";
import * as _342 from "./deployment/v1beta2/query.lcd";
import * as _343 from "./escrow/v1beta1/query.lcd";
import * as _344 from "./escrow/v1beta2/query.lcd";
import * as _345 from "./market/v1beta2/query.lcd";
import * as _346 from "./provider/v1beta2/query.lcd";
import * as _347 from "./audit/v1beta2/query.rpc.Query";
import * as _348 from "./cert/v1beta2/query.rpc.Query";
import * as _349 from "./deployment/v1beta1/query.rpc.Query";
import * as _350 from "./deployment/v1beta2/query.rpc.Query";
import * as _351 from "./escrow/v1beta1/query.rpc.Query";
import * as _352 from "./escrow/v1beta2/query.rpc.Query";
import * as _353 from "./market/v1beta2/query.rpc.Query";
import * as _354 from "./provider/v1beta2/query.rpc.Query";
import * as _355 from "./audit/v1beta1/audit.rpc.msg";
import * as _356 from "./audit/v1beta2/audit.rpc.msg";
import * as _357 from "./cert/v1beta2/cert.rpc.msg";
import * as _358 from "./deployment/v1beta1/deployment.rpc.msg";
import * as _359 from "./deployment/v1beta2/service.rpc.msg";
import * as _360 from "./market/v1beta2/service.rpc.msg";
import * as _361 from "./provider/v1beta1/provider.rpc.msg";
import * as _362 from "./provider/v1beta2/provider.rpc.msg";
import * as _580 from "./lcd";
import * as _581 from "./rpc.query";
import * as _582 from "./rpc.tx";
export namespace akash {
  export namespace audit {
    export const v1beta1 = {
      ..._5,
      ..._323,
      ..._331,
      ..._355
    };
    export const v1beta2 = {
      ..._6,
      ..._7,
      ..._8,
      ..._324,
      ..._332,
      ..._339,
      ..._347,
      ..._356
    };
  }
  export namespace base {
    export const v1beta1 = {
      ..._9,
      ..._10,
      ..._11,
      ..._12
    };
    export const v1beta2 = {
      ..._13,
      ..._14,
      ..._15,
      ..._16,
      ..._17
    };
  }
  export namespace cert {
    export const v1beta2 = {
      ..._18,
      ..._19,
      ..._20,
      ..._325,
      ..._333,
      ..._340,
      ..._348,
      ..._357
    };
  }
  export namespace deployment {
    export const v1beta1 = {
      ..._21,
      ..._22,
      ..._23,
      ..._24,
      ..._25,
      ..._26,
      ..._326,
      ..._334,
      ..._341,
      ..._349,
      ..._358
    };
    export const v1beta2 = {
      ..._27,
      ..._28,
      ..._29,
      ..._30,
      ..._31,
      ..._32,
      ..._33,
      ..._34,
      ..._35,
      ..._36,
      ..._37,
      ..._38,
      ..._327,
      ..._335,
      ..._342,
      ..._350,
      ..._359
    };
  }
  export namespace escrow {
    export const v1beta1 = {
      ..._39,
      ..._40,
      ..._41,
      ..._343,
      ..._351
    };
    export const v1beta2 = {
      ..._42,
      ..._43,
      ..._44,
      ..._344,
      ..._352
    };
  }
  export namespace inflation {
    export const v1beta2 = {
      ..._45,
      ..._46
    };
  }
  export namespace market {
    export const v1beta2 = {
      ..._47,
      ..._48,
      ..._49,
      ..._50,
      ..._51,
      ..._52,
      ..._53,
      ..._328,
      ..._336,
      ..._345,
      ..._353,
      ..._360
    };
  }
  export namespace provider {
    export const v1beta1 = {
      ..._54,
      ..._329,
      ..._337,
      ..._361
    };
    export const v1beta2 = {
      ..._55,
      ..._56,
      ..._57,
      ..._330,
      ..._338,
      ..._346,
      ..._354,
      ..._362
    };
  }
  export const ClientFactory = {
    ..._580,
    ..._581,
    ..._582
  };
}