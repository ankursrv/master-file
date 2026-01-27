import { cn } from "@/lib/utils"

import styles from "./typographyStyle"

const Typography = ({
  variant = "h1",
  font = "primary",
  children,
  className,
  title,
  onClick,
}) => {
  const classes = {
    primary: {
      h1: styles.primaryTitle1,
      h2: styles.primaryTitle2,
      h3: styles.primaryTitle3,
      h4: styles.primaryTitle4,
      h5: styles.primaryTitle5,
      h6: styles.primaryTitle6,
      h7: styles.primaryTitle7,
    },
    secondary: {
      h1: styles.secondaryTitle1,
      h2: styles.secondaryTitle2,
      h3: styles.secondaryTitle3,
      h4: styles.secondaryTitle4,
      h5: styles.secondaryTitle5,
      h6: styles.secondaryTitle6,
    },
  }

  const Tag = variant

  const computedClass =
    variant === "p" ? styles.paragraph : classes[font]?.[variant]

  return (
    <Tag
      title={title}
      className={cn(computedClass, className)}
      onClick={onClick}
    >
      {children}
    </Tag>
  )
}

export default Typography
