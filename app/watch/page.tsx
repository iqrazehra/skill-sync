'use client'
import { Box, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import SideNav from '../components/SideNav';
import "./watch.css";

export default function MiniDrawer() {
  const searchParams = useSearchParams()
 
  const url = searchParams.get('url')

  console.log("URL", url)

  return (
    <Box sx={{ display: 'flex' }}>
      <SideNav />
      <Box className="watch" component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Box className="header">
          <Box className="header-content">
            <Typography className="header-text">Welcome to SkillSync</Typography>
            <Typography className="header-sub-text">Happy Learning!</Typography>
          </Box>
        </Box>
        <Box className="page-body">
          <Box className="page-content">
            <Typography variant="h5">Skill Sync Player</Typography>
            {
              <iframe width="560" height="315" src={url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            }
          </Box>
        </Box>
      </Box>
    </Box>
  );
}