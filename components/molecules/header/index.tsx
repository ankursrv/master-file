import CustomImage from "@/components/molecules/customImage";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface HeaderProps {
  schoolName?: string;
  schoolBranch?: string;
  schoolLogo?: string;
  rocksportLogo?: string;
  headerStyle?: string;
  navStyle?: string;
  schoolNameStyle?: string;
}

const Header = ({
  schoolName,
  schoolBranch,
  schoolLogo,
  rocksportLogo,
  headerStyle,
  navStyle,
  schoolNameStyle,
}: HeaderProps) => {
  return (
    <header
      className={cn(
        "top-0 left-0 right-0 z-50",
        !headerStyle?.includes("fixed") && "sticky",
        !headerStyle?.includes("bg-transparent") && "bg-secondary",
        headerStyle
      )}
    >
      <nav
        className={cn(
          "container flex items-center justify-between py-2.5 md:h-20",
          navStyle
        )}
      >
        <Link href="#" className="w-9 md:w-[58px]">
          <CustomImage
            src={rocksportLogo ?? "/images/header/header-logo.png"}
            width={58}
            height={43}
            alt="Rocksport Logo"
            className="responsive-image-contain"
          />
        </Link>
        <div
          className={cn("flex items-center gap-4 md:gap-7", schoolNameStyle)}
        >
          <p className="inline-block text-sm md:text-2xl text-white font-semibold">
            {schoolName ?? "Meerut Public School"}
            <span className="block text-end text-xs md:text-base">
              {schoolBranch ?? "Main Wing"}
            </span>
          </p>
          <figure className="size-8 md:size-14 rounded-full overflow-hidden">
            <CustomImage
              src={schoolLogo ?? "/images/header/school-logo.png"}
              width={56}
              height={56}
              alt="School Logo"
              className="responsive-image-cover"
            />
          </figure>
        </div>
      </nav>
    </header>
  );
};

export default Header;
