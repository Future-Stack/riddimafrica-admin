import StatusBadge from "@/app/components/common/button/StatusBadge";
import ModalShell from "@/app/components/common/ModalSeel";
import { Package, ShoppingBag } from "lucide-react";

export interface MerchProduct {
  id: number;
  name: string;
  category: string;
  priceUGX: number;
  stock: number;
  sold: number;
  status: "Live" | "Draft";
}

export interface ArtistMerchData {
  id: number;
  name: string;
  stageName: string;
  products: MerchProduct[];
}

interface ArtistMerchModalProps {
  isOpen: boolean;
  artist: ArtistMerchData | null;
  onClose: () => void;
}

const SummaryStat: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="">
    <p className="text-sm font-medium leading-6 text-gray mb-6">{label}</p>
    <p className="text-lg font-medium font-inter  text-black leading-7">
      {value}
    </p>
  </div>
);

export const ArtistMerchModal = ({
  isOpen,
  artist,
  onClose,
}: ArtistMerchModalProps) => {
  if (!isOpen || !artist) return null;

  const totalItems = artist.products.length;
  const unitsSold = artist.products.reduce((sum, p) => sum + p.sold, 0);
  const inStock = artist.products.reduce((sum, p) => sum + p.stock, 0);
  const liveCount = artist.products.filter((p) => p.status === "Live").length;

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      maxWidthClassName="max-w-[768px]"
      roundedClassName="rounded-2xl"
      header={
        <div className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-lg bg-[#E6A4001A] flex items-center justify-center text-[#C9A96C]">
            <ShoppingBag size={24} className="text-[#E5B54F]" />
          </span>
          <div>
            <p className="text-base md:text-lg font-medium font-inter leading-7 text-black">
              {artist.name} — Merch Catalog
            </p>
            <p className="text-sm font-normal leading-5 text-yellow font-inter">
              {String(totalItems).padStart(2, "0")} items listed
            </p>
          </div>
        </div>
      }
    >
      <div className="grid grid-cols-4 gap-10 bg-[#F9F5EF]  rounded-xl p-6 mb-6">
        <SummaryStat label="Total Items" value={totalItems} />
        <SummaryStat label="Units Sold" value={unitsSold} />
        <SummaryStat label="In Stock" value={inStock} />
        <SummaryStat label="Live" value={String(liveCount).padStart(2, "0")} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-sm text-[#787A7F] font-inter leading-6 border-b border-green-100">
              <th className="font-medium py-2">Product</th>
              <th className="font-medium py-2">Category</th>
              <th className="font-medium py-2">Price</th>
              <th className="font-medium py-2">Stock</th>
              <th className="font-medium py-2">Sold</th>
              <th className="font-medium py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {artist.products.map((p) => (
              <tr
                key={p.id}
                className="border-b border-green-100 last:border-0"
              >
                <td className="py-3 flex items-center gap-2 text-black font-inter leading-6 font-medium">
                  <span className="w-6 h-6 rounded bg-[#E6A400] flex items-center justify-center text-sm font-medium leading-5">
                    <Package size={12} className="text-white" />
                  </span>
                  {p.name}
                </td>
                <td className="py-3">
                  <span className="text-xs font-bold leading-4.5 px-3 py-1.5 rounded-md bg-[#6F2C57] text-white">
                    {p.category}
                  </span>
                </td>
                <td className="py-3 text-black text-sm font-medium font-inter leading-4.5">
                  UGX {p.priceUGX.toLocaleString()}
                </td>
                <td className="py-3 text-black text-sm font-medium font-inter leading-4.5">
                  {p.stock}
                </td>
                <td className="py-3 text-[#F5A623] text-sm font-medium font-inter leading-4.5">
                  {p.sold}
                </td>
                <td className="py-3">
                  <StatusBadge status={p.status} round="round" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalShell>
  );
};
