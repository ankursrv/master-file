"use client";

import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";

type IconKey =
  | "luggage"
  | "daypack"
  | "warmLayers"
  | "cash"
  | "mobile"
  | "tuckFood";

interface DosDontsCard {
  icon: IconKey;
  title: string;
  description: string;
}

interface DosDontsGroup {
  label: string;
  description: string;
  items: DosDontsCard[];
}

interface DosDontsRehProps {
  title?: string;
  dos?: DosDontsGroup;
  donts?: DosDontsGroup;
}

const iconBase = {
  width: 26,
  height: 26,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const ICON_DIR = "/images/rocksport-reh/do-icon";

const IconImage = ({ file }: { file: string }) => (
  <CustomImage
    src={`${ICON_DIR}/${file}.svg`}
    alt=""
    width={54}
    height={54}
    aria-hidden="true"
    className="w-full h-full object-cover shrink-0"
  />
);

const icons: Record<IconKey, React.ReactNode> = {
  luggage: <IconImage file="lugguge" />,
  daypack: <IconImage file="daypack" />,
  warmLayers: (
    <svg {...iconBase} className="size-full object-cover">
      <path d="M9 3h6l4 3-2.5 3L15 7.5V21H9V7.5L7.5 9 5 6l4-3Z" />
    </svg>
  ),
  cash: <IconImage file="card" />,
  mobile: <IconImage file="mobile" />,
  tuckFood: (
    <svg {...iconBase} className="size-full object-cover">
      <path d="M6 3v8a3 3 0 0 0 6 0V3M9 3v18" />
      <path d="M17 3c-1.5 1.5-2 3-2 5s.5 3.5 2 4v9" />
    </svg>
  ),
};

const defaultDos: DosDontsGroup = {
  label: "Do's",
  description:
    "Follow these simple guidelines to ensure a safe, enjoyable, and enriching experience for everyone throughout the program",
  items: [
    {
      icon: "luggage",
      title: "Smart Luggage",
      description: "Develop critical thinking, problem-solving abilities.",
    },
    {
      icon: "daypack",
      title: "Essential Daypack",
      description:
        "Keep 1 small sling bag/knapsack with yourself while travelling and at the camp during activities to keep your belongings.",
    },
    {
      icon: "warmLayers",
      title: "Warm Layers",
      description:
        "Carry one woolen layer for the morning before reporting to the camp.",
    },
  ],
};

const defaultDonts: DosDontsGroup = {
  label: "Don't",
  description:
    "Avoid these actions to maintain safety, respect others, and ensure a smooth experience for all participants.",
  items: [
    {
      icon: "cash",
      title: "Cash",
      description:
        "No Cash is required for the program. However, the students may carry maximum of INR 1000 for the souvenir shop.",
    },
    {
      icon: "mobile",
      title: "Mobile Phones",
      description: "Mobile phones are not allowed on the program.",
    },
    {
      icon: "tuckFood",
      title: "Tuck Food",
      description:
        "We provide wholesome meals. Tuck items/tuck (cola, chips) are NOT allowed on campus.",
    },
  ],
};

const Card = ({ icon, title, description }: DosDontsCard) => (
  <article className="flex h-full flex-col rounded-xl bg-[#1A1A1A] p-5 md:p-8 border border-dark-300/[12%]">
    <div className="flex items-start justify-between gap-3">
      <p className="text-lg md:text-2xl font-bold leading-150 text-white">
        {title}
      </p>
      <span className="shrink-0 text-primary size-[54px]">{icons[icon]}</span>
    </div>
    <p className="mt-auto pt-6 text-base leading-150 tracking-[-2%] text-white/80">
      {description}
    </p>
  </article>
);

const Row = ({ label, description, items }: DosDontsGroup) => (
  <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
    {/* Left label column */}
    <div className="shrink-0 lg:w-[314px] lg:min-h-[240px] lg:pr-6 shadow-[4px_0px_10px_0px_#11111114]">
      <p className="text-2xl md:text-[32px] font-black font-nexa uppercase text-dark leading-120">
        {label}
      </p>
      <p className="mt-6 text-sm md:text-xl leading-150 font-semibold text-[#121212]">
        {description}
      </p>
    </div>

    {/* Right scrollable cards */}
    <div className="min-w-0 flex-1">
      <CustomSlider
        items={items}
        spaceBetween={24}
        slidesPerView={1.1}
        freeMode
        mousewheel
        breakpoints={{
          640: { slidesPerView: 1.8 },
          1024: { slidesPerView: 2.2 },
          1280: { slidesPerView: 2.4 },
        }}
        sliderContainerStyle="!h-full"
      >
        {(item) => <Card {...item} />}
      </CustomSlider>
    </div>
  </div>
);

const DosDontsReh = ({
  title = "What to do and what not to",
  dos = defaultDos,
  donts = defaultDonts,
}: DosDontsRehProps) => {
  return (
    <section className="bg-image2 py-10 md:py-20">
      <div className="container">
        <h2 className="text-dark! uppercase">{title}</h2>

        <div className="mt-8 md:mt-12 space-y-10 md:space-y-12">
          <Row {...dos} />
          <Row {...donts} />
        </div>
      </div>
    </section>
  );
};

export default DosDontsReh;
