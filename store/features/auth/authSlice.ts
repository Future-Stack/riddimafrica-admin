import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  clearStoredTokens,
  getStoredTokens,
  persistTokens,
} from "./authStorage";
import type { AuthCredentials, AuthState } from "./types/authTypes";

const storedTokens = getStoredTokens();

const initialState: AuthState = {
  accessToken: storedTokens?.accessToken ?? null,
  refreshToken: storedTokens?.refreshToken ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (state, action: PayloadAction<AuthCredentials>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      persistTokens(
        {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        },
        action.payload.rememberMe ?? true,
      );
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      clearStoredTokens();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
