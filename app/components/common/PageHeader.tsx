import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className = "",
}) => {
  return (
    <div className={className}>
      <h1 className="text-xl md:text-[26px] font-bold font-inter text-[#3D2513] leading-9 mb-2">
        {title}
      </h1>

      <p className="text-[#787A7F] text-xs font-medium font-inter leading-5">
        {description}
      </p>
    </div>
  );
};

export default PageHeader;
