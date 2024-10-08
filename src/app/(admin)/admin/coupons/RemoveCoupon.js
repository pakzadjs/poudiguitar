import { deleteCoupon } from "@/services/adminServices";
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

export default function RemoveCoupon({ id }) {
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: deleteCoupon,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["get-coupons"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
  });

  const removeCouponHandler = async () => {
    try {
      const { message } = await mutateAsync(id);
    } catch (error) {}
  };

  return (
    <div>
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
              <ModalHeader className="text-xl font-extrabold">
                پاک کردن کد تخفیف
              </ModalHeader>

              <ModalBody>
                <Button
                  type="submit"
                  color="danger"
                  className="btn__fifth w-full mb-3"
                  onPress={onClose}
                  onClick={removeCouponHandler}
                  isLoading={isLoading}
                >
                  پاک کردن
                </Button>
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
    </div>
  );
}
