"use client";
import CustomSlider from "@/components/molecules/customSlider";
import SectionTitle from "@/components/molecules/sectionTitle";
import Card from "../card";

interface CardItem {
  image: string;
  title: string;
  description: string;
}

const dosData: CardItem[] = [
  {
    image: "/images/gainIcons/gain-icon6.svg",
    title: "Confidence",
    description:
      "Develop critical thinking, problem-solving abilities, and leadership qualities through experiential learning in natural environments.",
  },
  {
    image: "/images/gainIcons/gain-icon5.svg",
    title: "Team Building",
    description:
      "Strengthen bonds between classmates, improve communication skills, and learn the importance of collaboration & mutual support.",
  },
  {
    image: "/images/gainIcons/gain-icon4.svg",
    title: "Personal Growth",
    description:
      "Build self-confidence, overcome personal fears, and develop resilience through supervised challenges and achievements.",
  },
];

const dontsData: CardItem[] = [
  {
    image: "/images/gainIcons/gain-icon3.svg",
    title: "Environmental Awareness",
    description:
      "Learn about conservation, sustainability, and develop a deeper appreciation for nature and environmental responsibility.",
  },
  {
    image: "/images/gainIcons/gain-icon2.svg",
    title: "Curriculum Integration",
    description:
      "Activities designed to complement academic learning with practical applications of science, geography, and physical education.",
  },
  {
    image: "/images/gainIcons/gain-icon1.svg",
    title: "Life Skills",
    description:
      "Develop independence, decision-making abilities, and practical life skills that will benefit students beyond the classroom.",
  },
];

// Reusable component
interface GuidelinesSliderProps {
  heading: string;
  data: CardItem[];
  headingStyle?: string;
}

const GuidelinesSlider = ({
  heading,
  data,
  headingStyle,
}: GuidelinesSliderProps) => (
  <>
    <h5 className={`text-start md:text-center ${headingStyle}`}>{heading}</h5>
    <CustomSlider
      items={data}
      spaceBetween={20}
      breakpoints={{
        300: { slidesPerView: 1.2 },
        640: { slidesPerView: 2.8 },
        991: { slidesPerView: 3 },
      }}
      className="!h-auto"
      sliderContainerStyle="mt-4"
    >
      {(item: CardItem, index: number) => (
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
  </>
);

// Main component
const GuidelinesSection = () => {
  return (
    <section className="container py-10 md:py-20">
      <SectionTitle
        title="How a Rocksporter is Crafted"
        heading="Do's and Don'ts"
        customClass="w-[211px] md:w-[462px]"
      />
      <GuidelinesSlider heading="Do's" data={dosData} headingStyle="mt-15" />
      <GuidelinesSlider
        heading="Don'ts"
        data={dontsData}
        headingStyle="mt-10"
      />
    </section>
  );
};

export default GuidelinesSection;
