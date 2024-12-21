import React from "react";

function AboutUs() {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Header Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          About Sikshyalaya
        </h1>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Your trusted e-learning platform, empowering learners worldwide with
          affordable, high-quality courses. Explore new possibilities, upskill,
          and achieve your goals with us!
        </p>
      </section>

      {/* Welcome Section */}
      <section className="mb-16 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Welcome to Sikshyalaya
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          At Sikshyalaya, we believe in breaking barriers to education by making
          learning accessible to everyone. Our platform offers a wide range of
          courses designed to help you master new skills, advance your career,
          and pursue your passions.
        </p>
      </section>

      {/* Mission Section */}
      <section className="mb-16 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex-1 bg-blue-100 p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to democratize education and empower learners of all
            ages by providing high-quality, affordable courses that are
            accessible anytime, anywhere.
          </p>
        </div>
        <div className="flex-1 bg-blue-100 p-10 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-blue-700 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be a global leader in online education by fostering a
            collaborative and inclusive learning environment where every
            individual can thrive.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Why Choose Sikshyalaya?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="fas fa-book-open"
            title="Diverse Courses"
            description="Over 500 courses ranging from technology to arts."
          />
          <FeatureCard
            icon="fas fa-dollar-sign"
            title="Affordable Pricing"
            description="Learn without breaking the bank."
          />
          <FeatureCard
            icon="fas fa-comments"
            title="Interactive Learning"
            description="Engage in discussions and quizzes."
          />
          <FeatureCard
            icon="fas fa-mobile-alt"
            title="Learn Anywhere"
            description="Access courses on any device, anytime."
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16 bg-blue-700 text-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StatisticCard value="50k+" label="Learners Enrolled" />
          <StatisticCard value="500+" label="Courses Offered" />
          <StatisticCard value="4.9/5" label="Average Rating" />
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Meet Our Team
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-10 text-center">
          We are a passionate team of educators, technologists, and designers
          committed to creating an exceptional learning experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember name="John Doe" role="Founder & CEO" />
          <TeamMember name="Jane Smith" role="Lead Educator" />
          <TeamMember name="Emily Johnson" role="Product Designer" />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 p-10 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold text-blue-700 mb-6">
          Get in Touch
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-4">
          We’d love to hear from you! Email us at 
          <a
            href="mailto:info@sikshyalaya.com"
            className="text-blue-700 font-semibold underline mx-1"
          >
            info@sikshyalaya.com
          </a>
          or connect with us on social media.
        </p>
        <div className="flex justify-center space-x-4">
          <SocialIcon platform="facebook" />
          <SocialIcon platform="twitter" />
          <SocialIcon platform="instagram" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="flex flex-col items-center text-center">
      <i className={`${icon} text-4xl text-blue-700 mb-4`}></i>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
}

function StatisticCard({ value, label }) {
  return (
    <div>
      <h3 className="text-5xl font-bold text-white mb-2">{value}</h3>
      <p className="text-lg text-gray-200">{label}</p>
    </div>
  );
}

function TeamMember({ name, role }) {
  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-4"></div>
      <p className="text-lg font-semibold text-blue-700">{name}</p>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}

function SocialIcon({ platform }) {
  const platforms = {
    facebook: "fab fa-facebook",
    twitter: "fab fa-twitter",
    instagram: "fab fa-instagram",
  };

  return (
    <a
      href="#"
      className="text-blue-700 text-2xl hover:text-blue-900 transition"
      aria-label={platform}
    >
      <i className={platforms[platform]}></i>
    </a>
  );
}

export default AboutUs;