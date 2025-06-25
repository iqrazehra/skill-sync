import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  background: '#151517',
  position: 'fixed',
  width: '100%',
  zIndex: 1100,
});

const StyledSelect = styled(Select)({
  color: 'white',
  backgroundColor: '#2A2A2E',
  borderRadius: '4px',
  marginRight: '10px',
  width: '200px',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'transparent',
  },
  '&:hover': {
    backgroundColor: '#333',
  },
  '& .MuiSvgIcon-root': {
    color: 'white',
  },
  '.MuiSelect-select': {
    '&:focus': {
      backgroundColor: '#2A2A2E',
    },
  },
});

const StyledMenuItem = styled(MenuItem)({
  '&:hover': {
    backgroundColor: '#BB0056',
  },
  '&.Mui-selected': {
    backgroundColor: '#BB0056',
    '&:hover': {
      backgroundColor: '#DD0056',
    },
  },
  color: 'white',
});

export default function TopNav() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch categories from the API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/categories`);
        const result = await response.json();
        setCategories(result);
        setLoading(false);
      } catch (err) {
        console.error("Unable to fetch categories data", err);
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  // Handle changes in selection
  const handleChange = (event) => {
    const newCategoryId = event.target.value;
    setCategory(newCategoryId);
    // Find the category object and log its name
    const selectedCategory = categories.find(cat => cat.category_id === newCategoryId);
    console.log("Selected Category:", selectedCategory ? selectedCategory.name : 'None selected');
  };

  return (
    <StyledAppBar>
      
    </StyledAppBar>
  );
}
