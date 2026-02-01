"use client";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";

import styles from "./buttonStyle.module.scss";

const buttonVariants = cva(styles.base, {
  variants: {
    variant: {
      heroBtn: styles.heroBtn,
      outlinePrimary: styles.outlinePrimary,
      outlineWhiteBtn: styles.outlineWhiteBtn,
      outline: styles.outline,
      fillPrimary: styles.fillPrimary,
      outlineSecondary: styles.outlineSecondary,
      filterBtn: styles.filterBtn,
      download: styles.download,
      buttonDark: styles.buttonDark,
      readMoreBtn: styles.readMoreBtn,
      shareNetwork: styles.shareNetwork,
      styleNone: styles.styleNone,
      link: styles.link,
    },
    size: {
      default: styles.default,
      xl: styles.xl,
      lg: styles.lg,
      md: styles.md,
      sm: styles.sm,
      xs: styles.xs,
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const Button = forwardRef(
  (
    {
      className,
      children,
      variant,
      asChild = false,
      disabled,
      ariaLabel,
      buttonTitle,
      size,
      icon,
      btnIconStyle,
      childStyle,
      iconPosition = "right",
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, className, size }),
          icon && styles.iconPresent
        )}
        disabled={disabled}
        aria-label={ariaLabel}
        title={buttonTitle}
        onClick={onClick}
        {...props}
      >
        {/* Icon Left */}
        {icon && iconPosition === "left" && (
          <div className={cn(styles.btnIcon, btnIconStyle)}>{icon}</div>
        )}

        <span className={cn(styles.btnStyle, childStyle)}>{children}</span>

        {/* Icon Right */}
        {icon && iconPosition === "right" && (
          <div className={cn(styles.btnIcon, btnIconStyle)}>{icon}</div>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
