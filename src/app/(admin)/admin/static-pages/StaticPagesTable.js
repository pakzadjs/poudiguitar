"use client";

import { TbEye } from "react-icons/tb";
import sanitizeHtml from "sanitize-html";
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
import RemoveStaticPage from "./RemoveStaticPage";
import UpdateStaticPage from "./UpdateStaticPage";

export default function StaticPagesTable({ page, index }) {
  const { title, description, slug, createdAt, _id } = page || {};
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
          size="4xl"
          scrollBehavior="inside"
          backdrop="blur"
        >
          <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
            {(onClose) => (
              <>
                <ModalHeader className="text-xl font-extrabold">{title}</ModalHeader>
                <ModalBody>
                  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }}></div>
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

      {/* slug */}
      <td className="table__td">{slug}</td>

      {/* Date */}
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>

      {/* Settings */}
      <td className="table__td">
        <div className="flex gap-3">
          <RemoveStaticPage id={_id} />
          <UpdateStaticPage page={page} />
        </div>
      </td>
    </tr>
  );
}
