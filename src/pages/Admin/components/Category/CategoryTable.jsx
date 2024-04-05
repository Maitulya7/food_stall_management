import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CategoryTable = () => {
    const handleEdit = (id) => {
      // Handle edit action here
      console.log(`Editing category with ID: ${id}`);
    };

const columns = [
  { field: 'id', headerName: 'Sr No', width: 100 },
  { field: 'category', headerName: 'Category Name', width: 200 },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <IconButton color="primary" size="small" onClick={() => handleEdit(params.row.id)}>
        <EditIcon />
      </IconButton>
    ),
  },
];

const rows = [
  { id: 1, category: 'Category 1' },
  { id: 2, category: 'Category 2' },
  { id: 3, category: 'Category 3' },
  { id: 4, category: 'Category 4' },
  { id: 5, category: 'Category 5' },
];



  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
};

export default CategoryTable;
