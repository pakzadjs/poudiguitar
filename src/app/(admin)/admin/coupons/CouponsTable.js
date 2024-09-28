"use client";

import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import Link from "next/link";
import { TbEye } from "react-icons/tb";
import RemoveCoupon from "./RemoveCoupon";
import UpdateCoupon from "./UpdateCoupon";
import { Tooltip, useDisclosure } from "@nextui-org/react";
import { toLocalDateStringShort } from "@/utils/toLocalDate";

export default function CouponsTable({ coupon, index }) {
  const {
    _id,
    code,
    expireDate,
    isActive,
    productIds,
    usageCount,
    usageLimit,
    type,
    amount,
  } = coupon || {};

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Code */}
      <td className="table__td">{code}</td>

      {/* Amount */}
      <td className="table__td">
        {toPersianNumbersWithComma(amount)}
        {type === "percent" ? " درصد " : " تومان "}
      </td>

      {/* Status */}
      <td className="table__td">
        {isActive ? (
          <div className="text-green-500">فعال</div>
        ) : (
          <div className="text-red-500">غیر فعال</div>
        )}
      </td>

      {/* Usage limit */}
      <td className="table__td">{usageLimit}</td>

      {/* Usage Count */}
      <td className="table__td">{usageCount}</td>

      {/* Expire date */}
      <td className="table__td">{toLocalDateStringShort(expireDate)}</td>

      {/* Products */}
      <td className="table__td">
        <Tooltip
          className="text-slate-900"
          showArrow={true}
          content={
            <div className="flex flex-col items-center gap-y-4 my-3">
              {productIds?.map((product) => {
                return (
                  <div>
                    <Link
                      href={`/courses/${product?.slug}`}
                      className="px-2 py-1 rounded-lg hover:bg-slate-200"
                    >
                      {product?.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          }
          placement="bottom"
        >
          <button onClick={onOpen} className="btn__third">
            <TbEye size={20} />
          </button>
        </Tooltip>
      </td>

      {/* Settings */}
      <td className="table__td">
        <div className="flex gap-3">
          <RemoveCoupon id={_id} />
          <UpdateCoupon coupon={coupon} />
        </div>
      </td>
    </tr>
  );
}
