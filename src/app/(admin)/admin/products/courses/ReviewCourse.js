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

export default function ReviewCourse({ course }) {
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
              <ModalHeader className="text-xl font-extrabold">مشخصات دوره</ModalHeader>

              <ModalBody>
                {/* Title and image */}
                <div className="flex justify-between w-full bg-slate-400/80 rounded-xl">
                  <div className="max-w-md p-4 w-full">
                    <Link
                      href={`/courses/${course?.slug}`}
                      className="text-lg font-semibold mb-2 hover:text-blue-600 transition-all duration-250"
                    >
                      {course?.title}
                    </Link>
                    <p className="">{course?.descriptionSummary}</p>
                  </div>

                  <div>
                    <Link href={`/courses/${course?.slug}`}>
                      {course?.image ? (
                        <Image
                          src={`${baseUrl}/public/uploads/productImages/${course?.image}`}
                          width={300}
                          height={100}
                          alt={course?.slug}
                          className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                        />
                      ) : (
                        <Image
                          src="/images/no-image.jpg"
                          width={300}
                          height={100}
                          alt={course?.slug}
                          className="object-cover object-center h-full w-full rounded-xl aspect-13/9"
                        />
                      )}
                    </Link>
                  </div>
                </div>

                {/* Info */}
                <div className="flex max-md:flex-col justify-center items-center w-full gap-3">
                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تاریخ انتشار</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toLocalDateString(course?.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">آخرین بروزرسانی</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toLocalDateString(course?.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">کد اسپات پلیر</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {course?.spotCourse}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تعداد لایک ها</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbers(course?.likes.length)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* More Info */}
                <div className="flex max-md:flex-col justify-center items-center w-full gap-3">
                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">قیمت</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbersWithComma(course?.price)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">قیمت با تخفیف</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbersWithComma(course?.offPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تخفیف</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        % {toPersianNumbers(course?.discount)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">Slug</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">{course?.slug}</span>
                    </div>
                  </div>

                  <div className="w-full bg-slate-400/80 rounded-xl">
                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">دسته بندی</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {course?.category?.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تعداد درس ها</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbers(course?.lessonsNumber)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">زمان دروس</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {toPersianNumbersWithColon(course?.tags[0])}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2">
                      <p className="px-5">تگ</p>
                      <span className="px-2 py-1 bg-slate-200 rounded-md">
                        {course?.tags[1]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="w-full bg-slate-400/80 rounded-xl p-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(course?.description) }}
                  ></div>
                </div>

                {/* Lessons */}
                <div className="bg-blue-950/70 rounded-xl p-3 lg:p-6">
                  <div className="flex gap-1">
                    <TbSchool size={28} className="text-yellow-300" />
                    <h2 className="text-2xl font-black text-sky-500 mb-5">سرفصل ها</h2>
                  </div>
                  <Lessons product={course} />
                </div>

                {/* FAQ */}
                <div className="bg-blue-950/70 rounded-xl p-3 lg:p-6">
                  <div className="flex">
                    <TbQuestionMark size={30} className="text-yellow-300" />
                    <h2 className="text-2xl font-black text-sky-500 mb-5">سوالات متداول</h2>
                  </div>
                  <FAQ product={course} />
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
