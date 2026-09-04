"use client";
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaImage, FaPen } from "react-icons/fa";

import { useUser } from "@/src/context/user.provider";

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

const CreatePost = () => {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;

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

      const { createPost } = await import("@/src/services/post");
      await createPost({
        title,
        content,
        category,
        image: imageLinks,
        userId,
      });

      toast.success("Post created!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[#1C2430]">Create post</h1>
        <p className="text-sm text-[#1C2430]/50">Share something with your followers</p>
      </div>

      <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-5 space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          startContent={<FaPen className="text-[#1C2430]/40" size={14} />}
          classNames={{
            inputWrapper: "bg-white border border-[#C9C4B] h-12",
            input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
          }}
        />

        <Input
          placeholder="Category (e.g. Travel, Food, Music)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          classNames={{
            inputWrapper: "bg-white border border-[#C9C4B] h-12",
            input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
          }}
        />

        <Textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          minRows={4}
          classNames={{
            inputWrapper: "bg-white border border-[#C9C4B]",
            input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
          }}
        />

        {/* Image Previews */}
        {previews.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <img
                  src={preview}
                  alt=""
                  className="w-20 h-20 rounded-lg object-cover border border-[#C9C4B]"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#C9C4B]/30 border border-[#C9C4B]/60 rounded-full text-xs text-[#1C2430]/60 hover:text-[#1C2430] hover:bg-[#C9C4B]/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#C9C4B]">
          <label className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#1C2430]/60 hover:bg-[#C9C4B]/40 hover:text-[#1C2430] cursor-pointer transition-colors text-sm">
            <FaImage size={16} />
            <span>Photo</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <Button
            className="bg-white text-gray-950 font-semibold text-sm px-6"
            isLoading={isLoading}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
