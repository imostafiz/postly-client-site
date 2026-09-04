"use client";

import { Avatar, Badge } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  FaSearch,
  FaBell,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { RiVipCrownFill } from "react-icons/ri";
import { FcAbout } from "react-icons/fc";
import { IoMdClose } from "react-icons/io";

import { logout } from "@/src/services/authService";
import CreatePostModal from "@/src/modal/CreatePostModal";
import { useUser } from "@/src/context/user.provider";
import PremiumModal from "@/src/modal/PremiumModal";
import { useGetUser } from "@/src/hooks/auth.hooks";

interface NavItemProps {
  href?: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  badge?: string;
}

const NavItem = ({ href, icon, label, onClick, isActive, badge }: NavItemProps) => {
  const content = (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-blue-600/20 to-blue-500/10 text-blue-400 border border-blue-500/30"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <span className={`text-lg ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"}`}>
        {icon}
      </span>
      <span className="font-medium">{label}</span>
      {badge && (
        <Badge content={badge} color="primary" size="sm" className="ml-auto">
          <span />
        </Badge>
      )}
    </button>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
};

const LeftSidebar = () => {
  const { setIsLoading } = useUser();
  const { data } = useGetUser();
  const user = data?.data;
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLElement | null>(null);

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogOut = () => {
    setIsLoading(true);
    logout();
    router.push("/login");
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openPremiumModal = () => setIsPremiumModalOpen(true);
  const closePremiumModal = () => setIsPremiumModalOpen(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 lg:left-6 z-50 p-2.5 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 transition-colors"
        onClick={toggleSidebar}
      >
        {isOpen ? <IoMdClose className="text-white" size={20} /> : <FaBars className="text-white" size={20} />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-4 lg:left-6 z-50 w-[280px] bg-gray-950 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-800/50">
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">Postly</h1>
                <p className="text-xs text-gray-500">Social Platform</p>
              </div>
            </Link>
          </div>

          {/* Premium Banner */}
          {user?.isPremium === false && (
            <div className="px-4 py-4">
              <button
                onClick={openPremiumModal}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl hover:from-yellow-500/20 hover:to-orange-500/20 transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <RiVipCrownFill className="text-yellow-400" size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-yellow-400">Upgrade to Premium</p>
                  <p className="text-xs text-gray-500">Unlock exclusive features</p>
                </div>
              </button>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Menu</p>
            <NavItem
              href="/dashboard"
              icon={<FaHome size={18} />}
              label="Home"
              isActive={pathname === "/dashboard"}
            />
            <NavItem
              icon={<FaPlus size={18} />}
              label="Create Post"
              onClick={openModal}
            />
            <NavItem
              href="/dashboard/friend"
              icon={<FaUserFriends size={18} />}
              label="Friends"
              isActive={pathname === "/dashboard/friend"}
            />
            <NavItem
              href="/dashboard/favorite"
              icon={<FaHeart size={18} />}
              label="Favorites"
              isActive={pathname === "/dashboard/favorite"}
            />

            {user?.isPremium === true && (
              <>
                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">Premium</p>
                </div>
                <NavItem
                  href="/contact"
                  icon={<FaFileContract size={18} />}
                  label="Contact"
                  isActive={pathname === "/contact"}
                />
              </>
            )}

            <div className="pt-4 pb-2">
              <p className="px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">More</p>
            </div>
            <NavItem
              href="/about"
              icon={<FcAbout size={18} />}
              label="About"
              isActive={pathname === "/about"}
            />
          </nav>

          {/* Profile & Admin Section */}
          <div className="px-4 py-4 border-t border-gray-800/50">
            <NavItem
              href="/dashboard/profile"
              icon={
                <div className="relative">
                  <Avatar size="sm" src={user?.profileImage} className="w-8 h-8" />
                  {user?.isPremium && (
                    <MdVerified className="text-blue-500 absolute -bottom-0.5 -right-0.5" size={12} />
                  )}
                </div>
              }
              label={user?.name || "Profile"}
              isActive={pathname === "/dashboard/profile"}
            />

            {user?.role === "admin" && (
              <div className="mt-2">
                <NavItem
                  href="/management/analysis"
                  icon={<FaCog size={18} />}
                  label="Admin Panel"
                  isActive={pathname.startsWith("/management")}
                />
              </div>
            )}

            <div className="mt-3">
              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
              >
                <FaSignOutAlt size={18} className="group-hover:text-red-400" />
                <span className="font-medium">Log out</span>
              </button>
            </div>
          </div>

          {/* User Info Card */}
          <div className="px-4 pb-4">
            <div className="px-4 py-3 bg-gray-900/50 rounded-xl border border-gray-800">
              <div className="flex items-center gap-3">
                <Avatar size="sm" src={user?.profileImage} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Bottom Navigation for mobile */}
      <nav className="fixed bottom-0 w-full bg-gray-950 border-t border-gray-800 py-2 px-4 flex justify-around items-center lg:hidden z-40">
        <Link href="/dashboard" className={`p-3 rounded-xl transition-colors ${pathname === "/dashboard" ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white"}`}>
          <FaHome size={20} />
        </Link>
        <button onClick={openModal} className="p-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <FaPlus size={20} />
        </button>
        <Link href="/dashboard/friend" className={`p-3 rounded-xl transition-colors ${pathname === "/dashboard/friend" ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white"}`}>
          <FaUserFriends size={20} />
        </Link>
        <Link href="/dashboard/favorite" className={`p-3 rounded-xl transition-colors ${pathname === "/dashboard/favorite" ? "text-blue-400 bg-blue-500/10" : "text-gray-400 hover:text-white"}`}>
          <FaHeart size={20} />
        </Link>
        <Link href="/dashboard/profile" className={`p-1 rounded-xl transition-colors ${pathname === "/dashboard/profile" ? "ring-2 ring-blue-500" : ""}`}>
          <Avatar size="sm" src={user?.profileImage} className="w-8 h-8" />
        </Link>
      </nav>

      {/* Modals */}
      <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />
      <PremiumModal isOpen={isPremiumModalOpen} onClose={closePremiumModal} />
    </>
  );
};

export default LeftSidebar;
