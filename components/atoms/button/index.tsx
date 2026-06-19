"use client";
import { cn } from "@/lib/utils";
import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
  type MouseEventHandler,
} from "react";

type ButtonVariant =
  | "heroBtn"
  | "fillPrimary"
  | "outlinePrimary"
  | "outlineFill";

type ButtonSize = "default" | "xl" | "lg" | "md" | "sm" | "xs" | "wFull";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  ariaLabel?: string;
  buttonTitle?: string;
  icon?: ReactNode;
  btnIconStyle?: string;
  childStyle?: string;
  iconPosition?: "left" | "right";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      children,
      variant = "heroBtn",
      disabled,
      ariaLabel,
      buttonTitle,
      size = "default",
      icon,
      btnIconStyle = "",
      childStyle = "",
      iconPosition = "right",
      onClick,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base classes
    const baseClasses =
      "flex items-center justify-center min-w-[180px] pl-4 pr-2 lg:px-4 rounded-full text-xl font-bold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group transition-all duration-300 cursor-pointer";

    // Variant classes
    const variantClasses: Record<ButtonVariant, string> = {
      heroBtn: "bg-primary pl-7 md:w-[211px]",
      fillPrimary:
        "bg-primary text-white outline-2 outline-primary hover:bg-transparent hover:text-primary",
      outlinePrimary:
        "outline-2 outline-primary !text-primary hover:bg-primary hover:!text-white",
      outlineFill:
        "bg-primary text-primary rounded-xl md:min-w-[215px] md:!h-15 outline-2 outline-primary hover:bg-transparent hover:!text-primary",
    };

    // Size classes
    const sizeClasses: Record<ButtonSize, string> = {
      default: "h-12 lg:h-16",
      xl: "h-12 !text-base",
      lg: "h-12",
      md: "h-10 px-4 text-sm",
      sm: "h-8 px-3 text-sm",
      xs: "h-6 px-2 text-xs",
      wFull: "h-12 w-full !text-base",
    };

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled}
        aria-label={ariaLabel}
        title={buttonTitle}
        onClick={onClick}
        type={type}
        {...props}
      >
        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <span
            className={cn("shrink-0 mr-2", btnIconStyle)}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}

        <span
          className={cn(childStyle, icon && iconPosition === "right" && "mr-2")}
        >
          {children}
        </span>

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <span
            className={cn(
              "shrink-0 bg-white size-9 rounded-full flex flex-center group-hover:-rotate-45 transition-all duration-300 ml-auto",
              btnIconStyle
            )}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
