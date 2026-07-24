"use client"
import React, { useState } from 'react'

import { Button } from "@/components/atoms/button"
import CustomInput from "@/components/atoms/customInput"
import Icons from "@/components/atoms/icons"

import CustomAccordion from "@/components/molecules/customAccordion"
import CustomImage from "@/components/molecules/customImage"
import CustomSelect from "@/components/molecules/customSelect"
import Typography from "@/components/molecules/typography/typography"

import Card from "@/components/organisms/card"
import CustomSlider from "@/components/organisms/customSlider"
import DialogBox from "@/components/organisms/dialogBox"

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const accordionItems = [
    { title: "Item 1", content: "Content for item 1" },
    { title: "Item 2", content: "Content for item 2" },
  ];

  const sliderItems = [
    { id: 1, name: "Slide 1" },
    { id: 2, name: "Slide 2" },
    { id: 3, name: "Slide 3" },
    { id: 4, name: "Slide 4" },
    { id: 5, name: "Slide 5" },
    { id: 6, name: "Slide 6" },
  ];

  return (
    <section className="container p-8 space-y-12">
      <Typography variant="h1" className="text-4xl font-bold mb-8 text-center">Components</Typography>

      <div className="space-y-4">
        <Typography variant="h2" className="text-2xl font-semibold border-b pb-2">Atoms</Typography>

        <div className="space-y-2">
          <Typography variant="h3">Button</Typography>
          <div className="flex gap-4 flex-wrap">
            <Button>Default Button</Button>
            <Button variant="outlinePrimary">Outline Primary</Button>
            <Button variant="fillPrimary">Fill Primary</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        <div className="space-y-2 max-w-md">
          <Typography variant="h3">CustomInput</Typography>
          <CustomInput
            label="Test Input"
            placeholder="Enter something..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Typography variant="h3">Icons</Typography>
          <div className="flex gap-4 text-theme-primary">
            <Icons.DownIcon className="w-6 h-6" />
            <Icons.Close className="w-6 h-6" />
            <Icons.PlusIcon className="w-6 h-6" />
            <Icons.BarIcon className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="h2" className="text-2xl font-semibold border-b pb-2">Molecules</Typography>

        <div className="space-y-2 max-w-xl">
          <Typography variant="h3">CustomAccordion</Typography>
          <CustomAccordion items={accordionItems} />
        </div>

        <div className="space-y-2">
          <Typography variant="h3">CustomImage</Typography>
          <div className="w-40 h-40 relative">
            <CustomImage
              src="/images/card/card-img1.jpeg"
              width={150}
              height={150}
              alt="Test Image"
            />
          </div>
        </div>

        <div className="space-y-2 max-w-xs">
          <Typography variant="h3">CustomSelect</Typography>
          <CustomSelect
            label="Select Option"
            value={selectValue}
            onChange={setSelectValue}
            options={[
              { value: "opt1", label: "Option 1" },
              { value: "opt2", label: "Option 2" },
            ]}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Typography variant="h2" className="text-2xl font-semibold border-b pb-2">Organisms</Typography>

        <div className="space-y-2">
          <Typography variant="h3">Card</Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card
              variant="activityCard"
              title="Test Activity"
              city="New Delhi"
              day="2 Days"
              src="/images/card/card-img1.webp"
              supercoin
            />
            <Card
              variant="onlyTitle"
              src="/images/card/card-img1.webp"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Typography variant="h3">CustomSlider</Typography>
          <div className="h-40">
            <CustomSlider items={sliderItems} slidesPerView={3}>
              {(item) => (
                <div className="bg-gray-100 p-4 h-32 flex items-center justify-center rounded-xl border">
                  {item.name}
                </div>
              )}
            </CustomSlider>
          </div>
        </div>

        <div className="space-y-2">
          <Typography variant="h3">DialogBox</Typography>
          <Button onClick={() => setDialogOpen(true)}>Open Dialog</Button>
          <DialogBox
            isOpen={dialogOpen}
            onClose={() => setDialogOpen(false)}
            title="Test Dialog"
            closeIcon={true}
          >
            <div className="p-4">
              <p>This is a test dialog box content.</p>
              <Button className="mt-4" onClick={() => setDialogOpen(false)}>Close</Button>
            </div>
          </DialogBox>
        </div>
      </div>
    </section>
  )
}

export default Home
