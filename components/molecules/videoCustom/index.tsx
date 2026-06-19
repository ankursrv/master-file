"use client";

import { useRef, useState, FC } from "react";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";
import SectionTitle from "../sectionTitle";
import type { SchoolVideoSection } from "@/types/adventure";

interface VideoCustomProps {
  // API-driven
  sectionHeading?: SchoolVideoSection["section_heading"];
  poster?: string;
  src?: string;
  // Style overrides
  height?: number;
  width?: number;
  videoContainerStyle?: string;
  bannerStyle?: string;
  // Layout: render the title on the left and description on the right
  splitHeading?: boolean;
  description?: string;
}

const VideoCustom: FC<VideoCustomProps> = ({
  sectionHeading,
  poster,
  src,
  height,
  width,
  videoContainerStyle,
  bannerStyle,
  splitHeading,
  description,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const title = sectionHeading?.title ?? "School video";
  const subTitle = sectionHeading?.sub_title ?? "Watch";

  const handlePlayPause = (): void => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className={cn("bg-image py-8 md:py-20 relative", bannerStyle)}>
      <div className="container">
        {splitHeading ? (
          <div className="flex flex-col gap-4 sm:gap-0 md:flex-row md:items-start md:justify-between">
            <h2 className="text-dark! md:text-[28px]! xl:text-[45px]! uppercase lg:w-[424px] xl:w-[700px]">
              {title}
            </h2>
            {description && (
              <p className="text-dark-300 leading-150 lg:w-[500px] xl:w-[495px] md:text-xl">
                {description}
              </p>
            )}
          </div>
        ) : (
          <SectionTitle
            title={title}
            heading={subTitle}
            customClass="w-[211px] md:w-[462px]"
            className="md:w-3xl md:px-10 mx-auto"
          />
        )}

        <div
          className={cn(
            "z-40 flex mt-11 md:mt-15 items-center justify-center h-[187px] md:h-[434px] lg:h-[634px] rounded-sm md:rounded-2xl overflow-hidden relative shadow-shadowPrimary",
            !isPlaying ? "video-overlay" : "",
            videoContainerStyle
          )}
        >
          <video
            ref={videoRef}
            className="h-full w-full object-cover absolute"
            width={width}
            height={height}
            poster={
              poster ??
              "https://images.unsplash.com/photo-1621414050946-1b936a78491f?q=80&w=2073&auto=format&fit=crop"
            }
          >
            <source src={src ?? "/images/video/video.mp4"} />
            Your browser does not support the video tag...
          </video>

          {!isPlaying ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                aria-label="Play Video"
                className="w-15 lg:w-[132px] relative z-20"
                onClick={handlePlayPause}
              >
                <Icons.PlayIcon className="w-full h-full" size={132} />
              </button>
              <svg
                className="rotatingText"
                viewBox="0 0 200 200"
                width="138"
                height="138"
              >
                <defs>
                  <path
                    id="circle"
                    d="M 100, 100 m -75, 0 a 75, 75 0 1, 0 150, 0 a 75, 75 0 1, 0 -150, 0"
                  />
                </defs>
                <text className="circle-text text-shadow-soft1">
                  <textPath href="#circle">
                    <tspan className="highlights">The</tspan> Super Feel &nbsp;
                    <tspan className="highlights">The</tspan> Super Feel
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button onClick={handlePlayPause}>
                <Icons.PauseIcon />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoCustom;
