"use client";

import React from "react";
import CustomImage from "@/components/molecules/customImage";
import CustomSlider from "@/components/organisms/customSlider";
import styles from "./academicLeadershipStyles";

const defaultSlides = [
  {
    quote:
      "India has the opportunity to be an architect of emerging technology, not just an adopter. Jio University campus is designed as a live test bed for frontier research addressing real-world challenges.",
    name: "Dr. Shailesh Kumar",
    designation: "Dean, School of Engineering & Computing",
    image: { src: "/images/faculty.png", alt: "Dr. Shailesh Kumar" },
  },
  {
    quote:
      "When you're building a system, it's not just enough to focus on the technology - you have to focus also on the people who will use that technology.",
    name: "Dr. Larry Birnbaum",
    designation: "Professor of Computer Science, Northwestern University, USA",
    image: { src: "/images/popup-faculti-img1.png", alt: "Dr. Larry Birnbaum" },
  },
  {
    quote:
      "Artificial intelligence is not the future of any one industry. It is the present condition of all of them. Every researcher in our labs, every student in our classrooms, every partnership we build, all of it is driven by the same conviction: that the people who understand AI deeply will shape what comes next.",
    name: "Dr. Sudipta Roy",
    designation: "Associate Professor, Jio University",
    image: { src: "/images/shailes.png", alt: "Dr. Sudipta Roy" },
  },
];

/* ── Quote SVG Icon ──────────────────────────────────────────────── */
const QuoteIcon = () => (
  <div className={styles.quoteIcon}>
    <svg
      width="52"
      height="42"
      viewBox="0 0 52 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_8680_1197)">
        <path
          d="M39.7267 42C36.9275 42 34.4513 40.9272 32.2981 38.7816C30.1449 36.636 29.0683 33.4176 29.0683 29.1264C29.0683 22.9042 30.8447 17.1111 34.3975 11.7471C37.9503 6.38314 43.8178 2.46743 52 0V5.14943C48.7702 6.22222 46.0248 7.61686 43.764 9.33334C41.5031 11.0498 39.8344 12.9272 38.7578 14.9655C37.7888 17.0038 37.3044 18.9885 37.3044 20.9195C37.3044 22.0996 37.6812 23.0651 38.4348 23.8161C39.1884 24.567 40.1035 25.2644 41.1801 25.908C42.2567 26.4444 43.2795 27.0881 44.2485 27.8391C45.3251 28.4828 46.2402 29.341 46.9938 30.4138C47.7474 31.3793 48.1242 32.7203 48.1242 34.4368C48.1242 36.9042 47.2629 38.7816 45.5404 40.069C43.9255 41.3563 41.9876 42 39.7267 42ZM10.6584 42C7.85921 42 5.38302 40.9272 3.22981 38.7816C1.0766 36.636 0 33.4176 0 29.1264C0 22.9042 1.7764 17.1111 5.32919 11.7471C8.88199 6.38314 14.8033 2.46743 23.0932 0V5.14943C19.7557 6.22222 16.9565 7.61686 14.6957 9.33334C12.5424 11.0498 10.9275 12.9272 9.85093 14.9655C8.77433 17.0038 8.23603 18.9885 8.23603 20.9195C8.23603 22.0996 8.61284 23.0651 9.36646 23.8161C10.1201 24.567 11.0352 25.2644 12.1118 25.908C13.1884 26.4444 14.2112 27.0881 15.1801 27.8391C16.2567 28.4828 17.1718 29.341 17.9255 30.4138C18.6791 31.3793 19.0559 32.7203 19.0559 34.4368C19.0559 36.9042 18.2484 38.7816 16.6335 40.069C15.0186 41.3563 13.0269 42 10.6584 42Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_8680_1197">
          <rect width="52" height="42" fill="white" />
        </clipPath>
      </defs>
    </svg>
  </div>
);

const AcademicLeadership = ({
  sectionTitle = "Voices of Academic Leadership",
  slides = defaultSlides,
}) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{sectionTitle}</h2>

        <div className={styles.sliderContainer}>
          <CustomSlider
            items={slides}
            slidesPerView={1}
            speed={700}
            loop={true}
            navigation={{
              prevEl: ".academic-prev",
              nextEl: ".academic-next",
            }}
          >
            {(slide, i) => (
              <div className={styles.slideWrapper}>
                {/* Left: Image */}
                <div className={styles.imageWrapper}>
                  <CustomImage
                    src={slide.image.src}
                    alt={slide.image.alt}
                    width={421}
                    height={442}
                    className={styles.image}
                  />
                </div>

                {/* Right: Content */}
                <div className={styles.contentCol}>
                  <div className={styles.topContent}>
                    <QuoteIcon />
                    <p className={styles.quoteText}>{slide.quote}</p>
                    <h3 className={styles.authorName}>{slide.name}</h3>
                    <p className={styles.authorTitle}>{slide.designation}</p>
                  </div>

                  {/* Spacer for navigation buttons which are absolute */}
                  {/* <div className="h-16 lg:h-0"></div> */}
                </div>
              </div>
            )}
          </CustomSlider>

          {/* Navigation Buttons (Static & Absolute) */}
          <div className={styles.navWrapper}>
            {/* Prev */}
            <div className={`academic-prev ${styles.navButton}`}>
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
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {/* Next */}
            <div className={`academic-next ${styles.navButton}`}>
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
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicLeadership;
