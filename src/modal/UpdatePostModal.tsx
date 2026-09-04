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
        base: "bg-gray-900 border border-gray-800",
        header: "border-b border-gray-800",
        footer: "border-t border-gray-800",
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
              inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          <Input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            startContent={<FaTag className="text-gray-600" size={14} />}
            classNames={{
              inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={4}
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
}
