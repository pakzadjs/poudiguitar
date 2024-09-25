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
import { addLicense, generateLicense } from "@/services/adminServices";
import CopyToClipboard from "@/components/CopyToClipboard";
import copyTextToClipboard from "@/utils/copyToClipboardFn";

const initialAddLicenseValues = {
  user: "",
  product: "",
  key: "",
};

const initialGenerateLicenseValues = {
  user: "",
  product: "",
};

const addLicenseValidationSchema = Yup.object({
  user: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  product: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  key: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

const generateLicenseValidationSchema = Yup.object({
  user: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  product: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddLicense() {
  const [step, setStep] = useState(1);
  const [addLicenseValues, setAddLicenseValues] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const { isLoading: addLicenseLoading, mutateAsync: addLicenseMutate } =
    useMutation({
      mutationFn: addLicense,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["get-students"] });
        router.refresh(pathname);
        toast.success(data?.message);
        setStep(1);

        console.log("data", data);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.data?.message
        );
      },
    });

  const {
    isLoading: generateLicenseLoading,
    mutateAsync: generateLicenseMutate,
    data: generateLicenseData,
  } = useMutation({
    mutationFn: generateLicense,
    onSuccess: (data) => {
      toast.success("لایسنس با موفقیت ایجاد شد");
      setStep(2);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.data?.message
      );
    },
  });

  const addLicenseSumbitHandler = async () => {
    try {
      console.log(addLicenseValues);
      await addLicenseMutate(addLicenseValues);
    } catch (error) {}
  };

  const generateLicenseSumbitHandler = async ({ user, product }) => {
    try {
      const data = await generateLicenseMutate({ userID: user, productID: product });

      setAddLicenseValues({
        user,
        product,
        license: { key: data?.spotLicence?.key },
      });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: initialAddLicenseValues,
    onSubmit: addLicenseSumbitHandler,
    validationSchema: addLicenseValidationSchema,
    validateOnMount: true,
  });

  const generateLicenseFormik = useFormik({
    initialValues: initialGenerateLicenseValues,
    onSubmit: generateLicenseSumbitHandler,
    validationSchema: generateLicenseValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = (onClose) => {
    switch (step) {
      case 1:
        return (
          <>
            <form
              onSubmit={generateLicenseFormik.handleSubmit}
              className="space-y-5 md:p-10 p-5 rounded-xl"
            >
              <TextField
                label="آیدی کاربر"
                name="user"
                formik={generateLicenseFormik}
              />

              <TextField
                label="آیدی دوره"
                name="product"
                formik={generateLicenseFormik}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={generateLicenseLoading}
                  isDisabled={!generateLicenseFormik.isValid}
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
            <div className="space-y-5 md:p-10 p-5 rounded-xl">
              <div className="pt-2">
                <Button
                  // type="submit"
                  color="primary"
                  className="w-full"
                  isLoading={addLicenseLoading}
                  // isDisabled={!formik.isValid}
                  onPress={onClose}
                  onClick={addLicenseSumbitHandler}
                >
                  ثبت
                </Button>
              </div>
            </div>
          </>
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
                  <div className="max-md:m-auto pt-1 pr-1">ساختن لایسنس</div>
                )}

                {step == 2 && (
                  <div className="max-md:m-auto pt-1 pr-1">تایید لایسنس</div>
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
