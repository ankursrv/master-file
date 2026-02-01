"use client"
import React from "react"
import GridCard from "../gridCard"
import CustomImage from "@/components/molecules/customImage"
import SectionTitle from "@/components/atoms/rocksport-b2b/sectionTitle"
import CustomSlider from "@/components/molecules/rocksport-b2b/customSlider"

const AmenitiesSafety = () => {
  const safetyCardData = [
    {
      image: "/images/rocksport-b2b-images/safety-icon1.svg",
      title: "Compulsory PPE",
      description: "Compulsory facemask for anyone entering the campsite.",
    },
    {
      image: "/images/rocksport-b2b-images/safety-icon2.svg",
      title: "Social Distancing",
      description: "Strict precautions are being taken to maintain social distancing.",
    },
    {
      image: "/images/rocksport-b2b-images/safety-icon3.svg",
      title: "50% capacity",
      description: "Reconnect with nature through a true camping experience.",
    },
    {
      image: "/images/rocksport-b2b-images/safety-icon4.svg",
      title: "Thermal Screening",
      description: "Thermal screening of all the staff & participant entry gate.",
    },
    {
      image: "/images/rocksport-b2b-images/safety-icon5.svg",
      title: "Siren",
      description: "A Siren after every 20 min to remind everyone to sanitize hands",
    },
    {
      image: "/images/rocksport-b2b-images/safety-icon6.svg",
      title: "Sanitization",
      description: "Regular sanitization of high contact places. ",
    },
  ]
  const midPoint = Math.ceil(safetyCardData.length / 2)
  const leftCards = safetyCardData.slice(0, midPoint)
  const rightCards = safetyCardData.slice(midPoint)
  return (
    <section className="relative">
      <div className="container pt-20">
        <SectionTitle
          title="Amenities & Safety"
          heading="Your safety is our #1 priority"
          customClass="w-[211px] lg:w-[395px]"
        />
        {/* Desktop Layout */}
        <div className="hidden lg:flex mt-[60px]">
          <div className="space-y-10">
            {leftCards.map((item, index) => (
              <GridCard
                key={index}
                variant="safetyCard"
                src={item.image}
                alt="safety Card"
                title={item.title}
                description={item.description}
                imageContainerStyle="size-[84px] shrink-0 bg-theme-primary"
                imageStyle="size-[45px]"
                cardVariantStyle="secondary"
              />
            ))}
          </div>
          <div className="min-w-[445px]">
            <CustomImage
              src="/images/rocksport-b2b-images/safety-img.png"
              width={1000}
              height={1000}
              alt="amenities and Safety"
              className="responsive-image-cover"
            />
          </div>
          <div className="space-y-10">
            {rightCards.map((item, index) => (
              <GridCard
                key={index + midPoint}
                variant="safetyCard"
                src={item.image}
                alt="safety Card"
                title={item.title}
                description={item.description}
                imageContainerStyle="size-[84px] shrink-0 bg-theme-primary"
                imageStyle="size-[45px]"
                cardVariantStyle="secondary"
              />
            ))}
          </div>
        </div>
        {/* Mobile Layout */}
        <div className="block lg:hidden mt-10">
          <CustomSlider
            items={safetyCardData}
            slidesPerView={1.4}
            spaceBetween={20}
            sliderContainerStyle=""
            className="h-auto"
          >
            {(item) => (
              <GridCard
                variant="safetyCard"
                src={item.image}
                alt={item.title}
                title={item.title}
                description={item.description}
                imageContainerStyle="size-[84px] shrink-0 bg-theme-primary"
                imageStyle="size-[45px]"
                cardVariantStyle="secondary"
              />
            )}
          </CustomSlider>
          {/* Safety Image on Mobile */}
          <div className="mt-10">
            <CustomImage
              src="/images/rocksport-b2b-images/safety-img.png"
              width={1000}
              height={1000}
              alt="amenities and Safety"
              className="responsive-image-cover rounded-xl"
            />
          </div>
        </div>
      </div>
      {/* Background Pattern Image  */}
      <div className="epic-pattern" />
      <div className="absolute bottom-0 left-0 right-0 w-full h-[196px]">
        <CustomImage
          src="/images/rocksport-b2b-images/wild.png"
          width={1000}
          height={1000}
          alt="safety image"
          className="responsive-image-cover"
        />
      </div>
      <CustomImage
        src="images/rocksport-b2b-images/line3.svg"
        width={1000}
        height={1000}
        alt="decorative line"
        className="hidden lg:block absolute top-0 left-0 w-[400px] h-auto"
      />
    </section>
  )
}

export default AmenitiesSafety
