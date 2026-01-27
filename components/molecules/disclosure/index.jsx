import React from "react"
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import Icons from "@/components/atoms/icons"
import { cn } from "@/lib/utils"

const CustomAccordion = ({ title, description,mapItem }) => {
  return (
    <section className="mt-20">
      <Disclosure>
        {({ open }) => (
          <>
            <DisclosureButton className="flex items-center gap-2">
              {title}
              <Icons.UpIcon className={cn('w-5', open && 'rotate-180')} />
            </DisclosureButton>
            <DisclosurePanel>
              {description}
            </DisclosurePanel>
          </>
        )}
      </Disclosure>
    </section>
  )
}

export default CustomAccordion
