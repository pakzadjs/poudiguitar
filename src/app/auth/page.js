"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import SendOtpForm from "./SendOtpForm";
import { getOtp } from "@/services/authServices";
import Image from "next/image";

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");

  const {
    data,
    error,
    isLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
          <h2 className="font-extrabold text-lg mb-8">ورود | ثبت نام</h2>
          <SendOtpForm
            onSubmit={sendOtpHandler}
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
