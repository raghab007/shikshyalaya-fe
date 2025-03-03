import React from "react";
import '../styles/aboutus.css'

function AboutUs() {
  return (
    <div className="bg-gray-50 py-16 px-6 md:px-20">
      {/* Header Section with Animation */}
      <section className="mb-16 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          About Sikshyalaya
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
          Your trusted e-learning platform, empowering learners worldwide with
          affordable, high-quality courses. Explore new possibilities, upskill,
          and achieve your goals with us!
        </p>
      </section>

      {/* Welcome Section with Gradient */}
      <section className="mb-16 bg-gradient-to-br from-blue-600 to-purple-600 p-10 rounded-2xl shadow-xl text-white transform transition hover:scale-[1.005]">
        <h2 className="text-4xl font-bold mb-6">Welcome to Sikshyalaya</h2>
        <p className="text-gray-100 text-xl leading-relaxed font-medium">
          At Sikshyalaya, we believe in breaking barriers to education by making
          learning accessible to everyone. Our platform offers a wide range of
          courses designed to help you master new skills, advance your career,
          and pursue your passions.
        </p>
      </section>

      {/* Mission/Vision Section */}
      <section className="mb-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-2xl shadow-lg border-l-8 border-blue-600 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Democratize education and empower learners of all ages through
            affordable, high-quality courses accessible anytime, anywhere.
          </p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg border-l-8 border-purple-600 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-purple-800 mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Become the global leader in online education through collaborative,
            inclusive learning environments where everyone can thrive.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-blue-800 mb-12 text-center">
          Why Choose Sikshyalaya?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="fas fa-book-open text-purple-600"
            title="Diverse Courses"
            description="500+ courses across technology, business, and creative arts"
          />
          <FeatureCard
            icon="fas fa-dollar-sign text-green-600"
            title="Affordable Pricing"
            description="Quality education that fits your budget"
          />
          <FeatureCard
            icon="fas fa-comments text-blue-600"
            title="Interactive Learning"
            description="Live sessions, forums, and peer collaboration"
          />
          <FeatureCard
            icon="fas fa-mobile-alt text-red-600"
            title="Learn Anywhere"
            description="Seamless experience across all devices"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16 relative bg-blue-900 text-white py-20 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>
        <h2 className="text-4xl font-bold mb-12 text-center">Our Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
          <StatisticCard value="50k+" label="Successful Learners" />
          <StatisticCard value="500+" label="Expert Courses" />
          <StatisticCard value="98%" label="Satisfaction Rate" />
        </div>
      </section>

      {/* Team Section */}
      <section className="mb-16 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-blue-800 mb-12 text-center">
          Meet Our Team
        </h2>
        <p className="text-gray-700 text-xl leading-relaxed mb-12 text-center max-w-2xl mx-auto">
          A passionate collective of educators, technologists, and innovators
          dedicated to transforming online education.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember 
            name="Raghab POkhrel" 
            role="Founder & CEO"
            image="data:image/jpeg;base64,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" 
          />
          <TeamMember
            name="Alish Sunuwar"
            role="Lead Educator"
            image="data:image/jpeg;base64,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"
          />
          <TeamMember
            name="Niroj prasad Panta"
            role="Lead engineer"
            image={"data:image/png;base64,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"}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-tr from-blue-600 to-purple-600 p-12 rounded-2xl shadow-xl text-white">
        <h2 className="text-4xl font-bold mb-8 text-center">Let's Connect</h2>
        <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
          Have questions or suggestions? We're always here to help shape your
          learning journey!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <a
            href="mailto:info@sikshyalaya.com"
            className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center"
          >
            <i className="fas fa-envelope mr-2"></i>
            Email Us
          </a>
          <div className="flex space-x-6">
            <SocialIcon platform="facebook" />
            <SocialIcon platform="twitter" />
            <SocialIcon platform="instagram" />
            <SocialIcon platform="linkedin" />
          </div>
        </div>
      </section>
    </div>
  );
}

// Updated Feature Card with hover effects
function FeatureCard({ icon, title, description }) {
  return (
    <div className="group bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
      <div className="w-16 h-16 mb-6 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
        <i className={`${icon} text-3xl`}></i>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Enhanced Statistic Card
function StatisticCard({ value, label }) {
  return (
    <div className="animate-fade-in-up">
      <div className="text-6xl font-bold mb-2 text-blue-400">{value}</div>
      <div className="text-xl font-medium text-gray-200">{label}</div>
    </div>
  );
}

// Improved Team Member Card
function TeamMember({ name, role, image }) {
  return (
    <div className="group text-center bg-white p-6 rounded-xl hover:shadow-lg transition-all">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-blue-200 transition-all">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{name}</p>
      <p className="text-gray-600 font-medium">{role}</p>
      <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <SocialIcon platform="twitter" small />
        <SocialIcon platform="linkedin" small />
      </div>
    </div>
  );
}

// Enhanced Social Icon
function SocialIcon({ platform, small }) {
  const platforms = {
    facebook: { class: "fab fa-facebook-f", color: "text-blue-600" },
    twitter: { class: "fab fa-twitter", color: "text-blue-400" },
    instagram: { class: "fab fa-instagram", color: "text-purple-600" },
    linkedin: { class: "fab fa-linkedin-in", color: "text-blue-700" }
  };

  return (
    <a
      href="#"
      className={`${small ? "text-lg" : "text-2xl"} ${
        platforms[platform].color
      } hover:opacity-80 transition-opacity`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <i className={platforms[platform].class}></i>
    </a>
  );
}

export default AboutUs;