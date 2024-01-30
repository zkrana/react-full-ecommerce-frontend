import React, { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  { id: 1, name: "Product A", category: "Category 1" },
  { id: 2, name: "Product B", category: "Category 2" },
  { id: 3, name: "Product C", category: "Category 1" },
  // Add more products as needed
];

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const handleSearch = () => {
    const filteredResults = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filteredResults);
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          placeholder="Search products or categories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-800 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-900 focus:outline-none"
        >
          <SearchIcon />
        </button>
      </div>

      {showResults && (
        <div
          ref={searchRef}
          className="mt-4 absolute top-7 left-0 w-full bg-white z-30 p-5 shadow-sm"
        >
          <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="border-b border-gray-300 py-2 last:border-b-0"
              >
                {result.name} - {result.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Search;
