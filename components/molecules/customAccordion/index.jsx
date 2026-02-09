import React, { useState } from "react"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Icons from "@/components/atoms/icons"
import { cn } from "@/lib/utils"

const variants = {
  default: "bg-white-crest border border-[#12121233] rounded-xl p-5",
}

const CustomAccordion = ({
  variant = "default",
  icon,
  openIcon,
  closedIcon,
  items = [],
  defaultOpenIndex = 0,
  className,
  autoCollapse = true
}) => {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  const handleToggle = (index) => {
    if (autoCollapse) {
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  return (
    <div className="w-full space-y-5">
      {items.map((item, index) => (
        <Disclosure
          key={index}
          as="div"
          className="w-full"
          defaultOpen={!autoCollapse && index === defaultOpenIndex}
        >
          {({ open }) => {
            const isOpen = autoCollapse ? openIndex === index : open

            return (
              <div className={cn(variants[variant], className)}>
                <DisclosureButton
                  className="flex items-center justify-between w-full gap-2 text-dreamless-sleep text-xl font-semibold"
                  onClick={() => handleToggle(index)}
                >
                  {item.title}
                  {icon ? (
                    icon
                  ) : isOpen ? (
                    openIcon || <Icons.BarIcon className="bg-theme-primary text-white rounded-lg p-2 size-7" />
                  ) : (
                    closedIcon || <Icons.PlusIcon className="bg-theme-primary text-white rounded-lg p-2 size-7" />
                  )}
                </DisclosureButton>
                <div className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"
                )}>
                  {(autoCollapse ? isOpen : true) && (
                    <DisclosurePanel
                      static={autoCollapse}
                    >
                      {item.content}
                    </DisclosurePanel>
                  )}
                </div>
              </div>
            )
          }}
        </Disclosure>
      ))}
    </div>
  )
}

export default CustomAccordion