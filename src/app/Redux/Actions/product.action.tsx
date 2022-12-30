import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import product from "../../services/products.services";

// -------------------------------------------------------------------------------------
// api actions
// -------------------------------------------------------------------------------------
export interface GetProductAction {}

const getProduct = createAsyncThunk(
  "product/get",
  async (arg: GetProductAction, { rejectWithValue }) => {
    try {
      const { data } = await product.get();
      return {
        product: data.products,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const resetProduct = createAction("product/reset");

// -------------------------------------------------------------------------------------
// exports
// -------------------------------------------------------------------------------------

export { getProduct, resetProduct };
