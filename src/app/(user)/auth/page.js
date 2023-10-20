"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import SendOTPForm from "./SendOtpForm";
import CheckOTPForm from "./CheckOTPForm";
import { checkOtp, getOtp } from "@/services/authServices";
const RESEND_TIME = 90;

const initialAuthValues = {
  phoneNumber: localStorage.getItem("phoneNumber") || "",
};

const authValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("شماره موبایل خود را وارد کنید")
    .matches(/^(0)?9\d{9}$/, "شماره موبایل معتبر را وارد کنید"),
});

export default function AuthPage() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [time, setTime] = useState(RESEND_TIME);
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    data: otpResponse,
    isLoading: getOtpLoading,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { isLoading: checkOtpLoading, mutateAsync: mutateCheckOtp } = useMutation({
    mutationFn: checkOtp,
  });

  const sendOtpHandler = async (values) => {
    const { phoneNumber } = values;

    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);

      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده، یکم دیرتر امتحان کن");
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    const { phoneNumber } = authFormik.values;
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });

      toast.success(message);
      if (user.isActive) {
        router.push("/");
        queryClient.invalidateQueries({ queryKey: ["get-user"] });
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده، یکم دیرتر امتحان کن");
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const authFormik = useFormik({
    initialValues: initialAuthValues,
    onSubmit: sendOtpHandler,
    validationSchema: authValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <SendOTPForm
            onSubmit={authFormik.handleSubmit}
            isLoading={getOtpLoading}
            formik={authFormik}
          />
        );
      case 2:
        return (
          <CheckOTPForm
            onBack={() => {
              // setStep((s) => s - 1);
              document.location.href = "/auth";
            }}
            otp={otp}
            setOtp={setOtp}
            onSubmit={checkOtpHandler}
            time={time}
            onResendOtp={() => sendOtpHandler(authFormik.values)}
            otpResponse={otpResponse}
            isCheckingOtp={checkOtpLoading}
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
        <div className="w-full sm:max-w-sm bg-gray-900/80 p-8 rounded-2xl">
          <h2 className="font-extrabold text-lg p-3">ورود | ثبت نام</h2>
          <hr className="mb-8 border-gray-700 border-small rounded-3xl" />
          {renderSteps()}
        </div>
      </div>
    </div>
  );
}
