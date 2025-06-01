import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8085/api/contact/submit", formData);
      
      if (response.status === 200) {
        setSubmitted(true);
        // Reset form after submission
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (err) {
      setError(err.response?.data || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: "📍",
      title: "Our Location",
      details: "123 Education Avenue, Kathmandu, Nepal",
    },
    {
      icon: "📞",
      title: "Call Us",
      details: "+977 1 4567890",
    },
    {
      icon: "✉️",
      title: "Email Us",
      details: "info@sikshyalaya.com",
    },
    {
      icon: "🕒",
      title: "Office Hours",
      details: "Mon-Fri: 9AM - 5PM",
    },
  ];

  // FAQ items specifically related to contact
  const contactFaqs = [
    {
      question: "How quickly can I expect a response?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. Complex questions may take a little longer, but we'll keep you updated on the status of your query.",
    },
    {
      question: "Can I schedule a live demo of the platform?",
      answer:
        "Absolutely! You can request a live demonstration through our contact form. Just select 'Demo Request' as your subject, and our team will reach out to schedule a convenient time.",
    },
    {
      question: "Do you offer technical support via phone?",
      answer:
        "Yes, our technical support team is available via phone during business hours. For urgent issues, we recommend calling our support hotline directly.",
    },
  ];

  return (
    <div className="bg-white flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-white flex flex-col items-center justify-center p-12 pt-20 relative">
          <div className="relative z-10 max-w-5xl">
            <h1 className="text-6xl font-extrabold text-[#02084b] text-center leading-tight mb-6">
              Get in Touch
            </h1>
            <p className="mt-6 text-xl text-[#02084b] text-center max-w-3xl leading-relaxed mx-auto">
              We're here to help! Whether you have questions about our courses,
              need technical support, or want to explore partnership
              opportunities, our team is ready to assist you.
            </p>
          </div>
        </div>

        {/* Contact Form and Info Section */}
        <div className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Contact Information */}
              <div className="bg-[#02084b] text-white p-8 rounded-xl shadow-xl">
                <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
                <div className="space-y-8">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-3xl mr-4">{item.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="opacity-90">{item.details}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media Links */}
                <div className="mt-12">
                  <h3 className="text-xl font-semibold mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com/sikshyalaya"
                      className="p-3 bg-white text-[#02084b] rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      FB
                    </a>
                    <a
                      href="https://twitter.com/sikshyalaya"
                      className="p-3 bg-white text-[#02084b] rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      TW
                    </a>
                    <a
                      href="https://linkedin.com/company/sikshyalaya"
                      className="p-3 bg-white text-[#02084b] rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      LI
                    </a>
                    <a
                      href="https://instagram.com/sikshyalaya"
                      className="p-3 bg-white text-[#02084b] rounded-full hover:bg-gray-100 transition-colors duration-300"
                    >
                      IG
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                  <h2 className="text-3xl font-bold text-[#02084b] mb-6">
                    Send Us a Message
                  </h2>

                  {submitted ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-8 rounded-lg mb-6 text-center">
                      <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                      <p>
                        Your message has been sent successfully. We'll get back
                        to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-[#02084b] font-medium mb-2"
                          >
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02084b]"
                            required
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-[#02084b] font-medium mb-2"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02084b]"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-[#02084b] font-medium mb-2"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02084b]"
                          required
                        >
                          <option value="">Select a subject</option>
                          <option value="Course Inquiry">Course Inquiry</option>
                          <option value="Technical Support">
                            Technical Support
                          </option>
                          <option value="Billing Question">
                            Billing Question
                          </option>
                          <option value="Partnership Opportunity">
                            Partnership Opportunity
                          </option>
                          <option value="Demo Request">Demo Request</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="message"
                          className="block text-[#02084b] font-medium mb-2"
                        >
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows="6"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#02084b]"
                          required
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="px-8 py-4 bg-[#02084b] text-white font-medium rounded-full hover:bg-[#0a1e6f] transition-colors duration-300 shadow-lg"
                      >
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#02084b] mb-8">
              Find Us
            </h2>
            <div className="bg-gray-200 h-96 rounded-xl overflow-hidden shadow-lg">
              {/* Replace with actual map component or embed */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                <p className="text-[#02084b] text-xl">
                  Interactive Map Goes Here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#02084b] mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {contactFaqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                >
                  <details className="group">
                    <summary className="flex justify-between items-center p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors duration-200">
                      <h3 className="text-xl font-medium text-[#02084b]">
                        {faq.question}
                      </h3>
                      <span className="text-[#02084b] text-2xl group-open:rotate-180 transition-transform">
                        ▾
                      </span>
                    </summary>
                    <div className="p-6 border-t border-gray-100">
                      <p className="text-[#02084b]">{faq.answer}</p>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Team Section */}
        <div className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#02084b] mb-4">
              Meet Our Support Team
            </h2>
            <p className="text-xl text-[#02084b] mb-12 max-w-3xl mx-auto">
              Our dedicated support team is committed to providing you with the
              best learning experience
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#02084b] text-3xl font-bold">
                  S
                </div>
                <h3 className="text-xl font-bold text-[#02084b] mb-2">
                  Sameer Pradhan
                </h3>
                <p className="text-[#02084b] text-sm mb-3">
                  Technical Support Lead
                </p>
                <p className="text-[#02084b] text-sm">
                  Available for all technical issues related to course access
                  and platform functionality.
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#02084b] text-3xl font-bold">
                  A
                </div>
                <h3 className="text-xl font-bold text-[#02084b] mb-2">
                  Amrita Singh
                </h3>
                <p className="text-[#02084b] text-sm mb-3">
                  Student Success Manager
                </p>
                <p className="text-[#02084b] text-sm">
                  Here to help you navigate your learning journey and optimize
                  your course experience.
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#f0f2f8] flex items-center justify-center text-[#02084b] text-3xl font-bold">
                  R
                </div>
                <h3 className="text-xl font-bold text-[#02084b] mb-2">
                  Rohan Thapa
                </h3>
                <p className="text-[#02084b] text-sm mb-3">
                  Billing & Accounts Manager
                </p>
                <p className="text-[#02084b] text-sm">
                  Specialized in handling all payment-related queries and
                  account management issues.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="bg-white border-t border-gray-100 text-[#02084b] py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Browse our extensive course catalog and embark on your learning
              journey today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/courses">
                <button className="px-8 py-4 bg-[#02084b] text-white font-medium rounded-full hover:bg-[#0a1e6f] transition-colors duration-300 shadow-lg">
                  Explore Courses
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-8 py-4 bg-white text-[#02084b] font-medium rounded-full border-2 border-[#02084b] hover:bg-[#f0f2f8] transition-colors duration-300">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
