import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';
import { Button, FormControl, Typography, Box, MenuItem, InputLabel, Select, IconButton, Grid, ListItemText } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DEFAULT_URL from '../../../../config';
import DialogBox from './DialogBox';
import CustomPopover from './CustomPopover';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import { toast } from 'react-toastify';

const MenuTable = () => {
  const [menuData, setMenuData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editItemData, setEditItemData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [error, setError] = useState(null);
  const [subTypeAnchorEl, setSubTypeAnchorEl] = useState(null);
  const [tasteAnchorEl, setTasteAnchorEl] = useState(null);
  const [tagsAnchorEl, setTagsAnchorEl] = useState(null);
  const [popoverData, setPopoverData] = useState({});
  const [selectedItemIdToDelete, setSelectedItemIdToDelete] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const storedCategoriesString = localStorage.getItem("categories");
  const storedCategories = JSON.parse(storedCategoriesString);

  const fetchMenuItems = () => {
    const accessToken = localStorage.getItem("access-token");
    let url = `${DEFAULT_URL}/api/v1/vendor/food_items`;

    if (selectedCategory && selectedCategory !== "All Items") {
      url += `?category_name=${encodeURIComponent(selectedCategory)}`;
    }

    axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        setMenuData(response.data.food_items);
        setError(null);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          setError(`No Item Available for ${selectedCategory} Category.`);
        } else {
          console.error('Error fetching menu items:', error);
        }
      });
  };

  const handleDeleteItem = (foodItemId) => {
    const accessToken = localStorage.getItem("access-token");

    axios.delete(`${DEFAULT_URL}/api/v1/vendor/food_items/${foodItemId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        toast.success("Item Deleted Successfully")
        fetchMenuItems();
      })
      .catch(error => {
        console.error('Error deleting item:', error);
      });
  };

  const handleEditItem = (item) => {
    setEditItemData(item);
    setOpen(true);
  };

  const handlePopoverOpen = (event, rowData, type) => {
    switch (type) {
      case 'subType':
        setSubTypeAnchorEl(event.currentTarget);
        break;
      case 'taste':
        setTasteAnchorEl(event.currentTarget);
        break;
      case 'tags':
        setTagsAnchorEl(event.currentTarget);
        break;
      default:
        break;
    }
    setPopoverData(rowData);
  };

  const handlePopoverClose = (type) => {
    switch (type) {
      case 'subType':
        setSubTypeAnchorEl(null);
        break;
      case 'taste':
        setTasteAnchorEl(null);
        break;
      case 'tags':
        setTagsAnchorEl(null);
        break;
      default:
        break;
    }
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
      handleDeleteItem(selectedItemIdToDelete);
      handleDeleteConfirmationClose();
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, [selectedCategory]);

  const columns = [
    { field: 'id', headerName: 'Sr. No.', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'item_type', headerName: 'Item Type', width: 150 },
    {
      field: 'sub_type',
      headerName: 'Sub Type',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handlePopoverOpen(e, params.row, 'subType')}
        >
          Sub Type
        </Button>
      ),
    },
    {
      field: 'taste',
      headerName: 'Taste',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handlePopoverOpen(e, params.row, 'taste')}
        >
          Taste
        </Button>
      ),
    },
    {
      field: 'tags',
      headerName: 'Tags',
      width: 200,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handlePopoverOpen(e, params.row, 'tags')}
        >
          Tags
        </Button>
      ),
    },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditItem(params.row)}>
          <EditIcon color='primary' />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteConfirmationOpen(params.row.foodItemId)}>
          <DeleteIcon color='error' />
        </IconButton>
      ),
    },
  ];

  const rows = menuData.map((item, index) => ({
    foodItemId: item.id,
    id: index + 1,
    name: item.name,
    item_type: item.item_type,
    sub_type: item.sub_type,
    taste: item.taste,
    tags: item.tags,
    price: item.price,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", gap: "15px", marginBottom: "15px" }}>
        <Button variant="contained" sx={{ marginY: "10px", width: "15%" }} color="primary" onClick={() => {
          setEditItemData(null)
          setOpen(true)}}>Add Item</Button>
        <FormControl sx={{ width: "25%" }} margin="dense">
          <InputLabel>Select Category</InputLabel>
          <Select
            label='Select Category'
            name="item_type"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            inputProps={{ preserveWhitespace: 'true' }}
          > 
          <MenuItem value="All Items" sx={{padding:"15px"}}>All Items</MenuItem>
            {storedCategories?.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  <Grid container alignItems="center">
                    <Grid item>
                      <img src={category.image_url} alt={category.name} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }} />
                    </Grid>
                    <Grid item>
                      <ListItemText primary={category.name} />
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Typography variant="body1" color="error">
          {error}
        </Typography>
      )}

      {!error && (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      )}

      <CustomPopover
        open={Boolean(subTypeAnchorEl)}
        anchorEl={subTypeAnchorEl}
        onClose={() => handlePopoverClose('subType')}
        popoverData={popoverData}
        type="sub_type"
      />

      <CustomPopover
        open={Boolean(tasteAnchorEl)}
        anchorEl={tasteAnchorEl}
        onClose={() => handlePopoverClose('taste')}
        popoverData={popoverData}
        type="taste"
      />

      <CustomPopover
        open={Boolean(tagsAnchorEl)}
        anchorEl={tagsAnchorEl}
        onClose={() => handlePopoverClose('tags')}
        popoverData={popoverData}
        type="tags"
      />

      <DialogBox
        open={open}
        setOpen={setOpen}
        fetchMenuItems={fetchMenuItems}
        editItemData={editItemData}
        setEditItemData={setEditItemData}
      />
       <DeleteConfirmationModal
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        onConfirm={handleConfirmDeleteItem}
      />
    </div>
  );
};

export default MenuTable;
