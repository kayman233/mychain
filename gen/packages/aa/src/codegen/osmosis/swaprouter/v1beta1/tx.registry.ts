import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSwapExactAmountIn, MsgSwapExactAmountOut } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/osmosis.swaprouter.v1beta1.MsgSwapExactAmountIn", MsgSwapExactAmountIn], ["/osmosis.swaprouter.v1beta1.MsgSwapExactAmountOut", MsgSwapExactAmountOut]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    swapExactAmountIn(value: MsgSwapExactAmountIn) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountIn",
        value: MsgSwapExactAmountIn.encode(value).finish()
      };
    },
    swapExactAmountOut(value: MsgSwapExactAmountOut) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountOut",
        value: MsgSwapExactAmountOut.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    swapExactAmountIn(value: MsgSwapExactAmountIn) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountIn",
        value
      };
    },
    swapExactAmountOut(value: MsgSwapExactAmountOut) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountOut",
        value
      };
    }
  },
  fromPartial: {
    swapExactAmountIn(value: MsgSwapExactAmountIn) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountIn",
        value: MsgSwapExactAmountIn.fromPartial(value)
      };
    },
    swapExactAmountOut(value: MsgSwapExactAmountOut) {
      return {
        typeUrl: "/osmosis.swaprouter.v1beta1.MsgSwapExactAmountOut",
        value: MsgSwapExactAmountOut.fromPartial(value)
      };
    }
  }
};