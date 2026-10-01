import { ApiResponse } from "../../auth/types/authTypes";

export interface AdminProfile {
  adminId: string;
  name: string;
  email: string;
  profileImage: string | null;
  phoneNumber: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAdminProfilePayload {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: File;
}

export type GetAdminProfileResponse = ApiResponse<AdminProfile>;
