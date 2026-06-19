"use client";

import { useMemo, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import SectionTitle from "@/components/molecules/sectionTitle";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import type { HowYouSpendAdventureSection } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface HowYouSpendAdventureProps {
  section?: HowYouSpendAdventureSection;
}

const HowYouSpendAdventure = ({ section }: HowYouSpendAdventureProps) => {
  const dayTabs = useMemo(
    () => filterRisItems(section?.day_tabs ?? []),
    [section?.day_tabs]
  );

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeSlotIndex, setActiveSlotIndex] = useState(0);

  const activeDay = dayTabs[activeDayIndex];
  const programTimes = useMemo(
    () => filterRisItems(activeDay?.program_times ?? []),
    [activeDay?.program_times]
  );

  const activeSlot = programTimes[activeSlotIndex];

  const sectionTitle =
    section?.section_heading?.title ?? "How you'll spend your adventure";
  const sectionHeading =
    section?.section_heading?.heading ?? "Schedule your day";

  if (!dayTabs.length) return null;

  const goPrev = () => {
    swiperRef.current?.slidePrev();
  };

  const goNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className="bg-image2 py-15 md:py-20 relative z-20">
      <div className="container">
        <SectionTitle
          title={sectionTitle}
          heading={sectionHeading}
          customClass="w-[211px] md:w-[540px]"
        />

        {/* Day tabs */}
        <div className="flex justify-center mt-8 md:mt-15">
          <div className="inline-flex rounded-full bg-[#787878] h-[37px] md:h-[54px] shadow-[inset_-4px_-4px_3px_0px_#11111114,_inset_-4px_4px_3px_0px_#11111114]">
            {dayTabs.map((day, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setActiveDayIndex(index);
                  setActiveSlotIndex(0);
                }}
                className={cn(
                  "px-5 py-2.5 md:px-8 md:py-3 w-[85px] md:w-[151px] rounded-full text-sm md:text-base font-bold transition-colors leading-120",
                  activeDayIndex === index
                    ? "bg-primary text-white shadow-[0px_4px_5.5px_0px_#00000040]"
                    : "text-[#D9D9D9] hover:text-white"
                )}
              >
                {day.day_heading}
              </button>
            ))}
          </div>
        </div>

        {/* Content + image */}
        {activeSlot && (
          <div className="relative mt-8 md:mt-15">
            <CustomSlider
              key={activeDayIndex}
              onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
              onSlideChange={(swiper: SwiperType) =>
                setActiveSlotIndex(swiper.activeIndex)
              }
              items={programTimes}
              slidesPerView={1}
              spaceBetween={24}
              autoHeight
              className="!h-auto"
            >
              {(slot) => (
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-15 items-start justify-between">
                  <div className="md:max-w-[535px]">
                    <p className="text-dark text-[18px] md:text-[32px] font-bold leading-120 mb-4 capitalize">
                      {slot.title}
                    </p>
                    <p className="text-[#111111] text-base md:text-xl leading-140 lg:leading-[30px]">
                      {slot.program_description}
                    </p>
                  </div>

                  <div className="relative w-full lg:w-[649px] h-[178px] md:h-[345px] rounded-[6.19px] lg:rounded-2xl overflow-hidden">
                    <CustomImage
                      src={slot.program_image}
                      // fill
                      width={1000}
                      height={750}
                      alt={slot.title}
                      className="responsive-image-cover"
                    />
                  </div>
                </div>
              )}
            </CustomSlider>

            {/* Desktop navigation (fixed in left column, does not move with slides) */}
            <div className="hidden md:flex items-center gap-4 absolute left-0 bottom-0 z-10">
              <button
                type="button"
                onClick={goPrev}
                disabled={activeSlotIndex === 0}
                aria-label="Previous activity"
                className={cn(
                  "size-15 rounded-xl flex items-center justify-center transition-colors",
                  activeSlotIndex === 0
                    ? "border-1 border-[#11111133] cursor-not-allowed"
                    : "bg-primary hover:opacity-90 text-white"
                )}
              >
                <Icons.arrowRight className="rotate-180 w-5 h-5 [&_path]:stroke-current" />
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={activeSlotIndex >= programTimes.length - 1}
                aria-label="Next activity"
                className={cn(
                  "size-15 rounded-xl flex items-center justify-center transition-colors",
                  activeSlotIndex >= programTimes.length - 1
                    ? "border-1 border-[#11111133] cursor-not-allowed"
                    : "bg-primary hover:opacity-90 text-white"
                )}
              >
                <Icons.arrowRight className="w-5 h-5 [&_path]:stroke-[currentColor]" />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* Timeline */}
      {programTimes.length > 0 && (
        <div className="mt-6 md:mt-15 overflow-x-auto scrollbar-hide">
          <div className="relative md:min-w-0">
            {/* Dashed track (aligned to the dots row) */}
            <div
              className="absolute bottom-4 left-0 right-0 border-t-[0.3px] border-dashed border-[#707070]"
              aria-hidden
            />
            {/* Completed (orange) progress up to active marker */}
            <div
              className="absolute bottom-4 left-0 h-[0.3px] bg-primary transition-[width] duration-300"
              style={{
                width: `${
                  ((activeSlotIndex + 0.5) / programTimes.length) * 100
                }%`,
              }}
              aria-hidden
            />
            <ul className="flex justify-between relative z-10 gap-2 h-full">
              {programTimes.map((slot, index) => {
                const isActive = index <= activeSlotIndex;
                return (
                  <li
                    key={index}
                    className="flex flex-col items-center flex-1 min-w-0"
                  >
                    <button
                      type="button"
                      onClick={() => swiperRef.current?.slideTo(index)}
                      className="flex flex-col items-center text-center group w-full flex-1 justify-between"
                    >
                      <div className="flex flex-col items-center mb-[14px] lg:mb-5">
                        <span
                          className={cn(
                            "text-base md:text-xl font-bold mb-2 whitespace-nowrap leading-120",
                            isActive ? "text-primary" : "text-[#707070]"
                          )}
                        >
                          {slot.time}
                        </span>
                        <span
                          className={cn(
                            "text-sm md:text-base leading-120 max-w-[89px] h-[38px] capitalize",
                            isActive
                              ? "text-primary font-semibold"
                              : "text-[#707070] font-normal"
                          )}
                        >
                          {slot.timeline_label}
                        </span>
                      </div>
                      <span
                        className={cn(
                          "rounded-full flex items-center justify-center shrink-0",
                          isActive
                            ? "border-primary border-1 size-[34px]"
                            : "bg-[#707070] size-4 relative -top-2"
                        )}
                      >
                        {isActive && (
                          <span className="size-3 rounded-full bg-primary" />
                        )}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
      {/* Mobile navigation */}
      {programTimes.length > 0 && (
        <div className="flex md:hidden items-center justify-center gap-8 mt-8">
          <button
            type="button"
            onClick={goPrev}
            disabled={activeSlotIndex === 0}
            aria-label="Previous activity"
            className={cn(
              "size-11 rounded-[8.8px] border-[0.73px] flex items-center justify-center transition-colors",
              activeSlotIndex === 0
                ? "border-[#11111133] cursor-not-allowed"
                : "bg-primary hover:opacity-90 text-white"
            )}
          >
            <Icons.arrowRight className="rotate-180 w-5 h-5 [&_path]:stroke-current" />
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={activeSlotIndex >= programTimes.length - 1}
            aria-label="Next activity"
            className={cn(
              "size-11 rounded-[8.8px] flex items-center justify-center transition-colors",
              activeSlotIndex >= programTimes.length - 1
                ? "border-1 border-[#11111133] cursor-not-allowed"
                : "bg-primary hover:opacity-90 text-white"
            )}
          >
            <Icons.arrowRight className="w-5 h-5 [&_path]:stroke-[currentColor]" />
          </button>
        </div>
      )}
    </section>
  );
};

export default HowYouSpendAdventure;
