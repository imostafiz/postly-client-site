"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { FaPen } from "react-icons/fa";

interface UpdateCommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  comment: string;
  onUpdate: (updatedText: string) => void;
}

const UpdateCommentModal: React.FC<UpdateCommentModalProps> = ({
  isOpen,
  onClose,
  comment,
  onUpdate,
}) => {
  const [text, setText] = useState(comment);

  useEffect(() => {
    setText(comment);
  }, [comment]);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onUpdate(text);
    onClose();
  };

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
        <ModalHeader className="text-white font-semibold">
          Edit comment
        </ModalHeader>
        <ModalBody className="py-4">
          <Textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            minRows={3}
            classNames={{
              inputWrapper: "bg-gray-950/50 border border-gray-800",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-gray-800 text-gray-300 font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-white text-gray-950 font-semibold text-sm"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateCommentModal;
