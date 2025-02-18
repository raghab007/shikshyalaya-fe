import { useState  } from "react";
import { Link } from "react-router-dom";
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
                <img src={instructor.imageUrl} alt={instructor.name} className="w-full h-48 object-cover rounded-lg" />
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
            <video className="w-full h-72 object-cover rounded-lg" controls>
              <source src="/videos/course-preview.mp4" type="video/mp4" />
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
        <div className="bg-blue-600 text-white py-12 px-6">
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
