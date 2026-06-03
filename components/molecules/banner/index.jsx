"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import styles from "./bannerStyles";

/* ─────────────────────────────────────────────────────────────────
   BannerSlideContent — one slide: background media + overlay + text
──────────────────────────────────────────────────────────────────── */
const BannerSlideContent = ({ slide }) => {
  const {
    mediaType = "video",  // "image" | "video"
    mediaSrc,
    label,
    heading,              // string  OR  { light: string, italic: string }
    subtext,
    tags = [],            // ["AI", "Quantum Computing", ...]
    buttons = [],         // [{ label, variant, onClick }]
  } = slide;

  return (
    <>
      {/* ── Background media ── */}
      {mediaType === "video" ? (
        <video
          className={styles.bannerMedia}
          src={mediaSrc}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <Image
          src={mediaSrc}
          alt={label || (typeof heading === "string" ? heading : "") || "Banner"}
          fill
          className={styles.bannerMedia}
          priority
        />
      )}

      {/* ── Dark gradient overlay ── */}
      <div
        className={styles.bannerOverlay}
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 8.59%, #000000 132.71%)",
        }}
        aria-hidden="true"
      />

      {/* ── Text content ── */}
      <div className={styles.bannerContent}>

        {/* Label */}
        {label && <small className={styles.bannerLabel}>{label}</small>}

        {/* Heading */}
        {heading && (
          <h1 className={styles.bannerHeading}>
            {typeof heading === "string" ? (
              heading
            ) : (
              <>
                {heading.light && (
                  <span className={styles.headingLight}>{heading.light}</span>
                )}
                {heading.italic && (
                  <span className={styles.headingItalic}>{heading.italic}</span>
                )}
              </>
            )}
          </h1>
        )}

        {/* Subtext */}
        {subtext && <p className={styles.bannerSubtext}>{subtext}</p>}

        {/* Tags — AI • QUANTUM COMPUTING • ROBOTICS */}
        {tags.length > 0 && (
          <div className={styles.bannerTags} aria-label="Focus areas">
            {tags.map((tag, i) => (
              <React.Fragment key={tag}>
                <span className={styles.bannerTag}>{tag}</span>
                {i < tags.length - 1 && (
                  <span className={styles.tagDot} aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Buttons */}
        {buttons.length > 0 && (
          <div className={styles.bannerBtns}>
            {buttons.map((btn, i) => (
              <Button
                key={i}
                variant={btn.variant || "heroPrimary"}
                iconPosition="right"
                icon={<Icons.arrowRightUp />}
                onClick={btn.onClick}
                ariaLabel={btn.label}
              >
                {btn.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

/* ─────────────────────────────────────────────────────────────────
   Banner — main export
   Props:
     slides: BannerSlide[]   — array of slide data
     autoplay?: boolean      — default true  (only when multiple)
     autoplayDelay?: number  — default 4000ms
──────────────────────────────────────────────────────────────────── */
const Banner = ({
  slides = [],
  autoplay = true,
  autoplayDelay = 4000,
}) => {
  // ── Single slide → no Swiper overhead ──
  if (slides.length === 1) {
    return (
      <section className={styles.bannerWrapper} aria-label="Banner">
        <BannerSlideContent slide={slides[0]} />
      </section>
    );
  }

  // ── Multiple slides → Swiper carousel with pagination ──
  return (
    <section className={styles.bannerWrapper} aria-label="Banner">
      <Swiper
        className={styles.bannerSlider}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={
          autoplay
            ? { delay: autoplayDelay, disableOnInteraction: false }
            : false
        }
        loop
        speed={700}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i} className={styles.bannerSlide}>
            <BannerSlideContent slide={slide} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
