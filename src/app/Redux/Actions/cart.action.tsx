import { createAction } from "@reduxjs/toolkit";

// -------------------------------------------------------------------------------------
// api actions
// -------------------------------------------------------------------------------------
export interface GetCartAction {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

const addItem = createAction("carts/add", (arg: GetCartAction) => {
  return {
    payload: arg,
  };
});

export interface QuantityAction {
  id: number;
}

const incrementQuantity = createAction(
  "carts/increment",
  (arg: QuantityAction) => {
    return {
      payload: arg,
    };
  }
);

const decrementQuantity = createAction(
  "carts/decrement",
  (arg: QuantityAction) => {
    return {
      payload: arg,
    };
  }
);


const removeItem = createAction("carts/remove", (arg: QuantityAction) => {
  return {
    payload: arg,
  };
});

const resetCart = createAction("carts/reset");

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export { addItem, resetCart, incrementQuantity  , decrementQuantity , removeItem};
