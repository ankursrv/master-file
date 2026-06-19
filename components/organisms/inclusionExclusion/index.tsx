"use client";
import SectionTitle from "@/components/molecules/sectionTitle";
import Card from "../card";
import useIsMobile from "@/lib/useIsMobile";
import CustomSlider from "@/components/molecules/customSlider";
import { cn } from "@/lib/utils";
import CustomImage from "@/components/molecules/customImage";

// ✅ Interface for each card item
interface CardItem {
  image: string;
  title: string;
}

// ✅ Interface for CardSection props
interface CardSectionProps {
  label: string;
  data: CardItem[];
  isMobile: boolean;
}

// ✅ Alag-alag data with proper type annotation
const inclusionData: CardItem[] = [
  { image: "/images/gainIcons/gain-icon6.svg", title: "Accommodation" },
  {
    image: "/images/gainIcons/gain-icon5.svg",
    title: "Adventure and survival experience",
  },
  {
    image: "/images/gainIcons/gain-icon4.svg",
    title: "Certification and personalized video",
  },
  { image: "/images/gainIcons/gain-icon3.svg", title: "First Aid Support" },
];

const exclusionData: CardItem[] = [
  {
    image: "/images/gainIcons/gain-icon2.svg",
    title: "Personal Equipment",
  },
  {
    image: "/images/gainIcons/gain-icon1.svg",
    title: "Travel & Transportation",
  },
  { image: "/images/gainIcons/gain-icon1.svg", title: "Meals & Beverages" },
  { image: "/images/gainIcons/gain-icon2.svg", title: "Personal Expenses" },
];

// CardSection component
const CardSection: React.FC<CardSectionProps> = ({ label, data, isMobile }) => (
  <div className="flex-1 h-full w-full min-w-0">
    <h4 className="font-bold text-lg mb-5 lg:mb-6">{label}</h4>

    {isMobile ? (
      // Mobile
      <CustomSlider
        items={data}
        spaceBetween={20}
        breakpoints={{
          300: { slidesPerView: 1.2 },
          640: { slidesPerView: 2.8 },
          991: { slidesPerView: 4 },
        }}
        className="!h-auto"
        sliderContainerStyle="mt-4"
      >
        {(item, index) => (
          <Card
            key={index}
            variant="gainCard"
            image={item.image}
            title={item.title}
            width={36}
            height={36}
            shadowNone
            cardContainerStyle="items-center bg-light-200 border border-dark/20 p-5 rounded-xl"
            imageContainerStyle="flex-center size-[54px] bg-primary rounded-full p-2.5"
            imageStyle="scale-60"
            titleStyle="!text-sm text-center"
          />
        )}
      </CustomSlider>
    ) : (
      // Desktop
      <div className="grid grid-cols-2 gap-x-10 gap-y-8 h-full">
        {data.map((item, index) => (
          <Card
            key={index}
            variant="gainCard"
            image={item.image}
            title={item.title}
            width={36}
            height={36}
            shadowNone
            cardContainerStyle="items-center bg-light-200 border border-dark/20 p-5 rounded-xl !h-[176px]"
            imageContainerStyle="flex-center size-[54px] md:size-[72px] bg-primary rounded-full p-2.5"
            imageStyle="scale-60"
            titleStyle="!text-base text-center"
          />
        ))}
      </div>
    )}
  </div>
);

// Main component
const InclusionsExclusions: React.FC = () => {
  const isMobile: boolean = useIsMobile();

  return (
    <section className="container py-10 md:py-20 relative">
      <SectionTitle
        title="Inclusions & Exclusions"
        heading="What's Included & What's Not"
        customClass="w-[211px] md:w-[462px]"
      />
      <div
        className={cn(
          "mt-11 lg:mt-15 flex flex-col md:flex-row gap-11 lg:gap-10"
        )}
      >
        <CardSection
          label="Inclusion"
          data={inclusionData}
          isMobile={isMobile}
        />

        <CardSection
          label="Exclusions"
          data={exclusionData}
          isMobile={isMobile}
        />
      </div>
      {/* line  */}
      <CustomImage
        src="/images/reh-line1.png"
        width={270}
        height={495}
        alt=""
        aria-hidden="true"
        className="absolute top-10 right-0 hidden lg:block"
      />
    </section>
  );
};

export default InclusionsExclusions;
