'use client'
import { Box, Grid, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import "./dashboard.css";
import { CourseCardRow } from '../components/CourseRow';

export default function MiniDrawer() {
  const [dashboard, setDashboard] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
    const getDashboard = async () => {
      try {
        const response = await fetch(`/api/dashboard?userId=${userId}`)
        const result = await response.json();
        setDashboard(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch dashboard data", err);
        setLoading(false);
      }
    }
    getDashboard();
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">Dashboard</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">Latest Dashboard</Typography>
            {
              !isLoading && dashboard &&
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['Total Courses Taught', 'Total Enrollments', 'Total Ratings'] }]}
                series={[{ data: [dashboard[0][0].TotalCoursesTaught, dashboard[0][0].TotalEnrollments, dashboard[0][0].TotalRatings] }]}
                width={500}
                height={300}
              />
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}