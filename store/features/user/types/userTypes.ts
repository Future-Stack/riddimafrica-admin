import { ApiResponse } from "../../auth/types/authTypes";

export type UserStatus = "active" | "suspend";

export interface AdminUser {
  userId: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  status: UserStatus;
  isVerified: boolean;
  createdAt: string;
  isPresenter?: boolean;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newToday: number;
  newThisMonth: number;
}

export interface UsersListMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetUsersParams {
  search?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export interface SuspendUserPayload {
  id: string;
  reason: string;
}

export interface TogglePresenterPayload {
  id: string;
  isPresenter: boolean;
}

export type GetUserStatsResponse = ApiResponse<UserStats>;

export interface GetUsersResponse extends ApiResponse<AdminUser[]> {
  meta: UsersListMeta;
}
