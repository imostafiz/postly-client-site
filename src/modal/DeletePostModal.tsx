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
        base: "bg-gray-900 border border-gray-800",
        header: "border-b border-gray-800",
        footer: "border-t border-gray-800",
      }}
    >
      <ModalContent>
        <ModalBody className="py-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-4">
              <FaExclamationTriangle className="text-red-400" size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-1">
              Delete post?
            </h3>
            <p className="text-gray-500 text-sm">
              This action cannot be undone. The post will be permanently removed.
            </p>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2 justify-center">
          <Button
            className="bg-gray-800 text-gray-300 font-medium text-sm"
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
