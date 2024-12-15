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

      {/* Meet Our Team Section */}
      <section className="mb-12 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Meet Our Team
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Our team is composed of passionate educators, developers, and
          designers committed to delivering a seamless learning experience.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-4">
          Contact Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Have questions? Reach out to us at{" "}
          <a
            href="mailto:info@platformname.com"
            className="text-blue-600 font-semibold underline"
          >
            info@platformname.com
          </a>{" "}
          or follow us on social media for updates!
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
