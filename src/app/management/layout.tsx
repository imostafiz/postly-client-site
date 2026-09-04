"use client";

import React, { ReactNode, useState } from "react";
import {
  FaHome,
  FaUser,
  FaChartBar,
  FaSignOutAlt,
  FaBars,
  FaEdit,
} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { logout } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";

const ManagementLayout = ({ children }: { children: ReactNode }) => {
  const { setIsLoading } = useUser();
  const [isOpen, setIsOpen] = useState(false); // State to manage sidebar visibility
  const router = useRouter();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
    router.push("/login");
  };

  return (
    <div className='flex min-h-screen relative'>
      {/* Toggle Button for Mobile Devices */}
      <button
        className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#C9C4B]/30 text-[#1C2430] rounded-full'
        onClick={toggleSidebar}
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 p-4 bg-[#1C2430] text-[#1C2430] border-r border-[#C9C4B] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 w-64 z-40`}
      >
        {/* Sidebar upper section */}
        <ul className='space-y-4 mt-10'>
          <li className=''>
            <p className='text-3xl font-bold  font-title2 text-[#1C2430]'>
              Find Me
            </p>
          </li>
          <li>
            <Link href='/management/userManage'>
              <button className='flex items-center space-x-2 py-2 hover:text-[#1C2430]/60 w-full text-left'>
                <FaUser size={20} />
                <span>User Management</span>
              </button>
            </Link>
          </li>
          <li>
            <Link href='/management/postManage'>
              <button className='flex items-center space-x-2 py-2 hover:text-[#1C2430]/60 w-full text-left'>
                <FaEdit size={20} />
                <span>Post Management</span>
              </button>
            </Link>
          </li>
          <li>
            <Link href='/management/analysis'>
              <button className='flex items-center space-x-2 py-2 hover:text-[#1C2430]/60 w-full text-left'>
                <FaChartBar size={20} />
                <span>Analysis</span>
              </button>
            </Link>
          </li>
        </ul>

        {/* Sidebar bottom section */}
        <div className='absolute bottom-4 w-full'>
          <li>
            <Link href='/dashboard'>
              <button className='flex items-center space-x-4 hover:text-[#1C2430]/60 w-full text-left px-2'>
                <FaHome size={20} />
                <span>Home</span>
              </button>
            </Link>
          </li>
          <li>
            <button
              className='flex items-center space-x-4 hover:text-[#D98E04] w-full text-left px-2'
              onClick={handleLogOut}
            >
              <FaSignOutAlt size={20} />
              <span>Logout</span>
            </button>
          </li>
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-[#1C2430] opacity-50 z-30 lg:hidden'
          role='button'
          tabIndex={0} // Ensure keyboard accessibility
          onClick={toggleSidebar}
          onKeyDown={(e) => e.key === "Enter" && toggleSidebar()} // Handle keyboard interaction
        />
      )}

      {/* Content Area */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${isOpen ? "ml-0" : "ml-0 lg:ml-64"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ManagementLayout;
