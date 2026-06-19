"use client";

import { useState } from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import { cn } from "@/lib/utils";

interface StaySlide {
  image: string;
  thumbnail: string;
  title: string;
  description: string;
}

interface StayLocationRehProps {
  title?: string;
  items?: StaySlide[];
}

const defaultItems: StaySlide[] = [
  {
    image: "/images/rocksport-reh/slide1.webp",
    thumbnail: "/images/rocksport-reh/slide1.webp",
    title: "Riverside Escape",
    description:
      "Nestled by the riverside, this serene retreat offers the perfect blend of comfort and nature—allowing participants to relax, recharge, and reconnect after a day of adventure.",
  },
  {
    image: "/images/rocksport-reh/reh-bg.webp",
    thumbnail: "/images/rocksport-reh/reh-bg.webp",
    title: "Mountain Lodge",
    description:
      "Perched amid towering peaks, the mountain lodge wraps you in rustic warmth and sweeping views—an ideal base to unwind and soak in the highland calm.",
  },
  {
    image: "/images/rocksport-reh/reh-bg.webp",
    thumbnail: "/images/rocksport-reh/reh-bg.webp",
    title: "Forest Cabins",
    description:
      "Tucked beneath a canopy of pines, these cozy cabins bring you closer to the wild—offering quiet seclusion and the gentle rhythm of forest life.",
  },
  {
    image: "/images/rocksport-reh/reh-bg.webp",
    thumbnail: "/images/rocksport-reh/reh-bg.webp",
    title: "Lakeside Camp",
    description:
      "Set along tranquil waters, the lakeside camp pairs starlit evenings with crisp mornings—where every moment invites stillness, reflection, and rest.",
  },
];

const Arrow = ({ direction }: { direction: "left" | "right" }) => (
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

const StayLocationReh = ({
  title = "Your Stay, Location and Much More",
  items = defaultItems,
}: StayLocationRehProps) => {
  const [active, setActive] = useState(0);

  const goPrev = () =>
    setActive((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const goNext = () =>
    setActive((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  const current = items[active];

  return (
    <section className="relative w-full overflow-hidden bg-[#211D1F]">
      {/* Active background image */}
      <CustomImage
        key={current.image}
        src={current.image}
        alt={current.title}
        fill
        className="hidden md:block object-cover object-center"
      />

      {/* Dark overlay for readability */}
      <div
        className="hidden md:block absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(358.4deg, rgba(17, 17, 17, 0.8) 29.03%, rgba(17, 17, 17, 0.4) 53.15%, rgba(17, 17, 17, 0) 72.28%)",
        }}
        aria-hidden="true"
      />

      {/* Top torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-3.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-0 w-full h-[23px] md:h-[88px] select-none pointer-events-none"
      />

      {/* Bottom torn edge */}
      <CustomImage
        src="/images/rocksport-reh/splash-5.webp"
        alt=""
        width={1440}
        height={88}
        aria-hidden="true"
        className="hidden md:block absolute rotate-180 inset-x-0 bottom-0 z-10 w-full h-[88px] select-none pointer-events-none"
      />

      <div className="container relative z-30 flex min-h-[auto] md:min-h-[810px] flex-col justify-end pt-[55px] pb-8 md:pt-[180px] md:pb-[120px]">
        {/* Heading */}
        <h2 className="lg:w-[778px] md:text-[32px]! text-white! uppercase leading-120">
          {title}
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {/* Divider rail */}
          <div className="my-10 h-px w-full bg-white/40" aria-hidden="true" />

          {/* Bottom row */}
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            {/* Title + description */}
            <div className="max-w-[641px]">
              <h3 className="md:text-2xl font-bold text-white leading-150">
                {current.title}
              </h3>
              <p className="mt-4 text-white/80 leading-150 text-base">
                {current.description}
              </p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-end gap-10">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous stay"
                className="flex size-14 lg:size-15 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-black/60 cursor-pointer"
              >
                <Arrow direction="left" />
              </button>

              {/* Thumbnails */}
              <CustomSlider
                items={items}
                slidesPerView="auto"
                spaceBetween={20}
                className="w-20!"
                sliderContainerStyle="w-fit! mx-0! overflow-visible! [&_.swiper-slide:last-child]:mr-0!"
              >
                {(item, index) => (
                  <button
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Show ${item.title}`}
                    aria-current={index === active}
                    className={cn(
                      "relative size-20 shrink-0 ring-2 ring-offset-2 ring-offset-transparent overflow-hidden rounded-xl transition-all duration-300 cursor-pointer",
                      index === active
                        ? "ring-white"
                        : "ring-white/40 opacity-80 hover:opacity-100"
                    )}
                  >
                    <CustomImage
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover object-center"
                    />
                  </button>
                )}
              </CustomSlider>

              <button
                type="button"
                onClick={goNext}
                aria-label="Next stay"
                className="flex size-14 lg:size-15 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-black/60 cursor-pointer"
              >
                <Arrow direction="right" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden mt-8">
          <CustomSlider
            items={items}
            slidesPerView={1.15}
            spaceBetween={16}
            navigation={{
              prevEl: ".stay-mobile-prev",
              nextEl: ".stay-mobile-next",
            }}
            sliderContainerStyle="!overflow-visible"
          >
            {(item) => (
              <div className="flex flex-col">
                <div className="relative w-full h-[220px]">
                  <CustomImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-xl! font-bold text-white leading-150">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm text-white/80 leading-150">
                  {item.description}
                </p>
              </div>
            )}
          </CustomSlider>

          {/* Mobile Navigation Pill */}
          <div className="relative mt-8 h-10 w-full">
            {/* Track (gradient rail) */}
            <div
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-solid [border-image-slice:1] [border-image-source:linear-gradient(90deg,rgba(241,90,45,0)_0%,rgba(241,90,45,0)_0%,#FF3B00_44.46%,rgba(254,61,4,0.915361)_54.12%,rgba(241,90,45,0)_94.14%)]"
              aria-hidden="true"
            />
            {/* Centered Pill */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center gap-6 bg-[#F15A2D] rounded-full px-5 py-2.5 shadow-sm">
                <button
                  type="button"
                  className="stay-mobile-prev text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <Arrow direction="left" />
                </button>
                <button
                  type="button"
                  className="stay-mobile-next text-white flex items-center justify-center cursor-pointer disabled:opacity-50"
                >
                  <Arrow direction="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayLocationReh;
