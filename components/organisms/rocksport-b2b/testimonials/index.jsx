"use client"
import React, { useRef, useState } from "react"
import { cn } from "@/lib/utils"
import Typography from "@/components/molecules/typography/typography"
import CustomSlider from "@/components/molecules/rocksport-b2b/customSlider"
import CustomImage from "@/components/molecules/customImage"
import Icons from "@/components/atoms/icons"
import useIsMobile from "@/lib/useIsMobile"

const testimonials = [
  {
    name: "Sarthak Shah",
    role: "STUDENT PARENT",
    image: "/images/rocksport-b2b-images/testimonial/testi-img1.png",
    profilePic: "/images/rocksport-b2b-images/testimonial/profile1.jpg",
    text: "Rafting at Thrill Factory was one of the most refreshing adventures I've ever had! The calm waters, and just the right amount of thrill made it unforgettable. The team guided us perfectly and ensured we had the best time.",
  },
  {
    name: "Aditi Mehra",
    role: "STUDENT PARENT",
    image: "/images/rocksport-b2b-images/testimonial/testi-img2.png",
    profilePic: "/images/rocksport-b2b-images/testimonial/profile2.jpg",
    text: "Soaring high above the mountains during my paragliding session at Thrill Factory was absolutely magical! The views were breathtaking, and the instructors made me feel completely safe from start to finish—I can't wait to do it again!",
  },
  {
    name: "Sarthak Shah 2",
    role: "STUDENT PARENT",
    image: "/images/rocksport-b2b-images/testimonial/testi-img1.png",
    profilePic: "/images/rocksport-b2b-images/testimonial/profile1.jpg",
    text: "Rafting at Thrill Factory was one of the most refreshing adventures I've ever had! The calm waters, and just the right amount of thrill made it unforgettable. The team guided us perfectly and ensured we had the best time.",
  },
]

const TestimonialsSection = () => {
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };
  const isMobile = useIsMobile()

  return (
    <section className="relative testimonial-bg-image py-24 overflow-hidden">
      <div className="container z-10 relative navigation-style1">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="relative w-full lg:min-w-[413px]">
            <Typography variant="h2" font="secondary" className="text-white">
              LOVED BY THOUSANDS OF STUDENTS & PARENTS
            </Typography>
            <Typography variant="p" className="text-white/80 text-lg lg:text-xl font-normal pt-6 max-w-[400px]">
              Real stories from real thrill-seekers! Hear how guests experienced the adrenaline, fun, and unforgettable moments at Thrill Factory.
            </Typography>
            {/* For Mobile */}
            <div className="hidden lg:block w-1/4 absolute lg:bottom-8 lg:left10">
              <div className="swiper-button-next " />
              <div className="swiper-button-prev" />
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <CustomSlider
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              items={testimonials}
              slidesPerView={1}
              spaceBetween={20}
              navigation={
                {
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }

              }
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 40 },
              }}
              sliderContainerStyle="lg:w-[867px]"
              className="h-full"
            >
              {(item) => (
                <div className="bg-dark-tone-ink/60 backdrop-blur-sm rounded-xl overflow-hidden h-full flex flex-col">
                  {/* Activity Image */}
                  <div className="relative aspect-square h-[374px]">
                    <CustomImage
                      src={item.image}
                      width={1000}
                      height={1000}
                      alt={item.name}
                      className="responsive-image-cover"
                    />
                    <div className="bg-testimonial-gradient absolute bottom-0 h-16 w-full" />
                  </div>
                  <div className="p-6 relative border border-white/40 border-t-0 rounded-xl rounded-t-none">
                    <div className="absolute -top-8 right-7">
                      <svg width="65" height="65" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <path d="M19.2 0H0V19.2H9.6C9.6 24.5 5.3 28.8 0 28.8V38.4C10.6 38.4 19.2 29.8 19.2 19.2V0ZM48 0H28.8V19.2H38.4C38.4 24.5 34.1 28.8 28.8 28.8V38.4C39.4 38.4 48 29.8 48 19.2V0Z" fill="currentColor" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-5">
                      <div className="size-[60px] rounded-full overflow-hidden border-2 border-white flex-shrink-0">
                        <CustomImage
                          src={item.profilePic}
                          alt={item.name}
                          width={60}
                          height={60}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Typography variant="h4" className="text-white">
                          {item.name}
                        </Typography>
                        <Typography variant="p" className="text-white/40 text-sm font-semibold mt-2 uppercase">
                          {item.role}
                        </Typography>
                      </div>
                    </div>

                    <Typography variant="p" className="text-white mt-6">
                      {item.text}
                    </Typography>
                  </div>
                </div>
              )}
            </CustomSlider>
            {/* For Desktop */}
            <div className="w-1/3 sm:w-1/6 block lg:hidden absolute top-1/2 right-0 mt-10 h-full">
              <div className="swiper-button-next " />
              <div className="swiper-button-prev" />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default TestimonialsSection