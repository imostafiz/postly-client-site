"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { FaEnvelope, FaLock, FaLeaf, FaSeedling, FaTree } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import { useForgetPasswordMutation } from "@/src/redux/features/user";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useUser } from "@/src/context/user.provider";

interface LoginDataType {
  email: string;
  password: string;
}

const LoginPage = () => {
  const searchParams = useSearchParams();
  const [forgetPassword] = useForgetPasswordMutation();

  const redirect = searchParams.get("redirect");
  const router = useRouter();
  const { setIsLoading } = useUser();
  const [loginData, setLoginData] = useState<LoginDataType>({
    email: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      toast.error("Please enter a valid email.");
      return;
    }
    try {
      await forgetPassword({ email: forgotEmail }).unwrap();
      toast.success("Password reset link sent to your email.");
      setIsModalOpen(false);
      setForgotEmail("");
    } catch (error) {
      toast.error("Failed to send reset link.");
    }
  };

  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    isError,
  } = useUserLogin();

  const handleLogin = () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    handleUserLogin(loginData);
    setIsLoading(true);
  };

  useEffect(() => {
    if (isSuccess) {
      router.push(redirect || "/dashboard");
    }
    if (isError) {
      toast.error("Login failed. Please check your credentials.");
    }
  }, [isSuccess, isError, redirect, router]);

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-gray-950" />
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
            Connect with
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Gardeners
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-12 max-w-md">
            Share your gardening journey, discover new tips, and grow together with our community of plant enthusiasts.
          </p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                <FaLeaf className="text-blue-400" size={18} />
              </div>
              <span className="text-gray-300">Share tips & tricks with the community</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                <FaSeedling className="text-green-400" size={18} />
              </div>
              <span className="text-gray-300">Track your plant growth journey</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center">
                <FaTree className="text-purple-400" size={18} />
              </div>
              <span className="text-gray-300">Connect with fellow gardeners</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
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
            <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
            <p className="text-gray-500">Sign in to continue to your garden</p>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={handleInputChange}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-900 border-gray-800 hover:border-gray-700 focus-within:border-blue-500",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button
              fullWidth
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
              isLoading={isPending}
              onClick={handleLogin}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-800" />
            <span className="px-4 text-sm text-gray-600">or continue with</span>
            <div className="flex-1 border-t border-gray-800" />
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Create one now
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-gray-700 mt-12">
            &copy; 2024 Postly. All rights reserved.
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <IoMdClose size={24} />
            </button>

            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FaLock className="text-blue-400" size={24} />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">Forgot Password?</h2>
              <p className="text-gray-500 text-sm">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <div className="relative mb-6">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <Input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="pl-12"
                classNames={{
                  inputWrapper: "bg-gray-800 border-gray-700",
                  input: "text-white placeholder-gray-500",
                }}
              />
            </div>

            <div className="flex gap-3">
              <Button
                fullWidth
                variant="flat"
                className="bg-gray-800 text-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                onClick={handleForgotPassword}
              >
                Send Reset Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const WrappedLoginPage = () => (
  <Suspense
    fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }
  >
    <LoginPage />
  </Suspense>
);

export default WrappedLoginPage;
