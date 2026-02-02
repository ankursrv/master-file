// components/organisms/booking/BookingSection.jsx
"use client"
import React, { useState } from "react"
import ParticipantForm from "@/components/molecules/rocksport-b2b/participantForm"
import BookingIndicator from "@/components/molecules/rocksport-b2b/bookingIndicator"
import TripForm from "@/components/molecules/rocksport-b2b/tripForm"
import GuardianForm from "@/components/molecules/rocksport-b2b/guardianForm"
import { cn } from "@/lib/utils"

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState(1)

  const [formData, setFormData] = useState({
    // Participant Details
    fullName: "",
    mobileNumber: "",
    class: "",
    section: "",
    bloodGroup: "",
    dateOfBirth: "",
    idProof: null,

    // Guardian Details - Now as an array
    guardians: [
      {
        guardianType: "",
        guardianName: "",
        guardianContact: "",
        guardianEmail: "",
      }
    ]
  })

  const handleInputChange = (e, guardianIndex = null) => {
    const { name, value, type, checked } = e.target

    // If guardianIndex is provided, update specific guardian
    if (guardianIndex !== null) {
      setFormData(prev => ({
        ...prev,
        guardians: prev.guardians.map((guardian, index) =>
          index === guardianIndex
            ? { ...guardian, [name]: type === 'checkbox' ? checked : value }
            : guardian
        )
      }))
    } else {
      // Regular field update
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleSelectChange = (name, value, guardianIndex = null) => {
    // If guardianIndex is provided, update specific guardian
    if (guardianIndex !== null) {
      setFormData(prev => ({
        ...prev,
        guardians: prev.guardians.map((guardian, index) =>
          index === guardianIndex
            ? { ...guardian, [name]: value }
            : guardian
        )
      }))
    } else {
      // Regular field update
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }))
  }

  // Add new guardian
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
        }
      ]
    }))
  }

  // Remove guardian by index
  const handleRemoveGuardian = (index) => {
    setFormData(prev => ({
      ...prev,
      guardians: prev.guardians.filter((_, i) => i !== index)
    }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Form submitted:", formData)
    // Yahan API call ya submission logic add karo
  }

  const hasMultipleGuardians = formData.guardians.length > 1

  return (
    <section className={cn("relative overflow-hidden booking-bg-image",
      currentStep === 2 && hasMultipleGuardians ? "h-full" : "h-[685px]")}
    >
      <div className="relative z-10 container h-full flex flex-col lg:flex-row lg:justify-between py-20 gap-10">
        {/* Left Component - Step Indicator */}
        <BookingIndicator
          currentStep={currentStep}
        />
        {/* Form Content */}
        <div className="w-full lg:w-[785px]">
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
              onSelectChange={handleSelectChange}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingForm