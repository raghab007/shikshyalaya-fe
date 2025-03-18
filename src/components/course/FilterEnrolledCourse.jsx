import React, { useState } from 'react';

function FilterEnrolledCourse() {
  // State for selected filters and search
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleInstructorChange = (e) => {
    setInstructorFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Here you would implement search functionality
    console.log("Searching for:", searchQuery);
  };

  // Category options
  const categories = [
    { value: '', label: 'Select Category' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design' }
  ];

  // Instructor options
  const instructors = [
    { value: '', label: 'Select Instructor' },
    { value: 'raghab-pokhrel', label: 'Raghab Pokhrel' },
    { value: 'aastha-aryal', label: 'Aastha Aryal' },
    { value: 'alish-sunuwar', label: 'Alish Sunuwar' },
    { value: 'niroj-gofle', label: 'Niroj Bahadur Gofle' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'date-desc', label: 'Date (Newest First)' }
  ];

  return (
    <div className="filter-controls p-4 bg-gray-50 rounded-lg shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sort by Section */}
        <div className="filter-section">
          <h3 className="text-lg font-medium mb-2">Sort by</h3>
          <div className="relative">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="" disabled>Select sorting option</option>
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter by Section */}
        <div className="filter-section">
          <h3 className="text-lg font-medium mb-2">Filter by</h3>
          <div className="space-y-3">
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <select
                value={instructorFilter}
                onChange={handleInstructorChange}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                {instructors.map(instructor => (
                  <option key={instructor.value} value={instructor.value}>
                    {instructor.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="filter-section">
          <h3 className="text-lg font-medium mb-2">Search</h3>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full p-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Applied Filters Display */}
      <div className="mt-4">
        {(sortOption || categoryFilter || instructorFilter || searchQuery) && (
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-sm font-medium text-gray-700">Applied filters:</span>
            
            {sortOption && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {sortOptions.find(option => option.value === sortOption)?.label}
              </span>
            )}
            
            {categoryFilter && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                {categories.find(category => category.value === categoryFilter)?.label}
              </span>
            )}
            
            {instructorFilter && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                {instructors.find(instructor => instructor.value === instructorFilter)?.label}
              </span>
            )}
            
            {searchQuery && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                Search: {searchQuery}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterEnrolledCourse;