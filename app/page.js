import Banner from '@/components/molecules/banner'
import TechParadigm from "@/components/organisms/techParadigm";
import Leadership from "@/components/organisms/leadership";
import Stories from "@/components/organisms/stories";
import AcademicLeadership from "@/components/organisms/academicLeadership";
import React from 'react'
import Impact from "@/components/organisms/impact";

/* ─── Slide Data ─────────────────────────────────────────────── */
const bannerSlides = [
  {
    mediaType: "video",
    mediaSrc: "/images/home.mp4",
    label: "In Focus",
    heading: {
      light: "Some Inherit the Future.",
      italic: "Others Design It.",
    },
    subtext:
      "We shape those who build with emerging technologies at their core.",
    tags: ["AI", "Quantum Computing", "Robotics"],
    buttons: [
      { label: "Explore Programmes", variant: "heroPrimary" },
      { label: "About Jio University", variant: "heroDark" },
    ],
  },
  // ── Add more slides like this ─────────────────────────────────
  // {
  //   mediaType: "image",
  //   mediaSrc: "/images/slide2.jpg",
  //   label: "Innovation",
  //   heading: "Build The World Of Tomorrow.",
  //   subtext: "Leading research at the frontier of science and technology.",
  //   tags: ["Research", "Deep Tech", "Sustainability"],
  //   buttons: [
  //     { label: "Know More", variant: "heroPrimary" },
  //   ],
  // },
];

const Home = () => {
  return (
    <main>
      <Banner slides={bannerSlides} autoplay autoplayDelay={5000} />
      <TechParadigm />
      <Leadership />
      <Stories />
      <AcademicLeadership />
      <Impact />
    </main>
  )
}

export default Home
