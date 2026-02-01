import React from "react"
import { Description, Field, Input, Label } from '@headlessui/react'
import { cn } from "@/lib/utils"

const CustomInput = ({
  containerStyle,
  label,
  labelStyle,
  variant = "inputStyle1",
  type,
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
  focus = true
}) => {
  const inputStyles = {
    inputStyle1: "border border-dark-tone-ink/15 bg-baby-powder py-3 px-6",
    inputStyle2: "bg-dark-tone-ink/10 border border-american-silver",
    inputStyle3: "focus:ring-0"
  }
  const sizes = {
    lg: "h-[60px]",
  }
  const errorStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : ""

  return (
    <Field className={cn("w-full", containerStyle)}>
      {label &&
        <Label className={cn("block", labelStyle ? labelStyle : "font-semibold mb-3")}>
          {label}
          {required && <span className="ml-1">*</span>}
        </Label>
      }
      <div className="relative">
        {/* Left Icon */}
        {icon && iconPosition === "left" && (
          <div className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none">
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
            icon && iconPosition === "left" ? "pl-14" : "",
            rightIcon ? "pr-14" : "",
            "block w-full rounded-lg focus:bg-none focus:outline-none",
            inputContainer,
            disabled && "bg-dark-tone-ink/10 border-dark-tone-ink/15",
            focus ? "focus:ring-1 focus:ring-theme-primary" : focus
          )}
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          accept={accept}
          disabled={disabled}
          focus={focus}
        />

        {InputType === "file" && (
          <div className="flex flex-col absolute top-1/2 -translate-y-1/2 left-11 pointer-events-none">
            <span className="text-sm text-dreamless-sleep/60 font-semibold">Upload Here</span>
            <span className="text-[10px] text-dreamless-sleep/60 font-medium">
              Format jpeg, png, pdf, AVIF & Up to 2mb
            </span>
          </div>
        )}
      </div>
      {/* Error Message */}
      {error && errorMessage && (
        <p className="mt-2 text-sm text-red-600">
          {errorMessage}dfdfdfs
        </p>
      )}
    </Field>
  )
}

export default CustomInput