"use client";

import CustomAccordion from "@/components/molecules/customAccordion";
import CustomImage from "@/components/molecules/customImage";
import SectionTitle from "@/components/molecules/sectionTitle";
import type { FaqSection as FaqSectionType, FaqItem } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface FaqProps {
  variant?: "ris" | "rdo";
  sectionHeading?: FaqSectionType["section_heading"];
  faqItems?: FaqItem[];
  faqImageUrl?: string;
}

const Faq = ({
  variant = "ris",
  sectionHeading,
  faqItems = [],
  faqImageUrl,
}: FaqProps) => {
  const title = sectionHeading?.title ?? "Frequently Asked Questions";
  const description =
    sectionHeading?.description ??
    "Explore clear and concise answers to the questions you care about the most.";
  const faqImage = faqImageUrl ?? "/images/faq.webp";

  const accordionItems = filterRisItems(faqItems).map((item) => ({
    title: item.faq_question,
    content: item.faq_answer,
  }));

  return (
    <section className="bg-image py-15 md:py-20 relative">
      <div className="container flex flex-col lg:flex-row justify-between gap-11 lg:gap-[143px]">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <SectionTitle
            title={title}
            heading="FIND YOUR ANSWERS"
            lineFull={true}
            customClass="w-[211px] md:w-[540px]"
          />
        </div>

        {/* Desktop Sidebar — image fills full card, text sits on top */}
        <div className="hidden lg:block relative h-[529px] w-[373px] rounded-xl shrink-0 overflow-hidden">
          {/* Full-bleed background image */}
          <CustomImage
            src={faqImage}
            fill
            alt="faq image"
            className="object-cover object-center"
          />
          {/* Dark gradient so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          {/* Text content */}
          <div className="relative z-10 p-12">
            <h3 className="text-white">{title}</h3>
            <p className="text-white/80 mt-3">{description}</p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="w-full">
          <CustomAccordion items={accordionItems} autoCollapse={true} />
        </div>
      </div>

      {variant === "rdo" && (
        <CustomImage
          src="/images/rdo-line2.png"
          width={400}
          height={100}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-0 w-[245px] h-auto"
        />
      )}
    </section>
  );
};

export default Faq;
