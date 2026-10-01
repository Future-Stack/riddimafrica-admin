import { baseAPI } from "../baseApi/baseApi";
import {
  CreateBusinessTypePayload,
  GetBusinessTypeByIdResponse,
  GetBusinessTypesResponse,
  UpdateBusinessTypePayload,
} from "./types/businessTypeTypes";

export const businessTypeAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createBusinessType: build.mutation<void, CreateBusinessTypePayload>({
      query: (data) => ({
        url: `/admin/business-types`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BusinessType"],
    }),

    getBusinessTypes: build.query<GetBusinessTypesResponse, void>({
      query: () => ({
        url: `/admin/business-types`,
        method: "GET",
      }),
      providesTags: ["BusinessType"],
    }),

    getBusinessTypeById: build.query<GetBusinessTypeByIdResponse, string>({
      query: (id) => ({
        url: `/admin/business-types/${id}`,
        method: "GET",
      }),
      providesTags: ["BusinessType"],
    }),

    updateBusinessType: build.mutation<
      void,
      { id: string; data: UpdateBusinessTypePayload }
    >({
      query: ({ id, data }) => ({
        url: `/admin/business-types/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["BusinessType"],
    }),

    deleteBusinessType: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/business-types/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BusinessType"],
    }),
  }),
});

export const {
  useCreateBusinessTypeMutation,
  useGetBusinessTypesQuery,
  useGetBusinessTypeByIdQuery,
  useUpdateBusinessTypeMutation,
  useDeleteBusinessTypeMutation,
} = businessTypeAPI;
