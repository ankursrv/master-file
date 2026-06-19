import React from "react";
import CustomSlider from "@/components/molecules/customSlider";
import CustomImage from "@/components/molecules/customImage";

type IconKey =
  | "bed"
  | "mountain"
  | "certificate"
  | "firstAid"
  | "backpack"
  | "bus"
  | "cup"
  | "wallet";

interface IncludedCard {
  icon: IconKey;
  title: string;
  description: string;
}

interface WhatsIncludedProps {
  title?: string;
  inclusionLabel?: string;
  exclusionLabel?: string;
  inclusions?: IncludedCard[];
  exclusions?: IncludedCard[];
}

// Icons are now loaded from the public folder

const defaultInclusions: IncludedCard[] = [
  {
    icon: "bed",
    title: "Included Accommodation",
    description:
      "Comfortable and secure accommodation arranged for a hassle-free experience.",
  },
  {
    icon: "mountain",
    title: "Adventure & Survival",
    description:
      "Hands-on adventure activities designed to build resilience, teamwork.",
  },
  {
    icon: "certificate",
    title: "Certification & Personalized Video",
    description:
      "Receive an official participation certificate along with a personalized video capturing your journey.",
  },
  {
    icon: "firstAid",
    title: "First Aid Support",
    description:
      "On-site first aid and trained staff ensure safety and immediate assistance during all activities.",
  },
];

const defaultExclusions: IncludedCard[] = [
  {
    icon: "backpack",
    title: "Personal Equipment",
    description:
      "Participants are required to bring their own personal gear and essentials as per the checklist.",
  },
  {
    icon: "bus",
    title: "Travel & Transportation",
    description:
      "Travel to and from the location is not included and must be arranged independently.",
  },
  {
    icon: "cup",
    title: "Meals & Beverages",
    description:
      "Meals and refreshments outside the defined program schedule are not part of the package.",
  },
  {
    icon: "wallet",
    title: "Personal Expenses",
    description:
      "Any additional personal purchases, activities, or expenses are to be borne individually.",
  },
];

const Card = ({ icon, title, description }: IncludedCard) => (
  <div className="flex h-full min-h-[200px] flex-col rounded-xl bg-[#1A1A1A] p-5 md:p-6 border border-dark-300/[12%]">
    <div className="flex items-start justify-between gap-[10px]">
      <p className="text-xl md:text-2xl md:h-[86px] font-bold leading-120 text-white">
        {title}
      </p>
      <CustomImage
        src={`/images/rocksport-reh/include/${icon}.svg`}
        alt=""
        width={44}
        height={54}
        className="shrink-0 size-11 md:size-[54px]"
        aria-hidden="true"
      />
    </div>
    <p className="mt-auto pt-2 max-w-[248px] text-sm md:text-base leading-150 text-white/80 tracking-[-2%]">
      {description}
    </p>
  </div>
);

const Group = ({ label, items }: { label: string; items: IncludedCard[] }) => (
  <div>
    <p className="text-2xl md:text-[32px] font-semibold text-black leading-120">
      {label}
    </p>
    <div className="md:hidden mt-4">
      <CustomSlider items={items} slidesPerView={1.2} spaceBetween={16}>
        {(item) => <Card {...item} />}
      </CustomSlider>
    </div>
    <div className="hidden md:grid mt-4 md:mt-6 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {items.map((item, index) => (
        <Card key={index} {...item} />
      ))}
    </div>
  </div>
);

const WhatsIncluded = ({
  title = "What's Included & What's Not",
  inclusionLabel = "Inclusion",
  exclusionLabel = "Exclusion",
  inclusions = defaultInclusions,
  exclusions = defaultExclusions,
}: WhatsIncludedProps) => {
  return (
    <section className="bg-image2 py-8 md:py-20">
      <div className="container">
        <h2 className="text-dark! uppercase">{title}</h2>

        <div className="mt-8 md:mt-10 grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
          <Group label={inclusionLabel} items={inclusions} />
          <Group label={exclusionLabel} items={exclusions} />
        </div>
      </div>
    </section>
  );
};

export default WhatsIncluded;
