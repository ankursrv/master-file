import React from "react";
import { cn } from "@/lib/utils";

interface BookingIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const StepIcon = ({ step }: { step: number }) => {
  const className = "size-5 md:size-[22px] text-primary";

  if (step === 1) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2099_53338)">
          <path
            d="M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H14C15.0609 15 16.0783 15.4214 16.8284 16.1716C17.5786 16.9217 18 17.9391 18 19V21"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_2099_53338">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  if (step === 2) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M12 2 4 5v6c0 5 3.5 9.3 8 11 4.5-1.7 8-6 8-11V5l-8-3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (step === 3) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M8 14c1.5 0 1.5-2 3-2s1.5 2 3 2 1.5-2 3-2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (step === 4) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="7"
          y="3"
          width="10"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M10 7h4M10 11h4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (step === 5) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="2"
          y="6"
          width="20"
          height="13"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <path
          d="M2 10h20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M6 15h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v6h6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M8 14c1.5 0 1.5-2 3-2s1.5 2 3 2 1.5-2 3-2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
};

const stepTitles: Record<number, string> = {
  1: "Participant Details",
  2: "Guardian Details",
  3: "Consent & Indemnity",
  4: "Mobile verification",
  5: "Payment",
};

const BookingIndicator = ({
  currentStep,
  totalSteps = 5,
}: BookingIndicatorProps) => {
  const safeStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const progressPct = (safeStep / totalSteps) * 100;
  const title = stepTitles[safeStep] ?? "";

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-white">
          <StepIcon step={safeStep} />
          <span className="text-sm md:text-[20px] font-semibold">{title}</span>
        </div>
        <span className="text-sm md:text-[20px] font-semibold text-white">
          Step {safeStep} / {totalSteps}
        </span>
      </div>

      <div
        className={cn(
          "relative h-[6px] w-full rounded-full overflow-hidden booking-progress-track"
        )}
      >
        <div
          className="absolute inset-y-0 left-0 booking-progress-fill rounded-full"
          style={{ width: `${progressPct}%` }}
          role="progressbar"
          aria-valuenow={safeStep}
          aria-valuemin={0}
          aria-valuemax={totalSteps}
        />
      </div>
    </div>
  );
};

export default BookingIndicator;
