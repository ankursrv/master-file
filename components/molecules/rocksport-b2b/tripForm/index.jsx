import React from "react"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import CustomInput from "@/components/atoms/customInput"
import useIsMobile from "@/lib/useIsMobile"

const TripForm = ({
  formData,
  onChange,
  onSubmit,
  onBack,
}) => {
  const isMobile = useIsMobile();
  return (
    <div className="">
      <div className="space-y-6 bg-decorator-white p-5 rounded-2xl">
        <CustomInput
          label="Trip Date"
          type="text"
          name="tripDate"
          placeholder="15 October 2025"
          disabled
        />

        {/* Payment Method */}
        <fieldset className="grid grid-cols-2 md:grid-cols-3 gap-6 justify-between">
          <legend className="sr-only">Select Payment Method</legend> {/* //accessibility */}
          <CustomInput
            type="radio"
            name="paymentMethod"
            value="online"
            label="Pay Online"
            onChange={onChange}
            checked={formData.paymentMethod === "online"}
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
            onChange={onChange}
            checked={formData.paymentMethod === "atSchool"}
            variant="inputStyle3"
            containerStyle="flex items-center flex-row-reverse justify-end gap-2"
            labelStyle
            focus={false}
          />

          <CustomInput
            type="radio"
            name="paymentMethod"
            value="later"
            label="Pay Later"
            onChange={onChange}
            checked={formData.paymentMethod === "later"}
            variant="inputStyle3"
            containerStyle="flex items-center flex-row-reverse justify-end gap-2"
            labelStyle
            focus={false}
          />
        </fieldset>
      </div>

      {/* Disclaimers */}
      <div className="mt-6">
        <fieldset className="space-y-6">
          <legend className="sr-only">Disclaimers and Terms</legend>

          <CustomInput
            type="checkbox"
            name="disclaimerAccepted"
            label="Disclaimer confirming that the participant does not have any medical condition"
            onChange={onChange}
            checked={formData.disclaimerAccepted}
            variant="inputStyle3"
            containerStyle="flex items-baseline flex-row-reverse justify-end gap-4"
            labelStyle="font-normal"
            focus={false}
          />

          <CustomInput
            type="checkbox"
            name="termsAccepted"
            label="I understand and agree to the Terms and Conditions"
            onChange={onChange}
            checked={formData.termsAccepted}
            variant="inputStyle3"
            containerStyle="flex items-baseline flex-row-reverse justify-end gap-4"
            labelStyle="font-normal"
            focus={false}
          />
        </fieldset>
      </div>

      <div className="flex gap-4 justify-between pt-section">
        <Button
          variant="outlinePrimary"
          onClick={onBack}
          size={isMobile && "wFull"}
        >
          Back
        </Button>
        <Button
          variant="fillPrimary"
          onClick={onSubmit}
          className="px-12"
          disabled={
            !formData.paymentMethod ||
            !formData.disclaimerAccepted ||
            !formData.termsAccepted
          }
          size={isMobile && "wFull"}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default TripForm