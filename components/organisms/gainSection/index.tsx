"use client";

import CustomSlider from "@/components/molecules/customSlider";
import SectionTitle from "@/components/molecules/sectionTitle";
import Card from "../card";
import useIsMobile from "@/lib/useIsMobile";
import { cn } from "@/lib/utils";
import type {
  AdventureMatterSection,
  AdventureInfoCard,
} from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface GainSectionProps {
  variant?: "ris" | "rdo";
  sectionHeading?: AdventureMatterSection["section_heading"];
  infoCards?: AdventureInfoCard[];
}

const GainSection = ({
  variant = "ris",
  sectionHeading,
  infoCards = [],
}: GainSectionProps) => {
  const isMobile: boolean = useIsMobile();

  const title = sectionHeading?.title ?? "Why Adventure Matters";
  const subTitle = sectionHeading?.sub_title ?? "What You'll Gain";

  // Map API info cards to the card format expected by <Card />
  const cardData = filterRisItems(infoCards).map((card) => ({
    image: card.info_icon,
    title: card.info_title,
    description: card.feature_description,
  }));

  return (
    <section className="bg-image py-15 md:py-20">
      <div className="container">
        <SectionTitle
          title={title}
          heading={subTitle}
          customClass="w-[211px] lg:w-[530px]"
        />

        {isMobile ? (
          <CustomSlider
            items={cardData}
            spaceBetween={20}
            breakpoints={{
              300: { slidesPerView: 1.2 },
              640: { slidesPerView: 2.8 },
              991: { slidesPerView: 4 },
            }}
            className="!h-auto"
            sliderContainerStyle="mt-11 md:mt-15"
          >
            {(item, index) => (
              <Card
                key={index}
                variant="gainCard"
                image={item.image}
                title={item.title}
                description={item.description}
                width={36}
                height={36}
                shadowNone
                cardContainerStyle="items-center bg-light-200 border border-dark/20 p-6"
                imageContainerStyle="flex-center size-[54px] md:size-[72px] bg-primary rounded-full p-2.5"
                imageStyle="scale-60"
              />
            )}
          </CustomSlider>
        ) : (
          <div
            className={cn(
              "grid gap-6 mt-11 md:mt-15",
              variant === "ris" ? "grid-cols-3" : "grid-cols-3"
            )}
          >
            {cardData.map((item, index) => (
              <Card
                key={index}
                variant="gainCard"
                image={item.image}
                title={item.title}
                description={item.description}
                width={36}
                height={36}
                shadowNone
                cardContainerStyle="items-center bg-light-200 border border-dark/20 p-6"
                imageContainerStyle="flex-center size-[54px] md:size-[72px] bg-primary rounded-full p-2.5"
                imageStyle="scale-60"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GainSection;
