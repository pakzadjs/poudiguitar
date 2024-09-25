"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { TbPlus } from "react-icons/tb";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Select, SelectItem } from "@nextui-org/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import { useGetUsers } from "@/hooks/useAuth";
import { addLicense, generateLicense } from "@/services/adminServices";
import SearchUser from "./SearchUser";
import { useGetCourses } from "@/hooks/useProducts";

export default function AddLicense() {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [addLicenseValues, setAddLicenseValues] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const searchParams = useSearchParams();

  const pageSearchParam = searchParams.get("page") || "";
  const limitSearchParam = searchParams.get("limit") || "";

  const { isLoading, data } = useGetUsers(search, pageSearchParam, limitSearchParam);
  const { users } = data || {};

  const { data: coursesData, isLoading: coursesLoading } = useGetCourses();

  const { isLoading: addLicenseLoading, mutateAsync: addLicenseMutate } =
    useMutation({
      mutationFn: addLicense,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["get-students"] });
        router.refresh(pathname);
        toast.success(data?.message);
        setStep(1);
        console.log(data);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message || error?.response?.data?.data?.message
        );
      },
    });

  const {
    isLoading: generateLicenseLoading,
    mutateAsync: generateLicenseMutate,
    data: generateLicenseData,
  } = useMutation({
    mutationFn: generateLicense,
    onSuccess: (data) => {
      toast.success("لایسنس با موفقیت ایجاد شد");
      setStep(2);
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || error?.response?.data?.data?.message
      );
    },
  });

  const addLicenseSumbitHandler = async () => {
    try {
      await addLicenseMutate(addLicenseValues);
    } catch (error) {}
  };

  const generateLicenseSumbitHandler = async () => {
    try {
      const data = await generateLicenseMutate({
        userID: selectedUser,
        productID: selectedCourse?.currentKey,
      });

      const product = selectedCourse?.currentKey;

      setAddLicenseValues({
        user: selectedUser,
        product: product,
        license: { key: data?.spotLicence?.key },
      });
    } catch (error) {}
  };

  const renderSteps = (onClose) => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="space-y-5 md:p-10 p-5 rounded-xl">
              <SearchUser setSearchUser={setSearch} />

              <div className="space-y-2">
                {users?.[0] && <p className="text-sm">یکی رو انتخاب کن:</p>}
                {users?.map((user) => (
                  <div
                    key={user?._id}
                    className={`flex justify-between gap-3 bg-slate-500/50 rounded-xl cursor-pointer ${
                      selectedUser === user?._id ? "bg-yellow-500/80" : ""
                    }`}
                    onClick={() => setSelectedUser(user?._id)}
                  >
                    <div className="px-3 py-1">{user?.name}</div>
                    <div className="px-3 py-1">{user?.phoneNumber}</div>
                    <div className="px-3 py-1">{user?.email}</div>
                  </div>
                ))}
              </div>

              <div>
                <Select
                  selectedKeys={selectedCourse}
                  onSelectionChange={setSelectedCourse}
                  placeholder="انتخاب دوره"
                  aria-label="انتخاب دوره"
                  className="w-full"
                  dir="ltr"
                  classNames={{
                    listboxWrapper: "text-black",
                    trigger:
                      "rounded-2xl hover:bg-default-200/70 bg-blue-200/80 shadow-xl backdrop-blur-xl backdrop-saturate-200 transition-all duration-250",
                  }}
                >
                  {coursesData?.products?.map((course) => (
                    <SelectItem key={course?._id}>{course?.title}</SelectItem>
                  ))}
                </Select>
              </div>

              <div className="pt-2">
                <Button
                  color="primary"
                  className="w-full"
                  isLoading={generateLicenseLoading}
                  onClick={generateLicenseSumbitHandler}
                  isDisabled={!selectedUser || !selectedCourse}
                >
                  ثبت
                </Button>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="space-y-5 md:p-10 p-5 rounded-xl">
              <div className="pt-2">
                <Button
                  color="primary"
                  className="w-full"
                  isLoading={addLicenseLoading}
                  // isDisabled={!formik.isValid}
                  onPress={onClose}
                  onClick={addLicenseSumbitHandler}
                >
                  ثبت
                </Button>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="p-2 rounded-lg hover:bg-slate-100/50 items-center gap-1 max-md:mx-3 max-md:mb-4 max-md:bg-blue-500/20 max-md:hover:bg-blue-500/40 max-md:p-2 max-md:rounded-xl flex justify-center transition-all duration-250"
      >
        <TbPlus size={25} />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
        isDismissable={false}
      >
        <ModalContent className="text-slate-900 bg-sky-100/70 p-3">
          {(onClose) => (
            <>
              <ModalHeader className="text-xl font-extrabold flex max-md:flex-col justify-between w-full">
                {step == 1 && (
                  <div className="max-md:m-auto pt-1 pr-1">ساختن لایسنس</div>
                )}

                {step == 2 && (
                  <div className="max-md:m-auto pt-1 pr-1">ثبت لایسنس</div>
                )}
              </ModalHeader>

              <ModalBody>{renderSteps(onClose)}</ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => setStep(1)}
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
    </>
  );
}
