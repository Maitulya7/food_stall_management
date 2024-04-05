import React, { useState } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import axios from 'axios';

const AddCategoryModal = ({ isOpen, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = () => {
    const accessToken = localStorage.getItem('access-token');
    console.log('Submit button clicked');

    // Make sure you have the access token before proceeding
    if (!accessToken) {
      console.error('Access token not found.');
      return;
    }

    // Send POST request to create category
    axios.post('http://localhost:3000/api/v1/admin/categories', {
      name: categoryName
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
    .then(response => {
      // Handle successful response
      console.log('Category created successfully:', response.data.category);
      console.log('Message:', response.data.message);
      handleAddCategory(response.data.category);
      setCategoryName('');
      handleClose();
    })
    .catch(error => {
      // Handle error
      console.error('Error creating category:', error);
     
    });
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '400px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 id="modal-modal-title">Add New Category</h2>
          <Button onClick={handleClose} color="primary">
            <CloseIcon />
          </Button>
        </div>
        <TextField
          fullWidth
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={handleChange}
          margin="normal"
        />
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Add Category
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
