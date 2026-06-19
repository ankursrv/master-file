import React, { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Icons from "@/components/atoms/icons";
import { cn } from "@/lib/utils";

type AccordionVariant = "default" | "style1";

const variants: Record<AccordionVariant, string> = {
  default: "bg-light-200 border border-dark/20 rounded-xl p-5",
  style1: "bg-light-400 border border-light-50 rounded-lg p-3",
};

interface AccordionItem {
  title: React.ReactNode;
  content: React.ReactNode;
}

interface CustomAccordionProps {
  variant?: AccordionVariant;
  icon?: React.ReactNode;
  openIcon?: React.ReactNode;
  closedIcon?: React.ReactNode;
  items?: AccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
  autoCollapse?: boolean;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  variant = "default",
  icon,
  openIcon,
  closedIcon,
  items = [],
  defaultOpenIndex = 0,
  className,
  autoCollapse = true,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

  const handleToggle = (index: number): void => {
    if (autoCollapse) {
      setOpenIndex(openIndex === index ? null : index);
    }
  };

  return (
    <div className="w-full space-y-5">
      {items.map((item: AccordionItem, index: number) => (
        <Disclosure
          key={index}
          as="div"
          className="w-full"
          defaultOpen={!autoCollapse && index === defaultOpenIndex}
        >
          {({ open }: { open: boolean }) => {
            const isOpen: boolean = autoCollapse ? openIndex === index : open;

            return (
              <div className={cn(variants[variant], className)}>
                <DisclosureButton
                  className="flex items-center justify-between w-full gap-2 text-dreamless-sleep text-xl font-semibold text-start"
                  onClick={() => handleToggle(index)}
                >
                  {item.title}
                  {icon
                    ? icon
                    : isOpen
                      ? openIcon || (
                          <Icons.BarIcon className="bg-primary text-white rounded-lg p-2 size-7 shrink-0" />
                        )
                      : closedIcon || (
                          <Icons.PlusIcon className="bg-primary text-white rounded-lg p-2 size-7 shrink-0" />
                        )}
                </DisclosureButton>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0 mt-0"
                  )}
                >
                  {(autoCollapse ? isOpen : true) && (
                    <DisclosurePanel static={autoCollapse}>
                      {item.content}
                    </DisclosurePanel>
                  )}
                </div>
              </div>
            );
          }}
        </Disclosure>
      ))}
    </div>
  );
};

export default CustomAccordion;
