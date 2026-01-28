import React from "react"
import Header from "@/components/atoms/rocksport-b2b/header"
import SchoolProgram from "@/components/organisms/rocksport-b2b/schoolProgram"
import HeroBanner from "@/components/molecules/rocksport-b2b/heroBanner"
import AdventureSchedule from "@/components/organisms/rocksport-b2b/adventureSchedule"
import Faq from "@/components/organisms/rocksport-b2b/faq"
import VideoCustom from "@/components/atoms/rocksport-b2b/videoCustom"
import EssentialsSection from "@/components/molecules/rocksport-b2b/essentialsSection"
import GainSection from "@/components/organisms/rocksport-b2b/gainSection"

const Home = () => {
  return (
    <div>
      <Header />
      <HeroBanner />
      <SchoolProgram />
      <AdventureSchedule />
      <Faq />
      <VideoCustom />
      <EssentialsSection />
      <GainSection />
    </div>
  )
}

export default Home

