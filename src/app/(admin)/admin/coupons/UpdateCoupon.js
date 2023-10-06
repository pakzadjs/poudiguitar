import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { TbEdit } from "react-icons/tb";
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

export default function UpdateCoupon({ id, category }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  // const { isLoading, mutateAsync } = useMutation({
  //   mutationFn: updateCaoupon,
  // });

  // const sumbitHandler = async ({}) => {
  //   const body = {} || {};

  //   try {
  //     const { message } = await mutateAsync({ body, id });

  //     toast.success(message);
  //     router.refresh(pathname);
  //   } catch (error) {
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  // const formik = useFormik({
  //   initialValues: initialValues,
  //   onSubmit: sumbitHandler,
  //   validationSchema: validationSchema,
  //   validateOnMount: true,
  // });

  return (
    <div>
      <button onClick={onOpen}>
        <TbEdit size={25} className="hover:text-slate-400 transition-all duration-250" />
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
              <ModalHeader className="text-xl font-extrabold">آپدیت کردن کد تخفیف</ModalHeader>

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
    </div>
  );
}
