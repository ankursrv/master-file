import CustomImage from "@/components/molecules/customImage"
import Typography from "@/components/molecules/typography/typography"
import { cn } from "@/lib/utils"
import React from "react"
import styles from "./gridCardStyle"

const BaseCard = ({
  children,
  src,
  imageStyle,
  alt,
  contentStyle,
  cardVariantStyle = "primary",
  imageContainerStyle,
}) => {

  const cardVariantStyles = {
    primary: styles.primary,
    secondary: styles.secondary,
  }
  return (
    <div
      className={cn(
        "border rounded-xl",
        cardVariantStyles[cardVariantStyle]
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full",
          imageContainerStyle ? imageContainerStyle : "size-[72px] bg-sea-nettle"
        )}
      >
        <CustomImage
          src={src}
          width={45}
          height={45}
          alt={alt}
          className={cn(imageStyle ? imageStyle : "size-9")}
        />
      </div>
      <div className={contentStyle}>
        {children}
      </div>
    </div>
  )
}

const ValueCard = ({
  title,
  description,
  ...props
}) => (
  <BaseCard {...props}>
    <Typography variant="h4" className="mt-6">
      {title}
    </Typography>
    <Typography variant="p" className="text-dark-tone-ink/80 font-normal mt-5">
      {description}
    </Typography>
  </BaseCard>
)

const SafetyCard = ({
  title,
  description,
  ...props
}) => (
  <BaseCard {...props}>
    <Typography variant="h4">
      {title}
    </Typography>
    <Typography variant="p" className="text-dark-tone-ink/80 font-normal mt-3">
      {description}
    </Typography>
  </BaseCard>
)

const GridCard = ({ variant = "valueCard", ...props }) => {
  switch (variant) {
    case "valueCard":
      return <ValueCard {...props} />
    case "safetyCard":
      return <SafetyCard {...props} />
    default:
      return null
  }
}
export default GridCard
