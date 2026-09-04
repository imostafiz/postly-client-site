"use client";

import {
  FaUsers,
  FaShieldAlt,
  FaFeather,
  FaPen,
  FaHeart,
  FaLock,
  FaBullseye,
  FaArrowRight,
} from "react-icons/fa";
import Link from "next/link";

const values = [
  {
    icon: FaUsers,
    title: "Community",
    description: "Connect with people who share your interests and passions.",
    color: "text-[#D98E04]",
    bg: "bg-[#D98E04]/10",
    border: "border-[#D98E04]/20",
  },
  {
    icon: FaShieldAlt,
    title: "Privacy",
    description: "Your data, your control. We never sell your information.",
    color: "text-[#3F6B4F]",
    bg: "bg-[#3F6B4F]/10",
    border: "border-[#3F6B4F]/20",
  },
  {
    icon: FaFeather,
    title: "Simplicity",
    description: "A clean, clutter-free experience focused on what matters.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
];

const features = [
  {
    icon: FaPen,
    title: "Share Freely",
    description: "Post your thoughts, photos, and moments with the world.",
  },
  {
    icon: FaHeart,
    title: "Real Engagement",
    description: "Likes, comments, and meaningful conversations.",
  },
  {
    icon: FaLock,
    title: "Safe Space",
    description: "A moderated, respectful community for everyone.",
  },
];

const stats = [
  { value: "10K+", label: "Active Users" },
  { value: "50K+", label: "Posts Created" },
  { value: "100K+", label: "Likes Given" },
];

const AboutPage = () => {
  return (
    <div className="max-w-[680px] mx-auto space-y-8">
      {/* Hero */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-white mb-4">About Postly</h1>
        <p className="text-gray-400 text-lg max-w-md mx-auto leading-relaxed">
          The space where ideas come alive.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
        <div className="grid grid-cols-3 divide-x divide-[#2A2A2A]">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-6">
              <p className="text-3xl font-bold text-[#D98E04]">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
        <h2 className="text-xl font-semibold text-white mb-6">Our Story</h2>
        <div className="space-y-5">
          <p className="text-gray-300 text-sm leading-relaxed">
            Postly was born from a simple idea: people deserve a clean, honest space to share what matters to them. No algorithms hiding your feed. No clutter distracting from your content. Just you, your thoughts, and the people who care.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            We started in 2024 with a small team and a big dream. Today, thousands of users post, connect, and engage every day. Whether it&apos;s a thought, a photo, or a conversation — Postly is where it happens.
          </p>
        </div>
      </div>

      {/* Our Mission */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-[#D98E04]/10 border border-[#D98E04]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <FaBullseye className="text-[#D98E04]" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Our Mission</h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              To empower people to share what matters to them — freely, safely, and without compromise. We believe everyone deserves a platform that respects their voice and privacy.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6"
            >
              <div
                className={`w-12 h-12 ${value.bg} border ${value.border} rounded-2xl flex items-center justify-center mb-4`}
              >
                <value.icon className={value.color} size={20} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Why Postly */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">Why Postly?</h2>
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex items-start gap-5"
            >
              <div className="w-12 h-12 bg-white/5 border border-[#2A2A2A] rounded-2xl flex items-center justify-center flex-shrink-0">
                <feature.icon className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-3">Join Postly today</h2>
        <p className="text-gray-400 text-sm mb-6">
          Be part of a community that values authenticity.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[#D98E04] text-white px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#D98E04]/90 transition-colors"
        >
          Get Started
          <FaArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;
