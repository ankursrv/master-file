import { cn } from "@/lib/utils";
import CustomImage from "../customImage";
import ScheduleInfoCard from "@/components/atoms/scheduleInfoCard/scheduleInfoCard";

export interface scheduleDataItem {
  type: "departure" | "arrival";
  title: string;
  bgImage?: string;
  details: { label: string; value: string }[];
}

export interface EssentialItem {
  text: string;
  icon: string;
}

interface EssentialCardProps {
  title: string;
  data?: EssentialItem[];
  scheduleData?: scheduleDataItem[];
  imageSrc: string;
  sectionBgImage?: string;
  bgColor?: boolean;
  imagePosition?: string;
  carry?: boolean;
  variant?: "ris" | "rdo";
  /** RDO meeting point: bullet list without date labels */
  pointerOnly?: boolean;
}

const EssentialCard = ({
  title,
  data = [],
  scheduleData = [],
  imageSrc,
  sectionBgImage,
  bgColor,
  carry,
  variant = "ris",
  pointerOnly = false,
}: EssentialCardProps) => {
  const hasBgImage = !!sectionBgImage;

  // ── Carry card ─────────────────────────────────────────────────────────────
  if (carry) {
    return (
      <div
        className="relative overflow-hidden min-h-[621px] lg:min-h-[792px] bg-dark"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Content on top of full bg image — no tint, no gradient */}
        <div className="relative z-10 px-6 pt-10 lg:px-12 lg:pt-12">
          <h2 className="uppercase text-white mb-5 lg:mb-8">{title}</h2>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {data.map((item, index) => (
              <figure
                key={index}
                className="flex flex-col items-center justify-center border border-white/60 rounded-md p-2 gap-1 bg-dark/40 h-[88px] lg:h-[111px]"
              >
                <CustomImage
                  src={item.icon}
                  width={40}
                  height={40}
                  alt={item.text}
                  className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                />
                <figcaption className="text-white text-xs text-center leading-tight">
                  {item.text}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Pick & Drop card ───────────────────────────────────────────────────────
  return (
    <div
      className="relative overflow-hidden flex flex-col justify-between min-h-[400px] lg:min-h-[500px]"
      style={
        hasBgImage
          ? {
              backgroundImage: `url(${sectionBgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }
          : undefined
      }
    >
      {!hasBgImage && (
        <div
          className={cn(
            "absolute inset-0 z-0",
            bgColor ? "bg-primary" : "bg-dark"
          )}
        />
      )}

      <div className="px-6 pt-10 lg:px-12 lg:pt-12 relative z-10">
        <h2 className="uppercase text-white mb-5 lg:mb-10">{title}</h2>
        <div
          className={cn(
            "flex",
            variant === "rdo"
              ? "flex-wrap md:flex gap-6 md:max-w-[500px] pb-12 md:pb-0"
              : "flex-wrap md:flex gap-6"
          )}
        >
          {scheduleData.map((schedule, index) => (
            <ScheduleInfoCard
              key={index}
              type={schedule.type}
              title={schedule.title}
              details={schedule.details}
              pointerOnly={pointerOnly}
              className={variant === "rdo" ? "lg:w-[522px]" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EssentialCard;
