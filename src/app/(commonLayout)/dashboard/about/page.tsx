"use client";

import { FaRocket, FaUsers, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-[680px] mx-auto space-y-4">
      <div className="mb-2">
        <h1 className="text-lg font-semibold text-[#1C2430]">About Postly</h1>
        <p className="text-sm text-[#1C2430]/50">The story behind the platform</p>
      </div>

      <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-6">
        <p className="text-[#1C2430]/80 text-sm leading-relaxed mb-4">
          Postly was built with one idea in mind: give people a simple, clean space to share what matters to them. No clutter, no noise — just your content and your community.
        </p>
        <p className="text-[#1C2430]/60 text-sm leading-relaxed">
          We started in 2024 with a small team and a big dream. Today, thousands of users post, connect, and engage every day. Whether it&apos;s a thought, a photo, or a conversation — Postly is where it happens.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-[#D98E04]/10 border border-[#D98E04]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaRocket className="text-[#D98E04]" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-[#1C2430] mb-1">Fast & Simple</h3>
          <p className="text-xs text-[#1C2430]/50">No bloat. Just what you need.</p>
        </div>

        <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-green-400" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-[#1C2430] mb-1">Community</h3>
          <p className="text-xs text-[#1C2430]/50">Connect with real people.</p>
        </div>

        <div className="bg-white/80 border border-[#C9C4B] rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaShieldAlt className="text-purple-400" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-[#1C2430] mb-1">Private</h3>
          <p className="text-xs text-[#1C2430]/50">Your data, your control.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
