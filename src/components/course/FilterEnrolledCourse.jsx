function FilterEnrolledCourse() {
  return (
    <div className="flex justify-evenly items-center h-24 bg-gray-50 border-b border-gray-200 px-5">
      {/* Sort by Section */}
      <div className="flex flex-col items-center justify-center w-1/4 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-2">Sort by</p>
        <div className="w-full">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white cursor-pointer transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Filter by Section */}
      <div className="flex flex-col items-center justify-center w-1/4 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-2">Filter by</p>
        <div className="flex gap-3 w-full">
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white cursor-pointer transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Category</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
          </select>
          <select className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white cursor-pointer transition-colors hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Select Instructor</option>
            <option value="raghab-pokhrel">Raghab Pokhrel</option>
            <option value="aastha-aryal">Aastha Aryal</option>
            <option value="john-doe">Alish Sunuwar</option>
            <option value="jane-smith">Niroj bahadur gofle</option>
          </select>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex items-center justify-between w-1/4 border border-gray-200 rounded-lg p-3 bg-white shadow-sm">
        <input
          type="search"
          placeholder="Search your courses"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-2 px-4 py-2 border border-green-500 rounded-md bg-green-500 text-white text-sm font-medium hover:bg-green-600 transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}

export default FilterEnrolledCourse;