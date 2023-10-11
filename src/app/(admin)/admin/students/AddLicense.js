"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbPlus, TbSquareKey } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import TextField from "@/common/TextField";
import { addLicence, generateLicence } from "@/services/adminServices";
import CopyToClipboard from "@/components/CopyToClipboard";
import copyTextToClipboard from "@/utils/copyToClipboardFn";

const initialAddLicenceValues = {
  user: "",
  product: "",
  key: "",
};

const initialGenerateLicenceValues = {
  user: "",
  product: "",
};

const addLicenceValidationSchema = Yup.object({
  user: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  product: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  key: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

const generateLicenceValidationSchema = Yup.object({
  user: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  product: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddLicence() {
  const [step, setStep] = useState(1);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const { isLoading: addLicenceLoading, mutateAsync: addLicenceMutate } = useMutation({
    mutationFn: addLicence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      router.refresh(pathname);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.response?.data?.data?.message);
    },
  });

  const {
    isLoading: generateLicenceLoading,
    mutateAsync: generateLicenceMutate,
    data: generateLicenceData,
  } = useMutation({
    mutationFn: generateLicence,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      router.refresh(pathname);
      toast.success("لایسنس با موفقیت ایجاد و کپی شد");
      console.log(data?.spotLicence?.key);
      copyTextToClipboard(data?.spotLicence?.key);
      setStep(3);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.response?.data?.data?.message);
    },
  });

  const addLicenceSumbitHandler = async ({ user, product, key }) => {
    const body = { user, product, licence: { key: key } } || {};

    try {
      const { message } = await addLicenceMutate(body);
      toast.success(message);
    } catch (error) {}
  };

  const generateLicenceSumbitHandler = async ({ user, product }) => {
    try {
      await generateLicenceMutate({ userID: user, productID: product });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: initialAddLicenceValues,
    onSubmit: addLicenceSumbitHandler,
    validationSchema: addLicenceValidationSchema,
    validateOnMount: true,
  });

  const generateLicenceFormik = useFormik({
    initialValues: initialGenerateLicenceValues,
    onSubmit: generateLicenceSumbitHandler,
    validationSchema: generateLicenceValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = (onClose) => {
    switch (step) {
      case 1:
        return (
          <>
            <form onSubmit={formik.handleSubmit} className="space-y-5 md:p-10 p-5 rounded-xl">
              <TextField label="آیدی کاربر" name="user" formik={formik} />

              <TextField label="آیدی دوره" name="product" formik={formik} />

              <TextField label="لایسنس" name="key" formik={formik} />

              <div className="pt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={addLicenceLoading}
                  isDisabled={!formik.isValid}
                  onPress={onClose}
                >
                  ثبت
                </Button>
              </div>
            </form>
          </>
        );
      case 2:
        return (
          <>
            <form
              onSubmit={generateLicenceFormik.handleSubmit}
              className="space-y-5 md:p-10 p-5 rounded-xl"
            >
              <TextField label="آیدی کاربر" name="user" formik={generateLicenceFormik} />

              <TextField label="آیدی دوره" name="product" formik={generateLicenceFormik} />

              <div className="pt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={generateLicenceLoading}
                  isDisabled={!generateLicenceFormik.isValid}
                >
                  ثبت
                </Button>
              </div>
            </form>
          </>
        );
      case 3:
        return (
          <div className="mb-3 m-auto w-full">
            <CopyToClipboard
              copyText={generateLicenceData?.spotLicence?.key}
              title={"کپی لایسنس"}
              style="w-full flex justify-center"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="p-2 rounded-lg hover:bg-slate-100/50 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
      >
        <TbPlus size={25} />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold flex max-md:flex-col justify-between w-full">
                {step == 1 && (
                  <>
                    <div className="max-md:m-auto pt-1 pr-1">اضافه کردن لایسنس به کاربر</div>
                    <button
                      onClick={() => setStep(2)}
                      className="flex gap-1 text-base font-normal btn max-md:mt-6"
                    >
                      <TbSquareKey size={27} className="text-slate-100" />
                      <span>ساختن لایسنس</span>
                    </button>
                  </>
                )}

                {step == 2 && (
                  <>
                    <div className="max-md:m-auto pt-1 pr-1">ساختن لایسنس</div>
                    <button
                      onClick={() => setStep(1)}
                      className="flex justify-center items-center gap-1 text-base font-normal btn max-md:mt-6"
                    >
                      <TbPlus size={23} className="text-slate-100" />
                      <span>اضافه کردن لایسنس به کاربر</span>
                    </button>
                  </>
                )}

                {step == 3 && (
                  <>
                    <div className="max-md:m-auto pt-1 pr-1">لایسنس را کپی کنید</div>
                    <button
                      onClick={() => setStep(1)}
                      className="flex justify-center items-center gap-1 text-base font-normal btn__fourth max-md:mt-6"
                    >
                      <TbPlus size={23} className="text-slate-100" />
                      <span>اضافه کردن لایسنس به کاربر</span>
                    </button>
                  </>
                )}
              </ModalHeader>

              <ModalBody>{renderSteps(onClose)}</ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => setStep(1)}
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-bold"
                >
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
