import { baseAPI } from "../baseApi/baseApi";
import {
  CreateCategoryPayload,
  GetCategoriesResponse,
  GetCategoryByIdResponse,
  UpdateCategoryPayload,
} from "./types/categoryTypes";

export const categoryAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createCategory: build.mutation<void, CreateCategoryPayload>({
      query: (data) => ({
        url: `/admin/categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    getCategories: build.query<GetCategoriesResponse, void>({
      query: () => ({
        url: `/admin/categories`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    getCategoryById: build.query<GetCategoryByIdResponse, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "GET",
      }),
      providesTags: ["Category"],
    }),

    updateCategory: build.mutation<
      void,
      { id: string; data: UpdateCategoryPayload }
    >({
      query: ({ id, data }) => ({
        url: `/admin/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    deleteCategory: build.mutation<void, string>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryAPI;
