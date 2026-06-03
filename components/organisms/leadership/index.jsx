"use client";

import React from "react";
import CustomImage from "@/components/molecules/customImage";
import S from "./leadershipStyles";

const defaultLeaders = [
  {
    quote:
      "We are integrating next-generation technologies to democratize access. Whether it is sports analytics or digital classrooms, technology is the great equalizer for the next generation of Indians.",
    name: "Smt. Nita Ambani",
    designation: "Founder Chairperson",
    image: {
      src: "/images/nita.png",
      alt: "Smt. Nita Ambani",
    },
  },
  {
    quote:
      "In the coming decades, no country in the world can match India's strength in demography, democracy, development, digital infrastructure, data generation, and AI harvest.",
    name: "Shri Mukesh Ambani",
    designation: "Chairman and Managing Director,",
    company: "Reliance Industries",
    image: {
      src: "/images/mukesh.png",
      alt: "Shri Mukesh Ambani",
    },
  },
];

/* ── Quote SVG Icon ──────────────────────────────────────────────── */
const QuoteIcon = () => (
  <div className={S.quoteIcon}>
    <svg
      width="52"
      height="42"
      viewBox="0 0 52 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={S.quoteSvg}
    >
      <path
        d="M39.7267 42C36.9275 42 34.4513 40.9272 32.2981 38.7816C30.1449 36.636 29.0683 33.4176 29.0683 29.1264C29.0683 22.9042 30.8447 17.1111 34.3975 11.7471C37.9503 6.38314 43.8178 2.46743 52 0V5.14943C48.7702 6.22222 46.0248 7.61686 43.764 9.33334C41.5031 11.0498 39.8344 12.9272 38.7578 14.9655C37.7888 17.0038 37.3044 18.9885 37.3044 20.9195C37.3044 22.0996 37.6812 23.0651 38.4348 23.8161C39.1884 24.567 40.1035 25.2644 41.1801 25.908C42.2567 26.4444 43.2795 27.0881 44.2485 27.8391C45.3251 28.4828 46.2402 29.341 46.9938 30.4138C47.7474 31.3793 48.1242 32.7203 48.1242 34.4368C48.1242 36.9042 47.2629 38.7816 45.5404 40.069C43.9255 41.3563 41.9876 42 39.7267 42ZM10.6584 42C7.85921 42 5.38302 40.9272 3.22981 38.7816C1.0766 36.636 0 33.4176 0 29.1264C0 22.9042 1.7764 17.1111 5.32919 11.7471C8.88199 6.38314 14.8033 2.46743 23.0932 0V5.14943C19.7557 6.22222 16.9565 7.61686 14.6957 9.33334C12.5424 11.0498 10.9275 12.9272 9.85093 14.9655C8.77433 17.0038 8.23603 18.9885 8.23603 20.9195C8.23603 22.0996 8.61284 23.0651 9.36646 23.8161C10.1201 24.567 11.0352 25.2644 12.1118 25.908C13.1884 26.4444 14.2112 27.0881 15.1801 27.8391C16.2567 28.4828 17.1718 29.341 17.9255 30.4138C18.6791 31.3793 19.0559 32.7203 19.0559 34.4368C19.0559 36.9042 18.2484 38.7816 16.6335 40.069C15.0186 41.3563 13.0269 42 10.6584 42Z"
        fill="#E30513"
      />
    </svg>
  </div>
);

/* ── Leadership Component ────────────────────────────────────────── */
const Leadership = ({
  sectionTitle = "Guided by Visionary Leaders",
  leaders = defaultLeaders,
}) => {
  return (
    <section className={S.section}>
      <div className={S.container}>
        {/* Header */}
        <h2 className={S.sectionTitle}>{sectionTitle}</h2>

        {/* 2-Column Grid */}
        <div className={S.grid}>
          {leaders.map((leader, i) => (
            <div key={i} className={S.column}>
              {/* Red Quote SVG */}
              <QuoteIcon />

              {/* Quote Text */}
              <p className={S.quoteText}>{leader.quote}</p>

              {/* Author Info */}
              <div className="flex">
                <div className={S.authorBlock}>
                  <h3 className={S.authorName}>{leader.name}</h3>
                  <p className={S.authorTitle}>{leader.designation} <span className="block">{leader.company}</span></p>
                </div>

                {/* Image with Dot Pattern (Absolute at bottom right) */}
                <div className={S.imageWrapper}>
                  <CustomImage
                    src={leader.image.src}
                    alt={leader.image.alt}
                    width={421}
                    height={485}
                    className={S.image}
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

export default Leadership;
