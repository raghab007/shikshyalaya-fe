export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 text-sm">
            <div className="container mx-auto flex flex-wrap justify-around">
                <div className="mb-6 text-center md:mb-0">
                    <h4 className="text-lg font-semibold mb-2">Contact Us</h4>
                    <p>Phone: +977-123456789</p>
                    <p>Email: info@example.com</p>
                </div>
                <div className="mb-6 text-center md:mb-0">
                    <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                    <ul className="space-y-1">
                        <li><a href="/about" className="hover:underline">About Us</a></li>
                        <li><a href="/services" className="hover:underline">Services</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </div>
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
                    <ul className="space-y-1">
                        <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Facebook</a></li>
                        <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Twitter</a></li>
                        <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">Instagram</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}
