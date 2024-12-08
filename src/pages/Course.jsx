import React, { useEffect, useState } from "react";
import BasicCard from "../components/CourseCard";
import axios from "axios";
import { Box, CircularProgress, Typography, Alert, Button, Slider, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function Course() {
  const [loading, setLoading] = useState(true); // Tracks loading state
  const [courses, setCourses] = useState([]);  // Stores fetched courses
  const [error, setError] = useState(false);   // Tracks error state
  const [category, setCategory] = useState(""); // Filter by category
  const [priceRange, setPriceRange] = useState([1000, 5000]); // Filter by price range (1000 to 5000)

  useEffect(() => {
    async function getCourses() {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get("http://localhost:8085/courses");
        const updatedCourses = response.data.map((course) => ({
          ...course,
          imageSrc: `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`,
        }));
        setCourses(updatedCourses); // Update courses
        setLoading(false);          // Turn off loading
      } catch (error) {
        setError(true); // Handle error state
        setLoading(false);
      }
    }
    getCourses();
  }, []);

  // Handle category change
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handle price range change
  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // Filter courses based on category and price
  const filteredCourses = courses.filter((course) => {
    const isInCategory = category ? course.category === category : true;
    const isInPriceRange = course.price >= priceRange[0] && course.price <= priceRange[1];
    return isInCategory && isInPriceRange;
  });

  // Show loading spinner when loading
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Loading Courses...
        </Typography>
      </Box>
    );
  }

  // Show error message if there's a failure
  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
        }}
      >
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          Failed to load courses. Please check your connection or try again later.
        </Alert>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      {/* Filtering Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3, paddingX: 2 }}>
        {/* Category Filter */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={handleCategoryChange}
            label="Category"
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Design">Design</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>

        {/* Price Range Filter */}
        <Box sx={{ width: 250 }}>
          <Typography variant="subtitle2">Price Range</Typography>
          <Slider
            value={priceRange}
            onChange={handlePriceRangeChange}
            valueLabelDisplay="auto"
            min={1000}
            max={5000}
            step={100}
            valueLabelFormat={(value) => `$${value}`}
          />
        </Box>
      </Box>

      {/* Course Display Section */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          marginTop: "60px",
          gap: "20px",
        }}
      >
        {filteredCourses.length === 0 && (
          <Typography variant="h6" align="center">
            No courses available at the moment.
          </Typography>
        )}
        {filteredCourses.map((course) => (
          <BasicCard
            key={course.id}
            price={course.price}
            description={course.description}
            title={course.title}
            imageSrc={course.imageSrc}
          />
        ))}
      </Box>
    </Box>
  );
}
