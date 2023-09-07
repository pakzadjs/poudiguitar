"use client";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";

import { useGetUser } from "@/hooks/useAuth";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

export default function CartPage() {
  const { data, isLoading } = useGetUser();
  const { user, cart } = data || {};

  if (isLoading)
    return <Spinner color="primary" size="lg" className="flex items-center justify-center" />;

  if (!user || !data)
    return (
      <div className="container lg:max-w-screen-lg py-6">
        <p className="text-slate-100 font-bold mb-4">
          برای مشاهده سبد خرید لطفا به حساب خود وارد شوید
        </p>
        <Link href="/auth" className="text-lg font-bold text-slate-300 btn inline-block">
          رفتن به صفحه لاگین
        </Link>
      </div>
    );

  if (!user.cart?.products || user.cart?.products.length === 0)
    return (
      <div className="container lg:max-w-screen-lg py-6">
        <p className="text-slate-100 font-bold mb-4">دوره ای در سبد خرید شما وجود ندارد</p>
        <Link href="/courses" className="text-lg font-bold text-slate-300 btn inline-block">
          رفتن به صفحه دوره ها
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-10 gap-10 lg:max-w-screen-lg m-auto">
      {/* Cart item */}
      <div className="col-span-7 space-y-5">
        {cart &&
          cart.productDetail.map((item) => {
            return <CartItem key={item._id} cartItem={item} />;
          })}
      </div>

      {/* cart summary */}
      <div className="col-span-3">
        <CartSummary payDetail={cart.payDetail} />
      </div>
    </div>
  );
}
