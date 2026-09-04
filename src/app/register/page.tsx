"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";

import { registerUser } from "@/src/services/authService";
import { useUser } from "@/src/context/user.provider";
import { Logo } from "@/src/components/icons";

const IMAGE_UPLOAD_LINK =
  "https://api.imgbb.com/1/upload?key=63e5e5d08878e2104d3082bebc10b603";

const RegisterPage = () => {
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [isLoading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (image: File): Promise<string> => {
    const formData = new FormData();
    formData.append("image", image);
    const response = await axios.post(IMAGE_UPLOAD_LINK, formData);
    if (response.data.success) {
      return response.data.data.url;
    }
    throw new Error("Image upload failed");
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter a password.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!agreed) {
      toast.error("Please agree to the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);
      let profileImage = "";

      if (selectedImage) {
        profileImage = await uploadImage(selectedImage);
      }

      const response = await registerUser({
        name,
        email,
        password,
        profileImage: profileImage || undefined,
      });

      if (response.success) {
        setIsLoading(true);
        toast.success("Welcome to Postly!");
        router.push("/dashboard");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F1EB] flex items-center justify-center p-4">
      <div className="w-full max-w-[1040px] flex rounded-3xl overflow-hidden border border-[#C9C4B]/50">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-[45%] relative bg-[#1C2430] p-12 flex-col justify-between">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-16">
              <Logo className="text-[#1C2430]" size={40} />
              <span className="text-xl font-semibold text-[#1C2430]">Postly</span>
            </div>

            <h1 className="text-[40px] font-bold text-[#1C2430] leading-[1.15] mb-4">
              Share what
              <br />
              matters to you.
            </h1>
            <p className="text-[#1C2430]/60 text-base leading-relaxed max-w-sm">
              Create an account to start posting, connecting with others, and
              building your community.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-sm text-[#1C2430]/50">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-[#C9C4B] bg-gray-700 flex items-center justify-center text-xs text-[#1C2430]/60"
                >
                  {i}
                </div>
              ))}
            </div>
            <span>Join 10,000+ users already here</span>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-[55%] bg-[#F2F1EB] p-8 sm:p-12">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-10">
            <Logo className="text-[#1C2430]" size={32} />
            <span className="text-lg font-semibold text-[#1C2430]">Postly</span>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1C2430] mb-1.5">
              Create your account
            </h2>
            <p className="text-[#1C2430]/50 text-sm">
              Fill in the details below to get started
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatar"
              />
              <label htmlFor="avatar" className="cursor-pointer block">
                {preview ? (
                  <img
                    src={preview}
                    alt="Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#C9C4B] group-hover:border-[#C9C4B] transition-colors"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-white border-2 border-dashed border-[#C9C4B]/60 flex items-center justify-center group-hover:border-[#C9C4B] transition-colors">
                    <FaImage className="text-[#1C2430]/40" size={20} />
                  </div>
                )}
              </label>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1C2430]/80">
                Profile photo
              </p>
              <p className="text-xs text-[#1C2430]/40">Optional</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            <div className="relative">
              <FaUser
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper:
                    "bg-white/90 border border-[#C9C4B] hover:border-[#C9C4B] focus-within:border-[#D98E04] h-12",
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
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper:
                    "bg-white/90 border border-[#C9C4B] hover:border-[#C9C4B] focus-within:border-[#D98E04] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>

            <div className="relative">
              <FaLock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                type="password"
                placeholder="Password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper:
                    "bg-white/90 border border-[#C9C4B] hover:border-[#C9C4B] focus-within:border-[#D98E04] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 mt-5 cursor-pointer group">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 rounded border border-[#C9C4B]/60 bg-white peer-checked:bg-[#D98E04] peer-checked:border-[#D98E04] transition-colors flex items-center justify-center">
                {agreed && (
                  <svg
                    className="w-2.5 h-2.5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-xs text-[#1C2430]/50 leading-relaxed">
              I agree to the{" "}
              <span className="text-[#1C2430]/60 hover:text-[#1C2430]/80 cursor-pointer">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#1C2430]/60 hover:text-[#1C2430]/80 cursor-pointer">
                Privacy Policy
              </span>
            </span>
          </label>

          {/* Submit */}
          <Button
            fullWidth
            size="lg"
            className="mt-6 bg-[#C9C4B]/30 text-[#1C2430] font-semibold text-sm hover:bg-[#C9C4B]/40 transition-colors"
            isLoading={isLoading}
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create account"}
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#C9C4B]/80" />
            <span className="px-3 text-xs text-[#1C2430]/40">or</span>
            <div className="flex-1 border-t border-[#C9C4B]/80" />
          </div>

          {/* Login */}
          <p className="text-center text-sm text-[#1C2430]/50">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#1C2430] font-medium hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
