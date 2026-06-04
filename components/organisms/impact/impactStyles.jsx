const ImpactStyles = {
  // Section with overflow-x-clip to prevent horizontal page scrolling while allowing right bleed
  section: "w-full bg-[#FFFFFF] py-10 lg:py-20 overflow-x-clip",
  container: "container",
  
  // Header and Navigation
  headerWrapper: "flex flex-col md:flex-row md:items-center justify-between mb-10 lg:mb-12",
  sectionTitle: "text-3xl lg:text-[48px] tracking-[-4%] leading-116",
  
  navWrapper: "flex items-center gap-4",
  navButton: "w-10 h-10 lg:w-16 lg:h-16 rounded-full border border-[#CCCCCC] flex items-center justify-center text-gray-700 hover:border-black hover:bg-black hover:text-white transition-all cursor-pointer impact-nav-btn",
  navIcon: "w-4 h-4 lg:w-5 lg:h-5 stroke-current",

  // Slider and Slides
  sliderContainer: "w-full",
  
  // Slide width matches exactly what the user requested for the image container (w-421).
  // Margin removed; spacing is now handled by Swiper's spaceBetween prop.
  slide: "w-[300px] lg:w-[421px] !h-auto",

  // Card Content
  card: "flex flex-col w-full group",
  imageWrapper: "relative w-full h-[240px] lg:h-[328px] overflow-hidden mb-6",
  image: "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105",
  
  authorName: "text-base text-[#4D4D4D] mb-2 font-medium leading-124",
  titleWrapper: "mb-2",
  cardTitle: "text-xl lg:text-[24px] font-medium leading-124 inline bg-gradient-to-r from-black to-black bg-no-repeat bg-left-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-500 ease-out box-decoration-clone",
  description: "text-base text-[#666666] leading-124 mb-6 line-clamp-2",
  
  // Link
  link: "text-theme-primary w-fit text-sm lg:text-[18px] leading-[27px] flex items-center gap-2 cursor-pointer inline bg-gradient-to-r from-theme-primary to-theme-primary bg-no-repeat bg-left-bottom bg-[length:0%_2px] hover:bg-[length:100%_2px] transition-[background-size] duration-500 ease-out box-decoration-clone",
  linkIcon: "size-6",
};

export default ImpactStyles;
