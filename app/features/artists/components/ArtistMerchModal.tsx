import { ModalShell } from "@/app/components/common/ModalSeel";

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

export function ArtistMerchModal({
  isOpen,
  artist,
  onClose,
}: ArtistMerchModalProps) {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3.06164 15.1933L3.42688 13.1219C3.85856 10.6736 4.0744 9.44952 4.92914 8.72476C5.78389 8 7.01171 8 9.46734 8H14.5327C16.9883 8 18.2161 8 19.0709 8.72476C19.9256 9.44952 20.1414 10.6736 20.5731 13.1219L20.9384 15.1933C21.5357 18.5811 21.8344 20.275 20.9147 21.3875C19.995 22.5 18.2959 22.5 14.8979 22.5H9.1021C5.70406 22.5 4.00504 22.5 3.08533 21.3875C2.16562 20.275 2.4643 18.5811 3.06164 15.1933Z"
                stroke="#E5B54F"
                strokeWidth="1.5"
              />
              <path
                d="M7.5 8L7.66782 5.98618C7.85558 3.73306 9.73907 2 12 2C14.2609 2 16.1444 3.73306 16.3322 5.98618L16.5 8"
                stroke="#E5B54F"
                strokeWidth="1.5"
              />
              <path
                d="M15 11C14.87 12.4131 13.5657 13.5 12 13.5C10.4343 13.5 9.13002 12.4131 9 11"
                stroke="#E5B54F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div>
            <p className="text-base md:text-lg font-medium font-inter leading-7 text-black">
              {artist.name} — Merch Catalog
            </p>
            <p className="text-sm font-normal leading-5 text-[#E6A400] font-inter">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M1.58496 3.71997L5.99996 6.27497L10.385 3.73497"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 10.805V6.27002"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.96507 1.2399L2.29507 2.7199C1.69007 3.0549 1.19507 3.8949 1.19507 4.5849V7.4099C1.19507 8.0999 1.69007 8.9399 2.29507 9.2749L4.96507 10.7599C5.53507 11.0749 6.47007 11.0749 7.04007 10.7599L9.71007 9.2749C10.3151 8.9399 10.8101 8.0999 10.8101 7.4099V4.5849C10.8101 3.8949 10.3151 3.0549 9.71007 2.7199L7.04007 1.2349C6.46507 0.919896 5.53507 0.919896 4.96507 1.2399Z"
                        stroke="white"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                  <span
                    className={`text-xs font-medium font-inter px-4 py-1 rounded-[6px] ${
                      p.status === "Live"
                        ? "bg-[#B5D3C1] text-[#09633F]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModalShell>
  );
}
