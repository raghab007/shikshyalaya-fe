import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import homeImage from '../assets/istockphoto-1919863292-1024x1024.jpg';

export default function Home() {
  const styles = {
    homeContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: '100vh',
      padding: '0 20px',
      backgroundColor: '#eef2f7',
      boxSizing: 'border-box',
    },
    imageContainer: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    homeImage: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '15px',
      boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.2)',
    },
    textContainer: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: '20px',
      marginLeft: '40px',
    },
    heading: {
      fontSize: '3.5rem',
      fontWeight: 'bold',
      color: '#2c3e50',
      marginBottom: '20px',
    },
    subheading: {
      fontSize: '1.5rem',
      color: '#34495e',
      marginBottom: '30px',
    },
    quote: {
      fontSize: '1.2rem',
      fontStyle: 'italic',
      color: '#7f8c8d',
      marginBottom: '30px',
    },
    linkButton: {
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.imageContainer}>
        <img
          style={styles.homeImage}
          src={homeImage}
          alt="Learning"
        />
      </div>
      <div style={styles.textContainer}>
        <h1 style={styles.heading}>Welcome to Sikshyalaya</h1>
        <p style={styles.subheading}>
          "Empowering Knowledge, One Click at a Time"
        </p>
        <p style={styles.quote}>
          "An investment in knowledge pays the best interest." - Benjamin Franklin
        </p>
        <Link to="/courses" style={styles.linkButton}>
          <Button variant="contained" color="info">
            Explore Courses
          </Button>
        </Link>
      </div>
    </div>
  );
}
