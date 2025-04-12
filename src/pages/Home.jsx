import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import video from "../assets/video.mp4";
import logo from "../assets/logo.png";

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  const [email, setEmail] = useState("");
  const videoRef = useRef(null);

  // Categories with icons
  const categories = [
    { name: "Programming", icon: "💻" },
    { name: "Design", icon: "🎨" },
    { name: "Business", icon: "📊" },
    { name: "Marketing", icon: "📱" },
    { name: "Photography", icon: "📷" },
    { name: "Health", icon: "🏥" }
  ];

  // Instructors with better descriptions
  const instructors = [
    { 
      name: "Alice Johnson", 
      bio: "Senior Developer with 10+ years in tech. Expert in React, Node.js and cloud architecture.", 
      imageUrl: "/images/instructor1.jpg" 
    },
    { 
      name: "Michael Brown", 
      bio: "Expert in Business Strategy and Marketing. Former consultant at McKinsey with MBA from Harvard.", 
      imageUrl: "/images/instructor2.jpg" 
    },
    { 
      name: "Emily Davis", 
      bio: "Professional Photographer and Content Creator with work featured in National Geographic and Vogue.", 
      imageUrl: "/images/instructor3.jpg" 
    }
  ];

  const faqs = [
    {
      question: "What is Sikshyalaya?",
      answer: "Sikshyalaya is an e-learning platform providing affordable and accessible courses designed to help you master new skills at your own pace. Our platform offers interactive content, real-world projects, and certificates upon completion."
    },
    {
      question: "How can I enroll in a course?",
      answer: "Simply sign up for a free account, browse our catalog of courses, and enroll in your preferred course. Once enrolled, you'll get immediate access to all course materials and can start learning right away."
    },
    {
      question: "What payment methods are available?",
      answer: "We accept eSewa, Khalti, major credit/debit cards, and various banking payment systems to ensure convenient transactions for all our users."
    },
    {
      question: "Do I get a certificate after completion?",
      answer: "Yes! Upon successful completion of any course, you'll receive a verified certificate that you can share on your LinkedIn profile or resume to showcase your new skills."
    },
    {
      question: "Can I access courses on mobile devices?",
      answer: "Absolutely! Our platform is fully responsive and optimized for all devices. You can learn on your computer, tablet, or smartphone, making it easy to continue your education wherever you are."
    },
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    // Ensure video autoplays without controls
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
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
    <div className="bg-white flex flex-col min-h-screen">
      <main>
        {/* Hero Section - Matched with navbar color */}
        <div className="w-full min-h-[85vh] bg-gradient-to-br from-[#2e7dad] to-[#1c5f8f] flex flex-col items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 max-w-5xl animate-fadeIn">
            <h1 className="text-7xl font-extrabold text-white text-center leading-tight mb-6">
              Unlock Your Potential with <span className="text-yellow-300">Sikshyalaya</span>
            </h1>
            <p className="mt-6 text-2xl text-gray-100 text-center max-w-4xl leading-relaxed mx-auto">
              Discover top-notch courses designed by industry experts. Learn new skills, enhance your
              career, and achieve your goals with ease.
            </p>
            <div className="mt-12 flex justify-center space-x-6">
              <Link to="/courses">
                <button className="px-10 py-5 text-xl font-medium text-[#2e7dad] bg-white rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition duration-300">
                  Explore Courses
                </button>
              </Link>
              <Link to="/about-us">
                <button className="px-10 py-5 text-xl font-medium text-white bg-transparent border-2 border-white rounded-full shadow-lg hover:bg-white hover:text-[#2e7dad] transform hover:-translate-y-1 transition duration-300">
                  Learn More
                </button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        {/* Course Preview Video Section - Moved up for better engagement */}
        <div className="py-20 px-6 bg-gradient-to-b from-white to-[#e8f1f8]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-12">
              Experience <span className="text-[#2e7dad]">Learning</span> Like Never Before
            </h2>
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

        {/* Course Categories Section - Enhanced with icons */}
        <div className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Dive into our diverse range of courses designed to help you master new skills and advance your career
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border border-gray-100"
                >
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-5">
                    Explore our wide range of {category.name.toLowerCase()} courses and learn from the
                    best in the field.
                  </p>
                  <Link
                    to={`/category/${category.name.toLowerCase()}`}
                    className="inline-flex items-center text-[#2e7dad] font-medium hover:text-[#1c5f8f] transition"
                  >
                    View Courses <span className="ml-2">&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Statistics Section - Matched with navbar color */}
        <div className="bg-[#2e7dad] text-white py-16 px-6">
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
        <div className="bg-[#f1f7fb] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
              Learn From The Best
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Our instructors are industry leaders passionate about sharing their expertise
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {instructors.map((instructor, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-[#e8f1f8] flex items-center justify-center text-[#2e7dad] text-3xl font-bold">
                    {instructor.name.charAt(0)}
                  </div>
                  <h3 className="text-2xl font-bold text-center text-gray-800 mb-3">{instructor.name}</h3>
                  <p className="text-gray-600 text-center">{instructor.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-[#e8f1f8] py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Hear from our community of learners
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 mb-6 italic">"The programming course exceeded my expectations. I went from knowing nothing to building my own web applications in just 8 weeks!"</p>
                <div className="font-bold">Rajesh Sharma</div>
                <div className="text-gray-500">Web Developer</div>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <div className="text-yellow-500 text-2xl mb-4">★★★★★</div>
                <p className="text-gray-700 mb-6 italic">"The photography course helped me turn my hobby into a profession. The instructor's guidance was invaluable and I now have my own studio."</p>
                <div className="font-bold">Priya Patel</div>
                <div className="text-gray-500">Professional Photographer</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Find answers to common questions about our platform
            </p>
            <div className="space-y-6">
              {faqs.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden transition-shadow duration-300 hover:shadow-md"
                >
                  <div 
                    className="flex justify-between items-center p-6 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => toggleAnswer(index)}
                  >
                    <h3 className="text-xl font-medium text-gray-800">{item.question}</h3>
                    <span className="text-[#2e7dad] text-2xl">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </div>
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <p className="p-6 text-gray-600">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social Media Links Section */}
        <div className="bg-[#f1f7fb] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Connect With Us</h2>
            <div className="flex justify-center gap-8">
              <a href="https://facebook.com/sikshyalaya" className="p-4 bg-[#2e7dad] text-white rounded-full hover:bg-[#246890] transition-colors duration-300">
                Facebook
              </a>
              <a href="https://twitter.com/sikshyalaya" className="p-4 bg-[#2e7dad] text-white rounded-full hover:bg-[#246890] transition-colors duration-300">
                Twitter
              </a>
              <a href="https://linkedin.com/company/sikshyalaya" className="p-4 bg-[#2e7dad] text-white rounded-full hover:bg-[#246890] transition-colors duration-300">
                LinkedIn
              </a>
              <a href="https://instagram.com/sikshyalaya" className="p-4 bg-[#2e7dad] text-white rounded-full hover:bg-[#246890] transition-colors duration-300">
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section - Matched with navbar color */}
        <div className="bg-[#2e7dad] text-white py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Start Your Learning Journey Today</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and get exclusive offers, learning tips, and early access to new courses.
            </p>
            <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#1c5f8f] flex-grow"
                required
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-[#2e7dad] font-medium rounded-full hover:bg-[#f0f0f0] transition-colors duration-300 shadow-lg"
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