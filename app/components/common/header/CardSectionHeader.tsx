import CommonHeader from "./CommonHeader";

interface SectionHeaderProps {
  title: string | number;
  description?: string;
  className?: string;
  desClassName?: string;
  size?: "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  desSize?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl";

  direction?: "col" | "col-reverse";
}

const CardSectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  desClassName = "text-[#624D3B]!",
  className = "text-[#3D2513]!",
  size = "lg",
  desSize = "sm",
  direction = "col",
}) => {
  return (
    <div
      className={`flex pb-4.5  ${
        direction === "col" ? "flex-col gap-.5" : "flex-col-reverse"
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

export default CardSectionHeader;
