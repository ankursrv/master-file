"use client";

import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import { cn } from "@/lib/utils";

type IconKey = "objectives" | "team" | "growth" | "environment";

interface AdventureCard {
  icon: IconKey;
  title: string;
  description: string;
}

interface WhyAdventureMattersRehProps {
  title?: string;
  items?: AdventureCard[];
}

const defaultItems: AdventureCard[] = [
  {
    icon: "objectives",
    title: "Educational Objectives",
    description: "Develop critical thinking, problem-solving abilities.",
  },
  {
    icon: "team",
    title: "Team Building",
    description:
      "Strengthen bonds between classmates, improve communication skills,.",
  },
  {
    icon: "growth",
    title: "Personal Growth",
    description: "Build self-confidence, overcome personal fears.",
  },
  {
    icon: "environment",
    title: "Environmental Awareness",
    description:
      "Learn about conservation, sustainability, and develop a deeper appreciation.",
  },
  {
    icon: "environment",
    title: "Environmental Awareness",
    description:
      "Learn about conservation, sustainability, and develop a deeper appreciation.",
  },
];

/* ------------------------------- Icons -------------------------------- */

const ICON_DIR = "/images/rocksport-reh/matters-icon";

const ICON_FILES: Record<IconKey, string> = {
  objectives: "educational",
  team: "team-building",
  growth: "growth",
  environment: "awareness",
};

const Arrow = ({ direction }: { direction: "left" | "right" }) => {
  const right = direction === "right";
  return (
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1 7.85742H16.9998"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={
          right
            ? "M10.1445 14.7145L17.0016 7.85742"
            : "M7.8555 14.7145L0.9984 7.85742"
        }
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={right ? "M10.1445 1L17.0016 7.85705" : "M7.8555 1L0.9984 7.85705"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const WhyAdventureMattersReh = ({
  title = "Why Adventure Matters",
  items = defaultItems,
}: WhyAdventureMattersRehProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const syncState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <section className="bg-image2 py-16 md:py-24 overflow-hidden">
      <div className="container">
        {/* Heading + navigation */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-dark! uppercase">{title}</h2>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              aria-label="Previous"
              className={cn(
                "flex size-12 lg:size-15 items-center justify-center rounded-lg border border-dark-300/30 bg-white text-dark-300 transition-colors duration-300",
                isBeginning
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-dark-300/5 cursor-pointer"
              )}
            >
              <Arrow direction="left" />
            </button>

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              aria-label="Next"
              className={cn(
                "flex size-12 lg:size-15 items-center justify-center rounded-lg bg-primary text-white transition-colors duration-300",
                isEnd
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-primary/90 cursor-pointer"
              )}
            >
              <Arrow direction="right" />
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-12">
          <CustomSlider
            items={items}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.3 },
              1280: { slidesPerView: 4.2 },
            }}
            className="!h-auto"
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
              syncState(swiper);
            }}
            onSlideChange={syncState}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={(swiper: SwiperType) => syncState(swiper)}
          >
            {(item) => (
              <article className="flex h-[240px] flex-col rounded-xl bg-[#1A1A1A] p-8 border border-dark-300/[12%]">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-lg md:text-2xl md:w-[184px] font-bold leading-120 text-white">
                    {item.title}
                  </p>
                  <CustomImage
                    src={`${ICON_DIR}/${ICON_FILES[item.icon]}.svg`}
                    alt=""
                    width={40}
                    height={40}
                    aria-hidden="true"
                    className="size-10 shrink-0"
                  />
                </div>
                <p className="mt-auto text-sm md:text-base leading-150 tracking-[-2%] text-white/80">
                  {item.description}
                </p>
              </article>
            )}
          </CustomSlider>
        </div>
      </div>
    </section>
  );
};

export default WhyAdventureMattersReh;
