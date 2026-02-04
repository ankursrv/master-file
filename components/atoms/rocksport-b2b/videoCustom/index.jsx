"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import styles from "./videoStyles";
import Icons from "../../icons";
import CustomImage from "@/components/molecules/customImage";

const VideoCustom = ({
  poster,
  src,
  height,
  width,
  videoContainerStyle,
  bannerStyle,
}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className={cn(styles.container, bannerStyle)}>
      <div className="container">
        <div
          className={cn(
            styles.wrapper,
            !isPlaying ? "video-overlay" : "",
            videoContainerStyle
          )}
        >
          <video
            ref={videoRef}
            className={styles.video}
            width={width}
            height={height}
            poster={
              poster
                ? poster
                : "https://images.unsplash.com/photo-1621414050946-1b936a78491f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          >
            <source src={src ? src : "/images/rocksport-b2b-images/video.mp4"} />
            Your browser does not support the video tag...
          </video>

          {!isPlaying ? (
            <div className={styles.playPauseButton}>
              <button className={styles.button} onClick={handlePlayPause}>
                <Icons.PlayIcon />
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
                    d="M 100, 100   m -75, 0   a 75, 75 0 1, 0 150, 0   a 75, 75 0 1, 0 -150, 0"
                  />
                </defs>
                <text className="circle-text">
                  <textPath href="#circle">
                    <tspan className="highlights">The</tspan> Super Feel
                    &nbsp;
                    <tspan className="highlights">The</tspan> Super Feel
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </textPath>
                </text>
              </svg>
            </div>
          ) : (
            <div className={styles.playPauseIconWrapper}>
              <button onClick={handlePlayPause}>
                <Icons.PauseIcon />
              </button>
            </div>
          )}
        </div>
      </div>
      <CustomImage
        src="images/rocksport-b2b-images/line1.svg"
        width={1000}
        height={1000}
        alt="decorative line"
        className="hidden lg:block absolute -top-[65px] left-0 w-[245px] h-auto"
      />
      <CustomImage
        src="images/rocksport-b2b-images/line2.svg"
        width={1000}
        height={1000}
        alt="decorative line"
        className="hidden lg:block absolute -top-[12rem] right-0 w-[221px] h-auto"
      />
    </section>
  );
};

export default VideoCustom;
