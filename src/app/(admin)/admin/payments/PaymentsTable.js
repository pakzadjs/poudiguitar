"use client";

import Link from "next/link";
import { HiExclamationCircle } from "react-icons/hi";
import { TbCircleCheckFilled, TbCircleXFilled } from "react-icons/tb";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumbers";

const baseClientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

export default function PaymentsTable(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { paymentMethod, amount, isPaid, createdAt, refId, _id, cart, user } = props;

  return (
    <tr>
      {/* Status */}
      <td className="table__td">
        {isPaid ? (
          <TbCircleCheckFilled
            size={30}
            className="text-green-500 shadow-xl shadow-green-900/50 rounded-full"
          />
        ) : (
          <TbCircleXFilled
            size={30}
            className="text-red-500 shadow-xl shadow-red-900/50 rounded-full"
          />
        )}
      </td>

      {/* Ref id */}
      <td className="table__td">{refId ? toPersianNumbers(refId) : <span>-</span>}</td>

      {/* User */}
      <td className="table__td">
        <Tooltip
          className="text-slate-900"
          showArrow={true}
          content={
            <div className="">
              <div className="flex items-center justify-between p-2">
                <p className="px-5">نام</p>
                <span className=" px-2 py-1 bg-slate-200 rounded-md">{user?.name}</span>
              </div>

              <div className="flex items-center justify-between p-2">
                <p className="px-5">شماره موبایل</p>
                <span className=" px-2 py-1 bg-slate-200 rounded-md">
                  {toPersianNumbers(user?.phoneNumber)}
                </span>
              </div>

              <div className="flex items-center justify-between p-2">
                <p className="px-5">ایمیل</p>
                <span className=" px-2 py-1 bg-slate-200 rounded-md">{user?.email}</span>
              </div>
            </div>
          }
          placement="bottom"
        >
          <button onClick={onOpen} className="btn__third">
            <HiExclamationCircle size={20} />
            <p className="text-base">{user?.name}</p>
          </button>
        </Tooltip>
      </td>

      {/* Order */}
      <td className="table__td text-lg">
        {cart?.payDetail?.productIds ? (
          <div>
            <Tooltip
              className="text-slate-900"
              showArrow={true}
              content={cart?.payDetail?.productIds.map((course, i) => {
                return (
                  <div className="p-1 flex justify-between items-center gap-1" key={i}>
                    <span className="font-bold">{toPersianNumbers(i + 1)} -</span>
                    <Link
                      href={`${baseClientUrl}/courses/${course?.slug}`}
                      className="py-1 px-2 font-bold hover:text-blue-500 bg-gray-200/50 rounded-md transition-all duration-250"
                      key={i}
                    >
                      {course?.title}
                    </Link>
                  </div>
                );
              })}
              placement="bottom"
            >
              <button onClick={onOpen} className="btn__third">
                <HiExclamationCircle size={20} />
                <p className="text-base">دیدن سفارش</p>
              </button>
            </Tooltip>

            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              size="sm"
              scrollBehavior="inside"
              backdrop="blur"
            >
              <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
                {(onClose) => (
                  <>
                    <ModalBody className="m-auto">
                      {cart?.payDetail?.productIds.map((course, i) => {
                        return (
                          <div className="py-1 px-2 flex justify-between items-center gap-1 bg-gray-200/50 rounded-md">
                            <span className="font-bold">{toPersianNumbers(i + 1)} -</span>
                            <Link
                              href={`${baseClientUrl}/courses/${course?.slug}`}
                              className="p-1 font-bold hover:text-blue-500 transition-all duration-250"
                              key={i}
                            >
                              {course?.title}
                            </Link>
                          </div>
                        );
                      })}
                    </ModalBody>
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        بستن
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
        ) : (
          <span>-</span>
        )}
      </td>

      {/* Amount */}
      <td className="table__td text-slate-300 text-xs">
        <span className="text-lg text-slate-50">{toPersianNumbers(amount)}</span> تومان
      </td>

      {/* Payment Method */}
      <td className="table__td">{paymentMethod == "ZARINPAL" ? "زرین پال" : "-"}</td>

      {/* Created at */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>
    </tr>
  );
}
