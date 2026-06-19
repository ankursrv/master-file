"use client";

import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/molecules/customSlider";
import SectionTitle from "@/components/molecules/sectionTitle";
import type { HighlightItem, ProgramHighlightSection } from "@/types/adventure";
import { filterRisItems } from "@/lib/risSelection";

interface SchoolProgramProps {
  programHighlightSection?: ProgramHighlightSection;
  variant?: "ris" | "rdo" | "reh";
}

const CHUNK_SIZE = 3;

const SchoolProgram = ({ programHighlightSection }: SchoolProgramProps) => {
  const title =
    programHighlightSection?.section_heading?.title ?? "Program Highlights";
  const subTitle =
    programHighlightSection?.section_heading?.sub_title ??
    "Know about the In-school Program";
  const items = filterRisItems(
    programHighlightSection?.highlight_card?.items ?? []
  );

  const chunks: HighlightItem[][] = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunks.push(items.slice(i, i + CHUNK_SIZE));
  }

  const renderLayout = (group: HighlightItem[]) => {
    const [first, ...rest] = group;
    return (
      <div className="flex flex-col gap-4">
        {first && (
          <div className="relative w-full h-[280px] md:h-[380px] rounded-2xl overflow-hidden">
            <CustomImage
              src={first.highlight_image}
              fill
              alt={first.highlight_title}
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="size-8 lg:size-11 rounded-full flex items-center justify-center shrink-0">
                <CustomImage
                  src={first.highlight_icon}
                  width={24}
                  height={24}
                  alt=""
                  aria-hidden="true"
                  className="size-full object-contain"
                />
              </div>
              <h3 className="text-white font-bold uppercase tracking-wide">
                {first.highlight_title}
              </h3>
            </div>
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {rest.map((item, index) => (
              <div
                key={index}
                className="relative h-[180px] md:h-[240px] rounded-2xl overflow-hidden"
              >
                <CustomImage
                  src={item.highlight_image}
                  fill
                  alt={item.highlight_title}
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="size-8 lg:size-11 rounded-full flex items-center justify-center shrink-0">
                    <CustomImage
                      src={item.highlight_icon}
                      width={18}
                      height={18}
                      alt=""
                      aria-hidden="true"
                      className="size-full object-contain"
                    />
                  </div>
                  <h3 className="text-white font-bold text-sm uppercase tracking-wide">
                    {item.highlight_title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="bg-image py-15 md:py-20">
      <div className="container">
        <SectionTitle
          title={title}
          heading={subTitle}
          customClass="w-[211px] md:w-[540px]"
        />

        {items.length > 0 && (
          <div className="mt-11 lg:mt-15">
            {chunks.length > 1 ? (
              <CustomSlider
                items={chunks}
                slidesPerView={1}
                spaceBetween={20}
                pagination={{ clickable: true }}
                className="!h-auto"
                sliderContainerStyle="!pb-16"
              >
                {(group) => renderLayout(group)}
              </CustomSlider>
            ) : (
              renderLayout(items)
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default SchoolProgram;
