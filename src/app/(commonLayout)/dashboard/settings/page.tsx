"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import { useUser } from "@/src/context/user.provider";

const Settings = () => {
  const { user } = useUser();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isLoading, setLoading] = useState(false);

  const handleSave = async () => {
    toast.success("Settings saved!");
  };

  return (
    <div className="max-w-[680px] mx-auto">
      <div className="mb-6">
        <h1 className="text-lg font-semibold text-[#1C2430]">Settings</h1>
        <p className="text-sm text-[#1C2430]/50">Manage your account preferences</p>
      </div>

      <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-5 space-y-4">
        <div className="relative">
          <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40" size={15} />
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="pl-11"
            classNames={{
              inputWrapper: "bg-white border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />
        </div>

        <div className="relative">
          <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40" size={15} />
          <Input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-11"
            classNames={{
              inputWrapper: "bg-white border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />
        </div>

        <div className="relative">
          <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40" size={15} />
          <Input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="pl-11"
            classNames={{
              inputWrapper: "bg-white border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />
        </div>

        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40" size={15} />
          <Input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="pl-11"
            classNames={{
              inputWrapper: "bg-white border border-[#C9C4B] h-12",
              input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
            }}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button
            className="bg-white text-gray-950 font-semibold text-sm px-6"
            isLoading={isLoading}
            onClick={handleSave}
          >
            Save changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
