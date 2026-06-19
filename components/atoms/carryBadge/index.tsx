import CustomImage from "@/components/molecules/customImage";
import { cn } from "@/lib/utils";

interface CarryBadgeProps {
  image: string;
  text: string;
  width: number;
  height: number;
  isCarry?: boolean;
}

const CarryBadge: React.FC<CarryBadgeProps> = ({
  width = 51,
  height = 51,
  image,
  text,
  isCarry,
}) => {
  return (
    <figure
      className={cn(
        "flex flex-col gap-2 items-center border rounded-lg px-1 py-3 md:p-3",
        isCarry
          ? "border-primary-200 bg-primary-100"
          : "border-red-200 bg-red-100"
      )}
    >
      <CustomImage
        src={image}
        width={width}
        height={height}
        alt=""
        aria-hidden="true"
        className="text-primary"
      />
      <figcaption className="text-xs font-semibold text-center">
        {text}
      </figcaption>
    </figure>
  );
};

export default CarryBadge;
