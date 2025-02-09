"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { TbReceipt } from "react-icons/tb";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPayment } from "@/services/paymentService";
import { addCouponToCart } from "@/services/cartService";

export default function CartSummary({ payDetail, setPaying }) {
  const [couponCode, setCouponCode] = useState("");
  const [discountDetail, setDiscountDetail] = useState(null);
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;
  const queryClient = useQueryClient();
  const router = useRouter();

  const { isLoading, mutateAsync } = useMutation({ mutationFn: createPayment });

  const { isLoading: addCouponLoading, mutateAsync: addCouponMutate } = useMutation({
    mutationFn: addCouponToCart,
    onSuccess: (data) => {
      setDiscountDetail(data);

      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success("کد تخفیف با موفقیت اعمال شد");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const addCouponToCartHandler = async (e) => {
    e.preventDefault();
    try {
      await addCouponMutate({ couponCode });
    } catch (error) {}
  };

  const createPaymentHandler = async () => {
    try {
      const { message, url } = await mutateAsync();
      toast.success("در حال انتقال به صفحه پرداخت");
      setPaying(true);

      router.push(url);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-slate-500/30 px-4 py-6 rounded-xl">
      <div className="flex items-center gap-1 mb-2">
        <TbReceipt size={20} />
        <p className="font-bold">اطلاعات پرداخت</p>
      </div>
      <hr className="border-slate-500 mb-6" />
      <div className="mb-2">کد تخفیف</div>
      <form
        onSubmit={addCouponToCartHandler}
        className="flex items-center mb-4 gap-2"
      >
        <input
          autoComplete="off"
          className="textField__input py-2 rounded-xl"
          type="text"
          name="code"
          id="code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />

        <Button
          isLoading={addCouponLoading}
          isDisabled={couponCode === ""}
          className="btn"
          color="primary"
          type="submit"
        >
          اعمال
        </Button>
      </form>

      <hr className="border-slate-500 mb-6" />
      <div className="mb-4 flex items-center justify-between">
        <span>جمع کل</span>
        <span>
          {toPersianNumbersWithComma(totalGrossPrice)}
          {/* {!discountDetail
            ? toPersianNumbersWithComma(totalGrossPrice)
            : toPersianNumbersWithComma(
                discountDetail?.discountDetail?.totalGrossPrice
              )} */}
        </span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span>تخفیف</span>
        <span className="text-rose-500 font-black">
          {toPersianNumbersWithComma(totalOffAmount)}
          {/* {!discountDetail
            ? toPersianNumbersWithComma(totalOffAmount)
            : toPersianNumbersWithComma(
                discountDetail?.discountDetail?.totalOffAmount
              )} */}
          -
        </span>
      </div>
      <hr className="border-slate-500 mb-6" />
      <div className="mb-6 flex items-center justify-between font-bold">
        <span>مبلغ قابل پرداخت</span>
        <div className="text-xl font-extrabold text-sky-500 flex items-center gap-1">
          {toPersianNumbersWithComma(totalPrice)}
          {/* {!discountDetail
            ? toPersianNumbersWithComma(totalPrice)
            : toPersianNumbersWithComma(
                discountDetail?.discountDetail?.totalPrice
              )}{" "} */}
          <span className="text-xs">تومان</span>
        </div>
      </div>
      <Button
        isLoading={isLoading}
        color="primary"
        className="btn w-full"
        onClick={createPaymentHandler}
      >
        پرداخت سفارش
      </Button>
    </div>
  );
}
