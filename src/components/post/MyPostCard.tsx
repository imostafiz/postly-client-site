import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Image } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "sonner";

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

  // Use Redux mutations for post update and delete
  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();

  // Handle post deletion
  const handleDelete = async () => {
    try {
      await deletePost(singlePost.id).unwrap(); // Call the delete mutation with the post ID
      toast.success("Post deleted successfully");
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error("Error deleting post");
    }
  };

  // Handle post update
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
    <div>
      <Card className="w-full my-4">
        <CardHeader className="justify-between" />
        <CardBody className="px-2 py-0 text-small text-default-400">
          {/* Check if image is an array and has elements */}
          {Array.isArray(singlePost?.image) && singlePost.image.length > 0 && (
            <Image
              removeWrapper
              alt="Post image"
              className="z-0 w-full h-[300px] object-cover"
              src={singlePost.image[0]} // Access the first image
            />
          )}
          <p className="font-bold pt-2 text-blue-700">{singlePost?.title}</p>
          <p className="font-bold pt-2">#{singlePost?.category}</p>
          <p className="my-4">{singlePost?.content}</p>
        </CardBody>
        <CardFooter className="gap-3 flex ">
          <Button
            className="rounded-full px-1 h-[25px]"
            color="primary"
            variant="shadow"
            onPress={() => setIsUpdateModalOpen(true)}
          >
            Edit
          </Button>
          <Button
            className="rounded-full px-1 h-[25px]"
            color="danger"
            variant="shadow"
            onPress={() => setIsDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Update Modal */}
      {isUpdateModalOpen && (
        <UpdatePostModal
          isOpen={isUpdateModalOpen}
          post={singlePost} // Pass the single post to the modal
          onClose={() => setIsUpdateModalOpen(false)}
          onUpdate={handleUpdate} // Pass the update handler
        />
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <DeletePostModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDelete} // Pass the delete handler
        />
      )}
    </div>
  );
};

export default MyPostCard;
