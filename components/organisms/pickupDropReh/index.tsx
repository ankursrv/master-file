import React from "react";
import CustomImage from "@/components/molecules/customImage";

interface ScheduleDetails {
  date: string;
  time: string;
}

interface PickupDropRehProps {
  title?: string;
  description?: string;
  image?: string;
  departureLabel?: string;
  arrivalLabel?: string;
  departure?: ScheduleDetails;
  arrival?: ScheduleDetails;
}

const iconBase = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full h-full object-cover"
  >
    <path
      d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 4C9.73478 4 9.48043 4.10536 9.29289 4.29289C9.10536 4.48043 9 4.73478 9 5V10C9.00005 10.2652 9.10545 10.5195 9.293 10.707L12.293 13.707C12.4816 13.8892 12.7342 13.9899 12.9964 13.9877C13.2586 13.9854 13.5094 13.8802 13.6948 13.6948C13.8802 13.5094 13.9854 13.2586 13.9877 12.9964C13.9899 12.7342 13.8892 12.4816 13.707 12.293L11 9.586V5C11 4.73478 10.8946 4.48043 10.7071 4.29289C10.5196 4.10536 10.2652 4 10 4Z"
      fill="currentColor"
    />
  </svg>
);

const FlagIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full h-full object-cover"
  >
    <path
      d="M5.75 1.00049C6.16421 1.00049 6.5 1.33628 6.5 1.75049V3.60049L8.22067 3.25636C9.8712 2.92625 11.5821 3.08333 13.1449 3.70846L13.3486 3.78992C14.9097 4.41438 16.628 4.531 18.2592 4.12319C19.0165 3.93388 19.75 4.50662 19.75 5.28718V12.6542C19.75 13.2985 19.3115 13.8601 18.6864 14.0164L18.472 14.07C16.7024 14.5124 14.8385 14.3859 13.1449 13.7085C11.5821 13.0833 9.8712 12.9263 8.22067 13.2564L6.5 13.6005V21.7505C6.5 22.1647 6.16421 22.5005 5.75 22.5005C5.33579 22.5005 5 22.1647 5 21.7505V1.75049C5 1.33628 5.33579 1.00049 5.75 1.00049Z"
      fill="currentColor"
    />
  </svg>
);

const ClockOutlineIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-full h-full object-cover"
  >
    <g clipPath="url(#clip0_2049_12143)">
      <path
        d="M2.5 10C2.5 10.9849 2.69399 11.9602 3.0709 12.8701C3.44781 13.7801 4.00026 14.6069 4.6967 15.3033C5.39314 15.9997 6.21993 16.5522 7.12987 16.9291C8.03982 17.306 9.01509 17.5 10 17.5C10.9849 17.5 11.9602 17.306 12.8701 16.9291C13.7801 16.5522 14.6069 15.9997 15.3033 15.3033C15.9997 14.6069 16.5522 13.7801 16.9291 12.8701C17.306 11.9602 17.5 10.9849 17.5 10C17.5 8.01088 16.7098 6.10322 15.3033 4.6967C13.8968 3.29018 11.9891 2.5 10 2.5C8.01088 2.5 6.10322 3.29018 4.6967 4.6967C3.29018 6.10322 2.5 8.01088 2.5 10Z"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5.83301V9.99967L12.5 12.4997"
        stroke="white"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2049_12143">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const CalendarIcon = () => (
  <svg {...iconBase} className="w-full h-full object-cover">
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v4M16 3v4" />
  </svg>
);

const ScheduleRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <span className="shrink-0 text-white overflow-hidden size-5">{icon}</span>
    <div>
      <p className="text-xs md:text-lg font-semibold leading-120 text-white">
        {label}
      </p>
      <p className="text-xs md:text-base leading-120 text-white/80 mt-1">
        {value}
      </p>
    </div>
  </div>
);

const ScheduleCard = ({
  icon,
  label,
  dateLabel,
  timeLabel,
  details,
}: {
  icon: React.ReactNode;
  label: string;
  dateLabel: string;
  timeLabel: string;
  details: ScheduleDetails;
}) => (
  <div className="flex-1 rounded-2xl border-2 border-white/40 bg-dark-300/60 px-3 py-[14px] md:px-4 md:py-5 backdrop-blur-[12px]">
    <div className="flex items-center gap-3 border-b border-[#D9D9D933] pb-4">
      <span className="size-5 md:size-6 shrink-0 text-primary overflow-hidden">
        {icon}
      </span>
      <span className="font-bold text-white text-base md:text-2xl leading-120">
        {label}
      </span>
    </div>
    <div className="mt-4 md:mt-5 space-y-4">
      <ScheduleRow
        icon={<CalendarIcon />}
        label={dateLabel}
        value={details.date}
      />
      <ScheduleRow
        icon={<ClockOutlineIcon />}
        label={timeLabel}
        value={details.time}
      />
    </div>
  </div>
);

const PickupDropReh = ({
  title = "Pick Up and Drop",
  description = "Check out Departure and Arrival Times here",
  image = "/images/rocksport-reh/pickup.webp",
  departureLabel = "Departure",
  arrivalLabel = "Arrival",
  departure = { date: "May 27, 2026", time: "5:00 AM" },
  arrival = { date: "May 27, 2026", time: "5:00 AM" },
}: PickupDropRehProps) => {
  return (
    <section className="bg-image2 py-10 md:py-20">
      <div className="container">
        <div className="relative rounded-lg md:rounded-3xl overflow-hidden bg-[linear-gradient(270deg,_#5683C5_0%,_#5682C4_22.19%,_#567DC5_48.56%,_#4670AD_74.61%,_#4368A7_100%)] md:bg-none">
          {/* Background photo (Desktop) */}
          <CustomImage
            src={image}
            alt={title}
            fill
            className="hidden md:block object-cover object-center"
          />

          {/* Background photo (Mobile) */}
          <CustomImage
            src="/images/rocksport-reh/pickup-mobile.webp"
            alt={title}
            fill
            className="md:hidden object-cover object-bottom z-[5]"
          />

          {/* Left-to-right dark overlay for text legibility (Desktop) */}
          <div className="hidden md:block absolute inset-0 bg-[linear-gradient(-90deg,_rgba(17,17,17,0)_0%,_rgba(17,17,17,0.8)_100%)] lg:w-[548px]" />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-8 px-4 pt-6 md:pb-6 lg:p-15 lg:max-w-[640px] h-[606px] md:h-auto">
            <div>
              <h2 className="uppercase text-white!">{title}</h2>
              <p className="mt-4 text-base md:text-xl font-medium leading-150 text-white">
                {description}
              </p>
            </div>

            <div className="flex gap-2 md:gap-4">
              <ScheduleCard
                icon={<ClockIcon />}
                label={departureLabel}
                dateLabel="Departure Date:"
                timeLabel="Departure Time:"
                details={departure}
              />
              <ScheduleCard
                icon={<FlagIcon />}
                label={arrivalLabel}
                dateLabel="Arrival Date:"
                timeLabel="Arrival Time:"
                details={arrival}
              />
            </div>
          </div>

          {/* Decorative mountain peak (bottom-right) */}

          <svg
            className="pointer-events-none absolute bottom-0 -right-[54px] md:right-0 z-20"
            width="288"
            height="92"
            viewBox="0 0 288 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.164715 100.285C0.164715 102.069 0.164683 110.168 0.328808 113.246C0.328808 114.122 0.803373 114.94 1.53832 115.453C2.0268 115.794 2.62992 116 3.28531 116H318.811C320.289 116 321.604 114.866 321.767 113.246C321.932 110.168 322.096 102.067 321.932 100.285C321.932 98.9895 321.275 97.693 320.125 96.7208L284.483 67.2341L266.744 78.7376L212.048 23.9779L199.894 35.9664L160.802 0L121.874 35.9663L109.719 23.9779L55.6813 78.2514L37.4495 67.3965L1.80706 96.8832C0.821196 97.693 0.164681 98.989 0 100.447L0.164715 100.285Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default PickupDropReh;
