"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbPlus } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { createStaticPage } from "@/services/adminServices";
import TextField from "@/common/TextField";

const initialStaticPagesValues = {
  title: "",
  slug: "",
};

const staticPagesValidationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  slug: Yup.string()
    .required("این فیلد نمی تواند خالی باشد")
    .matches(/^[a-zA-Z0-9 ]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
});

export default function AddStaticPage() {
  const [inputDescription, setInputDescription] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: createStaticPage,
  });

  const sumbitHandler = async ({ title, slug }) => {
    const formData = { title, slug, description: inputDescription } || {};

    try {
      const { message } = await mutateAsync(formData);
      queryClient.invalidateQueries({ queryKey: ["get-staticPages"] });
      
      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const formik = useFormik({
    initialValues: initialStaticPagesValues,
    onSubmit: sumbitHandler,
    validationSchema: staticPagesValidationSchema,
    validateOnMount: true,
  });

  return (
    <>
      <button
        onClick={onOpen}
        className="hover:text-green-500 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl  flex justify-center transition-all duration-250"
      >
        <p>اضافه کردن صفحه استاتیک جدید</p>
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
                اضافه کردن صفحه استاتیک جدید
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField label="تیتر" name="title" formik={formik} />

                  <TextField label="slug" name="slug" formik={formik} />

                  {/* Editor */}
                  <div className="">
                    <h2 className="mb-2">متن</h2>

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
