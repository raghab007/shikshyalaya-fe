import React from 'react';

function AboutUs() {
  return (
    <div style={styles.container}>
      
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Welcome to Sicshalaya</h2>
        <p style={styles.text}>
          We are a cutting-edge e-learning platform dedicated to providing 
          affordable, high-quality courses to learners worldwide. Whether you want 
          to upskill, reskill, or explore new interests, we have something for you!
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Our Mission</h2>
        <p style={styles.text}>
          Our mission is to make education accessible and empower individuals to 
          achieve their goals through knowledge and learning.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Why Choose Us?</h2>
        <ul style={styles.list}>
          <li style={styles.listItem}>Wide range of courses from beginner to advanced levels.</li>
          <li style={styles.listItem}>Affordable pricing with flexible learning schedules.</li>
          <li style={styles.listItem}>Interactive features like quizzes and community discussions.</li>
          <li style={styles.listItem}>Accessible anytime, anywhere, on any device.</li>
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Meet Our Team</h2>
        <p style={styles.text}>
          Our team is composed of passionate educators, developers, and designers 
          committed to delivering a seamless learning experience.
        </p>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Contact Us</h2>
        <p style={styles.text}>
          Have questions? Reach out to us at <a style={styles.link} href="mailto:info@platformname.com">info@platformname.com</a>
          or follow us on social media for updates!
        </p>
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    fontFamily: "'Roboto', sans-serif",
    backgroundColor: '#f9f9f9',
    color: '#333',
    lineHeight: '1.6',
  },
  heading: {
    textAlign: 'center',
    fontSize: '36px',
    marginBottom: '20px',
    color: '#1E88E5',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  subHeading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '10px',
  },
  text: {
    fontSize: '16px',
    color: '#555',
  },
  list: {
    marginTop: '10px',
    paddingLeft: '20px',
  },
  listItem: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#555',
  },
  link: {
    color: '#1E88E5',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default AboutUs;
