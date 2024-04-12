import { Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, ListItemText, Select, TextField, MenuItem } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import DEFAULT_URL from "../../../../config";

const DialogBox = ({ open, setOpen, fetchMenuItems, editItemData ,setEditItemData}) => {
  const [singleCategory, setSingleCategory] = useState('')
  const [categories, setCategories] = useState([])
  const storedCategoriesString = localStorage.getItem("categories");
  const storedCategories = JSON.parse(storedCategoriesString);
  const [newItem, setNewItem] = useState({
    name: '',
    item_type: '',
    sub_type: [],
    taste: [],
    tags: [],
    price: ''
  });

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



  const fetchCategories = () => {
    axios.get('http://localhost:3000/api/v1/admin/categories')
      .then(response => {
        setCategories(response.data.categories);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  };

  const handleAddOrUpdateItem = () => {
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
    const apiEndpoint = editItemData ?
      `${DEFAULT_URL}/api/v1/vendor/food_items/${editItemData.foodItemId}`
      : `${DEFAULT_URL}/api/v1/vendor/food_items?category_id=${singleCategory}`;
    const requestMethod = editItemData ? 'put' : 'post';

    axios[requestMethod](apiEndpoint, postData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      }
    })
      .then(response => {
        console.log(`${editItemData ? 'Item edited' : 'Item added'} successfully:`, response.data);
        setNewItem({
          name: '',
          item_type: '',
          sub_type: [],
          taste: [],
          tags: [],
          price: '',
        });
        setOpen(false);
        fetchMenuItems();
      })
      .catch(error => {
        console.error(`Error ${editItemData ? 'editing' : 'adding'} item:`, error);
      });
  };


  useEffect(() => {
    if (editItemData) {
      setNewItem({
        name: editItemData.name || '',
        item_type: editItemData.item_type,
        sub_type: editItemData.sub_type,
        taste: editItemData.taste,
        tags: editItemData.tags,
        price: editItemData.price
      });
    }
    else{
      setNewItem({
        name: '',
        item_type: '',
        sub_type: [],
        taste: [],
        tags: [],
        price: ''
      });

    }
  }, [editItemData]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{editItemData ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}> {/* Add Grid container */}
            <Grid item xs={6}>
              <TextField
                margin="dense"
                name="name"
                label="Name"
                fullWidth
                value={newItem.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="dense"
                name="price"
                label="Price"
                fullWidth
                type="number"
                value={newItem.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel>Item Type</InputLabel>
                <Select
                  label='Item Type'
                  name="item_type"
                  value={newItem.item_type}
                  onChange={handleChange}
                >
                 <MenuItem value="Veg">Veg 🟢</MenuItem>
<MenuItem value="Non-Veg">Non-Veg 🔴</MenuItem>


                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                  {["Jain 🌿", "Swaminarayan 🙏", "Regular 🍽️"
                  ].map((subType) => (
                    <MenuItem key={subType} value={subType}>
                      {subType}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                  {["Spicy 🌶️", "Medium 🔥", "Light 🌿"].map((taste) => (
                    <MenuItem key={taste} value={taste}>
                      {taste}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
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
                  {["Top Picks 🌟", "Family Favorites ❤️", "Quick Bites ⏱️", "Tasty Treats 😋", "Healthy Eats 🥗", "Kids' Choice 🧒", "Budget Friendly 💰"]
                    .map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            {!editItemData && (
              <Grid item xs={12}>
                <FormControl style={{ marginTop: "15px" }} fullWidth>
                  <InputLabel id="categories-label">Categories</InputLabel>
                  <Select
                    label="Categories"
                    labelId="categories-label"
                    id="categories"
                    value={singleCategory}
                    onChange={(e) => setSingleCategory(e.target.value)}
                  >
                    {storedCategories?.map((category) => (
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
              </Grid>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingX: '24px', paddingY: '18px' }}>
          <Button onClick={() => {
            setEditItemData('')
            setOpen(false)}}>Cancel</Button>
          <Button onClick={handleAddOrUpdateItem} variant='contained' color="primary">{editItemData ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>

    </>
  )
}

export default DialogBox