import { ApiResponse } from "../../auth/types/authTypes";

export interface BusinessType {
  businessTypeId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBusinessTypePayload {
  title: string;
}

export type UpdateBusinessTypePayload = Partial<CreateBusinessTypePayload>;

export type GetBusinessTypesResponse = ApiResponse<BusinessType[]>;
export type GetBusinessTypeByIdResponse = ApiResponse<BusinessType>;
