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

export default function MyPaymentsDetails(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { paymentMethod, amount, isPaid, createdAt, refId, _id, cart } = props;

  console.log(cart?.payDetail?.productIds);

  return (
    <tr>
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

      <td className="table__td">{refId ? toPersianNumbers(refId) : <span>-</span>}</td>

      <td className="table__td text-lg">
        {cart?.payDetail?.productIds ? (
          <div>
            <Tooltip
              className="text-slate-900"
              showArrow={true}
              content={cart?.payDetail?.productIds.map((course, i) => {
                return (
                  <div className="p-1 flex justify-between items-center gap-1">
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

      <td className="table__td text-slate-300 text-xs">
        <span className="text-lg text-slate-50">{toPersianNumbers(amount)}</span> تومان
      </td>

      <td className="table__td">{paymentMethod == "ZARINPAL" ? "زرین پال" : "-"}</td>

      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>
    </tr>
  );
}
