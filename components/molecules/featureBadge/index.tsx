import React from "react";
import CustomImage from "../customImage";
import { cn } from "@/lib/utils";

interface BadgeItem {
  src: string;
  title: string;
}

interface FeatureBadgeProps {
  data: BadgeItem[];
  className?: string;
  heading?: string;
  badgeStyle?: string;
  gridStyle?: string;
  titleStyle?: string;
}

const FeatureBadge: React.FC<FeatureBadgeProps> = ({
  data,
  className,
  heading,
  badgeStyle,
  gridStyle,
  titleStyle,
}) => {
  return (
    <section className={cn(className)}>
      {heading && (
        <p className="text-2xl font-bold text-primary col-span-full mb-5">
          {heading}
        </p>
      )}
      <ul
        className={cn(
          "grid gap-x-3 gap-y-3 lg:gap-y-6",
          gridStyle || "grid-cols-2"
        )}
      >
        {data.map((item, index) => (
          <li
            key={index}
            className={cn(
              "bg-light rounded-lg py-2 px-2 lg:px-3 flex items-center gap-3 lg:gap-4 border border-light-50 h-16",
              badgeStyle
            )}
          >
            <figure className="size-8 lg:size-10 shrink-0">
              <CustomImage
                src={item.src}
                width={40}
                height={40}
                alt={item.title}
                className="responsive-image-contain"
              />
            </figure>
            <p
              className={cn(
                "text-sm lg:text-lg text-dark font-semibold line-clamp-2 text-ellipsis",
                titleStyle
              )}
            >
              {item.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeatureBadge;
