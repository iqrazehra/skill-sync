'use client';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import SideNav from '../components/SideNav';
import "./addcourse.css";
import { toast } from 'react-toastify';

export default function MiniDrawer() {
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        teacher: '',
        imageUrl: '',
        videoUrl: '',
        viewCount: 0,
        ratings: 0.0,
    });

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetch(`/api/categories`)
                const result = await response.json();
                setCategories(result);
                setLoading(false);
            } catch (err) {
                console.log("Unable to fetch categories data", err);
                setLoading(false);
            }
        }
        getCourses();
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/addcourse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...formData,
                teacher: JSON.parse(localStorage.getItem('user_profile')!).user_id,
            }),
        });

        if (response.ok) {
            console.log('Course added successfully!');
            toast.success('Course added successfully!')
            setFormData({
                title: '',
                description: '',
                category: '',
                teacher: '',
                imageUrl: '',
                videoUrl: '',
                viewCount: 0,
                ratings: 0.0,
            })
            // You can update the UI or handle success as needed
        } else {
            toast.error('Failed to add course');
            console.error('Failed to add course');
            // Handle the error or update the UI accordingly
        }
        // Add logic to handle form submission (e.g., API request to save the course data)
        console.log('Form data submitted:', formData);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <SideNav />
            <Box className="addcourse" component="main" sx={{ flexGrow: 1, p: 1 }}>
                <Box className="header">
                    <Box className="header-content">
                        <Typography className="header-text">Welcome to SkillSync</Typography>
                        <Typography className="header-sub-text">Start Learning Now!</Typography>
                    </Box>
                </Box>
                <Box className="page-body">
                    <Box className="page-content">
                        <Typography variant="h5">Add New Course</Typography>
                        {
                            !loading && categories &&
                            <form onSubmit={handleSubmit}>
                                <Box mb={2}>
                                    <TextField
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        label="Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        multiline
                                        fullWidth
                                        required
                                    />
                                </Box>
                                <Box mb={2}>
                                    <FormControl fullWidth required>
                                        <InputLabel>Category</InputLabel>
                                        <Select
                                            label="Category"
                                            name="category"
                                            value={formData.category}
                                            onChange={handleChange}
                                        >
                                            {
                                                categories.map((k: any, index: any) => {
                                                    return (
                                                        <MenuItem style={{color: '#000000'}} id={index} key={index} value={k.category_id}>{k.name}</MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        label="Image URL"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box mb={2}>
                                    <TextField
                                        label="Video URL"
                                        name="videoUrl"
                                        value={formData.videoUrl}
                                        onChange={handleChange}
                                        fullWidth
                                    />
                                </Box>
                                <Box mt={2}>
                                    <Button type="submit" variant="contained" color="primary">
                                        Upload Course
                                    </Button>
                                </Box>
                            </form>
                        }

                    </Box>
                </Box>
            </Box>
        </Box>
    );
}