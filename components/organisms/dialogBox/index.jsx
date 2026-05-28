"use client"
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react"
import { cn } from "@/lib/utils"
import Icons from "@/components/atoms/icons"
import useIsMobile from "@/lib/useIsMobile"

const DialogBox = ({
  isOpen,
  onClose,
  title,
  closeIcon,
  children,
  slideFromBottom = false, //true for slide from bottom and false for center
}) => {
  const isMobile = useIsMobile()
  const shouldSlideFromBottom = slideFromBottom && isMobile

  const handleClose = () => {
    if (!closeIcon) {
      onClose?.()
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        className={cn(
          "fixed inset-0 bg-black/30 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {shouldSlideFromBottom ? (
        // Mobile Bottom Sheet Animation
        <div className="fixed inset-0 flex items-end overflow-hidden">
          <DialogPanel
            transition
            className={cn(
              "w-full max-w-full bg-white rounded-t-3xl flex flex-col overflow-hidden",
              "transition-all duration-500 ease-in-out transform max-h-[80vh] h-auto",
              "data-[closed]:translate-y-full data-[closed]:opacity-0"
            )}
          >
            <DialogTitle
              className={cn(
                "flex items-center gap-4 p-5 border-b",
                title ? "justify-between" : "justify-end"
              )}
            >
              {title && <p className="text-xl font-semibold">{title}</p>}
              {closeIcon && (
                <button onClick={onClose}>
                  <Icons.close />
                </button>
              )}
            </DialogTitle>
            <div className="flex-1 min-h-0 overflow-y-auto p-5 scrollbar-theme1">
              {children}
            </div>
          </DialogPanel>
        </div>
      ) : (
        // Desktop Center Animation
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className={cn(
              "w-full max-w-3xl bg-white rounded-2xl border flex flex-col overflow-y-hidden",
              "transition-all duration-300 transform h-[90vh]",
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            )}
          >
            <DialogTitle
              className={cn(
                "flex items-center gap-4 p-5 border-b",
                title ? "justify-between" : "justify-end"
              )}
            >
              {title && <p className="text-xl font-semibold">{title}</p>}
              {closeIcon && (
                <button onClick={onClose}>
                  <Icons.close />
                </button>
              )}
            </DialogTitle>
            <div className="flex-1 min-h-0 overflow-y-auto p-5 scrollbar-theme1">
              {children}
            </div>
          </DialogPanel>
        </div>
      )}
    </Dialog>
  )
}

export default DialogBox
