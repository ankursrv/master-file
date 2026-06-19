import React from "react";
import Header from "../header";
import Footer from "../footer";
import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";

interface LayoutProps {
  mainContainerStyle?: string;
  children: React.ReactNode;
  showButton?: boolean;
  footerHide?: boolean;
  // Header API props
  schoolName?: string;
  schoolBranch?: string;
  schoolLogo?: string;
  rocksportLogo?: string;
  headerStyle?: string;
  navStyle?: string;
  schoolNameStyle?: string;
}

const Layout = ({
  mainContainerStyle,
  children,
  showButton,
  footerHide,
  schoolName,
  schoolBranch,
  schoolLogo,
  rocksportLogo,
  headerStyle,
  navStyle,
  schoolNameStyle,
}: LayoutProps) => {
  return (
    <div className="layout-style">
      <Header
        schoolName={schoolName}
        schoolBranch={schoolBranch}
        schoolLogo={schoolLogo}
        rocksportLogo={rocksportLogo}
        headerStyle={headerStyle}
        navStyle={navStyle}
        schoolNameStyle={schoolNameStyle}
      />
      <main className={mainContainerStyle}>{children}</main>
      {!showButton && (
        <Button
          variant="fillPrimary"
          icon={<Icons.CalenderIcon className="size-7" />}
          iconPosition="left"
          className="fixed bottom-1/2 z-40 right-10"
        >
          Book Now
        </Button>
      )}
      {!footerHide && <Footer footerContainerStyle={cn("")} />}
    </div>
  );
};

export default Layout;
