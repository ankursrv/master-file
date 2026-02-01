import React from "react"
import CustomInput from "@/components/atoms/customInput"
import CustomSelect from "@/components/molecules/customSelect"
import Icons from "@/components/atoms/icons"
import { Button } from "@/components/atoms/rocksport-b2b/button"

const ParticipantForm = ({
  formData,
  onChange,
  onSelectChange,
  onFileChange,
  onNext
}) => {
  const classOptions = [
    { value: "1", label: "Class 1" },
    { value: "2", label: "Class 2" },
    { value: "3", label: "Class 3" },
    { value: "4", label: "Class 4" },
    { value: "5", label: "Class 5" },
  ]

  const sectionOptions = [
    { value: "A", label: "Section A" },
    { value: "B", label: "Section B" },
    { value: "C", label: "Section C" },
  ]

  const bloodGroupOptions = [
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
  ]

  return (
    <div className="w-full bg-baby-powder rounded-xl p-8">
      <div className="space-y-6 bg-decorator-white p-5 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CustomInput
            label="Full Name"
            type="text"
            name="fullName"
            placeholder="Enter Here"
            value={formData.fullName}
            onChange={onChange}
            required
          />
          <CustomInput
            label="Mobile Number"
            type="tel"
            name="mobileNumber"
            placeholder="Enter Here"
            value={formData.mobileNumber}
            onChange={onChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <CustomSelect
            label="Class"
            value={formData.class}
            onChange={(value) => onSelectChange("class", value)}
            options={classOptions}
            placeholder="Select"
            required
          />
          <CustomSelect
            label="Section"
            value={formData.section}
            onChange={(value) => onSelectChange("section", value)}
            options={sectionOptions}
            placeholder="Select"
            required
          />
          <CustomSelect
            label="Blood Group"
            value={formData.bloodGroup}
            onChange={(value) => onSelectChange("bloodGroup", value)}
            options={bloodGroupOptions}
            placeholder="Select"
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <CustomInput
            label="Date Of Birth"
            type="date"
            name="dateOfBirth"
            placeholder="Enter Here"
            value={formData.dateOfBirth}
            onChange={onChange}
            required
          />
          <CustomInput
            label="Upload ID Proof"
            type="file"
            name="idProof"
            placeholder="Enter Here"
            accept=".jpeg,.jpg,.png,.pdf"
            onChange={(e) => onFileChange(e, "idProof")}
            icon={<Icons.AttachFile className="-mt-4 -ml-2" />}
            rightIcon={<Icons.Upload />}
            InputType="file"
            variant="inputStyle2"
            inputContainer="relative z-10"
          />
        </div>        
      </div>
      <div className="flex justify-end pt-10">
        <Button
          variant="fillPrimary"
          onClick={onNext}
          className="px-12"
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default ParticipantForm