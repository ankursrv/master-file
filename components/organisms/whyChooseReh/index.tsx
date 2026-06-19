import CustomImage from "@/components/molecules/customImage";

interface WhyChooseRehProps {
  title?: string;
  subTitle?: string;
  description?: string;
}

const WhyChooseReh = ({
  title = "Why Choose an Ordinary Holiday?",
  subTitle = "When you have Rocksport Experiential Holiday",
  description = "School trips form a significant memory for students. It's a dedicated time for them to bond with their peers, explore beyond classrooms and learn to be accountable for themselves. But often, students visit yet another conventional destination with a mundane itinerary which adds little to their personality. Rocksport Experiential Holidays are designed to create an experience rich in exploration, that shapes students into responsible individuals who are self aware and prepared to face challenges. While a conventional school trip promotes sedentary lifestyles and may be unsafe due to lack of supervision, at Rocksport Experiential Holidays.",
}: WhyChooseRehProps) => {
  return (
    <section className="bg-image4 relative overflow-hidden flex flex-col lg:block pt-12 md:pt-16 lg:pt-0">
      {/* Zipline rider — stacks above the text on mobile, overlays the
          top-right on desktop so the cable runs across the heading */}
      <div className="order-last lg:order-none lg:absolute right-0 lg:top-0 lg:z-0 w-full lg:h-[792px] -mt-8 md:-mt-12 lg:mt-0 pointer-events-none">
        {/* Desktop Image */}
        <CustomImage
          src="/images/rocksport-reh/zipline.webp"
          alt="Child enjoying a zipline adventure"
          width={712}
          height={336}
          priority
          className="hidden lg:block ml-auto lg:h-[86%] w-full select-none"
        />
        {/* Mobile Image */}
        <CustomImage
          src="/images/rocksport-reh/zipline-mobile.png"
          alt="Child enjoying a zipline adventure"
          width={712}
          height={336}
          priority
          className="block lg:hidden ml-auto w-full h-auto select-none"
        />
      </div>

      {/* Content */}
      <div className="order-1 lg:order-none container relative z-10">
        <div className="max-w-[641px] pb-4 lg:py-[100px]">
          <h2 className="text-dark! uppercase">{title}</h2>

          <p className="mt-4 lg:mt-15 text-lg font-bold text-dark-300 md:text-[28px] leading-120 tracking-[2%]">
            {subTitle}
          </p>

          <p className="mt-6 text-base md:text-xl leading-150 text-dark-300">
            {description}
          </p>
        </div>
      </div>

      {/* Bottom misty forest pattern */}
      <CustomImage
        src="/images/rocksport-reh/wild2.webp"
        alt=""
        width={1456}
        height={96}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full select-none"
      />
    </section>
  );
};

export default WhyChooseReh;
