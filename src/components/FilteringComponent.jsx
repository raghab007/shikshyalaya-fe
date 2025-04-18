import React from "react";

export default function FilterSection({ onFilterChange }) {
  const [filters, setFilters] = React.useState({
    category: "",
    priceRange: { min: "", max: "" },
    difficulty: [],
    duration: "",
  });

  const handleInputChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleDifficultyChange = (level) => {
    const updatedDifficulty = filters.difficulty.includes(level)
      ? filters.difficulty.filter((d) => d !== level)
      : [...filters.difficulty, level];
    handleInputChange("difficulty", updatedDifficulty);
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      priceRange: { min: "", max: "" },
      difficulty: [],
      duration: "",
    });
    onFilterChange({
      category: "",
      priceRange: { min: "", max: "" },
      difficulty: [],
      duration: "",
    });
  };

  return (
    <div className="w-full md:w-64 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
        Filter Courses
      </h2>

      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          value={filters.category}
          onChange={(e) => handleInputChange("category", e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="business">Business</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range
        </label>
        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={filters.priceRange.min}
            onChange={(e) =>
              handleInputChange("priceRange", {
                ...filters.priceRange,
                min: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            value={filters.priceRange.max}
            onChange={(e) =>
              handleInputChange("priceRange", {
                ...filters.priceRange,
                max: e.target.value,
              })
            }
          />
        </div>
      </div>

      {/* Difficulty Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Difficulty
        </label>
        <div className="space-y-2">
          {["Beginner", "Intermediate", "Advanced"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.difficulty.includes(level.toLowerCase())}
                onChange={() => handleDifficultyChange(level.toLowerCase())}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        className="w-full bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        onClick={handleResetFilters}
      >
        Reset Filters
      </button>
    </div>
  );
}
