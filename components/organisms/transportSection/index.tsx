"use client";

import Icons from "@/components/atoms/icons";
import CustomImage from "@/components/molecules/customImage";
import type { TransportSection as TransportSectionType } from "@/types/adventure";

interface TransportSectionProps {
  section?: TransportSectionType;
  className?: string;
}

const BusIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2101_57268)">
      <path
        d="M4 17C4 17.5304 4.21071 18.0391 4.58579 18.4142C4.96086 18.7893 5.46957 19 6 19C6.53043 19 7.03914 18.7893 7.41421 18.4142C7.78929 18.0391 8 17.5304 8 17C8 16.4696 7.78929 15.9609 7.41421 15.5858C7.03914 15.2107 6.53043 15 6 15C5.46957 15 4.96086 15.2107 4.58579 15.5858C4.21071 15.9609 4 16.4696 4 17Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 17C16 17.5304 16.2107 18.0391 16.5858 18.4142C16.9609 18.7893 17.4696 19 18 19C18.5304 19 19.0391 18.7893 19.4142 18.4142C19.7893 18.0391 20 17.5304 20 17C20 16.4696 19.7893 15.9609 19.4142 15.5858C19.0391 15.2107 18.5304 15 18 15C17.4696 15 16.9609 15.2107 16.5858 15.5858C16.2107 15.9609 16 16.4696 16 17Z"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 17H2V6C2 5.73478 2.10536 5.48043 2.29289 5.29289C2.48043 5.10536 2.73478 5 3 5H17C18.3261 5 19.5979 5.7375 20.5355 7.05025C21.4732 8.36301 22 10.1435 22 12V17H20M16 17H8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5L17.5 12H22"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 10H17"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 5V10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 5V10"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2101_57268">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const TransportSection = ({
  section,
  className = "",
}: TransportSectionProps) => {
  const bgUrl =
    section?.background?.value ??
    section?.background?.feature_image_url?.[0] ??
    "";

  const title = section?.section_heading?.title ?? "Transport Details";
  const transportType = section?.transport_detail?.transport_type ?? "";
  const facilities = section?.transport_detail?.transport_facilities ?? "";

  if (!bgUrl && !transportType && !facilities) return null;

  return (
    <section className={`bg-image3 py-8 md:py-20 ${className}`}>
      <div className="container">
        <div className="relative h-[441px] md:h-[363px] rounded-3xl overflow-hidden">
          {bgUrl && (
            <CustomImage
              src={bgUrl}
              fill
              alt=""
              aria-hidden
              className="object-cover"
            />
          )}
          <div
            className="absolute md:inset-0 bottom-0 left-0 right-0 h-[347px] md:h-auto bg-[linear-gradient(-180deg,rgba(17,17,17,0)_0%,rgba(17,17,17,0.8)_100%)] md:bg-[linear-gradient(-90deg,rgba(17,17,17,0)_0%,rgba(17,17,17,0.8)_100%)] md:w-[548px]"
            aria-hidden
          />

          <div className="relative z-10 h-full flex flex-col justify-end md:justify-center p-6 md:p-10 lg:max-w-[592px]">
            <h2 className="text-white uppercase mb-6 md:mb-8">{title}</h2>

            <div className="rounded-xl border-2 border-white/40 bg-[#11111199] backdrop-blur-md p-5 md:py-5 md:px-4">
              {transportType && (
                <div className="flex items-center gap-3 text-white">
                  <BusIcon />
                  <p className="text-lg md:text-2xl leading-120">
                    <span className="font-semibold"></span>{" "}
                    <span className="capitalize">{transportType}</span>
                  </p>
                </div>
              )}
              <div className="border-b border-[#D9D9D933] my-4 md:my-6" />
              {facilities && (
                <div className="flex items-start gap-3 text-white">
                  <Icons.Facilities />
                  <div className="">
                    <p className="font-semibold text-xs md:text-lg leading-120">
                      Facilities:
                    </p>
                    <p className="capitalize text-white text-xs md:text-base font-normal leading-120 mt-1">
                      {facilities}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransportSection;
