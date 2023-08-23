"use client";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";

import { useGetUser } from "@/hooks/useAuth";
import CartItem from "./CartItem";

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
    <div>
      {cart &&
        cart.productDetail.map((item) => {
          return <CartItem key={item._id} cartItem={item} />;
        })}
    </div>
  );
}
