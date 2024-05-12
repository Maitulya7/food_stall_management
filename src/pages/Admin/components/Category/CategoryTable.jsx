import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon
import AddCategoryModal from "./AddCategoryModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import DEFAULT_URL from "../../../../config";
import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

const CategoryTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [openImageModal, setOpenImageModal] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [selectedItemIdToDelete, setSelectedItemIdToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    axios
      .get(`${DEFAULT_URL}/api/v1/admin/categories`, {
        headers: {
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  };

  const handleEdit = (id) => {
    // Handle edit action here
    console.log(`Editing category with ID: ${id}`);
  };

  const handleDelete = (id) => {
    const accessToken = localStorage.getItem("access-token");

    if (!accessToken) {
      console.error("Access token not found.");
      return;
    }

    axios
      .delete(`${DEFAULT_URL}/api/v1/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        console.log("Category deleted successfully:", id);
        fetchCategories();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const handleAddCategory = (categoryName) => {
    console.log(`Adding category: ${categoryName}`);
    fetchCategories();
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewImage = (imageUrl) => {
    setImageUrl(imageUrl);
    setOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setOpenImageModal(false);
  };

  const handleDeleteConfirmationOpen = (itemId) => {
    setSelectedItemIdToDelete(itemId);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setSelectedItemIdToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleConfirmDeleteItem = () => {
    if (selectedItemIdToDelete) {
      handleDelete(selectedItemIdToDelete);
      handleDeleteConfirmationClose();
    }
  };

  const columns = [
    { field: "srNo", headerName: "Sr No", width: 100 },
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "viewImage",
      headerName: "View Image",
      width: 150,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleViewImage(params.row.image_url)}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 100,
      renderCell: (params) => (
        <IconButton
          color="primary"
          size="small"
          onClick={() => handleEdit(params.row.id)}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteConfirmationOpen(params.row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        <Typography variant="h6">Category Table</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ marginBottom: "10px" }}
        >
          Add Category
        </Button>
      </Box>

      <AddCategoryModal
        isOpen={isModalOpen}
        handleClose={handleCloseModal}
        handleAddCategory={handleAddCategory}
      />
      <DataGrid
        rows={categories.map((category, index) => ({
          ...category,
          srNo: index + 1,
        }))}
        columns={columns}
        pageSize={5}
      />
      <Dialog open={openImageModal} onClose={handleCloseImageModal}>
        <DialogTitle>View Image</DialogTitle>
        <DialogContent>
          <img
            src={imageUrl}
            alt="Category Image"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseImageModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteConfirmationModal
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleConfirmDeleteItem}
      />
    </div>
  );
};

export default CategoryTable;
