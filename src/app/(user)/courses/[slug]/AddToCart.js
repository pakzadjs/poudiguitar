"use client";

import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { useGetUser } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useAddToCart } from "@/hooks/useCart";
import Link from "next/link";

export default function AddToCart({ product }) {
  const router = useRouter();
  const { data } = useGetUser();
  const { user } = data || {};
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useAddToCart();

  const addToCartHandler = async () => {
    if (!user) {
      toast.error("لطفا ابتدا وارد حساب خود شوید.");
      router.push("/auth");
      return;
    }

    try {
      const { message } = await mutateAsync(product?._id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const isInCart = (user, product) => {
    if (!user) return false;
    return user.cart?.products.some((p) => p.productId === product._id);
  };

  return (
    <div>
      {isInCart(user, product) ? (
        <Button as={Link} color="primary" href="/cart" className="btn font-bold">
          ادامه سفارش
        </Button>
      ) : (
        <Button
          isLoading={isLoading}
          color="primary"
          onClick={addToCartHandler}
          className="btn"
        >
          ثبت نام
        </Button>
      )}
    </div>
  );
}
