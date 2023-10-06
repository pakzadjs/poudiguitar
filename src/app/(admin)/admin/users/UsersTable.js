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
              <div className="flex flex-col items-center gap-y-4 my-3">
                <div>
                  {avatar ? (
                    <Image
                      width={120}
                      height={100}
                      src={`${baseUrl}/public/uploads/avatars/${avatar}`}
                      alt="Avatar"
                      className="rounded-md"
                    />
                  ) : (
                    <div>کاربر عکس ندارد</div>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between p-2">
                    <p className="px-5">نام</p>
                    <span className=" px-2 py-1 bg-slate-200 rounded-md">{name}</span>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <p className="px-5">شماره موبایل</p>
                    <span className=" px-2 py-1 bg-slate-200 rounded-md">
                      {toPersianNumbers(phoneNumber)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <p className="px-5">ایمیل</p>
                    <span className=" px-2 py-1 bg-slate-200 rounded-md">{email}</span>
                  </div>
                </div>
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
