import React, { ChangeEvent } from "react";
import { Field, Input, Label } from "@headlessui/react";
import { cn } from "@/lib/utils";

type InputVariant =
  | "inputStyle1"
  | "inputStyle2"
  | "inputStyle3"
  | "inputStyle4";
type InputSize = "lg" | "md";
type IconPosition = "left" | "right";

interface CustomInputProps {
  containerStyle?: string;
  label?: string;
  labelStyle?: string | boolean;
  labelLink?: {
    text: string;
    href: string;
  };
  variant?: InputVariant;
  type?: React.HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  size?: InputSize;
  required?: boolean;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  rightIcon?: React.ReactNode;
  value?: string | number | readonly string[];
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  errorMessage?: string;
  InputType?: "file" | string;
  inputContainer?: string;
  accept?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  checked?: boolean;
  maxLength?: number;
  focus?: boolean;
  iconStyle?: string;
}

const inputStyles: Record<InputVariant, string> = {
  inputStyle1: "border border-dark/15 bg-light py-3 px-6",
  inputStyle2: "bg-dark/10 border border-[#CFCFCF]",
  inputStyle3: "focus:ring-0",
  inputStyle4: "border border-light-600 bg-dark-500 text-white mt-4",
};

const sizes: Record<InputSize, string> = {
  lg: "h-[60px]",
  md: "h-10",
};

const CustomInput = ({
  containerStyle,
  label,
  labelStyle,
  labelLink,
  variant = "inputStyle1",
  type = "text",
  name,
  placeholder,
  size = "lg",
  required,
  icon,
  iconPosition = "left",
  rightIcon,
  value,
  onChange,
  error,
  errorMessage,
  InputType,
  inputContainer,
  accept,
  disabled,
  autoFocus,
  checked,
  maxLength,
  iconStyle,
}: CustomInputProps) => {
  const errorStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "";

  const renderLabel = () => {
    if (!label) return null;

    if (!labelLink) {
      return (
        <>
          {label}
          {required && <span className="ml-1">*</span>}
        </>
      );
    }

    const parts = label.split(labelLink.text);

    return (
      <>
        {parts[0]}
        <a
          href={labelLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline"
        >
          {labelLink.text}
        </a>
        {parts[1]}
        {required && <span className="ml-1">*</span>}
      </>
    );
  };

  return (
    <Field className={cn("w-full", containerStyle)}>
      {label && (
        <Label
          className={cn(
            "block",
            labelStyle ? labelStyle : "font-semibold mb-3"
          )}
        >
          {renderLabel()}
        </Label>
      )}
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <div
            className={cn(
              "absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none",
              iconStyle
            )}
          >
            {icon}
          </div>
        )}
        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
            {rightIcon}
          </div>
        )}

        <Input
          className={cn(
            inputStyles[variant],
            sizes[size],
            errorStyles,
            icon && iconPosition === "left" && "pl-14",
            rightIcon && "pr-14",
            "block w-full rounded-lg focus:outline-none focus:ring-1 focus:ring-primary",
            inputContainer,
            disabled && "bg-dark/10! cursor-not-allowed"
          )}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          accept={accept}
          disabled={disabled}
          autoFocus={autoFocus}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          checked={checked}
          maxLength={maxLength}
        />

        {/* File input helper text */}
        {InputType === "file" && (
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 left-11 pointer-events-none">
            <span className="text-sm text-dark-300 font-semibold">
              Upload Here
            </span>
            <span className="text-[10px] text-dark-300 font-medium">
              Format jpeg, png, pdf, AVIF & Up to 2mb
            </span>
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
      )}
    </Field>
  );
};

export default CustomInput;
