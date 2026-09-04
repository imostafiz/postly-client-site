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
        base: "bg-white border border-[#C9C4B]",
        header: "border-b border-[#C9C4B]",
        footer: "border-t border-[#C9C4B]",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-[#1C2430] font-semibold">
          Edit comment
        </ModalHeader>
        <ModalBody className="py-4">
          <Textarea
            placeholder="Write your comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            minRows={3}
            classNames={{
              inputWrapper: "bg-white/60 border border-[#C9C4B]",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-[#C9C4B]/30 text-[#1C2430]/60 font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#D98E04] text-white font-semibold text-sm"
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
