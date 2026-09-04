import React, { useState, useEffect } from "react";
import { Avatar, Button, Input } from "@nextui-org/react";
import { GiSelfLove } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { FaShare, FaComment, FaBookmark } from "react-icons/fa";
import { SlLike, SlDislike } from "react-icons/sl";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { toast } from "sonner";
import Link from "next/link";
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
import PremiumModal from "@/src/modal/PremiumModal";

const PostCard = ({ post }: any) => {
  const { data: newData, refetch: refetchUserData } = useGetUser();
  const userId = newData?.data?.id;
  const [createLike] = useCreateLikeMutation();
  const [createDislike] = useCreateDislikeMutation();
  const [followUser] = useFollowUserMutation();
  const [makeFavorite] = useMakeFavoriteMutation();

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(post?.likes || []);
  const [dislikes, setDislikes] = useState(post?.dislikes || []);

  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  useEffect(() => {
    if (post?.likes?.some((like: any) => like?.user?.id === userId)) {
      setIsLiked(true);
    }
    if (post?.dislikes?.some((dislike: any) => dislike?.user?.id === userId)) {
      setIsDisliked(true);
    }
  }, [post, userId]);

  const handleSavePost = async (postId: string) => {
    try {
      const saveData = { post: postId, user: userId };
      const res = await makeFavorite(saveData).unwrap();
      toast.success(res?.message);
    } catch (error: any) {
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
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes.filter((like: any) => like?.user?.id !== userId));
        toast.success("You unliked it");
      } else {
        await createLike(likeObject).unwrap();
        setIsLiked(true);
        setIsDisliked(false);
        setLikes([...likes, { user: { id: userId } }]);
        if (isDisliked) {
          setDislikes(dislikes.filter((dislike: any) => dislike?.user?.id !== userId));
        }
        toast.success("You liked it");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleDislikePost = async (postId: string) => {
    try {
      const dislikeObject = { userId, postId };
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(dislikes.filter((dislike: any) => dislike?.user?.id !== userId));
        toast.success("You unDisliked it");
      } else {
        await createDislike(dislikeObject).unwrap();
        setIsDisliked(true);
        setIsLiked(false);
        setDislikes([...dislikes, { user: { id: userId } }]);
        if (isLiked) {
          setLikes(likes.filter((like: any) => like?.user?.id !== userId));
        }
        toast.success("You disliked it");
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const handleCreateComment = async (postId: string) => {
    if (!commentText.trim()) return;
    try {
      const commentObject = { author: userId, commentText };
      const newComment = await createComment({ commentObject, postId }).unwrap();
      setComments([...comments, newComment]);
      setCommentText("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editingText.trim()) return;
    try {
      const updateObject = { author: userId, commentId, commentText: editingText };
      const updatedComment = await updateComment(updateObject).unwrap();
      setComments(comments.map((comment: any) => comment.id === commentId ? updatedComment : comment));
      setEditingCommentId(null);
      toast.success("Comment updated!");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment({ authorId: userId, commentId }).unwrap();
      setComments(comments.filter((comment: any) => comment.id !== commentId));
      toast.success("Comment deleted!");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="bg-white/80 border border-[#C9C4B]/30 rounded-2xl overflow-hidden">
      {/* Post Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={`/dashboard/user/${post?.userId?.id}`}>
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={post?.userId?.profileImage}
                className="cursor-pointer"
              />
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <Link
                  className="text-sm font-semibold text-[#1C2430] hover:underline"
                  href={`/dashboard/user/${post?.userId?.id}`}
                >
                  {post?.userId?.name}
                </Link>
                {post?.userId?.isPremium && (
                  <MdVerified className="text-[#D98E04]" size={14} />
                )}
              </div>
              <p className="text-xs text-[#1C2430]/50">{post?.category}</p>
            </div>
          </div>

          {post?.userId?.id !== userId && (
            <Button
              size="sm"
              radius="full"
              variant={newData?.data?.following?.some((f: any) => f === post?.userId?.id) ? "flat" : "shadow"}
              color={newData?.data?.following?.some((f: any) => f === post?.userId?.id) ? "default" : "primary"}
              className={newData?.data?.following?.some((f: any) => f === post?.userId?.id) ? "bg-[#C9C4B]/30" : ""}
              onClick={() => handleFollowUser(post?.userId?.id)}
            >
              {newData?.data?.following?.some((f: any) => f === post?.userId?.id) ? "Following" : "Follow"}
            </Button>
          )}
        </div>
      </div>

      {/* Post Image */}
      {post?.image?.length > 0 && (
        <div className="relative">
          <img
            alt={post?.title}
            className="w-full h-[400px] object-cover"
            src={post?.image[0]}
          />
        </div>
      )}

      {/* Post Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-[#1C2430]">{post?.title}</h3>
        <p className="text-[#1C2430]/80 text-sm leading-relaxed">{post?.content}</p>
        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-xs font-medium text-[#D98E04] bg-[#D98E04]/10 rounded-full">
            #{post?.category}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-[#C9C4B]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isLiked ? "text-[#D98E04] bg-[#D98E04]/10" : "text-[#1C2430]/60 hover:bg-[#C9C4B]/40"
              }`}
              onClick={() => handleLikePost(post?.id)}
            >
              {isLiked ? <BiSolidLike size={18} /> : <SlLike size={18} />}
              <span>{likes?.length || 0}</span>
            </button>

            <button
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                isDisliked ? "text-red-600 bg-red-500/10" : "text-[#1C2430]/60 hover:bg-[#C9C4B]/40"
              }`}
              onClick={() => handleDislikePost(post?.id)}
            >
              {isDisliked ? <BiSolidDislike size={18} /> : <SlDislike size={18} />}
              <span>{dislikes?.length || 0}</span>
            </button>

            <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#1C2430]/60 hover:bg-[#C9C4B]/40 transition-colors">
              <FaComment size={16} />
              <span>{comments?.length || 0}</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg text-[#1C2430]/60 hover:bg-[#C9C4B]/40 hover:text-yellow-400 transition-colors"
              onClick={() => handleSavePost(post?.id)}
            >
              <FaBookmark size={18} />
            </button>
            <button className="p-2 rounded-lg text-[#1C2430]/60 hover:bg-[#C9C4B]/40 hover:text-[#D98E04] transition-colors">
              <FaShare size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="px-4 py-3 border-t border-[#C9C4B]">
        {comments.length > 0 && (
          <div className="space-y-3 mb-3 max-h-48 overflow-y-auto">
            {comments.map((comment: any) => (
              <div key={comment?.id} className="flex gap-2">
                <Avatar
                  size="sm"
                  src={comment?.author?.profileImage}
                  className="flex-shrink-0 w-7 h-7"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#1C2430]">
                      {comment?.author?.name || "Anonymous"}
                    </span>
                    {userId === comment?.author?.id && (
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setEditingCommentId(comment?.id);
                            setEditingText(comment?.commentText);
                          }}
                          className="text-xs text-[#1C2430]/50 hover:text-[#D98E04]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment?.id)}
                          className="text-xs text-[#1C2430]/50 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  {editingCommentId === comment?.id ? (
                    <div className="flex gap-2 mt-1">
                      <Input
                        size="sm"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-1"
                      />
                      <Button size="sm" color="primary" onClick={() => handleUpdateComment(comment?.id)}>
                        Save
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-[#1C2430]/60">{comment?.commentText}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Comment Input */}
        <div className="flex gap-2">
          <Avatar size="sm" src={newData?.data?.profileImage} className="flex-shrink-0" />
          <div className="flex-1 flex gap-2">
            <Input
              size="sm"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1"
              classNames={{
                inputWrapper: "bg-[#C9C4B]/30 border-[#C9C4B]/60",
              }}
            />
            <Button
              size="sm"
              color="primary"
              isDisabled={!commentText.trim()}
              onClick={() => handleCreateComment(post?.id)}
            >
              Post
            </Button>
          </div>
        </div>
      </div>

      <PremiumModal isOpen={isPremiumModalOpen} onClose={() => setIsPremiumModalOpen(false)} />
    </div>
  );
};

export default PostCard;
