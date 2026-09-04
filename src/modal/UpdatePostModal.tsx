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
        base: "bg-[#141414] border border-[#2A2A2A]",
        header: "border-b border-[#2A2A2A]",
        footer: "border-t border-[#2A2A2A]",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-white font-semibold">
          Edit post
        </ModalHeader>
        <ModalBody className="gap-3 py-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            startContent={<FaPen className="text-gray-600" size={14} />}
            classNames={{
              inputWrapper: "bg-[#141414]/60 border border-[#2A2A2A] h-12",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            startContent={<FaTag className="text-gray-600" size={14} />}
            classNames={{
              inputWrapper: "bg-[#141414]/60 border border-[#2A2A2A] h-12",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={4}
            classNames={{
              inputWrapper: "bg-[#141414]/60 border border-[#2A2A2A]",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-[#2A2A2A] text-gray-400 font-medium text-sm"
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
