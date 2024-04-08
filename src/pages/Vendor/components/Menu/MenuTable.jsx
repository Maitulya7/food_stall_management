import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';

const MenuTable = ({ handleEdit, handleDelete }) => {
    const [menuData, setMenuData] = useState([
        {
            name: 'Tacos',
            item_type: 'Veg',
            sub_type: ['jain', 'swaminarayan', 'regular'],
            taste: ['spicy', 'medium', 'light'],
            tags: ['best_seller', 'kids', 'starter', 'yummy', 'healthy'],
            price: 100,
        },
        {
            name: 'Pizza',
            item_type: 'Non-Veg',
            sub_type: ['regular'],
            taste: ['spicy', 'medium'],
            tags: ['best_seller', 'cheesy', 'yummy'],
            price: 200,
        },
    ]);
    const [open, setOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        item_type: '',
        sub_type: [],
        taste: [],
        tags: [],
        price: ''
    });

    const handleChange = (event) => {
        setNewItem({
            ...newItem,
            [event.target.name]: event.target.value
        });
    };

    const handleMultiSelectChange = (event) => {
        const value = event.target.value;
        setNewItem({
            ...newItem,
            [event.target.name]: value
        });
    };

    const handleAddItem = () => {
        setMenuData([...menuData, newItem]);
        setNewItem({
            name: '',
            item_type: '',
            sub_type: [],
            taste: [],
            tags: [],
            price: ''
        });
        setOpen(false);
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
                <button onClick={() => handleEdit(params.row.id)}>Edit</button>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 120,
            renderCell: (params) => (
                <button onClick={() => handleDelete(params.row.id)}>Delete</button>
            ),
        },
    ];

    const rows = menuData?.map((item, index) => ({
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
            <Button variant="contained" sx={{marginY:"10px" , width:"15%"}} color="primary" onClick={() => setOpen(true)}>Add Item</Button>
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAddItem} color="primary">Add</Button>
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
