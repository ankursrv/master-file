// components/organisms/booking/BookingSection.jsx
"use client"
import React, { useState } from "react"
import ParticipantForm from "@/components/molecules/rocksport-b2b/participantForm"
import BookingIndicator from "@/components/molecules/rocksport-b2b/bookingIndicator"
import TripForm from "@/components/molecules/rocksport-b2b/tripForm"
import GuardianForm from "@/components/molecules/rocksport-b2b/guardianForm"

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

    // Guardian Details
    guardianType: "",
    guardianName: "",
    guardianContact: "",
    guardianEmail: "",

    // T-Shirt Details
    tshirtSize: "",
    payOption: "",
    payAtSchool: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0]
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
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

  const steps = [
    {
      number: 1,
      title: "Participant Details",
      subtitle: "Fill in Participant form and proceed"
    },
    {
      number: 2,
      title: "Guardian Details",
      subtitle: "Fill in Guardian form and proceed"
    },
    {
      number: 3,
      title: "T-Shirt & Payment Details",
      subtitle: "Select size and complete payment"
    }
  ]

  return (
    <section className="relative overflow-hidden booking-bg-image">
      <div className="relative z-10 container h-full flex justify-between py-20">
        {/* Left Component - Step Indicator */}
        <BookingIndicator
          steps={steps}
          currentStep={currentStep}
        />
        {/* Form Content */}
        <div className="w-[785px]">
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