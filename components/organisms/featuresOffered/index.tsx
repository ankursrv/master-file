"use client";

import { useRef } from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import type { FeatureSection } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";
import { Swiper as SwiperType } from "swiper";

interface FeaturesOfferedProps {
  section?: FeatureSection;
}

const FeaturesOffered = ({ section }: FeaturesOfferedProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const cards = filterRisItems(section?.feature_cards ?? []);

  const title = section?.section_heading?.title ?? "Features Offered";

  if (!cards.length) return null;

  return (
    <section className="bg-image3 py-8 md:py-20 relative">
      <div className="container navigation-style2">
        <div className="flex items-start justify-between gap-4 mb-8 md:mb-15">
          <h2 className="text-dark uppercase max-w-[280px] md:max-w-none">
            {title}
          </h2>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              className="features-offered-nav features-offered-nav--prev"
              aria-label="Previous features"
            >
              <Icons.arrowRight className="rotate-180 w-4 h-4 [&_path]:stroke-current" />
            </button>
            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              className="features-offered-nav features-offered-nav--next"
              aria-label="Next features"
            >
              <Icons.arrowRight className="w-4 h-4 [&_path]:stroke-white" />
            </button>
          </div>
        </div>

        <CustomSlider
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          items={cards}
          slidesPerView={1.15}
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3.2, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 24 },
          }}
          className="!h-auto"
        >
          {(item) => {
            const description =
              item.description ?? item.feature_description ?? "";
            return (
              <article
                className={cn(
                  "bg-dark rounded-2xl p-5 md:p-6 h-full min-h-[220px] flex flex-col",
                  "border border-white/10"
                )}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <p className="text-white text-lg md:text-2xl font-bold leading-120 capitalize">
                    {item.heading}
                  </p>
                  <figure className="size-10 md:size-[54px] shrink-0">
                    <CustomImage
                      src={item.icon}
                      width={48}
                      height={48}
                      alt=""
                      aria-hidden
                      className="responsive-image-contain"
                    />
                  </figure>
                </div>
                {description && (
                  <p className="text-white/70 text-sm leading-relaxed flex-1">
                    {description}
                  </p>
                )}
              </article>
            );
          }}
        </CustomSlider>

        {/* Mobile navigation (below the slider) */}
        <div className="flex md:hidden items-center justify-center gap-8 mt-8">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="features-offered-nav features-offered-nav--prev"
            aria-label="Previous features"
          >
            <Icons.arrowRight className="rotate-180 w-4 h-4 [&_path]:stroke-current" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="features-offered-nav features-offered-nav--next"
            aria-label="Next features"
          >
            <Icons.arrowRight className="w-4 h-4 [&_path]:stroke-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesOffered;
