"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import SendOTPForm from "./SendOTPForm";
import CheckOTPForm from "./CheckOTPForm";
import { checkOtp, getOtp } from "@/services/authServices";
const RESEND_TIME = 90;

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(2);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);

  const {
    data: otpResponse,
    isLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { isLoading: checkOtpLoading, mutateAsync: mutateCheckOtp } = useMutation({
    mutationFn: checkOtp,
  });

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(data.message);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            onSubmit={sendOtpHandler}
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            isLoading={isLoading}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => setStep((s) => s - 1)}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="mt-16">
      <Image
        src="/images/studio-hero.png"
        alt="Hero Image"
        width={1980}
        height={1320}
        className="w-full blur-[2px] absolute left-0 top-0 pointer-events-none z-0"
      />

      <div className="flex justify-center relative">
        <div className="w-full sm:max-w-sm p-10 flex justify-center text-2xl font-bold">
          درود بر تو جوون هنرمند!
        </div>
      </div>

      <div className="flex justify-center relative">
        <div className="w-full sm:max-w-sm bg-gray-900/80 p-8 rounded-2xl before:conte">
          <h2 className="font-extrabold text-lg p-3">ورود | ثبت نام</h2>
          <hr className="mb-8 border-gray-700 border-small rounded-3xl" />
          {renderSteps()}
        </div>
      </div>
    </div>
  );
}
