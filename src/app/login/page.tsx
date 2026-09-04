"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { toast } from "sonner";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

import { useForgetPasswordMutation } from "@/src/redux/features/user";
import { useUserLogin } from "@/src/hooks/auth.hooks";
import { useUser } from "@/src/context/user.provider";
import { Logo } from "@/src/components/icons";

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
              Welcome
              <br />
              back.
            </h1>
            <p className="text-[#1C2430]/60 text-base leading-relaxed max-w-sm">
              Sign in to continue to your feed, messages, and notifications.
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
              Sign in to your account
            </h2>
            <p className="text-[#1C2430]/50 text-sm">
              Enter your credentials to continue
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-3.5">
            <div className="relative">
              <FaEnvelope
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                name="email"
                type="email"
                placeholder="Email address"
                value={loginData.email}
                onChange={handleInputChange}
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
                name="password"
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={handleInputChange}
                className="pl-11"
                classNames={{
                  inputWrapper:
                    "bg-white/90 border border-[#C9C4B] hover:border-[#C9C4B] focus-within:border-[#D98E04] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-[#1C2430]/50 hover:text-[#1C2430]/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit */}
          <Button
            fullWidth
            size="lg"
            className="mt-6 bg-[#C9C4B]/30 text-[#1C2430] font-semibold text-sm hover:bg-[#C9C4B]/40 transition-colors"
            isLoading={isPending}
            onClick={handleLogin}
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-[#C9C4B]/80" />
            <span className="px-3 text-xs text-[#1C2430]/40">or</span>
            <div className="flex-1 border-t border-[#C9C4B]/80" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-[#1C2430]/50">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#1C2430] font-medium hover:underline underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#1C2430]/60 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-white border border-[#C9C4B] rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-[#1C2430]/50 hover:text-[#1C2430] transition-colors"
            >
              <IoMdClose size={20} />
            </button>

            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#1C2430] mb-1.5">
                Reset your password
              </h2>
              <p className="text-[#1C2430]/50 text-sm">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            </div>

            <div className="relative mb-5">
              <FaEnvelope
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#1C2430]/40"
                size={15}
              />
              <Input
                type="email"
                placeholder="Email address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="pl-11"
                classNames={{
                  inputWrapper:
                    "bg-white/90 border border-[#C9C4B] h-12",
                  input: "text-[#1C2430] text-sm placeholder-[#1C2430]/35",
                }}
              />
            </div>

            <div className="flex gap-3">
              <Button
                fullWidth
                variant="flat"
                className="bg-[#C9C4B]/30 text-[#1C2430]/80 font-medium text-sm h-11"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                className="bg-[#C9C4B]/30 text-[#1C2430] font-semibold text-sm h-11"
                onClick={handleForgotPassword}
              >
                Send link
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
      <div className="min-h-screen bg-[#F2F1EB] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#C9C4B]/60 border-t-[#D98E04] rounded-full animate-spin" />
      </div>
    }
  >
    <LoginPage />
  </Suspense>
);

export default WrappedLoginPage;
