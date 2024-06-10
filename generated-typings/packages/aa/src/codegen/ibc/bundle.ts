import * as _168 from "./applications/transfer/v1/genesis";
import * as _169 from "./applications/transfer/v1/query";
import * as _170 from "./applications/transfer/v1/transfer";
import * as _171 from "./applications/transfer/v1/tx";
import * as _172 from "./applications/transfer/v2/packet";
import * as _173 from "./core/channel/v1/channel";
import * as _174 from "./core/channel/v1/genesis";
import * as _175 from "./core/channel/v1/query";
import * as _176 from "./core/channel/v1/tx";
import * as _177 from "./core/client/v1/client";
import * as _178 from "./core/client/v1/genesis";
import * as _179 from "./core/client/v1/query";
import * as _180 from "./core/client/v1/tx";
import * as _181 from "./core/commitment/v1/commitment";
import * as _182 from "./core/connection/v1/connection";
import * as _183 from "./core/connection/v1/genesis";
import * as _184 from "./core/connection/v1/query";
import * as _185 from "./core/connection/v1/tx";
import * as _186 from "./core/port/v1/query";
import * as _187 from "./core/types/v1/genesis";
import * as _188 from "./lightclients/localhost/v1/localhost";
import * as _189 from "./lightclients/solomachine/v1/solomachine";
import * as _190 from "./lightclients/solomachine/v2/solomachine";
import * as _191 from "./lightclients/tendermint/v1/tendermint";
import * as _445 from "./applications/transfer/v1/tx.amino";
import * as _446 from "./core/channel/v1/tx.amino";
import * as _447 from "./core/client/v1/tx.amino";
import * as _448 from "./core/connection/v1/tx.amino";
import * as _449 from "./applications/transfer/v1/tx.registry";
import * as _450 from "./core/channel/v1/tx.registry";
import * as _451 from "./core/client/v1/tx.registry";
import * as _452 from "./core/connection/v1/tx.registry";
import * as _453 from "./applications/transfer/v1/query.lcd";
import * as _454 from "./core/channel/v1/query.lcd";
import * as _455 from "./core/client/v1/query.lcd";
import * as _456 from "./core/connection/v1/query.lcd";
import * as _457 from "./applications/transfer/v1/query.rpc.Query";
import * as _458 from "./core/channel/v1/query.rpc.Query";
import * as _459 from "./core/client/v1/query.rpc.Query";
import * as _460 from "./core/connection/v1/query.rpc.Query";
import * as _461 from "./core/port/v1/query.rpc.Query";
import * as _462 from "./applications/transfer/v1/tx.rpc.msg";
import * as _463 from "./core/channel/v1/tx.rpc.msg";
import * as _464 from "./core/client/v1/tx.rpc.msg";
import * as _465 from "./core/connection/v1/tx.rpc.msg";
import * as _589 from "./lcd";
import * as _590 from "./rpc.query";
import * as _591 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace transfer {
      export const v1 = {
        ..._168,
        ..._169,
        ..._170,
        ..._171,
        ..._445,
        ..._449,
        ..._453,
        ..._457,
        ..._462
      };
      export const v2 = {
        ..._172
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._173,
        ..._174,
        ..._175,
        ..._176,
        ..._446,
        ..._450,
        ..._454,
        ..._458,
        ..._463
      };
    }
    export namespace client {
      export const v1 = {
        ..._177,
        ..._178,
        ..._179,
        ..._180,
        ..._447,
        ..._451,
        ..._455,
        ..._459,
        ..._464
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._181
      };
    }
    export namespace connection {
      export const v1 = {
        ..._182,
        ..._183,
        ..._184,
        ..._185,
        ..._448,
        ..._452,
        ..._456,
        ..._460,
        ..._465
      };
    }
    export namespace port {
      export const v1 = {
        ..._186,
        ..._461
      };
    }
    export namespace types {
      export const v1 = {
        ..._187
      };
    }
  }
  export namespace lightclients {
    export namespace localhost {
      export const v1 = {
        ..._188
      };
    }
    export namespace solomachine {
      export const v1 = {
        ..._189
      };
      export const v2 = {
        ..._190
      };
    }
    export namespace tendermint {
      export const v1 = {
        ..._191
      };
    }
  }
  export const ClientFactory = {
    ..._589,
    ..._590,
    ..._591
  };
}