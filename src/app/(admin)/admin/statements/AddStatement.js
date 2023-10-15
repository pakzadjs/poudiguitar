"use client";

import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbPlus } from "react-icons/tb";
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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import { addStatement } from "@/services/adminServices";
import TextField from "@/common/TextField";

const initialStatementsValues = {
  title: "",
  description: "",
  isActive: false,
};

const statementsValidationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  description: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  isActive: Yup.boolean().required("این فیلد نمی تواند خالی باشد"),
});

export default function AddStatement() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: addStatement,
  });

  const sumbitHandler = async (values) => {
    try {
      const { message } = await mutateAsync(values);
      queryClient.invalidateQueries({ queryKey: ["get-statements"] });

      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.response?.data?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues: initialStatementsValues,
    onSubmit: sumbitHandler,
    validationSchema: statementsValidationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:text-green-500 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl  flex justify-center transition-all duration-250"
      >
        <p>اضافه کردن اعلامیه جدید</p>
        <TbPlus size={25} />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold">
                اضافه کردن اعلامیه جدید
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField label="تیتر" name="title" formik={formik} />

                  <TextField label="متن" name="description" formik={formik} />

                  {/* Select */}
                  <div className="pt-8">
                    <Box sx={{ minWidth: 120 }}>
                      <FormControl fullWidth variant="outlined">
                        {/* <InputLabel id="isActive">isActive</InputLabel> */}
                        <Select
                          name="isActive"
                          labelId="demo-simple-select-label"
                          id="isActive"
                          value={formik?.values["isActive"]}
                          // label="isActive"
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          sx={{
                            borderRadius: "12px",
                            border: "none",
                            background: "#F3F4F6",
                            fontFamily: `vazir`,
                          }}
                        >
                          <MenuItem
                            value={"true"}
                            sx={{
                              borderRadius: "12px",
                              paddingX: "10px",
                              fontFamily: `vazir`,
                            }}
                          >
                            فعال
                          </MenuItem>

                          <MenuItem
                            value={"false"}
                            sx={{
                              borderRadius: "12px",
                              paddingX: "10px",
                              fontFamily: `vazir`,
                            }}
                          >
                            غیر فعال
                          </MenuItem>
                        </Select>
                      </FormControl>

                      {formik?.touched["isActive"] && formik?.errors["isActive"] ? (
                        <div className="mb-1 mt-2 ml-2 text-rose-500 text-left text-xs font-bold">
                          {formik.errors["isActive"]}
                        </div>
                      ) : null}
                    </Box>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      color="primary"
                      className="w-full"
                      isLoading={isLoading}
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
