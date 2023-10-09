import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { toPersianNumbers, toPersianNumbersWithColon } from "@/utils/toPersianNumbers";
import { addFAQ, removeLesson, updateFAQ } from "@/services/adminServices";

const initiaAddLessonlValues = {
  title: "",
  body: [],
};

const initiaUpdateLessonlValues = {
  title: "",
  body: [],
};

const addLessonValidationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  body: Yup.array().required("این فیلد نمی تواند خالی باشد"),
});

const updateLessonValidationSchema = Yup.object({
  title: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  body: Yup.array().required("این فیلد نمی تواند خالی باشد"),
});

export default function Lessons({ product }) {
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(null);
  const [remove, setRemove] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading: LessonLoading, mutateAsync: addLessonMutate } = useMutation({
    mutationFn: addFAQ,
  });

  const { isLoading: updateLessonLoading, mutateAsync: updateLessonMutate } = useMutation({
    mutationFn: updateFAQ,
  });

  const { isLoading: removeLessonLoading, mutateAsync: removeLessonMutate } = useMutation({
    mutationFn: removeLesson,
  });

  const removeLessonHandler = async () => {
    try {
      const lessonID = remove?._id;
      const productID = product?._id;
      const data = await removeLessonMutate({ lessonID, productID });
      setStep(1);

      toast.success("سرفصل با موفقیت حذف شد");
      router.refresh(pathname);
    } catch (error) {
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const addLessonSumbitHandler = async ({ title, body }) => {
    const data = { title, body } || {};
    const id = product?._id;

    try {
      const data = await addLessonMutate({ id, body: data });
      setStep(1);

      toast.success("سرفصل با موفقیت اضافه شد");
      router.refresh(pathname);
    } catch (error) {
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const updateLessonSumbitHandler = async ({ question, answer }) => {
    const body = { question, answer } || {};
    const lessonID = edit?._id;
    const productID = product?._id;

    try {
      const data = await updateLessonMutate({ productID, lessonID, body });
      setStep(1);

      toast.success("سرفصل با موفقیت آپدیت شد");
      router.refresh(pathname);
    } catch (error) {
      setStep(1);
      toast.error(error?.response?.data?.message);
    }
  };

  const addLessonFormik = useFormik({
    initialValues: initiaAddLessonlValues,
    onSubmit: addLessonSumbitHandler,
    validationSchema: addLessonValidationSchema,
    validateOnMount: true,
  });

  const updateLessonFormik = useFormik({
    initialValues: initiaUpdateLessonlValues,
    onSubmit: updateLessonSumbitHandler,
    validationSchema: updateLessonValidationSchema,
    validateOnMount: true,
  });

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <>
            {product?.lessons.map((lesson, index) => {
              return (
                <div
                  key={index}
                  className="w-full bg-slate-100/50 rounded-md p-2 mb-3 flex max-md:flex-col items-center justify-between"
                >
                  {/* lessons */}
                  <div className=" w-full">
                    {/* Title */}
                    <div className="flex max-md:flex-col md:items-center gap-2 mb-2 max-md:mb-4">
                      <span className="text-lg font-semibold max-md:mb-2 w-28">سر فصل:</span>
                      <h5 className="max-md:p-1 p-2 rounded-md bg-slate-100/50 max-w-2xl">
                        {lesson?.title}
                      </h5>
                    </div>

                    {/* Body */}
                    <div className="flex max-md:flex-col md:items-center gap-2 mb-2 max-md:mb-4 w-full">
                      <span className="text-lg font-semibold w-32">درس ها:</span>
                      <div className="flex flex-col p-2 rounded-md bg-slate-100/50 w-full">
                        {lesson?.body.map((body, index) => {
                          return (
                            <div
                              key={index}
                              className="max-md:p-1 p-2 rounded-md bg-slate-100/50 mb-3 w-full flex items-center justify-between"
                            >
                              <div className="">{body?.title}</div>
                              <div className="">
                                {toPersianNumbersWithColon(body?.duration)}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center max-md:mb-3 gap-4 md:mr-6 md:ml-3">
                    {/* Update lesson */}
                    <button
                      onClick={() => {
                        setStep(3);
                        setEdit(lesson);
                      }}
                    >
                      <TbEdit
                        size={25}
                        className="hover:text-slate-400 transition-all duration-250"
                      />
                    </button>

                    {/* Remove lesson */}
                    <button
                      onClick={() => {
                        setStep(4);
                        setRemove(lesson);
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
            onSubmit={addLessonFormik.handleSubmit}
            className="space-y-5 md:p-10 p-5 rounded-xl"
          >
            <TextField label="سرفصل" name="title" formik={addLessonFormik} />

            <TextField label="درس" name="body" formik={addLessonFormik} />

            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={LessonLoading && true}
                isDisabled={!addLessonFormik.isValid}
              >
                ثبت
              </Button>
            </div>
          </form>
        );
      case 3:
        return (
          <form
            onSubmit={updateLessonFormik.handleSubmit}
            className="space-y-5 md:p-10 p-5 rounded-xl"
          >
            <TextField
              label="سرفصل"
              name="title"
              formik={updateLessonFormik}
              placeholder={edit?.question}
            />

            <TextField
              label="درس"
              name="body"
              formik={updateLessonFormik}
              placeholder={edit?.answer}
            />

            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={updateLessonLoading && true}
                isDisabled={!updateLessonFormik.isValid}
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
              onClick={removeLessonHandler}
              isLoading={removeLessonLoading}
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
        سر فصل ها
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
                      <h2>سر فصل ها:</h2>
                      <span>{toPersianNumbers(product?.lessons.length)}</span>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="hover:text-green-500 text-base items-center gap-1 max-md:mx-3 max-md:my-4 max-md:bg-blue-100/50 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
                    >
                      <p className="max-md:text-base max-md:font-medium">
                        اضافه کردن سر فصل جدید
                      </p>
                      <TbPlus size={25} />
                    </button>
                  </div>
                )}

                {step == 2 && (
                  <div className="flex items-center justify-between w-full">
                    <h2>اضافه کردن سر فصل</h2>
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
                    <h2>آپدیت کردن سر فصل</h2>
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
                    <h2>حذف کردن سر فصل</h2>
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
