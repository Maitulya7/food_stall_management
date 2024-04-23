import React, { useState } from 'react';
import { Modal, Button, TextField, Box, Input, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import AttachFileIcon from '@mui/icons-material/AttachFile'; // Import AttachFileIcon
import axios from 'axios';
import DEFAULT_URL from '../../../../config';
import { toast } from 'react-toastify';

const AddCategoryModal = ({ isOpen, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    const accessToken = localStorage.getItem('access-token');
    console.log('Submit button clicked');

    if (!accessToken) {
      console.error('Access token not found.');
      return;
    }

    const formData = new FormData();
    formData.append('category[name]', categoryName);
    formData.append('category[image]', selectedFile);

    axios.post(`${DEFAULT_URL}/api/v1/admin/categories`, formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log('Category created successfully:', response.data.category);
      console.log('Message:', response.data.message);
      handleAddCategory(response.data.category);
      toast.success("Successfully Added!")
      setCategoryName('');
      setSelectedFile(null);
      handleClose();
    })
    .catch(error => {
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
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            sx={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <AttachFileIcon />
            </IconButton>
          </label>
          <span style={{ marginLeft: '8px' }}>{selectedFile ? 'Image Selected' : 'Choose Image'}</span>
        </div>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ mt: 2 }}>
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          Add Category
        </Button>
      </Box>
    </Modal>
  );
};

export default AddCategoryModal;
