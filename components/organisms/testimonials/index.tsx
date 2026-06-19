"use client";

import Icons from "@/components/atoms/icons";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import useIsMobile from "@/lib/useIsMobile";
import React, { useRef } from "react";
import { Swiper as SwiperType } from "swiper";
import type { UserReviewSection, TestimonialItem } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface TestimonialsSectionProps {
  sectionHeading?: UserReviewSection["section_heading"];
  testimonials?: TestimonialItem[];
  carouselControl?: UserReviewSection["carousel_control"];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  sectionHeading,
  testimonials = [],
  carouselControl,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const isMobile = useIsMobile();

  const heading = sectionHeading?.title ?? "Reviews";
  const description = sectionHeading?.description ?? "";
  const prevLabel = carouselControl?.previous_button ?? "Prev";
  const nextLabel = carouselControl?.next_button ?? "Next";

  const visibleTestimonials = filterRisItems(testimonials);

  const handlePrev = (): void => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = (): void => {
    swiperRef.current?.slideNext();
  };

  return (
    <section
      className="relative testimonial-bg-image pt-15 pb-24 md:py-24 overflow-hidden"
      role="region"
      aria-labelledby="testimonials-heading"
    >
      <div className="container z-10 navigation-style1">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left copy */}
          <div className="relative w-full lg:min-w-[413px]">
            {isMobile ? (
              <p className="text-[32px] font-black text-white font-nexa leading-120">
                {heading.toUpperCase()}
              </p>
            ) : (
              <h2 className="text-white">{heading.toUpperCase()}</h2>
            )}
            <p className="text-white/80 text-lg lg:text-xl font-normal pt-4 md:pt-6 max-w-[400px]">
              {description}
            </p>

            {/* Desktop navigation */}
            <div className="hidden lg:block w-1/3 absolute bottom-8 left-0">
              <button
                type="button"
                onClick={handleNext}
                className="swiper-button-next"
                aria-label={nextLabel}
              />
              <button
                type="button"
                onClick={handlePrev}
                className="swiper-button-prev"
                aria-label={prevLabel}
              />
            </div>
          </div>

          {/* Slider */}
          <div className="flex-1 w-full relative">
            <CustomSlider
              onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
              items={visibleTestimonials}
              slidesPerView={1}
              spaceBetween={20}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              breakpoints={{ 640: { slidesPerView: 2, spaceBetween: 40 } }}
              sliderContainerStyle="lg:w-[867px]"
              className="!h-auto"
            >
              {(item: TestimonialItem) => (
                <div className="bg-dark/60 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col">
                  <div className="relative w-full h-[374px]">
                    <CustomImage
                      src={item.person_image}
                      width={1000}
                      height={1000}
                      alt={item.person_name}
                      className="responsive-image-cover"
                    />
                    <div className="bg-linear-to-b from-[#11111100] to-dark-300 absolute -bottom-1 h-16 w-full" />
                  </div>

                  <div className="p-6 relative border border-white/40 border-t-0 rounded-xl rounded-t-none flex-1">
                    <div className="absolute -top-8 right-7">
                      <Icons.Quatation />
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="size-15 rounded-full overflow-hidden border-2 border-white shrink-0">
                        <CustomImage
                          src={item.person_avatar ?? item.person_image}
                          alt={item.person_name}
                          width={60}
                          height={60}
                          className="responsive-image-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xl lg:text-2xl leading-120 text-white">
                          {item.person_name}
                        </p>
                        <p className="text-white/40 text-sm font-semibold mt-2 uppercase">
                          {item.person_role}
                        </p>
                      </div>
                    </div>
                    <p className="text-white mt-6">{item.testimonial_text}</p>
                  </div>
                </div>
              )}
            </CustomSlider>

            {/* Mobile navigation */}
            <div className="w-1/3 sm:w-1/6 block lg:hidden absolute top-1/2 right-0 mt-10 h-full">
              <button
                type="button"
                onClick={handleNext}
                className="swiper-button-next"
                aria-label={nextLabel}
              />
              <button
                type="button"
                onClick={handlePrev}
                className="swiper-button-prev"
                aria-label={prevLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
