import { baseAPI } from "../baseApi/baseApi";
import { AdminLoginResponse } from "./types/authTypes";

export const authAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<
      AdminLoginResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/auth/admin/login",
        method: "POST",
        body: data,
      }),
    }),
    refreshToken: build.mutation<void, { refreshToken: string }>({
      query: (data) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authAPI;
