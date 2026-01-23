"use client"
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop } from "@headlessui/react"
import { cn } from "@/lib/utils"
import Icons from "@/components/atoms/icons"

const DialogBox = ({
  isOpen,
  onClose,
  title,
  closeIcon,
  children,
}) => {
  const handleClose = () => {
    if (!closeIcon) {
      onClose?.()
    }
  }
  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className={cn("w-full max-w-3xl h-[90vh] bg-white rounded-2xl border flex flex-col overflow-y-hidden")}>
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
          {/* Scrollable Content */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 scrollbar-theme1">
            {children}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DialogBox
