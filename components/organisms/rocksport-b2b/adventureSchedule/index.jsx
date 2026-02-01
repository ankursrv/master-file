"use client"
import React, { useState } from "react"
import SectionTitle from "@/components/atoms/rocksport-b2b/sectionTitle"
import ScheduleTrack from "@/components/molecules/rocksport-b2b/ScheduleTrack"
import ScheduleGallery from "@/components/molecules/rocksport-b2b/scheduleGallery"
import DialogBox from "../../dialogBox"
import CustomImage from "@/components/molecules/customImage"
import CustomSlider from "@/components/molecules/rocksport-b2b/customSlider"

const scheduleListData = [
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
  { time: "08:30 AM Assembly in School & Departure for Camp" },
]

const scheduleImageData = [
  { image: "/images/rocksport-b2b-images/schedule1.png" },
  { image: "/images/rocksport-b2b-images/schedule2.jpg" },
  { image: "/images/rocksport-b2b-images/schedule3.png" },
  { image: "/images/rocksport-b2b-images/schedule1.png" },
  { image: "/images/rocksport-b2b-images/schedule2.jpg" },
  { image: "/images/rocksport-b2b-images/schedule2.jpg" },
  { image: "/images/rocksport-b2b-images/schedule2.jpg" },
  { image: "/images/rocksport-b2b-images/schedule2.jpg" },
]
const AdventureSchedule = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenDialog = () => setIsDialogOpen(true)
  const handleCloseDialog = () => setIsDialogOpen(false)
  return (
    <section className="schedule-bg-image py-20">
      <div className="container">
        <SectionTitle
          title="Schedule"
          heading="how you’ll spent your adventure"
          customClass="w-[211px] lg:w-[462px]"
          headingColor
        />
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-[140px] mt-10 lg:mt-[60px]">
          <ScheduleTrack data={scheduleListData} />
          <ScheduleGallery
            images={scheduleImageData}
            onOpenDialog={handleOpenDialog}
          />
        </div>
      </div>
      {/* Dialog with all images */}
      <DialogBox
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Schedule Images"
        closeIcon={true}
      >
        <CustomSlider
          items={scheduleImageData}
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 1 },
            1024: { slidesPerView: 1 },
          }}
          sliderContainerStyle="h-full navigation-style1"
        >
          {(item, index) => (
            <div className="">
              <CustomImage
                src={item.image}
                width={1200}
                height={800}
                alt={`schedule-${index + 1}`}
                className="responsive-image-contain"
              />
            </div>
          )}
        </CustomSlider>
      </DialogBox>
    </section>
  )
}

export default AdventureSchedule 
