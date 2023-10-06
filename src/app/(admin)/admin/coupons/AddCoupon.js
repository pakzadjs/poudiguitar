"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { TbPlus } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import TextField from "@/common/TextField";

const initialValues = {
  type: "",
  code: "",
  amount: "",
  usageLimit: "",
  productIds: "",
  expireDate: "",
};

const validationSchema = Yup.object({});

export default function AddCoupon() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  // const { isLoading, mutateAsync } = useMutation({
  //   mutationFn: createCoupon,
  // });

  const sumbitHandler = async () => {
    const body = {} || {};

    try {
      // const { message } = await mutateAsync(body);

      // toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: sumbitHandler,
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:text-green-500 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl  flex justify-center transition-all duration-250"
      >
        <p>اضافه کردن کد تخفیف جدید</p>
        <TbPlus size={25} />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="4xl"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold">
                اضافه کردن کد تخفیف جدید
              </ModalHeader>

              <ModalBody></ModalBody>

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
