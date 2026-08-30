interface CardContainerProps extends React.HTMLAttributes<HTMLHeadingElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<
  NonNullable<CardContainerProps["size"]>,
  { padding: string; rounded: string; shadow?: string }
> = {
  xs: { padding: "p-2 sm:p-3", rounded: "rounded-xl" },
  sm: { padding: "p-3 sm:p-4", rounded: "rounded-2xl" },
  md: { padding: "p-4 sm:p-5", rounded: "rounded-[14px]" },
  lg: { padding: "p-5 sm:p-6", rounded: "rounded-[14px]" },
  xl: { padding: "p-6 sm:p-7", rounded: "rounded-[14px]" },
  "2xl": { padding: "p-7 sm:p-8", rounded: "rounded-[14px]" },
  "3xl": {
    padding: "p-8 sm:p-9",
    rounded: "rounded-[16px]",
    shadow: "shadow-[0_4px_18px_0_rgba(230,164,0,0.08)] ",
  },
  "4xl": { padding: "p-10 sm:p-11", rounded: "rounded-[5rem]" },
};

const CardContainer: React.FC<CardContainerProps> = ({
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const { padding, rounded, shadow } = sizeClasses[size];

  return (
    <div
      {...props}
      className={`w-full bg-[#FAF7F3] border border-[#C4CDD5]/30  ${padding} ${rounded} ${shadow}  ${className}`}
    >
      {children}
    </div>
  );
};

export default CardContainer;
