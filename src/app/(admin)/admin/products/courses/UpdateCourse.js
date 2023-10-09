"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-hot-toast";
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

import { updateProduct } from "@/services/adminServices";
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
    .matches(/^[a-zA-Z0-9-]+$/, "فقط متن انگلیسی و اعداد و - مجاز است"),
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

export default function UpdateCourse({ course, categories }) {
  const [inputDescription, setInputDescription] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateProduct,
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
        // imageLink: course?.imageLink,
        // brand: course?.brand,
        price,
        discount,
        offPrice,
        // lessons: course?.lessons,
        // FAQ: course?.FAQ,
        // countInStock: 999999,
        spotCourse,
        lessonsNumber,
        // type: "course",
        // file: "#",
        channel,
        category,
      } || {};

    const id = course?._id;

    try {
      const { message } = await mutateAsync({ id, body });
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });

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
              <ModalHeader className="text-xl font-extrabold">آپدیت کردن دوره</ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="تیتر"
                    name="title"
                    formik={formik}
                    placeholder={course?.title}
                  />

                  <TextField
                    label="slug"
                    name="slug"
                    formik={formik}
                    placeholder={course?.slug}
                  />

                  <TextField
                    label="توضیحات (توضیح کوتاه)"
                    name="descriptionSummary"
                    formik={formik}
                    placeholder={course?.descriptionSummary}
                  />

                  <TextField
                    label="قیمت"
                    name="price"
                    formik={formik}
                    placeholder={course?.price}
                  />

                  <TextField
                    label="تخفیف (درصد)"
                    name="discount"
                    formik={formik}
                    placeholder={course?.discount}
                  />

                  <TextField
                    label="قیمت بعد تخفیف"
                    name="offPrice"
                    formik={formik}
                    placeholder={course?.offPrice}
                  />

                  <TextField
                    label="کد اسپات پلیر دوره"
                    name="spotCourse"
                    formik={formik}
                    placeholder={course?.spotCourse}
                  />

                  <TextField
                    label="تعداد درس ها"
                    name="lessonsNumber"
                    formik={formik}
                    placeholder={course?.lessonsNumber}
                  />

                  <TextField
                    label="زمان دروس"
                    name="tag1"
                    formik={formik}
                    placeholder={course?.tags[0]}
                  />

                  <TextField
                    label="تگ"
                    name="tag2"
                    formik={formik}
                    placeholder={course?.tags[1]}
                  />

                  <TextField
                    label="کانال تلگرام دوره (لینک)"
                    name="channel"
                    formik={formik}
                    placeholder={course?.channel}
                  />

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
                              placeholder={category?.title}
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
                        data={course?.description}
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
