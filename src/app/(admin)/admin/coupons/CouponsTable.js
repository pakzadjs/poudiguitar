"use client";

import RemoveCoupon from "./RemoveCoupon";
import UpdateCoupon from "./UpdateCoupon";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers, toPersianNumbersWithComma } from "@/utils/toPersianNumbers";

export default function CouponsTable({ coupon, index }) {
  const { _id } = coupon || {};
  
  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Code */}
      <td className="table__td">xxx</td>

      {/* Amount */}
      <td className="table__td">{toPersianNumbersWithComma(50000)}</td>

      {/* Usage limit */}
      <td className="table__td">5</td>

      {/* Expire date */}
      <td className="table__td">{toLocalDateStringShort("2023-12-27T13:12:47.525Z")}</td>

      {/* Products */}
      <td className="table__td">modal</td>

      {/* Settings */}
      <td className="table__td">
        <div className="flex gap-3">
          <RemoveCoupon id={_id} />
          <UpdateCoupon id={_id} coupon={coupon} />
        </div>
      </td>
    </tr>
  );
}
