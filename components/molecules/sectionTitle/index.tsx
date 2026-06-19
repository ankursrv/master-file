import Illustration from "@/components/atoms/illustration";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  heading: string;
  headingColor?: boolean;
  customClass?: string;
  className?: string;
  lineFull?: boolean;
}

const SectionTitle = ({
  title,
  heading,
  headingColor,
  customClass,
  className,
  lineFull,
}: SectionTitleProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <p className="font-semibold text-primary md:text-2xl text-base leading-none!">
        {title}
      </p>
      <h2
        className={cn(
          "mt-2 md:mt-4",
          headingColor ? "text-white!" : "text-dark!"
        )}
      >
        {heading}
      </h2>
      <div className="hidden lg:block">
        {lineFull ? (
          <Illustration.TitleLine1 className={cn("mx-auto", customClass)} />
        ) : (
          <Illustration.TitleLine2 className={cn("mx-auto", customClass)} />
        )}
      </div>
      <div className="lg:hidden">
        <Illustration.TitleLine1 className={cn("mx-auto", customClass)} />
      </div>
    </div>
  );
};

export default SectionTitle;
