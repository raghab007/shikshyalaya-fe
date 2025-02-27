import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EnrolledCourseCard({ courseId, courseInstructor, courseImageSrc, courseDescription }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    // Redirect to the course details page
    navigate(`/course/${courseId}`);
  };

  return (
    <div
      style={{ ...styles.card, transform: isHovered ? "scale(1.05)" : "scale(1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div style={{ ...styles.imageContainer, opacity: isHovered ? 0.7 : 1 }}>
        <img
          src={courseImageSrc}
          style={styles.image}
          alt={`Course ${courseId}`}
        />
        {isHovered && (
          <div style={styles.videoLogoContainer}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/27/27223.png" // Replace with your video player logo
              style={styles.videoLogo}
              alt="Video Player"
            />
          </div>
        )}
      </div>
      <div style={styles.content}>
        <h1 style={styles.title}>Course Description: {courseDescription}</h1>
        <h2 style={styles.instructor}>Instructor: {courseInstructor}</h2>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "300px",
    height: "400px",
    border: "1px solid #ddd",
    borderRadius: "11px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s, opacity 0.2s",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
    transition: "opacity 0.3s",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  videoLogoContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  },
  videoLogo: {
    width: "50px",
    height: "50px",
    filter: "brightness(0) invert(1)", // Make the logo white
  },
  content: {
    padding: "16px",
    textAlign: "center",
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    margin: "8px 0",
    color: "#333",
  },
  instructor: {
    fontSize: "16px",
    color: "#666",
    margin: "8px 0",
  },
};

export default EnrolledCourseCard;