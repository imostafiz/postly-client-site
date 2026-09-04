"use client";

import { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
} from "@nextui-org/react";
import { toast } from "sonner";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

import { useGetUser } from "../hooks/auth.hooks";
import { useUpdateProfileMutation } from "@/src/redux/features/user";

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

const UpdateProfileModal = ({
  isOpen,
  onClose,
  user,
}: UpdateProfileModalProps) => {
  const [updateProfile] = useUpdateProfileMutation();
  const { refetch } = useGetUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
    }
  }, [user]);

  const handleUserUpdate = async () => {
    const userId = user?.id;

    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile({
        userId,
        userData: { name, email, phone, address },
      }).unwrap();
      toast.success("Profile updated!");
      onClose();
      await refetch();
    } catch (error) {
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
      classNames={{
        base: "bg-white border border-[#C9C4B]",
        header: "border-b border-[#C9C4B]",
        footer: "border-t border-[#C9C4B]",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-[#1C2430] font-semibold">
          Edit profile
        </ModalHeader>
        <ModalBody className="py-4">
          <div className="flex justify-center mb-2">
            <Avatar
              isBordered
              className="w-20 h-20"
              src={user?.profileImage}
            />
          </div>

          <div className="space-y-3">
            <div className="relative">
              <FaUser
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>

            <div className="relative">
              <FaEnvelope
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>

            <div className="relative">
              <FaPhone
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>

            <div className="relative">
              <FaMapMarkerAlt
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-white/60 border border-[#C9C4B] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-[#C9C4B]/30 text-[#1C2430]/60 font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-[#D98E04] text-white font-semibold text-sm"
            isLoading={isLoading}
            onClick={handleUserUpdate}
            disabled={isLoading}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
