"use client";

import {
  collectionAPI,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useGetCollectionsQuery,
  useUpdateCollectionMutation,
} from "@/store/features/collection/collectionAPI";
import type { Collection } from "@/store/features/collection/types/collectionTypes";
import { useAppDispatch } from "@/store/hooks";
import { useMemo, useState } from "react";
import { CollectionCard, CollectionCardData } from "./CollectionCard";
import { CollectionFormModal, CollectionFormValues } from "./CollectionModal";

const COLLECTIONS_QUERY = { page: 1, limit: 100 } as const;

const toCollectionCard = (collection: Collection): CollectionCardData => ({
  id: collection.collectionId,
  name: collection.title,
  description: collection.description ?? "",
  active: collection.status === "ACTIVE",
  productAvatars: [],
  productCount: collection.productCount ?? 0,
});

const toPayload = (values: CollectionFormValues) => ({
  title: values.name,
  description: values.description,
  active: values.active,
});

export const CollectionTab = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetCollectionsQuery(COLLECTIONS_QUERY);
  const [createCollection] = useCreateCollectionMutation();
  const [updateCollection] = useUpdateCollectionMutation();
  const [deleteCollection] = useDeleteCollectionMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editTarget, setEditTarget] = useState<CollectionCardData | null>(null);
  const [formDefaults, setFormDefaults] = useState<
    CollectionFormValues | undefined
  >(undefined);

  const collections = useMemo(
    () => (data?.data?.collections ?? []).map(toCollectionCard),
    [data],
  );

  const activeCount = data?.data?.stats?.active ?? collections.filter((c) => c.active).length;
  const inactiveCount =
    data?.data?.stats?.inactive ?? collections.filter((c) => !c.active).length;

  const handleToggleActive = async (id: string, value: boolean) => {
    const patch = dispatch(
      collectionAPI.util.updateQueryData(
        "getCollections",
        COLLECTIONS_QUERY,
        (draft) => {
          const collection = draft.data?.collections?.find(
            (item) => item.collectionId === id,
          );
          if (!collection) return;

          const wasActive = collection.status === "ACTIVE";
          collection.status = value ? "ACTIVE" : "INACTIVE";

          if (draft.data?.stats && wasActive !== value) {
            draft.data.stats.active += value ? 1 : -1;
            draft.data.stats.inactive += value ? -1 : 1;
          }
        },
      ),
    );

    try {
      await updateCollection({
        id,
        data: { active: value },
      }).unwrap();
    } catch {
      patch.undo();
    }
  };

  const handleOpenAdd = () => {
    setModalMode("add");
    setEditTarget(null);
    setFormDefaults(undefined);
    setModalOpen(true);
  };

  const handleOpenEdit = (collection: CollectionCardData) => {
    setModalMode("edit");
    setEditTarget(collection);
    setFormDefaults({
      name: collection.name,
      description: collection.description,
      active: collection.active,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const patch = dispatch(
      collectionAPI.util.updateQueryData(
        "getCollections",
        COLLECTIONS_QUERY,
        (draft) => {
          const collection = draft.data?.collections?.find(
            (item) => item.collectionId === id,
          );
          if (!draft.data?.collections) return;

          draft.data.collections = draft.data.collections.filter(
            (item) => item.collectionId !== id,
          );

          if (collection && draft.data.stats) {
            if (collection.status === "ACTIVE") {
              draft.data.stats.active = Math.max(0, draft.data.stats.active - 1);
            } else {
              draft.data.stats.inactive = Math.max(
                0,
                draft.data.stats.inactive - 1,
              );
            }
          }
        },
      ),
    );

    try {
      await deleteCollection(id).unwrap();
    } catch {
      patch.undo();
    }
  };

  const handleSubmit = async (values: CollectionFormValues) => {
    const payload = toPayload(values);

    if (modalMode === "edit" && editTarget) {
      await updateCollection({ id: editTarget.id, data: payload }).unwrap();
      return;
    }

    await createCollection(payload).unwrap();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          {activeCount} active · {inactiveCount} inactive
        </p>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-5 py-3 rounded-lg bg-[#904238] text-white text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
        >
          + Create Collection
        </button>
      </div>

      {isLoading ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
          Loading collections...
        </div>
      ) : isError ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
          Unable to load collections.
        </div>
      ) : collections.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-xl p-10 text-center text-sm text-gray-400">
          No collections yet — create one to get started.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {collections.map((collection) => (
            <CollectionCard
              key={collection.id}
              collection={collection}
              onToggleActive={handleToggleActive}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      <CollectionFormModal
        isOpen={modalOpen}
        mode={modalMode}
        initialValues={formDefaults}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
