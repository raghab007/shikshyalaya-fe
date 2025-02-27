import { Outlet } from "react-router-dom";
import EnrolledCourseCard from "../components/course/EnrolledCourseCard";
import FilterEnrolledCourse from "../components/course/FilterEnrolledCourse";
import { useState } from "react";

function EnrolledCoursesPage() {
  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h1 style={styles.headerTitle}>My Courses</h1>
        <EnrollCourseTab />
      </div>
      <Outlet />
    </div>
  );
}

function EnrolledCourses() {
  const courses = [
    {
      courseId: 1,
      courseInstructor: "Raghab Pokhrel",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescrption: "This is a course description.",
    },
    {
      courseId: 2,
      courseInstructor: "Aastha Aryal",
      courseImageSrc:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      courseDescrption: "This is another course description.",
    },
  ];

  return (
    <>
      <FilterEnrolledCourse />
      <div style={styles.coursesContainer}>
        {courses.map((course) => (
          <EnrolledCourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseDescrption={course.courseDescrption}
            courseInstructor={course.courseInstructor}
            courseImageSrc={course.courseImageSrc}
          />
        ))}
      </div>
    </>
  );
}

function ArchivedCourses() {
  return (
    <div style={styles.archivedContainer}>
      <h1 style={styles.archivedTitle}>Archived Courses</h1>
      <p style={styles.archivedText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti unde,
        natus perferendis, nesciunt corrupti nisi iste consectetur esse est sed,
        cupiditate magni laborum in similique magnam id cumque vero ut.
      </p>
    </div>
  );
}

function EnrollCourseTab() {
  const [currentTab, setCurrentTab] = useState(true);

  const changeTab = () => {
    setCurrentTab(!currentTab);
  };

  return (
    <div style={styles.tabContainer}>
      <button style={styles.tabButton}>
        <a
          href="/enrolled"
          style={{ ...styles.tabLink, ...(currentTab ? styles.activeTab : {}) }}
        >
          My Courses
        </a>
      </button>
      <button style={styles.tabButton}>
        <a
          href="/enrolled/archived"
          style={{ ...styles.tabLink, ...(!currentTab ? styles.activeTab : {}) }}
        >
          Archived Courses
        </a>
      </button>
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  header: {
    backgroundColor: "#1d2e3a",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headerTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "white",
    margin: "0",
  },
  coursesContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
    padding: "20px",
  },
  archivedContainer: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  archivedTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  archivedText: {
    fontSize: "16px",
    color: "#666",
    lineHeight: "1.6",
  },
  tabContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  tabButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    transition: "background-color 0.3s",
  },
  tabLink: {
    textDecoration: "none",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background-color 0.3s",
  },
  activeTab: {
    backgroundColor: "#4CAF50",
  },
};

export { EnrolledCoursesPage, ArchivedCourses, EnrolledCourses };