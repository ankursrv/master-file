const AcademicLeadershipStyles = {
  section: "w-full bg-hero-gradient py-10 lg:py-20 overflow-hidden relative",
  container: "container",
  
  sectionTitle: "text-white text-3xl lg:text-[48px] tracking-[-4%] leading-116 mb-12",

  sliderContainer: "relative w-full",
  
  slideWrapper: "flex flex-col lg:flex-row items-stretch gap-8",
  
  // Left: Image
  imageWrapper: "relative md:w-[421px] h-[248px] md:h-[442px] bg-white",
  image: "object-cover h-full md:h-auto object-center",
  
  // Right: Content
  contentCol: "w-full lg:w-[827px] flex flex-col justify-between",
  
  topContent: "",
  
  quoteIcon: "text-white mb-6",
  quoteSvg: "w-10 h-10 lg:w-14 lg:h-14 fill-current",
  
  quoteText: "text-lg lg:text-[28px] text-white leading-124 tracking-[2%] font-light mb-10",
  
  authorName: "text-xl lg:text-[24px] font-medium leading-124 text-white mb-2",
  authorTitle: "text-base text-white leading-120",

  // Navigation Buttons positioned absolutely over the slider
  navWrapper: "mt-6 md:mt-0 md:absolute bottom-0 left-0 lg:left-[calc(421px+2rem)] flex items-center gap-4 z-10",
  navButton: "w-10 h-10 lg:w-16 lg:h-16 rounded-full border border-[#CCCCCC] flex items-center justify-center text-white hover:bg-white hover:text-[#700021] transition-colors cursor-pointer custom-nav-btn",
  navIcon: "w-5 h-5 stroke-current",
};

export default AcademicLeadershipStyles;
