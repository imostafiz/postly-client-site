"use client";

import { toast } from "sonner";
import { Avatar, Button } from "@nextui-org/react";
import { FaUserPlus, FaCheck } from "react-icons/fa";

import Footer from "../Footer/Footer";

import { useGetUser } from "@/src/hooks/auth.hooks";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/features/user";
import { IUser } from "@/src/types";
import ProfileSkeleton from "@/src/skeleton/ProfileSkeleton";

const RightSidebar = () => {
  const { data: newData, refetch: refetchUserData } = useGetUser();
  const userId = newData?.data?.id;
  const { data, isLoading } = useGetAllUserQuery({});
  const [followUser] = useFollowUserMutation();
  const users = data?.data;

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

  const isFollowing = (followeeId: string) => {
    return newData?.data?.following?.some((follower: any) => follower === followeeId);
  };

  return (
    <aside className="hidden lg:block fixed right-0 top-0 h-screen w-[320px] border-l border-gray-800 bg-gray-950 overflow-y-auto">
      <div className="p-6">
        {/* Search Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-1">Suggested for you</h2>
          <p className="text-sm text-gray-500">People you may know</p>
        </div>

        {/* User List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <ProfileSkeleton key={i} />
              ))}
            </div>
          ) : (
            users?.slice(0, 8).map((user: IUser) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar
                    isBordered
                    radius="full"
                    size="md"
                    src={user.profileImage}
                    className="flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-white truncate">
                      {user.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {user?.id !== userId && (
                  <Button
                    size="sm"
                    radius="full"
                    variant={isFollowing(user.id) ? "flat" : "shadow"}
                    color={isFollowing(user.id) ? "default" : "primary"}
                    className={`flex-shrink-0 ml-3 ${
                      isFollowing(user.id)
                        ? "bg-gray-800 text-gray-400"
                        : ""
                    }`}
                    onClick={() => handleFollowUser(user.id)}
                  >
                    {isFollowing(user.id) ? (
                      <span className="flex items-center gap-1">
                        <FaCheck size={10} /> Following
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <FaUserPlus size={10} /> Follow
                      </span>
                    )}
                  </Button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Trending Section */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Trending Topics</h3>
          <div className="flex flex-wrap gap-2">
            {["Gardening", "Plants", "Organic", "Flowers", "Vegetables", "Landscaping"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full hover:bg-blue-500/20 cursor-pointer transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <Footer />
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
