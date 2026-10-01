import { baseAPI } from "../baseApi/baseApi";
import {
  GetAdminProfileResponse,
  UpdateAdminProfilePayload,
} from "./types/profileTypes";

const toProfileFormData = (data: UpdateAdminProfilePayload) => {
  const formData = new FormData();

  if (data.name !== undefined) formData.append("name", data.name);
  if (data.email !== undefined) formData.append("email", data.email);
  if (data.phoneNumber !== undefined) {
    formData.append("phoneNumber", data.phoneNumber);
  }
  if (data.profileImage) {
    formData.append("profileImage", data.profileImage);
  }

  return formData;
};

export const profileAPI = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAdminProfile: build.query<GetAdminProfileResponse, void>({
      query: () => ({
        url: `/admin/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateAdminProfile: build.mutation<void, UpdateAdminProfilePayload>({
      query: (data) => ({
        url: `/admin/profile`,
        method: "PATCH",
        body: toProfileFormData(data),
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetAdminProfileQuery, useUpdateAdminProfileMutation } =
  profileAPI;
