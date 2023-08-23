import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { HiOutlineTrash } from "react-icons/hi";

export default function CartItem({ cartItem }) {
  const addToCartHandler = () => {};

  return (
    <div>
      <span className="flex-1 font-bold">{cartItem.title}</span>
      <div className="flex items-center justify-between  gap-x-8 flex-1">
        <div>
          <div>
            قیمت :
            <span
              className={`${cartItem.discount ? "line-through text-gray-500" : "font-bold"}`}
            >
              {toPersianNumbersWithComma(cartItem.price)}
            </span>
          </div>
          {!!cartItem.discount && (
            <div className="flex items-center gap-x-2 mt-2">
              <p className="font-bold"> {toPersianNumbersWithComma(cartItem.offPrice)}</p>
              <div className="bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm">
                {toPersianNumbers(cartItem.discount)} %
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-x-3">
          <button className="border rounded p-1">
            <HiOutlineTrash className=" text-rose-500 w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
