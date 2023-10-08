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
                <div></div>
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
