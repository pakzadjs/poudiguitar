import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

import TextField from "@/common/TextField";
import { Button } from "@nextui-org/react";
import { login } from "@/services/authServices";

const initialLoginWithPassValues = {
  phoneNumber: "",
  password: "",
};

const loginWithPassValidationSchema = Yup.object({
  phoneNumber: Yup.string()
    .required("شماره موبایل خود را وارد کنید")
    .matches(/^(0)?9\d{9}$/, "شماره موبایل معتبر را وارد کنید"),
  password: Yup.string()
    .required("گذرواژه خود را وارد کنید")
    .matches(/^\S*$/, "فضای خالی در گذرواژه مجاز نیست")
    .min(6, "حداقل شش کارکتر وارد کنید"),
});

export default function SendOTPForm({ onSubmit, isLoading, formik }) {
  const [loginWithPass, setLoginWithPass] = useState(true);
  const router = useRouter();

  const { isLoading: LoginLoading, mutateAsync: mutateLogin } = useMutation({
    mutationFn: login,
  });

  const loginHandler = async (values) => {
    const { phoneNumber, password } = values;

    try {
      const data = await mutateLogin({ phoneNumber, password });
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطایی رخ داده، یکم دیرتر امتحان کن");
    }
  };

  const loginFormik = useFormik({
    initialValues: initialLoginWithPassValues,
    onSubmit: loginHandler,
    validationSchema: loginWithPassValidationSchema,
    validateOnMount: true,
  });

  return (
    <Fragment>
      {loginWithPass ? (
        <form className="space-y-10" onSubmit={loginFormik.handleSubmit}>
          <div className="space-y-3">
            <TextField
              label="لطفا شماره موبایل خود را وارد کنید"
              name="phoneNumber"
              type={"tel"}
              formik={loginFormik}
            />
            <TextField
              label="لطفا رمز خود را وارد کنید"
              name="password"
              type={"password"}
              formik={loginFormik}
            />
          </div>
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full"
            isLoading={LoginLoading && true}
            isDisabled={!loginFormik.isValid}
          >
            ورود
          </Button>

          <button
            onClick={() => setLoginWithPass(false)}
            className="hover:text-blue-500 transition-all duration-250"
          >
            ورود با رمز یکبار مصرف
          </button>
        </form>
      ) : (
        <form className="space-y-10" onSubmit={onSubmit}>
          <TextField
            label="لطفا شماره موبایل خود را وارد کنید"
            name="phoneNumber"
            type={"tel"}
            formik={formik}
          />
          <Button
            type="submit"
            color="primary"
            variant="shadow"
            className="w-full"
            isLoading={isLoading && true}
            isDisabled={!formik.isValid}
          >
            ارسال کد تایید
          </Button>

          <button
            onClick={() => setLoginWithPass(true)}
            className="hover:text-blue-500 transition-all duration-250"
          >
            ورود بدون رمز یکبار مصرف
          </button>
        </form>
      )}
    </Fragment>
  );
}
