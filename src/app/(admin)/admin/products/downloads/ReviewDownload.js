import Image from "next/image";
import Link from "next/link";
import { TbEye, TbQuestionMark, TbSchool } from "react-icons/tb";
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
import {
  toPersianNumbers,
  toPersianNumbersWithColon,
  toPersianNumbersWithComma,
} from "@/utils/toPersianNumbers";
import FAQ from "@/pages/(user)/courses/[slug]/FAQ";
import Lessons from "@/pages/(user)/courses/[slug]/Lessons";
import { toLocalDateString } from "@/utils/toLocalDate";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function ReviewDownload({ download }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <TbEye size={25} className="hover:text-slate-400 transition-all duration-250" />
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
              <ModalHeader className="text-xl font-extrabold">مشخصات دانلود</ModalHeader>

              <ModalBody>
                {/* Title and image */}
                <div className="flex justify-between w-full bg-slate-400/80 rounded-xl">
                  <div className="max-w-md p-4 w-full">
                    {download?.title}

                    <p className="">{download?.descriptionSummary}</p>
                  </div>

                  <div>
                    {download?.image ? (
                      <Image
                        src={`${baseUrl}/public/uploads/productImages/${course?.image}`}
                        width={300}
                        height={100}
                        alt={download?.slug}
                        className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                      />
                    ) : (
                      <Image
                        src="/images/no-image.jpg"
                        width={300}
                        height={100}
                        alt={download?.slug}
                        className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                      />
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="flex max-md:flex-col justify-center items-center w-full gap-3">
                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تاریخ انتشار</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toLocalDateString(download?.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">آخرین بروزرسانی</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toLocalDateString(download?.updatedAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">Slug</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {download?.slug}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">حجم</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbers(download?.tags[1])}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تعداد لایک ها</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbers(download?.likes.length)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">دسته بندی</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {download?.category?.title}
                      </span>
                    </div>
                  </div>
                </div>
              </ModalBody>

              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} className="font-bold">
                  بستن
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
