import { useState } from "react";
import { Link } from "react-router-dom";
import video from "../assets/video.mp4";
import logo from "../assets/logo.png";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Sikshyalaya?",
      answer: "Sikshyalaya is an e-learning platform providing affordable and accessible courses.",
    },
    {
      question: "How can I enroll in a course?",
      answer: "Simply sign up, browse courses, and enroll in your preferred course.",
    },
    {
      question: "What payment methods are available?",
      answer: "We accept eSewa, Khalti, and major banking payment systems.",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <div className="w-full min-h-[70vh] bg-blue-200 flex flex-col items-center justify-center p-12 shadow-md">
          <h1 className="text-6xl font-extrabold text-gray-900 text-center leading-tight">
            Unlock Your Potential with Sikshyalaya
          </h1>
          <p className="mt-6 text-2xl text-gray-700 text-center max-w-4xl leading-relaxed">
            Discover top-notch courses designed by industry experts. Learn new skills, enhance your
            career, and achieve your goals with ease.
          </p>
          <div className="mt-8 space-x-4">
            <Link to="/courses">
              <button className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition">
                Explore Courses
              </button>
            </Link>
            <Link to="/about-us">
              <button className="px-8 py-4 text-lg font-medium text-blue-600 bg-white border-2 border-blue-600 rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Course Categories Section */}
        <div className="bg-blue-50 py-12 px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {["Programming", "Design", "Business", "Marketing", "Photography", "Health"].map(
              (category, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-bold text-gray-800">{category}</h3>
                  <p className="mt-2 text-gray-600">
                    Explore our wide range of {category.toLowerCase()} courses and learn from the
                    best in the field.
                  </p>
                  <Link
                    to={`/category/${category.toLowerCase()}`}
                    className="inline-block mt-4 text-blue-500 font-medium"
                  >
                    View Courses &rarr;
                  </Link>
                </div>
              )
            )}
          </div>
        </div>

        {/* Instructor Spotlight Section */}
        <div className="bg-blue-100 py-12 px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Meet Our Expert Instructors</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: "Alice Johnson", bio: "Senior Developer with 10+ years in tech.", imageUrl: "/images/instructor1.jpg" },
              { name: "Michael Brown", bio: "Expert in Business Strategy and Marketing.", imageUrl: "/images/instructor2.jpg" },
              { name: "Emily Davis", bio: "Professional Photographer and Content Creator.", imageUrl: "/images/instructor3.jpg" }
            ].map((instructor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <img src={        "data:image/jpeg;base64,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" 
} alt={instructor.name} className="w-full h-48 object-cover rounded-lg" />
                <h3 className="mt-4 font-bold text-gray-800">{instructor.name}</h3>
                <p className="mt-2 text-gray-600">{instructor.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Course Preview Video Section */}
        <div className="bg-gray-50 py-12 px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Get a Sneak Peek</h2>
          <div className="max-w-4xl mx-auto text-center">
            <video className="w-full h-72 object-cover rounded-lg" controls autoPlay muted loop>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-blue-50 py-12 px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Follow Us</h2>
          <div className="flex justify-center gap-6">
            <a href="https://facebook.com/sikshyalaya" className="text-blue-600 hover:text-blue-700">
              Facebook
            </a>
            <a href="https://twitter.com/sikshyalaya" className="text-blue-400 hover:text-blue-500">
              Twitter
            </a>
            <a href="https://linkedin.com/company/sikshyalaya" className="text-blue-800 hover:text-blue-900">
              LinkedIn
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-blue-50 py-12 px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-300 pb-4"
                onClick={() => toggleAnswer(index)}
              >
                <div className="flex justify-between items-center cursor-pointer">
                  <h3 className="text-lg font-medium text-gray-800">{item.question}</h3>
                  <span className="text-blue-500">{openIndex === index ? "-" : "+"}</span>
                </div>
                <div
                  className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                    openIndex === index ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <p className="mt-2 text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div style={{ backgroundColor: "#2e7dad" }} className="text-white py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-lg mb-6">Stay updated with the latest courses and offers.</p>
            <form className="flex flex-col sm:flex-row justify-center gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-800 text-white font-medium rounded-lg hover:bg-blue-900 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Sikshyalaya. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}