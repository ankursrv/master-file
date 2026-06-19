"use client";
import React, {
  useState,
  ChangeEvent,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BookingIndicator from "../bookingIndicator";
import ParticipantForm from "../participantForm";
import GuardianForm from "../guardianForm";
import TripForm from "../tripForm";
import ConsentForm from "../consentForm";
import {
  bookingToFormDataShape,
  buildCreateAdventureBookingInput,
  getProgramPayableAmount,
  resolveBookingPaymentOptions,
} from "@/lib/adventureBookingMaps";
import { normalizeCartDiscountLabel } from "@/lib/cartPriceNormalize";
import {
  useGetAdventureBookingByIdQuery,
  useCreateAdventureBookingMutation,
} from "@/store/services/adventureApi";
import {
  useGetCartDetailsQuery,
  useB2bSetAddressAndPaymentMutation,
  useLazyCouponCodeListQuery,
  useApplyCouponToCartMutation,
  useRemoveCouponFromCartMutation,
  usePlaceOrderMutation,
  useLazyGetPhonePeOrderStatusQuery,
} from "@/store/services/bookingCheckoutApi";
import type { ProgramDetails } from "@/types/adventure";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectBookingForm } from "@/store/slices/adventureSlice";
import {
  hydrateBookingSessionForProgram,
  setBookingSession,
  setPendingMerchantOrderId,
  clearBookingSession,
  selectBookingSession,
} from "@/store/slices/bookingSessionSlice";
import {
  selectRisTemplate,
  selectAdventureData,
} from "@/store/slices/adventureSlice";
import {
  coreRequestOtp,
  coreVerifyOtp,
  normalizeBookingMobile,
} from "@/lib/otpConsent";
import { loadPhonePeCheckoutScriptForTokenUrl } from "@/lib/phonePeCheckout";

/** Used on non–RIS pages that still embed the booking form without program context. */
const DEMO_PROGRAM: ProgramDetails = {
  _id: "demo",
  program_code: "DEMO",
  program_name: "Rocksport Adventure",
  program_type: "day_out",
  school: "",
  program_start_date: new Date().toISOString(),
  program_end_date: new Date().toISOString(),
  price: 1900,
  status: "active",
  package_skus: [],
  school_id: "",
  transport_include: false,
  food_include: false,
  cost_per_school: 0,
  payment_types: ["pay online"],
  page_url: "",
  expected_students: 0,
  actual_students: 0,
  cost_per_student: 1900,
  registration_start_date: new Date().toISOString(),
  registration_end_date: new Date().toISOString(),
  classes: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

import {
  PaymentFailed,
  OtpVerification,
  SuccessScreen,
} from "../submissionSuccess";

interface Guardian {
  guardianType: string;
  guardianName: string;
  guardianContact: string;
  guardianEmail: string;
}

interface BookingFormData {
  fullName: string;
  mobileNumber: string;
  class: string;
  section: string;
  bloodGroup: string;
  dateOfBirth: string;
  email: string;
  idProof: File | null;
  guardians: Guardian[];
  medicalConditions: string;
  paymentMethod: string;
  couponCode: string;
  otpConsent: boolean;
  disclaimerAccepted: boolean;
  termsAccepted: boolean;
  [key: string]: unknown;
}

/** Main form steps: 1–2 participant/guardian, 3 consent, 4 OTP, 5 payment checkout. */
const TOTAL_STEPS = 5;

const formatInr = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

function formatDateLabel(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Paid — Magento commonly uses `complete` / `processing`, not the literal `success`. */
const PHONEPE_PAID_STATUSES = new Set([
  "success",
  "complete",
  "processing",
  "paid",
  "payment_success",
  "payment_complete",
]);

const PHONEPE_FAILED_STATUSES = new Set([
  "failed",
  "failure",
  "cancelled",
  "canceled",
]);

/** Wait before first status check so PhonePe can load and the customer can pay. */
const PAYMENT_STATUS_INITIAL_DELAY_MS = 3_500;
/** Interval between checks — avoids burst requests (same merchant order). */
const PAYMENT_STATUS_POLL_INTERVAL_MS = 3_500;
const PAYMENT_STATUS_MAX_POLLS = 36;
/**
 * Trust a single failed status after this elapsed time, or sooner if two polls in a row report failure.
 */
const MIN_MS_BEFORE_TRUST_FAILURE = 8_000;

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function classifyMagentoPaymentStatus(
  status: string | null | undefined
): "paid" | "failed" | "pending" {
  const st = String(status ?? "")
    .trim()
    .toLowerCase();
  if (PHONEPE_PAID_STATUSES.has(st)) return "paid";
  if (PHONEPE_FAILED_STATUSES.has(st)) return "failed";
  return "pending";
}

const initialFormData = (): BookingFormData => ({
  fullName: "",
  mobileNumber: "",
  class: "",
  section: "",
  bloodGroup: "",
  dateOfBirth: "",
  email: "",
  idProof: null,
  guardians: [
    {
      guardianType: "",
      guardianName: "",
      guardianContact: "",
      guardianEmail: "",
    },
  ],
  medicalConditions: "",
  paymentMethod: "online",
  couponCode: "",
  otpConsent: false,
  disclaimerAccepted: false,
  termsAccepted: false,
});

type BookingFormProps = {
  program?: ProgramDetails;
  /** Shown as “Adventure Name” (e.g. RIS `school_banner.program_title`). */
  adventureDisplayName?: string;
  initialBookingId?: string;
};

const BookingForm = ({
  program: programProp,
  adventureDisplayName,
  initialBookingId,
}: BookingFormProps) => {
  const program = programProp ?? DEMO_PROGRAM;
  const useIntegratedCheckout = program._id !== "demo";
  const dispatch = useAppDispatch();
  const bookingSession = useAppSelector(selectBookingSession);
  const risTemplate = useAppSelector(selectRisTemplate);
  const adventureData = useAppSelector(selectAdventureData);
  const pathname = usePathname();

  const bookingForm = useAppSelector(selectBookingForm);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [createError, setCreateError] = useState<string>("");
  const [selectedCheckoutPaymentCode, setSelectedCheckoutPaymentCode] =
    useState<string | null>(null);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [couponApplyError, setCouponApplyError] = useState("");
  const [placeOrderError, setPlaceOrderError] = useState("");
  const [isPlaceOrderLoading, setIsPlaceOrderLoading] = useState(false);
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [paymentFailureOrderLabel, setPaymentFailureOrderLabel] = useState("");
  const [isRequestingOtp, setIsRequestingOtp] = useState(false);
  const [otpVerifyError, setOtpVerifyError] = useState("");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const hydratedFromApi = useRef(false);
  const bookingKeyRef = useRef<string | undefined>(undefined);
  const paymentReturnHandledRef = useRef(false);
  /** Cancels an in-flight poll when leaving checkout or starting a new payment attempt. */
  const paymentVerificationAbortRef = useRef<AbortController | null>(null);

  const cartId = bookingSession.cartId;
  const customerToken = bookingSession.customerToken;

  const {
    data: existingBooking,
    isError: loadBookingError,
    error: loadError,
  } = useGetAdventureBookingByIdQuery(initialBookingId as string, {
    skip: !initialBookingId,
  });

  const [createAdventureBooking, { isLoading: isCreatingBooking }] =
    useCreateAdventureBookingMutation();

  const {
    data: cartPayload,
    refetch: refetchCart,
    isFetching: cartFetching,
  } = useGetCartDetailsQuery(
    { cartId: cartId as string, token: customerToken as string },
    {
      skip:
        !useIntegratedCheckout ||
        !cartId ||
        !customerToken ||
        currentStep !== 5,
    }
  );

  const [setAddressPayment] = useB2bSetAddressAndPaymentMutation();
  const [triggerCouponList, { data: couponHints = [] }] =
    useLazyCouponCodeListQuery();
  const [applyCouponToCart] = useApplyCouponToCartMutation();
  const [removeCouponFromCart] = useRemoveCouponFromCartMutation();
  const [placeOrder] = usePlaceOrderMutation();
  const [triggerPhonePeStatus] = useLazyGetPhonePeOrderStatusQuery();

  useEffect(() => {
    dispatch(hydrateBookingSessionForProgram({ adventureId: program._id }));
  }, [dispatch, program._id]);

  useEffect(() => {
    if (
      !useIntegratedCheckout ||
      currentStep !== 5 ||
      !cartId ||
      !customerToken
    ) {
      return;
    }
    void refetchCart();
  }, [useIntegratedCheckout, currentStep, cartId, customerToken, refetchCart]);

  useEffect(() => {
    if (
      !useIntegratedCheckout ||
      currentStep !== 5 ||
      !customerToken ||
      couponHints.length > 0
    )
      return;
    void triggerCouponList({ token: customerToken });
  }, [
    useIntegratedCheckout,
    currentStep,
    customerToken,
    couponHints.length,
    triggerCouponList,
  ]);

  useEffect(() => {
    if (initialBookingId !== bookingKeyRef.current) {
      bookingKeyRef.current = initialBookingId;
      hydratedFromApi.current = false;
    }
  }, [initialBookingId]);

  useEffect(() => {
    if (!initialBookingId || !existingBooking || hydratedFromApi.current)
      return;

    const b = bookingToFormDataShape(existingBooking);

    setFormData((prev) => {
      if (
        prev.fullName === b.fullName &&
        prev.mobileNumber === b.mobileNumber
      ) {
        return prev;
      }

      hydratedFromApi.current = true;

      return {
        ...prev,
        fullName: b.fullName,
        mobileNumber: b.mobileNumber,
        class: b.class,
        section: b.section,
        dateOfBirth: b.dateOfBirth,
        email: b.email,
        medicalConditions: b.medicalConditions,
        couponCode: b.couponCode,
        paymentMethod: b.paymentMethod,
        guardians: b.guardians,
      };
    });
  }, [initialBookingId, existingBooking]);

  const pollPaymentUntilResolved = useCallback(
    async (
      merchantOrderId: string,
      token: string,
      shouldAbort?: () => boolean
    ): Promise<"success" | "failed" | "timeout"> => {
      const sessionStart = Date.now();
      if (shouldAbort?.()) return "timeout";

      await delay(PAYMENT_STATUS_INITIAL_DELAY_MS);
      if (shouldAbort?.()) return "timeout";

      let attempts = 0;
      let consecutiveFailedPolls = 0;
      while (attempts < PAYMENT_STATUS_MAX_POLLS) {
        if (shouldAbort?.()) return "timeout";
        attempts += 1;

        try {
          const res = await triggerPhonePeStatus({
            merchantOrderId,
            token,
          }).unwrap();
          const classification = classifyMagentoPaymentStatus(
            res.order?.status
          );
          if (classification === "paid") {
            return "success";
          }
          if (classification === "failed") {
            consecutiveFailedPolls += 1;
            const elapsed = Date.now() - sessionStart;
            if (
              consecutiveFailedPolls >= 2 ||
              elapsed >= MIN_MS_BEFORE_TRUST_FAILURE
            ) {
              return "failed";
            }
          } else {
            consecutiveFailedPolls = 0;
          }
        } catch {
          /* keep polling */
        }

        await delay(PAYMENT_STATUS_POLL_INTERVAL_MS);
      }
      return "timeout";
    },
    [triggerPhonePeStatus]
  );

  /* URL return flow: omit currentStep from deps so step changes don’t re-run this effect. */
  useEffect(() => {
    if (!useIntegratedCheckout || typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const orderParam =
      params.get("merchantOrderId") ?? params.get("orderId") ?? "";
    if (
      !orderParam ||
      !customerToken ||
      paymentReturnHandledRef.current ||
      currentStep === 7
    ) {
      return;
    }

    paymentReturnHandledRef.current = true;
    setVerifyingPayment(true);

    let cancelled = false;

    const finish = async () => {
      const outcome = await pollPaymentUntilResolved(
        orderParam,
        customerToken,
        () => cancelled
      );
      if (cancelled) return;
      if (typeof window !== "undefined") {
        window.history.replaceState(
          {},
          "",
          pathname || window.location.pathname
        );
      }
      setVerifyingPayment(false);
      if (outcome === "success") {
        setCurrentStep(7);
      } else {
        setPaymentFailureOrderLabel(orderParam);
        setCurrentStep(6);
      }
    };

    void finish();

    return () => {
      cancelled = true;
    };
    // Omit currentStep from deps so advancing steps after checkout doesn’t restart this effect.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see above
  }, [
    useIntegratedCheckout,
    customerToken,
    pathname,
    pollPaymentUntilResolved,
  ]);

  useEffect(() => {
    return () => {
      paymentVerificationAbortRef.current?.abort();
    };
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    guardianIndex: number | null = null
  ) => {
    setCreateError("");
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    if (guardianIndex !== null) {
      setFormData((prev) => ({
        ...prev,
        guardians: prev.guardians.map((g, i) =>
          i === guardianIndex ? { ...g, [name]: value } : g
        ),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSelectChange = useCallback(
    (name: string, value: string, guardianIndex: number | null = null) => {
      setCreateError("");
      if (guardianIndex !== null) {
        setFormData((prev) => ({
          ...prev,
          guardians: prev.guardians.map((g, i) =>
            i === guardianIndex ? { ...g, [name]: value } : g
          ),
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: keyof BookingFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: e.target.files?.[0] ?? null,
    }));
  };

  const handleRemoveGuardian = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      guardians: prev.guardians.filter((_, i) => i !== index),
    }));
  };

  const handleNext = () => setCurrentStep((prev) => prev + 1);
  const handleBack = () => setCurrentStep((prev) => prev - 1);
  const goToStep = (step: number) => setCurrentStep(step);

  const resetFlowFromStepOne = () => {
    paymentVerificationAbortRef.current?.abort();
    paymentVerificationAbortRef.current = null;
    dispatch(clearBookingSession());
    paymentReturnHandledRef.current = false;
    if (typeof window !== "undefined") {
      window.history.replaceState({}, "", pathname || window.location.pathname);
    }
    setCurrentStep(1);
    setFormData(initialFormData());
    setSelectedCheckoutPaymentCode(null);
    setCreateError("");
    setCouponApplyError("");
    setPlaceOrderError("");
    setPaymentFailureOrderLabel("");
    setVerifyingPayment(false);
  };

  const handleIntegratedGuardianContinue = async () => {
    setCreateError("");
    try {
      const input = buildCreateAdventureBookingInput(formData, program);
      const result = await createAdventureBooking(input).unwrap();
      dispatch(
        setBookingSession({
          customerToken: result.customer_token,
          customerId: result.customer_id,
          cartId: result.cart_id,
          bookingId: result.booking._id,
          adventureId: program._id,
          pendingMerchantOrderId: null,
        })
      );
      setSelectedCheckoutPaymentCode(null);
      setCouponApplyError("");
      setPlaceOrderError("");
      handleNext();
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "data" in e
          ? String((e as { data?: unknown }).data)
          : e && typeof e === "object" && "message" in e
            ? String((e as { message: string }).message)
            : "Could not save booking. Please try again.";
      setCreateError(message);
    }
  };

  const sendGuardianOtpOrSetError = async (): Promise<boolean> => {
    const mobile = normalizeBookingMobile(
      formData.guardians[0]?.guardianContact ?? ""
    );
    if (!mobile) {
      setCreateError(
        "Enter a valid 10-digit guardian mobile number on step 2 before requesting OTP."
      );
      return false;
    }
    const res = await coreRequestOtp(mobile);
    if (!res.ok) {
      setCreateError(res.message);
      return false;
    }
    return true;
  };

  const onLegacyConsentAndSubmit = async () => {
    setCreateError("");
    try {
      const input = buildCreateAdventureBookingInput(formData, program);
      await createAdventureBooking(input).unwrap();
      setIsRequestingOtp(true);
      try {
        const ok = await sendGuardianOtpOrSetError();
        if (ok) goToStep(4);
      } finally {
        setIsRequestingOtp(false);
      }
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message: string }).message)
          : "Could not save booking. Please try again.";
      setCreateError(message);
    }
  };

  const onIntegratedConsentContinue = async () => {
    setCreateError("");
    setIsRequestingOtp(true);
    try {
      const ok = await sendGuardianOtpOrSetError();
      if (ok) goToStep(4);
    } finally {
      setIsRequestingOtp(false);
    }
  };

  const handleResendGuardianOtp = async () => {
    const mobile = normalizeBookingMobile(
      formData.guardians[0]?.guardianContact ?? ""
    );
    if (!mobile) return;
    const res = await coreRequestOtp(mobile);
    if (!res.ok) setOtpVerifyError(res.message);
    else setOtpVerifyError("");
  };

  const handleSubmitConsentOtp = async (otp: string) => {
    const mobile = normalizeBookingMobile(
      formData.guardians[0]?.guardianContact ?? ""
    );
    if (!mobile || otp.replace(/\D/g, "").length !== 6) {
      setOtpVerifyError("Enter the 6-digit OTP sent to the guardian number.");
      return;
    }
    const cleanOtp = otp.replace(/\D/g, "").slice(0, 6);
    setIsVerifyingOtp(true);
    setOtpVerifyError("");
    try {
      const res = await coreVerifyOtp(mobile, cleanOtp);
      if (!res.ok) {
        setOtpVerifyError(res.message);
        return;
      }
      /* OTP proves guardian consent only. Checkout must keep `customer_token` + `cart_id`
       * from `createAdventureBooking`, not `verifyOtp` access_token/cart_id. */
      goToStep(5);
    } catch (e: unknown) {
      const message =
        e instanceof Error ? e.message : "Could not verify OTP. Try again.";
      setOtpVerifyError(message);
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const cart = cartPayload?.cart;
  const prices = cart?.prices;
  const grandTotal = prices?.grand_total?.value ?? 0;
  const subtotalIncludingTax = prices?.subtotal_including_tax?.value ?? 0;
  const subtotalExcludingTax = prices?.subtotal_excluding_tax?.value ?? 0;
  const discountRaw = prices?.discount?.amount?.value;
  const discountAmountAbs =
    discountRaw != null && Math.abs(discountRaw) > 0.0001
      ? Math.abs(discountRaw)
      : null;
  const discountLabel = normalizeCartDiscountLabel(
    Array.isArray(prices?.discount?.label)
      ? prices.discount.label.join(", ")
      : prices?.discount?.label
  );
  const totalSaving =
    prices?.total_saving != null && prices.total_saving > 0
      ? prices.total_saving
      : null;
  const appliedCouponCodes = cart?.applied_coupons?.map((c) => c.code) ?? [];
  const availableMethods = (cart?.available_payment_methods ?? []).filter(
    (m) => String(m.code ?? "").trim() && String(m.title ?? "").trim()
  );

  const handleSelectCheckoutPayment = async (code: string) => {
    if (!cartId || !customerToken) return;
    setSelectedCheckoutPaymentCode(code);
    setCheckoutBusy(true);
    try {
      await setAddressPayment({
        cartId,
        token: customerToken,
        paymentMethod: code,
      }).unwrap();
      await refetchCart();
    } finally {
      setCheckoutBusy(false);
    }
  };

  const handleApplyCouponCheckout = async (code: string) => {
    if (!cartId || !customerToken) return;
    setCouponApplyError("");
    setCheckoutBusy(true);
    try {
      await applyCouponToCart({ cartId, token: customerToken, code }).unwrap();
      await refetchCart();
    } catch (err) {
      const msg =
        err && typeof err === "object" && "data" in err
          ? String((err as { data?: unknown }).data)
          : "Could not apply coupon.";
      setCouponApplyError(msg);
      throw err;
    } finally {
      setCheckoutBusy(false);
    }
  };

  const handleRemoveCouponCheckout = async () => {
    if (!cartId || !customerToken) return;
    setCouponApplyError("");
    setCheckoutBusy(true);
    try {
      await removeCouponFromCart({ cartId, token: customerToken }).unwrap();
      await refetchCart();
    } finally {
      setCheckoutBusy(false);
    }
  };

  const handleCheckoutProceed = async () => {
    setPlaceOrderError("");
    if (!cartId || !customerToken || !selectedCheckoutPaymentCode) return;
    setIsPlaceOrderLoading(true);
    try {
      const po = await placeOrder({ cartId, token: customerToken }).unwrap();
      if (po.errors?.length) {
        setPlaceOrderError(po.errors.map((x) => x.message).join(". "));
        return;
      }
      dispatch(setPendingMerchantOrderId(po.order.order_number));

      if (po.redirect_url) {
        paymentVerificationAbortRef.current?.abort();
        const pollAbort = new AbortController();
        paymentVerificationAbortRef.current = pollAbort;

        try {
          await loadPhonePeCheckoutScriptForTokenUrl(po.redirect_url);
        } catch {
          paymentVerificationAbortRef.current = null;
          setPlaceOrderError(
            "Could not load PhonePe checkout. Check your connection and try again."
          );
          return;
        }

        if (pollAbort.signal.aborted) return;

        if (!window.PhonePeCheckout?.transact) {
          paymentVerificationAbortRef.current = null;
          setPlaceOrderError(
            "PhonePe checkout is not available. Please refresh and try again."
          );
          return;
        }

        const merchantOrderId = po.order.order_number;

        setVerifyingPayment(true);

        window.PhonePeCheckout.transact({
          tokenUrl: po.redirect_url,
          type: "IFRAME",
          callback: () => {
            void (async () => {
              if (pollAbort.signal.aborted) {
                setVerifyingPayment(false);
                return;
              }
              try {
                const outcome = await pollPaymentUntilResolved(
                  merchantOrderId,
                  customerToken,
                  () => pollAbort.signal.aborted
                );
                if (paymentVerificationAbortRef.current === pollAbort) {
                  paymentVerificationAbortRef.current = null;
                }
                setVerifyingPayment(false);
                if (pollAbort.signal.aborted) return;
                if (outcome === "success") {
                  goToStep(7);
                  return;
                }
                setPaymentFailureOrderLabel(merchantOrderId);
                goToStep(6);
              } catch {
                setVerifyingPayment(false);
                if (!pollAbort.signal.aborted) {
                  setPaymentFailureOrderLabel(merchantOrderId);
                  goToStep(6);
                }
              }
            })();
          },
        });

        return;
      }

      // Pay-later and other non-gateway methods: no redirect, order already placed
      goToStep(7);
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "data" in e
          ? String((e as { data?: unknown }).data)
          : "Could not place order. Please try again.";
      setPlaceOrderError(message);
    } finally {
      setIsPlaceOrderLoading(false);
    }
  };

  const isFullStepFlow = currentStep >= 1 && currentStep <= 5;
  const isPaymentFailed = currentStep === 6;
  const isOtp = currentStep === 4;
  const isSuccess = currentStep === 7;

  const headerTitle = isPaymentFailed ? "PAYMENT FAILED" : "BOOKING FORM";
  const headerSubtitle = isPaymentFailed
    ? "Something went wrong while processing your payment."
    : "Fill up the form to book your adventure";

  const adventureName = adventureDisplayName ?? program.program_name;
  const adventureDateDisplay = formatDateLabel(program.program_start_date);
  const payableAmount = getProgramPayableAmount(program);
  const costDisplay = formatInr(payableAmount);
  const regDeadlineDisplay = formatDateLabel(
    program.registration_end_date || program.program_start_date
  );

  const programDateForTrip = formatDateLabel(program.program_start_date);
  const payableForTrip = formatInr(
    useIntegratedCheckout && grandTotal > 0 ? grandTotal : payableAmount
  );

  const page3Payment = bookingForm?.page_3?.payment;
  const resolvedPaymentOptions = resolveBookingPaymentOptions(
    page3Payment?.payment_options,
    program.payment_types
  );

  const loadErrorMessage = loadBookingError
    ? String(
        loadError && typeof loadError === "object" && "data" in loadError
          ? (loadError as { data?: { message?: string } }).data?.message
          : loadError
      ) || "Could not load this booking."
    : "";

  const guardianContinueHandler = useIntegratedCheckout
    ? handleIntegratedGuardianContinue
    : handleNext;

  /**
   * Legacy TripForm uses this after choosing pay option; integrated checkout uses
   * `onCheckoutProceed` instead — this must not advance the step (would hit “payment failed”).
   */
  const handleTripFormNonCheckoutNext = () => {
    if (useIntegratedCheckout) {
      return;
    }
    goToStep(7);
  };

  const integratedCheckoutConfig =
    useIntegratedCheckout && currentStep === 5
      ? {
          grandTotal,
          subtotalIncludingTax,
          subtotalExcludingTax,
          discountAmountAbs,
          discountLabel,
          totalSaving,
          methods: availableMethods,
          selectedCode: selectedCheckoutPaymentCode,
          onSelectMethod: handleSelectCheckoutPayment,
          appliedCouponCodes,
          onApplyCoupon: handleApplyCouponCheckout,
          onRemoveCoupon: handleRemoveCouponCheckout,
          couponHints,
          isBusy: checkoutBusy,
        }
      : null;

  return (
    <section
      id="booking-form"
      className={cn(
        "relative overflow-x-hidden overflow-y-visible scroll-mt-24"
      )}
    >
      {isSuccess ? (
        <div className="container">
          <SuccessScreen
            program={program}
            displayProgramName={
              adventureData?.package_details?.[0]?.program_name
            }
            ris={risTemplate}
            bookingId={bookingSession.bookingId}
          />
        </div>
      ) : (
        <div className="relative overflow-x-hidden overflow-y-visible">
          <div className="relative pt-8 md:pt-12 pb-20 md:pb-28 booking-header-grunge">
            <div className="container">
              <h2 className="text-2xl md:text-[40px] font-black font-nexa text-dark leading-120">
                {headerTitle}
              </h2>
              <p className="mt-1 md:mt-[10px] text-sm md:text-[20px] text-dark-200 font-semibold">
                {headerSubtitle}
              </p>

              {initialBookingId && loadErrorMessage && (
                <p className="mt-4 text-sm text-amber-800 max-w-2xl">
                  {loadErrorMessage}
                </p>
              )}

              {!isPaymentFailed && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 md:gap-0 mt-6 md:mt-11 max-w-4xl">
                  <div>
                    <p className="text-dark-300 font-bold text-sm md:text-[20px]">
                      Adventure Date:
                    </p>
                    <p className="text-dark-300 text-xs md:text-base font-normal mt-1">
                      {adventureDateDisplay}
                    </p>
                  </div>
                  <div>
                    <p className="text-dark font-bold text-sm md:text-[20px]">
                      Adventure Name:
                    </p>
                    <p className="text-dark-300 text-xs md:text-base font-normal mt-1">
                      {adventureName}
                    </p>
                  </div>
                  <div>
                    <p className="text-dark font-bold text-sm md:text-[20px]">
                      Cost:
                    </p>
                    <p className="text-dark-300 text-xs md:text-base font-normal mt-1">
                      {costDisplay}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative bg-[#211D1F] pt-4 md:pt-10 booking-body-grunge">
            <div className="container">
              {verifyingPayment && (
                <div className="mb-6 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-white text-sm">
                  Use the PhonePe window to pay. We’ll confirm with your bank
                  after you finish, then take you to the next step.
                </div>
              )}

              {isFullStepFlow && (
                <div className="pb-4 md:pb-5 border-b border-[#FFFFFF33] mb-5 md:mb-11">
                  <p className="text-white text-sm md:text-[20px]">
                    <span className="font-bold">
                      Last Date Of Registration:
                    </span>
                    <span className="font-normal inline-block ml-2">
                      {regDeadlineDisplay}
                    </span>
                  </p>
                </div>
              )}

              {isFullStepFlow && (
                <BookingIndicator
                  currentStep={currentStep}
                  totalSteps={TOTAL_STEPS}
                />
              )}

              <div className="mt-6 md:mt-[60px]">
                {currentStep === 1 && (
                  <ParticipantForm
                    formData={formData}
                    classOptions={program.classes ?? []}
                    onChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    onFileChange={handleFileChange}
                    onNext={handleNext}
                  />
                )}

                {currentStep === 2 && (
                  <GuardianForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    onRemoveGuardian={handleRemoveGuardian}
                    onNext={guardianContinueHandler}
                    onBack={handleBack}
                    isSubmitting={useIntegratedCheckout && isCreatingBooking}
                    submitError={createError}
                  />
                )}

                {currentStep === 3 && (
                  <ConsentForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSubmit={
                      useIntegratedCheckout
                        ? onIntegratedConsentContinue
                        : onLegacyConsentAndSubmit
                    }
                    onBack={handleBack}
                    isSubmitting={
                      useIntegratedCheckout
                        ? isRequestingOtp
                        : isCreatingBooking || isRequestingOtp
                    }
                    submitError={createError}
                  />
                )}

                {isOtp && (
                  <OtpVerification
                    guardianMobile={
                      normalizeBookingMobile(
                        formData.guardians[0]?.guardianContact ?? ""
                      ) ?? ""
                    }
                    onSubmitConsent={handleSubmitConsentOtp}
                    onResendOtp={handleResendGuardianOtp}
                    isSubmitting={isVerifyingOtp}
                    error={otpVerifyError}
                  />
                )}

                {currentStep === 5 && (
                  <TripForm
                    formData={formData}
                    onChange={handleInputChange}
                    onSelectChange={handleSelectChange}
                    onNext={handleTripFormNonCheckoutNext}
                    onBack={handleBack}
                    programDateText={programDateForTrip}
                    payableText={payableForTrip}
                    paymentOptions={
                      integratedCheckoutConfig ? null : resolvedPaymentOptions
                    }
                    applyCtaLabel={bookingForm?.page_3?.cta?.apply}
                    checkout={integratedCheckoutConfig}
                    onCheckoutProceed={
                      useIntegratedCheckout ? handleCheckoutProceed : undefined
                    }
                    isCheckoutProceedLoading={
                      isPlaceOrderLoading || verifyingPayment
                    }
                    isCheckoutVerifying={verifyingPayment}
                    checkoutProceedError={placeOrderError}
                    checkoutCouponError={couponApplyError}
                    checkoutCartLoading={cartFetching}
                  />
                )}

                {isPaymentFailed && (
                  <PaymentFailed
                    orderLabel={paymentFailureOrderLabel}
                    rePayment={resetFlowFromStepOne}
                    onOpenTerms={resetFlowFromStepOne}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;
