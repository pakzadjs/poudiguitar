"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { Button } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";

import { completeProfile } from "@/services/authServices";
import TextField from "@/common/TextField";

const initialValues = {
  name: "",
  email: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("نام خود را وارد کنید")
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خود را فارسی وارد کنید")
    .min(5, "نام کامل خود را وارد کنید"),
  email: Yup.string().required("ایمیل خود را وارد کنید").email("ایمیل وارد شده صحیح نمی باشد"),
});

export default function CompleteProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: completeProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      router.push("/");
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const onSubmit = async (values) => {
    const { name, email } = values;
    try {
      await mutateAsync({ name, email });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  return (
    <div className="flex justify-center">
      <Image
        src="/images/studio-hero.png"
        alt="Hero Image"
        width={1980}
        height={1320}
        className="w-full blur-[2px] absolute left-0 top-0 pointer-events-none z-0"
      />
      <div className="w-full sm:max-w-sm z-10 bg-gray-900/80 p-8 rounded-2xl">
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <TextField name="name" label="نام و نام خانوادگی" formik={formik} />
          <TextField name="email" label="ایمیل" formik={formik} />
          <div>
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isLoading && true}
              isDisabled={!formik.isValid}
            >
              تایید
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
