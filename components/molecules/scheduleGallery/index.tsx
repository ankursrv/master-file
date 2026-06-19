import { KeyboardEvent } from "react";
import CustomImage from "../customImage";
import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import useIsMobile from "@/lib/useIsMobile";

interface ImageItem {
  image: string;
}

interface ScheduleGalleryProps {
  images: ImageItem[];
  maxVisible?: number;
  onOpenDialog?: () => void;
  variant?: "ris" | "rdo";
}

const ScheduleGallery = ({
  images,
  maxVisible = 3,
  onOpenDialog,
  variant = "ris",
}: ScheduleGalleryProps) => {
  const visibleImages = images.slice(0, maxVisible);
  const remaining = images.length - maxVisible;
  const isMobile = useIsMobile();

  const handleOverlayClick = () => {
    onOpenDialog?.();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleOverlayClick();
    }
  };

  return (
    <section>
      {variant === "rdo" && (
        <p className="text-2xl font-bold text-primary col-span-full mb-5">
          About the Park
        </p>
      )}
      <div className={variant === "rdo" ? "gallery-rdo" : "gallery"}>
        {visibleImages.map((img, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-sm md:rounded-xl ${
              variant === "rdo" ? "imageBox-rdo" : "imageBox"
            }`}
          >
            <CustomImage
              src={img.image}
              width={600}
              height={400}
              alt={`rocksport adventure schedule image ${index + 1}`}
              className="responsive-image-cover"
            />

            {index === maxVisible - 1 && remaining > 0 && (
              <div
                role="button"
                tabIndex={0}
                aria-label={`View ${remaining} more images`}
                className="flex-center absolute inset-0 bg-black/60 font-bold text-white text-lg md:text-4xl cursor-pointer hover:bg-black/70 transition-colors"
                onClick={handleOverlayClick}
                onKeyDown={handleKeyDown}
              >
                +{remaining}
              </div>
            )}
          </div>
        ))}
      </div>
      {variant === "rdo" && (
        <>
          <p className="text-xl text-white font-bold leading-140 mt-8 lg:mt-6 pb-3 border-b border-white/10">
            Rocksport Experience Park, Bangalore Adventure picnic
          </p>
          <figure className="flex items-start gap-3 mt-3 mb-8">
            <CustomImage
              src="/images/location.png"
              width={48}
              height={48}
              alt=""
              aria-hidden="true"
              className="size-6 md:size-12"
            />
            <figcaption className="text-sm md:text-base text-white/80 leading-150">
              Rocksport Bengaluru, Kanakapura Main Rd, near Bolare post,
              Ashwathkatte, Nettigere Village, Bengaluru, Karnataka 560116
            </figcaption>
          </figure>
          <Button
            variant="fillPrimary"
            size={isMobile ? "wFull" : undefined}
            icon={<Icons.arrowRight />}
            className="w-[230px]"
            childStyle="mx-auto"
          >
            Get Directions
          </Button>
        </>
      )}
    </section>
  );
};

export default ScheduleGallery;
