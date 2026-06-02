import { Button } from "@/components/atoms/button";
import Icons from "@/components/atoms/icons";
import React from "react";

const Banner = () => {
  return (
    <div className="relative">
      <video autoPlay loop muted className="w-full h-screen object-cover">
        <source src="/images/home.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0, 0, 0, 0) 8.59%, #000000 132.71%)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end text-white pb-20">
        <small>In Focus</small>
        <h1 className="text-4xl lg:w-[869px] text-center text-[74px] leading-116 flex flex-col mx-auto">
          <span className="font-light">Some Inherit the Future.</span>
          <span className="font-normal italic">Others Design It.</span>
        </h1>
        <p>
          We shape those who build with emerging technologies at their core.
        </p>
        <div className="flex gap-4 mt-6">
          <Button variant="heroPrimary" iconPosition="right" icon={<Icons.arrowRightUp />}>
            Explore Programmes
          </Button>
          <Button variant="heroDark" iconPosition="right" icon={<Icons.arrowRightUp />}>
            About Jio University
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
