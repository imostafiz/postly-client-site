"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi"; // Importing delete icon from React Icons

import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "@/src/redux/features/user";

import { IUser } from "@/src/types";
import { toast } from "sonner";

const UserManage = () => {
  const { data, refetch } = useGetAllUserQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const allUsers = data?.data || [];

  const handleDelete = async (userId: string) => {
    console.log(userId);
    const res = await deleteUser({});
    toast.success("Account Deleted");
    refetch();
  };

  return (
    <div className='p-6 text-gray-400 b'>
      <h2 className='text-2xl font-semibold mb-4'>User Management</h2>
      <table className='min-w-full bg-[#141414] shadow-md rounded-lg overflow-hidden'>
        <thead className=''>
          <tr>
            <th className='py-2 px-4 text-left'>Image</th>
            <th className='py-2 px-4 text-left'>Name</th>
            <th className='py-2 px-4 text-left'>Email</th>
            <th className='py-2 px-4 text-left'>Role</th>
            <th className='py-2 px-4 text-left'>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers?.map((user: IUser) => (
            <tr key={user.id} className='border-b '>
              <td className='py-1 px-4'>
                <img
                  alt={user.name}
                  className='w-12 h-12 rounded-full object-cover'
                  src={user.profileImage}
                />
              </td>
              <td className='py-2 px-4'>{user.name}</td>
              <td className='py-2 px-4'>{user.email}</td>
              <td className='py-2 px-4 capitalize'>{user.role}</td>
              <td className='py-2 px-4'>
                <button
                  className='text-red-400 hover:text-red-300'
                  onClick={() => handleDelete(user.id)}
                >
                  <FiTrash2 className='w-6 h-6' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManage;
