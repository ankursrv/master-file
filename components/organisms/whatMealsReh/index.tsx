import React from "react";
import CustomImage from "@/components/molecules/customImage";

interface WhatMealsRehProps {
  title?: string;
  description?: string;
  cardTitle?: string;
  cardDescription?: string;
  introImage?: string;
  cardImage?: string;
}

const WhatMealsReh = ({
  title = "What Meals Will Be Served?",
  description = "With rising cause of obesity amongst adolescents, the need for a nutritious diet for student is now more than ever. While on ordinary holidays, students have free access to fast food, at Rocksport Residential program, a disciplined routine of nutritious meals is followed.",
  cardTitle = "Organic Cuisines & Nutritious Meals",
  cardDescription = "Students enjoy a healthy mix of locally produced cuisines and energy drinks made with organically grown fruits and herbs. Carefully curated meals made with organic, locally sourced ingredients provide students with balanced nutrition, hygiene, and the energy needed for a safe and active experience.",
  introImage = "/images/rocksport-reh/meals-img2.webp",
  cardImage = "/images/rocksport-reh/meals-img1.webp",
}: WhatMealsRehProps) => {
  return (
    <section className="bg-image2 py-8 md:py-20">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-4 lg:gap-8 lg:grid-cols-2 lg:gap-x-[136px]">
          {/* Left column — heading, copy, students image */}
          <div className="flex flex-col">
            <h2 className="text-dark! uppercase">{title}</h2>
            <p className="mt-4 lg:mt-3 text-base md:text-xl leading-150 text-dark-300/60 tracking-[-2%]">
              {description}
            </p>

            <div className="relative mt-8 aspect-470/290 w-full overflow-hidden rounded-xl md:mt-12">
              <CustomImage
                src={introImage}
                alt="Students sharing a nutritious meal"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Right column — chef image, sub-heading, copy */}
          <div className="flex flex-col">
            <div className="relative aspect-470/300 w-full overflow-hidden rounded-xl">
              <CustomImage
                src={cardImage}
                alt="Chef preparing organic, nutritious meals"
                fill
                className="object-cover object-center"
              />
            </div>

            <p className="mt-8 lg:mt-6 lg:w-[48%] text-2xl font-bold leading-120 text-dark md:text-[32px]">
              {cardTitle}
            </p>
            <p className="mt-4 lg:mt-2 text-base md:text-xl leading-150 text-dark-300/60 tracking-[-2%]">
              {cardDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatMealsReh;
