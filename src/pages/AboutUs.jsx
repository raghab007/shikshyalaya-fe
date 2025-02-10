import React from "react";
import './aboutUs.css'

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
            name="John Doe" 
            role="Founder & CEO"
            image="https://source.unsplash.com/200x200/?portrait,man,ceo" 
          />
          <TeamMember
            name="Jane Smith"
            role="Lead Educator"
            image="https://source.unsplash.com/200x200/?portrait,woman,teacher"
          />
          <TeamMember
            name="Emily Johnson"
            role="Product Designer"
            image="https://source.unsplash.com/200x200/?portrait,woman,designer"
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