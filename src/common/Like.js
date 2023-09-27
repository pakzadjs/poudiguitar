"use client";

import toast from "react-hot-toast";
import { TbHeart, TbHeartFilled } from "react-icons/tb";
import { likeProduct } from "@/services/productService";
import { usePathname, useRouter } from "next/navigation";

export default function Like({ product, styles }) {
  const router = useRouter();
  const pathname = usePathname();

  console.log(product);

  const likeHandler = async () => {
    try {
      const { message } = await likeProduct(product?._id);
      toast.success(message);
      router.refresh(pathname);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <button onClick={likeHandler} className={styles}>
      {product?.isLiked ? <TbHeartFilled size={25} /> : <TbHeart size={25} />}
    </button>
  );
}
