"use client";
import React from "react";
import Layout from "@/components/molecules/layout";
import HeroBannerReh from "@/components/organisms/heroBannerReh";
import VideoCustom from "@/components/molecules/videoCustom";
import ProgramHighlightsReh from "@/components/organisms/programHighlightsReh";
import WhatsIncluded from "@/components/organisms/whatsIncluded";
import ComparisonReh from "@/components/organisms/comparisonReh";
import OverviewHighlightsReh from "@/components/organisms/overviewHighlightsReh";
import WhyChooseReh from "@/components/organisms/whyChooseReh";
import StayLocationReh from "@/components/organisms/stayLocationReh";
import WhatMealsReh from "@/components/organisms/whatMealsReh";
import PickupDropReh from "@/components/organisms/pickupDropReh";
import RoadmapReh from "@/components/organisms/roadmapReh";
import WhyAdventureMattersReh from "@/components/organisms/whyAdventureMattersReh";
import DosDontsReh from "@/components/organisms/dosDontsReh";
import useIsMobile from "@/lib/useIsMobile";

const RocksportExperientialHoliday = () => {
  const isMobile = useIsMobile();
  return (
    <Layout
      footerHide
      showButton
      headerStyle="bg-transparent fixed"
      navStyle="mt-8 !py-0"
      schoolNameStyle="bg-dark-300/40 p-2 rounded-lg md:rounded-xl"
    >
      <HeroBannerReh />
      <VideoCustom
        splitHeading
        sectionHeading={{
          title: "Your Gateway to Asia's Best Adventure",
          sub_title: "",
        }}
        description="Where young explorers discover courage, teamwork, and the thrill of real-world adventure—guided by expertise you can trust."
        bannerStyle="bg-image2"
        videoContainerStyle={isMobile ? "!mt-8" : ""}
      />
      <ProgramHighlightsReh />
      <WhatsIncluded />
      <StayLocationReh />
      <PickupDropReh />
      <WhatMealsReh />
      <ComparisonReh />
      <OverviewHighlightsReh />
      <WhyAdventureMattersReh />
      <WhyChooseReh />
      <RoadmapReh />
      <DosDontsReh />
    </Layout>
  );
};

export default RocksportExperientialHoliday;
