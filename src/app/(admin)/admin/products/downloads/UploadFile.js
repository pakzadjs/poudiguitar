import { usePathname, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineExclamationCircle } from "react-icons/hi";
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

import { uploadFile } from "@/services/adminServices";
import { FaRegHandPointDown } from "react-icons/fa6";
import SpinnerComponent from "@/common/Spinner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function UploadFile({ product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: uploadFile,
  });

  const addFileHandler = async (event) => {
    const file = event.target.files[0];
    // const mb = file?.size / 1000000;
    // const filetype = file?.type;

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const id = product?._id;

        const { message } = await mutateAsync({ file: formData, id });
        queryClient.invalidateQueries({ queryKey: ["get-downloads"] });

        toast.success("فایل با موفقیت آپلود شد");
        router.refresh(pathname);
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn__third">
        فایل
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
                اضافه کردن فایل به محصول
              </ModalHeader>

              <ModalBody>
                <div className="text-sm mb-4 flex items-center">
                  <HiOutlineExclamationCircle size={20} className="ml-1" />
                  <span>لطفا فایل را با بصورت زیپ آپلود کنید.</span>
                </div>

                <div className="space-y-5 p-10 bg-sky-100/50 rounded-xl mb-5 flex flex-col justify-center items-center">
                  <div className="flex items-center p-2">
                    {product?.file !== "#" ? (
                      <div>{product?.file}</div>
                    ) : (
                      <div>محصول فایل ندارد</div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <p>یک فایل انتخاب کنید</p> <FaRegHandPointDown />
                  </div>

                  <input
                    type="file"
                    name="file"
                    onChange={addFileHandler}
                    className="w-[300px] max-[500px]:w-full bg-blue-900/30 px-3 py-2 rounded-lg text-xs text-[#696969] cursor-pointer max-[900px]:p-6 max-[900px]:mb-4"
                  />

                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <SpinnerComponent size={"lg"} />
                    </div>
                  )}
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
