"use client";

import { useRef } from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import Icons from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";
import useIsMobile from "@/lib/useIsMobile";
import type { AboutTheParkSection } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";
import { Swiper as SwiperType } from "swiper";

interface AboutTheParkProps {
  section?: AboutTheParkSection;
}

const AboutThePark = ({ section }: AboutTheParkProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();

  const items = filterRisItems(section?.image_gallery?.items ?? []);
  const title = section?.section_heading?.title ?? "About the park";
  const intro =
    section?.section_heading?.sub_title ??
    section?.section_heading?.sub_heading ??
    "";
  const location = section?.location ?? "";

  if (!items.length && !intro) return null;

  const scrollToBooking = () => {
    document
      .getElementById("booking-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="bg-image py-8 md:py-20 relative">
      <div className="container navigation-style2">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-7 md:mb-12">
          <div className="max-w-2xl">
            <h2 className="text-dark uppercase">{title}</h2>
            {intro && (
              <p className="text-dark-300/80 text-base mt-4 leading-140">
                {intro}
              </p>
            )}
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-3 shrink-0 md:mt-2">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="features-offered-nav features-offered-nav--prev"
              aria-label="Previous park image"
            >
              <Icons.arrowRight className="rotate-180 w-4 h-4 [&_path]:stroke-current" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="features-offered-nav features-offered-nav--next"
              aria-label="Next park image"
            >
              <Icons.arrowRight className="w-4 h-4 [&_path]:stroke-white" />
            </button>
          </div>
        </div>

        {items.length > 0 && (
          <div className="mr-[calc(50%_-_50vw)]">
            <CustomSlider
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              items={items}
              slidesPerView={1.5}
              spaceBetween={16}
              breakpoints={{
                768: { slidesPerView: 1.5, spaceBetween: 24 },
              }}
              className="!h-auto"
            >
              {(item) => (
                <div className="flex flex-col h-full">
                  <div className="relative w-full h-[148px] md:h-[483px] rounded-[3.16px] md:rounded-xl overflow-hidden">
                    <CustomImage
                      src={item.image_upload}
                      fill
                      alt={item.image_description}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-dark-200 text-sm mt-4 leading-relaxed line-clamp-4">
                    {item.image_description}
                  </p>
                </div>
              )}
            </CustomSlider>
          </div>
        )}
        {/* Mobile navigation (below the slider) */}
        <div className="flex md:hidden items-center justify-center gap-8 mt-8">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="features-offered-nav features-offered-nav--prev"
            aria-label="Previous park image"
          >
            <Icons.arrowRight className="rotate-180 w-4 h-4 [&_path]:stroke-current" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="features-offered-nav features-offered-nav--next"
            aria-label="Next park image"
          >
            <Icons.arrowRight className="w-4 h-4 [&_path]:stroke-white" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mt-8 md:mt-15">
          {location && (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-dark hover:text-primary transition-colors max-w-xl group"
            >
              <Icons.Target />
              <span className="text-base md:text-2xl leading-150 font-semibold underline underline-offset-4 group-hover:text-primary">
                {location}
              </span>
            </a>
          )}

          <Button
            variant="fillPrimary"
            icon={<Icons.CalenderIcon className="size-7" />}
            iconPosition="left"
            size={isMobile ? "wFull" : undefined}
            onClick={scrollToBooking}
          >
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutThePark;
