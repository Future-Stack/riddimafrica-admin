import { configureStore } from "@reduxjs/toolkit";

import "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import { baseAPI } from "./features/baseApi/baseApi";
import "./features/businessType/businessTypeAPI";
import "./features/category/categoryAPI";
import "./features/collection/collectionAPI";
import "./features/profile/profileAPI";
import "./features/user/userAPI";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      [baseAPI.reducerPath]: baseAPI.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseAPI.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
