"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt, FaImage, FaUsers, FaCamera, FaHeart } from "react-icons/fa";

import { registerUser } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

const RegisterPage = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    const imageData = new FormData();
    imageData.append("image", image);
    const response = await axios.post(IMAGE_UPLOAD_LINK, imageData);
    if (response.data.success) {
      return response.data.data.url;
    }
    throw new Error("Image upload failed");
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      let profileImageUrl = "";

      if (selectedImage) {
        profileImageUrl = await uploadImage(selectedImage);
      }

      const userData = {
        ...formData,
        profileImage: profileImageUrl || undefined,
      };

      const response = await registerUser(userData);
      if (response.success) {
        setIsLoading(true);
        toast.success("Registration successful!");
        router.push("/dashboard");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error: any) {
      toast.error("Error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/10 to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-3xl font-bold text-white">Postly</span>
          </div>

          {/* Tagline */}
          <h1 className="text-5xl font-bold text-white leading-tight mb-6">
            Start Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Journey
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Join millions of people sharing their stories, ideas, and moments. Connect with friends and discover new content.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <FaUsers className="text-blue-400" size={18} />
              </div>
              <span className="text-gray-300">Create your profile</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                <FaCamera className="text-green-400" size={18} />
              </div>
              <span className="text-gray-300">Share photos & moments</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <FaHeart className="text-purple-400" size={18} />
              </div>
              <span className="text-gray-300">Get advice from friends</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-white">Postly</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Create an account</h2>
            <p className="text-gray-500">Join the conversation today</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Name */}
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="name"
                type="text"
                placeholder="Full name *"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="email"
                type="email"
                placeholder="Email address *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="password"
                type="password"
                placeholder="Password (min. 6 characters) *"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            {/* Phone */}
            <div className="relative">
              <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            {/* Address */}
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            {/* Profile Image */}
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input
                name="profileImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="profileImage"
              />
              <label
                htmlFor="profileImage"
                className="flex items-center gap-3 w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-500 hover:border-gray-700 cursor-pointer transition-colors"
              >
                {selectedImage ? (
                  <span className="text-gray-300 truncate">{selectedImage.name}</span>
                ) : (
                  <span>Choose profile image (optional)</span>
                )}
              </label>
            </div>

            <Button
              fullWidth
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold mt-6"
              isLoading={isLoading}
              onClick={handleRegister}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-700 mt-12">
            &copy; 2024 Postly. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
