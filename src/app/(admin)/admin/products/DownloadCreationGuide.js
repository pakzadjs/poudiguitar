import Link from "next/link";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function DownloadCreationGuide() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="hover:text-blue-600 transition-all duration-250">
        راهنمای ایجاد دانلود
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
              <ModalHeader className="text-xl font-extrabold">
                راهنمای ایجاد دانلود
              </ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-2 max-md:flex-col">
                  <p>
                    1. ابتدا برای ایجاد دانلود یک دسته بندی از قبل مشخص کنید، اگر دسته .بندی
                    ندارد، ایجاد کنید.
                  </p>
                  <Link
                    onClick={onClose}
                    href="/admin/categories"
                    className="border border-slate-800 p-1 rounded-md hover:bg-slate-100/50 transition-all duration-250"
                  >
                    دسته بندی ها
                  </Link>
                </div>

                <p>
                  2. در قسمت دانلود ها روی "اضافه کردن دانلود جدید" کلیک کنید و یک دانلود ایجاد
                  کنید.
                </p>

                <p>
                  3. بعد از ایجاد دانلود آن را در لیست دانلود ها می یابید، دانلود ایجاد شده عکس
                  و فایل ندارد، حتما به آن اضافه کنید. <br />
                  در لیست دانلود ها قسمت تنظیمات می توانید عکس و فایل اضافه کنید.
                </p>
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
