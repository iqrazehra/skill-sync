'use client'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Image from "next/image";
import CompanyIcon from "../../public/icon.svg";
import CompanyLogo from "../../public/logo.svg";
import HomeIcon from "../../public/images/home.svg";
import ConnectorsIcon from "../../public/images/Connectors_icon.svg";
import PipelineIcon from "../../public/images/Pipeline_Icon.svg";
import CatalogIcon from "../../public/images/Catalog_icon.svg";
import AnalyticsIcon from "../../public/images/Analytics.svg";
import CampaignIcon from "../../public/images/campaign.svg";
import LogoutIcon from "../../public/images/log-out.svg";
import UserProfileIcon from "../../public/images/user-profile.svg";
import * as React from 'react';
import { useRouter } from 'next/navigation';
import "./sidenav.css";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNav() {
  const theme = useTheme();
  const router = useRouter();
  const [isTeacher] = React.useState(() => {
    // Retrieve the state from local storage or default to false if not set
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const roleState = JSON.parse(localStorage.getItem('user_profile')!).role;
      return roleState === 'teacher' ? true : false;
    }
    return false;
  });
  const [userName] = React.useState(() => {
    // Retrieve the state from local storage or default to false if not set
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const username = JSON.parse(localStorage.getItem('user_profile')!).username;
      return username || 'Rob Dilbert';
    }
    return 'Rob Dilbert';
  });
  const [open, setOpen] = React.useState(() => {
    // Retrieve the state from local storage or default to false if not set
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      const storedState = localStorage.getItem('drawerOpen');
      return storedState ? JSON.parse(storedState) : false;
    }
    return false;
  });

  const handleDrawerToggle = () => {
    const newState = !open;
    setOpen(newState);
    // Save the state to local storage
    localStorage.setItem('drawerOpen', JSON.stringify(newState));
  };

  return (
    <Box className="sideNav" sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Box className="drawer-header">
            <Box className="logo-overlay">
              <Box className="company-icon">
                <Image style={{ height: "30px", flex: "1 0 0" }} src={CompanyIcon} alt={""} onClick={handleDrawerToggle} />
              </Box>
              <Image src={CompanyLogo} alt={""} />
            </Box>
            <IconButton onClick={handleDrawerToggle}>
              {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        {!isTeacher ?
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/home')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={HomeIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'Home'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/wishlist')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={ConnectorsIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'My Wishlist'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/learnings')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={PipelineIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'My Learnings'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/allcourses')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={CatalogIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'All Courses'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/analytics')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={AnalyticsIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'About Us'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem> */}
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/notifications')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={CampaignIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'Notifications'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
          :
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/dashboard')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={HomeIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/mycourses')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={HomeIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'My Courses'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => router.push('/addcourse')}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                ><Image style={{ height: "30px", flex: "1 0 0" }} src={ConnectorsIcon} alt={""} />
                </ListItemIcon>
                <ListItemText primary={'Add Course'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </List>
        }
        <Box sx={{ flexGrow: 1 }} />

        <Box className="frame-1">
          <Box className="frame-2">
            <Box className="frame-3">
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  ><SettingsIcon />
                  </ListItemIcon>
                  <ListItemText className='frame-4' primary={'Settings'} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Box>
          </Box>
          <Box className="frame-5">
            <Box className="frame-6">
              {/* <Image style={{ height: "48px", width: "48px", borderRadius: "48px", }} src={UserProfileIcon} alt={""} /> */}
              <Typography className='user-name' style={{textTransform: 'capitalize'}}>{userName}</Typography>
            </Box>
            <Image style={{ height: "20px", width: "20px", flexShrink: "0", color: "#ffffff" }} src={LogoutIcon} alt={""} onClick={() => router.push('/login')} />
          </Box>
        </Box>
        <Divider />
      </Drawer>
    </Box>
  );
}