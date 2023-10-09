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

export default function CourseCreationGuide() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen} className="hover:text-blue-600 transition-all duration-250">
        راهنمای ایجاد دوره
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
              <ModalHeader className="text-xl font-extrabold">راهنمای ایجاد دوره</ModalHeader>
              <ModalBody>
                <div className="flex items-center gap-2 max-md:flex-col">
                  <p>
                    1. ابتدا برای ایجاد دوره یک دسته بندی از قبل مشخص کنید، اگر دسته بندی
                    ندارد، ایجاد کنید.
                  </p>
                  <Link
                    href="/admin/categories"
                    className="border border-slate-800 p-1 rounded-md hover:bg-slate-100/50 transition-all duration-250"
                  >
                    دسته بندی ها
                  </Link>
                </div>

                <p>
                  2. در قسمت دوره ها روی "اضافه کردن دوره جدید" کلیک کنید و یک دوره ایجاد کنید.
                </p>

                <p>
                  3. بعد از ایجاد دوره آن را در لیست دوره ها می یابید. دوره ای که ایجاد شده عکس
                  و ویدیو ندارد، حتما اضافه کنید.
                  <br />
                  در لیست دوره ها قسمت تنظیمات می توانید عکس و ویدیو اضافه کنید.
                </p>

                <p>4. لیست درس ها و سوالات متداول هم در قسمت تنظیمات می توانید اضافه کنید.</p>
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
