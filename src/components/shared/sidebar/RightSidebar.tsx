"use client";

import { toast } from "sonner";
import { Avatar, Button, Divider } from "@nextui-org/react";

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

  return (
    <>
      <div className="hidden md:block md:mx-8 md:w-1/4">
        <div className="text-gray-600 pt-3">
          <p>Follow them for relevant post</p>
          <Divider className="mt-3" />
        </div>
        <div className="w-full">
          {isLoading ? (
          <>
          <ProfileSkeleton/>
          </>
          ) : (
            users?.slice(0, 6).map((user: IUser) => (
              <div
                key={user.id}
                className="border border-gray-900 rounded-xl p-2 my-3"
              >
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <div>
                      <Avatar
                        isBordered
                        radius="full"
                        size="md"
                        src={user.profileImage}
                      />
                    </div>
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-small font-semibold leading-none text-default-600">
                        {user.name}
                      </h4>
                      <h5 className="text-small tracking-tight text-default-400">
                        {user.email}
                      </h5>
                    </div>
                  </div>
                  <div>
                    {user?.id !== userId && (
                      <Button
                        className="h-[30px] md:px-5"
                        color="primary"
                        radius="full"
                        size="sm"
                        variant="shadow"
                        onClick={() => handleFollowUser(user.id)}
                      >
                        {newData?.data?.following?.some(
                          (follower: any) => follower === user.id
                        )
                          ? "Following"
                          : "Follow"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default RightSidebar;
