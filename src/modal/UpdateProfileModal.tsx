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
} from "@nextui-org/react";
import { toast } from "sonner";

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
  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      });
    }
  }, [user]);

  // eslint-disable-next-line prettier/prettier
  const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUserUpdate = async () => {
    const userId = user?.id;

    if (!userId) {
      toast.error("User ID is not available.");

      return;
    }

    try {
      const userData = { ...formData };

      await updateProfile({ userId, userData }).unwrap();
      toast.success("Profile updated successfully!");
      onClose();
      await refetch();
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Update Profile
        </ModalHeader>
        <ModalBody>
          <Input
            label="Name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            label="Email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <Input
            className="mt-4"
            label="Phone"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <Input
            className="mt-4"
            label="Address"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" size="sm" variant="flat" onPress={onClose}>
            Close
          </Button>
          <Button color="primary" size="sm" onPress={handleUserUpdate}>
            Save changes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateProfileModal;
