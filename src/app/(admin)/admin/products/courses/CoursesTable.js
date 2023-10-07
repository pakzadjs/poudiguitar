"use client";

import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import UpdateCourse from "./UpdateCourse";
import RemoveProduct from "./RemoveProduct";
import ReviewCourse from "./ReviewCourse";

export default function CoursesTable({ course, index, categories }) {
  const { title, category, price, offPrice, discount, createdAt } = course || {};

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Title*/}
      <td className="table__td">{title}</td>

      {/* Category */}
      <td className="table__td">
        {category ? category?.title : <span className="text-lg">-</span>}
      </td>

      {/* Price */}
      <td className="table__td">
        <div className="font-bold flex items-center gap-1">
          <span className="text-gray-300 md:text-lg">{toPersianNumbersWithComma(price)}</span>
          <span className="text-xs text-gray-400">تومان</span>
        </div>
      </td>

      {/* Discount */}
      <td className="table__td">
        {discount ? (
          <div className="bg-rose-500 rounded-full py-0.5 px-2 text-white text-xs flex justify-center items-center">
            {toPersianNumbers(`% ${discount}`)}
          </div>
        ) : (
          <span className="text-lg">-</span>
        )}
      </td>

      {/* offPrice */}
      <td className="table__td">
        {offPrice ? (
          <div className="font-bold flex items-center gap-1">
            <span className="text-gray-300 md:text-lg">
              {toPersianNumbersWithComma(offPrice)}
            </span>
            <span className="text-xs text-gray-400">تومان</span>
          </div>
        ) : (
          <span className="text-lg">-</span>
        )}
      </td>

      {/* Created at */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Options */}
      <td className="table__td">
        <div className="flex items-center gap-2">
          <UpdateCourse course={course} categories={categories} />

          <RemoveProduct course={course} />

          <ReviewCourse course={course} />

          <div className="flex items-center gap-4">
            <div className="btn__third">اضافه کردن عکس</div>

            <div className="btn__third">اضافه کردن ویدیو</div>

            <div className="btn__third">FAQ</div>

            <div className="btn__third">سرفصل ها</div>
          </div>
        </div>
      </td>
    </tr>
  );
}
