'use client'
import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import TopNav from '../components/topnav';
import "./home.css";
import { CourseCardRow } from '../components/CourseRow';

export default function MiniDrawer() {
  const [courses, setCourses] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const setReload = () => {
    setTriggerUpdate(!triggerUpdate);
  }

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
    const getCourses = async () => {
      try {
        const response = await fetch(`/api/courses?userId=${userId}`)
        const result = await response.json();
        setCourses(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch courses data", err);
        setLoading(false);
      }
    }
    getCourses();
  }, [triggerUpdate])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <TopNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">Happy Learning!</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">Latest Courses</Typography>
            {
              !isLoading && courses &&
              <CourseCardRow view={'home'} courses={courses} setReload={setReload} />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
