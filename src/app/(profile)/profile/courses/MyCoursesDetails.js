"use client";

import Link from "next/link";
import { TbExternalLink } from "react-icons/tb";
import { HiExclamationCircle } from "react-icons/hi";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import CopyToClipboard from "@/components/CopyToClipboard";
import { toLocalDateStringShort } from "@/utils/toLocalDate";

export default function MyCoursesDetails({ license, channel, product, createdAt }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <tr>
      <td className="table__td text-lg">{product?.title}</td>
      <td className="table__td">
        <CopyToClipboard copyText={license?.key} />
      </td>
      <td className="table__td">
        <div>
          <Tooltip
            className="text-slate-900"
            showArrow={true}
            content="راهنمای استفاده از لایسنس"
            placement="bottom"
          >
            <button onClick={onOpen} className="flex items-center gap-1">
              <HiExclamationCircle size={25} />
              <p>اسپات پلیر</p>
            </button>
          </Tooltip>

          <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="3xl"
            scrollBehavior="inside"
            backdrop="blur"
          >
            <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                  <ModalBody>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                      risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pulvinar
                      risus non risus hendrerit venenatis. Pellentesque sit amet hendrerit
                      risus, sed porttitor quam.
                    </p>
                    <p>
                      Magna exercitation reprehenderit magna aute tempor cupidatat consequat
                      elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
                      quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor
                      eiusmod. Et mollit incididunt nisi consectetur esse laborum eiusmod
                      pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </td>
      <td className="table__td">
        {channel ? (
          <Link
            href={`https://${channel}`}
            target="_blank rel=noopener"
            className="bg-slate-800/50 py-1 px-2 rounded-lg flex items-center justify-center gap-1"
          >
            <span>کانال دوره</span>
            <TbExternalLink size={20} />
          </Link>
        ) : (
          <span className="py-1 px-2">ندارد</span>
        )}
      </td>
      <td className="table__td">پوریا احمدی</td>
      <td className="table__td">{toLocalDateStringShort(createdAt)}</td>
    </tr>
  );
}
