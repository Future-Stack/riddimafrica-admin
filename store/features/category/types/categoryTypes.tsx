import { ApiResponse } from "../../auth/types/authTypes";

export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface Category {
  categoryId: string;
  title: string;
  description: string;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
  products: number;
}

export interface CreateCategoryPayload {
  title: string;
  description: string;
  status: CategoryStatus;
}

export type UpdateCategoryPayload = Partial<CreateCategoryPayload>;

export type GetCategoriesResponse = ApiResponse<Category[]>;
export type GetCategoryByIdResponse = ApiResponse<Category>;
