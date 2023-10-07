import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { TbEye } from "react-icons/tb";
import toast from "react-hot-toast";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ReviewCourse() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <TbEye size={25} className="hover:text-slate-400 transition-all duration-250" />
      </button>
    </>
  );
}
