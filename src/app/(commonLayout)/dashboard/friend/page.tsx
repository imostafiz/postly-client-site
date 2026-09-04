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
        <h1 className="text-lg font-semibold text-[#1C2430]">People</h1>
      </div>

      {users?.map((user: IUser) => (
        <div
          key={user.id}
          className="bg-white/80 border border-[#C9C4B] rounded-2xl p-4"
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
                <p className="text-sm font-semibold text-[#1C2430]">{user.name}</p>
                <p className="text-xs text-[#1C2430]/50">{user.email}</p>
              </div>
            </div>

            {user?.id !== userId && (
              <button
                onClick={() => handleFollowUser(user.id)}
                onKeyDown={(e) => handleKeyDown(e, user.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isFollowing(user.id)
                    ? "bg-[#C9C4B]/30 text-[#1C2430]/60 hover:bg-[#C9C4B]/50"
                    : "bg-white text-[#1C2430] hover:bg-[#C9C4B]/40"
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
