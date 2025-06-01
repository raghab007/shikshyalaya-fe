import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-[#02084b] text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold">Sikshyalaya</h3>
                        <p className="text-gray-300 text-sm">
                            Empowering learners worldwide with quality education and practical skills.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com/sikshyalaya" target="_blank" rel="noopener noreferrer" 
                               className="text-gray-300 hover:text-white transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com/sikshyalaya" target="_blank" rel="noopener noreferrer"
                               className="text-gray-300 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="https://instagram.com/sikshyalaya" target="_blank" rel="noopener noreferrer"
                               className="text-gray-300 hover:text-white transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="https://linkedin.com/company/sikshyalaya" target="_blank" rel="noopener noreferrer"
                               className="text-gray-300 hover:text-white transition-colors">
                                <FaLinkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/courses" className="text-gray-300 hover:text-white transition-colors">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link to="/about-us" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-center space-x-3 text-gray-300">
                                <FaPhone className="text-[#3a4a8a]" />
                                <span>+977-123456789</span>
                            </li>
                            <li className="flex items-center space-x-3 text-gray-300">
                                <FaEnvelope className="text-[#3a4a8a]" />
                                <span>info@sikshyalaya.com</span>
                            </li>
                            <li className="flex items-start space-x-3 text-gray-300">
                                <FaMapMarkerAlt className="text-[#3a4a8a] mt-1" />
                                <span>Kathmandu, Nepal</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
                        <p className="text-gray-300 text-sm mb-4">
                            Subscribe to our newsletter for updates and exclusive offers.
                        </p>
                        <form className="space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg bg-[#1a2a6c] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3a4a8a]"
                            />
                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-[#3a4a8a] text-white rounded-lg hover:bg-[#4a5a9a] transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[#1a2a6c]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-300 text-sm">
                            © {new Date().getFullYear()} Sikshyalaya. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to="/privacy-policy" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="/terms-of-service" className="text-gray-300 hover:text-white text-sm transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="/faq" className="text-gray-300 hover:text-white text-sm transition-colors">
                                FAQ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
