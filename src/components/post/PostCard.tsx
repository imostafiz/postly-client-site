import React, { useState, useEffect } from "react";
// import { Image } from "@nextui-org/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Input,
} from "@nextui-org/react";
import { GiPlateClaw, GiSelfLove } from "react-icons/gi";
import { RiVipCrownFill } from "react-icons/ri";
import { MdVerified } from "react-icons/md";
import { FaShare, FaComment } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { toast } from "sonner";
import Link from "next/link";
import { RiUserVoiceFill } from "react-icons/ri";
import {
  useCreateDislikeMutation,
  useCreateLikeMutation,
  useMakeFavoriteMutation,
} from "@/src/redux/features/post";
import { useGetUser } from "@/src/hooks/auth.hooks";
import { useFollowUserMutation } from "@/src/redux/features/user";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
} from "@/src/redux/features/commentApi";
import { useUser } from "@/src/context/user.provider";
import PremiumModal from "@/src/modal/PremiumModal";

// eslint-disable-next-line prettier/prettier
const PostCard = ({ post }: any) => {
  // console.log("post",post);
  const { user } = useUser();
  const { data: newData, refetch: refetchUserData } = useGetUser();
  console.log("new new data", newData);
  const userId = newData?.data?.id;
  const [createLike] = useCreateLikeMutation();
  const [createDislike] = useCreateDislikeMutation();
  const [followUser] = useFollowUserMutation();
  const [makeFavorite] = useMakeFavoriteMutation();

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  // Local state for managing comments
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Local state to track like/dislike status and counts
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);
  const [dislikes, setDislikes] = useState(post?.dislikes || []);

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };
  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  // Effect to set the initial status based on post data
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    if (post?.likes?.some((like: any) => like?.user?.id === userId)) {
      setIsLiked(true);
    }
    // eslint-disable-next-line prettier/prettier
    if (post?.dislikes?.some((dislike: any) => dislike?.user?.id === userId)) {
      setIsDisliked(true);
    }
  }, [post, userId]);

  const handleSavePost = async (post: string) => {
    try {
      const saveData = { post, user: userId };
      console.log("saveData", saveData);

      const res = await makeFavorite(saveData).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };

  const handleFollowUser = async (followeeId: string) => {
    try {
      const followInfo = { followerId: userId, followeeId };
      const res = await followUser({ followInfo }).unwrap();

      await refetchUserData();
      toast.success(res?.message);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      const likeObject = { userId, postId };

      // If the post is already liked, unlike it
      if (isLiked) {
        setIsLiked(false);
        // eslint-disable-next-line prettier/prettier
        setLikes(likes.filter((like: any) => like?.user?.id !== userId));
        toast.success("You unliked it");
      } else {
        // Like the post
        const res = await createLike(likeObject).unwrap();

        setIsLiked(true);
        setIsDisliked(false); // Remove dislike if it was set
        setLikes([...likes, { user: { id: userId } }]);

        // If it was previously disliked, remove that dislike
        if (isDisliked) {
          setDislikes(
            // eslint-disable-next-line prettier/prettier
            dislikes.filter((dislike: any) => dislike?.user?.id !== userId)
          );
        }

        toast.success("You liked it");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log("error", error);
    }
  };

  const handleDislikePost = async (postId: string) => {
    try {
      const dislikeObject = { userId, postId };

      // If the post is already disliked, remove dislike
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(
          // eslint-disable-next-line prettier/prettier
          dislikes.filter((dislike: any) => dislike?.user?.id !== userId)
        );
        toast.success("You unDisliked it");
      } else {
        // Dislike the post
        const res = await createDislike(dislikeObject).unwrap();

        setIsDisliked(true);
        setIsLiked(false); // Remove like if it was set
        setDislikes([...dislikes, { user: { id: userId } }]);

        // If it was previously liked, remove that like
        if (isLiked) {
          // eslint-disable-next-line prettier/prettier
          setLikes(likes.filter((like: any) => like?.user?.id !== userId));
        }

        toast.success("You disliked it");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
      console.log("Error disliking the post:", error.message || error);
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!commentText.trim()) return;

    try {
      const commentObject = { author: userId, commentText };

      // ;      console.log("obj", commentObject);
      const newComment = await createComment({
        commentObject,
        postId,
      }).unwrap();

      console.log("new commensts", newComment);
      setComments([...comments, newComment]);

      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
      console.error("Error adding comment:", error);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingText.trim()) return;

    try {
      const updateObject = {
        author: userId,
        commentId,
        commentText: editingText,
      };
      const updatedComment = await updateComment(updateObject).unwrap();

      setComments(
        // eslint-disable-next-line prettier/prettier
        comments.map((comment: any) =>
          comment.id === commentId ? updatedComment : comment
        )
      );
      setEditingCommentId(null); // Exit editing mode
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
      console.error("Error updating comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ authorId: userId, commentId }).unwrap();
      // eslint-disable-next-line prettier/prettier
      setComments(comments.filter((comment: any) => comment.id !== commentId));
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Card className='w-full my-4'>
      <CardHeader className='justify-between'>
        <div className='flex gap-3'>
          <Avatar
            isBordered
            radius='full'
            size='md'
            src={post?.userId?.profileImage}
          />
          {/* <div className='flex flex-col gap-1 items-start justify-center'>
            <div className='flex'>
              
              <Link
                className='text-small font-semibold leading-none text-default-600'
                href={`/dashboard/user/${post?.userId.id}`}
              >
                {post?.userId?.name}
              </Link>

              <span className='ml-3'>
                {post?.userId?.isPremium && (
                  <MdVerified className='text-blue-700 ' />
                )}
              </span>
            </div>
            <h5 className='text-small tracking-tight text-default-400'>
              {post?.userId?.email}
            </h5>
          </div> */}

          <div className='flex flex-col gap-1 items-start justify-center'>
            <div className='flex'>
              {newData?.data?.isPremium ? ( // Check if current user is premium and matches post user
                <Link
                  className='text-small font-semibold leading-none text-default-600'
                  href={`/dashboard/user/${post?.userId.id}`} // Render link for premium user
                >
                  {post?.userId?.name}
                </Link>
              ) : (
                <span
                  className='text-small font-semibold leading-none text-default-600 cursor-pointer'
                  onClick={openPremiumModal}
                  role='button'
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openPremiumModal();
                  }}
                >
                  {post?.userId?.name}
                </span>
              )}

              <span className='ml-3'>
                {post?.userId?.isPremium && (
                  <MdVerified className='text-blue-700 ' />
                )}
              </span>
            </div>
            <h5 className='text-small tracking-tight text-default-400'>
              {post?.userId?.email}
            </h5>
          </div>
        </div>

        <Button
          className='h-[30px] md:px-5'
          color='primary'
          radius='full'
          size='sm'
          variant='shadow'
          onClick={() => handleFollowUser(post?.userId?.id)}
        >
          {newData?.data?.following?.some(
            (follower: any) => follower === post?.userId?.id
          )
            ? "Following"
            : "Follow"}
        </Button>
      </CardHeader>

      <CardBody className='px-2 py-0 text-small text-default-400'>
        {post?.image.length > 0 && (
          <div>
            <img
              // removeWrapper
              alt='Card background'
              className='z-0 w-full h-[300px] object-cover'
              src={post?.image[0]} // Assuming the first image
            />
          </div>
        )}

        <p className='font-bold pt-2 text-blue-700'>{post?.title}</p>

        <p className=' font-medium'>
          <RiUserVoiceFill />
        </p>
        <p className='font-medium'> {post?.content}</p>

        <p className='font-bold pt-2  text-sm'>#{post?.category}</p>
      </CardBody>

      {/* Display comments directly after the post content */}
      <div className='comments-section px-2 py-2 border-t border-gray-800'>
        <p className='text-sm'>Comments:</p>
        {post?.comments.length > 0 ? (
          // eslint-disable-next-line prettier/prettier
          post?.comments?.map((comment: any) => (
            <div key={comment?.id} className='text-gray-400 rounded '>
              <div className='flex justify-between text-sm my-1'>
                <div className='flex justify-center items-center gap-3 my-1'>
                  <Avatar
                    isBordered
                    className='h-[20px] w-[20px]'
                    radius='full'
                    size='sm'
                    src={comment?.author?.profileImage}
                  />
                  <span>{comment?.commentText || "Anonymous"}</span>
                </div>
                <div className='flex gap-2'>
                  {userId === comment?.author?.id && (
                    <>
                      <Button
                        className='h-[20px] rounded-full '
                        size='sm'
                        variant='flat'
                        onClick={() => setEditingCommentId(comment?.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className='h-[20px] rounded-full'
                        color='danger'
                        size='sm'
                        variant='flat'
                        onClick={() => handleDeleteComment(comment?.id)}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {editingCommentId === comment?.id ? (
                <div className='flex flex-col gap-2'>
                  <Input
                    placeholder='Edit comment...'
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                  <Button
                    size='sm'
                    onClick={() => handleUpdateComment(comment?.id)}
                  >
                    Update
                  </Button>
                </div>
              ) : (
                <p>{comment?.content}</p>
              )}
            </div>
          ))
        ) : (
          <p className='text-gray-600'>
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Comment input box */}
      <CardFooter className='flex items-center justify-between '>
        <Input
          className='w-3/4  flex justify-center rounded-full '
          placeholder='Write a comment...'
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          className='ml-2 rounded-full text-white'
          color='primary'
          size='sm'
          onClick={() => handleCreateComment(post?.id)}
        >
          Post
        </Button>
      </CardFooter>

      <CardFooter className='flex justify-between border-t border-gray-700'>
        <div className='flex gap-4'>
          <button
            className='text-large text-default-500'
            onClick={() => handleLikePost(post?.id)}
          >
            {isLiked ? <BiSolidLike /> : <SlLike />} {likes?.length}
          </button>
          <button
            className='text-large text-default-500'
            onClick={() => handleDislikePost(post?.id)}
          >
            {isDisliked ? <BiSolidDislike /> : <SlDislike />} {dislikes?.length}
          </button>
          <button className='text-large text-default-500'>
            <FaComment />
            {post?.comments?.length}
          </button>
        </div>
        {/* <div className="flex">
          <button className="text-large text-default-500">
            <div
              className="flex items-center"
              onClick={() => handleSavePost(post?.id)}
            >
              <GiSelfLove className="text-2xl" />
            </div>
          </button>
          <button className="ml-3 text-large text-default-500">
            <FaShare />
          </button>
        </div> */}
        <div className='flex'>
          {/* Like Button */}
          <button className='text-large text-default-500'>
            <div
              className='flex items-center'
              role='button' // Add role to indicate it's a button
              tabIndex={0} // Make the element focusable
              onClick={() => handleSavePost(post?.id)}
              onKeyDown={(e) => e.key === "Enter" && handleSavePost(post?.id)} // Handle keyboard interaction
            >
              <GiSelfLove className='text-2xl' />
            </div>
          </button>

          {/* Share Button */}
          <button className='ml-3 text-large text-default-500'>
            <FaShare />
          </button>
        </div>
      </CardFooter>
      <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} />
    </Card>
  );
};

export default PostCard;
