import React, { useState } from 'react';

function FilterEnrolledCourse() {
  // State for selected filters and search
  const [sortOption, setSortOption] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [instructorFilter, setInstructorFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

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

  const clearAllFilters = () => {
    setSortOption('');
    setCategoryFilter('');
    setInstructorFilter('');
    setSearchQuery('');
  };

  const removeFilter = (filterType) => {
    switch (filterType) {
      case 'sort':
        setSortOption('');
        break;
      case 'category':
        setCategoryFilter('');
        break;
      case 'instructor':
        setInstructorFilter('');
        break;
      case 'search':
        setSearchQuery('');
        break;
      default:
        break;
    }
  };

  // Category options
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'web-development', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'mobile-development', label: 'Mobile Development' },
    { value: 'design', label: 'Design' }
  ];

  // Instructor options
  const instructors = [
    { value: '', label: 'All Instructors' },
    { value: 'raghab-pokhrel', label: 'Raghab Pokhrel' },
    { value: 'aastha-aryal', label: 'Aastha Aryal' },
    { value: 'alish-sunuwar', label: 'Alish Sunuwar' },
    { value: 'niroj-gofle', label: 'Niroj Bahadur Gofle' }
  ];

  // Sort options
  const sortOptions = [
    { value: '', label: 'Default Sorting' },
    { value: 'title-asc', label: 'Title A-Z' },
    { value: 'title-desc', label: 'Title Z-A' },
    { value: 'date-asc', label: 'Date (Oldest First)' },
    { value: 'date-desc', label: 'Date (Newest First)' }
  ];

  const hasActiveFilters = sortOption || categoryFilter || instructorFilter || searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Main search bar and filter toggle */}
      <div className="p-3 border-b border-gray-100">
        <div className="flex items-center">
          <form onSubmit={handleSearchSubmit} className="flex flex-1">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your enrolled courses..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search
            </button>
          </form>

          <button
            type="button"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="ml-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg className="h-4 w-4 mr-1.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                {(sortOption ? 1 : 0) + (categoryFilter ? 1 : 0) + (instructorFilter ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable filter section */}
      {isFilterExpanded && (
        <div className="p-3 bg-gray-50 border-b border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">Filter Options</h3>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Sort dropdown */}
            <div>
              <label htmlFor="sort" className="block text-xs font-medium text-gray-700 mb-1">
                Sort by
              </label>
              <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1.5"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Category dropdown */}
            <div>
              <label htmlFor="category" className="block text-xs font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1.5"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Instructor dropdown */}
            <div>
              <label htmlFor="instructor" className="block text-xs font-medium text-gray-700 mb-1">
                Instructor
              </label>
              <select
                id="instructor"
                value={instructorFilter}
                onChange={handleInstructorChange}
                className="block w-full text-sm rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-1.5"
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
      )}

      {/* Applied filters display */}
      {hasActiveFilters && (
        <div className="px-3 py-2 bg-gray-50 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Active filters:</span>
          
          {sortOption && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
              <span>{sortOptions.find(option => option.value === sortOption)?.label}</span>
              <button 
                onClick={() => removeFilter('sort')}
                className="h-4 w-4 rounded-full hover:bg-blue-200 inline-flex items-center justify-center"
                aria-label="Remove sort filter"
              >
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
          
          {categoryFilter && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
              <span>{categories.find(category => category.value === categoryFilter)?.label}</span>
              <button 
                onClick={() => removeFilter('category')}
                className="h-4 w-4 rounded-full hover:bg-green-200 inline-flex items-center justify-center"
                aria-label="Remove category filter"
              >
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
          
          {instructorFilter && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
              <span>{instructors.find(instructor => instructor.value === instructorFilter)?.label}</span>
              <button 
                onClick={() => removeFilter('instructor')}
                className="h-4 w-4 rounded-full hover:bg-purple-200 inline-flex items-center justify-center"
                aria-label="Remove instructor filter"
              >
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
          
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700">
              <span>Search: {searchQuery}</span>
              <button 
                onClick={() => removeFilter('search')}
                className="h-4 w-4 rounded-full hover:bg-yellow-200 inline-flex items-center justify-center"
                aria-label="Remove search filter"
              >
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default FilterEnrolledCourse;