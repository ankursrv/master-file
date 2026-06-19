"use client";

import CustomSlider from "@/components/molecules/customSlider";
import FeatureBadge from "@/components/molecules/featureBadge";
import SectionTitle from "@/components/molecules/sectionTitle";
import useIsMobile from "@/lib/useIsMobile";
import Card from "../card";
import type {
  EqVsIqSection,
  HowOutdoorBuildsEqSection,
} from "@/types/adventure";
import { filterRisItems, isRisItemVisible } from "@/lib/risSelection";

// ─── Static fallbacks ─────────────────────────────────────────────────────────
const staticComparisonData = [
  {
    image: "/images/comparison-img.png",
    title: "IQ (Intelligent Quotient)",
    description:
      "Intelligence Quotient (IQ) reflects your ability to reason, analyze, and solve problems efficiently. It measures cognitive skills such as logical thinking.",
    listItem: ["Academic Intelligence", "Logical Reasoning", "Problem Solving"],
    subTitle: "Helps You score Marks in Exam",
  },
  {
    image: "/images/comparison-img.png",
    title: "EQ (Emotional Quotient)",
    description:
      "EQ represents emotional intelligence in action the capacity to stay composed under pressure, build meaningful relationships, and inspire trust.",
    listItem: [
      "Academic Intelligence",
      "Self Management",
      "Empathy",
      "Social Skills",
      "Leadership & Teamwork",
    ],
    subTitle: "Helps you lead in life",
  },
];

const staticFeatureBadgeData = [
  { src: "/images/feature-badge/badge-1.png", title: "In School Premises" },
  { src: "/images/feature-badge/badge-2.png", title: "Activity Count" },
  { src: "/images/feature-badge/badge-3.png", title: "Certifications" },
  {
    src: "/images/feature-badge/badge-4.png",
    title: "Experimental Learning Games",
  },
  { src: "/images/feature-badge/badge-5.png", title: "Cultural Experiences" },
  { src: "/images/feature-badge/badge-6.png", title: "Class start and End" },
  { src: "/images/feature-badge/badge-7.png", title: "1:20 Instructor Ratio" },
  { src: "/images/feature-badge/badge-8.png", title: "Class start and End" },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface ComparisonSectionProps {
  eqVsIqSection?: EqVsIqSection;
  howOutdoorBuildsEqSection?: HowOutdoorBuildsEqSection;
}

const ComparisonSection = ({
  eqVsIqSection,
  howOutdoorBuildsEqSection,
}: ComparisonSectionProps) => {
  const isMobile = useIsMobile();

  // ── Map API eq_vs_iq_section → comparison cards ──────────────────────────
  const rawEqCards = eqVsIqSection?.info_cards;
  const comparisonData = rawEqCards?.length
    ? rawEqCards
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => isRisItemVisible(card))
        .map(({ card, index }) => ({
          image: card.card_image,
          title: card.card_heading,
          description: card.card_description,
          listItem: isRisItemVisible(
            eqVsIqSection!.bullet_points?.[index] ?? {}
          )
            ? (eqVsIqSection!.bullet_points?.[index]?.pointers ?? [])
            : [],
          subTitle: eqVsIqSection!.footer_text?.[index] ?? "",
        }))
    : staticComparisonData;

  // ── Map API how_outdoor_build_eq_section → feature badges ────────────────
  const rawOutdoor = howOutdoorBuildsEqSection?.feature_cards;
  const featureBadgeData = rawOutdoor?.length
    ? filterRisItems(rawOutdoor).map((card) => ({
        src: card.feature_icon,
        title: card.feature_title,
      }))
    : staticFeatureBadgeData;

  // ── Section headings from API ─────────────────────────────────────────────
  const eqTitle = eqVsIqSection?.section_heading?.title ?? "EQ vs IQ";
  const eqSubTitle =
    eqVsIqSection?.section_heading?.sub_title ?? "What Builds Real Leaders?";

  const howOutdoorTitle =
    howOutdoorBuildsEqSection?.section_heading?.title ??
    "How Outdoor Activity Build EQ";

  return (
    <section className="eq-bg-image py-10 md:py-20">
      <div className="container">
        <SectionTitle
          title={eqTitle}
          heading={eqSubTitle}
          customClass="w-[211px] md:w-[540px]"
        />

        {comparisonData.length > 0 && (
          <CustomSlider
            items={comparisonData}
            slidesPerView={1}
            spaceBetween={40}
            breakpoints={{
              640: { slidesPerView: 2 },
            }}
            pagination={isMobile ? { clickable: true } : false}
            className="!h-auto pb-12 lg:pb-0"
            sliderContainerStyle="mt-11 md:mt-15"
          >
            {(item, index) => (
              <Card
                variant="comparisonCard"
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
                listItem={item.listItem}
                subTitle={item.subTitle}
                responsiveImage
              />
            )}
          </CustomSlider>
        )}

        <FeatureBadge
          heading={howOutdoorTitle}
          data={featureBadgeData}
          className="mt-11 md:mt-20"
          badgeStyle="bg-white"
          gridStyle="grid md:grid-cols-3 lg:grid-cols-5"
          titleStyle="!text-base"
        />
      </div>
    </section>
  );
};

export default ComparisonSection;
