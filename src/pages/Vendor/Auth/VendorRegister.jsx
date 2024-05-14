import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemText,
  Typography,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DEFAULT_URL from "../../../config";
import Lottie from "react-lottie";
import VisibilityIcon from "@mui/icons-material/Visibility";
import animationData from "../../../images/admin-register-animation.json";
import CloseIcon from "@mui/icons-material/Close";

const VendorRegister = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [hasFranchise, setHasFranchise] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
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
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      stallName: "",
      razorpay_key_id: "",
      razorpay_secret_id: "",
      franchiseDetails: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string().required("Phone Number is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      stallName: Yup.string().required("Stall Name is required"),
      razorpay_key_id: Yup.string().required("Razorpay key ID is required"),
      razorpay_secret_id: Yup.string().required(
        "Razorpay secret ID is required"
      ),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append("vendor[stall_logo]", logoFile);
        formData.append("vendor[first_name]", values.firstName);
        formData.append("vendor[last_name]", values.lastName);
        formData.append("vendor[email]", values.email);
        formData.append("vendor[phone_number]", values.phoneNumber);
        formData.append("vendor[password]", values.password);
        formData.append(
          "vendor[type_of_categories]",
          JSON.stringify(selectedCategories)
        );
        formData.append("vendor[stall_name]", values.stallName);
        formData.append("vendor[franchise]", hasFranchise);
        formData.append("vendor[franchise_details]", values.franchiseDetails);
        formData.append("vendor[razorpay_key_id]", values.razorpay_key_id);
        formData.append(
          "vendor[razorpay_secret_id]",
          values.razorpay_secret_id
        );
        formData.append(
          "client_id",
          "OT-Fkr2xgMFDGwjPO_cga2BiDwVZX5RDPwGtjTG1Vs8"
        );
        console.log(selectedCategories);

        axios
          .post(
            `${DEFAULT_URL}/api/v1/vendor/sign_up`,
            formData,
            {},
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.error("Registration failed:", error.message);
      }
    },
  });

  const closeImage = () => {
    setShowImage(false);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategories(event.target.value);
  };

  const handleFranchiseToggle = () => {
    setHasFranchise(!hasFranchise);
    if (!hasFranchise) {
      formik.setFieldValue("franchiseDetails", "");
    }
  };

  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);
    setShowImage(false); // Reset image visibility when a new image is uploaded
  };

  const handleShowImage = () => {
    setShowImage(true);
  };

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
        sx={{ position: "relative" }}
      >
        <Grid item xs={10} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h5" gutterBottom align="center">
              Vendor Registration
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="stallName"
                    name="stallName"
                    label="Stall Name"
                    value={formik.values.stallName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.stallName &&
                      Boolean(formik.errors.stallName)
                    }
                    helperText={
                      formik.touched.stallName && formik.errors.stallName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="categories-label">Categories</InputLabel>
                    <Select
                      label="Categories"
                      labelId="categories-label"
                      id="categories"
                      multiple
                      value={selectedCategories}
                      onChange={handleCategoryChange}
                      renderValue={(selected) => selected.join(",")}
                    >
                      {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.name}>
                          <Grid container alignItems="center">
                            <Grid item>
                              <img
                                src={category.image_url}
                                alt={category.name}
                                style={{
                                  width: 30,
                                  height: 30,
                                  borderRadius: "50%",
                                  marginRight: 10,
                                }}
                              />
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
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="razorpay_key_id"
                    name="razorpay_key_id"
                    label="Razorypay Key ID"
                    value={formik.values.razorpay_key_id}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.razorpay_key_id &&
                      Boolean(formik.errors.razorpay_key_id)
                    }
                    helperText={
                      formik.touched.razorpay_key_id &&
                      formik.errors.razorpay_key_id
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="razorpay_secret_id"
                    name="razorpay_secret_id"
                    label="Razorpay Secret ID"
                    value={formik.values.razorpay_secret_id}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.razorpay_secret_id &&
                      Boolean(formik.errors.razorpay_secret_id)
                    }
                    helperText={
                      formik.touched.razorpay_secret_id &&
                      formik.errors.confirmPassword
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <input
                    accept="image/*"
                    id="logo-upload"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleLogoChange}
                  />
                  <label htmlFor="logo-upload">
                    <Button
                      type="button"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      component="span"
                      startIcon={<AttachFileIcon />}
                    >
                      {logoFile ? "Logo Uploaded" : "Upload Logo"}
                    </Button>
                  </label>
                  {/* Conditionally render the "eye" icon if an image is uploaded */}
                  {logoFile && (
                    <Button onClick={handleShowImage}>
                      <VisibilityIcon />
                    </Button>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={hasFranchise}
                          onChange={handleFranchiseToggle}
                        />
                      }
                      label="Do you have a franchise?"
                    />
                  </FormControl>
                </Grid>
                {hasFranchise && (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="franchiseDetails"
                      name="franchiseDetails"
                      label="Franchise Details"
                      value={formik.values.franchiseDetails}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.franchiseDetails &&
                        Boolean(formik.errors.franchiseDetails)
                      }
                      helperText={
                        formik.touched.franchiseDetails &&
                        formik.errors.franchiseDetails
                      }
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
                style={{ marginTop: "20px" }}
              >
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: animationData,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={700}
              width={700}
            />
          </Box>
        </Grid>
      </Grid>
      {showImage && (
        <Box
          item
          xs={12}
          md={6}
          sx={{
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: "0",
            left: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "9999",
          }}
          onClick={closeImage}
        >
          <Box
            sx={{
              position: "relative",
              textAlign: "center",
              maxWidth: "80%", // Adjust as needed
            }}
            onClick={(e) => e.stopPropagation()} // prevent event from bubbling up to parent
          >
            <CloseIcon
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
              }}
              onClick={() => setShowImage(false)}
            />
            <img
              src={URL.createObjectURL(logoFile)}
              alt="Uploaded Logo"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default VendorRegister;
