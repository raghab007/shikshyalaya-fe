import React from "react";

export default function CourseDetails() {
  const course = {
    title: "Learn React - The Complete Guide",
    description:
      "Master React by building real-world projects. This course covers everything from the basics to advanced topics.",
    price: "$49.99",
    rating: 4.8,
    reviews: 124,
    instructor: {
      name: "John Doe",
      bio: "Senior Frontend Developer and experienced instructor with 10+ years in the industry.",
      imageSrc: "https://via.placeholder.com/100",
    },
    content: [
      { id: 1, title: "Introduction to React", duration: "15 mins" },
      { id: 2, title: "Setting Up Your Environment", duration: "20 mins" },
      { id: 3, title: "Understanding JSX", duration: "30 mins" },
      { id: 4, title: "State and Props", duration: "45 mins" },
      { id: 5, title: "Building a Todo App", duration: "1 hr" },
    ],
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Course Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{course.title}</h1>
        <p className="text-lg text-gray-600">{course.description}</p>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Left Section */}
        <div className="md:col-span-2">
          <img
            src="https://picsum.photos/800/400"
            alt="Course Thumbnail"
            className="rounded-lg shadow-md w-full"
          />
          <h2 className="text-2xl font-semibold text-gray-700 mt-6">
            About the Course
          </h2>
          <p className="text-gray-600 mt-4">
            Dive deep into the fundamentals of React and learn to build modern,
            scalable, and performant web applications with ease. This course is
            packed with practical examples and real-world projects to get you
            job-ready.
          </p>
        </div>

        {/* Right Section - Course Details */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Details</h2>
          <p className="text-lg text-gray-700 font-semibold">Price: {course.price}</p>
          <p className="text-lg text-gray-700 font-semibold mt-2">
            Rating: {course.rating} ⭐ ({course.reviews} Reviews)
          </p>
          <button className="w-full bg-blue-500 text-white py-2 rounded-md mt-6 hover:bg-blue-600">
            Enroll Now
          </button>
        </div>
      </div>

      {/* Instructor Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10">
        <div className="flex items-center">
          <img
            src={course.instructor.imageSrc}
            alt={course.instructor.name}
            className="w-20 h-20 rounded-full shadow-md mr-6"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              Instructor: {course.instructor.name}
            </h3>
            <p className="text-gray-600">{course.instructor.bio}</p>
          </div>
        </div>
      </div>

      {/* Course Content Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Content</h2>
        <ul className="space-y-4">
          {course.content.map((item) => (
            <li
              key={item.id}
              className="bg-gray-50 p-4 rounded-md shadow-md flex justify-between items-center"
            >
              <span className="text-gray-700">{item.title}</span>
              <span className="text-gray-500 text-sm">{item.duration}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="bg-gray-100 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Student Reviews</h2>
        <p className="text-gray-600 italic">"This course is amazing!"</p>
        <p className="text-gray-600 italic mt-2">
          "The projects helped me understand React deeply."
        </p>
        <button className="mt-4 text-blue-500 underline hover:text-blue-600">
          See all reviews
        </button>
      </div>
    </div>
  );
}
