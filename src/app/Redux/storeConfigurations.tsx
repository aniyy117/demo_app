// react
import {
  combineReducers,
  CombinedState,
  AnyAction,
  Action,
  Middleware,
} from "redux";

// vendors
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { ThemeReducer, ThemeReducerInit } from "./Slice/theme.slice";
import { AUTHReducerInit, AUTHReducer } from "./Slice/login.slice";
import { ProductReducer, ProductReducerInit } from "./Reducers/product.reducer";
import { CartsReducerInit, CartsReducer } from "./Reducers/cart.reducers";

const reducers = combineReducers({
  theme: ThemeReducer,
  auth: AUTHReducer,
  product: ProductReducer,
  cart: CartsReducer,
});

export type RootState = ReturnType<typeof reducers>;

const defaultState: RootState = {
  theme: ThemeReducerInit,
  auth: AUTHReducerInit,
  product: ProductReducerInit,
  cart: CartsReducerInit,
};

const rootReducer = (
  state: CombinedState<RootState> | undefined,
  action: AnyAction
) => {
  if (action.type === "RESET_ALL") state = defaultState;

  return reducers(state, action);
};

// ------------------------------------------------------------------------------------------
// services

export interface Services {}
const services = {};

let middleware: Middleware[] = [];

if (process.env.NODE_ENV !== "production") {
  middleware = [...middleware, logger];
}

export const storeConfig = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        thunk: {
          extraArgument: services,
        },
      }).concat(middleware);
    },
  });
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  Services,
  Action
>;
