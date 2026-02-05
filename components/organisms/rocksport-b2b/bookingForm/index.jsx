"use client"
import React, { useState } from "react"
import ParticipantForm from "@/components/molecules/rocksport-b2b/participantForm"
import GuardianForm from "@/components/molecules/rocksport-b2b/guardianForm"
import TripForm from "@/components/molecules/rocksport-b2b/tripForm"

import { ThankYouScreen, OtpVerification, SuccessScreen } from "../submissionSuccess"

import BookingIndicator from "@/components/molecules/rocksport-b2b/bookingIndicator"
import { cn } from "@/lib/utils"

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
        "relative overflow-hidden booking-bg-image",
        currentStep >= 2 ? "h-auto" : "h-[685px]"
      )}
    >
      <div className="relative z-10 container py-20 flex flex-col lg:flex-row lg:justify-between gap-10">

        {/* LEFT INDICATOR */}
        {currentStep <= 3 && (
          <BookingIndicator currentStep={currentStep} />
        )}

        {/* RIGHT CONTENT */}
        <div className={cn("w-full", currentStep === 1 && currentStep === 2 && currentStep === 3 && "lg:w-[785px]")}>
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
    </section>
  )
}

export default BookingForm