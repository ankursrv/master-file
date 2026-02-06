import React, { useState } from "react"
import { Button } from "@/components/atoms/rocksport-b2b/button"
import CustomImage from "@/components/molecules/customImage"
import Typography from "@/components/molecules/typography/typography"
import Link from "next/link"
import CustomInput from "@/components/atoms/customInput"
import Icons from "@/components/atoms/icons"
import useIsMobile from "@/lib/useIsMobile"
import { cn } from "@/lib/utils"

const ThankYouScreen = ({ onSendOtp }) => {
  const isMobile = useIsMobile ();
  return (
    <>
      <div className="flex flex-col items-center bg-decorator-white w-full rounded-2xl p-6">
        <div className="flex items-center justify-center">
          <CustomImage
            src="/images/rocksport-b2b-images/thank.svg"
            width={115}
            height={115}
            alt="booking success"
          />
        </div>
        <Typography variant="h3" className="!font-semibold">
          Thank You For Booking With Us
        </Typography>
        <div className="md:w-[380px] mt-11">
          <CustomInput
            type="number"
            value="number"
            rightIcon={<Icons.Edit />}
            disabled
          />
          <Link href="#" className="text-theme-primary underline text-[12px] mt-5">
            T&C
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-8 md:mt-11">
        <Button
          variant="fillPrimary"
          onClick={onSendOtp}
          className="!px-10"
          size={isMobile && "wFull"}
        >
          Request OTP
        </Button>
      </div>
    </>
  )
}

const OtpVerification = ({ onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleChange = (value, index) => {
    const updated = [...otp]
    updated[index] = value.slice(-1)
    setOtp(updated)
  }
const isMobile = useIsMobile ();
  return (
    <>
      <div className="flex flex-col items-center bg-decorator-white w-full rounded-2xl px-6 py-6 md:py-20">
        <Typography variant="h3" className="!font-semibold">OTP Verification</Typography>
        <div className="mt-11">
          <Typography variant="p" className="font-semibold capitalize">Please enter the OTP sent to <span className="inline-block text-theme-primary">6861738343</span> </Typography>
          <div className="flex justify-center gap-2 md:gap-3 py-3">
            {otp.map((digit, i) => (
              <CustomInput
                key={i}
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                inputContainer={cn("!w-[90px] placeholder:text-center" ,isMobile && "!w-10 h-10 !px-3")}
                maxLength={1}
                placeholder="-"
              />
            ))}
          </div>
          <p className="text-[12px] font-semibold">Didn’t receive OTP? <span className="inline-block text-theme-primary">Didn’t receive OTP? Resend</span></p>
        </div>
      </div>
      <div className="flex justify-center mt-11">
        <Button variant="fillPrimary" onClick={onVerify} className="!px-10">
          submit
        </Button>
      </div>
    </>
  )
}

const SuccessScreen = () => {
  return (
    <>
      <div className="flex flex-col items-center bg-decorator-white rounded-2xl px-6 py-6 md:py-14">
        <div className="flex justify-center">
          <CustomImage
            src="/images/rocksport-b2b-images/success.webp"
            width={300}
            height={247}
            alt="booking success"
          />
        </div>

        <Typography variant="h3" className="!font-semibold capitalize md:w-[640px] text-center md:leading-snug">
          The Indemnity Process Has Been Successfully Completed
        </Typography>
      </div>
    </>
  )
}

export { ThankYouScreen, OtpVerification, SuccessScreen }