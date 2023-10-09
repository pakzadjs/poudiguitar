import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TbEdit } from "react-icons/tb";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { updateStaticPage } from "@/services/adminServices";
import TextField from "@/common/TextField";

const initialUpdateStaticPagesValues = {
  title: "",
  slug: "",
};

const updateStaticPagesValidationSchema = Yup.object({
  title: Yup.string(),
  slug: Yup.string().matches(/^[a-zA-Z0-9 ]+$/, "فقط متن انگلیسی و اعداد مجاز است"),
});

export default function UpdateStaticPage({ page }) {
  const [isValid, setIsValid] = useState(false);
  const [inputDescription, setInputDescription] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync: updateMutateAsync } = useMutation({
    mutationFn: updateStaticPage,
  });

  const updateStaticPageSumbitHandler = async ({ title, slug }) => {
    const body = { title, slug, description: inputDescription } || {};
    const id = page?._id;

    try {
      const { message } = await updateMutateAsync({ body, id });
      queryClient.invalidateQueries({ queryKey: ["get-staticPages"] });

      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const updateStaticPageFormik = useFormik({
    initialValues: initialUpdateStaticPagesValues,
    onSubmit: updateStaticPageSumbitHandler,
    validationSchema: updateStaticPagesValidationSchema,
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
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold">
                آپدیت کردن صفحه استاتیک
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={updateStaticPageFormik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="تیتر"
                    name="title"
                    formik={updateStaticPageFormik}
                    placeholder={page?.title}
                  />

                  <TextField
                    label="slug"
                    name="slug"
                    formik={updateStaticPageFormik}
                    placeholder={page?.slug}
                  />

                  {/* Editor */}
                  <div className="">
                    <h2 className="mb-2">متن</h2>

                    <div className="bg-white rounded-2xl p-3 mb-2">
                      <CKEditor
                        editor={ClassicEditor}
                        data={page?.description}
                        onChange={(event, editor) => {
                          const data = editor.getData();

                          if (data && updateStaticPageFormik.isValid == true) {
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
    </div>
  );
}
