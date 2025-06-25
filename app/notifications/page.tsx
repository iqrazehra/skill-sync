'use client'
import { Box, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import "./notifications.css";
import TopNav from '../components/topnav';
import { CourseCardRow } from '../components/CourseRow';

export default function MiniDrawer() {
  const [notifications, setNotifications] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
    const getNotifications = async () => {
      try {
        const response = await fetch(`/api/notifications?userId=${userId}`)
        const result = await response.json();
        setNotifications(result);
        setLoading(false);
      } catch (err) {
        console.log("Unable to fetch notifications data", err);
        setLoading(false);
      }
    }
    getNotifications();
  }, [])

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <TopNav />
      <Box className="home" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">Notifications</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">Latest Notifications</Typography>
            {
              !isLoading && notifications &&
              notifications.map((notification: any, index: number) => (
                <Box key={index} className="notification-row">
                  <Typography variant="body1" className="notification-message">
                    {notification.message}
                  </Typography>
                  <Typography variant="caption" className="notification-date">
                    {new Date(notification.enrollment_date).toLocaleString()}
                  </Typography>
                </Box>
              ))
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}