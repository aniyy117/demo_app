import { createSlice } from "@reduxjs/toolkit";
import { AUTH } from "../../services/auth";

const initialState = {
    darkTheme: AUTH.theme ? AUTH.theme : false,
};

const  { actions, reducer } = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      AUTH.updateTheme(!state.darkTheme); 
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = actions;

export {
    reducer as ThemeReducer,
    initialState as ThemeReducerInit,
};