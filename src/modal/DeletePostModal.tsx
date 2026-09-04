"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FaExclamationTriangle } from "react-icons/fa";

interface DeletePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeletePostModal({
  isOpen,
  onClose,
  onDelete,
}: DeletePostModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      classNames={{
        base: "bg-white border border-[#C9C4B]",
        header: "border-b border-[#C9C4B]",
        footer: "border-t border-[#C9C4B]",
      }}
    >
      <ModalContent>
        <ModalBody className="py-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-600" size={24} />
            </div>
            <h3 className="text-[#1C2430] font-semibold text-lg mb-1">
              Delete post?
            </h3>
            <p className="text-[#1C2430]/50 text-sm">
              This action cannot be undone. The post will be permanently removed.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-center">
          <Button
            className="bg-[#C9C4B]/30 text-[#1C2430]/60 font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-red-600 text-white font-semibold text-sm hover:bg-red-700"
            onClick={onDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
