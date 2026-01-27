"use client"
import { useState } from "react";
import Card from "@/components/organisms/card";
import DialogBox from "@/components/organisms/dialogBox";
import Wishlist from "@/components/atoms/wishlist";
import Location from "@/components/atoms/location";
import VerifiedBadge from "@/components/atoms/verifiedBadge";
import useIsMobile from "@/lib/useIsMobile";
import Typography from "@/components/molecules/typography/typography";
import CustomAccordion from "@/components/molecules/disclosure";

const cardData = [
  {
    image: "/images/card/card-img1.jpeg",
    title: "Bear Grylls Survival Program-Program Survival-5 Pm to 10 Pm",
    city: "Chennai",
    day: "5D",
    price: "1,000",
  },
  {
    image: "https://images.unsplash.com/photo-1761839257287-3030c9300ece?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A card is identifiable as a single, contained unit.",
    city: "Kolkata",
  },
  {
    image: "https://images.unsplash.com/photo-1763321402439-41eb2a0c7e7b?q=80&w=696&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A card is identifiable as a single"
  },
  {
    image: "https://images.unsplash.com/photo-1763132638674-673e0ae020d6?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "A card can stand alone, without relying on surrounding elements for context."
  },
]

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenTwo, setIsOpenTwo] = useState(false)
  const isMobile = useIsMobile ()
  return (
    <div className="container">
      <Wishlist position="top-left" />
      <Location
        city="Delhi"
        day="2D"
      />
      <VerifiedBadge
        verified="Verified"
        className="top-20 relative left-20 rounded-tl-2xl"
      />

      {/* <div className="grid grid-cols-4 gap-4 mt-10">
        {cardData.map ((item,index)=>
          <Card
            key={index}
            baseImage={item.image}
            title={item.title}
            city={item.city}
            day={item.day}
            // borderColor="border-red-500"
            imageContainerStyle="h-[222px] rounded-xl rounded-b-none overflow-hidden"
            superPower
            wishlist
            supercoin
            variant="activityCard"
            // cardEdges
            verified="Verified"
          />
        )}
      </div> */}

      {/* when close icon available then dialogbox not close click outer side  */}
      <button onClick={() => setIsOpen(true)} className="bg-blue-300 px-5 py-1 mr-5">Dialog ONE</button>
      <DialogBox
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Deactivate account Dialog Title"
        closeIcon
      >
        Are you sure you want to deactivate your account? All of your data will be permanently removed.
      </DialogBox>

      {/* when close icon not available then dialogbox close click outer side  */}
      <button onClick={() => setIsOpenTwo(true)} className="bg-blue-500 px-5 py-1">Dialog TWO</button>
      <DialogBox
        isOpen={isOpenTwo}
        onClose={() => setIsOpenTwo(false)}
        title="Deactivate account Dialog Title"
        closeIcon={isMobile ? true : false}
      >
        Are you sure you want to deactivate your account? All of your data will be permanently removed.
      </DialogBox>
  <CustomAccordion />
      
    </div>
  );
}
