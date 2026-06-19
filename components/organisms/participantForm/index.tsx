import React, { useState } from "react";
import { ChangeEvent } from "react";
import useIsMobile from "@/lib/useIsMobile";
import CustomInput from "@/components/molecules/customInput";
import CustomSelect from "@/components/molecules/customSelect";
import PrimaryCalender from "@/components/molecules/primaryCalender";
import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface FormData {
  fullName: string;
  mobileNumber: string;
  class: string;
  email: string;
  dateOfBirth: string;
  idProof: File | null;
  [key: string]: unknown;
}

interface ParticipantFormProps {
  formData: FormData;
  classOptions: string[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof FormData
  ) => void;
  onNext: () => void;
}

const darkInputStyles =
  "!border !border-[#616161] !bg-[#302B2C] !text-white !px-4 placeholder:!text-white/40";

type ParticipantErrors = Partial<Record<keyof FormData, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

const ParticipantForm = ({
  formData,
  classOptions,
  onChange,
  onSelectChange,
  onNext,
}: ParticipantFormProps) => {
  const isMobile = useIsMobile();
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [errors, setErrors] = useState<ParticipantErrors>({});

  const validate = (): boolean => {
    const newErrors: ParticipantErrors = {};

    if (!formData.fullName.trim())
      newErrors.fullName = "Participant name is required.";

    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required.";

    if (!formData.class) newErrors.class = "Class is required.";

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required.";
    } else if (!MOBILE_REGEX.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email ID is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) onNext();
  };

  // Clear field error on change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSelectChange = (name: string, value: string) => {
    onSelectChange(name, value);
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const normalizedClassOptions: SelectOption[] = classOptions.map((item) => ({
    value: item,
    label: item,
  }));

  return (
    <div className="flex flex-col min-h-[360px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-11">
        {/* Participant Name */}
        <div>
          <CustomInput
            label="Participant's Name"
            type="text"
            name="fullName"
            placeholder="Enter Participant's Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            labelStyle="block font-semibold mb-3 text-white text-[20px]"
            inputContainer={cn(
              darkInputStyles,
              errors.fullName && "!border-red-500"
            )}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-400">{errors.fullName}</p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <label className="block font-semibold mb-3 text-white text-[20px]">
            Date of Birth<span className="ml-1">*</span>
          </label>

          <input
            type="text"
            name="dateOfBirth"
            readOnly
            value={formData.dateOfBirth}
            onClick={() => setShowCalendar(true)}
            placeholder="Enter your Birth Date"
            className={cn(
              "block w-full h-[60px] rounded-lg pr-14 cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary",
              darkInputStyles,
              errors.dateOfBirth && "!border-red-500"
            )}
          />

          <Icons.CalenderIcon
            className="size-5 text-white/60 absolute right-5 top-[calc(50%+14px)] -translate-y-1/2 pointer-events-none"
            onClick={() => setShowCalendar(true)}
          />

          <PrimaryCalender
            isOpen={showCalendar}
            onClose={() => setShowCalendar(false)}
            onConfirm={(selectedDate: Date) => {
              // Prevent future date selection
              const today = new Date();

              today.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);

              if (selectedDate > today) {
                setErrors((prev) => ({
                  ...prev,
                  dateOfBirth: "Future dates are not allowed.",
                }));
                return;
              }

              onChange({
                target: {
                  name: "dateOfBirth",
                  value: selectedDate.toLocaleDateString(),
                  type: "text",
                },
              } as unknown as ChangeEvent<HTMLInputElement>);

              setShowCalendar(false);

              setErrors((prev) => ({
                ...prev,
                dateOfBirth: undefined,
              }));
            }}
          />

          {errors.dateOfBirth && (
            <p className="mt-1 text-xs text-red-400">{errors.dateOfBirth}</p>
          )}
        </div>

        {/* Class */}
        <div>
          <CustomSelectDark
            label="Class"
            value={formData.class}
            onChange={(value) => handleSelectChange("class", value)}
            options={normalizedClassOptions}
            placeholder="Select Class"
            required
            hasError={!!errors.class}
          />
          {errors.class && (
            <p className="mt-1 text-xs text-red-400">{errors.class}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <CustomInput
            label="Participant Mobile Number"
            type="tel"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            maxLength={10}
            required
            labelStyle="block font-semibold mb-2 text-white text-[20px]"
            inputContainer={cn(
              darkInputStyles,
              errors.mobileNumber && "!border-red-500"
            )}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-xs text-red-400">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <CustomInput
            label="Participant Email ID"
            type="email"
            name="email"
            placeholder="Enter Email ID"
            value={formData.email}
            onChange={handleChange}
            required
            labelStyle="block font-semibold mb-3 text-white text-[20px]"
            inputContainer={cn(
              darkInputStyles,
              errors.email && "!border-red-500"
            )}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-8 md:pt-40 flex justify-end">
        <Button
          variant="fillPrimary"
          onClick={handleNext}
          size={isMobile ? "wFull" : "xl"}
          className="!px-12"
        >
          Enter Guardian Details
        </Button>
      </div>
    </div>
  );
};

const CustomSelectDark = (props: {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  hasError?: boolean;
}) => {
  return (
    <div className="w-full">
      {props.label && (
        <label className="block font-semibold mb-3 text-white text-[20px]">
          {props.label}
          {props.required && <span className="ml-1">*</span>}
        </label>
      )}
      <div
        className={cn(
          "participant-dark-select",
          props.hasError && "select-error-border"
        )}
      >
        <CustomSelect
          value={props.value}
          onChange={props.onChange}
          options={props.options}
          placeholder={props.placeholder}
        />
      </div>
    </div>
  );
};

export default ParticipantForm;
