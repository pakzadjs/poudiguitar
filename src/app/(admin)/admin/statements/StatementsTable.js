"use client";

import { TbEye } from "react-icons/tb";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { toLocalDateStringShort } from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/toPersianNumbers";
import RemoveStatement from "./RemoveStatement";
import UpdateStatement from "./UpdateStatement";

export default function StatementsTable({ statement, index }) {
  const { title, description, isActive, createdAt, _id } = statement || {};
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <tr>
      {/* Index */}
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      {/* title */}
      <td className="table__td">{title}</td>

      {/* description */}
      <td className="table__td">
        <button onClick={onOpen} className="btn__third">
          <TbEye size={20} />
          <p className="text-base">مشاهده متن</p>
        </button>

        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          size="2xl"
          scrollBehavior="inside"
          backdrop="blur"
        >
          <ModalContent className="text-slate-900 bg-sky-100/70 p-4">
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-extrabold">{title}</ModalHeader>
                <ModalBody>
                  <p>{description}</p>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    className="font-bold"
                  >
                    بستن
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </td>

      {/* isActive */}
      <td className="table__td">
        {isActive ? (
          <div className="text-green-500 font-bold">فعال</div>
        ) : (
          <div className="text-rose-500 font-bold">غیر فعال</div>
        )}
      </td>

      {/* Date */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Settings */}
      <td className="table__td">
        <div className="flex gap-3">
          <RemoveStatement id={_id} />
          <UpdateStatement statement={statement} />
        </div>
      </td>
    </tr>
  );
}
