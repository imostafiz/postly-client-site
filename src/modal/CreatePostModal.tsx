"use client";

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
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { FaImage, FaPen } from "react-icons/fa";

import { useCreatePostMutation } from "../redux/features/post";
import { useUser } from "@/src/context/user.provider";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [createPost] = useCreatePostMutation();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages((prev) => [...prev, ...newImages]);
      const newPreviews = newImages.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (!content.trim()) {
      toast.error("Please enter some content");
      return;
    }

    try {
      setLoading(true);

      let imageLinks: string[] = [];
      if (images.length > 0) {
        const uploadPromises = images.map((image) => {
          const formData = new FormData();
          formData.append("image", image);
          return axios.post(IMAGE_UPLOAD_LINK, formData);
        });
        const uploadResponses = await Promise.all(uploadPromises);
        imageLinks = uploadResponses.map((res) => res.data.data.url);
      }

      const res = await createPost({
        title,
        content,
        category,
        image: imageLinks,
        userId: user?.id,
      }).unwrap();

      if (res.success) {
        toast.success("Post created!");
        setTitle("");
        setCategory("");
        setContent("");
        setImages([]);
        setPreviews([]);
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setImages([]);
    setPreviews([]);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="center"
      classNames={{
        base: "bg-gray-900 border border-gray-800",
        header: "border-b border-gray-800",
        footer: "border-t border-gray-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-white font-semibold">
          Create post
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
            placeholder="Category (e.g. Travel, Food, Music)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            classNames={{
              inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            minRows={3}
            classNames={{
              inputWrapper: "bg-gray-950/50 border border-gray-800",
              input: "text-white text-sm placeholder-gray-600",
            }}
          />

          {previews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt=""
                    className="w-16 h-16 rounded-lg object-cover border border-gray-800"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-gray-800 rounded-xl text-gray-500 hover:border-gray-700 hover:text-gray-400 cursor-pointer transition-colors text-sm">
            <FaImage size={16} />
            <span>Add photos</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-gray-800 text-gray-300 font-medium text-sm"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-white text-gray-950 font-semibold text-sm"
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Post
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;
