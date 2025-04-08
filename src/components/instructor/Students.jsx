import React, {useEffect, useState} from "react";

function EnrolledStudents() {
    // Static data for enrolled students
    const enrolledStudents = [
        { id: 1, name: "Raghab Pokhrel", email: "raghab@email.com", course: "React Basics", enrollmentDate: "2023-10-01"  },
        { id: 2, name: "Aastha Aryal", email: "aastha@gmail.com", course: "Advanced JavaScript", enrollmentDate: "2023-10-02"  },
        { id: 3, name: "Niroj Panta", email: "niroj@gmail.com", course: "React Basics", enrollmentDate: "2023-10-03" },
        { id: 4, name: "Pemba Lama", email: "pemba@gmail.com", course: "Node.js Fundamentals", enrollmentDate: "2023-10-04" },
        { id: 5, name: "Alish Sunuwar", email: "alish@gmail.com", course: "Advanced JavaScript", enrollmentDate: "2023-10-05" },
    ];

    // States
    const [courseFilter, setCourseFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    // Get unique course titles for the dropdown
    const uniqueCourses = [...new Set(enrolledStudents.map((student) => student.course))];
    const uniqueStatuses = [...new Set(enrolledStudents.map((student) => student.status))];

    useEffect(() => {

    })
    // Handle sort
    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Filtered and sorted students
    const filteredStudents = enrolledStudents.filter((student) => {
        const matchesCourse = courseFilter ? student.course === courseFilter : true;
        const matchesDate = dateFilter ? student.enrollmentDate === dateFilter : true;
        const matchesStatus = statusFilter ? student.status === statusFilter : true;
        const matchesSearch = searchQuery 
            ? student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              student.email.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesCourse && matchesDate && matchesStatus && matchesSearch;
    }).sort((a, b) => {
        if (sortConfig.key) {
            const direction = sortConfig.direction === 'ascending' ? 1 : -1;
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return -1 * direction;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return 1 * direction;
            }
        }
        return 0;
    });

    // Reset all filters
    const resetFilters = () => {
        setCourseFilter("");
        setDateFilter("");
        setStatusFilter("");
        setSearchQuery("");
        setSortConfig({ key: null, direction: 'ascending' });
    };

    // Export to CSV
    const exportToCSV = () => {
        const headers = ["ID", "Name", "Email", "Course", "Enrollment Date", "Status"];
        const csvData = [
            headers.join(","),
            ...filteredStudents.map(student => 
                [student.id, student.name, student.email, student.course, student.enrollmentDate, student.status].join(",")
            )
        ].join("\n");
        
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'enrolled_students.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    // Get sort direction indicator
    const getSortDirectionIndicator = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    // Determine status badge style
    const getStatusBadgeClass = (status) => {
        switch(status) {
            case 'Active':
                return 'bg-green-100 text-green-800';
            case 'Inactive':
                return 'bg-red-100 text-red-800';
            case 'On Hold':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 bg-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <h1 className="text-2xl font-bold text-gray-800">Enrolled Students</h1>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <button 
                                onClick={exportToCSV}
                                className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <span>Export CSV</span>
                            </button>
                            <button 
                                onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                                className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <span>{isFiltersVisible ? 'Hide Filters' : 'Show Filters'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Search and Quick Stats */}
                    <div className="mt-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full p-2 pl-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex gap-4 text-sm w-full md:w-auto justify-between md:justify-end">
                            <div className="text-center">
                                <div className="font-semibold text-lg text-blue-600">{enrolledStudents.length}</div>
                                <div className="text-gray-500">Total</div>
                            </div>




                            <div className="text-center">
                                <div className="font-semibold text-lg text-green-600">
                                    {enrolledStudents.filter(s => s.status === 'Active').length}
                                </div>
                                <div className="text-gray-500">Active</div>
                            </div>
                            <div className="text-center">
                                <div className="font-semibold text-lg text-red-600">
                                    {enrolledStudents.filter(s => s.status === 'Inactive').length}
                                </div>
                                <div className="text-gray-500">Inactive</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filter Section */}
                {isFiltersVisible && (
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                                <select
                                    value={courseFilter}
                                    onChange={(e) => setCourseFilter(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Courses</option>
                                    {uniqueCourses.map((course, index) => (
                                        <option key={index} value={course}>
                                            {course}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Date</label>
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                        </div>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={resetFilters}
                                className="flex items-center gap-1 px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                            >
                                <span>Reset Filters</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Table Section */}
                <div className="overflow-x-auto">
                    {filteredStudents.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => requestSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Name {getSortDirectionIndicator('name')}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => requestSort('email')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Email {getSortDirectionIndicator('email')}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => requestSort('course')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Course {getSortDirectionIndicator('course')}
                                        </div>
                                    </th>
                                    <th 
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => requestSort('enrollmentDate')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Enrollment Date {getSortDirectionIndicator('enrollmentDate')}
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredStudents.map((student) => (
                                    <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{student.name}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{student.course}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(student.enrollmentDate).toLocaleDateString()}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            <p>No students match your search criteria.</p>
                            <button
                                onClick={resetFilters}
                                className="mt-2 text-blue-500 hover:text-blue-700 underline"
                            >
                                Reset filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer with result count */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500">
                    Showing {filteredStudents.length} out of {enrolledStudents.length} students
                </div>
            </div>
        </div>
    );
}

export default EnrolledStudents;