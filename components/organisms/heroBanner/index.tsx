import Image from "next/image";
import TripDateCard from "@/components/atoms/tripDateCard";
import { cn } from "@/lib/utils";

// ─── Static fallbacks ─────────────────────────────────────────────────────────
interface VariantConfig {
  image: string;
  mobileImage?: string;
  title: string;
  description: string;
  helightText?: string;
}

const variantConfigMap: Record<string, VariantConfig> = {
  ris: {
    image: "/images/banner/banner.webp",
    mobileImage: "/images/banner/rsp-banner-mobile.png",
    title: "Rocksport In-school Program",
    description:
      "Building Confidence, Leadership & Resilience Through Adventure.",
  },
  rdo: {
    image: "/images/banner/rdo-banner.png",
    mobileImage: "/images/banner/rdo-banner-mobile.png",
    title: "Rocksport Day Out Program",
    description:
      "Building Confidence, Leadership & Resilience Through Adventure.",
  },
  reh: {
    image: "/images/banner/reh-banner.png",
    mobileImage: "/images/banner/reh-banner-mobile.png",
    title: "Rocksport Experimental",
    helightText: "holiday Program",
    description:
      "17 Years of excellence. More than 1050 Schools & 15.5 Lac participants",
  },
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface HeroBannerProps {
  showTripDate?: boolean;
  variant?: "ris" | "rdo" | "reh";
  // API-driven props
  backgroundImage?: string;
  programTitle?: string;
  programDescription?: string;
  rocksportLogo?: string;
  schoolLogo?: string;
  branch?: string;
  ctaText?: string;
  tripDate?: string;
  pricePerHead?: number;
}

const HeroBanner = ({
  showTripDate,
  variant = "ris",
  backgroundImage,
  programTitle,
  programDescription,
  ctaText,
  tripDate,
  pricePerHead,
}: HeroBannerProps) => {
  const fallback = variantConfigMap[variant];

  const image = backgroundImage || fallback.image;
  const finalMobileImage =
    backgroundImage || fallback.mobileImage || fallback.image;

  const title = programTitle || fallback.title;
  const description = programDescription || fallback.description;

  const { helightText } = fallback;

  return (
    <div className="relative h-[90vh] w-full overflow-hidden">
      {/* Desktop Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center hidden md:block"
        priority
        quality={90}
      />

      {/* Mobile Image */}
      <Image
        src={finalMobileImage}
        alt={title}
        fill
        className="object-cover object-center block md:hidden"
        priority
        quality={90}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,17,17,0)_0%,#111111_100%)] sm:bg-[linear-gradient(90deg,rgba(17,17,17,0.72)_20.71%,rgba(17,17,17,0)_53.8%)] z-10" />

      <div
        className={cn(
          "container relative flex h-full z-20",
          variant === "ris" || variant === "rdo"
            ? "items-end"
            : "items-end md:items-center"
        )}
      >
        <div
          className={cn(
            "w-full",
            variant === "rdo" ? "md:w-[589px]" : "md:w-[820px]",
            showTripDate ? "" : "pb-7 md:pb-15"
          )}
        >
          <h1 className="text-shadow-soft">{title}</h1>

          {helightText && (
            <strong className="text-white text-[28px] md:text-5xl font-nexa">
              {helightText}
            </strong>
          )}

          <p className="md:text-xl pt-2.5 pb-8 md:py-6 leading-130 text-white font-semibold">
            {description}
          </p>

          {!showTripDate && (
            <TripDateCard
              ctaText={ctaText}
              tripDate={tripDate}
              pricePerHead={pricePerHead}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
