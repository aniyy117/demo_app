import {
  createEntityAdapter,
  createReducer,
  EntityState,
} from "@reduxjs/toolkit";
import { ADMIN } from "../../services/admin.service";

import { RootState } from "../storeConfigurations";
import { getProduct, resetProduct } from "../Actions/product.action";

export interface Product {
  id: number;
  category: string;
  thumbnail: string;
  title: string;
  price: number;
}

const Productadaptor = createEntityAdapter<Product>({
  selectId: (Product) => Product.id,
  sortComparer: (a, b) => a.category.localeCompare(b.category),
});

type AdditionalFields = {};

type IProductReducer = EntityState<Product> & AdditionalFields;

const additionalFields: AdditionalFields = {};

const initialState: IProductReducer = Object.assign(
  {},
  Productadaptor.getInitialState(),
  additionalFields
);

const ProductReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getProduct.fulfilled, (state, action: any) => {
      Productadaptor.setAll(state, action.payload.product);
    })
    .addCase(getProduct.rejected, (_state, action) => {
      ADMIN.toast.throwError(action.error, "server error");
    });

  builder.addCase(resetProduct, () => initialState);
});

// -----------------------------------------------------------------------------------
// selectors

const ProductSelectors = Productadaptor.getSelectors<RootState>(
  (state) => state.product
);

// -----------------------------------------------------------------------------------
// exports

export { ProductReducer, initialState as ProductReducerInit, ProductSelectors };
