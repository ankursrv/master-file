"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, FreeMode, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const CustomSlider = ({
  items,
  slidesPerView = 6,
  spaceBetween = 12,
  breakpoints = {},
  children,
  pagination,
  className,
  navigation,
  direction,
  sliderContainerStyle,
  speed = 600,
  freeMode = false,
  mousewheel = false,
  ...props
}) => {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      modules={[Pagination, Navigation, FreeMode, Mousewheel]}
      pagination={pagination}
      navigation={navigation}
      direction={direction}
      className={sliderContainerStyle}
      speed={speed}
      freeMode={freeMode}
      mousewheel={{
        forceToAxis: true,
        sensitivity: 1,
        releaseOnEdges: true,
      }}
      {...props}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className={className}>
          {children(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CustomSlider;
