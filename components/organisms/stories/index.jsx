"use client";

import React from "react";
import CustomImage from "@/components/molecules/customImage";
import S from "./storiesStyles";

/* ── Default stories data matching the screenshot ────────────────── */
const defaultStories = [
  {
    title: "Beyond Bits: The Rise of Quantum Computing",
    author: "Dr. Samik Mukherjee | Jio University",
    description: "What if computers could solve problems that are impossible today? Imagine discovering life-saving medicines in days instead of years. Imagine predicting climate solutions before disasters strike...",
    image: {
      src: "/images/story-1.png",
      alt: "Quantum Computing",
    },
  },
  {
    title: "AI-Driven Early Detection of Cancer: From Detection to Anticipation",
    author: "Dr. Ankita Bansal | Jio University",
    description: "Integrating AI with metabolic profiling fundamentally shifts modern cancer diagnostics from identifying visible tumours towards anticipating disease trajectories. Analysing weak, heterogeneous signals...",
    image: {
      src: "/images/story-2.png",
      alt: "Early Detection of Cancer",
    },
  },
  {
    title: "Towards Reliable and Interpretable Reasoning in AI Systems",
    author: "Dr. Mohna Chakraborty | Jio University",
    description: "Current AI reasoning remains opaque and brittle, necessitating novel modular architectures. Separating language generation from structured knowledge and dedicated reasoning modules actively...",
    image: {
      src: "/images/story-3.png",
      alt: "AI Systems Reasoning",
    },
  },
  {
    title: "How Artificial Intelligence Is Transforming Industries in 2026",
    author: "Dr. Sudipta Roy | Jio University",
    description: "Autonomous AI agents now execute multi-step workflows independently, replacing simple chatbots. Domain-specific generative models, robust fraud detection, and mandatory AI literacy...",
    image: {
      src: "/images/story-4.png",
      alt: "Transforming Industries",
    },
  },
];

/* ── Stories Component ───────────────────────────────────────────── */
const Stories = ({
  sectionTitle = "Stories Defining the Future",
  sectionSubtitle = "How our faculty see the potential of AI and Emerging technologies",
  stories = defaultStories,
}) => {
  return (
    <section className={S.section}>
      <div className={S.container}>
        
        {/* Header */}
        <div className={S.headerWrapper}>
          <h2 className={S.sectionTitle}>{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className={S.sectionSubtitle}>{sectionSubtitle}</p>
          )}
        </div>

        {/* List of Stories */}
        <div className={S.listWrapper}>
          {stories.map((story, i) => (
            <div key={i} className={S.cardRow}>
              
              {/* Left: Title & Author */}
              <div className={S.colLeft}>
                <div className={S.titleWrapper}>
                  <h3 className={S.cardTitle}>
                    {story.title}
                  </h3>
                </div>
                <p className={S.authorText}>{story.author}</p>
              </div>

              {/* Middle: Description */}
              <div className={S.colMiddle}>
                <p className={S.description}>{story.description}</p>
              </div>

              {/* Right: Image */}
              <div className={S.colRight}>
                <div className={S.imageWrapper}>
                  <CustomImage
                    src={story.image.src}
                    alt={story.image.alt}
                    fill
                    className={S.image}
                    sizes="(max-width: 1024px) 100vw, 30vw"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Stories;
