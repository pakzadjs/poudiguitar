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

import { createCategory } from "@/services/adminServices";
import TextField from "@/common/TextField";

const initialValues = {
  title: "",
  englishTitle: "",
  type: "",
  description: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  englishTitle: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[a-zA-Z0-9 ]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
  type: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  description: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddCategory() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: createCategory,
  });

  const sumbitHandler = async ({ title, englishTitle, type, description }) => {
    const formData = { title, englishTitle, type, description } || {};

    try {
      const { message } = await mutateAsync(formData);

      toast.success(message);
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
        <p>اضافه کردن دسته بندی جدید</p>
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
                اضافه کردن دسته بندی جدید
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField label="تیتر" name="title" formik={formik} />

                  <TextField label="slug" name="englishTitle" formik={formik} />

                  <TextField
                    label="توضیحات (توضیح کوتاه) "
                    name="description"
                    formik={formik}
                  />

                  {/* Select type */}
                  <div className="pt-8">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth variant="outlined">
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                          name="type"
                          labelId="demo-simple-select-label"
                          id="Type"
                          value={formik?.values["type"]}
                          label="Type"
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          sx={{
                            borderRadius: "12px",
                            border: "none",
                            background: "#F3F4F6",
                          }}
                        >
                          <MenuItem
                            value="course"
                            sx={{ borderRadius: "12px", paddingX: "10px" }}
                          >
                            Course
                          </MenuItem>

                          <MenuItem
                            value="downloadable"
                            sx={{ borderRadius: "12px", paddingX: "10px" }}
                          >
                            Downloadable
                          </MenuItem>
                        </Select>
                      </FormControl>

                      {formik?.touched["type"] && formik?.errors["type"] ? (
                        <div className="mb-1 mt-2 ml-2 text-rose-500 text-left text-xs font-bold">
                          {formik.errors["type"]}
                        </div>
                      ) : null}
                    </Box>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full"
                      isLoading={isLoading && true}
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
