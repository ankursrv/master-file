"use client";

import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import { cn } from "@/lib/utils";

interface HighlightCard {
  image: string;
  title: string;
}

interface ProgramHighlightsRehProps {
  title?: string;
  description?: string;
  items?: HighlightCard[];
}

const defaultItems: HighlightCard[] = [
  { image: "/images/activities/image1.png", title: "Zip-Line" },
  { image: "/images/activities/image2.png", title: "River Rafting" },
  { image: "/images/activities/image3.jpg", title: "Hiking" },
  { image: "/images/activities/image4.jpg", title: "Sunrise Trek" },
  { image: "/images/activities/image5.jpg", title: "Rock Climbing" },
  { image: "/images/activities/image6.jpg", title: "Camping" },
];

const Chevron = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d={direction === "left" ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"}
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProgramHighlightsReh = ({
  title = "Program Highlights",
  description = "Experience a diverse range of adventure activities designed to challenge, excite, and inspire every participant.",
  items = defaultItems,
}: ProgramHighlightsRehProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [progress, setProgress] = useState(0);

  const syncState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setProgress(Math.min(Math.max(swiper.progress, 0), 1));
  };

  return (
    <section className="relative bg-[#221E20] py-16 md:py-32 overflow-hidden">
      {/* Top torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-3.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-50 w-full h-[23px] md:h-[88px] select-none pointer-events-none"
      />

      {/* Bottom torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-4.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="bg-white absolute inset-x-0 bottom-0 z-0 w-full h-[23px] md:h-[88px] select-none pointer-events-none"
      />

      <div className="container relative z-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="lg:text-[48px]! text-white! uppercase">{title}</h2>
          <p className="mx-auto mt-4 max-w-[560px] text-white leading-150 md:text-xl">
            {description}
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 md:mt-15">
          <CustomSlider
            items={items}
            spaceBetween={24}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="!h-auto"
            onSwiper={(swiper: SwiperType) => {
              swiperRef.current = swiper;
              syncState(swiper);
            }}
            onSlideChange={syncState}
            onProgress={syncState}
            onSetTranslate={syncState}
            onReachBeginning={() => setIsBeginning(true)}
            onReachEnd={() => setIsEnd(true)}
            onFromEdge={(swiper: SwiperType) => syncState(swiper)}
          >
            {(item) => (
              <article className="group relative h-[394px] md:h-[312px] overflow-hidden rounded-xl">
                <CustomImage
                  src={item.image}
                  fill
                  alt={item.title}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-[linear-gradient(180deg,_rgba(17,17,17,0)_0%,_#111111_100%)] h-[196px]" />
                <p className="absolute bottom-5 md:bottom-6 left-4 md:left-6 right-5 text-white font-bold text-lg md:text-2xl leading-120">
                  {item.title}
                </p>
              </article>
            )}
          </CustomSlider>
        </div>

        {/* Navigation */}
        <div className="relative mt-8 h-9 md:mt-15">
          {/* Track (gradient rail) */}
          <div
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-solid [border-image-slice:1] [border-image-source:linear-gradient(90deg,rgba(241,90,45,0)_0%,rgba(241,90,45,0)_0%,#FF3B00_44.46%,rgba(254,61,4,0.915361)_54.12%,rgba(241,90,45,0)_94.14%)]"
            aria-hidden="true"
          />

          {/* Pill — glides along the rail with the cards */}
          <div className="absolute inset-0 flex items-center">
            <div
              className="h-px min-w-0 basis-0 transition-[flex-grow] duration-500 ease-out"
              style={{ flexGrow: progress }}
            />
            <div className="w-[96px] h-full px-3 relative z-10 flex items-center justify-between shrink-0 rounded-full bg-primary text-white">
              <button
                type="button"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={isBeginning}
                aria-label="Previous"
                className={cn(
                  "group/btn flex items-center justify-center rounded-l-full transition-colors duration-300",
                  isBeginning
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-black/10 cursor-pointer"
                )}
              >
                <span className="transition-transform duration-300 group-hover/btn:-translate-x-0.5 group-active/btn:-translate-x-1">
                  <Chevron direction="left" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={isEnd}
                aria-label="Next"
                className={cn(
                  "group/btn flex items-center justify-center rounded-r-full transition-colors duration-300",
                  isEnd
                    ? "opacity-40 cursor-not-allowed"
                    : "hover:bg-black/10 cursor-pointer"
                )}
              >
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-active/btn:translate-x-1">
                  <Chevron direction="right" />
                </span>
              </button>
            </div>
            <div
              className="h-px min-w-0 basis-0 transition-[flex-grow] duration-500 ease-out"
              style={{ flexGrow: 1 - progress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramHighlightsReh;
