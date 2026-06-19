"use client";

import { useState } from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import DialogBox from "@/components/molecules/dialogBox";
import ScheduleGallery from "@/components/molecules/scheduleGallery";
import ScheduleTrack from "@/components/molecules/ScheduleTrack";
import SectionTitle from "@/components/molecules/sectionTitle";
import FeatureBadge from "@/components/molecules/featureBadge";
import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import useIsMobile from "@/lib/useIsMobile";
import type { ProgramDetails } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

// ─── Static fallbacks (used only when API data is absent) ─────────────────────
const fallbackScheduleImages = [
  { image: "/images/schedule1.webp" },
  { image: "/images/schedule2.webp" },
  { image: "/images/schedule3.webp" },
];

const fallbackFeatureData = [
  { src: "/images/feature-badge/badge-1.png", title: "In School Premises" },
  { src: "/images/feature-badge/badge-2.png", title: "Activity Count" },
  { src: "/images/feature-badge/badge-3.png", title: "Certifications" },
  {
    src: "/images/feature-badge/badge-4.png",
    title: "Experimental Learning Games",
  },
  { src: "/images/feature-badge/badge-5.png", title: "Cultural Experiences" },
  { src: "/images/feature-badge/badge-6.png", title: "Class start and End" },
  { src: "/images/feature-badge/badge-7.png", title: "1:20 Instructor Ratio" },
  { src: "/images/feature-badge/badge-8.png", title: "Class start and End" },
];

const defaultScheduleData = [
  { time: "08:30 AM", schedule: "Assembly in School & Departure for Camp" },
  { time: "09:00 AM", schedule: "Arrival at Camp & Activity Briefing" },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface FeatureCard {
  feature_icon: string;
  feature_title: string;
  is_selected?: boolean;
}

interface AboutProgramSection {
  section_heading: {
    title: string;
    sub_title: string;
  };
  image_gallery: {
    images: string[];
  };
  feature_cards: FeatureCard[];
  booking_card: {
    booking_label: string;
    price_label: string;
  };
  pricing: {
    supercoin_label: string;
  };
  button: {
    cta_text: string;
    cta_link: string;
  };
}

interface AdventureScheduleProps {
  variant?: "ris" | "rdo";
  programDetails?: ProgramDetails;
  aboutProgramSection?: AboutProgramSection;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

const AdventureSchedule = ({
  variant = "ris",
  programDetails,
  aboutProgramSection,
}: AdventureScheduleProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  // ── Derived display values ──────────────────────────────────────────────────
  const priceDisplay = programDetails
    ? formatCurrency(
        programDetails.cost_per_student ?? programDetails.cost_per_school
      )
    : "₹1,900";

  const usePayOnlineLabel =
    !programDetails?.payment_types?.length ||
    programDetails.payment_types.some((p) =>
      p.toLowerCase().includes("pay online")
    );

  // ── Section heading (API → fallback) ───────────────────────────────────────
  const sectionTitle =
    aboutProgramSection?.section_heading?.title ??
    "How you'll spend your adventure";
  const sectionSubTitle =
    aboutProgramSection?.section_heading?.sub_title ?? "Schedule";

  // ── Gallery images: API strings → { image } objects (fallback to static) ───
  const scheduleImages = aboutProgramSection?.image_gallery?.images?.length
    ? aboutProgramSection.image_gallery.images.map((url) => ({ image: url }))
    : fallbackScheduleImages;

  // ── Feature badges: API feature_cards → { src, title } objects (fallback) ──
  const featureData = aboutProgramSection?.feature_cards?.length
    ? filterRisItems(aboutProgramSection.feature_cards).map((card) => ({
        src: card.feature_icon,
        title: card.feature_title,
      }))
    : fallbackFeatureData;

  // ── Booking footer labels ───────────────────────────────────────────────────
  const bookingLabel =
    aboutProgramSection?.booking_card?.booking_label ?? "Booking Fee";
  const superCoinLabel =
    aboutProgramSection?.pricing?.supercoin_label ?? "Achieve 100 Supercoins*";
  const ctaText = aboutProgramSection?.button?.cta_text ?? "Book Now";

  return (
    <section className="schedule-bg-image py-10 md:py-20 relative z-20">
      <div className="container">
        <SectionTitle
          title={sectionTitle}
          heading={sectionSubTitle}
          customClass="w-[211px] md:w-[540px]"
          headingColor
        />

        {variant === "ris" && (
          <div className="grid md:grid-cols-2 gap-11 lg:gap-15 mt-11 lg:mt-15">
            <ScheduleGallery
              images={scheduleImages}
              onOpenDialog={() => setIsDialogOpen(true)}
            />
            <FeatureBadge heading="Feature" data={featureData} />
          </div>
        )}

        {variant === "rdo" && (
          <>
            <div className="grid md:grid-cols-2 gap-10 lg:gap-15 mt-11 lg:mt-15">
              <ScheduleTrack data={defaultScheduleData} />
              <ScheduleGallery
                images={scheduleImages}
                onOpenDialog={() => setIsDialogOpen(true)}
                variant="rdo"
              />
            </div>
            <FeatureBadge
              heading="Features"
              data={featureData}
              gridStyle="grid-cols-2 md:grid-cols-4"
              className="mt-10 md:mt-15"
            />
          </>
        )}

        {/* Booking Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center lg:items-start gap-6 lg:gap-0 pt-11 md:pt-15">
          <div className="w-full md:w-auto">
            <div className="flex items-center gap-10 bg-dark-100 border border-white rounded-xl p-4 w-full md:w-2xs lg:h-16">
              <p className="text-xl text-primary font-bold w-20">
                {bookingLabel}
              </p>
              <div className="flex flex-col">
                <span className="inline-block text-white text-sm font-normal">
                  {usePayOnlineLabel ? "Pay Online" : "Price per Head"}
                </span>
                <span className="inline-block text-white font-bold text-2xl leading-none">
                  {priceDisplay}
                </span>
              </div>
            </div>
            <figure className="flex items-center justify-center md:justify-start gap-2 mt-3 md:mt-2">
              <CustomImage
                src="/images/supercoin-icon/supercoin.svg"
                width={24}
                height={24}
                alt=""
                aria-hidden="true"
              />
              <figcaption className="text-white font-semibold">
                {superCoinLabel}
              </figcaption>
            </figure>
          </div>

          <Button
            size={isMobile ? "wFull" : undefined}
            variant="fillPrimary"
            icon={<Icons.arrowRight />}
          >
            {ctaText}
          </Button>
        </div>
      </div>

      {/* Dialog with schedule gallery images */}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Schedule Images"
        closeIcon={true}
      >
        <CustomSlider
          items={scheduleImages}
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          sliderContainerStyle="h-full navigation-style1"
        >
          {(item, index) => (
            <div className="h-full">
              <CustomImage
                src={item.image}
                width={1200}
                height={800}
                alt={`schedule-${index + 1}`}
                className="responsive-image-cover"
              />
            </div>
          )}
        </CustomSlider>
      </DialogBox>

      <div className="block sm:hidden absolute -z-10 bottom-0 left-0 right-0 h-5/12 w-full bg-secondary" />
    </section>
  );
};

export default AdventureSchedule;
