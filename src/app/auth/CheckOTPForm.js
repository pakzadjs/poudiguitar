import { Button } from "@nextui-org/react";
import OTPInput from "react-otp-input";

import { HiArrowNarrowRight } from "react-icons/hi";
import { TbEdit } from "react-icons/tb";

export default function CheckOTPForm({
  onSubmit,
  otp,
  setOtp,
  onBack,
  time,
  onResendOtp,
  otpResponse,
}) {
  return (
    <div>
      <button onClick={onBack} className="btn-secendary">
        <HiArrowNarrowRight className="w-6 h-6 text-primary-500" />
      </button>

      {otpResponse && (
        <p className="text-xs text-gray-300 flex items-center mb-2">
          {otpResponse?.message}
          <button onClick={onBack} className="mr-1">
            <TbEdit className="w-6 h-6 text-primary-500 hover:text-gray-300 transition-all duration-250" />
          </button>
        </p>
      )}

      <form className="space-y-7" onSubmit={onSubmit}>
        <p className="font-bold">کد تایید را وارد کنید</p>

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: "2.5rem",
            padding: "0.5rem 0.2rem",
            borderRadius: "0.5rem",
          }}
          containerStyle="flex flex-row-reverse gap-x-1 justify-center text-black"
          renderInput={(props) => <input type="number" {...props} />}
        />

        <div className="text-primary-400 hover:text-gray-100 transition-all duration-250 flex justify-center">
          {time > 0 ? (
            <p>{time} ثانیه تا ارسال مجدد کد</p>
          ) : (
            <button onClick={onResendOtp}>دریافت مجدد کد تایید</button>
          )}
        </div>

        <Button type="submit" color="primary" variant="shadow" className="w-full">
          تایید
        </Button>
      </form>
    </div>
  );
}
