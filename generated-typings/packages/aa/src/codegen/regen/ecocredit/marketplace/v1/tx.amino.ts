import { AminoMsg } from "@cosmjs/amino";
import { MsgSell, MsgUpdateSellOrders, MsgCancelSellOrder, MsgBuyDirect } from "./tx";
export interface MsgSellAminoType extends AminoMsg {
  type: "/regen.ecocredit.marketplace.v1.MsgSell";
  value: {
    owner: string;
    orders: {
      batch_denom: string;
      quantity: string;
      ask_price: {
        denom: string;
        amount: string;
      };
      disable_auto_retire: boolean;
      expiration: {
        seconds: string;
        nanos: number;
      };
    }[];
  };
}
export interface MsgUpdateSellOrdersAminoType extends AminoMsg {
  type: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders";
  value: {
    owner: string;
    updates: {
      sell_order_id: string;
      new_quantity: string;
      new_ask_price: {
        denom: string;
        amount: string;
      };
      disable_auto_retire: boolean;
      new_expiration: {
        seconds: string;
        nanos: number;
      };
    }[];
  };
}
export interface MsgCancelSellOrderAminoType extends AminoMsg {
  type: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder";
  value: {
    seller: string;
    sell_order_id: string;
  };
}
export interface MsgBuyDirectAminoType extends AminoMsg {
  type: "/regen.ecocredit.marketplace.v1.MsgBuyDirect";
  value: {
    buyer: string;
    orders: {
      batch_denom: string;
      quantity: string;
      ask_price: {
        denom: string;
        amount: string;
      };
      disable_auto_retire: boolean;
      expiration: {
        seconds: string;
        nanos: number;
      };
    }[];
  };
}
export const AminoConverter = {
  "/regen.ecocredit.marketplace.v1.MsgSell": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgSell",
    toAmino: ({
      owner,
      orders
    }: MsgSell): MsgSellAminoType["value"] => {
      return {
        owner,
        orders: orders.map(el0 => ({
          batch_denom: el0.batchDenom,
          quantity: el0.quantity,
          ask_price: {
            denom: el0.askPrice.denom,
            amount: el0.askPrice.amount
          },
          disable_auto_retire: el0.disableAutoRetire,
          expiration: el0.expiration
        }))
      };
    },
    fromAmino: ({
      owner,
      orders
    }: MsgSellAminoType["value"]): MsgSell => {
      return {
        owner,
        orders: orders.map(el0 => ({
          batchDenom: el0.batch_denom,
          quantity: el0.quantity,
          askPrice: {
            denom: el0.ask_price.denom,
            amount: el0.ask_price.amount
          },
          disableAutoRetire: el0.disable_auto_retire,
          expiration: el0.expiration
        }))
      };
    }
  },
  "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgUpdateSellOrders",
    toAmino: ({
      owner,
      updates
    }: MsgUpdateSellOrders): MsgUpdateSellOrdersAminoType["value"] => {
      return {
        owner,
        updates: updates.map(el0 => ({
          sell_order_id: el0.sellOrderId.toString(),
          new_quantity: el0.newQuantity,
          new_ask_price: {
            denom: el0.newAskPrice.denom,
            amount: el0.newAskPrice.amount
          },
          disable_auto_retire: el0.disableAutoRetire,
          new_expiration: el0.newExpiration
        }))
      };
    },
    fromAmino: ({
      owner,
      updates
    }: MsgUpdateSellOrdersAminoType["value"]): MsgUpdateSellOrders => {
      return {
        owner,
        updates: updates.map(el0 => ({
          sellOrderId: BigInt(el0.sell_order_id),
          newQuantity: el0.new_quantity,
          newAskPrice: {
            denom: el0.new_ask_price.denom,
            amount: el0.new_ask_price.amount
          },
          disableAutoRetire: el0.disable_auto_retire,
          newExpiration: el0.new_expiration
        }))
      };
    }
  },
  "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgCancelSellOrder",
    toAmino: ({
      seller,
      sellOrderId
    }: MsgCancelSellOrder): MsgCancelSellOrderAminoType["value"] => {
      return {
        seller,
        sell_order_id: sellOrderId.toString()
      };
    },
    fromAmino: ({
      seller,
      sell_order_id
    }: MsgCancelSellOrderAminoType["value"]): MsgCancelSellOrder => {
      return {
        seller,
        sellOrderId: BigInt(sell_order_id)
      };
    }
  },
  "/regen.ecocredit.marketplace.v1.MsgBuyDirect": {
    aminoType: "/regen.ecocredit.marketplace.v1.MsgBuyDirect",
    toAmino: ({
      buyer,
      orders
    }: MsgBuyDirect): MsgBuyDirectAminoType["value"] => {
      return {
        buyer,
        orders: orders.map(el0 => ({
          batch_denom: el0.batchDenom,
          quantity: el0.quantity,
          ask_price: {
            denom: el0.askPrice.denom,
            amount: el0.askPrice.amount
          },
          disable_auto_retire: el0.disableAutoRetire,
          expiration: el0.expiration
        }))
      };
    },
    fromAmino: ({
      buyer,
      orders
    }: MsgBuyDirectAminoType["value"]): MsgBuyDirect => {
      return {
        buyer,
        orders: orders.map(el0 => ({
          batchDenom: el0.batch_denom,
          quantity: el0.quantity,
          askPrice: {
            denom: el0.ask_price.denom,
            amount: el0.ask_price.amount
          },
          disableAutoRetire: el0.disable_auto_retire,
          expiration: el0.expiration
        }))
      };
    }
  }
};