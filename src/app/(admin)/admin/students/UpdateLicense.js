"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbEdit } from "react-icons/tb";
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
import { updateLicense } from "@/services/adminServices";

const validationSchema = Yup.object({
  user: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  product: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  key: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function UpdateLicense({ student }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const initialValues = {
    user: student?.user?._id,
    product: student?.product?._id,
    key: student?.license?.key,
  };

  const { isLoading: updateLicenseLoading, mutateAsync: updateLicenseMutate } = useMutation({
    mutationFn: updateLicense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      router.refresh(pathname);
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.response?.data?.data?.message);
    },
  });

  const addLicenceSumbitHandler = async ({ user, product, key }) => {
    const body = { user, product, license: { key: key } } || {};
    const id = student?._id;

    try {
      await updateLicenseMutate({ id, body });
    } catch (error) {}
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: addLicenceSumbitHandler,
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <button onClick={onOpen}>
        <TbEdit size={25} className="hover:text-slate-400 transition-all duration-250" />
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
                آپدیت لایسنس
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="آیدی کاربر"
                    name="user"
                    formik={formik}
                    placeholder={student?.user?.name}
                  />

                  <TextField
                    label="آیدی دوره"
                    name="product"
                    formik={formik}
                    placeholder={student?.product?.title}
                  />

                  <TextField label="لایسنس" name="key" formik={formik} />

                  <div className="pt-2">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full"
                      isLoading={updateLicenseLoading}
                      isDisabled={!formik.isValid}
                      onPress={onClose}
                    >
                      ثبت
                    </Button>
                  </div>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className="font-bold">
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
