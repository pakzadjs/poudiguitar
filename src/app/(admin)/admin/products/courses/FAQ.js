import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { TbEdit, TbPlus, TbX } from "react-icons/tb";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import TextField from "@/common/TextField";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { addFAQ, removeFAQ, updateFAQ } from "@/services/adminServices";

const initiaAddFAQlValues = {
  question: "",
  answer: "",
};

const addFAQValidationSchema = Yup.object({
  question: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  answer: Yup.string().required("این فیلد نمی تواند خالی باشد"),
});

const updateFAQValidationSchema = Yup.object({
  question: Yup.string(),
  answer: Yup.string(),
});

export default function FAQ({ product }) {
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(null);
  const [remove, setRemove] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const initiaUpdateFAQlValues = {
    question: edit?.question,
    answer: edit?.answer,
  };

  const { isLoading: FAQLoading, mutateAsync: addFAQMutate } = useMutation({
    mutationFn: addFAQ,
  });

  const { isLoading: updateFAQLoading, mutateAsync: updateFAQMutate } = useMutation({
    mutationFn: updateFAQ,
  });

  const { isLoading: removeFAQLoading, mutateAsync: removeFAQMutate } = useMutation({
    mutationFn: removeFAQ,
  });

  const removeFAQHandler = async () => {
    const FAQID = remove?._id;
    const productID = product?._id;

    try {
      const data = await removeFAQMutate({ FAQID, productID });
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });

      setStep(1);
      toast.success("FAQ با موفقیت حذف شد");
      router.refresh(pathname);
    } catch (error) {
      console.log(error);
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const addFAQSumbitHandler = async ({ question, answer }) => {
    const body = { question, answer } || {};
    const id = product?._id;

    try {
      const data = await addFAQMutate({ id, body });
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });

      setStep(1);
      toast.success("FAQ با موفقیت اضافه شد");
      router.refresh(pathname);
    } catch (error) {
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateFAQSumbitHandler = async ({ question, answer }) => {
    const body = { question, answer } || {};
    const FAQID = edit?._id;
    const productID = product?._id;

    try {
      const data = await updateFAQMutate({ productID, FAQID, body });
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });

      setStep(1);
      toast.success("FAQ با موفقیت آپدیت شد");
      router.refresh(pathname);
    } catch (error) {
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const addFAQFormik = useFormik({
    initialValues: initiaAddFAQlValues,
    onSubmit: addFAQSumbitHandler,
    validationSchema: addFAQValidationSchema,
    validateOnMount: true,
  });

  const updateFAQFormik = useFormik({
    initialValues: initiaUpdateFAQlValues,
    onSubmit: updateFAQSumbitHandler,
    validationSchema: updateFAQValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <>
            {product?.FAQ.map((q, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-slate-100/50 rounded-md p-2 mb-3 flex max-md:flex-col items-center justify-between"
                >
                  {/* Question & answer */}
                  <div className="">
                    {/* Question */}
                    <div className="flex max-md:flex-col md:items-center gap-2 mb-2 max-md:mb-4">
                      <span className="text-lg font-semibold max-md:mb-2">سوال:</span>
                      <h5 className="max-md:p-1 p-2 rounded-md bg-slate-100/50 max-w-2xl">
                        {q?.question}
                      </h5>
                    </div>

                    {/* Answer */}
                    <div className="flex max-md:flex-col md:items-center gap-2 mb-2 max-md:mb-4">
                      <span className="text-lg font-semibold">جواب:</span>
                      <div className="max-md:p-1 p-2 rounded-md bg-slate-100/50 max-w-2xl">
                        {q?.answer}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center max-md:mb-3 gap-4 md:mr-6 md:ml-3">
                    {/* Update FAQ */}
                    <button
                      onClick={() => {
                        setStep(3);
                        setEdit(q);
                      }}
                    >
                      <TbEdit
                        size={25}
                        className="hover:text-slate-400 transition-all duration-250"
                      />
                    </button>

                    {/* Remove FAQ */}
                    <button
                      onClick={() => {
                        setStep(4);
                        setRemove(q);
                      }}
                    >
                      <TbX
                        size={25}
                        className="text-rose-500 hover:text-rose-700 transition-all duration-250"
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        );
      case 2:
        return (
          <form
            onSubmit={addFAQFormik.handleSubmit}
            className="space-y-5 md:p-10 p-5 rounded-xl"
          >
            <TextField label="سوال" name="question" formik={addFAQFormik} />

            <TextField label="جواب" name="answer" formik={addFAQFormik} />

            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={FAQLoading && true}
                isDisabled={!addFAQFormik.isValid}
              >
                ثبت
              </Button>
            </div>
          </form>
        );
      case 3:
        return (
          <form
            onSubmit={updateFAQFormik.handleSubmit}
            className="space-y-5 md:p-10 p-5 rounded-xl"
          >
            <TextField
              label="سوال"
              name="question"
              formik={updateFAQFormik}
              placeholder={edit?.question}
            />

            <TextField
              label="جواب"
              name="answer"
              formik={updateFAQFormik}
              placeholder={edit?.answer}
            />

            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={updateFAQLoading && true}
                isDisabled={!updateFAQFormik.isValid}
              >
                ثبت
              </Button>
            </div>
          </form>
        );
      case 4:
        return (
          <div>
            <Button
              type="submit"
              color="danger"
              className="btn__fifth w-56 mb-3"
              onClick={removeFAQHandler}
              isLoading={removeFAQLoading}
            >
              پاک کردن
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn__third">
        FAQ
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="5xl"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold flex items-center gap-2">
                {step == 1 && (
                  <div className="flex items-center max-md:flex-col justify-between w-full">
                    <div className="flex items-center gap-2">
                      <h2>سوالات متداول:</h2>
                      <span>{toPersianNumbers(product?.FAQ.length)}</span>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="hover:text-green-500 text-base items-center gap-1 max-md:mx-3 max-md:my-4 max-md:bg-blue-100/50 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
                    >
                      <p className="max-md:text-base max-md:font-medium">
                        اضافه کردن FAQ جدید
                      </p>
                      <TbPlus size={25} />
                    </button>
                  </div>
                )}

                {step == 2 && (
                  <div className="flex items-center justify-between w-full">
                    <h2>اضافه کردن FAQ</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="btn__fourth text-base font-normal ml-3"
                    >
                      برگشت
                    </button>
                  </div>
                )}

                {step == 3 && (
                  <div className="flex items-center justify-between w-full">
                    <h2>آپدیت کردن FAQ</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="btn__fourth text-base font-normal ml-3"
                    >
                      برگشت
                    </button>
                  </div>
                )}

                {step == 4 && (
                  <div className="flex items-center justify-between w-full">
                    <h2>حذف کردن FAQ</h2>
                    <button
                      onClick={() => setStep(1)}
                      className="btn__fourth text-base font-normal ml-3"
                    >
                      برگشت
                    </button>
                  </div>
                )}
              </ModalHeader>

              <ModalBody>{renderSteps()}</ModalBody>

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
