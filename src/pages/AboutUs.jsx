import React from "react";

function AboutUs() {
  return (
    <div className="bg-gray-50 py-12 px-6 md:px-20">
      {/* Welcome Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Welcome to Sikshyalaya
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          We are a cutting-edge e-learning platform dedicated to providing
          affordable, high-quality courses to learners worldwide. Whether you
          want to upskill, reskill, or explore new interests, we have something
          for you!
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our mission is to make education accessible and empower individuals to
          achieve their goals through knowledge and learning.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Why Choose Us?
        </h2>
        <ul className="list-disc pl-6 text-gray-700 text-lg space-y-2">
          <li>Wide range of courses from beginner to advanced levels.</li>
          <li>Affordable pricing with flexible learning schedules.</li>
          <li>
            Interactive features like quizzes and community discussions.
          </li>
          <li>Accessible anytime, anywhere, on any device.</li>
        </ul>
      </section>

      {/* Statistics Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold text-blue-600">50k+</h3>
            <p className="text-gray-700 mt-2">Learners Enrolled</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-700 mt-2">Courses Available</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold text-blue-600">4.9/5</h3>
            <p className="text-gray-700 mt-2">Average Rating</p>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Our team is composed of passionate educators, developers, and
          designers committed to delivering a seamless learning experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-300"></div>
            <p className="mt-4 text-lg font-semibold text-blue-600">John Doe</p>
            <p className="text-gray-700">Founder & CEO</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-300"></div>
            <p className="mt-4 text-lg font-semibold text-blue-600">Jane Smith</p>
            <p className="text-gray-700">Lead Educator</p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 mx-auto rounded-full bg-gray-300"></div>
            <p className="mt-4 text-lg font-semibold text-blue-600">Emily Johnson</p>
            <p className="text-gray-700">Product Designer</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          Have questions? Reach out to us at{" "}
          <a
            href="mailto:info@platformname.com"
            className="text-blue-600 font-semibold underline"
          >
            info@platformname.com
          </a>{" "}
          or follow us on social media for updates!
        </p>
        <div className="flex space-x-4">
          <a href="#" className="text-blue-600 text-2xl">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-blue-600 text-2xl">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-blue-600 text-2xl">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
