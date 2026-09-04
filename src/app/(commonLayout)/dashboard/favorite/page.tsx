"use client";

import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import { MdVerified } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

import { useGetUser } from "@/src/hooks/auth.hooks";
import { useGetMyFavoritePostQuery } from "@/src/redux/features/post";

const FavoritePostPage = () => {
  const { data } = useGetUser();
  const userId = data?.data?.id;

  const { data: postData } = useGetMyFavoritePostQuery(userId);
  const posts = postData?.data;

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <FaHeart className="text-red-400" size={18} />
        <h1 className="text-lg font-semibold text-white">Favorites</h1>
      </div>

      {posts?.length > 0 ? (
        posts.map((item: any) => {
          const post = item.post;
          return (
            <div
              key={item.id}
              className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden"
            >
              {/* Post Header */}
              <div className="p-4">
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
                        className="text-sm font-semibold text-white hover:underline"
                        href={`/dashboard/user/${post?.userId?.id}`}
                      >
                        {post?.userId?.name}
                      </Link>
                      {post?.userId?.isPremium && (
                        <MdVerified className="text-blue-500" size={14} />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{post?.category}</p>
                  </div>
                </div>
              </div>

              {/* Post Image */}
              {post?.image?.length > 0 && (
                <div className="relative">
                  <img
                    alt={post?.title}
                    className="w-full h-[300px] object-cover"
                    src={post.image[0]}
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-4 space-y-2">
                <h3 className="text-base font-bold text-white">{post?.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {post?.content}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500 pt-1">
                  <span>{post?.likes?.length || 0} likes</span>
                  <span>{post?.comments?.length || 0} comments</span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center py-16">
          <FaHeart className="mx-auto text-gray-700 mb-4" size={40} />
          <p className="text-gray-500">No favorite posts yet</p>
          <p className="text-gray-600 text-sm mt-1">
            Posts you like will appear here
          </p>
        </div>
      )}
    </div>
  );
};

export default FavoritePostPage;
