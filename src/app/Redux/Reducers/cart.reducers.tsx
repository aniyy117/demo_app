import {
  createEntityAdapter,
  createReducer,
  EntityState,
} from "@reduxjs/toolkit";

import { RootState } from "../storeConfigurations";
import {
  addItem,
  decrementQuantity,
  incrementQuantity,
  removeItem,
  resetCart,
} from "../Actions/cart.action";

export interface Carts {
  id: number;
  category: string;
  thumbnail: string;
  title: string;
  price: number;
  quantity: number;
}

const Cartsadaptor = createEntityAdapter<Carts>({
  selectId: (Carts) => Carts.id,
  sortComparer: (a, b) => a.category.localeCompare(b.category),
});

type AdditionalFields = {};

type ICartsReducer = EntityState<Carts> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: ICartsReducer = Object.assign(
  {},
  Cartsadaptor.getInitialState(),
  additionalFields
);

const CartsReducer = createReducer(initialState, (builder) => {
  builder.addCase(addItem, (state, action: any) => {
    const itemInCart: any = state.entities[action.payload.id];
    const itemId = state.ids.find((id) => id === action.payload.id);
    if (itemId) {
      itemInCart.quantity++;
    } else {
      state.ids.push(action.payload.id);
      state.entities[action.payload.id] = {
        ...action.payload,
        quantity: 1,
      };
    }
  });

  builder.addCase(incrementQuantity, (state, action: any) => {
    const item: any = state.entities[action.payload.id];
    item.quantity++;
  });

  builder.addCase(decrementQuantity, (state, action: any) => {
    const item: any = state.entities[action.payload.id];
    if (item.quantity === 1) {
      const removeItem = state.ids.filter((id) => id !== action.payload.id);
      state.ids = removeItem;
      delete state.entities[action.payload.id];
    } else {
      item.quantity--;
    }
  });

  builder.addCase(removeItem, (state, action: any) => {
    const removeItem = state.ids.filter((id) => id !== action.payload.id);
    state.ids = removeItem;
    delete state.entities[action.payload.id];
  });

  builder.addCase(resetCart, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const CartsSelectors = Cartsadaptor.getSelectors<RootState>(
  (state) => state.cart
);

// -----------------------------------------------------------------------------------
// exports

export { CartsReducer, initialState as CartsReducerInit, CartsSelectors };
