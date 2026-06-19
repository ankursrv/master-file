"use client";
import React, {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { BookingFormPaymentOptions } from "@/types/adventure";
import type { CouponListItem } from "@/types/bookingCheckout";

import useIsMobile from "@/lib/useIsMobile";
import { Button } from "@/components/atoms/button";
import { cn } from "@/lib/utils";

export interface TripFormCheckoutConfig {
  grandTotal: number;
  subtotalIncludingTax: number;
  subtotalExcludingTax: number;
  discountAmountAbs: number | null;
  discountLabel: string | null;
  totalSaving: number | null;
  methods: { code: string; title: string }[];
  selectedCode: string | null;
  onSelectMethod: (code: string) => void | Promise<void>;
  appliedCouponCodes: string[];
  onApplyCoupon: (code: string) => Promise<void>;
  onRemoveCoupon: () => Promise<void>;
  couponHints?: CouponListItem[];
  isBusy?: boolean;
}

interface PaymentFormProps {
  formData: {
    paymentMethod: string;
    couponCode: string;
    [key: string]: unknown;
  };
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange?: (name: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  programDateText?: string;
  payableText?: string;
  paymentOptions: BookingFormPaymentOptions | null;
  applyCtaLabel?: string;
  nextCtaLabel?: string;
  checkout?: TripFormCheckoutConfig | null;
  onCheckoutProceed?: () => void | Promise<void>;
  isCheckoutProceedLoading?: boolean;
  /** True while confirming payment (e.g. getPhonePeOrderStatus), after gateway closes */
  isCheckoutVerifying?: boolean;
  checkoutProceedError?: string;
  checkoutCouponError?: string;
  checkoutCartLoading?: boolean;
}

type CouponState = "idle" | "invalid" | "applied";

const ALL_PAYMENT_METHODS: {
  value: string;
  formKey: keyof BookingFormPaymentOptions;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    value: "online",
    formKey: "pay_online",
    label: "Pay Online",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="6"
          y="2"
          width="12"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <circle cx="12" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    value: "later",
    formKey: "pay_later",
    label: "Pay Later",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path
          d="M12 7v5l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: "prepaid",
    formKey: "pre_paid",
    label: "Pre Paid",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="6"
          width="18"
          height="12"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M3 10h18" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="17" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

const cardIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="6"
      y="2"
      width="12"
      height="20"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <circle cx="12" cy="18" r="1" fill="currentColor" />
  </svg>
);

const formatInr = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n);

/* ─── Redesigned coupon dropdown ───────────────────────────────────── */
interface CouponDropdownProps {
  hints: CouponListItem[];
  isBusy?: boolean;
  onSelect: (code: string) => void;
}

const CouponDropdown: React.FC<CouponDropdownProps> = ({
  hints,
  isBusy,
  onSelect,
}) => (
  <div
    id="coupon-code-dropdown"
    role="listbox"
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: "calc(100% + 10px)",
      zIndex: 200,
      maxHeight: "min(22rem, 60vh)",
      overflowY: "auto",
      overscrollBehavior: "contain",
      borderRadius: "16px",
      border: "1px solid rgba(255,255,255,0.09)",
      backgroundColor: "#1a1718",
      boxShadow: "0 20px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(234,88,12,0.08)",
      padding: "8px",
      display: "flex",
      flexDirection: "column",
      gap: "6px",
    }}
  >
    {/* Header */}
    <div
      style={{
        padding: "6px 10px 8px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          color: "rgba(255,255,255,0.35)",
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.6px",
          textTransform: "uppercase",
        }}
      >
        Available Coupons
      </span>
      <span
        style={{
          background: "rgba(234,88,12,0.15)",
          color: "#ea580c",
          fontSize: "10px",
          fontWeight: 700,
          padding: "2px 8px",
          borderRadius: "999px",
          border: "1px solid rgba(234,88,12,0.25)",
        }}
      >
        {hints.length} {hints.length === 1 ? "offer" : "offers"}
      </span>
    </div>

    {/* Coupon cards */}
    {hints.map((h) => (
      <button
        key={h.code}
        type="button"
        role="option"
        disabled={isBusy}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onSelect(h.code)}
        style={{
          display: "flex",
          alignItems: "stretch",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.03)",
          overflow: "hidden",
          cursor: "pointer",
          transition: "all 0.18s ease",
          textAlign: "left",
          width: "100%",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(234,88,12,0.07)";
          el.style.borderColor = "rgba(234,88,12,0.3)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLButtonElement;
          el.style.background = "rgba(255,255,255,0.03)";
          el.style.borderColor = "rgba(255,255,255,0.07)";
        }}
      >
        {/* Left orange accent stripe */}
        <div
          style={{
            width: "4px",
            flexShrink: 0,
            background: "linear-gradient(180deg, #ea580c 0%, #f97316 100%)",
            opacity: 0.85,
          }}
        />

        {/* Body */}
        <div
          style={{
            flex: 1,
            padding: "11px 14px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            minWidth: 0,
          }}
        >
          {/* Top row: dashed code chip + days badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              flexWrap: "wrap",
            }}
          >
            {/* Ticket-style code badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                background: "rgba(234,88,12,0.12)",
                border: "1.5px dashed rgba(234,88,12,0.5)",
                borderRadius: "6px",
                padding: "3px 10px 3px 7px",
                flexShrink: 0,
              }}
            >
              {/* scissors icon */}
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ea580c"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="6" cy="6" r="3" />
                <circle cx="6" cy="18" r="3" />
                <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
              </svg>
              <span
                style={{
                  color: "#ea580c",
                  fontSize: "12px",
                  fontWeight: 800,
                  letterSpacing: "0.8px",
                }}
              >
                {h.code}
              </span>
            </div>

            {h.days_left && (
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.4)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "4px",
                  padding: "2px 7px",
                  whiteSpace: "nowrap",
                }}
              >
                ⏱ {h.days_left}
              </span>
            )}
          </div>
        </div>

        {/* Right: apply label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 14px",
            borderLeft: "1px dashed rgba(255,255,255,0.08)",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: "#ea580c",
              whiteSpace: "nowrap",
              letterSpacing: "0.3px",
            }}
          >
            Apply
          </span>
        </div>
      </button>
    ))}

    <div style={{ height: "2px" }} />
  </div>
);

/* ─── Main component ────────────────────────────────────────────────── */
const TripForm = ({
  formData,
  onNext,
  onBack,
  onSelectChange,
  programDateText = "—",
  payableText = "—",
  paymentOptions,
  applyCtaLabel = "Apply",
  nextCtaLabel,
  checkout,
  onCheckoutProceed,
  isCheckoutProceedLoading,
  isCheckoutVerifying = false,
  checkoutProceedError,
  checkoutCouponError,
  checkoutCartLoading = false,
}: PaymentFormProps) => {
  const isMobile = useIsMobile();
  const [coupon, setCoupon] = useState<string>(() => formData.couponCode || "");
  const [couponState, setCouponState] = useState<CouponState>("idle");
  const [paymentError, setPaymentError] = useState<string>("");
  const [couponDropdownOpen, setCouponDropdownOpen] = useState(false);
  const couponFieldRef = useRef<HTMLDivElement>(null);

  const visibleLegacyMethods = useMemo(() => {
    if (!paymentOptions) return [];
    return ALL_PAYMENT_METHODS.filter(
      (m) => paymentOptions[m.formKey] === true
    );
  }, [paymentOptions]);

  const legacySelected =
    formData.paymentMethod || visibleLegacyMethods[0]?.value || "";

  const checkoutMethods = checkout?.methods ?? [];
  const appliedCodes = checkout?.appliedCouponCodes ?? [];
  const hasAppliedFromCart = appliedCodes.length > 0;

  const primaryCta = nextCtaLabel?.trim() || "Complete payment";

  const checkoutLoadingLabel =
    checkout && isCheckoutVerifying ? "Verifying payment…" : "Processing…";

  useEffect(() => {
    if (checkout) return;
    if (!visibleLegacyMethods.length) return;
    if (!visibleLegacyMethods.some((m) => m.value === legacySelected)) {
      onSelectChange?.("paymentMethod", visibleLegacyMethods[0]!.value);
    }
  }, [checkout, visibleLegacyMethods, legacySelected, onSelectChange]);

  useEffect(() => {
    const onDocMouseDown = (e: MouseEvent) => {
      const el = couponFieldRef.current;
      if (!el || !(e.target instanceof Node)) return;
      if (!el.contains(e.target)) setCouponDropdownOpen(false);
    };
    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;
    if (checkout) {
      setCouponState("idle");
      try {
        await checkout.onApplyCoupon(coupon.trim());
        setCouponState("applied");
      } catch {
        setCouponState("invalid");
      }
      return;
    }
    if (coupon.trim().toUpperCase() === "PHONEPAYCC") {
      setCouponState("applied");
    } else {
      setCouponState("invalid");
    }
  };

  const handleRemoveCoupon = async () => {
    if (checkout) {
      await checkout.onRemoveCoupon();
      setCoupon("");
      setCouponState("idle");
      return;
    }
    setCoupon("");
    setCouponState("idle");
  };

  const handleLegacyPaymentSelect = (value: string) => {
    onSelectChange?.("paymentMethod", value);
    setPaymentError("");
  };

  const handleCheckoutPaymentSelect = async (code: string) => {
    setPaymentError("");
    await checkout?.onSelectMethod(code);
  };

  const handlePrimary = async () => {
    if (checkout && onCheckoutProceed) {
      setPaymentError("");
      if (!checkout.selectedCode) {
        setPaymentError("Please select a payment method to continue.");
        return;
      }
      try {
        await onCheckoutProceed();
      } catch {
        /* parent sets checkoutProceedError */
      }
      return;
    }
    if (!visibleLegacyMethods.length) {
      setPaymentError("No payment method is available for this program.");
      return;
    }
    if (!legacySelected) {
      setPaymentError("Please select a payment method to continue.");
      return;
    }
    onSelectChange?.("couponCode", coupon.trim());
    onNext();
  };

  const overviewPayable = checkout
    ? formatInr(checkout.grandTotal)
    : payableText;
  const overviewSubtotalIncl = checkout
    ? formatInr(checkout.subtotalIncludingTax)
    : payableText;
  const overviewSubtotalExcl = checkout
    ? formatInr(checkout.subtotalExcludingTax)
    : payableText;

  const hasCouponHints =
    !!checkout?.couponHints && checkout.couponHints.length > 0;

  return (
    <div className="flex flex-col min-h-[360px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-11">
        {/* ── Overview card ─────────────────────────────────────────── */}
        <div className="rounded-xl border border-[#616161] overflow-hidden bg-[#302B2C]">
          <div className="px-5 py-3 border-b border-[#616161]">
            <p className="text-white font-bold text-[20px]">Overview</p>
          </div>
          <div className="px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white/60 font-semibold text-[20px]">
                Program Date
              </span>
              <span className="text-white font-bold text-[20px]">
                {programDateText}
              </span>
            </div>
            {checkout && (
              <div className="flex items-center justify-between">
                <span className="text-white/60 font-semibold text-[18px] md:text-[20px]">
                  Subtotal (incl. tax)
                </span>
                <span className="text-white font-bold text-[18px] md:text-[20px]">
                  {overviewSubtotalIncl}
                </span>
              </div>
            )}
            {checkout &&
              checkout.discountAmountAbs != null &&
              checkout.discountAmountAbs > 0 && (
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/60 font-semibold text-[15px] md:text-[16px] leading-snug">
                    {checkout.discountLabel
                      ? `Discount (${checkout.discountLabel})`
                      : "Discount"}
                  </span>
                  <span className="text-green-400 font-bold text-[15px] md:text-[16px] shrink-0">
                    −{formatInr(checkout.discountAmountAbs)}
                  </span>
                </div>
              )}
            {checkout &&
              checkout.totalSaving != null &&
              checkout.totalSaving > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-white/60 font-semibold text-[15px]">
                    Total saving
                  </span>
                  <span className="text-green-400 font-semibold text-[15px]">
                    {formatInr(checkout.totalSaving)}
                  </span>
                </div>
              )}
            {checkout && (
              <div className="flex items-center justify-between">
                <span className="text-white/60 font-semibold text-[15px] md:text-[16px] leading-snug">
                  Taxable value{" "}
                  <span className="block text-white/40 font-normal text-[12px] mt-0.5">
                    Subtotal excl. tax / without tax total
                  </span>
                </span>
                <span className="text-white font-bold text-[15px] md:text-[16px] shrink-0">
                  {overviewSubtotalExcl}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1 border-t border-[#616161]/80">
              <span className="text-white/60 font-semibold text-[20px]">
                Payable amount
              </span>
              <span className="text-white font-bold text-[20px]">
                {overviewPayable}
              </span>
            </div>
          </div>
        </div>

        {/* ── Coupon card ───────────────────────────────────────────── */}
        <div className="rounded-xl border border-[#616161] bg-[#302B2C] overflow-visible">
          <div className="overflow-hidden rounded-t-xl px-5 py-3 border-b border-[#616161]">
            <p className="text-white font-bold text-[20px]">Coupon</p>
          </div>
          <div className="relative z-10 px-5 py-4 overflow-visible">
            <div className="relative" ref={couponFieldRef}>
              {/* Input row */}
              <div
                className={cn(
                  "relative flex items-center rounded-full border bg-[#211D1F] h-[50px] px-4",
                  hasAppliedFromCart
                    ? "border-green-500"
                    : couponState === "invalid"
                      ? "border-primary"
                      : "border-[#616161]"
                )}
              >
                {/* Coupon icon */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={cn(
                    "mr-2 shrink-0",
                    hasAppliedFromCart ? "text-green-500" : "text-primary"
                  )}
                >
                  <path
                    d="M20 12a2 2 0 010-4V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 010 4v2a2 2 0 010 4v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 010-4v-2z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                  />
                </svg>

                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    if (couponState !== "idle") setCouponState("idle");
                  }}
                  onFocus={() => {
                    if (hasCouponHints && !hasAppliedFromCart)
                      setCouponDropdownOpen(true);
                  }}
                  onClick={() => {
                    if (hasCouponHints && !hasAppliedFromCart)
                      setCouponDropdownOpen(true);
                  }}
                  placeholder="Enter Coupon Code"
                  disabled={
                    !!checkout && (checkout.isBusy || hasAppliedFromCart)
                  }
                  autoComplete="off"
                  aria-expanded={
                    hasCouponHints ? couponDropdownOpen : undefined
                  }
                  aria-controls="coupon-code-dropdown"
                  className={cn(
                    "flex-1 bg-transparent border-0 outline-none text-base placeholder:text-white/40",
                    hasAppliedFromCart ? "text-green-500" : "text-white"
                  )}
                  readOnly={hasAppliedFromCart}
                />

                {/* Chevron toggle */}
                {hasCouponHints && !hasAppliedFromCart && (
                  <button
                    type="button"
                    tabIndex={-1}
                    disabled={checkout?.isBusy}
                    onClick={() => setCouponDropdownOpen((o) => !o)}
                    className="mr-1 p-1 text-white/50 hover:text-primary shrink-0"
                    aria-label="Show coupon codes"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={cn(
                        "transition-transform",
                        couponDropdownOpen && "rotate-180"
                      )}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" />
                    </svg>
                  </button>
                )}

                {/* Remove / Apply */}
                {hasAppliedFromCart ? (
                  <button
                    type="button"
                    onClick={() => void handleRemoveCoupon()}
                    disabled={checkout?.isBusy}
                    className="text-sm font-semibold cursor-pointer ml-2 text-primary shrink-0"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => void handleApplyCoupon()}
                    disabled={checkout?.isBusy}
                    className="text-sm font-semibold cursor-pointer ml-2 shrink-0 text-primary"
                  >
                    {applyCtaLabel}
                  </button>
                )}
              </div>

              {/* ── Redesigned dropdown ─────────────────────────────── */}
              {hasCouponHints && couponDropdownOpen && !hasAppliedFromCart && (
                <CouponDropdown
                  hints={checkout!.couponHints!}
                  isBusy={checkout?.isBusy}
                  onSelect={(code) => {
                    setCoupon(code);
                    setCouponState("idle");
                    setCouponDropdownOpen(false);
                  }}
                />
              )}
            </div>

            {couponState === "invalid" && (
              <p className="mt-2 text-primary text-xs">Invalid Coupon Code</p>
            )}
            {checkoutCouponError && (
              <p className="mt-2 text-primary text-xs">{checkoutCouponError}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Payment methods ─────────────────────────────────────────── */}
      {checkout ? (
        <fieldset className="mt-6 md:mt-8">
          <legend className="sr-only">Select payment method</legend>
          {checkoutMethods.length > 0 ? (
            <div
              className={cn(
                "grid gap-4",
                checkoutMethods.length === 1
                  ? "grid-cols-1 max-w-md"
                  : checkoutMethods.length === 2
                    ? "grid-cols-1 md:grid-cols-2"
                    : "grid-cols-1 md:grid-cols-3"
              )}
            >
              {checkoutMethods.map((opt) => {
                const isSelected = checkout.selectedCode === opt.code;
                return (
                  <label
                    key={opt.code}
                    className={cn(
                      "payment-option flex items-center justify-between rounded-xl border px-5 h-14 text-white cursor-pointer",
                      isSelected
                        ? "payment-option-selected"
                        : paymentError
                          ? "border-red-500/60 bg-white/[0.03]"
                          : "border-white/15 bg-white/[0.03]",
                      checkout.isBusy && "opacity-60 pointer-events-none"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "relative size-5 rounded-full border flex items-center justify-center shrink-0",
                          isSelected
                            ? "border-primary"
                            : paymentError
                              ? "border-red-400/60"
                              : "border-white/40"
                        )}
                      >
                        {isSelected && (
                          <span className="size-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      <span className="text-sm font-semibold">{opt.title}</span>
                    </div>
                    <span
                      className={cn(
                        isSelected ? "text-primary" : "text-white/60"
                      )}
                    >
                      {cardIcon}
                    </span>
                    <input
                      type="radio"
                      name="checkoutPaymentMethod"
                      value={opt.code}
                      checked={isSelected}
                      onChange={() =>
                        void handleCheckoutPaymentSelect(opt.code)
                      }
                      className="sr-only"
                    />
                  </label>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-white/60">
              {checkoutCartLoading
                ? "Loading payment options…"
                : "No payment methods are available for this cart."}
            </p>
          )}
          {(paymentError || checkoutProceedError) && (
            <p className="mt-2 text-xs text-red-400">
              {paymentError || checkoutProceedError}
            </p>
          )}
        </fieldset>
      ) : visibleLegacyMethods.length > 0 ? (
        <fieldset className="mt-6 md:mt-8">
          <legend className="sr-only">Select payment method</legend>
          <div
            className={cn(
              "grid gap-4",
              visibleLegacyMethods.length === 1
                ? "grid-cols-1 max-w-md"
                : visibleLegacyMethods.length === 2
                  ? "grid-cols-1 md:grid-cols-2"
                  : "grid-cols-1 md:grid-cols-3"
            )}
          >
            {visibleLegacyMethods.map((opt) => {
              const isSelected = legacySelected === opt.value;
              return (
                <label
                  key={opt.value}
                  className={cn(
                    "payment-option flex items-center justify-between rounded-xl border px-5 h-14 text-white cursor-pointer",
                    isSelected
                      ? "payment-option-selected"
                      : paymentError
                        ? "border-red-500/60 bg-white/[0.03]"
                        : "border-white/15 bg-white/[0.03]"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "relative size-5 rounded-full border flex items-center justify-center shrink-0",
                        isSelected
                          ? "border-primary"
                          : paymentError
                            ? "border-red-400/60"
                            : "border-white/40"
                      )}
                    >
                      {isSelected && (
                        <span className="size-2.5 rounded-full bg-primary" />
                      )}
                    </span>
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </div>
                  <span
                    className={cn(
                      isSelected ? "text-primary" : "text-white/60"
                    )}
                  >
                    {opt.icon}
                  </span>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={isSelected}
                    onChange={() => handleLegacyPaymentSelect(opt.value)}
                    className="sr-only"
                  />
                </label>
              );
            })}
          </div>
          {paymentError && (
            <p className="mt-2 text-xs text-red-400">{paymentError}</p>
          )}
        </fieldset>
      ) : (
        paymentError && (
          <p className="mt-6 md:mt-8 text-xs text-red-400">{paymentError}</p>
        )
      )}

      {/* ── Footer ──────────────────────────────────────────────────── */}
      <div className="mt-auto pt-10 md:pt-16">
        <p className="text-xs md:text-sm text-white/70 mb-20">
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
            disabled={!!checkout?.isBusy || !!isCheckoutProceedLoading}
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
            onClick={() => void handlePrimary()}
            size={isMobile ? "wFull" : "xl"}
            className="px-8 gap-2"
            disabled={!!checkout?.isBusy || !!isCheckoutProceedLoading}
            icon={
              isCheckoutProceedLoading ? (
                <span
                  className="inline-block size-5 shrink-0 rounded-full border-2 border-white/35 border-t-white animate-spin"
                  aria-hidden
                />
              ) : undefined
            }
            iconPosition="left"
            aria-busy={isCheckoutProceedLoading || undefined}
          >
            {isCheckoutProceedLoading ? checkoutLoadingLabel : primaryCta}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TripForm;
