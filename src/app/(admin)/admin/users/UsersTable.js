"use client";

import { Tooltip, useDisclosure } from "@nextui-org/react";
import { HiExclamationCircle } from "react-icons/hi";
import { TbCheck, TbX } from "react-icons/tb";

import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import Image from "next/image";
import CopyToClipboard from "@/components/CopyToClipboard";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function UsersTable({
  otp,
  phoneNumber,
  isVerifiedPhoneNumber,
  createdAt,
  email,
  id,
  name,
  cart,
  avatar,
  index,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* Name and avatar */}
      <td className="table__td">
        {name ? (
          <Tooltip
            className="text-slate-900"
            showArrow={true}
            content={
              <div className="">
                <div>
                  {avatar ? (
                    <Image
                      width={120}
                      height={100}
                      src={`${baseUrl}/public/uploads/avatars/${avatar}`}
                      alt="Avatar"
                    />
                  ) : (
                    <div>کاربر عکس ندارد</div>
                  )}
                </div>

                <div className=""></div>
              </div>
            }
            placement="bottom"
          >
            <button onClick={onOpen} className="btn__third">
              <HiExclamationCircle size={20} />
              <p className="text-base">{name} </p>
            </button>
          </Tooltip>
        ) : (
          <span className="text-lg">-</span>
        )}
      </td>

      {/* Phone number */}
      <td className="table__td">
        <div className="flex items-center gap-1">
          {isVerifiedPhoneNumber ? (
            <TbCheck size={20} className="text-green-600" />
          ) : (
            <TbX size={20} className="text-rose-600" />
          )}

          <span>{toPersianNumbers(phoneNumber)}</span>
        </div>
      </td>

      {/* Created at */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Email */}
      <td className="table__td">
        {email ? <span>{email}</span> : <span className="text-lg">-</span>}
      </td>

      {/* ID */}
      <td className="table__td">
        <CopyToClipboard copyText={id} title={"کپی"} />
      </td>

      <td className="table__td">{otp?.code}</td>
    </tr>
  );
}
