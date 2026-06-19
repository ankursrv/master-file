"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import useIsMobile from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";
import CustomImage from "@/components/molecules/customImage";
import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import CarryBadge from "@/components/atoms/carryBadge";
import type { ProgramDetails, RisTemplate } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";
import { buildBookingShareSummary, openShareUrl } from "@/lib/bookingShareText";

export interface PaymentFailedProps {
  rePayment: () => void;
  onOpenTerms: () => void;
  /** Order / merchant id shown in the failure copy */
  orderLabel?: string;
}

export interface OtpVerificationProps {
  /** Normalized 10-digit guardian mobile (same value sent to RequestOtp / VerifyOtp). */
  guardianMobile: string;
  maskedMobileSuffix?: string;
  onSubmitConsent: (otp: string) => void | Promise<void>;
  onResendOtp: () => void | Promise<void>;
  isSubmitting?: boolean;
  error?: string;
}

const PaymentFailed: React.FC<PaymentFailedProps> = ({
  rePayment,
  orderLabel,
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center text-center py-10 md:py-16">
      <div className="relative">
        <span className="absolute inset-0 rounded-full bg-red-100 scale-110" />
        <div className="relative size-24 md:size-28 rounded-full bg-red-50 border border-red-100 flex items-center justify-center">
          <div className="size-16 md:size-20 rounded-full bg-red-500 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="#fff"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <p className="text-xl md:text-[28px] font-bold text-white mt-6">
        Opps! Payment Failed
      </p>
      <p className="text-sm md:text-base text-white/70 mt-2 max-w-md">
        {orderLabel
          ? `Payment for order ${orderLabel} could not be processed.`
          : "Your payment could not be processed."}
        <br className="hidden md:block" />
        Please try again
      </p>

      <Button
        variant="fillPrimary"
        onClick={rePayment}
        className="mt-8"
        size={isMobile ? "wFull" : "xl"}
      >
        Try Again
      </Button>
    </div>
  );
};

const OTP_LENGTH = 6;

const OtpVerification: React.FC<OtpVerificationProps> = ({
  guardianMobile,
  maskedMobileSuffix,
  onSubmitConsent,
  onResendOtp,
  isSubmitting = false,
  error = "",
}) => {
  const [otp, setOtp] = useState<string[]>(() =>
    Array.from({ length: OTP_LENGTH }, () => "")
  );
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [resendBusy, setResendBusy] = useState(false);
  const isMobile = useIsMobile();
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const displaySuffix =
    maskedMobileSuffix ??
    (guardianMobile.length >= 4 ? guardianMobile.slice(-4) : guardianMobile);

  const focusInput = (index: number) => {
    const el = inputsRef.current[index];
    if (el) {
      el.focus();
      el.select();
    }
  };

  const fillDigits = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
    const next = Array.from({ length: OTP_LENGTH }, (_, i) => digits[i] ?? "");
    setOtp(next);
    const nextFocus = Math.min(digits.length, OTP_LENGTH - 1);
    requestAnimationFrame(() => focusInput(nextFocus));
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  useEffect(() => {
    focusInput(0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const raw = e.target.value;
    const digitsOnly = raw.replace(/\D/g, "");
    if (digitsOnly.length > 1) {
      fillDigits(digitsOnly);
      return;
    }
    const ch = digitsOnly.slice(-1);
    const updated = [...otp];
    updated[index] = ch;
    setOtp(updated);
    if (ch && index < OTP_LENGTH - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        e.preventDefault();
        const u = [...otp];
        u[index] = "";
        setOtp(u);
        return;
      }
      if (index > 0) {
        e.preventDefault();
        const u = [...otp];
        u[index - 1] = "";
        setOtp(u);
        focusInput(index - 1);
      }
      return;
    }
    if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    }
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePasteGrid = (e: React.ClipboardEvent) => {
    const t = e.clipboardData.getData("text");
    if (!/\d/.test(t)) return;
    e.preventDefault();
    fillDigits(t);
  };

  const handleSubmit = () => {
    void onSubmitConsent(otp.join(""));
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resendBusy || !guardianMobile) return;
    setResendBusy(true);
    try {
      await onResendOtp();
      setSecondsLeft(30);
      const empty = Array.from({ length: OTP_LENGTH }, () => "");
      setOtp(empty);
      focusInput(0);
    } finally {
      setResendBusy(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4 md:py-8">
      <p className="text-white text-base md:text-lg mb-5 md:mb-8 text-center">
        Just one more step - Verify the OTP and we&apos;re done.
      </p>

      <div className="w-full max-w-xl rounded-xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <div className="px-5 py-3 border-b border-white/10 text-center">
          <p className="text-white font-semibold">OTP Verification</p>
        </div>
        <div className="px-5 py-6 md:px-8 md:py-8">
          <p className="text-white/85 text-sm md:text-base text-center md:text-left">
            Please Enter The OTP Sent To{" "}
            <span className="inline-block text-primary font-semibold">
              ******{displaySuffix}
            </span>
          </p>

          <div
            className="grid grid-cols-6 gap-2 md:gap-3 mt-4"
            onPaste={handlePasteGrid}
          >
            {otp.map((digit, i) => (
              <div key={i} className="otp-cell">
                <input
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={OTP_LENGTH}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className={cn(
                    "h-11 md:h-14 w-full rounded-lg text-lg md:text-xl font-bold focus:outline-none focus:ring-1 focus:ring-primary",
                    isMobile && "h-10 text-base"
                  )}
                  placeholder="-"
                  aria-label={`OTP digit ${i + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-3 text-xs md:text-sm">
            <button
              type="button"
              onClick={() => void handleResend()}
              disabled={secondsLeft > 0 || resendBusy || !guardianMobile}
              className={cn(
                "cursor-pointer",
                secondsLeft > 0 || resendBusy || !guardianMobile
                  ? "text-primary/60 cursor-not-allowed"
                  : "text-primary"
              )}
            >
              Resend OTP
            </button>
            <p className="text-white/70">
              {secondsLeft > 0
                ? `Resend OTP in ${secondsLeft} Seconds`
                : "You can resend now"}
            </p>
          </div>
          {error ? (
            <p className="mt-3 text-xs text-red-400 text-center">{error}</p>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mt-6 md:mt-8">
        <Button
          variant="fillPrimary"
          onClick={handleSubmit}
          disabled={isSubmitting || otp.join("").length !== OTP_LENGTH}
          size={isMobile ? "wFull" : "xl"}
          className="px-8"
        >
          {isSubmitting ? "Verifying…" : "Continue to Payment"}
        </Button>
      </div>
    </div>
  );
};

/**
 * Drop-in replacement for ShareBookingSheet.
 * Uses inline styles for critical layout/color so Tailwind purging can't break it.
 */

type ShareSummary = ReturnType<typeof buildBookingShareSummary>;

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FbIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function ShareBookingSheet({
  open,
  onClose,
  summary,
}: {
  open: boolean;
  onClose: () => void;
  summary: ShareSummary;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const body = [summary.text, summary.url].filter(Boolean).join("\n\n");

  const shareNative = async () => {
    if (!navigator?.share) return;
    try {
      await navigator.share({
        title: summary.title,
        text: body,
        url: summary.url || undefined,
      });
      onClose();
    } catch (e) {
      if ((e as Error).name === "AbortError") return;
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  const canNativeShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";
  const fbBase =
    summary.url ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const platforms = [
    {
      key: "wa",
      label: "WhatsApp",
      color: "#25D366",
      iconColor: "#25D366",
      icon: <WaIcon />,
      onClick: () =>
        openShareUrl(`https://wa.me/?text=${encodeURIComponent(body)}`),
    },
    {
      key: "fb",
      label: "Facebook",
      color: "#1877F2",
      iconColor: "#1877F2",
      icon: <FbIcon />,
      onClick: () =>
        openShareUrl(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fbBase)}&quote=${encodeURIComponent(summary.text)}`
        ),
    },
    {
      key: "x",
      label: "X",
      color: "#fff",
      iconColor: "#fff",
      icon: <XIcon />,
      onClick: () =>
        openShareUrl(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(body)}`
        ),
    },
    {
      key: "cp",
      label: copied ? "Copied!" : "Copy",
      color: copied ? "#10b981" : "#aaa",
      iconColor: copied ? "#10b981" : "#aaa",
      icon: copied ? <CheckIcon /> : <CopyIcon />,
      onClick: () => void copyAll(),
    },
  ];

  /* ─────────────────────────────────────────────────────────────────── */
  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.80)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        padding: "20px",
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "380px",
          backgroundColor: "#161616",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}
      >
        {/* top accent glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "100px",
            background:
              "linear-gradient(135deg, rgba(234,88,12,0.28) 0%, rgba(234,88,12,0.06) 60%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        {/* close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            zIndex: 10,
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {/* content */}
        <div style={{ position: "relative", padding: "26px 22px 22px" }}>
          {/* header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "8px",
              marginBottom: "22px",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "15px",
                background: "rgba(234,88,12,0.14)",
                border: "1px solid rgba(234,88,12,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "4px",
              }}
            >
              <Icons.Share
                style={{ width: "20px", height: "20px", color: "#ea580c" }}
              />
            </div>
            <h2
              id="share-title"
              style={{
                margin: 0,
                color: "#fff",
                fontSize: "19px",
                fontWeight: 800,
                letterSpacing: "-0.3px",
              }}
            >
              Share Booking
            </h2>
            <p
              style={{
                margin: 0,
                color: "rgba(255,255,255,0.42)",
                fontSize: "13px",
                lineHeight: 1.6,
                maxWidth: "270px",
              }}
            >
              Quickly share booking details, pickup timings and essentials with
              friends &amp; family.
            </p>
          </div>

          {/* native share */}
          {canNativeShare && (
            <button
              type="button"
              onClick={() => void shareNative()}
              style={{
                width: "100%",
                height: "44px",
                borderRadius: "12px",
                background: "#ea580c",
                border: "none",
                color: "#fff",
                fontWeight: 700,
                fontSize: "14px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "7px",
                marginBottom: "14px",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
              Share via Device
            </button>
          )}

          {/* divider */}
          {canNativeShare && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
              <span
                style={{
                  color: "rgba(255,255,255,0.25)",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                or share to
              </span>
              <div
                style={{
                  flex: 1,
                  height: "1px",
                  background: "rgba(255,255,255,0.08)",
                }}
              />
            </div>
          )}

          {/* 4-col platform grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "18px",
            }}
          >
            {platforms.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={p.onClick}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "7px",
                  padding: "13px 4px 11px",
                  borderRadius: "14px",
                  border: "1px solid rgba(255,255,255,0.07)",
                  background: "rgba(255,255,255,0.04)",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background =
                    p.color === "#fff"
                      ? "rgba(255,255,255,0.12)"
                      : `${p.color}22`;
                  el.style.borderColor = `${p.color}55`;
                  el.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.borderColor = "rgba(255,255,255,0.07)";
                  el.style.transform = "translateY(0)";
                }}
              >
                <span
                  style={{
                    color: p.iconColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {p.icon}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "10px",
                    fontWeight: 600,
                    textAlign: "center",
                    lineHeight: 1.2,
                    letterSpacing: "0.1px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    padding: "0 2px",
                  }}
                >
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          {/* footer */}
          <p
            style={{
              margin: 0,
              color: "rgba(255,255,255,0.2)",
              fontSize: "11px",
              textAlign: "center",
              lineHeight: 1.6,
            }}
          >
            Shared details may include booking info, timings and venue details.
          </p>
        </div>
      </div>
    </div>
  );
}

export interface SuccessScreenProps {
  program: ProgramDetails;
  /** e.g. package_details[0].program_name from getAdventureWeb */
  displayProgramName?: string;
  ris: RisTemplate | null;
  bookingId?: string | null;
}

function formatProgramDateShort(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(-2);
  return `${dd}-${mm}-${yy}`;
}

function readDeparturePick(card: unknown): { date?: string; time?: string } {
  if (!card || typeof card !== "object") return {};
  const c = card as Record<string, unknown>;
  return {
    date: typeof c.departure_date === "string" ? c.departure_date : undefined,
    time: typeof c.departure_time === "string" ? c.departure_time : undefined,
  };
}

function readArrivalDrop(card: unknown): { date?: string; time?: string } {
  if (!card || typeof card !== "object") return {};
  const c = card as Record<string, unknown>;
  return {
    date: typeof c.arrival_date === "string" ? c.arrival_date : undefined,
    time: typeof c.arrival_time === "string" ? c.arrival_time : undefined,
  };
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({
  program,
  displayProgramName,
  ris,
  bookingId,
}) => {
  const carryFromTemplate = (() => {
    const items = ris?.what_to_carry_section?.feature_cards?.items;
    const filtered = filterRisItems(items);
    if (filtered.length) {
      return filtered.map((c) => ({
        image: c.feature_icon,
        text: c.feature_title.trim(),
      }));
    }
    return [
      { image: "/images/essential-icon/theme-icon1.png", text: "Attire" },
      { image: "/images/essential-icon/theme-icon1.png", text: "Lunch" },
      { image: "/images/essential-icon/theme-icon1.png", text: "Cap" },
    ];
  })();

  const pickDrop = ris?.pick_and_drop_section;
  const pickupRaw = readDeparturePick(pickDrop?.departure_card);
  const dropRaw = readArrivalDrop(pickDrop?.arrival_card);

  const sectionHeading = pickDrop?.section_heading as
    | { title?: string; description?: string }
    | undefined;
  const locationBlurb =
    typeof sectionHeading?.description === "string"
      ? sectionHeading.description.trim()
      : "";
  const locationTitle =
    typeof sectionHeading?.title === "string"
      ? sectionHeading.title.trim()
      : "";

  const isMobile = useIsMobile();

  const programName =
    displayProgramName?.trim() || program.program_name || "Program";
  const venueDisplay = program.school?.trim() || "—";
  const bookingIdDisplay = bookingId?.trim() || "—";

  const [shareOpen, setShareOpen] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareSummary = useMemo(
    () =>
      buildBookingShareSummary({
        program,
        displayProgramName,
        ris,
        bookingId,
        pageUrl,
      }),
    [program, displayProgramName, ris, bookingId, pageUrl]
  );

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Top banner */}
      <div className="relative">
        <CustomImage
          src={
            isMobile
              ? "/images/booking-details-mobile.png"
              : "/images/booking-details.png"
          }
          width={1040}
          height={260}
          alt=""
          className="object-cover w-full"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col items-center text-center text-white pt-8 md:pt-10">
          <CustomImage
            src="/images/thanx.svg"
            width={72}
            height={72}
            alt="Success"
            className="mb-4"
          />
          <h4 className="!text-white font-nexa font-black text-2xl md:text-[36px]">
            YOU&apos;RE ALL SET
          </h4>
          <p className="mt-2 max-w-md text-xs md:text-sm leading-140 font-normal px-4">
            Your Booking Is Confirmed And Your Indemnity Is Completed. Check The
            Details Below.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="bg-dark-300 px-4 md:px-8 pt-6 md:pt-10 pb-8 md:pb-12 space-y-5 md:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 md:gap-6">
          {/* Program details */}
          <div className="bg-light-700 rounded-2xl p-4 border border-dark-300/15 shadow-sm">
            <p className="font-bold border-b border-light-100 pb-3 px-4 mb-3 -mx-4">
              Program Details
            </p>
            <div className="space-y-4">
              <p className="flex flex-col gap-0.5 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Icons.ProgramNameIcon />
                  Program Name:
                </span>
                <span>{programName}</span>
              </p>
              <p className="flex flex-col gap-0.5 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Icons.ProgramNameIcon />
                  Program Date:
                </span>
                <span>
                  {formatProgramDateShort(program.program_start_date)}
                </span>
              </p>
              <p className="flex flex-col gap-0.5 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Icons.ProgramNameIcon />
                  Venue:
                </span>
                <span>{venueDisplay}</span>
              </p>
              <p className="flex flex-col gap-0.5 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Icons.ProgramNameIcon />
                  Booking ID:
                </span>
                <span>{bookingIdDisplay}</span>
              </p>
              <p className="flex flex-col gap-0.5 text-sm">
                <span className="flex items-center gap-1.5 font-bold">
                  <Icons.ProgramNameIcon />
                  Program Code:
                </span>
                <span>{program.program_code || "—"}</span>
              </p>
            </div>

            {/* Gear promo banner */}
            <div className="relative overflow-hidden rounded-xl h-[58px] mt-5">
              <CustomImage
                src="/images/placeholder.png"
                width={367}
                height={58}
                alt="Gear up banner"
                aria-hidden="true"
                className="responsive-image-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(90.12deg,#111111_3.71%,rgba(17,17,17,0)_121.55%)]" />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                <p className="text-xs leading-140 text-white max-w-3xs pr-5">
                  Ready for adventure but missing the gear? Gear up now at{" "}
                  <a
                    href="https://challenge.rocksport.in/"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-primary"
                  >
                    https://challenge.rocksport.in
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Pickup & drop details */}
          <div className="bg-light-700 rounded-2xl p-4 border border-dark-300/15 shadow-sm">
            <p className="font-bold border-b border-light-100 pb-3 px-4 mb-3 -mx-4">
              Pickup &amp; Drop Details
            </p>
            <div className="grid grid-cols-1 gap-4 text-sm">
              <div className="space-y-3">
                <p className="font-bold">Pickup Details</p>
                <div className="grid grid-cols-2 items-center">
                  <p className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Icons.ProgramNameIcon />
                      Date:
                    </span>
                    <span className="text-dark-300/80">
                      {pickupRaw.date ?? "—"}
                    </span>
                  </p>
                  <p className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Icons.ProgramNameIcon />
                      Time:
                    </span>
                    <span className="text-dark-300/80">
                      {pickupRaw.time ?? "—"}
                    </span>
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-3 border-t border-light-100">
                <p className="font-bold">Drop Details</p>
                <div className="grid grid-cols-2 items-center">
                  <p className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Icons.ProgramNameIcon />
                      Date:
                    </span>
                    <span className="text-dark-300/80">
                      {dropRaw.date ?? "—"}
                    </span>
                  </p>
                  <p className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Icons.ProgramNameIcon />
                      Time:
                    </span>
                    <span className="text-dark-300/80">
                      {dropRaw.time ?? "—"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* What to Carry — data from getAdventureWeb.template_details.ris.what_to_carry_section */}
          <div className="flex flex-col gap-5 md:gap-6">
            <div className="bg-light-700 rounded-2xl p-4 border border-dark-300/15 shadow-sm">
              <p className="font-bold border-b border-light-100 pb-3 px-4 mb-3 -mx-4">
                What To Carry
              </p>
              <div className="grid grid-cols-3 gap-y-3 gap-x-5">
                {carryFromTemplate.map((item, index) => (
                  <CarryBadge
                    key={`${item.text}-${index}`}
                    image={item.image}
                    text={item.text}
                    width={24}
                    height={24}
                    isCarry
                  />
                ))}
              </div>
            </div>

            {/* What Not To Carry — hidden per product request (CMS/API may still carry items later).
            <div className="bg-light-700 rounded-2xl p-4 border border-dark-300/15 shadow-sm">
              <p className="font-bold border-b border-light-100 pb-3 px-4 mb-3 -mx-4">
                What Not To Carry (Prohibited)
              </p>
              ...
            </div>
            */}
          </div>
        </div>

        {/* Location copy from template pick_and_drop_section.section_heading when present */}
        {(locationTitle || locationBlurb) && (
          <div className="bg-white rounded-2xl p-5 border border-dark-300/15">
            <p className="flex items-center gap-2 text-sm font-semibold mb-4">
              <Icons.ProgramNameIcon /> {locationTitle || "Location Details"}
            </p>
            {locationBlurb ? (
              <p className="text-sm text-dark-300/80 whitespace-pre-wrap">
                {locationBlurb}
              </p>
            ) : null}
          </div>
        )}

        {/* Share button */}
        <div className="flex justify-center">
          <Button
            variant="outlinePrimary"
            className="px-10"
            size={isMobile ? "wFull" : "xl"}
            icon={
              <Icons.Share className="text-primary group-hover:text-white duration-300" />
            }
            iconPosition="left"
            onClick={() => setShareOpen(true)}
          >
            Share
          </Button>
        </div>
      </div>

      <ShareBookingSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        summary={shareSummary}
      />
    </div>
  );
};

export { PaymentFailed, OtpVerification, SuccessScreen };
