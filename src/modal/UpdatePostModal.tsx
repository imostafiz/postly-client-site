"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@nextui-org/react";
import { FaPen, FaTag } from "react-icons/fa";

import { IPost } from "@/src/types";

interface UpdatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPost;
  onUpdate: (updatedPost: Partial<IPost>) => void;
}

export default function UpdatePostModal({
  isOpen,
  onClose,
  post,
  onUpdate,
}: UpdatePostModalProps) {
  const [title, setTitle] = useState(post?.title || "");
  const [category, setCategory] = useState(post?.category || "");
  const [content, setContent] = useState(post?.content || "");

  const handleSubmit = () => {
    onUpdate({ title, category, content });
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
          Edit post
        </ModalHeader>
        <ModalBody className="gap-3 py-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            startContent={<FaPen className="text-[#1C2430]/40" size={14} />}
            classNames={{
              inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            startContent={<FaTag className="text-[#1C2430]/40" size={14} />}
            classNames={{
              inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />

          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={4}
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
}
