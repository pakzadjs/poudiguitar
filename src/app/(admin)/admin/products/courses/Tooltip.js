import Link from "next/link";
import { TbEdit, TbX } from "react-icons/tb";
import { HiExclamationCircle } from "react-icons/hi";
import { Tooltip, useDisclosure } from "@nextui-org/react";

export default function TooltipComponent() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <Tooltip
      className="text-slate-900"
      showArrow={true}
      content={
        <div className="text-blue-100 p-2 my-2">
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link href="" className="btn__third w-full px-4">
              مشخصات
            </Link>

            <div className="flex items-center gap-4">
              <TbEdit
                size={25}
                className="text-blue-100 hover:text-slate-300 transition-all duration-250"
              />

              <TbX
                size={25}
                className="text-rose-500 hover:text-rose-700 transition-all duration-250"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="btn">اضافه کردن عکس</div>
            <div className="btn">اضافه کردن ویدیو</div>

            <div className="flex justify-between">
              <div className="btn">FAQ</div>
              <div className="btn">سرفصل ها</div>
            </div>
          </div>
        </div>
      }
      placement="top"
      classNames={{ base: "bg-blue-900/90" }}
    >
      <button onClick={onOpen} className="btn__third">
        <HiExclamationCircle size={20} />
      </button>
    </Tooltip>
  );
}
