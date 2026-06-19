"use client";
import React, { ChangeEvent, useState } from "react";

import useIsMobile from "@/lib/useIsMobile";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

interface ConsentFormProps {
  formData: {
    otpConsent: boolean;
    [key: string]: unknown;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: () => void | Promise<void>;
  onBack: () => void;
  isSubmitting?: boolean;
  submitError?: string;
}

const ConsentForm = ({
  formData,
  onChange,
  onSubmit,
  onBack,
  isSubmitting = false,
  submitError = "",
}: ConsentFormProps) => {
  const isMobile = useIsMobile();
  const checked = !!formData.otpConsent;
  const [consentError, setConsentError] = useState<string>("");

  const handleSubmit = async () => {
    if (!checked) {
      setConsentError(
        "You must consent to OTP validation from a guardian before proceeding."
      );
      return;
    }
    setConsentError("");
    await onSubmit();
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e);
    if (consentError) setConsentError("");
  };

  return (
    <div className="flex flex-col min-h-[360px]">
      {/* Indemnity Statement */}
      <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.03]">
        <div className="px-5 py-3 border-b border-white/10">
          <p className="text-white font-semibold">Indemnity Statement</p>
        </div>
        <div
          className={cn(
            "px-5 py-4 space-y-4 text-white/80 text-xs md:text-sm leading-[1.6]",
            "max-h-[220px] overflow-y-auto scrollbar-theme1"
          )}
        >
          <p>
            I Hereby Declare That I Am Voluntarily Participating In The
            Adventure Activities Organized By Rocksport And Confirm That I Am
            Physically And Mentally Fit To Take Part In Such Activities.
          </p>
          <p>
            I Understand That Adventure Activities Involve Inherent Risks,
            Including The Possibility Of Injury, Illness, Accident, Permanent
            Disability, Or Death, As Well As Loss Or Damage To Personal
            Belongings.
          </p>
          <p>
            I Agree To Follow All Safety Instructions Provided By The Organizers
            And Instructors. I Hereby Release, Indemnify, And Hold Harmless The
            Organizers, Their Employees, Trainers, Agents, And Representatives
            From Any Liability, Claims, Damages, Losses, Or Expenses Arising
            From My Participation In The Activities.
          </p>
          <p>
            I Also Authorize The Organizers To Provide Or Arrange Necessary
            First Aid And Medical Treatment In Case Of An Emergency, And I
            Understand That Any Related Expenses Will Be My Responsibility.
          </p>
        </div>
      </div>

      {/* Consent checkbox */}
      <div className="mt-5 md:mt-6">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            name="otpConsent"
            checked={checked}
            onChange={handleChange}
            className="sr-only peer"
          />
          <span
            className={cn(
              "size-5 rounded border flex items-center justify-center transition-colors shrink-0",
              checked
                ? "bg-primary border-primary"
                : consentError
                  ? "border-red-500 bg-transparent"
                  : "border-white/40 bg-transparent"
            )}
          >
            {checked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12l4 4 10-10"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span className="text-white/85 text-sm">
            OTP validation required from consenting Guardian to grant Indemnity
          </span>
        </label>
        {consentError && (
          <p className="mt-2 text-xs text-red-400 pl-8">{consentError}</p>
        )}
        {submitError && (
          <p className="mt-2 text-xs text-red-400 pl-8">{submitError}</p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-10 md:pt-16">
        <p className="text-xs md:text-sm text-white/70 mb-5">
          By Proceeding, I Understand And Agree With The{" "}
          <a href="#" className="text-primary underline">
            Privacy Policy
          </a>
          , The{" "}
          <a href="#" className="text-primary underline">
            User Agreement
          </a>{" "}
          And{" "}
          <a href="#" className="text-primary underline">
            Terms Of Service
          </a>
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <button
            onClick={onBack}
            type="button"
            className="size-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer self-start"
            aria-label="Back"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Button
            variant="fillPrimary"
            onClick={handleSubmit}
            size={isMobile ? "wFull" : "xl"}
            className="px-8"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting…" : "Request Consent & Indemnity"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsentForm;
