import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";

export default function EditModal({setRename}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      {/* <Button onPress={onOpen} color="primary">Open Modal</Button> */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Rename</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus       
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}  >
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
