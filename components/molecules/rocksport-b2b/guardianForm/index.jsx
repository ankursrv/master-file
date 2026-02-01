import React from "react"
import CustomInput from "@/components/atoms/customInput"
import CustomSelect from "@/components/molecules/customSelect"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import Icons from "@/components/atoms/icons"

const GuardianForm = ({
  formData,
  onChange,
  onSelectChange,
  onNext,
  onBack
}) => {
  const guardianTypeOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "guardian", label: "Legal Guardian" },
    { value: "other", label: "Other" },
  ]

  return (
    <div className="w-full bg-baby-powder rounded-xl p-8">
      <div className="space-y-6 bg-decorator-white p-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomSelect
            label="Guardian Type"
            value={formData.guardianType}
            onChange={(value) => onSelectChange("guardianType", value)}
            options={guardianTypeOptions}
            placeholder="Select"
            required
          />
          <CustomInput
            label="Guardian Name"
            type="text"
            name="guardianName"
            placeholder="Enter Here"
            value={formData.guardianName}
            onChange={onChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            label="Guardian Contact Number"
            type="tel"
            name="guardianContact"
            placeholder="Enter Here"
            value={formData.guardianContact}
            onChange={onChange}
            required
          />
          <CustomInput
            label="Guardian Email ID"
            type="email"
            name="guardianEmail"
            placeholder="Enter Here"
            value={formData.guardianEmail}
            onChange={onChange}
            required
          />
        </div>
      </div>      
        <button
          type="button"
          className="flex items-center mt-6 text-xl font-semibold gap-2 px-10 py-4 bg-dark-tone-ink text-white rounded-full"
        >
          <Icons.PlusIcon /> Add More Guardian
        </button>
      <div className="flex justify-between pt-16">
        <Button
          variant="outlinePrimary"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="fillPrimary"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default GuardianForm