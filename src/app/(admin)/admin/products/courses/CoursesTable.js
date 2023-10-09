"use client";

import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";
import CopyToClipboard from "@/components/CopyToClipboard";
import UpdateCourse from "./UpdateCourse";
import RemoveProduct from "./RemoveProduct";
import ReviewCourse from "./ReviewCourse";
import UploadImage from "./UploadImage";
import UploadVideo from "./UploadVideo";
import FAQ from "./FAQ";
import Lessons from "./Lessons";

export default function CoursesTable({ course, index, categories }) {
  const { title, category, price, offPrice, discount, createdAt, _id } = course || {};

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
      <td className="table__td">
        <CopyToClipboard copyText={_id} title={"کپی"} />
      </td>

      {/* Options */}
      <td className="table__td">
        <div className="flex items-center gap-4">
          <UpdateCourse course={course} categories={categories} />
          <ReviewCourse course={course} />
          <UploadImage product={course} />
          <UploadVideo product={course} />
          <FAQ product={course} />
          <Lessons product={course} />
          <RemoveProduct product={course} />
        </div>
      </td>
    </tr>
  );
}
