"use client";

import { FaRocket, FaUsers, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="max-w-[680px] mx-auto space-y-4">
      <div className="mb-2">
        <h1 className="text-lg font-semibold text-white">About Postly</h1>
        <p className="text-sm text-gray-500">The story behind the platform</p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          Postly was built with one idea in mind: give people a simple, clean space to share what matters to them. No clutter, no noise — just your content and your community.
        </p>
        <p className="text-gray-400 text-sm leading-relaxed">
          We started in 2024 with a small team and a big dream. Today, thousands of users post, connect, and engage every day. Whether it&apos;s a thought, a photo, or a conversation — Postly is where it happens.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaRocket className="text-blue-400" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">Fast & Simple</h3>
          <p className="text-xs text-gray-500">No bloat. Just what you need.</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaUsers className="text-green-400" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">Community</h3>
          <p className="text-xs text-gray-500">Connect with real people.</p>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-5 text-center">
          <div className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
            <FaShieldAlt className="text-purple-400" size={18} />
          </div>
          <h3 className="text-sm font-semibold text-white mb-1">Private</h3>
          <p className="text-xs text-gray-500">Your data, your control.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
