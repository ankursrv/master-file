import { cn } from "@/lib/utils";
import Illustration from "../illustration";

import styles from "./sectionTitleStyle";
import Typography from "@/components/molecules/typography/typography";

const SectionTitle = ({
  title,
  heading,
  headingColor,
  customClass,
  className,
  lineFull,
}) => {
  return (
    <div className={cn(styles.sectionTtlContainer, className)}>
      <Typography variant="p" className={cn(styles.sectionTitle)}>
        {title}
      </Typography>
      <Typography
        variant="h2"
        font="secondary"
        className={cn(
          styles.sectionHeading,
          headingColor ? "text-white" : "text-black"
        )}
      >
        {heading}
      </Typography>
      <div className={cn(styles.lineStyle, "hidden lg:block")}>
        {lineFull ? (
          <Illustration.TitleLine1
            className={cn(styles.svgLine, customClass)}
          />
        ) : (
          <Illustration.TitleLine2
            className={cn(styles.svgLine, customClass)}
          />
        )}
      </div>
      <div className={cn(styles.lineStyle, "lg:hidden")}>
        <Illustration.TitleLine1 className={cn(styles.svgLine, customClass)} />
      </div>
    </div>
  );
};

export default SectionTitle;
