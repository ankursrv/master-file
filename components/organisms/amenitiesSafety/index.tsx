"use client";

import CustomImage from "@/components/molecules/customImage";
import SectionTitle from "@/components/molecules/sectionTitle";
import CustomSlider from "@/components/molecules/customSlider";
import Card from "../card";
import type { SafetySection, SafetyFeatureCard } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface AmenitiesSafetyProps {
  variant?: "ris" | "rdo";
  sectionHeading?: SafetySection["section_heading"];
  safetyCards?: SafetyFeatureCard[];
  backgroundImageUrl?: string;
}

const AmenitiesSafety = ({
  sectionHeading,
  safetyCards = [],
  backgroundImageUrl,
}: AmenitiesSafetyProps) => {
  const title = sectionHeading?.title ?? "Your safety is our #1 priority";
  const subTitle = sectionHeading?.sub_title ?? "You can Trust Us";

  const visibleSafetyCards = filterRisItems(safetyCards);
  const midPoint = Math.ceil(visibleSafetyCards.length / 2);
  const leftCards = visibleSafetyCards.slice(0, midPoint);
  const rightCards = visibleSafetyCards.slice(midPoint);

  return (
    <section className="relative pt-15 md:pt-20 overflow-hidden bg-[#F3F1E44D]">
      <div className="hidden lg:block absolute inset-x-0 bottom-0 w-full pointer-events-none z-0">
        <CustomImage
          src="/images/amenities-safety-bg-image.webp"
          alt=""
          width={1920}
          height={200}
          className="w-full h-auto block"
          aria-hidden
        />
      </div>

      {/* ── Content ── */}
      <div className="container relative z-10">
        <SectionTitle
          title={title}
          heading={subTitle}
          customClass="w-[211px] lg:w-[395px]"
        />

        {/* Desktop */}
        <div className="hidden lg:flex mt-15 gap-8 items-center justify-between">
          <div className="space-y-10 flex-1">
            {leftCards.map((item, index) => (
              <Card
                key={index}
                variant="safetyCard"
                image={item.feature_icon}
                title={item.feature_title}
                description={item.feature_description}
                width={45}
                height={45}
                shadowNone
                imageContainerStyle="w-[84px] h-[84px] flex-center bg-primary rounded-full shrink-0"
                cardContainerStyle="flex-row-reverse gap-6 !h-auto border border-dark/10 bg-light-300/90 p-5"
                imageStyle="scale-50"
              />
            ))}
          </div>

          {backgroundImageUrl && (
            <div className="relative w-[435px] h-[520px] shrink-0">
              <CustomImage
                src={backgroundImageUrl}
                alt={title}
                fill
                className="object-contain object-center"
              />
            </div>
          )}

          <div className="space-y-10 flex-1">
            {rightCards.map((item, index) => (
              <Card
                key={index}
                variant="safetyCard"
                image={item.feature_icon}
                title={item.feature_title}
                description={item.feature_description}
                width={45}
                height={45}
                shadowNone
                imageContainerStyle="w-[84px] h-[84px] flex-center bg-primary rounded-full shrink-0"
                cardContainerStyle="flex-row gap-6 !h-auto border border-dark/10 bg-light-300/90 p-5"
                imageStyle="scale-50"
              />
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="block lg:hidden mt-11">
          <CustomSlider
            items={visibleSafetyCards}
            slidesPerView={1.4}
            spaceBetween={20}
            className="!h-auto"
            breakpoints={{ 640: { slidesPerView: 2 } }}
          >
            {(item, index) => (
              <Card
                key={index}
                variant="safetyCard"
                image={item.feature_icon}
                title={item.feature_title}
                description={item.feature_description}
                width={32}
                height={32}
                shadowNone
                imageContainerStyle="w-[54px] h-[54px] flex-center bg-primary rounded-full shrink-0"
                cardContainerStyle="gap-6 border border-dark/10 bg-light-300/90 p-4"
                imageStyle="scale-50"
              />
            )}
          </CustomSlider>

          {backgroundImageUrl && (
            <div className="relative mt-8 w-full h-100">
              <CustomImage
                src={backgroundImageUrl}
                alt={title}
                fill
                className="object-contain object-center"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSafety;
