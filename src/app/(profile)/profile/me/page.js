"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Spinner } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegHandPointDown } from "react-icons/fa";

import { useGetUser } from "@/hooks/useAuth";
import TextField from "@/common/TextField";
import { changeAvatar, updateProfile } from "@/services/authServices";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

const userProfileValidationSchema = Yup.object({
  biography: Yup.string(),
  name: Yup.string()
    .matches(/^[\u0600-\u06FF\s]+$/, "نام خود را فارسی وارد کنید")
    .min(6, "نام کامل خود را وارد کنید"),
  email: Yup.string().email("ایمیل وارد شده صحیح نمی باشد"),
});

export default function Me() {
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const initialUserProfileValues = {
    name: user?.name,
    email: user?.email,
    biography: user?.biography || "",
  };

  const { isLoading: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });

  const { isLoading: avatarLoading, mutateAsync: mutateAvatar } = useMutation({
    mutationFn: changeAvatar,
  });

  const chooseFileHandler = async (event) => {
    const file = event.target.files[0];
    const mb = file?.size / 1000000;
    const filetype = file?.type;

    if (file) {
      if ((mb <= 2 && filetype === "image/jpeg") || (mb <= 2 && filetype === "image/png")) {
        try {
          const formData = new FormData();
          formData.append("avatar", file);

          const { data } = await mutateAvatar(formData);
          queryClient.invalidateQueries({ queryKey: ["get-user"] });

          router.refresh(pathname);
          toast.success("آواتار با موفقیت آپلود شد");
        } catch (error) {
          toast.error("Something went wrong!");
        }
      } else {
        toast.error("فقط فایل با فرمت jpg, png و با حجم زیر دو مگابایت مجاز است");
      }
    }
  };

  const sumbitHandler = async ({ name, email, biography }) => {
    const formData = { name, email, biography };

    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
      router.refresh(pathname);
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

      {/* Avatar */}
      <div className="space-y-5 p-10 bg-blue-950/50 rounded-xl mb-5 flex flex-col justify-center items-center">
        <h5 className="font-semibold max-[900px]:mb-1 max-[900px]:p-3">آپلود عکس</h5>
        <div className="flex items-center p-2">
          {user?.avatar ? (
            <img
              className="rounded-full"
              src={`${baseUrl}/public/uploads/avatars/${user?.avatar}`}
              width={100}
              alt="avatar"
            />
          ) : (
            <img className="rounded-full" src="/images/avatar.png" width={100} alt="avatar" />
          )}
        </div>

        <div className="flex items-center gap-1">
          <p>یک عکس انتخاب کنید</p> <FaRegHandPointDown />
        </div>

        <input
          type="file"
          name="file"
          onChange={chooseFileHandler}
          className="w-[300px] max-[500px]:w-full bg-blue-900/30 px-3 py-2 rounded-lg text-xs text-[#696969] cursor-pointer max-[900px]:p-6 max-[900px]:mb-4"
        />

        {avatarLoading && (
          <Spinner color="primary" size="lg" className="flex items-center justify-center" />
        )}
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
          <Button
            type="submit"
            color="primary"
            className="w-full"
            isLoading={isUpdating && true}
            isDisabled={!formik.isValid}
          >
            ثبت تغییرات
          </Button>
        </div>
      </form>
    </div>
  );
}
