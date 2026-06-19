import { cn } from "@/lib/utils";
import CustomImage from "@/components/molecules/customImage";

interface Detail {
  label: string;
  value: string;
}

interface ScheduleInfoCardProps {
  type: "departure" | "arrival";
  /** Card heading — departure_card_title or arrival_card_title */
  title: string;
  /** Per-card background image — departure_bgimage_url or arrival_bgimage_url */
  bgImage?: string;
  details: Detail[];
  /** RDO: render pointer list without label prefixes */
  pointerOnly?: boolean;
  /** Width / layout class — lets the consumer (RIS vs RDO) control the card width */
  className?: string;
}

const ClockIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const FlagIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className="shrink-0"
  >
    <path d="M4 2a1 1 0 0 1 1 1v18a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1Z" />
    <path d="M6 3h12.2a.8.8 0 0 1 .64 1.28L16 8l2.84 3.72A.8.8 0 0 1 18.2 13H6V3Z" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="shrink-0 mt-0.5"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="8 12 11 15 16 9" />
  </svg>
);

const BusIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden
    className="shrink-0"
  >
    <path d="M8 6v6M16 6v6M4 10h16M6 18h2M16 18h2M4 14h16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4Z" />
    <path d="M6 10V8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
  </svg>
);

const ScheduleInfoCard = ({
  type,
  title,
  bgImage,
  details,
  pointerOnly = false,
  className = "lg:w-[249px]",
}: ScheduleInfoCardProps) => {
  const isDeparture = type === "departure";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl p-4 sm:p-5 flex flex-col gap-3 min-w-0 border-2 border-white/40 w-full",
        className
      )}
    >
      {/* Per-card background image */}
      {bgImage && (
        <div className="absolute inset-0 z-0">
          <CustomImage
            src={bgImage}
            fill
            alt=""
            aria-hidden="true"
            className="object-cover opacity-15"
          />
        </div>
      )}

      {/* Card heading with leading icon (clock / flag) */}
      <div
        className="relative z-10 text-white font-bold text-base sm:text-lg flex items-center gap-2 truncate"
        title={title}
      >
        <span className="text-white">
          {pointerOnly ? (
            isDeparture ? (
              <ClockIcon />
            ) : (
              <BusIcon />
            )
          ) : isDeparture ? (
            <ClockIcon />
          ) : (
            <FlagIcon />
          )}
        </span>
        <span className="truncate text-xl md:text-2xl">{title}</span>
      </div>

      {/* Detail rows — check-circle icon + "Label: Value" inline */}
      <ul className="relative z-10 flex flex-col gap-2">
        {details.map((detail, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-white text-sm sm:text-[15px] leading-snug"
          >
            <CheckCircleIcon />
            {pointerOnly || !detail.label ? (
              <span className="font-semibold">{detail.value}</span>
            ) : (
              <div className="flex gap-1 lg:gap-0 lg:flex-col">
                <span>{detail.label}:</span>{" "}
                <span className="font-semibold">{detail.value}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScheduleInfoCard;
