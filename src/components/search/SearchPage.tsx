"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";

// Define the type for the props
interface SearchPageProps {
  onSearch: (searchTerm: string) => void; // onSearch should accept a string
  onSort: (sortOption: string) => void; // onSort should accept a string
}

const SearchPage: React.FC<SearchPageProps> = ({ onSearch, onSort }) => {
  const [searchValue, setSearchValue] = useState<string>(""); // searchValue state as string
  const [sortOption, setSortOption] = useState<string>(""); // sortOption state as string

  // Handle search event
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue); // Pass the search value to the parent
  };

  // Handle sort change event
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSort(e.target.value); // Pass the sort option to the parent
  };

  return (
    <div className="flex justify-center items-center bg-[#1C2430]">
      <form className="w-full max-w-sm bg-[#1C2430] w-full" onSubmit={handleSearch}>
        <div className="flex items-center border-b border-gray-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-[#1C2430]/30 mr-3 py-1 px-2 leading-tight focus:outline-none"
            placeholder="Search..."
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} // Update searchValue on input change
          />
          <Button size="sm"
            // className="flex-shrink-0 bg-gray-500 hover:bg-gray-700 border-gray-500 hover:border-gray-700 text-sm border-4 text-white py-1 font-sm px-2 rounded-full"
            // type="submit"
          >
            Search
          </Button >
        </div>
      </form>

      {/* Sort dropdown */}
      <select
        className=" bg-[#1C2430] md:p-2 rounded"
        value={sortOption}
        onChange={handleSortChange} // Handle dropdown change
      >
        <option value="">Sort By</option>
        <option value="like">Most Liked</option>
        <option value="dislike">Most Disliked</option>
        <option value="comments">Most Comments</option>
      </select>
    </div>
  );
};

export default SearchPage;
