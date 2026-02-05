import React from "react"
import CustomInput from "@/components/atoms/customInput"
import CustomSelect from "@/components/molecules/customSelect"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import Icons from "@/components/atoms/icons"
import Typography from "../../typography/typography"
import { cn } from "@/lib/utils"
import useIsMobile from "@/lib/useIsMobile"

const GuardianForm = ({
  formData,
  onChange,
  onSelectChange,
  onNext,
  onBack,
  onAddGuardian,
  onRemoveGuardian
}) => {
  const guardianTypeOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
    { value: "guardian", label: "Legal Guardian" },
    { value: "other", label: "Other" },
  ]

  // Ensure guardians is always an array
  const guardians = formData.guardians || []
  const isMobile = useIsMobile();
  return (
    <>
      {guardians.map((guardian, index) => (
        <div key={index} className="space-y-6 bg-decorator-white p-5 rounded-2xl relative ">
          {index > 0 && (
            <div className="flex justify-between items-center mb-4">
              <Typography variant="p" className="text-2xl font-semibold text-dark-tone-ink">
                Guardian {index + 1}
              </Typography>
              <Button
                variant="styleNone"
                onClick={() => onRemoveGuardian(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
                ariaLabel="Remove Guardian"
              >
                <Icons.Close className="w-5 h-5" />
              </Button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomSelect
              label="Guardian Type"
              value={guardian.guardianType}
              onChange={(value) => onSelectChange("guardianType", value, index)}
              options={guardianTypeOptions}
              placeholder="Select"
              required
            />
            <CustomInput
              label="Guardian Name"
              type="text"
              name="guardianName"
              placeholder="Enter Here"
              value={guardian.guardianName}
              onChange={(e) => onChange(e, index)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomInput
              label="Guardian Contact Number"
              type="tel"
              name="guardianContact"
              placeholder="Enter Here"
              value={guardian.guardianContact}
              onChange={(e) => onChange(e, index)}
              required
            />
            <CustomInput
              label="Guardian Email ID"
              type="email"
              name="guardianEmail"
              placeholder="Enter Here"
              value={guardian.guardianEmail}
              onChange={(e) => onChange(e, index)}
              required
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={onAddGuardian}
        className="flex items-center mt-6 text-xl font-semibold gap-2 px-10 py-4 bg-dark-tone-ink text-white rounded-full hover:bg-opacity-90 transition-all"
      >
        <Icons.PlusIcon aria-hidden="true" /> Add More Guardian
      </button>

      <div className="flex gap-4 justify-between pt-11 md:pt-16">
        <Button
          variant="outlinePrimary"
          onClick={onBack}
          size={isMobile && "wFull"}
        >
          Back
        </Button>
        <Button
          variant="fillPrimary"
          onClick={onNext} 
          size={isMobile && "wFull"}
        >
          Next
        </Button>
      </div>
    </>
  )
}

export default GuardianForm