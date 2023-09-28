"use client";

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

export default function MyPaymentsDetails({
  paymentMethod,
  amount,
  isPaid,
  createdAt,
  refId,
  _id,
  cart,
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                  <h5 className="p-1 font-bold" key={i}>
                    {course}
                  </h5>
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
                          <h5
                            key={i}
                            className="py-1 px-3 bg-slate-100/70 rounded-lg font-bold"
                          >
                            {course}
                          </h5>
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
