"use client";
import { useState } from "react";
import { FaSearch, FaSlidersH } from "react-icons/fa";

import UserPost from "@/src/components/post/UserPost";
import { useGetAllPostQuery } from "@/src/redux/features/post";

const MainPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const { data, isLoading } = useGetAllPostQuery({
    search: searchValue,
    sortBy,
  });

  const sortOptions = [
    { value: "", label: "Latest" },
    { value: "like", label: "Most Liked" },
    { value: "dislike", label: "Most Disliked" },
    { value: "comments", label: "Most Commented" },
  ];

  return (
    <div className="space-y-3">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-[#F2F1EB]/80 backdrop-blur-xl py-3 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1C2430]/50" size={14} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#C9C4B] rounded-xl text-[#1C2430] placeholder-[#1C2430]/40 focus:outline-none focus:border-[#D98E04] focus:ring-1 focus:ring-[#D98E04] transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                sortBy
                  ? "bg-[#D98E04]/10 border-[#D98E04]/30 text-[#D98E04]"
                  : "bg-white border-[#C9C4B] text-[#1C2430]/60 hover:border-[#C9C4B]/60"
              }`}
            >
              <FaSlidersH size={14} />
              <span className="text-sm font-medium hidden sm:inline">
                {sortOptions.find((o) => o.value === sortBy)?.label || "Sort"}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isSortOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-[#C9C4B] rounded-xl shadow-xl z-20 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        sortBy === option.value
                          ? "bg-[#D98E04]/10 text-[#D98E04]"
                          : "text-[#1C2430]/60 hover:bg-[#C9C4B]/40 hover:text-[#1C2430]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Active Filter Tag */}
        {sortBy && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[#1C2430]/50">Sorted by:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#D98E04] bg-[#D98E04]/10 border border-[#D98E04]/20 rounded-full">
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <button
                onClick={() => setSortBy("")}
                className="ml-1 hover:text-[#D98E04]/70"
              >
                &times;
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Posts Feed */}
      <UserPost isLoading={isLoading} posts={data?.data} />
    </div>
  );
};

export default MainPage;
