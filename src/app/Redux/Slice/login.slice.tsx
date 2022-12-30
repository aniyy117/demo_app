import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../../services/auth";

const initialState = {
  auth: AUTH.isLoggedIn ? true : false,
};

const { actions, reducer } = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.auth = AUTH.isLoggedIn ? true : false
    },
  },
});

export const { login } = actions;

export { reducer as AUTHReducer, initialState as AUTHReducerInit };
