import { baseAPI } from "../baseApi/baseApi";
import {
  CreateCollectionPayload,
  GetCollectionsParams,
  GetCollectionsResponse,
  UpdateCollectionPayload,
} from "./types/collectionTypes";

export const collectionAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createCollection: build.mutation<void, CreateCollectionPayload>({
      query: (data) => ({
        url: `/admin/collections`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collection"],
    }),

    getCollections: build.query<GetCollectionsResponse, GetCollectionsParams | void>({
      query: (params) => ({
        url: `/admin/collections`,
        method: "GET",
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      providesTags: ["Collection"],
    }),

    updateCollection: build.mutation<
      void,
      { id: string; data: UpdateCollectionPayload }
    >({
      query: ({ id, data }) => ({
        url: `/admin/collections/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Collection"],
    }),

    deleteCollection: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/collections/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collection"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
} = collectionAPI;
