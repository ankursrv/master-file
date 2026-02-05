import React from "react"
import EssentialCard from "@/components/atoms/rocksport-b2b/essentialCard"


const EssentialsSection = () => {
  const prerequisiteItems = [
    { id: 1, text: "Sun Cap." },
    { id: 2, text: "Mask" },
    { id: 3, text: "Sanitizer" },
    { id: 4, text: "Water Bottle" },
  ]

  const carryItems = [
    { id: 1, text: "Sun Cap." },
    { id: 2, text: "Mask" },
    { id: 3, text: "Sanitizer" },
    { id: 4, text: "Water Bottle" },
  ]

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <EssentialCard
        title="Pre-requisite"
        items={prerequisiteItems}
        imageSrc="/images/rocksport-b2b-images/essentials1.webp"
        imagePosition="absolute-bottom"
      />

      <EssentialCard
        title="What to carry?"
        items={carryItems}
        imageSrc="/images/rocksport-b2b-images/essentials2.webp"
        bgColor="bg-theme-primary"
      />
    </section>
  )
}

export default EssentialsSection