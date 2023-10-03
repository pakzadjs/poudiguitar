import { TbCheck, TbX } from "react-icons/tb";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import CopyToClipboard from "@/components/CopyToClipboard";

export default function StudentsTable({ student, index }) {
  const { license, product, user, createdAt } = student || {};

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Name */}
      <td className="table__td">
        {user?.name ? (
          <p className="text-base">{user?.name} </p>
        ) : (
          <span className="text-lg">-</span>
        )}
      </td>

      {/* Phone number */}
      <td className="table__td">
        <div className="flex items-center gap-1">
          {user?.isVerifiedPhoneNumber ? (
            <TbCheck size={20} className="text-green-600" />
          ) : (
            <TbX size={20} className="text-rose-600" />
          )}

          <span>{toPersianNumbers(user?.phoneNumber)}</span>
        </div>
      </td>

      {/* license */}
      <td className="table__td">
        <CopyToClipboard copyText={license?.key} title={"کپی لایسنس"} />
      </td>

      {/* course */}
      <td className="table__td">
        <p className="text-base">{product?.title} </p>
      </td>

      {/* Date */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>
    </tr>
  );
}
