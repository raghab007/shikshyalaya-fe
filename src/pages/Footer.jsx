export default function Footer() {
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    backgroundColor: '#282c34',
                    color: 'white',
                    padding: '20px',
                    fontSize: '14px',
                }}
            >
                <div>
                    <h4>Contact Us</h4>
                    <p>Phone: +977-123456789</p>
                    <p>Email: info@example.com</p>
                </div>
                <div>
                    <h4>Quick Links</h4>
                    <p><a href="/about" style={{ color: 'white', textDecoration: 'none' }}>About Us</a></p>
                    <p><a href="/services" style={{ color: 'white', textDecoration: 'none' }}>Services</a></p>
                    <p><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Contact</a></p>
                </div>
                <div>
                    <h4>Follow Us</h4>
                    <p><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Facebook</a></p>
                    <p><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Twitter</a></p>
                    <p><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a></p>
                </div>
            </div>
        </>
    );
}
