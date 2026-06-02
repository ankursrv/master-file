const BannerStyles = {
  // ── Wrapper ─────────────────────────────────────────────────────
  bannerWrapper:
    "relative w-full h-screen overflow-hidden",

  // ── Media (image / video) ────────────────────────────────────────
  bannerMedia:
    "absolute inset-0 w-full h-full object-cover object-top",

  // ── Gradient Overlay ─────────────────────────────────────────────
  bannerOverlay:
    "absolute inset-0 pointer-events-none z-[1]",

  // ── Text Content ─────────────────────────────────────────────────
  bannerContent:
    "absolute inset-0 z-[2] flex flex-col items-center justify-end text-center text-white pb-20 px-5 md:pb-24",

  // ── Label — "IN FOCUS" ───────────────────────────────────────────
  bannerLabel:
    "block text-sm font-bold uppercase text-white mb-6",

  // ── H1 Heading ───────────────────────────────────────────────────
  bannerHeading:
    "flex flex-col text-[74px] leading-116 max-w-[869px] mx-auto",

  headingLight:
    "font-light",

  headingItalic:
    "italic",

  // ── Subtext ──────────────────────────────────────────────────────
  bannerSubtext:
    "text-xl leading-124 text-white mt-4",

  // ── Tags Row  AI • QUANTUM COMPUTING • ROBOTICS ──────────────────
  bannerTags:
    "flex items-center justify-center flex-wrap gap-2 mt-5",

  bannerTag:
    "text-sm tracking-[4%] uppercase text-white leading-[150%]",

  tagDot:
    "size-1 rounded-full bg-white flex-shrink-0",

  // ── Buttons ──────────────────────────────────────────────────────
  bannerBtns:
    "flex items-center justify-center flex-wrap gap-4 mt-10",

  // ── Swiper slide ─────────────────────────────────────────────────
  bannerSlider:
    "!w-full !h-full",

  bannerSlide:
    "relative w-full h-screen overflow-hidden",
};

export default BannerStyles;
