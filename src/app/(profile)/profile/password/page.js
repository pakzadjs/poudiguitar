"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@/common/TextField";
import { updateProfile } from "@/services/authServices";

const initialPasswordValues = {
  newPassword: "",
  confirmNewPassword: "",
};

const passwordValidationSchema = Yup.object({
  newPassword: Yup.string()
    .required("یک گذرواژه وارد کنید")
    .min(6, "گذرواژه حداقل باید شش کارکتر داشته باشد")
    .matches(/[0-9]/, "گذرواژه باید دارای شماره باشد")
    .matches(/[a-z]/, "گذرواژه باید دارای واژه انگلیسی باشد")
    .matches(/[!@#$%^&()_+]/, "حداقل یک واژه مخصوص وارد کنید (!@#$%^&()_+)")
    .matches(/^\S*$/, "فضای خالی در گذرواژه مجاز نیست"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "تکرار گذرواژه را درست وارد کنید")
    .required("تکرار گذرواژه را وارد کنید"),
});

export default function ChangePassword() {
  const router = useRouter();

  const { isLoading: passwordLoading, mutateAsync: mutatePassword } = useMutation({
    mutationFn: updateProfile,
  });

  const passwordSumbitHandler = async ({ newPassword: password }) => {
    try {
      const { message } = await mutatePassword({ password });
      toast.success(message);
      router.push("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.data?.message);
    }
  };

  const passwordFormik = useFormik({
    initialValues: initialPasswordValues,
    onSubmit: passwordSumbitHandler,
    validationSchema: passwordValidationSchema,
    validateOnMount: true,
  });

  if (passwordLoading)
    return <Spinner color="primary" size="lg" className="flex items-center justify-center" />;
  return (
    <div className="max-w-md px-5">
      <h1 className="text-xl  font-extrabold mb-4 mr-1">ویرایش گذرواژه</h1>

      <form
        onSubmit={passwordFormik.handleSubmit}
        className="space-y-5 p-10 bg-blue-950/50 rounded-xl"
      >
        <TextField
          label="گذرواژه جدید"
          name="newPassword"
          type={"password"}
          formik={passwordFormik}
        />

        <TextField
          label="تکرار گذرواژه"
          name="confirmNewPassword"
          type={"password"}
          formik={passwordFormik}
        />

        <div className="pt-2">
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={passwordLoading && true}
            isDisabled={!passwordFormik.isValid}
          >
            ثبت تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
}
