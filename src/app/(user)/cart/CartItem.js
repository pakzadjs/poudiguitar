import Link from "next/link";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

import { useRemoveFromCart } from "@/hooks/useCart";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import { TbTrashX, TbUserHeart } from "react-icons/tb";
import SpinnerComponent from "@/common/Spinner";

const baseUrl2 = process.env.NEXT_PUBLIC_API_URL2;
const baseClientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export default function CartItem({ cartItem }) {
  const { image, title, discount, price, offPrice, slug, _id } = cartItem?.productId;
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useRemoveFromCart();

  const removeFromCartHandler = async () => {
    try {
      const { message } = await mutateAsync(_id);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
      toast.success(message);
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
    queryClient.invalidateQueries({ queryKey: ["get-user"] });
  };

  return (
    <div className="bg-slate-500/30 rounded-xl p-3 sm:px-9 sm:py-7 mb-5 shadow-sm shadow-blue-900">
      <div className="grid grid-cols-12 gap-y-2 gap-x-4">
        {/* Title */}
        <div className="col-span-12 sm:col-span-8 flex items-center">
          <div className="relative w-16 h-16 lg:w-28 lg:h-28 ml-2 sm:ml-3 flex-shrink-0">
            {image ? (
              <img
                src={`${baseUrl2}/public/uploads/productImages/${image}`}
                alt="Course Image"
                className="object-cover object-center rounded-xl"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
              />
            ) : (
              <img
                src="images/no-image.jpg"
                alt="Course Image"
                className="object-cover object-center rounded-xl"
                width={100}
                height={100}
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  inset: "0px",
                  color: "transparent",
                }}
              />
            )}
          </div>

          <div className="">
            <Link
              href={`${baseClientUrl}/courses/${slug}`}
              className="font-black text-sm md:text-2xl hover:text-blue-600 transition-all duration-200 mb-3 block"
            >
              {title}
            </Link>
            <div className="text-xs mt-2 flex gap-1 items-center">
              <TbUserHeart size={18} /> مدرس دوره: پوریا احمدی
            </div>
          </div>
        </div>

        {/* Remove btn and Price */}
        <div className="col-span-12 sm:col-span-4 flex justify-between items-center sm:justify-end">
          <div className="sm:mr-7 sm:order-2">
            <button
              onClick={removeFromCartHandler}
              className="border rounded-xl p-1 border-slate-500/50 hover:bg-slate-500/40 transition-all duration-250"
            >
              {isLoading ? (
                <SpinnerComponent size={"sm"} />
              ) : (
                <TbTrashX className=" text-rose-500" size={25} />
              )}
            </button>
          </div>

          <div className="flex flex-col justify-between gap-[2px]">
            {!!discount && (
              <div className="flex items-center gap-2">
                <span className="line-through text-gray-400/80 flex-1">
                  {toPersianNumbersWithComma(price)}
                </span>

                <div className="bg-rose-500 px-2 rounded-xl text-white text-sm">
                  {toPersianNumbers(discount)} %
                </div>
              </div>
            )}

            <div className="flex items-center">
              {!!discount ? (
                <span className="text-2xl font-extrabold">
                  {toPersianNumbersWithComma(offPrice)}
                </span>
              ) : (
                <span className="text-2xl font-extrabold">
                  {toPersianNumbersWithComma(price)}
                </span>
              )}

              <span className="text-xs mr-2 text-slate-400">تومان</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
