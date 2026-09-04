"use client";

import { Avatar } from "@nextui-org/react";
import { toast } from "sonner";
import { FaUserFriends } from "react-icons/fa";

import { useGetUser } from "@/src/hooks/auth.hooks";
import {
  useFollowUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/features/user";
import { IUser } from "@/src/types";

const Friend = () => {
  const { data: newData, refetch: refetchUserData } = useGetUser();
  const userId = newData?.data?.id;
  const { data } = useGetAllUserQuery({});
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

  const handleKeyDown = (event: React.KeyboardEvent, followeeId: string) => {
    if (event.key === "Enter") {
      handleFollowUser(followeeId);
    }
  };

  const isFollowing = (followeeId: string) => {
    return newData?.data?.following?.some(
      (follower: any) => follower === followeeId,
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <FaUserFriends className="text-[#D98E04]" size={18} />
        <h1 className="text-lg font-semibold text-white">People</h1>
      </div>

      {users?.map((user: IUser) => (
        <div
          key={user.id}
          className="bg-[#141414]/80 border border-[#2A2A2A] rounded-2xl p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src={user.profileImage}
              />
              <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>

            {user?.id !== userId && (
              <button
                onClick={() => handleFollowUser(user.id)}
                onKeyDown={(e) => handleKeyDown(e, user.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isFollowing(user.id)
                    ? "bg-[#2A2A2A] text-gray-400 hover:bg-[#2A2A2A]/90"
                    : "bg-[#141414] text-white hover:bg-[#2A2A2A]/80"
                }`}
              >
                {isFollowing(user.id) ? "Following" : "Follow"}
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Friend;
