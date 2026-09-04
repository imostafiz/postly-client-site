"use client";

import { Avatar, Button, Divider, Badge } from "@nextui-org/react";
import { useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaCog, FaHeart, FaImage, FaUserFriends } from "react-icons/fa";

import MyPostCard from "@/src/components/post/MyPostCard";
import { IPost } from "@/src/types";
import { useGetMyPostsQuery } from "@/src/redux/features/post";
import { useGetUser } from "@/src/hooks/auth.hooks";
import UpdateProfileModal from "@/src/modal/UpdateProfileModal";

const Profile = () => {
  const { data: user } = useGetUser();
  const id = user?.data?.id;
  const [isModalOpen, setModalOpen] = useState(false);

  const { data } = useGetMyPostsQuery(id, {
    skip: !id,
  });

  const posts = data?.data;

  return (
    <div className="max-w-[680px] mx-auto">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-48 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F2F1EB]/80" />
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="-mt-16 mb-4 flex items-end justify-between">
            <Badge
              content={<MdVerified className="text-[#1C2430]" size={12} />}
              color="primary"
              shape="circle"
              placement="bottom-right"
              className="border-4 border-[#F2F1EB]"
            >
              <Avatar
                isBordered
                className="w-28 h-28"
                src={user?.data?.profileImage}
                class="border-4 border-[#F2F1EB]"
              />
            </Badge>

            <Button
              variant="bordered"
              size="sm"
              radius="full"
              className="border-[#C9C4B]/60 text-[#1C2430]/80 hover:bg-[#C9C4B]/40"
              onClick={() => setModalOpen(true)}
            >
              Edit Profile
            </Button>
          </div>

          {/* User Info */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#1C2430]">
                  {user?.data?.name}
                </h1>
                {user?.data?.isPremium && (
                  <MdVerified className="text-[#D98E04]" size={20} />
                )}
              </div>
              <p className="text-[#1C2430]/50">{user?.data?.email}</p>
            </div>

            {user?.data?.bio && (
              <p className="text-[#1C2430]/80">{user?.data?.bio}</p>
            )}

            {/* Stats */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <FaImage className="text-[#1C2430]/50" size={14} />
                <span className="text-[#1C2430] font-semibold">{posts?.length || 0}</span>
                <span className="text-[#1C2430]/50">posts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaUserFriends className="text-[#1C2430]/50" size={14} />
                <span className="text-[#1C2430] font-semibold">{user?.data?.followers?.length || 0}</span>
                <span className="text-[#1C2430]/50">followers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FaHeart className="text-[#1C2430]/50" size={14} />
                <span className="text-[#1C2430] font-semibold">{user?.data?.following?.length || 0}</span>
                <span className="text-[#1C2430]/50">following</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {user?.data?.address && (
                <span className="px-3 py-1 text-xs text-[#1C2430]/60 bg-[#C9C4B]/30 rounded-full">
                  {user?.data?.address}
                </span>
              )}
              {user?.data?.phone && (
                <span className="px-3 py-1 text-xs text-[#1C2430]/60 bg-[#C9C4B]/30 rounded-full">
                  {user?.data?.phone}
                </span>
              )}
              {user?.data?.role === "admin" && (
                <span className="px-3 py-1 text-xs text-[#D98E04] bg-[#D98E04]/10 border border-[#D98E04]/20 rounded-full">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Divider className="bg-[#C9C4B]/30" />

      {/* Posts Section */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <FaImage className="text-[#1C2430]/50" size={16} />
          <h2 className="text-lg font-semibold text-[#1C2430]">Posts</h2>
        </div>

        {posts && posts.length > 0 ? (
          <div className="space-y-3">
            {posts.map((singlePost: IPost) => (
              <MyPostCard key={singlePost.id} singlePost={singlePost} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaImage className="mx-auto text-[#1C2430]/30 mb-4" size={48} />
            <p className="text-[#1C2430]/50 text-lg">No posts yet</p>
            <p className="text-[#1C2430]/40 text-sm mt-1">Share your first post!</p>
          </div>
        )}
      </div>

      <UpdateProfileModal
        isOpen={isModalOpen}
        user={user?.data}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
