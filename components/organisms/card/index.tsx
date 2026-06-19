"use client";
import React from "react";
import styles from "./cardStyle";
import { cn } from "@/lib/utils";
import CustomImage from "@/components/molecules/customImage";
import Icons from "@/components/atoms/icons";

export interface BaseCardProps {
  variant?: string;
  image?: string;
  style?: React.CSSProperties;
  imageStyle?: string;
  responsiveImage?: boolean;
  cardContainerStyle?: string;
  imageContainerStyle?: string;
  children?: React.ReactNode;
  shadowNone?: boolean;
  alt?: string;
  rounded?: string;
  width?: number;
  height?: number;
}

const BaseCard: React.FC<BaseCardProps> = ({
  image,
  imageStyle,
  responsiveImage,
  cardContainerStyle = "bg-white",
  imageContainerStyle,
  children,
  shadowNone,
  width = 2000,
  height = 2000,
  alt = "Card image",
}) => {
  return (
    <div
      className={cn(
        styles.cardContainer,
        cardContainerStyle,
        !shadowNone && "shadow-[0px_4px_28px_0px_#1212121A]"
      )}
    >
      {/* Image Section */}
      {image && (
        <div
          className={cn(
            !imageContainerStyle
              ? "h-[160px] md:h-[293px]"
              : imageContainerStyle
          )}
        >
          <CustomImage
            src={image}
            alt={alt}
            width={width}
            height={height}
            className={cn(
              imageStyle,
              !responsiveImage
                ? "responsive-image-cover"
                : "responsive-image-contain"
            )}
          />
        </div>
      )}
      {children}
    </div>
  );
};

export interface ComparisonCardProps extends BaseCardProps {
  title?: string;
  description?: string;
  subTitle?: string;
  listItem?: string[];
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({
  title,
  description,
  listItem,
  subTitle,
  ...props
}) => (
  <BaseCard {...props}>
    <div className={styles.comparisonCardBody}>
      <p className={styles.comparisonTitle}>{title}</p>
      <p className={styles.comparisonDescription}>{description}</p>
      <ul className={styles.comparisonListWrapper}>
        {listItem?.map((item, index) => (
          <li key={index} className="flex items-center gap-4">
            <Icons.CircleCheckTheme />
            <p className="text-lg font-bold text-dark">{item}</p>
          </li>
        ))}
      </ul>
      <p className={styles.comparisonSubTitle}>{subTitle}</p>
    </div>
    <CustomImage
      src="/images/ellipse.png"
      width={134}
      height={188}
      alt=""
      className="hidden md:block absolute bottom-0 right-0"
      aria-hidden="true"
    />
  </BaseCard>
);

export interface GainCardProps extends BaseCardProps {
  title?: string;
  description?: string;
  titleStyle?: string;
}

const GainCard: React.FC<GainCardProps> = ({
  title,
  description,
  titleStyle,
  ...props
}) => (
  <BaseCard {...props}>
    <h4 className={cn(styles.gainTitle, titleStyle)}>{title}</h4>
    {description && <p className={styles.gainDescription}>{description}</p>}
  </BaseCard>
);
export interface SafetyCardProps extends BaseCardProps {
  title?: string;
  description?: string;
}

const SafetyCard: React.FC<SafetyCardProps> = ({
  title,
  description,
  ...props
}) => (
  <BaseCard {...props}>
    <div>
      <p className="md:text-xl text-dark font-semibold">{title}</p>
      <p className="text-dark/80 text-sm md:text-base leading-140 pt-3">
        {description}
      </p>
    </div>
  </BaseCard>
);

export type CardProps =
  | ({ variant: "comparisonCard" } & ComparisonCardProps)
  | ({ variant: "gainCard" } & GainCardProps)
  | ({ variant: "safetyCard" } & SafetyCardProps)
  | ({ variant?: string } & BaseCardProps);

const Card: React.FC<CardProps> = (props) => {
  switch (props.variant) {
    case "comparisonCard":
      return <ComparisonCard {...(props as ComparisonCardProps)} />;
    case "gainCard":
      return <GainCard {...(props as GainCardProps)} />;
    case "safetyCard":
      return <SafetyCard {...(props as SafetyCardProps)} />;

    default:
      return <BaseCard {...props} />;
  }
};

export default Card;
