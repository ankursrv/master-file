import React from "react"
import Typography from "@/components/molecules/typography/typography"
import { cn } from "@/lib/utils"

const BookingIndicator = ({ currentStep }) => {
  const steps = [
    { number: "01", title: "Participant", subtitle: "Details" },
    { number: "02", title: "Guardian", subtitle: "Details" },
    { number: "03", title: "Trip & Payment", subtitle: "Details" },
  ]

  return (
    <div className="w-[400px]">
      <div className="text-white mb-12">
        <Typography variant="h5" font="secondary" className="uppercase">
          BOOKING FORM
        </Typography>
        <p className="text-white/80 text-sm mt-2">
          Fill up the form to book your adventure
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-0">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = currentStep === stepNumber
          const isCompleted = currentStep > stepNumber
          const isPending = currentStep < stepNumber

          return (
            <div key={index} className="flex items-start gap-4">
              {/* Circle and Line */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    "size-[60px] rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 bg-baby-powder border-2",
                    isActive && "text-theme-primary border-theme-primary",
                    isCompleted && "text-theme-primary border-theme-primary",
                    isPending && "text-stamped-concrete"
                  )}
                >
                  {step.number}
                </div>

                {/* Indicator Line */}
                {index < steps.length - 1 && (
                  <div className="relative w-[6px] h-24 overflow-hidden">
                    <div className="absolute inset-0 bg-stamped-concrete" />
                    {currentStep > index + 1 && (
                      <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-theme-primary via-theme-primary/80 to-theme-primary transition-all duration-500 ease-in-out" />
                    )}
                    {currentStep === index + 1 && (
                      <div
                        className={cn("absolute top-0 left-0 w-full bg-gradient-to-b from-theme-primary to-transparent transition-all duration-500 h-[90%]")}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Step Text */}
              <div>
                <p
                  className={cn(
                    "text-2xl font-semibold",
                    isActive && "text-white",
                    isCompleted && "text-white/80",
                    isPending && "text-white/40"
                  )}
                >
                  {step.title}
                </p>
                <p
                  className={cn(
                    "text-2xl font-semibold",
                    isActive && "text-white",
                    isCompleted && "text-white/80",
                    isPending && "text-white/40"
                  )}
                >
                  {step.subtitle}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BookingIndicator