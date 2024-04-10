import React from 'react';
import { Popover, Box, Typography, List, ListItem } from '@mui/material';

const CustomPopover = ({ open, anchorEl, onClose, popoverData, type }) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {popoverData[type] ? (
        <Box sx={{ p: 2 }}>
          <List>
            {popoverData[type].map((item, index) => (
              <ListItem key={index}>
                <Typography>{item}</Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        <Typography sx={{ p: 2 }}>No {type} available</Typography>
      )}
    </Popover>
  );
};

export default CustomPopover;
