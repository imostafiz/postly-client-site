import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";
import { FaEdit, FaTrash } from "react-icons/fa";

import { IPost } from "@/src/types";
import UpdatePostModal from "@/src/modal/UpdatePostModal";
import DeletePostModal from "@/src/modal/DeletePostModal";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/src/redux/features/post";

const MyPostCard = ({ singlePost }: { singlePost: IPost }) => {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const handleDelete = async () => {
    try {
      await deletePost(singlePost.id).unwrap();
      toast.success("Post deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

  const handleUpdate = async (updatedPost: Partial<IPost>) => {
    try {
      await updatePost({
        postId: singlePost.id,
        updateData: updatedPost,
      }).unwrap();
      toast.success("Post updated successfully");
      setIsUpdateModalOpen(false);
    } catch (error) {
      toast.error("Error updating post");
    }
  };

  return (
    <div className="bg-[#141414]/80 border border-[#2A2A2A]/60 rounded-2xl overflow-hidden">
      {/* Post Image */}
      {Array.isArray(singlePost?.image) && singlePost.image.length > 0 && (
        <div className="relative">
          <img
            alt="Post image"
            className="w-full h-[300px] object-cover"
            src={singlePost.image[0]}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-white">{singlePost?.title}</h3>
        <p className="text-gray-300 text-sm leading-relaxed">{singlePost?.content}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs font-medium text-[#D98E04] bg-[#D98E04]/10 rounded-full">
            #{singlePost?.category}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-[#2A2A2A] flex justify-end gap-2">
        <Button
          size="sm"
          radius="full"
          variant="flat"
          className="bg-[#2A2A2A] text-gray-300 hover:bg-[#D98E04]/20 hover:text-[#D98E04]"
          startContent={<FaEdit size={14} />}
          onPress={() => setIsUpdateModalOpen(true)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          radius="full"
          variant="flat"
          className="bg-[#2A2A2A] text-gray-300 hover:bg-red-500/20 hover:text-red-400"
          startContent={<FaTrash size={14} />}
          onPress={() => setIsDeleteModalOpen(true)}
        >
          Delete
        </Button>
      </div>

      {/* Modals */}
      {isUpdateModalOpen && (
        <UpdatePostModal
          isOpen={isUpdateModalOpen}
          post={singlePost}
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleUpdate}
        />
      )}

      {isDeleteModalOpen && (
        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyPostCard;
