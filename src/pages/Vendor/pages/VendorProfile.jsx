import React, { useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  Button,
  Grid,
  Paper,
  Chip,
  Divider,
  Fade,
} from "@mui/material";
import { Email, Phone, Person, ExitToApp } from "@mui/icons-material";
import VendorSidebar from "../components/VendorSidebar";
import VendorTopbar from "../components/VendorTopbar";
import { useNavigate } from "react-router-dom";

const VendorProfile = () => {
  const token = localStorage.getItem("access-token");
  const navigate = useNavigate();
  const stallName = localStorage.getItem("stall_name");
  const stallLogo = localStorage.getItem("stall_logo");
  const email = localStorage.getItem("email");
  const phoneNumber = localStorage.getItem("phone_number");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");

  const categoriesString = localStorage.getItem("categories");
  const categories = JSON.parse(categoriesString);

  useEffect(() => {
    if (!token) {
      navigate("/vendor/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("access-token");
    navigate("/vendor/login");
  };

  return (
    <Box display="flex" minHeight="100vh">
      <VendorSidebar style={{ height: "100vh" }} />
      <Box flex={1} display="flex" flexDirection="column">
        <VendorTopbar pageTitle="Vendor Profile" />

        <Box flexGrow={1} p={4}>
          <Fade in={true} timeout={500}>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} md={10} lg={8}>
                <Paper
                  elevation={3}
                  sx={{ p: 3, transition: "box-shadow 0.3s" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 10px 20px rgba(0,0,0,0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 5px 10px rgba(0,0,0,0.1)")
                  }
                >
                  {/* Stall logo */}
                  <Box display="flex" justifyContent="center" mb={3}>
                    <Avatar
                      src={stallLogo}
                      alt={`${stallName} logo`}
                      sx={{
                        width: 120,
                        height: 120,
                        borderRadius: "50%",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        transition: "transform 0.3s",
                        "&:hover": { transform: "scale(1.05)" },
                      }}
                    />
                  </Box>

                  <Typography variant="h4" align="center" gutterBottom>
                    {firstName} {lastName}
                  </Typography>

                  <Divider sx={{ my: 2 }} />

                  <Box mb={3}>
                    <Typography
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      mb={2}
                    >
                      <Person color="primary" sx={{ mr: 1 }} />
                      {firstName} {lastName}
                    </Typography>

                    {/* Email */}
                    <Typography
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      mb={2}
                    >
                      <Email color="primary" sx={{ mr: 1 }} />
                      {email}
                    </Typography>

                    {/* Phone number */}
                    <Typography
                      variant="body1"
                      display="flex"
                      alignItems="center"
                      mb={2}
                    >
                      <Phone color="primary" sx={{ mr: 1 }} />
                      {phoneNumber}
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Display categories */}
                  <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
                    {categories.map((category, index) => (
                      <Chip
                        key={index}
                        label={category.name}
                        variant="filled"
                        color="primary"
                        sx={{ fontWeight: "bold" }}
                      />
                    ))}
                  </Box>

                  {/* Profile actions */}
                  <Box mt={3} display="flex" justifyContent="center" gap={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<ExitToApp />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
};

export default VendorProfile;
