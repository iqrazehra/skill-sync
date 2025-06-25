// Import necessary modules
'use client'
import React, { useState } from "react";
import { Mail as MailIcon, LockOpen as Password, School as SchoolIcon, DateRange as DateRangeIcon, InsertDriveFile as FileIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';
import { Box, Button, InputAdornment, MenuItem, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Corrected import from 'next/navigation' to 'next/router'
import "./signup.css";

export const SignUpScreen = () => {
  const router = useRouter();
  const [username, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [biography, setMajor] = useState("");
  const [experience_years, setDegree] = useState("");

  const handleSignUp = async () => {
    try {
      const userInfo = { username, email, password, role };
      if (role === "teacher") {
        Object.assign(userInfo, { biography,experience_years });
      }
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        const data = await response.json();
        if(role=='teacher')
        localStorage.setItem('user_profile', JSON.stringify(data));
        console.log('Sign-up successful', data);
        router.push('/login');
      } else {
        console.error('Sign-up failed', response.statusText);
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
    }
  };

  return (
    <Box className="signup-screen">
      <Box className="overlap-group">
        <Box className="sign-up-fields">
          <Typography className="text-3">Create an Account</Typography>
          <Box className="email-password">
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              label="Username"
              placeholder="Enter your Username"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              label="Email"
              placeholder="Enter your email address"
            />
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Password />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              label="Password"
              type="password"
              placeholder="Enter your password"
            />
            <TextField
              fullWidth
              label="Role"
              select
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </TextField>
            {role === "teacher" && (
              <>
                {/* <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setMajor(e.target.value)}
                  fullWidth
                  label=""
                  placeholder="Enter your major"
                /> */}
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SchoolIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setDegree(e.target.value)}
                  fullWidth
                  label="Experience"
                  placeholder="Enter your number of experience years"
                />
                {/* <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DateRangeIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setGraduationDate(e.target.value)}
                  fullWidth
                  label="Graduation Date"
                  type="date"
                /> */}
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FileIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setMajor(e.target.value)}
                  fullWidth
                  label="Biography"
                  multiline
                  rows={4}
                  placeholder="Write your Biography here"
                />
              </>
            )}
          </Box>
          <Box className="sign-up-input">
            <Button onClick={handleSignUp} fullWidth variant="contained" color="primary">
              Sign Up
            </Button>
          </Box>
          <Box className="login-link">
            <Typography>
              Already have an account? <Link href="/login">Log in</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpScreen;
