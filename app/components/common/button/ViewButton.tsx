import { IoIosArrowRoundForward } from "react-icons/io";
interface ViewButtonProps {
  onClick: () => void;
  text: string;
  isIcon?: boolean;
}

const ViewButton: React.FC<ViewButtonProps> = ({
  onClick,
  text = "View",
  isIcon,
}) => {
  return (
    <button
      className="text-yellow text-xs hover:underline font-bold cursor-pointer flex items-center gap-1"
      onClick={onClick}
    >
      {text} {isIcon && <IoIosArrowRoundForward size={16} />}
    </button>
  );
};

export default ViewButton;
