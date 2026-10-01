import { baseAPI } from "../baseApi/baseApi";
import {
  GetUsersParams,
  GetUsersResponse,
  GetUserStatsResponse,
  SuspendUserPayload,
  TogglePresenterPayload,
} from "./types/userTypes";

export const userAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getUserStats: build.query<GetUserStatsResponse, GetUsersParams | void>({
      query: (params) => ({
        url: `/admin/users/stats`,
        method: "GET",
        params: {
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.status ? { status: params.status } : {}),
        },
      }),
      providesTags: ["User"],
    }),

    getUsers: build.query<GetUsersResponse, GetUsersParams | void>({
      query: (params) => ({
        url: `/admin/users`,
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
          ...(params?.status ? { status: params.status } : {}),
        },
      }),
      providesTags: ["User"],
    }),

    suspendUser: build.mutation<void, SuspendUserPayload>({
      query: ({ id, reason }) => ({
        url: `/admin/users/${id}/suspend`,
        method: "PATCH",
        body: { reason },
      }),
      invalidatesTags: ["User"],
    }),

    toggleUserPresenter: build.mutation<void, TogglePresenterPayload>({
      query: ({ id, isPresenter }) => ({
        url: `/admin/users/${id}/presenter`,
        method: "PATCH",
        body: { isPresenter },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetUsersQuery,
  useSuspendUserMutation,
  useToggleUserPresenterMutation,
} = userAPI;
