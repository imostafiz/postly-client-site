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
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-xl py-4 -mx-4 px-4 lg:mx-0 lg:px-0">
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                sortBy
                  ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
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
                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-20 overflow-hidden">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        sortBy === option.value
                          ? "bg-blue-500/10 text-blue-400"
                          : "text-gray-400 hover:bg-gray-800 hover:text-white"
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
            <span className="text-xs text-gray-500">Sorted by:</span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
              {sortOptions.find((o) => o.value === sortBy)?.label}
              <button
                onClick={() => setSortBy("")}
                className="ml-1 hover:text-blue-300"
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
