"use client";

import Link from "next/link";

import { useGetUser } from "@/hooks/useAuth";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";
import SpinnerComponent from "@/common/Spinner";
import { useState } from "react";

function CartPage() {
  const [paying, setPaying] = useState(false);
  const { data, isLoading } = useGetUser();
  const { user } = data || {};
  const { cart } = user || {};

  if (isLoading) return <SpinnerComponent />;

  if (!user || !data)
    return (
      <div className="container lg:max-w-screen-lg py-6 my-28">
        <p className="text-slate-100 font-bold mb-4">
          برای مشاهده سبد خرید لطفا به حساب خود وارد شوید
        </p>
        <Link href="/auth" className="text-lg font-bold btn inline-block">
          رفتن به صفحه لاگین
        </Link>
      </div>
    );

  if (paying)
    return (
      <section className="mt-10">
        <div className="flex justify-center relative">
          <div className="receipt-section flex flex-col items-center gap-8">
            <SpinnerComponent />
            <p className="text-lg font-bold">در حال انتقال به صفحه پرداخت</p>
          </div>
        </div>
      </section>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-screen-lg py-6 my-28">
        <p className="text-slate-100 font-bold mb-4">دوره ای در سبد خرید شما وجود ندارد</p>
        <Link href="/courses" className="text-lg font-bold btn inline-block">
          رفتن به صفحه دوره ها
        </Link>
      </div>
    );

  return (
    <section className="container mt-4 lg:max-w-screen-lg px-4">
      <div className="flex items-center text-secondary-800 mb-5">
        <h1 className="font-black text-2xl text-slate-50">سبد خرید شما</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-x-10">
        {/* Cart item */}
        <div className="col-span-12 lg:col-span-8">
          {cart &&
            cart?.products?.map((item) => {
              return <CartItem key={item._id} cartItem={item} />;
            })}
        </div>

        {/* cart summary */}
        <div className="col-span-12 lg:col-span-4">
          <CartSummary payDetail={cart} paying={paying} setPaying={setPaying} />
        </div>
      </div>
    </section>
  );
}

export default CartPage;
