import React, { useState } from 'react';
import { Modal, Button, TextField, Box } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const AddCategoryModal = ({ isOpen, handleClose, handleAddCategory }) => {
  const [categoryName, setCategoryName] = useState('');

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = () => {
    handleAddCategory(categoryName);
    setCategoryName('');
    handleClose();
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
        <h2 id="modal-modal-title">Add New Category</h2>
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
