/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { getStoredAccessToken } from "../auth/authStorage";

const baseQueryAPI = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).auth.accessToken ?? getStoredAccessToken();

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions: any,
) => {
  const result = await baseQueryAPI(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions?.silent) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    if (result?.error) {
      const errorData = result.error.data as {
        message?: string;
        error?: string;
      };
      const isSessionExpired =
        result.error.status === 401 && errorData?.error === "Unauthorized";

      if (isSessionExpired) {
      } else {
        toast.error(
          errorData?.message || "Something went wrong. Please try again.",
        );
      }
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: ["Category", "BusinessType", "Collection", "Profile", "User"],

  endpoints: () => ({}),
});
