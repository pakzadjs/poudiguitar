import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { useRemoveFromCart } from "@/hooks/useCart";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { TbTrashX, TbUserHeart } from "react-icons/tb";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function CartItem({ cartItem }) {
  const { image, title, discount, price, offPrice, _id } = cartItem?.productId;
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useRemoveFromCart();

  const removeFromCartHandler = async () => {
    try {
      const { message } = await mutateAsync(_id);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      if (error?.response?.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="bg-slate-500/30 px-8 py-6 rounded-xl flex items-center">
      <img
        src={`${baseUrl}/public/uploads/productImages/${image}`}
        alt="Course Image"
        className="rounded-xl"
        width={100}
        height={100}
      />

      {/* Title */}
      <div className="mx-4 flex-1">
        <span className="font-black text-2xl">{title}</span>
        <div className="text-xs mt-2 flex gap-1 items-center">
          <TbUserHeart size={18} /> مدرس دوره: پوریا احمدی
        </div>
      </div>

      {/* Remove btn and Price */}
      <div className="flex items-center gap-8">
        <div>
          {!!discount && (
            <div className="flex items-center gap-2">
              <span className="line-through text-gray-400/80 flex-1">
                {toPersianNumbersWithComma(price)}
              </span>

              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
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

        <div className="flex gap-x-3">
          <button
            onClick={removeFromCartHandler}
            className="border rounded-xl p-1 border-slate-500/50 hover:bg-slate-500/40 transition-all duration-250"
          >
            <TbTrashX className=" text-rose-500" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
