import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import video from "../assets/video.mp4";
import logo from "../assets/logo.png";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from backend
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8085/course/course_category');
        setCategories(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    getCategories();
  }, []);

  // Instructors with better descriptions
  const instructors = [
    {
      name: "Alice Johnson",
      bio: "Senior Developer with 10+ years in tech. Expert in React, Node.js and cloud architecture.",
      imageUrl: "/images/instructor1.jpg",
    },
    {
      name: "Michael Brown",
      bio: "Expert in Business Strategy and Marketing. Former consultant at McKinsey with MBA from Harvard.",
      imageUrl: "/images/instructor2.jpg",
    },
    {
      name: "Emily Davis",
      bio: "Professional Photographer and Content Creator with work featured in National Geographic and Vogue.",
      imageUrl: "/images/instructor3.jpg",
    },
  ];

  const faqs = [
    {
      question: "What is Sikshyalaya?",
      answer:
        "Sikshyalaya is an e-learning platform providing affordable and accessible courses designed to help you master new skills at your own pace. Our platform offers interactive content, real-world projects, and certificates upon completion.",
    },
    {
      question: "How can I enroll in a course?",
      answer:
        "Simply sign up for a free account, browse our catalog of courses, and enroll in your preferred course. Once enrolled, you'll get immediate access to all course materials and can start learning right away.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "We accept eSewa, Khalti, major credit/debit cards, and various banking payment systems to ensure convenient transactions for all our users.",
    },
    {
      question: "Do I get a certificate after completion?",
      answer:
        "Yes! Upon successful completion of any course, you'll receive a verified certificate that you can share on your LinkedIn profile or resume to showcase your new skills.",
    },
    {
      question: "Can I access courses on mobile devices?",
      answer:
        "Absolutely! Our platform is fully responsive and optimized for all devices. You can learn on your computer, tablet, or smartphone, making it easy to continue your education wherever you are.",
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Ensure video autoplays without controls
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    alert(`Thank you for subscribing with ${email}!`);
    setEmail("");
  };

  return (
    <div className="bg-[#e6e8ec] flex flex-col min-h-screen">
      <main>
        {/* Hero Section */}
        <div className="w-full min-h-[85vh] bg-[#e6e8ec] flex flex-col mt-11 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 max-w-5xl animate-fadeIn">
            <h1 className="text-7xl font-extrabold text-[#02084b] text-center leading-tight mb-6">
              Unlock Your Potential with{" "}
              <span className="text-[#02084b]">Sikshyalaya</span>
            </h1>
            <p className="mt-6 text-2xl text-[#02084b] text-center max-w-4xl leading-relaxed mx-auto">
              Discover top-notch courses designed by industry experts. Learn new
              skills, enhance your career, and achieve your goals with ease.
            </p>
            <div className="mt-12 flex justify-center space-x-6">
              <Link to="/courses">
                <button className="px-10 py-5 text-xl font-medium text-white bg-[#02084b] rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
                  Explore more more  Courses
                </button>
              </Link>
              <Link to="/about-us">
                <button className="px-10 py-5 text-xl font-medium text-[#02084b] bg-transparent border-2 border-[#02084b] rounded-full shadow-lg hover:bg-[#02084b] hover:text-white transform hover:-translate-y-1 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Course Preview Video Section */}
        <div className="py-20 px-6 bg-[#e6e8ec]">
          <div className="max-w-6xl mx-auto">
            {/* Blue box with white text */}
            <div className="bg-[#02084b] rounded-xl p-8 mb-12 shadow-lg">
              <h2 className="text-5xl font-bold text-center text-white mb-4">
                Experience <span className="text-white">Learning</span> Like
                Never Before
              </h2>
            </div>
            <div className="rounded-xl overflow-hidden shadow-2xl mx-auto">
              <video
                ref={videoRef}
                className="w-full h-auto object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Course Categories Section */}
        <div className="bg-[#e6e8ec] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-[#02084b] mb-4">
              Explore Our Categories
            </h2>
            <p className="text-xl text-[#02084b] text-center mb-12 max-w-3xl mx-auto">
              Dive into our diverse range of courses designed to help you master
              new skills and advance your career
            </p>
            {isLoading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02084b]"></div>
              </div>
            ) : error ? (
              <div className="text-center text-red-600">
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-[#02084b] text-white rounded-lg hover:bg-[#02084b]/90"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <div
                    key={category.courseCategoryId}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100"
                  >
                    <div className="text-4xl mb-4">📚</div>
                    <h3 className="text-2xl font-bold text-[#02084b] mb-3">
                      {category.courseCategoryName}
                    </h3>
                    <p className="text-[#02084b] mb-5">
                      Explore our wide range of {category.courseCategoryName.toLowerCase()}{" "}
                      courses and learn from the best in the field.
                    </p>
                    <Link
                      to={`/category/${category.courseCategoryId}`}
                      className="inline-flex items-center text-[#02084b] font-medium hover:text-[#0a1e6f] transition"
                    >
                      View Courses <span className="ml-2">&rarr;</span>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-[#e6e8ec] text-[#02084b] py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="p-6">
                <div className="text-5xl font-bold mb-2">10,000+</div>
                <div className="text-xl">Students</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-xl">Courses</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-2">50+</div>
                <div className="text-xl">Expert Instructors</div>
              </div>
              <div className="p-6">
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-xl">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructor Spotlight Section */}
        <div className="bg-[#e6e8ec] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-[#02084b] mb-4">
              Learn From The Best
            </h2>
            <p className="text-xl text-[#02084b] text-center mb-12 max-w-3xl mx-auto">
              Our instructors are industry leaders passionate about sharing
              their expertise
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {instructors.map((instructor, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#02084b] text-3xl font-bold">
                    {instructor.name.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-bold text-center text-[#02084b] mb-3">
                    {instructor.name}
                  </h3>
                  <p className="text-[#02084b] text-center">{instructor.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#e6e8ec] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-[#02084b] mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-[#02084b] text-center mb-12 max-w-3xl mx-auto">
              Hear from our community of learners
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-[#02084b] mb-6 italic">
                  "The programming course exceeded my expectations. I went from
                  knowing nothing to building my own web applications in just 8
                  weeks!"
                </p>
                <div className="font-bold text-[#02084b]">Rajesh Sharma</div>
                <div className="text-[#02084b]">Web Developer</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-[#02084b] mb-6 italic">
                  "The photography course helped me turn my hobby into a
                  profession. The instructor's guidance was invaluable and I now
                  have my own studio."
                </p>
                <div className="font-bold text-[#02084b]">Priya Patel</div>
                <div className="text-[#02084b]">Professional Photographer</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-[#e6e8ec] py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-[#02084b] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-[#02084b] text-center mb-12 max-w-3xl mx-auto">
              Find answers to common questions about our platform
            </p>
            <div className="space-y-6">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-md"
                >
                  <div
                    className="flex justify-between items-center p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200"
                    onClick={() => toggleAnswer(index)}
                  >
                    <h3 className="text-xl font-medium text-[#02084b]">
                      {item.question}
                    </h3>
                    <span className="text-[#02084b] text-2xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out ${openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                      } overflow-hidden`}
                  >
                    <p className="p-6 text-[#02084b]">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-[#e6e8ec] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#02084b] mb-8">
              Connect With Us
            </h2>
            <div className="flex justify-center gap-8">
              <a
                href="https://facebook.com/sikshyalaya"
                className="p-4 bg-[#02084b] text-white rounded-full hover:bg-[#0a1e6f] transition-colors duration-300"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com/sikshyalaya"
                className="p-4 bg-[#02084b] text-white rounded-full hover:bg-[#0a1e6f] transition-colors duration-300"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com/company/sikshyalaya"
                className="p-4 bg-[#02084b] text-white rounded-full hover:bg-[#0a1e6f] transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://instagram.com/sikshyalaya"
                className="p-4 bg-[#02084b] text-white rounded-full hover:bg-[#0a1e6f] transition-colors duration-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-[#e6e8ec] border-t border-gray-100 text-[#02084b] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive offers, learning
              tips, and early access to new courses.
            </p>
            <form
              className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto"
              onSubmit={handleSubmit}
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 rounded-full text-[#02084b] border border-[#02084b] focus:outline-none focus:ring-2 focus:ring-[#0a1e6f] flex-grow"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-[#02084b] text-white font-medium rounded-full hover:bg-[#0a1e6f] transition-colors duration-300 shadow-lg"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
