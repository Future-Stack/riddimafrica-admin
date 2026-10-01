import { ApiResponse } from "../../auth/types/authTypes";

export type CollectionStatus = "ACTIVE" | "INACTIVE";

export interface Collection {
  collectionId: string;
  title: string;
  description: string;
  status: CollectionStatus;
  productCount: number;
}

export interface CollectionStats {
  active: number;
  inactive: number;
}

export interface CollectionMeta {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
}

export interface CollectionsData {
  collections: Collection[];
  stats: CollectionStats;
  meta: CollectionMeta;
}

export interface GetCollectionsParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateCollectionPayload {
  title: string;
  description: string;
  active: boolean;
}

export type UpdateCollectionPayload = Partial<CreateCollectionPayload>;

export type GetCollectionsResponse = ApiResponse<CollectionsData>;
