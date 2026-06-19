import React, { ChangeEvent, useState } from "react";

import Icons from "@/components/atoms/icons";
import useIsMobile from "@/lib/useIsMobile";
import { Button } from "@/components/atoms/button";
import CustomSelect from "@/components/molecules/customSelect";
import CustomInput from "@/components/molecules/customInput";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface Guardian {
  guardianType: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail: string;
}

interface FormData {
  guardians: Guardian[];
  medicalConditions?: string;
  [key: string]: unknown;
}

interface GuardianFormProps {
  formData: FormData;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    guardianIndex?: number | null
  ) => void;
  onSelectChange: (name: string, value: string, guardianIndex: number) => void;
  onNext: () => void | Promise<void>;
  onBack: () => void;
  onRemoveGuardian: (index: number) => void;
  isSubmitting?: boolean;
  submitError?: string;
}

type GuardianFieldErrors = Partial<Record<keyof Guardian, string>>;

interface GuardianErrors {
  guardians: GuardianFieldErrors[];
  medicalConditions?: string;
}

const guardianTypeOptions: SelectOption[] = [
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "guardian", label: "Legal Guardian" },
  { value: "other", label: "Other" },
];

const darkInputStyles =
  "!border !border-[#616161] !bg-[#302B2C] !text-white !px-4 placeholder:!text-white/40";
const darkLabelStyle = "block font-semibold mb-3 text-white text-[20px]";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

const GuardianForm = ({
  formData,
  onChange,
  onSelectChange,
  onNext,
  onBack,
  onRemoveGuardian,
  isSubmitting = false,
  submitError = "",
}: GuardianFormProps) => {
  const guardians: Guardian[] = formData.guardians || [];
  const isMobile = useIsMobile();
  const [errors, setErrors] = useState<GuardianErrors>({
    guardians: guardians.map(() => ({})),
    medicalConditions: undefined,
  });

  const validate = (): boolean => {
    const newGuardianErrors: GuardianFieldErrors[] = guardians.map(
      (guardian) => {
        const fieldErrors: GuardianFieldErrors = {};

        if (!guardian.guardianType)
          fieldErrors.guardianType = "Guardian type is required.";
        if (!guardian.guardianName.trim())
          fieldErrors.guardianName = "Guardian name is required.";
        if (!guardian.guardianContact.trim()) {
          fieldErrors.guardianContact = "Contact number is required.";
        } else if (!MOBILE_REGEX.test(guardian.guardianContact.trim())) {
          fieldErrors.guardianContact = "Enter a valid 10-digit mobile number.";
        }
        if (!guardian.guardianEmail.trim()) {
          fieldErrors.guardianEmail = "Email ID is required.";
        } else if (!EMAIL_REGEX.test(guardian.guardianEmail.trim())) {
          fieldErrors.guardianEmail = "Enter a valid email address.";
        }

        return fieldErrors;
      }
    );

    const newErrors: GuardianErrors = {
      guardians: newGuardianErrors,
      medicalConditions: !formData.medicalConditions?.trim()
        ? "Please enter medical conditions or write 'None'."
        : undefined,
    };

    setErrors(newErrors);

    const hasGuardianErrors = newGuardianErrors.some(
      (e) => Object.keys(e).length > 0
    );
    return !hasGuardianErrors && !newErrors.medicalConditions;
  };

  const handleNext = () => {
    if (!validate() || isSubmitting) return;
    void onNext();
  };

  // Clears a specific guardian field error
  const clearGuardianError = (index: number, field: keyof Guardian) => {
    setErrors((prev) => {
      const updated = [...prev.guardians];
      updated[index] = { ...updated[index], [field]: undefined };
      return { ...prev, guardians: updated };
    });
  };

  const handleGuardianChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    onChange(e, index);
    clearGuardianError(index, e.target.name as keyof Guardian);
  };

  const handleGuardianSelect = (name: string, value: string, index: number) => {
    onSelectChange(name, value, index);
    clearGuardianError(index, name as keyof Guardian);
  };

  return (
    <div className="flex flex-col min-h-[360px]">
      <div>
        {guardians.map((guardian, index) => {
          const fieldErrors = errors.guardians[index] ?? {};

          return (
            <div
              key={index}
              className={cn("relative", index > 0 ? "mt-8" : "")}
            >
              {index > 0 && (
                <div className="flex justify-between items-center mb-4">
                  <p className="text-xl font-semibold text-white">
                    Guardian {index + 1}
                  </p>
                  <button
                    onClick={() => onRemoveGuardian(index)}
                    className="text-primary transition-colors cursor-pointer"
                    aria-label={`Remove guardian ${index + 1}`}
                  >
                    <Icons.Close className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-11">
                {/* Guardian Type */}
                <div>
                  <label className={darkLabelStyle}>
                    Guardian Type<span className="ml-1">*</span>
                  </label>
                  <div
                    className={cn(
                      "participant-dark-select",
                      fieldErrors.guardianType && "select-error-border"
                    )}
                  >
                    <CustomSelect
                      value={guardian.guardianType}
                      onChange={(value: string) =>
                        handleGuardianSelect("guardianType", value, index)
                      }
                      options={guardianTypeOptions}
                      placeholder="Select Guardian Type"
                    />
                  </div>
                  {fieldErrors.guardianType && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.guardianType}
                    </p>
                  )}
                </div>

                {/* Guardian Name */}
                <div>
                  <CustomInput
                    label="Guardian Name"
                    type="text"
                    name="guardianName"
                    placeholder="Enter Guardian's name"
                    value={guardian.guardianName}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleGuardianChange(e, index)
                    }
                    required
                    labelStyle={darkLabelStyle}
                    inputContainer={cn(
                      darkInputStyles,
                      fieldErrors.guardianName && "!border-red-500"
                    )}
                  />
                  {fieldErrors.guardianName && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.guardianName}
                    </p>
                  )}
                </div>

                {/* Guardian Contact */}
                <div>
                  <CustomInput
                    label="Guardian Contact Number"
                    type="tel"
                    name="guardianContact"
                    placeholder="Enter Guardian's Contact number"
                    value={guardian.guardianContact}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleGuardianChange(e, index)
                    }
                    maxLength={10}
                    required
                    labelStyle={darkLabelStyle}
                    inputContainer={cn(
                      darkInputStyles,
                      fieldErrors.guardianContact && "!border-red-500"
                    )}
                  />
                  {fieldErrors.guardianContact && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.guardianContact}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8 mt-5 md:mt-11">
                {/* Guardian Email */}
                <div>
                  <CustomInput
                    label="Guardian's Email ID"
                    type="email"
                    name="guardianEmail"
                    placeholder="Enter Guardian's Email ID"
                    value={guardian.guardianEmail}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      handleGuardianChange(e, index)
                    }
                    required
                    labelStyle={darkLabelStyle}
                    inputContainer={cn(
                      darkInputStyles,
                      fieldErrors.guardianEmail && "!border-red-500"
                    )}
                  />
                  {fieldErrors.guardianEmail && (
                    <p className="mt-1 text-xs text-red-400">
                      {fieldErrors.guardianEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Medical conditions */}
        <div className="mt-6 md:mt-11">
          <label className={darkLabelStyle}>
            Any Medical Conditions<span className="ml-1">*</span>
          </label>
          <textarea
            name="medicalConditions"
            rows={4}
            value={formData.medicalConditions ?? ""}
            onChange={(e) => {
              onChange(e);
              setErrors((prev) => ({ ...prev, medicalConditions: undefined }));
            }}
            placeholder="Please let us know beforehand if you have any medical conditions."
            className={cn(
              "block w-full rounded-lg p-4 focus:outline-none focus:ring-1 focus:ring-primary resize-none",
              darkInputStyles,
              errors.medicalConditions && "!border-red-500"
            )}
          />
          {errors.medicalConditions && (
            <p className="mt-1 text-xs text-red-400">
              {errors.medicalConditions}
            </p>
          )}
        </div>
      </div>

      {submitError ? (
        <p className="mt-6 text-sm text-red-400 max-w-2xl">{submitError}</p>
      ) : null}

      <div className="mt-auto pt-8 md:pt-10 flex flex-col md:flex-row gap-4 justify-between">
        <button
          onClick={onBack}
          type="button"
          disabled={isSubmitting}
          className="size-12 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors cursor-pointer self-start disabled:opacity-50"
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
          onClick={handleNext}
          size={isMobile ? "wFull" : "xl"}
          className="px-8"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Saving…" : "Proceed to Consent"}
        </Button>
      </div>
    </div>
  );
};

export default GuardianForm;
