import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip, IconButton, Grid, ListItemText } from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DEFAULT_URL from '../../../../config';

const MenuTable = ({ }) => {
  const [singleCategory, setSingleCategory] = useState('')
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([])
  const [newItem, setNewItem] = useState({
    name: '',
    item_type: '',
    sub_type: [],
    taste: [],
    tags: [],
    price: ''
  });
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    fetchMenuItems();
    fetchCategories()
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleMultiSelectChange = (event) => {
    const { name, value } = event.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    const postData = {
      food_item: {
        name: newItem.name,
        item_type: newItem.item_type,
        sub_type: newItem.sub_type,
        taste: newItem.taste,
        tags: newItem.tags,
        price: newItem.price,
      }
    };

    const accessToken = localStorage.getItem("access-token");
    axios.post(`${DEFAULT_URL}/api/v1/vendor/food_items?category_id=${singleCategory}`, postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        console.log('Item added successfully:', response.data);
        setMenuData([...menuData, response.data.food_item]);
        setNewItem({
          name: '',
          item_type: '',
          sub_type: [],
          taste: [],
          tags: [],
          price: '',
        });
        setOpen(false);
      })
      .catch(error => {
        console.error('Error adding item:', error);
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
        console.log('Item deleted successfully:', response.data);
        setMenuData(menuData.filter(item => item.food_item_id !== foodItemId));
        fetchMenuItems()

      })
      .catch(error => {
        console.error('Error deleting item:', error);
        console.log(menuData);
        console.log(foodItemId);
      });
  };


  const fetchMenuItems = () => {
    const accessToken = localStorage.getItem("access-token");
    axios.get(`${DEFAULT_URL}/api/v1/vendor/food_items`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        setMenuData(response.data.food_items);
      })
      .catch(error => {
        console.error('Error fetching menu items:', error);
      });
  };

  const fetchCategories = () => {
    axios.get('http://localhost:3000/api/v1/admin/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const columns = [
    { field: 'id', headerName: 'Sr. No.', width: 100 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'item_type', headerName: 'Item Type', width: 150 },
    { field: 'sub_type', headerName: 'Sub Type', width: 200 },
    { field: 'taste', headerName: 'Taste', width: 200 },
    { field: 'tags', headerName: 'Tags', width: 200 },
    { field: 'price', headerName: 'Price', width: 120 },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <IconButton >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 120,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteItem(params.row.foodItemId, console.log(params.row.foodItemId))}>
          <DeleteIcon />
        </IconButton>
      ),
    },

  ];

  const rows = menuData.map((item, index) => ({
    foodItemId: item.id,
    id: index + 1,
    name: item.name,
    item_type: item.item_type,
    sub_type: item.sub_type.join(', '),
    taste: item.taste.join(', '),
    tags: item.tags.join(', '),
    price: item.price,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" sx={{ marginY: "10px", width: "15%" }} color="primary" onClick={() => setOpen(true)}>Add Item</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Name"
            fullWidth
            value={newItem.name}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            fullWidth
            type="number"
            value={newItem.price}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel>Item Type</InputLabel>
            <Select
              label='Item Type'
              name="item_type"
              value={newItem.item_type}
              onChange={handleChange}
            >
              <MenuItem value="Veg">Veg</MenuItem>
              <MenuItem value="Non-Veg">Non-Veg</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Sub Type</InputLabel>
            <Select
              label='Sub Type'
              name="sub_type"
              multiple
              value={newItem.sub_type}
              onChange={handleMultiSelectChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {['jain', 'swaminarayan', 'regular'].map((subType) => (
                <MenuItem key={subType} value={subType}>
                  {subType}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Taste</InputLabel>
            <Select
              label='Taste'
              name="taste"
              multiple
              value={newItem.taste}
              onChange={handleMultiSelectChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {['spicy', 'medium', 'light'].map((taste) => (
                <MenuItem key={taste} value={taste}>
                  {taste}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel>Tags</InputLabel>
            <Select
              label='Tags'
              name="tags"
              multiple
              value={newItem.tags}
              onChange={handleMultiSelectChange}
              renderValue={(selected) => (
                <div>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </div>
              )}
            >
              {['best_seller', 'kids', 'starter', 'yummy', 'healthy'].map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="categories-label">Categories</InputLabel>
            <Select
              label="Categories"
              labelId="categories-label"
              id="categories"
              value={(e) => setSingleCategory(e.target.value)}
              onChange={handleChange}
              renderValue={(selected) => selected}
            >
              {categories?.map((category) => (
                <MenuItem key={category.id} value={category.id}>
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
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: '24px', paddingY: '18px' }}>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddItem} variant='contained' color="primary">Add</Button>
        </DialogActions>
      </Dialog>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export default MenuTable;
