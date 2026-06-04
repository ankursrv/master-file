"use client";

import React, { useRef } from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/organisms/customSlider";
import styles from "./impactStyles";

const defaultSlides = [
  {
    author: "Dr. Mohna Chakraborty",
    title:
      "How Reasoning Influences Intersectional Biases in Vision-Language Models",
    description:
      "Vision-Language Models (VLMs) are increasingly deployed across downstream tasks, yet their training data...",
    linkText: "View Research Paper",
    image: { src: "/images/impact-1.png", alt: "Vision-Language Models" },
  },
  {
    author: "Dr. Sudipta Roy",
    title:
      "Contrastive Learning Strategies for Better Image Classification with Imbalanced Data",
    description:
      "Imbalanced and long-tailed datasets remain a major challenge in image analysis, particularly in high-impact...",
    linkText: "View Research Paper",
    image: {
      src: "/images/impact-2.png",
      alt: "Contrastive Learning Strategies",
    },
  },
  {
    author: "Dr. Mohna Chakraborty",
    title:
      "Evaluating Large Language Models on Solved and Unsolved Problems in Computer Science",
    description:
      "Large Language Models are increasingly used by students to explore advanced material in computer science...",
    linkText: "View Research Paper",
    image: {
      src: "/images/impact-3.png",
      alt: "Evaluating Large Language Models",
    },
  },
  {
    author: "Dr. Samik Mukherjee",
    title:
      "Algorithmic Fairness in Feature Selection using Deep Neural Networks",
    description:
      "Deep learning models are often criticised for functioning as black boxes, making it difficult to understand the reasoning...",
    linkText: "View Research Paper",
    image: { src: "/images/impact-4.png", alt: "Algorithmic Fairness" },
  },
];

const ArrowUpRightIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={styles.linkIcon}
  >
    <path
      d="M7 17L17 7M17 17V7H7"
      stroke="#E30513"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Impact = ({
  sectionTitle = "Translating Vision into Impact",
  slides = defaultSlides,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header & Navigation */}
        <div className={styles.headerWrapper}>
          <h2 className={styles.sectionTitle}>{sectionTitle}</h2>

          <div className={styles.navWrapper}>
            <div className={`impact-prev ${styles.navButton}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.navIcon}
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={`impact-next ${styles.navButton}`}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.navIcon}
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Slider - Override overflow to visible so it bleeds out to the right */}
        <div className={styles.sliderContainer}>
          <CustomSlider
            items={slides}
            slidesPerView={3}
            spaceBetween={28}
            sliderContainerStyle="!overflow-visible"
            className={styles.slide}
            speed={600}
            navigation={{
              prevEl: ".impact-prev",
              nextEl: ".impact-next",
            }}
          >
            {(slide, i) => (
              <div className={styles.card}>
                <div className={styles.imageWrapper}>
                  <CustomImage
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1024px) 300px, 421px"
                  />
                </div>

                <p className={styles.authorName}>{slide.author}</p>
                <div className={styles.titleWrapper}>
                  <h3 className={styles.cardTitle}>{slide.title}</h3>
                </div>
                <p className={styles.description}>{slide.description}</p>

                <div className={styles.link}>
                  {slide.linkText}
                  <ArrowUpRightIcon />
                </div>
              </div>
            )}
          </CustomSlider>
        </div>
      </div>
    </section>
  );
};

export default Impact;
