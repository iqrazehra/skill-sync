"use client";
import React, { useState } from "react";
import {
  Mail as MailIcon,
  LockOpen as Password,
  Google as GoogleIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./login.css";
import { JSX } from "react/jsx-runtime";
import { toast } from "react-toastify";

export const LoginScreen = (): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // Password length validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user_profile", JSON.stringify(data));
        // toast.success('Login successful!');
        // Redirect based on role
        router.push(data.role === "teacher" ? "/dashboard" : "/home");
      } else {
        toast.success(`Login failed: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Error during login: Please try again later.");
      console.error("Error during login:", error);
    }
  };

  return (
    <Box className="login-screen">
      <Box className="overlap-group">
        <video autoPlay muted loop id="background-video">
          <source src="/login-video.mp4" type="video/mp4" />
        </video>
        <Box className="sign-in-fields">
          <Box className="text-and-supporting">
            <Typography className="text-3">Welcome back</Typography>
            <Typography className="supporting-text">
              Sign in to continue to Skill Sync.
            </Typography>
          </Box>
          <Box className="email-password">
            <TextField
              className="text-field-instance"
              InputProps={{
                startAdornment: (
                  <InputAdornment className="login-icon" position="start">
                    <MailIcon className="icon-instance-node" />
                  </InputAdornment>
                ),
              }}
              onChange={(e: any) => setEmail(e.target.value)}
              fullWidth
            //   label="Email"
              placeholder="Enter your email address"
            />
            <TextField
              className="text-field-instance"
              InputProps={{
                startAdornment: (
                  <InputAdornment className="login-icon" position="start">
                    <Password className="icon-instance-node" />
                  </InputAdornment>
                ),
              }}
              fullWidth
              onChange={(e: any) => setPassword(e.target.value)}
            //   label="Password"
              type={"password"}
              placeholder="Enter your password"
            />
          </Box>
          <Box className="sign-in-input">
            <Box className="frame">
              <Box className="remember-instance-overlay">
                <Box className="remember-checkbox">
                  <Checkbox className="remember-instance" />
                </Box>
                <Typography className="remember-instance-text">
                  Remember for 30 days
                </Typography>
              </Box>
              {/* <Box className="forgot-password-overlay">
                <Link href="/forgot-password">
                  <Typography className="forgot-password">
                    Forgot Password
                  </Typography> */}
                {/* </Link> */}
              {/* </Box> */}
            </Box>
            <Box className="signin-button-primary-overlay">
              <Button className="signin-button-primary" onClick={handleLogin}>
                <Typography className="signin-button-primary-text">
                  Sign In
                </Typography>
              </Button>
            </Box>
          </Box>
          {/* <Box className="google-and-apple">
            <Box className="signin-button-overlay">
              <Box className="signin-button">
                <Box className="button-large-overlay">
                  <Button startIcon={<GoogleIcon />} className="button-large">
                    Continue with Google
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box className="signin-button-overlay">
              <Box className="signin-button">
                <Box className="button-large-overlay">
                  <Button startIcon={<AppleIcon />} className="button-large">
                    Continue with Apple
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box> */}
          <Box className="signup">
            <Typography className="signup-text">
              Don’t have an account?
            </Typography>
            <Link href="/signup">
              <Typography className="signup-link">Sign Up</Typography>
            </Link>
          </Box>
        </Box>
        <Box className="footer">
          <Typography className="footer-text">
            Learn more about our{" "}
            <Link href={"/privacy-policy"} className="footer-privacy">
              privacy policy
            </Link>{" "}
            here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginScreen;
