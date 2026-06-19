import { cn } from "@/lib/utils";
import Link from "next/link";

import styles from "./footerStyle";
import CustomImage from "../customImage";
import { Button } from "@/components/atoms/button";
import CustomInput from "../customInput";
import Icons from "@/components/atoms/icons";

interface FooterProps {
  footerContainerStyle?: string;
}

const socialLink = [
  {
    href: "facebook",
    icon: "/images/footer/facebook.svg",
  },
  {
    href: "twitter",
    icon: "/images/footer/twitter.svg",
  },
  {
    href: "insta",
    icon: "/images/footer/insta.svg",
  },
  {
    href: "linkedin",
    icon: "/images/footer/linkedin.svg",
  },
];

const Footer = ({ footerContainerStyle }: FooterProps) => {
  return (
    <footer className={cn(styles.footerContainer, footerContainerStyle)}>
      <div className={cn(styles.footer)}>
        <div className={cn(styles.logoContainer)}>
          <Link href="#" className={cn(styles.logo)}>
            <CustomImage
              src="/images/footer/footer-logo.svg"
              alt="not found"
              width={195}
              height={47}
              className={cn(styles.logoImg)}
            />
          </Link>
          <article className={cn(styles.newsletterText)}>Newsletter</article>
          <CustomInput
            icon={<Icons.Mail />}
            variant="inputStyle4"
            placeholder="Enter Your Email"
          />
          <Button variant="fillPrimary" className="mt-4">
            Subscribe
          </Button>
        </div>
        <div className={cn(styles.listCommonStyle)}>
          <h6 className={cn(styles.footerHeading)}>Company</h6>
          <ul className={cn(styles.footerListItem)}>
            <li>
              <Link href="#">About Us</Link>
            </li>
            <li>
              <Link href="#">Community Blog</Link>
            </li>
            <li>
              <Link href="#">Jobs & Careers</Link>
            </li>
            <li>
              <Link href="#">Contact Us</Link>
            </li>
            <li>
              <Link href="#">Our Awards</Link>
            </li>
          </ul>
        </div>
        <div className={cn(styles.listCommonStyle)}>
          <h6 className={cn(styles.footerHeading)}>Activities</h6>
          <ul className={cn(styles.footerListItem)}>
            <li>
              <Link href="#">Camping</Link>
            </li>
            <li>
              <Link href="#">Trekking</Link>
            </li>
            <li>
              <Link href="#">Zipline</Link>
            </li>
            <li>
              <Link href="#">Paragliding</Link>
            </li>
            <li>
              <Link href="#">View All</Link>
            </li>
          </ul>
        </div>
        <div className={cn(styles.listCommonStyle)}>
          <h6 className={cn(styles.footerHeading)}>Legal</h6>
          <ul className={cn(styles.footerListItem)}>
            <li>
              <Link href="#">Terms and Service</Link>
            </li>
            <li>
              <Link href="#">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#">Cookies Policy</Link>
            </li>
            <li>
              <Link href="#">Data Processing</Link>
            </li>
            <li>
              <Link href="#">Data Policy</Link>
            </li>
          </ul>
        </div>
        <div className={cn(styles.listCommonStyle)}>
          <h6 className={cn(styles.footerHeading)}>Support</h6>
          <ul className={cn(styles.footerListItem)}>
            <li>
              <Link href="#">Forum support</Link>
            </li>
            <li>
              <Link href="#">Help Center</Link>
            </li>
            <li>
              <Link href="#">How it works</Link>
            </li>
            <li>
              <Link href="#">Security</Link>
            </li>
          </ul>
        </div>
      </div>
      {/* Social Link  */}
      <div className={cn(styles.footerBottomContainer)}>
        <div className={cn(styles.footerBottom)}>
          <p className={cn(styles.copyrightText)}>
            &#169;Copyright Rocksport. All Rights Reserved
          </p>
          <ul className={cn(styles.footerBottomListItems)}>
            {socialLink.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <CustomImage
                    src={item.icon}
                    alt="facebook"
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
