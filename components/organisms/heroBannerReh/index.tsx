import CustomImage from "@/components/molecules/customImage";
import Icons from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";

interface HeroBannerRehProps {
  title?: string;
  description?: string;
  pricePerHead?: number;
  ctaText?: string;
}

const HeroBannerReh = ({
  title = "Rocksport Experiential Holiday",
  description = "17 Years of excellence. More than 1050 Schools & 15.5 Lac participants",
  pricePerHead,
  ctaText = "Book Now",
}: HeroBannerRehProps) => {
  const displayPrice =
    pricePerHead !== undefined
      ? `₹${pricePerHead.toLocaleString("en-IN")}`
      : "₹1,900";

  return (
    <section className="relative h-screen min-h-[560px] w-full overflow-hidden">
      {/* Background image */}
      <CustomImage
        src="/images/rocksport-reh/reh-bg.webp"
        alt={title}
        fill
        className="object-cover object-center"
        priority
        quality={90}
      />

      {/* Top gradient overlay */}
      <div
        className="absolute inset-x-0 top-0 h-[183px] z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, #111111 0%, rgba(17, 17, 17, 0) 98.74%)",
        }}
      />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-[511px] lg:h-[645px] z-10 pointer-events-none bg-[linear-gradient(0deg,_#111111_0%,_rgba(17,17,17,0)_98.74%)] lg:bg-[linear-gradient(0deg,_#111111_28.94%,_rgba(17,17,17,0)_69.44%)]" />

      {/* Content */}
      <div className="container relative pb-8 md:pb-14 lg:pb-[100px] z-20 flex h-full flex-col items-center justify-end text-center">
        <h1 className="!text-white !leading-120 uppercase">{title}</h1>

        <p className="md:text-xl pt-4 md:pt-8 pb-8 md:pb-11 leading-120 text-white/80 font-semibold w-[330px] sm:w-full">
          {description}
        </p>

        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-white text-xs md:text-base leading-120 font-normal">
              Price Per Head
            </span>
            <span className="text-white font-bold text-2xl md:text-[34px] leading-120">
              {displayPrice}
            </span>
          </div>

          <Button
            variant="outlineFill"
            icon={<Icons.CalenderIcon className="size-7" />}
            iconPosition="left"
            // onClick={() => {
            //   document
            //     .getElementById("booking-form")
            //     ?.scrollIntoView({ behavior: "smooth", block: "start" });
            // }}
          >
            {ctaText}
          </Button>
        </div>
      </div>

      {/* Bottom splash pattern */}
      <CustomImage
        src="/images/rocksport-reh/splash-2.webp"
        alt=""
        width={1456}
        height={88}
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-[0.4px] z-50 w-full select-none pointer-events-none h-[23px] md:h-auto"
      />
    </section>
  );
};

export default HeroBannerReh;
