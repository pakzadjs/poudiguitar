"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import SendOtpForm from "./SendOtpForm";
import { getOtp } from "@/services/authServices";

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
      <div className="flex justify-center">
        <div className="w-full sm:max-w-sm p-10 flex justify-center text-2xl font-bold">
          پودی گیتار
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-full sm:max-w-sm bg-white p-8 rounded-2xl">
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
