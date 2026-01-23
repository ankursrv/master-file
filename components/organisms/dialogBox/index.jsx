"use client"
import { useState, Fragment } from "react"
import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import CustomImage from "@/components/molecules/customImage"
import { cn } from "@/lib/utils"
import Icons from "@/components/atoms/icons"

const DialogBox = ({
  isOpen,
  onClose,
  title,
  closeIcon,
  children,
  dialogBoxStyle,
  titleStyle,
  dialogBodyStyle,
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-5">
          <DialogTitle className={cn("flex items-center gap-4",title ? "justify-between" : "justify-end")}>
            {title && <p>{title}</p>}
            {closeIcon && <button onClick={onClose}><Icons.close /></button>}
          </DialogTitle>
         {children}     
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default DialogBox
