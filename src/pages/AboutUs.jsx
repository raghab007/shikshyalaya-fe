import React from "react";

function AboutUs() {
  return (
    <div className="bg-gradient-to-b from-[#e8eaf1] to-[#f1f2f7] min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#02084b] to-[#010530] text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">About Sikshyalaya</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
          Your trusted e-learning platform, empowering learners worldwide with
          affordable, high-quality courses. Explore new possibilities, upskill,
          and achieve your goals with us!
        </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-16 bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-[#02084b] mb-6">
            Welcome to Sikshyalaya
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At Sikshyalaya, we believe in breaking barriers to education by
            making learning accessible to everyone. Our platform offers a wide
            range of courses designed to help you master new skills, advance
            your career, and pursue your passions.
          </p>
        </section>

        {/* Mission/Vision Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-[#02084b] mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Democratize education and empower learners of all ages through
                affordable, high-quality courses accessible anytime, anywhere.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-[#02084b] mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Become the global leader in online education through
                collaborative, inclusive learning environments where everyone
                can thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#02084b] mb-10 text-center">
            Why Choose Sikshyalaya?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="bg-gradient-to-r from-[#02084b] to-[#010530] text-white p-12 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-12 text-center">
              Our Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <StatisticCard value="50k+" label="Successful Learners" />
              <StatisticCard value="500+" label="Expert Courses" />
              <StatisticCard value="98%" label="Satisfaction Rate" />
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#02084b] mb-8 text-center">
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
            />
            <TeamMember
              name="Alish Sunuwar"
              role="Lead Educator"
            />
            <TeamMember
              name="Niroj Prasad Panta"
              role="Lead Engineer"
            />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#02084b] mb-10 text-center">
            Student Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="Sikshyalaya transformed my career path with their comprehensive web development course. The instructors were incredibly supportive."
              author="Priya Sharma"
              role="Web Developer"
            />
            <TestimonialCard
              quote="The flexible learning schedule allowed me to balance my full-time job while acquiring new skills. Their UX/UI course was exceptional."
              author="Raj Patel"
              role="Product Designer"
            />
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-xl shadow-lg p-10 border border-gray-200">
          <h2 className="text-3xl font-bold text-[#02084b] mb-6 text-center">
            Let's Connect
          </h2>
          <p className="text-lg text-gray-700 text-center mb-8 max-w-2xl mx-auto">
            Have questions or suggestions? We're always here to help shape your
            learning journey!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
            <a
              href="mailto:info@sikshyalaya.com"
              className="bg-[#02084b] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#010530] transition-all flex items-center"
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

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-[#02084b] mb-2">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}

// Statistic Card Component
function StatisticCard({ value, label }) {
  return (
    <div>
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-indigo-100">{label}</div>
    </div>
  );
}

// Team Member Component
function TeamMember({ name, role }) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-8 flex flex-col items-center">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#02084b] to-[#010530] flex items-center justify-center mb-6">
          <span className="text-4xl text-white font-bold">{name.charAt(0)}</span>
        </div>
        <h3 className="text-xl font-bold text-[#02084b] mb-2">{name}</h3>
        <p className="text-gray-700">{role}</p>
      </div>
    </div>
  );
}

// Testimonial Card Component
function TestimonialCard({ quote, author, role }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
      <div className="text-4xl mb-4">💬</div>
      <p className="text-gray-700 text-lg mb-6">"{quote}"</p>
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#02084b] to-[#010530] flex items-center justify-center mr-4">
          <span className="text-xl text-white font-bold">{author.charAt(0)}</span>
        </div>
        <div>
          <div className="font-bold text-[#02084b]">{author}</div>
          <div className="text-gray-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

// Social Icon Component
function SocialIcon({ platform }) {
  const icons = {
    facebook: "📘",
    twitter: "🐦",
    instagram: "📸",
    linkedin: "💼",
  };

  return (
    <a
      href="#"
      className="text-white hover:text-indigo-200 transition-colors"
    >
      <span className="text-2xl">{icons[platform]}</span>
    </a>
  );
}

export default AboutUs;
