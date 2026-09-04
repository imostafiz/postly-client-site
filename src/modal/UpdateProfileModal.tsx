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
        base: "bg-gray-900 border border-gray-800",
        header: "border-b border-gray-800",
        footer: "border-t border-gray-800",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-white font-semibold">
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
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
              <Input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
                  input: "text-white text-sm placeholder-gray-600",
                }}
              />
            </div>

            <div className="relative">
              <FaEnvelope
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
              <Input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
                  input: "text-white text-sm placeholder-gray-600",
                }}
              />
            </div>

            <div className="relative">
              <FaPhone
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
                  input: "text-white text-sm placeholder-gray-600",
                }}
              />
            </div>

            <div className="relative">
              <FaMapMarkerAlt
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-600"
                size={15}
              />
              <Input
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper: "bg-gray-950/50 border border-gray-800 h-12",
                  input: "text-white text-sm placeholder-gray-600",
                }}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="gap-2">
          <Button
            className="bg-gray-800 text-gray-300 font-medium text-sm"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="bg-white text-gray-950 font-semibold text-sm"
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
