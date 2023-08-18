"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useGetUser } from "@/hooks/useAuth";
import TextField from "@/common/TextField";
import { updateProfile } from "@/services/authServices";

const initialUserProfileValues = {
  name: "",
  email: "",
  biography: "",
};

const userProfileValidationSchema = Yup.object({
  biography: Yup.string().min(6, "بیشتر از شش کارکتر وارد کن"),
  name: Yup.string()
    .required("نام کامل خود را وارد کنید")
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خود را فارسی وارد کنید")
    .min(6, "نام کامل خود را وارد کنید"),
  email: Yup.string().required("ایمیل خود را وارد کنید").email("ایمیل وارد شده صحیح نمی باشد"),
});

export default function Me() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });

  const sumbitHandler = async ({ name, email, biography }) => {
    const formData = { name, email, biography };

    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues: initialUserProfileValues,
    onSubmit: sumbitHandler,
    validationSchema: userProfileValidationSchema,
    validateOnMount: true,
  });

  if (isLoading)
    return <Spinner color="primary" size="lg" className="flex items-center justify-center" />;
  return (
    <div className="max-w-md px-5">
      <h1 className="text-xl  font-extrabold mb-4 mr-1">اطلاعات حساب</h1>
      <div className="text-gray-400 text-sm mb-4 mr-1 flex items-center">
        <HiOutlineExclamationCircle size={20} className="ml-1" /> شماره موبایل قابل ویرایش نیست
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="space-y-5 p-10 bg-blue-950/50 rounded-xl"
      >
        <TextField
          label="نام و نام خانوادگی"
          name="name"
          formik={formik}
          placeholder={user?.name}
        />
        <TextField label="ایمیل" name="email" formik={formik} placeholder={user?.email} />
        <TextField
          label="حوزه تخصصی"
          name="biography"
          formik={formik}
          placeholder={user?.biography}
        />

        <div className="pt-2">
          {isUpdating ? (
            "loading"
          ) : (
            <Button
              type="submit"
              color="primary"
              className="w-full"
              isLoading={isLoading && true}
              isDisabled={!formik.isValid}
            >
              ثبت تغییرات
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
