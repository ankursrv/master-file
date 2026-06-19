"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import {
  Pagination,
  Navigation,
  FreeMode,
  Mousewheel,
  Keyboard,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface CustomSliderProps<T> extends Omit<SwiperProps, "children"> {
  items: T[];
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  breakpoints?: SwiperProps["breakpoints"];
  children: (item: T, index: number) => React.ReactNode;
  pagination?: SwiperProps["pagination"];
  navigation?: SwiperProps["navigation"];
  direction?: SwiperProps["direction"];
  sliderContainerStyle?: string;
  speed?: number;
  freeMode?: boolean;
  mousewheel?: boolean;
  keyboard?: boolean;
  className?: string;
}

function CustomSlider<T>({
  items,
  slidesPerView = 6,
  spaceBetween = 12,
  breakpoints = {},
  children,
  pagination,
  className,
  navigation,
  direction = "horizontal",
  sliderContainerStyle,
  speed = 600,
  freeMode = false,
  mousewheel = false,
  keyboard = true,
  ...props
}: CustomSliderProps<T>) {
  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      breakpoints={breakpoints}
      modules={[Pagination, Navigation, FreeMode, Mousewheel, Keyboard]}
      keyboard={{ enabled: keyboard }}
      pagination={pagination}
      navigation={navigation}
      direction={direction}
      className={sliderContainerStyle}
      speed={speed}
      freeMode={freeMode}
      mousewheel={
        mousewheel
          ? {
              forceToAxis: true,
              sensitivity: 1,
              releaseOnEdges: true,
            }
          : false
      }
      {...props}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className={className}>
          {children(item, index)}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default CustomSlider;
