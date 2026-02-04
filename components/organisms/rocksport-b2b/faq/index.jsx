"use client"
import React from "react"
import CustomImage from "@/components/molecules/customImage"
import Typography from "@/components/molecules/typography/typography"
import CustomAccordion from "@/components/molecules/customAccordion"
import Icons from "@/components/atoms/icons"

const faqData = [
  {
    title: "What should I carry?",
    content: "We handle everything from washing and drying to ironing and repairs. Delicate fabrics? No problem. Stubborn stains? Consider them gone. Whatever your laundry needs, we've got you covered—fresh and flawless."
  },
  {
    title: "How safe is the program?",
    content: "We handle everything from washing and drying to ironing and repairs. Delicate fabrics? No problem. Stubborn stains? Consider them gone. Whatever your laundry needs, we've got you covered—fresh and flawless."
  },
  {
    title: "How safe is the program?",
    content: "We handle everything from washing and drying to ironing and repairs. Delicate fabrics? No problem. Stubborn stains? Consider them gone. Whatever your laundry needs, we've got you covered—fresh and flawless."
  },
  {
    title: "How safe is the program?",
    content: "We handle everything from washing and drying to ironing and repairs. Delicate fabrics? No problem. Stubborn stains? Consider them gone. Whatever your laundry needs, we've got you covered—fresh and flawless."
  },
  {
    title: "Is there any medical facility at the camp?",
    content: "We handle everything from washing and drying to ironing and repairs. Delicate fabrics? No problem. Stubborn stains? Consider them gone. Whatever your laundry needs, we've got you covered—fresh and flawless."
  }
]

import Link from "next/link" /* Added in case needed, but not used here */
import SectionTitle from "@/components/atoms/rocksport-b2b/sectionTitle"

const Faq = () => {
  return (
    <section className="bg-image py-10 lg:py-section1">
      <div className="container flex flex-col lg:flex-row justify-between gap-11 lg:gap-[143px]">
        {/* Mobile Header */}
        <div className="lg:hidden">
          <SectionTitle
            title="Frequently Asked Questions"
            heading="FIND YOUR PICNIC SPOT"
            lineFull={true}
            customClass="w-[211px] md:w-[540px]"
          />
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden lg:block relative bg-theme-primary h-[529px] w-[373px] p-12 rounded-xl shrink-0">
          <Typography variant="p" className="text-[35px] leading-[120%] text-white font-secondary">
            Frequently Asked Questions
          </Typography>
          <Typography variant="p" className="text-white/80 mt-3">
            Explore clear and concise answers to the questions you care about the most.
          </Typography>
          <div className="w-[408px] h-[272px] absolute bottom-0 left-0">
            <CustomImage
              src="/images/rocksport-b2b-images/faq.png"
              width={1000}
              height={1000}
              alt="faq image"
              className="responsive-image-cover"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="w-full">
          <CustomAccordion
            items={faqData}
            autoCollapse={true}
          />
        </div>
      </div>
    </section>
  )
}

export default Faq
