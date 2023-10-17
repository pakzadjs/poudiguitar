import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

import { updateCategory } from "@/services/adminServices";
import TextField from "@/common/TextField";

const validationSchema = Yup.object({
  title: Yup.string(),
  englishTitle: Yup.string().matches(/^[a-zA-Z0-9-]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
  type: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  description: Yup.string(),
});

export default function UpdateCategory({ id, category }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const initialValues = {
    title: category?.title,
    englishTitle: category?.englishTitle,
    description: category?.description,
    type: "",
  };

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateCategory,
  });

  const sumbitHandler = async ({ title, englishTitle, type, description }) => {
    const body = { title, englishTitle, type, description } || {};

    try {
      const { message } = await mutateAsync({ body, id });
      queryClient.invalidateQueries({ queryKey: ["get-categories"] });
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
              <ModalHeader className="text-xl font-extrabold">
                آپدیت کردن دسته بندی
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="تیتر"
                    name="title"
                    formik={formik}
                    placeholder={category?.title}
                  />

                  <TextField
                    label="slug"
                    name="englishTitle"
                    formik={formik}
                    placeholder={category?.englishTitle}
                  />

                  <TextField
                    label="توضیحات (توضیح کوتاه) "
                    name="description"
                    formik={formik}
                    placeholder={category?.description}
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
    </div>
  );
}
