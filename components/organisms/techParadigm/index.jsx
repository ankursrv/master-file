"use client";

import React from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/organisms/customSlider";
import useIsMobile from "@/lib/useIsMobile";
import styles from "./techParadigmStyles";

/* ── Default slides data ─────────────────────────────────────────── */
const defaultSlides = [
  {
    image: { src: "/images/ai-tech-monitor.png", alt: "AI monitor" },
    topic: {
      title: "Artificial Intelligence",
      description:
        "On a global scale, AI is expected to drive a $15.7 trillion economic boost by 2030; specifically within India, Generative AI alone is forecasted to contribute up to $1.5 trillion to the GDP by 2030.",
      source: "Sources: PwC / EY India Report",
    },
    stats: [
      { value: "$15.7T", label: "Expected economic boost", sublabel: "by 2030" },
      { value: "$1.5T",  label: "Contribution to the GDP", sublabel: "by 2030" },
    ],
  },
  {
    image: { src: "/images/quantum-computing.png", alt: "Quantum computing" },
    topic: {
      title: "Quantum",
      description:
        "The global quantum computing market is projected to reach $2.04 billion in 2026. India now ranks among the top 7 nations with a dedicated National Quantum Mission, aiming to capture a significant share of the global services market.",
      source: "Sources: Fortune Business Insights / APAC Group, April 2025",
    },
    stats: [
      { value: "$2.04B", label: "Projected reach in 2026" },
      { value: "Top 7",  label: "Among nations with a NQM" },
    ],
  },
  {
    image: { src: "/images/robotics-industry.png", alt: "Industrial robotics" },
    topic: {
      title: "Robotics",
      description:
        "The global robotics market is expected to reach $50.8 billion in 2025. India has emerged as the 6th largest market for annual industrial robot installations, fuelled by a rapidly maturing manufacturing ecosystem and high-growth sectors like automotive and electronics.",
      source: "Sources: International Federation of Robotics (IFR) 2025/26 / Statista",
    },
    stats: [
      { value: "6th",    label: "Largest market for annual industrial robot installations" },
      { value: "$50.8B", label: "Expected global robotics market in 2025" },
    ],
  },
];

/* ── TechParadigm ────────────────────────────────────────────────── */
const TechParadigm = ({
  sectionTitle = "The New Tech Paradigm",
  slides = defaultSlides,
}) => {
  const isMobile = useIsMobile();
  return (
    <section className={styles.section}>
      <div className="container py-10 lg:py-20">
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>

        <div className={styles.swiperContainer}>
          <CustomSlider
            items={slides}
            slidesPerView={1}
            direction="vertical"
            mousewheel
            touchReleaseOnEdges
            speed={700}
            grabCursor={isMobile}
            sliderContainerStyle="tech-paradigm-swiper w-full h-full"
            
          >
            {(slide, i) => (

              /* Card */
              <div className={styles.card}>

                {/* Left — image */}
                <div className={styles.imageWrapper}>
                  <CustomImage
                    src={slide.image.src}
                    alt={slide.image.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    priority={i === 0}
                  />
                </div>

                {/* Right — content */}
                  <div className={styles.contentWrapper}>

                  {/* Title + description + source */}
                    <div className={styles.topContent}>
                      <h3 className={styles.topicTitle}>{slide.topic.title}</h3>
                      <p className={styles.description}>{slide.topic.description}</p>
                    {slide.topic.source && (
                        <p className={styles.source}>{slide.topic.source}</p>
                    )}
                  </div>

                  {/* Stats */}
                  {slide.stats?.length > 0 && (
                      <div className={styles.statsRow}>
                      {slide.stats.map((stat, j) => (
                        <React.Fragment key={j}>
                            <div className={styles.statItem}>
                              <p className={styles.statValue}>{stat.value}</p>
                              <p className={styles.statLabel}>{stat.label} <span className="block">{stat.sublabel}</span></p>
                          </div>
                          {j < slide.stats.length - 1 && (
                              <div className={styles.statDivider} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            )}
          </CustomSlider>
        </div>
      </div>
    </section>
  );
};

export default TechParadigm;
