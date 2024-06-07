import * as _61 from "./app/v1alpha1/config";
import * as _62 from "./app/v1alpha1/module";
import * as _63 from "./app/v1alpha1/query";
import * as _64 from "./auth/v1beta1/auth";
import * as _65 from "./auth/v1beta1/genesis";
import * as _66 from "./auth/v1beta1/query";
import * as _67 from "./authz/v1beta1/authz";
import * as _68 from "./authz/v1beta1/event";
import * as _69 from "./authz/v1beta1/genesis";
import * as _70 from "./authz/v1beta1/query";
import * as _71 from "./authz/v1beta1/tx";
import * as _72 from "./bank/v1beta1/authz";
import * as _73 from "./bank/v1beta1/bank";
import * as _74 from "./bank/v1beta1/genesis";
import * as _75 from "./bank/v1beta1/query";
import * as _76 from "./bank/v1beta1/tx";
import * as _77 from "./base/abci/v1beta1/abci";
import * as _78 from "./base/kv/v1beta1/kv";
import * as _79 from "./base/query/v1beta1/pagination";
import * as _80 from "./base/reflection/v1beta1/reflection";
import * as _81 from "./base/reflection/v2alpha1/reflection";
import * as _82 from "./base/snapshots/v1beta1/snapshot";
import * as _83 from "./base/store/v1beta1/commit_info";
import * as _84 from "./base/store/v1beta1/listening";
import * as _85 from "./base/tendermint/v1beta1/query";
import * as _86 from "./base/v1beta1/coin";
import * as _87 from "./capability/v1beta1/capability";
import * as _88 from "./capability/v1beta1/genesis";
import * as _89 from "./crisis/v1beta1/genesis";
import * as _90 from "./crisis/v1beta1/tx";
import * as _91 from "./crypto/ed25519/keys";
import * as _92 from "./crypto/hd/v1/hd";
import * as _93 from "./crypto/keyring/v1/record";
import * as _94 from "./crypto/multisig/keys";
import * as _95 from "./crypto/secp256k1/keys";
import * as _96 from "./crypto/secp256r1/keys";
import * as _97 from "./distribution/v1beta1/distribution";
import * as _98 from "./distribution/v1beta1/genesis";
import * as _99 from "./distribution/v1beta1/query";
import * as _100 from "./distribution/v1beta1/tx";
import * as _101 from "./evidence/v1beta1/evidence";
import * as _102 from "./evidence/v1beta1/genesis";
import * as _103 from "./evidence/v1beta1/query";
import * as _104 from "./evidence/v1beta1/tx";
import * as _105 from "./feegrant/v1beta1/feegrant";
import * as _106 from "./feegrant/v1beta1/genesis";
import * as _107 from "./feegrant/v1beta1/query";
import * as _108 from "./feegrant/v1beta1/tx";
import * as _109 from "./genutil/v1beta1/genesis";
import * as _110 from "./gov/v1/genesis";
import * as _111 from "./gov/v1/gov";
import * as _112 from "./gov/v1/query";
import * as _113 from "./gov/v1/tx";
import * as _114 from "./gov/v1beta1/genesis";
import * as _115 from "./gov/v1beta1/gov";
import * as _116 from "./gov/v1beta1/query";
import * as _117 from "./gov/v1beta1/tx";
import * as _118 from "./group/v1/events";
import * as _119 from "./group/v1/genesis";
import * as _120 from "./group/v1/query";
import * as _121 from "./group/v1/tx";
import * as _122 from "./group/v1/types";
import * as _123 from "./mint/v1beta1/genesis";
import * as _124 from "./mint/v1beta1/mint";
import * as _125 from "./mint/v1beta1/query";
import * as _126 from "./msg/v1/msg";
import * as _127 from "./nft/v1beta1/event";
import * as _128 from "./nft/v1beta1/genesis";
import * as _129 from "./nft/v1beta1/nft";
import * as _130 from "./nft/v1beta1/query";
import * as _131 from "./nft/v1beta1/tx";
import * as _132 from "./orm/v1/orm";
import * as _133 from "./orm/v1alpha1/schema";
import * as _134 from "./params/v1beta1/params";
import * as _135 from "./params/v1beta1/query";
import * as _136 from "./slashing/v1beta1/genesis";
import * as _137 from "./slashing/v1beta1/query";
import * as _138 from "./slashing/v1beta1/slashing";
import * as _139 from "./slashing/v1beta1/tx";
import * as _140 from "./staking/v1beta1/authz";
import * as _141 from "./staking/v1beta1/genesis";
import * as _142 from "./staking/v1beta1/query";
import * as _143 from "./staking/v1beta1/staking";
import * as _144 from "./staking/v1beta1/tx";
import * as _145 from "./tx/signing/v1beta1/signing";
import * as _146 from "./tx/v1beta1/service";
import * as _147 from "./tx/v1beta1/tx";
import * as _148 from "./upgrade/v1beta1/query";
import * as _149 from "./upgrade/v1beta1/tx";
import * as _150 from "./upgrade/v1beta1/upgrade";
import * as _151 from "./vesting/v1beta1/tx";
import * as _152 from "./vesting/v1beta1/vesting";
import * as _363 from "./authz/v1beta1/tx.amino";
import * as _364 from "./bank/v1beta1/tx.amino";
import * as _365 from "./crisis/v1beta1/tx.amino";
import * as _366 from "./distribution/v1beta1/tx.amino";
import * as _367 from "./evidence/v1beta1/tx.amino";
import * as _368 from "./feegrant/v1beta1/tx.amino";
import * as _369 from "./gov/v1/tx.amino";
import * as _370 from "./gov/v1beta1/tx.amino";
import * as _371 from "./group/v1/tx.amino";
import * as _372 from "./nft/v1beta1/tx.amino";
import * as _373 from "./slashing/v1beta1/tx.amino";
import * as _374 from "./staking/v1beta1/tx.amino";
import * as _375 from "./upgrade/v1beta1/tx.amino";
import * as _376 from "./vesting/v1beta1/tx.amino";
import * as _377 from "./authz/v1beta1/tx.registry";
import * as _378 from "./bank/v1beta1/tx.registry";
import * as _379 from "./crisis/v1beta1/tx.registry";
import * as _380 from "./distribution/v1beta1/tx.registry";
import * as _381 from "./evidence/v1beta1/tx.registry";
import * as _382 from "./feegrant/v1beta1/tx.registry";
import * as _383 from "./gov/v1/tx.registry";
import * as _384 from "./gov/v1beta1/tx.registry";
import * as _385 from "./group/v1/tx.registry";
import * as _386 from "./nft/v1beta1/tx.registry";
import * as _387 from "./slashing/v1beta1/tx.registry";
import * as _388 from "./staking/v1beta1/tx.registry";
import * as _389 from "./upgrade/v1beta1/tx.registry";
import * as _390 from "./vesting/v1beta1/tx.registry";
import * as _391 from "./auth/v1beta1/query.lcd";
import * as _392 from "./authz/v1beta1/query.lcd";
import * as _393 from "./bank/v1beta1/query.lcd";
import * as _394 from "./base/tendermint/v1beta1/query.lcd";
import * as _395 from "./distribution/v1beta1/query.lcd";
import * as _396 from "./evidence/v1beta1/query.lcd";
import * as _397 from "./feegrant/v1beta1/query.lcd";
import * as _398 from "./gov/v1/query.lcd";
import * as _399 from "./gov/v1beta1/query.lcd";
import * as _400 from "./group/v1/query.lcd";
import * as _401 from "./mint/v1beta1/query.lcd";
import * as _402 from "./nft/v1beta1/query.lcd";
import * as _403 from "./params/v1beta1/query.lcd";
import * as _404 from "./slashing/v1beta1/query.lcd";
import * as _405 from "./staking/v1beta1/query.lcd";
import * as _406 from "./tx/v1beta1/service.lcd";
import * as _407 from "./upgrade/v1beta1/query.lcd";
import * as _408 from "./app/v1alpha1/query.rpc.Query";
import * as _409 from "./auth/v1beta1/query.rpc.Query";
import * as _410 from "./authz/v1beta1/query.rpc.Query";
import * as _411 from "./bank/v1beta1/query.rpc.Query";
import * as _412 from "./base/tendermint/v1beta1/query.rpc.Service";
import * as _413 from "./distribution/v1beta1/query.rpc.Query";
import * as _414 from "./evidence/v1beta1/query.rpc.Query";
import * as _415 from "./feegrant/v1beta1/query.rpc.Query";
import * as _416 from "./gov/v1/query.rpc.Query";
import * as _417 from "./gov/v1beta1/query.rpc.Query";
import * as _418 from "./group/v1/query.rpc.Query";
import * as _419 from "./mint/v1beta1/query.rpc.Query";
import * as _420 from "./nft/v1beta1/query.rpc.Query";
import * as _421 from "./params/v1beta1/query.rpc.Query";
import * as _422 from "./slashing/v1beta1/query.rpc.Query";
import * as _423 from "./staking/v1beta1/query.rpc.Query";
import * as _424 from "./tx/v1beta1/service.rpc.Service";
import * as _425 from "./upgrade/v1beta1/query.rpc.Query";
import * as _426 from "./authz/v1beta1/tx.rpc.msg";
import * as _427 from "./bank/v1beta1/tx.rpc.msg";
import * as _428 from "./crisis/v1beta1/tx.rpc.msg";
import * as _429 from "./distribution/v1beta1/tx.rpc.msg";
import * as _430 from "./evidence/v1beta1/tx.rpc.msg";
import * as _431 from "./feegrant/v1beta1/tx.rpc.msg";
import * as _432 from "./gov/v1/tx.rpc.msg";
import * as _433 from "./gov/v1beta1/tx.rpc.msg";
import * as _434 from "./group/v1/tx.rpc.msg";
import * as _435 from "./nft/v1beta1/tx.rpc.msg";
import * as _436 from "./slashing/v1beta1/tx.rpc.msg";
import * as _437 from "./staking/v1beta1/tx.rpc.msg";
import * as _438 from "./upgrade/v1beta1/tx.rpc.msg";
import * as _439 from "./vesting/v1beta1/tx.rpc.msg";
import * as _583 from "./lcd";
import * as _584 from "./rpc.query";
import * as _585 from "./rpc.tx";
export namespace cosmos {
  export namespace app {
    export const v1alpha1 = {
      ..._61,
      ..._62,
      ..._63,
      ..._408
    };
  }
  export namespace auth {
    export const v1beta1 = {
      ..._64,
      ..._65,
      ..._66,
      ..._391,
      ..._409
    };
  }
  export namespace authz {
    export const v1beta1 = {
      ..._67,
      ..._68,
      ..._69,
      ..._70,
      ..._71,
      ..._363,
      ..._377,
      ..._392,
      ..._410,
      ..._426
    };
  }
  export namespace bank {
    export const v1beta1 = {
      ..._72,
      ..._73,
      ..._74,
      ..._75,
      ..._76,
      ..._364,
      ..._378,
      ..._393,
      ..._411,
      ..._427
    };
  }
  export namespace base {
    export namespace abci {
      export const v1beta1 = {
        ..._77
      };
    }
    export namespace kv {
      export const v1beta1 = {
        ..._78
      };
    }
    export namespace query {
      export const v1beta1 = {
        ..._79
      };
    }
    export namespace reflection {
      export const v1beta1 = {
        ..._80
      };
      export const v2alpha1 = {
        ..._81
      };
    }
    export namespace snapshots {
      export const v1beta1 = {
        ..._82
      };
    }
    export namespace store {
      export const v1beta1 = {
        ..._83,
        ..._84
      };
    }
    export namespace tendermint {
      export const v1beta1 = {
        ..._85,
        ..._394,
        ..._412
      };
    }
    export const v1beta1 = {
      ..._86
    };
  }
  export namespace capability {
    export const v1beta1 = {
      ..._87,
      ..._88
    };
  }
  export namespace crisis {
    export const v1beta1 = {
      ..._89,
      ..._90,
      ..._365,
      ..._379,
      ..._428
    };
  }
  export namespace crypto {
    export const ed25519 = {
      ..._91
    };
    export namespace hd {
      export const v1 = {
        ..._92
      };
    }
    export namespace keyring {
      export const v1 = {
        ..._93
      };
    }
    export const multisig = {
      ..._94
    };
    export const secp256k1 = {
      ..._95
    };
    export const secp256r1 = {
      ..._96
    };
  }
  export namespace distribution {
    export const v1beta1 = {
      ..._97,
      ..._98,
      ..._99,
      ..._100,
      ..._366,
      ..._380,
      ..._395,
      ..._413,
      ..._429
    };
  }
  export namespace evidence {
    export const v1beta1 = {
      ..._101,
      ..._102,
      ..._103,
      ..._104,
      ..._367,
      ..._381,
      ..._396,
      ..._414,
      ..._430
    };
  }
  export namespace feegrant {
    export const v1beta1 = {
      ..._105,
      ..._106,
      ..._107,
      ..._108,
      ..._368,
      ..._382,
      ..._397,
      ..._415,
      ..._431
    };
  }
  export namespace genutil {
    export const v1beta1 = {
      ..._109
    };
  }
  export namespace gov {
    export const v1 = {
      ..._110,
      ..._111,
      ..._112,
      ..._113,
      ..._369,
      ..._383,
      ..._398,
      ..._416,
      ..._432
    };
    export const v1beta1 = {
      ..._114,
      ..._115,
      ..._116,
      ..._117,
      ..._370,
      ..._384,
      ..._399,
      ..._417,
      ..._433
    };
  }
  export namespace group {
    export const v1 = {
      ..._118,
      ..._119,
      ..._120,
      ..._121,
      ..._122,
      ..._371,
      ..._385,
      ..._400,
      ..._418,
      ..._434
    };
  }
  export namespace mint {
    export const v1beta1 = {
      ..._123,
      ..._124,
      ..._125,
      ..._401,
      ..._419
    };
  }
  export namespace msg {
    export const v1 = {
      ..._126
    };
  }
  export namespace nft {
    export const v1beta1 = {
      ..._127,
      ..._128,
      ..._129,
      ..._130,
      ..._131,
      ..._372,
      ..._386,
      ..._402,
      ..._420,
      ..._435
    };
  }
  export namespace orm {
    export const v1 = {
      ..._132
    };
    export const v1alpha1 = {
      ..._133
    };
  }
  export namespace params {
    export const v1beta1 = {
      ..._134,
      ..._135,
      ..._403,
      ..._421
    };
  }
  export namespace slashing {
    export const v1beta1 = {
      ..._136,
      ..._137,
      ..._138,
      ..._139,
      ..._373,
      ..._387,
      ..._404,
      ..._422,
      ..._436
    };
  }
  export namespace staking {
    export const v1beta1 = {
      ..._140,
      ..._141,
      ..._142,
      ..._143,
      ..._144,
      ..._374,
      ..._388,
      ..._405,
      ..._423,
      ..._437
    };
  }
  export namespace tx {
    export namespace signing {
      export const v1beta1 = {
        ..._145
      };
    }
    export const v1beta1 = {
      ..._146,
      ..._147,
      ..._406,
      ..._424
    };
  }
  export namespace upgrade {
    export const v1beta1 = {
      ..._148,
      ..._149,
      ..._150,
      ..._375,
      ..._389,
      ..._407,
      ..._425,
      ..._438
    };
  }
  export namespace vesting {
    export const v1beta1 = {
      ..._151,
      ..._152,
      ..._376,
      ..._390,
      ..._439
    };
  }
  export const ClientFactory = {
    ..._583,
    ..._584,
    ..._585
  };
}