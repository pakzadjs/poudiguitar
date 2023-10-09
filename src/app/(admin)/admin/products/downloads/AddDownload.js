"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import { createProduct } from "@/services/adminServices";
import TextField from "@/common/TextField";
import vazirFont from "@/constants/localFonts";

const initialValues = {
  title: "",
  slug: "",
  descriptionSummary: "",
  tag: "",
  category: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  slug: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[a-zA-Z0-9-]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
  descriptionSummary: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  tag: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  category: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddDownload({ categories }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: createProduct,
  });

  const sumbitHandler = async ({ title, slug, descriptionSummary, category }) => {
    const body =
      {
        title,
        description: "#",
        descriptionSummary,
        slug,
        tags: ["", formik?.values?.tag],
        imageLink: "#",
        brand: "#",
        price: 0,
        discount: 0,
        offPrice: 0,
        lessons: [],
        FAQ: [],
        countInStock: 999999,
        spotCourse: "#",
        lessonsNumber: 0,
        type: "downloadable",
        file: "#",
        channel: "#",
        category,
      } || {};

    try {
      const { message } = await mutateAsync(body);
      queryClient.invalidateQueries({ queryKey: ["get-downloads"] });

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
        className="hover:text-green-500 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
      >
        <p>اضافه کردن دانلود جدید</p>
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
                اضافه کردن دانلود جدید
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField label="تیتر" name="title" formik={formik} />

                  <TextField label="slug" name="slug" formik={formik} />

                  <TextField
                    label="توضیحات (توضیح کوتاه)"
                    name="descriptionSummary"
                    formik={formik}
                  />

                  <TextField label="حجم (مثال: 2GB)" name="tag" formik={formik} />

                  {/* Select Category */}
                  <Box sx={{ minWidth: 120 }}>
                    <label htmlFor="category" id="category" className="block mb-3">
                      دسته بندی
                    </label>

                    <FormControl fullWidth variant="outlined">
                      {/* <InputLabel id="category">دسته بندی</InputLabel> */}
                      <Select
                        name="category"
                        labelId="demo-simple-select-label"
                        id="Category"
                        value={formik?.values["category"]}
                        label="دسته بندی"
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        sx={{
                          borderRadius: "12px",
                          border: "none",
                          background: "#F3F4F6",
                        }}
                      >
                        {categories?.map((category, index) => {
                          return (
                            <MenuItem
                              key={index}
                              value={category?._id}
                              sx={{ borderRadius: "12px", paddingX: "10px" }}
                            >
                              <h6 className={`${vazirFont.variable} font-sans`}>
                                {category?.title}
                              </h6>
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>

                    {formik?.touched["category"] && formik?.errors["category"] ? (
                      <div className="mb-1 mt-2 ml-2 text-rose-500 text-left text-xs font-bold">
                        {formik.errors["category"]}
                      </div>
                    ) : null}
                  </Box>

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
