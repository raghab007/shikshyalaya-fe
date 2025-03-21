import React from "react";
import '../styles/aboutus.css'

function AboutUs() {
  // Primary brand color
  const primaryColor = "#2192b9";
  
  return (
    <div className="bg-sky-50 py-16 px-6 md:px-20">
      {/* Header Section with Animation */}
      <section className="mb-16 text-center animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
          About Sikshyalaya
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
          Your trusted e-learning platform, empowering learners worldwide with
          affordable, high-quality courses. Explore new possibilities, upskill,
          and achieve your goals with us!
        </p>
      </section>

      {/* Welcome Section with Gradient */}
      <section className="mb-16 bg-gradient-to-br from-sky-600 to-cyan-500 p-10 rounded-2xl shadow-xl text-white transform transition hover:scale-[1.005]">
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
        <div className="bg-white p-10 rounded-2xl shadow-lg border-l-8 border-sky-600 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-sky-700 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Democratize education and empower learners of all ages through
            affordable, high-quality courses accessible anytime, anywhere.
          </p>
        </div>
        <div className="bg-white p-10 rounded-2xl shadow-lg border-l-8 border-cyan-500 hover:shadow-xl transition-shadow">
          <h2 className="text-3xl font-bold text-cyan-600 mb-4">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Become the global leader in online education through collaborative,
            inclusive learning environments where everyone can thrive.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-sky-700 mb-12 text-center">
          Why Choose Sikshyalaya?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon="fas fa-book-open text-sky-600"
            title="Diverse Courses"
            description="500+ courses across technology, business, and creative arts"
          />
          <FeatureCard
            icon="fas fa-dollar-sign text-cyan-600"
            title="Affordable Pricing"
            description="Quality education that fits your budget"
          />
          <FeatureCard
            icon="fas fa-comments text-sky-600"
            title="Interactive Learning"
            description="Live sessions, forums, and peer collaboration"
          />
          <FeatureCard
            icon="fas fa-mobile-alt text-cyan-600"
            title="Learn Anywhere"
            description="Seamless experience across all devices"
          />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="mb-16 relative bg-sky-700 text-white py-20 rounded-2xl overflow-hidden">
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
        <h2 className="text-4xl font-bold text-sky-700 mb-12 text-center">
          Meet Our Team
        </h2>
        <p className="text-gray-700 text-xl leading-relaxed mb-12 text-center max-w-2xl mx-auto">
          A passionate collective of educators, technologists, and innovators
          dedicated to transforming online education.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamMember 
            name="Raghab Pokhrel" 
            role="Founder & CEO"
            image="/api/placeholder/300/300"
          />
          <TeamMember
            name="Alish Sunuwar"
            role="Lead Educator"
            image="/api/placeholder/300/300"
          />
          <TeamMember
            name="Niroj Prasad Panta"
            role="Lead Engineer"
            image="/api/placeholder/300/300"
          />
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-gradient-to-tr from-sky-600 to-cyan-500 p-12 rounded-2xl shadow-xl text-white">
        <h2 className="text-4xl font-bold mb-8 text-center">Let's Connect</h2>
        <p className="text-xl text-center mb-8 max-w-2xl mx-auto">
          Have questions or suggestions? We're always here to help shape your
          learning journey!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          <a
            href="mailto:info@sikshyalaya.com"
            className="bg-white text-sky-700 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center"
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

      {/* Testimonials Section - New Addition */}
      <section className="mb-16 bg-white p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-sky-700 mb-12 text-center">
          Student Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard 
            quote="Sikshyalaya transformed my career path with their comprehensive web development course. The instructors were incredibly supportive."
            author="Priya Sharma"
            role="Web Developer"
            image="/api/placeholder/80/80"
          />
          <TestimonialCard 
            quote="The flexible learning schedule allowed me to balance my full-time job while acquiring new skills. Their UX/UI course was exceptional."
            author="Raj Patel"
            role="Product Designer"
            image="/api/placeholder/80/80"
          />
        </div>
      </section>

      {/* Partners Section - New Addition */}
      <section className="mb-16 bg-gradient-to-r from-sky-50 to-cyan-50 p-10 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-sky-700 mb-10 text-center">
          Our Partners
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-12">
          <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center">
            <div className="text-sky-700 font-bold">TechCorp</div>
          </div>
          <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center">
            <div className="text-sky-700 font-bold">EduGroup</div>
          </div>
          <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center">
            <div className="text-sky-700 font-bold">LearnHub</div>
          </div>
          <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center">
            <div className="text-sky-700 font-bold">SkillPro</div>
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
      <div className="w-16 h-16 mb-6 rounded-lg bg-sky-50 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
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
      <div className="text-6xl font-bold mb-2 text-cyan-300">{value}</div>
      <div className="text-xl font-medium text-gray-200">{label}</div>
    </div>
  );
}

// Improved Team Member Card
function TeamMember({ name, role, image }) {
  return (
    <div className="group text-center bg-white p-6 rounded-xl hover:shadow-lg transition-all">
      <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-sky-200 transition-all">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="text-2xl font-bold text-gray-900 mb-1">{name}</p>
      <p className="text-sky-600 font-medium">{role}</p>
      <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <SocialIcon platform="twitter" small />
        <SocialIcon platform="linkedin" small />
      </div>
    </div>
  );
}

// New Testimonial Card Component
function TestimonialCard({ quote, author, role, image }) {
  return (
    <div className="bg-sky-50 p-8 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="text-6xl text-sky-300">"</div>
        </div>
        <div>
          <p className="text-gray-700 italic mb-6 leading-relaxed">{quote}</p>
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
              <img src={image} alt={author} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-bold text-gray-900">{author}</p>
              <p className="text-sky-600 text-sm">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Social Icon
function SocialIcon({ platform, small }) {
  const platforms = {
    facebook: { class: "fab fa-facebook-f", color: "text-sky-600" },
    twitter: { class: "fab fa-twitter", color: "text-sky-400" },
    instagram: { class: "fab fa-instagram", color: "text-cyan-600" },
    linkedin: { class: "fab fa-linkedin-in", color: "text-sky-700" }
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