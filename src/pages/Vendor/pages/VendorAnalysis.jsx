import React, { useState } from 'react';
import { Box, Typography, Grid, Select, MenuItem } from '@mui/material';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const VendorAnalysis = () => {
  // Sample data for demonstration purposes
  const dailyOrders = [18,2, 9, 6, 8, 5, 15];
  const weeklyOrders = [54, 76, 32, 80, 55, 34, 22];
  const monthlyOrders = [230, 420, 310, 100, 340, 200, 150 , 250 , 400 , 330 , 120 , 250 ];
  const dailyRevenue = [120, 200, 75, 60, 90, 100, 150];
  const weeklyRevenue = [1000, 1500, 1250, 2000, 1100, 900, 850];
  const monthlyRevenue = [8000, 7500, 8000, 7000, 6600, 5800, 7100 , 2000 , 3500 , 6400 , 8500 , 4500];

  // Labels for x-axis
  const daysLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeksLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  const monthsLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ,'Aug' ,'Sep' , 'Oct' ,'Nov' ,'Dec'];

  // Create state for filters
  const [ordersFilter, setOrdersFilter] = useState('daily');
  const [revenueFilter, setRevenueFilter] = useState('daily');

  // Determine which data to display based on selected filter for orders
  let ordersData;
  switch (ordersFilter) {
    case 'daily':
      ordersData = { labels: daysLabels, datasets: [{ label: 'Daily Orders', data: dailyOrders, backgroundColor: 'rgba(75, 192, 192, 0.6)' }] };
      break;
    case 'weekly':
      ordersData = { labels: weeksLabels, datasets: [{ label: 'Weekly Orders', data: weeklyOrders, backgroundColor: 'rgba(75, 192, 192, 0.6)' }] };
      break;
    case 'monthly':
      ordersData = { labels: monthsLabels, datasets: [{ label: 'Monthly Orders', data: monthlyOrders, backgroundColor: 'rgba(75, 192, 192, 0.6)' }] };
      break;
    default:
      ordersData = { labels: daysLabels, datasets: [{ label: 'Daily Orders', data: dailyOrders, backgroundColor: 'rgba(75, 192, 192, 0.6)' }] };
      break;
  }

  // Determine which data to display based on selected filter for revenue
  let revenueData;
  switch (revenueFilter) {
    case 'daily':
      revenueData = { labels: daysLabels, datasets: [{ label: 'Daily Revenue', data: dailyRevenue, borderColor: 'rgba(54, 162, 235, 0.6)', fill: false }] };
      break;
    case 'weekly':
      revenueData = { labels: weeksLabels, datasets: [{ label: 'Weekly Revenue', data: weeklyRevenue, borderColor: 'rgba(54, 162, 235, 0.6)', fill: false }] };
      break;
    case 'monthly':
      revenueData = { labels: monthsLabels, datasets: [{ label: 'Monthly Revenue', data: monthlyRevenue, borderColor: 'rgba(54, 162, 235, 0.6)', fill: false }] };
      break;
    default:
      revenueData = { labels: daysLabels, datasets: [{ label: 'Daily Revenue', data: dailyRevenue, borderColor: 'rgba(54, 162, 235, 0.6)', fill: false }] };
      break;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Vendor Analysis
      </Typography>

      {/* Grid layout for organizing charts */}
      <Grid container spacing={4}>
        {/* Orders section */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Orders Analysis
            </Typography>

            {/* Filter for orders */}
            <Select
              value={ordersFilter}
              onChange={(e) => setOrdersFilter(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>

            {/* Display orders chart based on selected filter */}
            <Box mt={2}>
              <Bar data={ordersData} />
            </Box>
          </Box>
        </Grid>

        {/* Revenue section */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h6" gutterBottom>
              Revenue Analysis
            </Typography>

            {/* Filter for revenue */}
            <Select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>

            {/* Display revenue chart based on selected filter */}
            <Box mt={2}>
              <Line data={revenueData} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VendorAnalysis;
