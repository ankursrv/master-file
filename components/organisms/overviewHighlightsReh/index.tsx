import CustomImage from "@/components/molecules/customImage";

interface OverviewHighlightsRehProps {
  title?: string;
  personName?: string;
  personRole?: string;
  quote?: string;
  image?: string;
  mobileImage?: string;
}

const OverviewHighlightsReh = ({
  title = "Overview and Key Highlights",
  personName = "Sarthak Shah",
  personRole = "Head Principle of DPS",
  quote = "Rafting at Rocksport was one of the most refreshing adventures I’ve ever had! The moment our raft hit the first rapid, everyone started cheering and laughing — it was pure adrenaline. Working together to paddle through the currents made us realize how important teamwork really is.",
  image = "/images/rocksport-reh/sarthak.webp",
  mobileImage = "/images/rocksport-reh/sarthak-mobile.webp",
}: OverviewHighlightsRehProps) => {
  return (
    <section className="relative bg-image3 overflow-hidden lg:pt-20">
      {/* Faded silhouette overlay behind the content */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <CustomImage
          src="/images/rocksport-reh/sunset-hike1.webp"
          fill
          alt=""
          aria-hidden="true"
          className="object-cover object-bottom"
        />
      </div>

      <div className="container relative z-10">
        <div className="flex flex-col lg:block">
          {/* Left copy */}
          <div className="lg:pb-20 pt-10 md:pt-14 lg:pt-0">
            <h2 className="text-dark! uppercase">{title}</h2>

            <p className="mt-6 md:mt-10 lg:mt-15 text-lg md:text-2xl font-bold text-primary leading-120">
              {personName}
            </p>
            <p className="mt-[6px] text-sm md:text-xl text-dark-300/60 leading-140">
              {personRole}
            </p>

            <p className="mt-5 md:max-w-[654px] text-dark-200 leading-150 md:text-2xl font-semibold">
              {quote}
            </p>
          </div>

          {/* Right portrait — stands on the section's bottom edge */}
          <figure className="relative -mt-10 lg:mt-0 lg:absolute lg:right-0 lg:bottom-0 w-full max-w-[320px] sm:max-w-[400px] md:max-w-full lg:max-w-none lg:w-[571px] lg:h-[511px]">
            {/* Desktop Image */}
            <CustomImage
              src={image}
              width={1000}
              height={1000}
              alt={personName}
              className="hidden lg:block w-full h-auto lg:h-full lg:w-full object-cover object-bottom"
            />
            {/* Mobile Image */}
            <CustomImage
              src={mobileImage}
              width={1000}
              height={1000}
              alt={personName}
              className="block lg:hidden w-full h-auto object-cover object-bottom"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default OverviewHighlightsReh;
