function FilterEnrolledCourse() {
  return (
    <div style={styles.filterContainer}>
      {/* Sort by Section */}
      <div style={styles.filterSection}>
        <p style={styles.filterLabel}>Sort by</p>
        <div style={styles.buttonContainer}>
          <select style={styles.dropdown}>
            <option value="title-asc">Title A-Z</option>
            <option value="title-desc">Title Z-A</option>
            <option value="date-asc">Date (Oldest First)</option>
            <option value="date-desc">Date (Newest First)</option>
          </select>
        </div>
      </div>

      {/* Filter by Section */}
      <div style={styles.filterSection}>
        <p style={styles.filterLabel}>Filter by</p>
        <div style={styles.buttonGroup}>
          <select style={styles.dropdown}>
            <option value="">Select Category</option>
            <option value="web-development">Web Development</option>
            <option value="data-science">Data Science</option>
            <option value="mobile-development">Mobile Development</option>
            <option value="design">Design</option>
          </select>
          <select style={styles.dropdown}>
            <option value="">Select Instructor</option>
            <option value="raghab-pokhrel">Raghab Pokhrel</option>
            <option value="aastha-aryal">Aastha Aryal</option>
            <option value="john-doe">John Doe</option>
            <option value="jane-smith">Jane Smith</option>
          </select>
        </div>
      </div>

      {/* Search Section */}
      <div style={styles.searchSection}>
        <input
          style={styles.searchInput}
          type="search"
          placeholder="Search your courses"
        />
        <button style={styles.searchButton}>Search</button>
      </div>
    </div>
  );
}

const styles = {
  filterContainer: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100px",
    backgroundColor: "#f9f9f9",
    borderBottom: "1px solid #ddd",
    padding: "0 20px",
  },
  filterSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  filterLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#333",
    marginBottom: "8px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
  dropdown: {
    padding: "8px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    color: "#333",
    transition: "border-color 0.3s",
    width: "100%", // Ensure dropdowns take full width
  },
  searchSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "30%",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  searchInput: {
    flex: 1,
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    marginRight: "10px",
  },
  searchButton: {
    padding: "8px 16px",
    border: "1px solid #4CAF50",
    borderRadius: "4px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.3s",
  },
};

export default FilterEnrolledCourse;