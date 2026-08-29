import CommonHeader from "./CommonHeader";

interface SectionHeaderProps {
  title: string | number;
  description?: string;
  className?: string;
  desClassName?: string;
  size?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  desSize?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";

  direction?: "col" | "col-reverse";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  desClassName,
  className,
  size = "5xl",
  desSize = "md",
  direction = "col",
}) => {
  return (
    <div
      className={`flex ${
        direction === "col" ? "flex-col" : "flex-col-reverse"
      } ${className ?? ""}`}
    >
      <CommonHeader size={size} className={` ${className} `}>
        {title}
      </CommonHeader>

      {description && (
        <CommonHeader className={desClassName} size={desSize}>
          {description}
        </CommonHeader>
      )}
    </div>
  );
};

export default SectionHeader;
