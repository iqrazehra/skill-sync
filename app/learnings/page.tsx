'use client';
import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import "./learnings.css";
import TopNav from '../components/topnav';
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
        const response = await fetch(`/api/learnings?userId=${userId}`)
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch learnings data", err);
        setLoading(false);
      }
    }
    getData();
  }, [triggerUpdate])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <TopNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">Continue Learning!</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">My Learnings</Typography>
            {!isLoading
              &&
              <CourseCardRow view='learnings' courses={data} setReload={setReload}/>
            }

          </Box>
        </Box>
      </Box>
    </Box>
  );
}