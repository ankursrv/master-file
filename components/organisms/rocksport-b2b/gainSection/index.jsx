"use client"
import React from "react"
import SectionTitle from "@/components/atoms/rocksport-b2b/sectionTitle"
import GridCard from "../gridCard"
import CustomSlider from "@/components/molecules/rocksport-b2b/customSlider"

const GainSection = () => {
  const valueCardData = [
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon6.svg",
      title: "Educational Objectives",
      description: "Develop critical thinking, problem-solving abilities, and leadership qualities through experiential learning in natural environments.",
    },
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon5.svg",
      title: "Team Building",
      description: "Strengthen bonds between classmates, improve communication skills, and learn the importance of collaboration & mutual support.",
    },
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon4.svg",
      title: "Personal Growth",
      description: "Build self-confidence, overcome personal fears, and develop resilience through supervised challenges and achievements.",
    },
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon3.svg",
      title: "Environmental Awareness",
      description: "Learn about conservation, sustainability, and develop a deeper appreciation for nature and environmental responsibility.",
    },
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon2.svg",
      title: "Curriculum Integration",
      description: "Activities designed to complement academic learning with practical applications of science, geography, and physical education.",
    },
    {
      image: "/images/rocksport-b2b-images/gainIcons/gain-icon1.svg",
      title: "Life Skills",
      description: "Develop independence, decision-making abilities, and practical life skills that will benefit students beyond the classroom.",
    },
  ]
  return (
    <section className="container pb-[100px]">
      <SectionTitle
        title="What You’ll Gain"
        heading="Why Adventure Matters"
        customClass="w-[211px] lg:w-[530px]"
      />
      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-[60px]">
        {valueCardData.map((item, index) => (
          <GridCard
            key={index}
            variant="valueCard"
            src={item.image}
            alt="value card"
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
      {/* Mobile Layout */}
      <CustomSlider
        items={valueCardData}
        slidesPerView={1.4}
        spaceBetween={20}
        sliderContainerStyle="!block md:!hidden"
      >
        {(item,index) => (
          <GridCard
            key={index}
            variant="valueCard"
            src={item.image}
            alt="value card"
            title={item.title}
            description={item.description}
          />
        )}
      </CustomSlider>
    </section>
  )
}

export default GainSection
