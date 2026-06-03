const TechParadigmStyles = {
  // ── Section ───────────────────────────────────────────────────────
  section:
    "w-full bg-hero-gradient",

  sectionTitle:
    "text-white text-3xl lg:text-[48px] tracking-[-4%] mb-12",

  // ── Swiper container — fixed height so vertical slides work ───────
  // height matches the card on each breakpoint
  swiperContainer:
    "w-full h-[580px]",

  // ── White Card (each slide) ───────────────────────────────────────
  card:
    "bg-white p-9 overflow-hidden flex flex-col lg:flex-row h-full select-none",

  // ── Left — Image ──────────────────────────────────────────────────
  imageWrapper:
    "relative w-full lg:w-[608px] h-full shrink-0",

  image:
    "absolute inset-0 w-full h-full object-cover object-center",

  // ── Right — Content ───────────────────────────────────────────────
  contentWrapper:
    "flex-1 flex flex-col overflow-hidden pl-6 lg:pl-11",

  topContent:
    "flex-1 overflow-auto",

  topicTitle:
    "text-lg lg:text-[28px] font-medium text-dreamless-sleep leading-124 mb-4",

  description:
    "lg:text-xl text-[#666666] leading-124 mb-4",

  source:
    "text-base italic text-[#666666] leading-124",

  // ── Stats Row ─────────────────────────────────────────────────────
  statsRow:
    "flex items-stretch shrink-0 gap-12",

  statItem:
    "",

  statDivider:
    "w-px bg-[#CCCCCC]",

  statValue:
    "text-3xl lg:text-[48px] font-medium text-[#5D0023] mb-3 leading-116",

  statLabel:
    "text-xs lg:text-[18px] text-[#666666] leading-[24px] tracking-[-2%] max-w-[245px]",
};

export default TechParadigmStyles;
