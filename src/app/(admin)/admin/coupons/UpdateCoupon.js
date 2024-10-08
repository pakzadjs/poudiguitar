// This component needs to be refactored and optimized

import { useMutation, useQueryClient } from "@tanstack/react-query";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import DatePicker from "react-multi-date-picker";
import { TbEdit } from "react-icons/tb";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import Select from "react-select";
import { useState } from "react";
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

import { updateCoupon } from "@/services/adminServices";
import { useGetCourses } from "@/hooks/useProducts";
import RadioInput from "@/common/RadioInput";
import TextField from "@/common/TextField";

const initialValues = {
  code: "",
  amount: "",
  usageLimit: "",
};

const validationSchema = Yup.object({
  code: Yup.string().required("این فیلد نمی تواند خالی باشد"),
  amount: Yup.number("عدد وارد کنید").required("این فیلد نمی تواند خالی باشد"),
  usageLimit: Yup.number("عدد وارد کنید").required("این فیلد نمی تواند خالی باشد"),
});

export default function UpdateCoupon({ coupon }) {
  const [type, setType] = useState("");
  const queryClient = useQueryClient();
  const [productIds, setProductIds] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [expireDate, setExpireDate] = useState(new Date());

  const { _id, code, usageLimit, amount } = coupon || {};

  const { data: coursesData, isLoading: coursesLoading } = useGetCourses();
  const { products } = coursesData || {};

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: updateCoupon,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
      toast.success(data?.message);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const sumbitHandler = async (values) => {
    const data = {
      ...values,
      type,
      expireDate: new Date(expireDate).toISOString(),
      productIds: productIds?.map((product) => product?._id),
    };

    try {
      const { message } = await mutateAsync({
        id: _id,
        data,
      });
    } catch (error) {}
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
        <TbEdit
          size={25}
          className="hover:text-slate-400 transition-all duration-250"
        />
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
                آپدیت کردن کد تخفیف
              </ModalHeader>

              <ModalBody>
                <form
                  onSubmit={formik.handleSubmit}
                  className="space-y-5 md:p-10 p-5 rounded-xl"
                >
                  <TextField
                    label="کد"
                    name="code"
                    formik={formik}
                    placeholder={code}
                  />

                  <TextField
                    label="مقدار"
                    name="amount"
                    type="number"
                    formik={formik}
                    placeholder={amount}
                  />

                  <TextField
                    label="ظرفیت"
                    name="usageLimit"
                    type="number"
                    formik={formik}
                    placeholder={usageLimit}
                  />

                  <div className="flex flex-col gap-2">
                    <span className="">نوع کد تخفیف</span>
                    <div className="flex items-center gap-4 border border-slate-300 rounded-xl p-3 w-[250px]">
                      <RadioInput
                        id="percent-type"
                        key=""
                        label="درصد"
                        name="type"
                        value="percent"
                        checked={type === "percent"}
                        onChange={(e) => setType(e.target.value)}
                      />

                      <RadioInput
                        id="fixedProduct-type"
                        key=""
                        label="قیمت ثابت"
                        name="type"
                        value="fixedProduct"
                        checked={type === "fixedProduct"}
                        onChange={(e) => setType(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="">انتخاب دوره</span>
                    <Select
                      instanceId="products"
                      isMulti
                      onChange={setProductIds}
                      options={products}
                      getOptionLabel={(option) => option.title}
                      getOptionValue={(option) => option._id}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <span>تاریخ انقضا</span>
                    <DatePicker
                      inputClass="textField__input"
                      value={expireDate}
                      onChange={(date) => setExpireDate(date)}
                      format="YYYY/MM/DD"
                      calendar={persian}
                      locale={persian_fa}
                    />
                  </div>

                  <Button
                    type="submit"
                    color="primary"
                    className="w-full"
                    isLoading={coursesLoading}
                    isDisabled={
                      !formik.isValid || !type || !productIds.length || !expireDate
                    }
                    onPress={onClose}
                  >
                    ثبت
                  </Button>
                </form>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  className="font-bold"
                >
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
