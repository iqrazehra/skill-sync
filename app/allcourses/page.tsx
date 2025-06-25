"use client";
import {
  AppBar,
  Box,
  Grid,
  MenuItem,
  Select,
  Typography,
  styled,
} from "@mui/material";
import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import "./allcourses.css";
import TopNav from "../components/topnav";
import { CourseCardRow } from "../components/CourseRow";

const StyledAppBar = styled(AppBar)({
  background: "#151517",
  position: "fixed",
  width: "100%",
  zIndex: 1100,
});

const StyledSelect = styled(Select)({
  color: "white",
  backgroundColor: "#2A2A2E",
  borderRadius: "4px",
  marginRight: "10px",
  width: "200px",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover": {
    backgroundColor: "#333",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  ".MuiSelect-select": {
    "&:focus": {
      backgroundColor: "#2A2A2E",
    },
  },
});

const StyledMenuItem = styled(MenuItem)({
  backgroundColor: "#2A2A2E", // Default background color for better visibility
  color: "white", // Ensure text is visible against the dark background
  '&:hover': {
    backgroundColor: "#BB0056", // Hover background color
  },
  '&.Mui-selected': {
    backgroundColor: "#BB0056", // Selected item background color
    '&:hover': {
      backgroundColor: "#DD0056", // Darken on hover when selected
    },
  },
});


export default function MiniDrawer() {
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Fetch categories from the API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        const result = await response.json();
        setCategories(result);
        setLoading(false);
      } catch (err) {
        console.error("Unable to fetch categories data", err);
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Handle changes in selection
  const handleChange = (event) => {
    const newCategoryId = event.target.value;
    setCategory(newCategoryId);
    // Find the category object and log its name
    const selectedCategory = categories.find(
      (cat) => cat.category_id === newCategoryId
    );
    console.log(
      "Selected Category:",
      selectedCategory ? selectedCategory.name : "None selected"
    );
  };

  const setReload = () => {
    setTriggerUpdate(!triggerUpdate);
  };

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user_profile")!).user_id;
    const getCourses = async () => {
      try {
        let apiUrl = `/api/allcourses?userId=${userId}`;
        if (category) {
          apiUrl += `&category=${category}`;
        }
        const response = await fetch(apiUrl);
        const result = await response.json();
        setCourses(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch courses data", err);
        setLoading(false);
      }
    };
    getCourses();
  }, [category, triggerUpdate]); // Added category to dependency array

  return (
    <Box sx={{ display: "flex" }}>
      <SideNav />
      <TopNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <StyledSelect
          value={category}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "select category" }}
        >
          <StyledMenuItem value="">
            <em>All</em>
          </StyledMenuItem>
          {categories.map((cat) => (
            <StyledMenuItem key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </StyledMenuItem>
          ))}
        </StyledSelect>

        <Box className="header">
          <Box className="header-content">
            {/* <Typography className="header-text">Welcome to SkillSync</Typography> */}
            <Typography className="header-sub-text">Happy Learning!</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">All Courses</Typography>
            {!isLoading && courses && (
              <CourseCardRow
                view={"home"}
                courses={courses}
                setReload={setReload}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
