import { Button } from "@nextui-org/react";
import { TbReceipt } from "react-icons/tb";
import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

export default function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  return (
    <div className="bg-slate-500/30 px-4 py-6 rounded-xl">
      <div className="flex items-center gap-1 mb-2">
        <TbReceipt size={20} />
        <p className="font-bold">اطلاعات پرداخت</p>
      </div>

      <hr className="border-slate-500 mb-6" />

      <div className="mb-4 flex items-center justify-between">
        <span>جمع کل</span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <span>تخفیف</span>
        <span className="text-rose-500 font-black">
          {toPersianNumbersWithComma(totalOffAmount)} -{" "}
        </span>
      </div>

      <hr className="border-slate-500 mb-6" />

      <div className="mb-6 flex items-center justify-between font-bold">
        <span>مبلغ قابل پرداخت</span>
        <div className="text-xl font-extrabold text-sky-500 flex items-center gap-1">
          {toPersianNumbersWithComma(totalPrice)} <span className="text-xs">تومان</span>
        </div>
      </div>

      <Button color="primary" className="btn w-full">
        پرداخت سفارش
      </Button>
    </div>
  );
}
