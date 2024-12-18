import { Link } from "react-router-dom";
import { useState } from "react";
import homeImage from "../assets/istockphoto-1919863292-1024x1024.jpg";
import reactImage from "../assets/react.png";
import jsImage from "../assets/istockphoto-1919863292-1024x1024.jpg";

export default function Home() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  const popularCourses = [
    {
      title: "React for Beginners",
      image: reactImage,
      description: "Learn the basics of React and build dynamic UIs.",
    },
    {
      title: "Java Spring Boot",
      description: "Master backend development with Spring Boot.",
    },
    {
      title: "JavaScript Essentials",
      image: jsImage,
      description:
        "Understand the fundamentals of JavaScript for web development.",
    },
  ];

  return (
    <div className="bg-gray-50 font-sans">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 p-8 shadow-lg rounded-lg">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={homeImage}
            alt="Learning"
            className="w-full max-w-lg rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Text */}
        <div className="flex-1 mt-6 md:mt-0 md:ml-8 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-blue-800 leading-tight">
            Welcome to Sikshyalaya
          </h1>
          <p className="mt-4 text-lg text-gray-700 font-medium">
            Empowering Knowledge, One Click at a Time
          </p>
          <p className="mt-2 text-sm italic text-gray-500">
            An investment in knowledge pays the best interest. - Benjamin
            Franklin
          </p>
          <Link to="/courses" className="inline-block mt-6">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition">
              Explore Courses
            </button>
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-blue-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose Sikshyalaya?
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            - Expert Tutors from Around the World <br />
            - Affordable and Accessible Courses <br />
            - Comprehensive and Industry-Relevant Content <br />- Learn at Your
            Own Pace with Flexible Timelines
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-blue-100 py-12">
        <h1 className="text-center font-bold text-lg text-gray-800">How It Works</h1>
        <div className="py-12 px-6 flex flex-col lg:flex-row justify-between">
          <div className="border-2 border-black rounded-lg p-8 mb-6 lg:mb-0">
            <h2 className="font-bold mb-2 text-lg">1. Sign Up</h2>
            <p>Create an account in minutes by providing your details and accessing the student dashboard.</p>
          </div>
          <div className="border-2 border-black rounded-lg p-8 mb-6 lg:mb-0">
            <h2 className="font-bold mb-2 text-lg">2. Select a Course</h2>
            <p>Browse our wide range of courses, choose your preferred subject, and enroll instantly.</p>
          </div>
          <div className="border-2 border-black rounded-lg p-8">
            <h2 className="font-bold mb-2 text-lg">3. Start Learning</h2>
            <p>Access course materials, join interactive lessons, and complete assignments at your own pace.</p>
          </div>
        </div>
      </div>

      {/* Question and Answer Section */}
      <div className="bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3
                className="text-xl font-semibold text-blue-800 cursor-pointer"
                onClick={() => toggleAnswer(0)}
              >
                What is Sikshyalaya?
              </h3>
              {activeQuestion === 0 && (
                <p className="text-gray-700 mt-2">
                  Sikshyalaya is an e-learning platform that connects students with expert tutors worldwide, offering industry-relevant courses at affordable prices.
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3
                className="text-xl font-semibold text-blue-800 cursor-pointer"
                onClick={() => toggleAnswer(1)}
              >
                How do I enroll in a course?
              </h3>
              {activeQuestion === 1 && (
                <p className="text-gray-700 mt-2">
                  Simply create an account, browse our course catalog, select your preferred course, and click "Enroll" to start learning.
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3
                className="text-xl font-semibold text-blue-800 cursor-pointer"
                onClick={() => toggleAnswer(2)}
              >
                Are there any free courses available?
              </h3>
              {activeQuestion === 2 && (
                <p className="text-gray-700 mt-2">
                  Yes, we offer a variety of free courses to help you get started on your learning journey.
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3
                className="text-xl font-semibold text-blue-800 cursor-pointer"
                onClick={() => toggleAnswer(3)}
              >
                Can I access courses on mobile devices?
              </h3>
              {activeQuestion === 3 && (
                <p className="text-gray-700 mt-2">
                  Yes, our platform is fully responsive and accessible on smartphones, tablets, and desktop devices.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
