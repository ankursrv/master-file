"use client";
import Icons from "@/components/atoms/icons";
import { Button } from "../button";
import useIsMobile from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";

interface TripDateCardProps {
  ctaText?: string;
  tripDate?: string;
  pricePerHead?: number;
}

function formatTripDate(iso?: string): string {
  if (!iso) return "15 JAN 2026";
  return new Date(iso)
    .toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
}

const TripDateCard = ({
  ctaText,
  tripDate,
  pricePerHead,
}: TripDateCardProps) => {
  const isMobile = useIsMobile();

  const displayDate = formatTripDate(tripDate);
  const displayPrice =
    pricePerHead !== undefined
      ? `₹${pricePerHead.toLocaleString("en-IN")}`
      : "₹1,900";

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 backdrop-blur-[14px] border border-white/20 rounded-md w-full gap-4 md:gap-0">
      <div className="flex flex-row md:flex-col items-center md:items-start md:gap-4">
        <div className="flex items-center gap-4">
          <Icons.CalenderIcon />
          <p className="md:text-2xl md:leading-120 font-semibold text-white whitespace-nowrap">
            TRIP DATE
          </p>
        </div>
        <span className="inline-block sm:hidden text-white mx-1.5">:</span>
        <p className="text-xl md:text-[32px] leading-120 font-black text-white font-nexa">
          {displayDate}
        </p>
      </div>

      <div
        className={cn(isMobile && "flex items-center justify-between w-full")}
      >
        {isMobile && (
          <div className="flex flex-col">
            <span className="inline-block text-white text-sm font-normal">
              Price per Head
            </span>
            <span className="inline-block text-white font-bold text-2xl leading-none">
              {displayPrice}
            </span>
          </div>
        )}
        <Button
          variant="heroBtn"
          icon={<Icons.arrowRight />}
          onClick={() => {
            document
              .getElementById("booking-form")
              ?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
        >
          {ctaText ?? "Book Now"}
        </Button>
      </div>
    </div>
  );
};

export default TripDateCard;
