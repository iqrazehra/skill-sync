'use client';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import "./mycourses.css";
import { CourseCardRow } from '../components/CourseRow';

export default function MiniDrawer() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [triggerUpdate, setTriggerUpdate] = useState(false);

  const setReload = () => {
    setTriggerUpdate(!triggerUpdate);
  }

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
    const getData = async() => {
      try{
        const response = await fetch(`/api/mycourses?userId=${userId}`)
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch courses data", err);
        setLoading(false);
      }
    }
    getData();
  }, [triggerUpdate])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">My Courses!</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">My Courses</Typography>
            {!isLoading
              &&
              <CourseCardRow view='mycourses' courses={data} setReload={setReload}/>
            }

          </Box>
        </Box>
      </Box>
    </Box>
  );
}