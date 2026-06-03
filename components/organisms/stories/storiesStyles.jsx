const StoriesStyles = {
  section: "w-full bg-white py-10 lg:py-20",
  container: "container",
  
  headerWrapper: "mb-12 lg:mb-20",
  sectionTitle: "text-3xl lg:text-[48px] tracking-[-4%] leading-116 mb-4",
  sectionSubtitle: "text-base lg:text-[20px] leading-124 text-[#4D4D4D]",

  listWrapper: "flex flex-col",
  
  // Entire row is a group for hover effects
  cardRow: "group flex flex-col lg:flex-row items-start justify-between border-b-[0.4px] last:border-b-0 border-[#CCCCCC] py-6 lg:py-9 first:pt-0 cursor-pointer",
  
  // Left Column (Title & Author)
  colLeft: "w-full lg:w-[35%] pr-0 lg:pr-6 mb-4 lg:mb-0 flex flex-col justify-between",
  
  titleWrapper: "mb-6 lg:mb-8",
  
  // Multiline underline animation using background-size gradient with box-decoration-clone to ensure uniform thickness across all wrapped lines
  cardTitle: "text-xl lg:text-[24px] font-medium leading-[140%] inline bg-gradient-to-r from-black to-black bg-no-repeat bg-left-bottom bg-[length:0%_2px] group-hover:bg-[length:100%_2px] transition-[background-size] duration-500 ease-out box-decoration-clone",
  
  authorText: "text-base leading-[24px]",
  
  // Middle Column (Description)
  colMiddle: "w-full lg:w-[40%] pr-0 lg:pr-6 mb-6 lg:mb-0 self-start",
  description: "text-base text-[#666666] leading-[140%]",
  
  // Right Column (Image)
  colRight: "w-full lg:w-[25%] shrink-0",
  imageWrapper: "relative w-full lg:w-[310px] lg:h-[164px] overflow-hidden",
  
  // Image zoom animation: scale up on group hover
  image: "object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.08]",
};

export default StoriesStyles;
