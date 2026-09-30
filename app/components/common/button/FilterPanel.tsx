import type { ReactNode } from "react";

import CommonHeader from "../header/CommonHeader";

interface FilterPanelProps {
  children: ReactNode;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ children }) => {
  return (
    <div className="absolute right-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border border-[#E8DCC8] rounded-xl shadow-lg p-4 z-20">
      <CommonHeader size="md" className="text-[#3D2513]! font-semibold mb-3">
        Filters
      </CommonHeader>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default FilterPanel;
