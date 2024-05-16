import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

const FoodItemDialog = ({ open, handleClose, foodItems }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Food Items Detail</DialogTitle>
      <DialogContent>
        {foodItems && Array.isArray(foodItems) && foodItems.length > 0 ? (
          <Grid container spacing={2}>
            {foodItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="subtitle1">
                      <strong>Name:</strong> {item.name}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Category:</strong> {item.category}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Amount:</strong> {item.amount}
                    </Typography>
                    {item.type && (
                      <Typography variant="body1">
                        <strong>Type:</strong> {item.type}
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No food items to display</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FoodItemDialog;
