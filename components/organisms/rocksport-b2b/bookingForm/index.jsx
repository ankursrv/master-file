"use client"
import React, { useState } from "react"
import ParticipantForm from "@/components/molecules/rocksport-b2b/participantForm"
import GuardianForm from "@/components/molecules/rocksport-b2b/guardianForm"
import TripForm from "@/components/molecules/rocksport-b2b/tripForm"

import { ThankYouScreen, OtpVerification, SuccessScreen } from "../submissionSuccess"

import BookingIndicator from "@/components/molecules/rocksport-b2b/bookingIndicator"
import { cn } from "@/lib/utils"
import Typography from "@/components/molecules/typography/typography"

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    class: "",
    section: "",
    bloodGroup: "",
    dateOfBirth: "",
    idProof: null,

    guardians: [
      {
        guardianType: "",
        guardianName: "",
        guardianContact: "",
        guardianEmail: "",
      },
    ],

    paymentMethod: "",
    disclaimerAccepted: false,
    termsAccepted: false,
  })

  // HANDLERS 

  const handleInputChange = (e, guardianIndex = null) => {
    const { name, value, type, checked } = e.target

    if (guardianIndex !== null) {
      setFormData(prev => ({
        ...prev,
        guardians: prev.guardians.map((g, i) =>
          i === guardianIndex ? { ...g, [name]: value } : g
        ),
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }))
    }
  }

  const handleSelectChange = (name, value, guardianIndex = null) => {
    if (guardianIndex !== null) {
      setFormData(prev => ({
        ...prev,
        guardians: prev.guardians.map((g, i) =>
          i === guardianIndex ? { ...g, [name]: value } : g
        ),
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleFileChange = (e, fieldName) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: e.target.files[0],
    }))
  }

  const handleAddGuardian = () => {
    setFormData(prev => ({
      ...prev,
      guardians: [
        ...prev.guardians,
        {
          guardianType: "",
          guardianName: "",
          guardianContact: "",
          guardianEmail: "",
        },
      ],
    }))
  }

  const handleRemoveGuardian = index => {
    setFormData(prev => ({
      ...prev,
      guardians: prev.guardians.filter((_, i) => i !== index),
    }))
  }

  // STEP CONTROLS

  const handleNext = () => setCurrentStep(prev => prev + 1)
  const handleBack = () => setCurrentStep(prev => prev - 1)

  const handleSubmit = () => {
    console.log("SUBMIT CLICKED ✅", formData)
    setCurrentStep(4)
  }

  const handleSendOtp = () => {
    setCurrentStep(5)
  }

  const handleVerifyOtp = () => {
    setCurrentStep(6)
  }

  return (
    <section
      className={cn(
        "relative overflow-hidden booking-bg-image py-10 md:py-20",
        // currentStep === 1 && "h-[685px]",
        // currentStep === 2 && "h-auto"
      )}
    >
      <div className="container">
        <div className={cn(
          "text-white mb-8 md:mb-12 relative",
          currentStep > 3 && "block md:hidden"
        )}>
          <Typography variant="h5" font="secondary" className="uppercase">
            BOOKING FORM
          </Typography>
          <p className="text-white/80 mt-2">
            Fill up the form to book your adventure
          </p>
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between gap-10">

          {/* LEFT INDICATOR */}
          {currentStep <= 3 && (
            <BookingIndicator currentStep={currentStep} />
          )}

          {/* RIGHT CONTENT */}
          <div className={cn("w-full md:min-h-[545px] bg-baby-powder rounded-xl p-4 md:p-8", currentStep === 1 && currentStep === 2 && currentStep === 3 && "lg:w-[785px]")}>
            {currentStep === 1 && (
              <ParticipantForm
                formData={formData}
                onChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onFileChange={handleFileChange}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <GuardianForm
                formData={formData}
                onChange={handleInputChange}
                onSelectChange={handleSelectChange}
                onAddGuardian={handleAddGuardian}
                onRemoveGuardian={handleRemoveGuardian}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}

            {currentStep === 3 && (
              <TripForm
                formData={formData}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onBack={handleBack}
              />
            )}

            {currentStep === 4 && (
              <ThankYouScreen onSendOtp={handleSendOtp} />
            )}

            {currentStep === 5 && (
              <OtpVerification
                onVerify={handleVerifyOtp}
                onBack={() => setCurrentStep(4)}
              />
            )}

            {currentStep === 6 && <SuccessScreen />}

          </div>
        </div>
      </div>
    </section>
  )
}

export default BookingForm