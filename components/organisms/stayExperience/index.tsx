import SectionTitle from "@/components/molecules/sectionTitle";
import CustomImage from "@/components/molecules/customImage";
import { cn } from "@/lib/utils";

const stayExperienceSections = [
  {
    sectionTitle: "Your Stay",
    sectionHeading: "YOUR RIVERSIDE ESCAPE",
    cards: [
      {
        image: "/images/stay-adventure/stay-1.png",
        title: "A STAY WORTH SAVORING",
        imagePosition: "left",
        points: [
          "Private sit-out areas with river or garden views",
          "Air-conditioned rooms with modern amenities",
          "Bonfire zones for evening gatherings",
          "Safe play areas for children",
        ],
      },
      {
        image: "/images/stay-adventure/stay-2.png",
        title: "FLAVOURS BY THE WATER",
        imagePosition: "right",
        points: [
          "Multi-cuisine buffet options",
          "Traditional Garhwali specialties",
          "Kids-friendly menu",
          "Live BBQ & picnic-style meals",
        ],
      },
    ],
  },
  {
    sectionTitle: "About the Location",
    sectionHeading: "WHERE NATURE TAKES OVER",
    cards: [
      {
        image: "/images/stay-adventure/stay-3.png",
        title: "EXPLORE BEYOND THE STAY",
        imagePosition: "right",
        points: [
          "River rafting and camping spots",
          "Nature trails and forest trails",
          "Evening Ganga Aarti experiences",
          "Local artisan markets",
        ],
      },
      {
        image: "/images/stay-adventure/stay-4.png",
        title: "STAY. UNWIND. REPEAT.",
        imagePosition: "left",
        points: [
          "Outdoor activity area",
          "Kids adventure zone",
          "Indoor games lounge",
          "Swimming pool",
          "Conference & event space",
          "24/7 security & parking",
          "First-aid and medical assistance on call",
        ],
      },
    ],
  },
  {
    sectionTitle: "Nearby Locations",
    sectionHeading: "ATTRACTIONS AROUND",
    cards: [
      {
        image: "/images/stay-adventure/stay-1.png",
        title: "EXPLORE THE SURROUNDINGS",
        imagePosition: "left",
        points: [
          "Abbey Falls 7 km",
          "Raja's Seat 9 km",
          "Tadiyandamol Peak 35 km",
        ],
      },
    ],
  },
];

const StayExperience = () => {
  return (
    <section className="bg-[#F3FBF7] py-10 md:py-20 relative">
      <div className="epic-pattern" />
      {stayExperienceSections.map((item, index) => (
        <div key={index} className="container pb-20 last:pb-0">
          <SectionTitle
            title={item.sectionTitle}
            heading={item.sectionHeading}
            customClass="w-[211px] md:w-[462px]"
          />
          {/* Cards */}
          {item.cards.map((item, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center gap-5 md:gap-10 mt-10 md:mt-15",
                item.imagePosition === "right"
                  ? "lg:flex-row-reverse"
                  : "lg:flex-row "
              )}
            >
              {/* Image */}
              <div className="w-full lg:w-[580px] h-[173px] md:h-[300px] rounded-xl md:rounded-3xl overflow-hidden shrink-0">
                <CustomImage
                  src={item.image}
                  width={580}
                  height={300}
                  alt={item.title}
                  className="responsive-image-cover"
                />
              </div>

              {/* Text Content */}
              <div className="flex-1 w-full">
                <p className="text-xl md:text-[32px] text-dark font-nexa font-semibold">
                  {item.title}
                </p>
                <ul className="list-disc space-y-1.5 md:space-y-3 mt-4 ml-7 md:ml-4">
                  {item.points.map((item, index) => (
                    <li
                      key={index}
                      className="text-gray-600 text-sm md:text-base"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default StayExperience;
