import React from "react"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import CustomInput from "@/components/atoms/customInput"

const tripForm = ({
  formData,
  onChange,
  onSubmit,
  onBack
}) => {

  return (
    <div className="w-full bg-baby-powder rounded-xl p-8">
      <div className="space-y-6 bg-decorator-white p-5 rounded-2xl">
        <div className="grid grid-cols-1 gap-6">
          <CustomInput
            label="Trip Date"
            type="text"
            name="guardianName"
            placeholder="15 October 2025"
            disabled
          />
        </div>
        <div className="grid grid-cols-3">
          <CustomInput
            type="radio"
            name="paymentMethod"
            value="online"
            label="Pay Online"
            variant="inputStyle3"
            containerStyle="flex items-center flex-row-reverse justify-end gap-2"
            labelStyle
            focus={false}
          />
          <CustomInput
            type="radio"
            name="paymentMethod"
            value="atSchool"
            label="Pay At School"
            variant="inputStyle3"
            containerStyle="flex items-center flex-row-reverse justify-end gap-2"
            labelStyle
            focus={false}
          />
          <CustomInput
            type="radio"
            name="paymentMethod"
            value="later"
            label="Pay At School"
            variant="inputStyle3"
            containerStyle="flex items-center flex-row-reverse justify-end gap-2"
            labelStyle
            focus={false}
          />
        </div>
      </div>
      <div className="space-y-6 mt-6">
        <CustomInput
          type="checkbox"
          name="paymentMethod"
          value="later"
          label="Disclaimer confirming that the participant does not have any medical condition"
          variant="inputStyle3"
          containerStyle="flex items-baseline flex-row-reverse justify-end gap-4"
          labelStyle="font-normal"
          focus={false}
        />
        <CustomInput
          type="checkbox"
          name="paymentMethod"
          value="later"
          label="I understand and agree to the Terms and Conditions of this adventure program, including safety guidelines, cancellation policies, and liability waivers."
          variant="inputStyle3"
          containerStyle="flex items-baseline flex-row-reverse justify-end gap-4"
          labelStyle="font-normal"
          focus={false}
        />
      </div>
      <div className="flex justify-between pt-[100px]">
        <Button
          variant="outlinePrimary"
          onClick={onBack}
        >
          Back
        </Button>
        <Button
          variant="fillPrimary"
          onClick={onSubmit}
          className="px-12"
          disabled={!formData.payAtSchool || !formData.payOption}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default tripForm