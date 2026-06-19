"use client";

import { ReactNode } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { cn } from "@/lib/utils";
import Icons from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";
import useIsMobile from "@/lib/useIsMobile";

interface DialogBoxProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  textStyle?: string;
  closeIcon?: boolean;
  children: ReactNode;
  overflow?: boolean;
  showIcon?: boolean;
  showButton?: boolean;
  containerStyle?: string;
  titleContainerStyle?: string;
  isMobileStyle?: boolean;
}

const DialogBox = ({
  isOpen,
  onClose,
  title,
  closeIcon,
  children,
  overflow,
  showIcon,
  showButton,
  textStyle,
  containerStyle,
  titleContainerStyle,
  isMobileStyle,
}: DialogBoxProps) => {
  const handleClose = () => {
    if (!closeIcon) {
      onClose?.();
    }
  };
  const isMobile = useIsMobile();
  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-[999]">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />

      <div
        className={cn(
          "fixed inset-0 flex items-center justify-center p-5 lg:p-0",
          isMobile && isMobileStyle && "items-end !p-0"
        )}
      >
        <DialogPanel
          className={cn(
            "w-full max-w-3xl h-[72vh] md:h-[90vh] bg-white rounded-2xl flex flex-col overflow-y-hidden",
            containerStyle
          )}
        >
          <DialogTitle
            as="div"
            className={cn(
              "flex items-center gap-4 p-5 border-b border-dark-50",
              title ? "justify-between" : "justify-end",
              titleContainerStyle
            )}
          >
            {title && (
              <p
                className={cn(
                  "text-xl font-bold",
                  showIcon && "flex-center gap-2",
                  textStyle
                )}
              >
                {showIcon && <Icons.Info />}
                {title}
              </p>
            )}

            {closeIcon && (
              <button type="button" aria-label="Close dialog" onClick={onClose}>
                <Icons.Close />
              </button>
            )}
          </DialogTitle>

          {/* Scrollable Content */}
          <div
            className={cn(
              "flex-1 min-h-0 scrollbar-theme1",
              overflow ? "overflow-y-auto p-5" : ""
            )}
          >
            {children}
          </div>
          {showButton && (
            <div className="p-5 flex flex-col">
              <Button variant="fillPrimary" size={isMobile ? "xl" : undefined}>
                I agree
              </Button>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default DialogBox;
