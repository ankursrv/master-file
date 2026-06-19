"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import CustomImage from "@/components/molecules/customImage";

interface ComparisonRow {
  label: string;
  rocksport?: boolean;
  otherSchools?: boolean;
}

interface ComparisonRehProps {
  title?: string;
  pointsLabel?: string;
  rocksportLabel?: string;
  otherLabel?: string;
  rows?: ComparisonRow[];
}

const defaultRows: ComparisonRow[] = [
  { label: "Monitoring of Kids" },
  { label: "Gaining Self Confidence" },
  { label: "No chance of Substance Abuse" },
  { label: "Nutritious & Hygienic Meals" },
  { label: "No Junk Food" },
  { label: "Sleeping and Waking on Time" },
  { label: "Morning Exercises" },
  { label: "Sightseeing", otherSchools: true },
  { label: "Less time spent on bus" },
  { label: "Interaction with Natives" },
  { label: "Greater contribution to Environment" },
  { label: "Learning to handle Emergencies" },
  { label: "Less risk of Injury", otherSchools: true },
  { label: "Less Free Time" },
  { label: "Performing Activities" },
  { label: "New Skills Learning" },
  { label: "Moral Education" },
  { label: "Low Student to Instructor ratio" },
  { label: "Affordable Cost", otherSchools: true },
];

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 0C5.38327 0 0 5.38327 0 12C0 18.6167 5.38327 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38327 18.6167 0 12 0ZM18.2452 7.97827L10.4913 17.209C10.4063 17.3103 10.3005 17.3922 10.181 17.449C10.0616 17.5059 9.9313 17.5364 9.79904 17.5385H9.78346C9.65408 17.5384 9.52615 17.5112 9.40798 17.4585C9.2898 17.4058 9.18402 17.3289 9.0975 17.2327L5.77442 13.5404C5.69003 13.4509 5.62438 13.3454 5.58133 13.2301C5.53828 13.1149 5.51871 12.9922 5.52375 12.8693C5.5288 12.7464 5.55836 12.6257 5.61071 12.5144C5.66306 12.403 5.73713 12.3033 5.82858 12.221C5.92003 12.1387 6.027 12.0755 6.14321 12.0352C6.25943 11.9948 6.38254 11.9781 6.50531 11.986C6.62808 11.9939 6.74803 12.0262 6.85811 12.0812C6.9682 12.1361 7.0662 12.2124 7.14635 12.3058L9.75923 15.2088L16.8317 6.79096C16.9904 6.60755 17.2148 6.49393 17.4566 6.47466C17.6983 6.4554 17.9379 6.53204 18.1236 6.68802C18.3093 6.844 18.4261 7.06678 18.4489 7.30822C18.4716 7.54966 18.3985 7.79035 18.2452 7.97827Z"
      fill="#F26727"
    />
  </svg>
);

const CrossIcon = ({ className }: { className?: string }) => (
  <>
    {/* Desktop Icon */}
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("hidden lg:block", className)}
    >
      <path
        d="M12 0C5.38327 0 0 5.38327 0 12C0 18.6167 5.38327 24 12 24C18.6167 24 24 18.6167 24 12C24 5.38327 18.6167 0 12 0ZM18.2452 7.97827L10.4913 17.209C10.4063 17.3103 10.3005 17.3922 10.181 17.449C10.0616 17.5059 9.9313 17.5364 9.79904 17.5385H9.78346C9.65408 17.5384 9.52615 17.5112 9.40798 17.4585C9.2898 17.4058 9.18402 17.3289 9.0975 17.2327L5.77442 13.5404C5.69003 13.4509 5.62438 13.3454 5.58133 13.2301C5.53828 13.1149 5.51871 12.9922 5.52375 12.8693C5.5288 12.7464 5.55836 12.6257 5.61071 12.5144C5.66306 12.403 5.73713 12.3033 5.82858 12.221C5.92003 12.1387 6.027 12.0755 6.14321 12.0352C6.25943 11.9948 6.38254 11.9781 6.50531 11.986C6.62808 11.9939 6.74803 12.0262 6.85811 12.0812C6.9682 12.1361 7.0662 12.2124 7.14635 12.3058L9.75923 15.2088L16.8317 6.79096C16.9904 6.60755 17.2148 6.49393 17.4566 6.47466C17.6983 6.4554 17.9379 6.53204 18.1236 6.68802C18.3093 6.844 18.4261 7.06678 18.4489 7.30822C18.4716 7.54966 18.3985 7.79035 18.2452 7.97827Z"
        fill="white"
      />
      <rect
        width="16"
        height="13"
        transform="translate(3.66797 6)"
        fill="white"
      />
      <g clipPath="url(#clip0_2003_17773)">
        <path
          d="M15.168 8.5L8.16797 15.5"
          stroke="#111111"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.16797 8.5L15.168 15.5"
          stroke="#111111"
          strokeWidth="1.16667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2003_17773">
          <rect
            width="14"
            height="14"
            fill="white"
            transform="translate(4.66797 5)"
          />
        </clipPath>
      </defs>
    </svg>
    {/* Mobile Icon */}
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block lg:hidden", className)}
    >
      <path
        d="M10 0C4.48606 0 0 4.48606 0 10C0 15.5139 4.48606 20 10 20C15.5139 20 20 15.5139 20 10C20 4.48606 15.5139 0 10 0ZM15.2043 6.64856L8.74279 14.3409C8.67191 14.4253 8.58371 14.4935 8.48418 14.5409C8.38464 14.5882 8.27608 14.6136 8.16587 14.6154H8.15288C8.04507 14.6153 7.93846 14.5926 7.83998 14.5487C7.7415 14.5048 7.65335 14.4407 7.58125 14.3606L4.81202 11.2837C4.74169 11.2091 4.68698 11.1212 4.65111 11.0251C4.61524 10.9291 4.59892 10.8268 4.60313 10.7244C4.60733 10.622 4.63197 10.5214 4.67559 10.4286C4.71922 10.3359 4.78094 10.2527 4.85715 10.1842C4.93335 10.1156 5.0225 10.0629 5.11935 10.0293C5.21619 9.99567 5.31878 9.98173 5.42109 9.98831C5.5234 9.9949 5.62336 10.0219 5.7151 10.0676C5.80683 10.1134 5.8885 10.177 5.95529 10.2548L8.13269 12.674L14.0264 5.65913C14.1586 5.50629 14.3457 5.4116 14.5471 5.39555C14.7486 5.3795 14.9483 5.44337 15.103 5.57335C15.2577 5.70333 15.3551 5.88899 15.3741 6.09018C15.393 6.29138 15.3321 6.49196 15.2043 6.64856Z"
        fill="#111111"
      />
      <rect
        width="13.3333"
        height="10.8333"
        transform="translate(3.05469 5)"
        fill="#111111"
      />
      <g clipPath="url(#clip0_2048_43258)">
        <path
          d="M12.6419 7.08301L6.80859 12.9163"
          stroke="white"
          strokeWidth="0.972222"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.80859 7.08301L12.6419 12.9163"
          stroke="white"
          strokeWidth="0.972222"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2048_43258">
          <rect
            width="11.6667"
            height="11.6667"
            fill="white"
            transform="translate(3.89062 4.1665)"
          />
        </clipPath>
      </defs>
    </svg>
  </>
);

const ComparisonReh = ({
  title = "Rocksport Programs vs Ordinary Programs",
  pointsLabel = "Comparison Points",
  rocksportLabel = "Rocksport Program",
  otherLabel = "Other Schools",
  rows = defaultRows,
}: ComparisonRehProps) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="relative bg-[#242021] py-10 md:py-20">
      {/* Top torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-6.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="bg-white absolute inset-x-0 top-0 z-0 w-full lg:h-[88px] select-none pointer-events-none"
      />
      {/* Bottom torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-4.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="bg-white absolute inset-x-0 bottom-0 z-0 w-full lg:h-[88px] select-none pointer-events-none"
      />
      <div className="container py-8 lg:py-20">
        {/* Heading */}
        <h2 className="mx-auto max-w-160 text-center text-[28px]! md:text-4xxl! text-white! uppercase">
          {title}
        </h2>

        {/* Table Container */}
        <div className="mt-8 md:mt-15 py-3 md:p-6 bg-[#302B2C] overflow-hidden rounded-xl border border-white/60 shadow-[0px_4px_12px_0px_#0000001F]">
          {/* Header row */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr]">
            <div className="flex items-center p-3 md:px-4 md:py-5 border-b border-white/[12%]">
              <span className="text-[13px] md:text-2xl font-bold leading-120 text-white">
                {pointsLabel}
              </span>
            </div>
            <div className="flex items-center justify-center p-3 md:px-4 md:py-5 border-b border-white bg-primary rounded-t-xl">
              <span className="text-[13px] md:text-2xl font-bold leading-120 text-white text-center">
                {rocksportLabel}
              </span>
            </div>
            <div className="flex items-center justify-center p-3 md:px-4 md:py-5 border-b border-white/[12%]">
              <span className="text-[13px] md:text-2xl font-bold leading-120 text-white text-center">
                {otherLabel}
              </span>
            </div>
          </div>

          {/* Body rows */}
          {rows.map((row, index) => {
            const rocksport = row.rocksport ?? true;

            const isLastVisibleMobile = !showAll && index === 6;
            const isAbsolutelyLast = index === rows.length - 1;

            return (
              <div
                key={index}
                className={cn(
                  "grid grid-cols-[1.4fr_1fr_1fr] items-stretch",
                  !showAll && index > 6 && "hidden lg:grid"
                )}
              >
                {/* Label */}
                <div
                  className={cn(
                    "flex items-center p-3 md:px-4 md:py-5",
                    isAbsolutelyLast
                      ? "border-b-0"
                      : "border-b border-white/[12%]",
                    isLastVisibleMobile && "border-b-0 lg:border-b"
                  )}
                >
                  <span className="text-xs md:text-xl leading-120 font-medium text-white/90">
                    {row.label}
                  </span>
                </div>

                {/* Rocksport — continuous orange column */}
                <div
                  className={cn(
                    "flex items-center justify-center bg-primary py-3",
                    isAbsolutelyLast
                      ? "rounded-b-xl border-b-0 border-white"
                      : "border-b border-white",
                    isLastVisibleMobile &&
                      "rounded-b-xl border-b-0 lg:rounded-b-none lg:border-b"
                  )}
                >
                  {rocksport ? <CheckIcon /> : <CrossIcon />}
                </div>

                {/* Other schools */}
                <div
                  className={cn(
                    "flex items-center justify-center p-3 md:px-4 md:py-5",
                    isAbsolutelyLast
                      ? "border-b-0"
                      : "border-b border-white/[12%]",
                    isLastVisibleMobile && "border-b-0 lg:border-b"
                  )}
                >
                  {row.otherSchools ? <CheckIcon /> : <CrossIcon />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Load More Button */}
        {!showAll && rows.length > 7 && (
          <div className="mt-8 flex lg:hidden justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="rounded-xl border border-primary px-8 py-3 text-sm md:text-base font-bold text-white transition-colors hover:bg-primary/10 cursor-pointer"
            >
              LOAD MORE
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ComparisonReh;
