import { toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { Button } from "@nextui-org/react";

export default function CartSummary({ payDetail }) {
  const { totalOffAmount, totalPrice, totalGrossPrice } = payDetail;

  return (
    <div className="border px-2 py-4 rounded-xl">
      <p className="mb-4 font-bold">اطلاعات پرداخت</p>
      <div className="mb-4 flex items-center justify-between">
        <span>جمع کل</span>
        <span>{toPersianNumbersWithComma(totalGrossPrice)}</span>
      </div>
      <div className="mb-4 flex items-center justify-between">
        <span>تخفیف</span>
        <span>{toPersianNumbersWithComma(totalOffAmount)} - </span>
      </div>
      <div className="mb-6 flex items-center justify-between font-bold">
        <span>مبلغ قابل پرداخت</span>
        <span>{toPersianNumbersWithComma(totalPrice)}</span>
      </div>
      <Button color="primary" className="btn w-full">
        پرداخت سفارش
      </Button>
    </div>
  );
}
