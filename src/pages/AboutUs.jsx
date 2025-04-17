import React from "react";

function AboutUs() {
  return (
    <div className="bg-sky-50 min-h-screen">
      {/* Hero Section */}
      <header className="py-20 px-6 md:px-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
          About Sikshyalaya
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          Your trusted e-learning platform, empowering learners worldwide with
          affordable, high-quality courses. Explore new possibilities, upskill,
          and achieve your goals with us!
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 md:px-8 pb-20">
        {/* Welcome Section */}
        <section className="mb-16 bg-gradient-to-br from-sky-600 to-cyan-500 p-8 md:p-12 rounded-2xl shadow-lg text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome to Sikshyalaya
          </h2>
          <p className="text-gray-100 text-lg md:text-xl leading-relaxed">
            At Sikshyalaya, we believe in breaking barriers to education by
            making learning accessible to everyone. Our platform offers a wide
            range of courses designed to help you master new skills, advance
            your career, and pursue your passions.
          </p>
        </section>

        {/* Mission/Vision Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border-l-8 border-sky-600 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl md:text-3xl font-bold text-sky-700 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Democratize education and empower learners of all ages through
                affordable, high-quality courses accessible anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-md border-l-8 border-cyan-500 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl md:text-3xl font-bold text-cyan-600 mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                Become the global leader in online education through
                collaborative, inclusive learning environments where everyone
                can thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-10 text-center">
            Why Choose Sikshyalaya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <FeatureCard
              icon="📚"
              title="Diverse Courses"
              description="500+ courses across technology, business, and creative arts"
            />
            <FeatureCard
              icon="💰"
              title="Affordable Pricing"
              description="Quality education that fits your budget"
            />
            <FeatureCard
              icon="💬"
              title="Interactive Learning"
              description="Live sessions, forums, and peer collaboration"
            />
            <FeatureCard
              icon="📱"
              title="Learn Anywhere"
              description="Seamless experience across all devices"
            />
          </div>
        </section>

        {/* Statistics Section */}
        <section className="mb-16">
          <div className="bg-sky-700 text-white p-12 rounded-2xl shadow-md overflow-hidden relative">
            <div
              className="absolute inset-0 opacity-10 bg-opacity-50"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)",
                backgroundSize: "100px 100px",
              }}
            ></div>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center relative">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative">
              <StatisticCard value="50k+" label="Successful Learners" />
              <StatisticCard value="500+" label="Expert Courses" />
              <StatisticCard value="98%" label="Satisfaction Rate" />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-8 text-center">
            Meet Our Team
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-12 text-center max-w-2xl mx-auto">
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

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-10 text-center">
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

        {/* Partners Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-700 mb-10 text-center">
            Our Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <PartnerLogo name="TechCorp" />
            <PartnerLogo name="EduGroup" />
            <PartnerLogo name="LearnHub" />
            <PartnerLogo name="SkillPro" />
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-tr from-sky-600 to-cyan-500 p-10 md:p-12 rounded-2xl shadow-md text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-center mb-8 max-w-2xl mx-auto">
            Have questions or suggestions? We're always here to help shape your
            learning journey!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <a
              href="mailto:info@sikshyalaya.com"
              className="bg-white text-sky-700 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center"
            >
              <span className="mr-2">✉️</span>
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
      </main>
    </div>
  );
}

// Updated Feature Card
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-px border border-gray-100">
      <div className="w-12 h-12 mb-4 rounded-lg bg-sky-50 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

// Simplified Statistic Card
function StatisticCard({ value, label }) {
  return (
    <div>
      <div className="text-5xl font-bold mb-2 text-cyan-300">{value}</div>
      <div className="text-lg font-medium text-gray-200">{label}</div>
    </div>
  );
}

// Modernized Team Member Card
function TeamMember({ name, role, image }) {
  return (
    <div className="group text-center bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden shadow-md border-4 border-white group-hover:border-sky-100 transition-all">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <p className="text-xl font-bold text-gray-900 mb-1">{name}</p>
      <p className="text-sky-600 font-medium text-sm">{role}</p>
      <div className="mt-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <SocialIcon platform="twitter" small />
        <SocialIcon platform="linkedin" small />
      </div>
    </div>
  );
}

// Cleaner Testimonial Card
function TestimonialCard({ quote, author, role, image }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all">
      <p className="text-sky-600 text-4xl font-serif mb-2">"</p>
      <p className="text-gray-700 italic mb-6 leading-relaxed text-base">
        {quote}
      </p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
          <img
            src={image}
            alt={author}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="font-bold text-gray-900">{author}</p>
          <p className="text-sky-600 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

// Partner Logo Component
function PartnerLogo({ name }) {
  return (
    <div className="w-32 h-16 bg-white rounded-lg shadow-md flex items-center justify-center hover:shadow-lg transition-all">
      <div className="text-sky-700 font-bold">{name}</div>
    </div>
  );
}

// Simplified Social Icon
function SocialIcon({ platform, small }) {
  const platforms = {
    facebook: { emoji: "👤", color: "text-blue-600" },
    twitter: { emoji: "🐦", color: "text-blue-400" },
    instagram: { emoji: "📷", color: "text-pink-600" },
    linkedin: { emoji: "💼", color: "text-blue-700" },
  };

  return (
    <a
      href="#"
      className={`${
        small ? "w-6 h-6" : "w-10 h-10"
      } ${platforms[platform].color} bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors`}
      aria-label={platform}
    >
      <span>{platforms[platform].emoji}</span>
    </a>
  );
}

export default AboutUs;
