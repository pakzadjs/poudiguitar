"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  price: "",
  discount: "",
  offPrice: "",
  spotCourse: "",
  lessonsNumber: "",
  tag1: "",
  tag2: "",
  channel: "",
  category: "",
};

const validationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  slug: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[a-zA-Z0-9-]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
  descriptionSummary: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  price: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است"),
  discount: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است"),
  offPrice: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است"),
  spotCourse: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  lessonsNumber: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است"),
  tag1: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[0-9]+$/, "فقط اعداد مجاز است"),
  tag2: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  channel: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  category: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddCourse({ categories }) {
  const [inputDescription, setInputDescription] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: createProduct,
  });

  const sumbitHandler = async ({
    title,
    slug,
    descriptionSummary,
    price,
    discount,
    offPrice,
    spotCourse,
    lessonsNumber,
    channel,
    category,
  }) => {
    const body =
      {
        title,
        description: inputDescription,
        descriptionSummary,
        slug,
        tags: [formik?.values?.tag1, formik?.values?.tag2],
        imageLink: "#",
        brand: "#",
        price,
        discount,
        offPrice,
        lessons: [],
        FAQ: [],
        countInStock: 999999,
        spotCourse,
        lessonsNumber,
        type: "course",
        file: "#",
        channel,
        category,
      } || {};

    try {
      const { message } = await mutateAsync(body);
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });

      toast.success("دوره با موفقیت اضافه شد");
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.data?.message || error?.response?.data?.message);
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
        <p>اضافه کردن دوره جدید</p>
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
                اضافه کردن دوره جدید
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

                  <TextField label="قیمت" name="price" formik={formik} />

                  <TextField label="تخفیف (درصد)" name="discount" formik={formik} />

                  <TextField label="قیمت بعد تخفیف" name="offPrice" formik={formik} />

                  <TextField label="کد اسپات پلیر دوره" name="spotCourse" formik={formik} />

                  <TextField label="تعداد درس ها" name="lessonsNumber" formik={formik} />

                  <TextField label="زمان دروس" name="tag1" formik={formik} />

                  <TextField label="تگ" name="tag2" formik={formik} />

                  <TextField label="کانال تلگرام دوره (لینک)" name="channel" formik={formik} />

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

                  {/* Description */}
                  <div className="">
                    <h2 className="mb-2">توضیحات کامل</h2>

                    <div className="bg-white rounded-2xl p-3 mb-2">
                      <CKEditor
                        editor={ClassicEditor}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          if (data && formik.isValid == true) {
                            setIsValid(true);
                          } else {
                            setIsValid(false);
                          }

                          setInputDescription(data);
                        }}

                        // onReady={(editor) => {
                        //   // You can store the "editor" and use when it is needed.
                        //   console.log("Editor is ready to use!", editor);
                        // }}

                        // onBlur={(event, editor) => {
                        //   console.log("Blur.", editor);
                        // }}
                        // onFocus={(event, editor) => {
                        //   console.log("Focus.", editor);
                        // }}
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full"
                      isLoading={isLoading && true}
                      isDisabled={!isValid}
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
