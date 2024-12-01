import { Link } from "react-router-dom";
import { Button, Typography, Card, CardMedia, CardContent, Grid, Box } from "@mui/material";
import reactImage from "../assets/react.png";
import homeImage from "../assets/istockphoto-1919863292-1024x1024.jpg";

export default function Home() {
  const styles = {
    homeContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#eef2f7",
      padding: "40px 20px",
      boxSizing: "border-box",
    },
    banner: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      width: "100%",
      padding: "20px 0",
    },
    imageContainer: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    reactImage: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      borderRadius: "15px",
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.2)",
    },
    textContainer: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "20px",
      marginLeft: "40px",
    },
    heading: {
      fontSize: "3.5rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "20px",
    },
    subheading: {
      fontSize: "1.5rem",
      color: "#34495e",
      marginBottom: "30px",
    },
    quote: {
      fontSize: "1.2rem",
      fontStyle: "italic",
      color: "#7f8c8d",
      marginBottom: "30px",
    },
    popularCourses: {
      width: "100%",
      marginTop: "40px",
    },
    courseCard: {
      maxWidth: 345,
      margin: "10px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      display: "flex",
      flexDirection: "column",
    },
    courseMedia: {
      height: 140,
      objectFit: "cover",
    },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#2c3e50",
      marginBottom: "20px",
      textAlign: "center",
    },
    whyChooseUs: {
      marginTop: "40px",
      padding: "20px",
      backgroundColor: "#ffffff",
      borderRadius: "15px",
      boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
  };

  const popularCourses = [
    { title: "React for Beginners", image: "https://via.placeholder.com/300x200", description: "Learn the basics of React and build dynamic UIs." },
    { title: "Java Spring Boot", image: "https://via.placeholder.com/300x200", description: "Master backend development with Spring Boot." },
    { title: "Data Structures & Algorithms", image: "https://via.placeholder.com/300x200", description: "Strengthen your problem-solving skills." },
  ];

  return (
    <div style={styles.homeContainer}>
      {/* Banner Section */}
      <div style={styles.banner}>
        <div style={styles.imageContainer}>
          <img style={styles.reactImage} src={homeImage} alt="Learning" />
        </div>
        <div style={styles.textContainer}>
          <h1 style={styles.heading}>Welcome to Sikshyalaya</h1>
          <p style={styles.subheading}>
            "Empowering Knowledge, One Click at a Time"
          </p>
          <p style={styles.quote}>
            "An investment in knowledge pays the best interest." - Benjamin Franklin
          </p>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="info">
              Explore Courses
            </Button>
          </Link>
        </div>
      </div>

      {/* Popular Courses Section */}
      <Box style={styles.popularCourses}>
        <Typography style={styles.sectionTitle}>Popular Courses</Typography>
        <Grid container spacing={3} justifyContent="center">
          {popularCourses.map((course, index) => (
            <Grid item key={index}>
              <Card style={styles.courseCard}>
                <CardMedia
                  component="img"
                  style={styles.courseMedia}
                  image={course}
                  alt={course.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {course.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us Section */}
      <Box style={styles.whyChooseUs}>
        <Typography style={styles.sectionTitle}>Why Choose Sikshyalaya?</Typography>
        <Typography variant="body1" color="text.secondary">
          - Expert Tutors from Around the World<br />
          - Affordable and Accessible Courses<br />
          - Comprehensive and Industry-Relevant Content<br />
          - Learn at Your Own Pace with Flexible Timelines
        </Typography>
      </Box>
    </div>
  );
}
