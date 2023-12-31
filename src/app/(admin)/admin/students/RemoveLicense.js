import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TbX } from "react-icons/tb";
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

import { removeLicense } from "@/services/adminServices";

export default function RemoveLicense({ id }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: removeLicense,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });

      toast.success("لایسنس با موفقیت حذف شد");
      router.refresh(pathname);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const removeLicenseHandler = async () => {
    try {
      await mutateAsync(id);
    } catch (error) {}
  };

  return (
    <>
      <button onClick={onOpen}>
        <TbX
          size={25}
          className="text-rose-500 hover:text-rose-700 transition-all duration-250"
        />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold">پاک کردن لایسنس</ModalHeader>

              <ModalBody>
                <Button
                  type="submit"
                  color="danger"
                  className="btn__fifth w-full mb-3"
                  onPress={onClose}
                  onClick={removeLicenseHandler}
                  isLoading={isLoading}
                >
                  پاک کردن
                </Button>
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
