'use client'
import React from 'react';
import { Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CourseCard = ({ view, courseId, ratings, imageSrc, videoUrl, title, instructor, favorite, enrolled, setReload }:any) => {
    const router = useRouter();

    const addToWishlist = async () => {
        try {
            if(favorite) {
                const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
                const response = await fetch('/api/wishlist/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        courseId,
                    }),
                });
    
                if (response.ok) {
                    toast.success('Course removed from wishlist successfully!');
                    setReload(prevState => !prevState); // Update the UI to reflect the change
                } else {
                    toast.error('Failed to remove course from wishlist');
                }
            } else {
                const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
                const response = await fetch('/api/wishlist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                        courseId,
                    }),
                });
    
                if (response.ok) {
                    toast.success('Course added to wishlist successfully!');
                    setReload(prevState => !prevState); // Update the UI to reflect the change
                } else {
                    toast.error('Failed to add course to wishlist');
                }
            }
        } catch (error) {
            toast.error('Error managing wishlist');
            console.error('Error managing wishlist:', error);
        }
    };

    const deleteCourse = async () => {
        try {
            const response = await fetch(`/api/deletecourse?courseId=${courseId}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                toast.success('Course deleted successfully!');
                setReload(prevState => !prevState); // Trigger update in parent component
            } else {
                const errorMsg = await response.text();
                toast.error(`Failed to delete the course: ${errorMsg}`);
            }
        } catch (error) {
            toast.error('Error deleting the course');
            console.error('Error deleting the course:', error);
        }
    };
    

    const addEnrollment = async () => {
        try {
            if (!enrolled) {
                const response = await fetch('/api/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: JSON.parse(localStorage.getItem('user_profile')!).user_id,
                        courseId: courseId,
                    }),
                });

                if (response.ok) {
                    console.log('User has been enrolled successfully!');
                    toast.success('User has been enrolled successfully!');
                    // You can update the UI or handle success as needed
                } else {
                    console.error('Failed to enrolled in a course');
                    toast.error('Failed to enrolled in a course');
                    // Handle the error or update the UI accordingly
                }
                setReload(true);
            } else {
                router.push(`/watch?url=${videoUrl}`)
            }
        } catch (error) {
            console.error('Error adding course to wishlist:', error);
            // Handle the error or update the UI accordingly
        }
    }

    const handleRatings = async (newValue) => {
        try {
            const userId = JSON.parse(localStorage.getItem('user_profile')!).user_id;
            const response = await fetch('/api/ratings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId,
                    courseId,
                    ratings: newValue,
                }),
            });

            if (response.ok) {
                toast.success('Rating updated successfully!');
                setReload(prevState => !prevState); // Reflect rating update
            } else {
                toast.error('Failed to update rating');
            }
        } catch (error) {
            toast.error('Error updating rating');
            console.error('Error updating rating:', error);
        }
    };

    return (
        <Card className="card">
            <CardMedia
                component="img"
                height="140"
                image={imageSrc}
                alt={title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {instructor}
                </Typography>
                <Rating
                    name="simple-controlled"
                    value={ratings}
                    precision={0.5}
                    onChange={(event, newValue) => handleRatings(newValue)}
                />
                <Box sx={{ mt: 2 }}>
                    {view === 'mycourses' ?
                        <Button onClick={deleteCourse} variant="contained" color="primary">
                            Delete Course
                        </Button>
                        :
                        <Button onClick={addEnrollment} variant="contained" color="primary">
                            {enrolled ? 'Watch Now' : 'Enroll'}
                        </Button>
                    }
                    {(view === 'home' || view === 'wishlist') &&
                        <IconButton onClick={addToWishlist} color="primary" aria-label="add to wishlist">
                            {favorite ? <FavoriteIcon color="primary" /> : <FavoriteBorderIcon color="primary" />}
                        </IconButton>
                    }
                </Box>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
