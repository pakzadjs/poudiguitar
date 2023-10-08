import { usePathname, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
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

import { uploadVideo } from "@/services/adminServices";
import { FaRegHandPointDown } from "react-icons/fa6";
import SpinnerComponent from "@/common/Spinner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL2;

export default function UploadVideo({ product }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const { isLoading, mutateAsync } = useMutation({
    mutationFn: uploadVideo,
  });

  const addVideoHandler = async (event) => {
    const file = event.target.files[0];
    const mb = file?.size / 1000000;
    const filetype = file?.type;

    if (file) {
      if (mb <= 30 && filetype === "video/mp4") {
        try {
          const formData = new FormData();
          formData.append("video", file);
          const id = product?._id;

          const { message } = await mutateAsync({ video: formData, id });

          toast.success("ویدیو با موفقیت آپلود شد");
          router.refresh(pathname);
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      } else {
        toast.error("فقط فایل با فرمت mp4 و با حجم زیر سی مگابایت مجاز است");
      }
    }
  };

  return (
    <>
      <button onClick={onOpen} className="btn__third">
        ویدیو
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
                اضافه کردن ویدیو به محصول
              </ModalHeader>

              <ModalBody>
                <div className="text-sm mb-4 flex items-center">
                  <HiOutlineExclamationCircle size={20} className="ml-1" />
                  <span>لطفا ویدیو را با فرمت mp4 آپلود کنید.</span>
                </div>

                <div className="space-y-5 p-10 bg-sky-100/50 rounded-xl mb-5 flex flex-col justify-center items-center">
                  <div className="flex items-center p-2">
                    {product?.introductionVideo ? (
                      <video
                        className="rounded-xl w-full h-full"
                        preload="none"
                        controls
                        poster={`${baseUrl}/public/uploads/productImages/${product?.image}`}
                      >
                        <source
                          src={`${baseUrl}/public/uploads/productVideos/${product?.introductionVideo}`}
                          type="video/mp4"
                        />
                      </video>
                    ) : (
                      <div className="p-5 rounded-lg bg-sky-100/50">محصول ویدیو ندارد</div>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <SpinnerComponent size={"lg"} />
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center mb-5">
                      <div className="flex items-center gap-1 mb-5">
                        <p>یک ویدیو انتخاب کنید</p> <FaRegHandPointDown />
                      </div>

                      <input
                        type="file"
                        name="file"
                        onChange={addVideoHandler}
                        className="w-[300px] max-[500px]:w-full bg-blue-900/30 px-3 py-2 rounded-lg text-xs text-[#696969] cursor-pointer max-[900px]:p-6 max-[900px]:mb-4"
                      />
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
