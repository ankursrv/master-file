"use client"
import React from "react"
import SectionTitle from "@/components/atoms/rocksport-b2b/sectionTitle"
import CustomImage from "@/components/molecules/customImage"
import CustomSlider from "@/components/molecules/rocksport-b2b/customSlider"
import Typography from "@/components/molecules/typography/typography"

const allActivities = [
  {
    title: "ZIPLINE",
    image: "/images/rocksport-b2b-images/activities/image1.png",
    icon: "/images/rocksport-b2b-images/activities/icon1.svg",
  },
  {
    title: "POTTERY",
    image: "/images/rocksport-b2b-images/activities/image2.png",
    icon: "/images/rocksport-b2b-images/activities/icon2.svg",
  },
  {
    title: "TUG OF WAR",
    image: "/images/rocksport-b2b-images/activities/image3.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon3.svg",
  },
  {
    title: "COMMANDO BRIDGE",
    image: "/images/rocksport-b2b-images/activities/image4.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon4.svg",
  },
  {
    title: "ARCHERY",
    image: "/images/rocksport-b2b-images/activities/image5.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon5.svg",
  },
  {
    title: "HIKING",
    image: "/images/rocksport-b2b-images/activities/image6.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon6.svg",
  },
  {
    title: "ZIPLINE 2",
    image: "/images/rocksport-b2b-images/activities/image1.png",
    icon: "/images/rocksport-b2b-images/activities/icon1.svg",
  },
  {
    title: "POTTERY 2",
    image: "/images/rocksport-b2b-images/activities/image2.png",
    icon: "/images/rocksport-b2b-images/activities/icon2.svg",
  },
  {
    title: "TUG OF WAR 2",
    image: "/images/rocksport-b2b-images/activities/image3.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon3.svg",
  },
  {
    title: "COMMANDO BRIDGE 2",
    image: "/images/rocksport-b2b-images/activities/image4.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon4.svg",
  },
  {
    title: "ARCHERY 2",
    image: "/images/rocksport-b2b-images/activities/image5.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon5.svg",
  },
  {
    title: "HIKING 2",
    image: "/images/rocksport-b2b-images/activities/image6.jpg",
    icon: "/images/rocksport-b2b-images/activities/icon6.svg",
  },
]

const slides = [
  { activities: allActivities.slice(0, 6) },
  { activities: allActivities.slice(6, 12) },
]

const SchoolProgram = () => {
  return (
    <section className="pt-20 pb-[100px] container">
      <SectionTitle
        title="Know about the In-school Program"
        heading="Program Highlights"
        customClass="w-[211px] lg:w-[462px]"
      />

      <CustomSlider
        items={slides}
        slidesPerView={1}
        spaceBetween={16}
        pagination={{ clickable: true }}
        className="mt-[60px]" 
      >
        {(slide) => (
          <div className="activity-grid-style">
            {slide.activities.map((item, index) => (
              <div
                key={index}
                className="group relative rounded-3xl overflow-hidden cursor-pointer"
              >
                <CustomImage
                  src={item.image}
                  alt={item.title}
                  width={1000}
                  height={1000}
                  className="responsive-image-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 activity-card-gradient" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                  <div className="size-11">
                    <CustomImage
                      src={item.icon}
                      alt="activities icon"
                      width={1000}
                      height={1000}
                      className="responsive-image-contain"
                    />
                  </div>
                  <Typography variant="h6" font="secondary">
                    {item.title}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        )}
      </CustomSlider>
    </section>
  )
}

export default SchoolProgram