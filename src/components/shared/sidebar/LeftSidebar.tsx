"use client";

import { Avatar, Divider } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import {
  FaHome,
  FaCog,
  FaBars,
  FaPlus,
  FaSignOutAlt,
  FaHeart,
  FaUserFriends,
  FaFileContract,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";

import { logout } from "@/src/services/authService";
import CreatePostModal from "@/src/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import PremiumModal from "@/src/modal/PremiumModal";
import { useGetUser } from "@/src/hooks/auth.hooks";

const LeftSidebar = () => {
  const { setIsLoading } = useUser();
  const { data } = useGetUser();
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const router = useRouter();
  // const sidebarRef = useRef(null);

  // Explicitly type the ref as HTMLElement
  const sidebarRef = useRef<HTMLElement | null>(null);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
    router.push("/login");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPremiumModal = () => {
    setIsPremiumModalOpen(true);
  };

  const closePremiumModal = () => {
    setIsPremiumModalOpen(false);
  };

  return (
    <>
      <button
        className="lg:hidden fixed top-1 right-4 z-50 p-2 bg-blue-600 rounded-full"
        onClick={toggleSidebar}
      >
        <FaBars className="text-white" size={24} />
      </button>

      {/* Sidebar for large devices, toggle for small */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 p-6 border-r border-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 w-64 z-40 bg-black`}
      >
        <ul className="text-xl text-white">
          <li className="">
            <p className="text-3xl font-title2 font-bold text-white">
              {" "}
              Find Me
            </p>
            <p className="text-3xl font-title2 font-bold text-white">
              {" "}
              Postly from v3
            </p>
          </li>
          {user?.isPremium === false && (
            <li>
              <button
                className="flex items-center justify-center text-yellow-400 border border-yellow-400 rounded-full px-2 py-1 text-sm mt-2"
                onClick={openPremiumModal}
              >
                <RiVipCrownFill size={20} />
                <span className="ml-2">Premium</span>
              </button>
            </li>
          )}
          <Link href={"/dashboard"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaHome className="text-blue-400" size={20} />
                <span>Home</span>
              </button>
            </li>
          </Link>
          <li>
            <button
              className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer"
              onClick={openModal}
            >
              <FaPlus className="text-blue-400" size={20} />
              <span>Create</span>
            </button>
          </li>
          <Link href={"/dashboard/friend"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaUserFriends className="text-blue-400" size={20} />
                <span>Friends</span>
              </button>
            </li>
          </Link>
          <Link href={"/dashboard/favorite"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FaHeart className="text-blue-400" size={20} />
                <span>Favorite</span>
              </button>
            </li>
          </Link>
          {user?.isPremium === true && (
            <Link href={"/contact"}>
              <li>
                <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                  <FaFileContract className="text-blue-400" size={20} />
                  <span>Contact</span>
                </button>
              </li>
            </Link>
          )}
          <Link href={"/about"}>
            <li>
              <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                <FcAbout className="text-blue-400" size={20} />
                <span>About us</span>
              </button>
            </li>
          </Link>
          <Divider className="my-4 md:block hidden" />{" "}
          {/* Divider for medium devices */}
          <Link href={"/dashboard/profile"}>
            <li>
              <button className="flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer">
                <Avatar size="sm" src={user?.profileImage} />
                <span>Profile</span>
                {user?.isPremium && (
                  <MdVerified className="text-blue-700 ml-3" />
                )}
              </button>
            </li>
          </Link>
          <Divider className="mt-4" />
          {user?.role === "admin" && (
            <Link href={"/management/analysis"}>
              <li>
                <button className="flex items-center pt-5 space-x-4 hover:text-blue-600 cursor-pointer">
                  <FaCog className="text-blue-400" size={20} />
                  <span>Admin Layout</span>
                </button>
              </li>
            </Link>
          )}
          <Divider className="my-4" />
          <li>
            <button
              className="flex items-center pt-3 space-x-4 hover:text-blue-600 cursor-pointer"
              onClick={handleLogOut}
            >
              <FaSignOutAlt className="text-blue-400" size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </aside>

      {/* Bottom Navigation for small devices */}
      <nav className="fixed bottom-0 w-full bg-black shadow-md py-2 flex justify-around lg:hidden z-40">
        <Link href={"/dashboard"}>
          <FaHome size={24} />
        </Link>
        <button onClick={openModal}>
          <FaPlus size={24} />
        </button>
        <Link href={"/dashboard/friend"}>
          <FaUserFriends size={24} />
        </Link>
        <Link href={"/dashboard/favorite"}>
          <FaHeart size={24} />
        </Link>
        <Link href={"/dashboard/profile"}>
          <Avatar size="sm" src={user?.profileImage} />
        </Link>
      </nav>

      {/* Modals */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} />
    </>
  );
};

export default LeftSidebar;
