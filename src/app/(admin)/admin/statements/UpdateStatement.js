"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";

import { updateStatement } from "@/services/adminServices";
import TextField from "@/common/TextField";

const statementsValidationSchema = Yup.object({
  title: Yup.string(),
  description: Yup.string(),
  isActive: Yup.boolean(),
});

export default function UpdateStatement({ statement }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const initialStatementsValues = {
    title: statement?.title,
    description: statement?.description,
    isActive: statement?.isActive,
  };

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateStatement,
  });

  const sumbitHandler = async (values) => {
    try {
      const { message } = await mutateAsync({ id: statement?._id, values });
      queryClient.invalidateQueries({ queryKey: ["get-statements"] });

      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
      <button onClick={onOpen}>
        <TbEdit size={25} className="hover:text-slate-400 transition-all duration-250" />
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
              <ModalHeader className="text-xl font-extrabold">آپدیت کردن اعلامیه</ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="تیتر"
                    name="title"
                    formik={formik}
                    placeholder={statement?.title}
                  />

                  <TextField
                    label="متن"
                    name="description"
                    formik={formik}
                    placeholder={statement?.description}
                  />

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
                            value={true}
                            sx={{
                              borderRadius: "12px",
                              paddingX: "10px",
                              fontFamily: `vazir`,
                            }}
                          >
                            فعال
                          </MenuItem>

                          <MenuItem
                            value={false}
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
