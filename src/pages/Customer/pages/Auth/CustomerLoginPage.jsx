import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Box,
  IconButton,
  InputAdornment,
  Link,
} from "@mui/material";
import {
  AccountCircle,
  Lock,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import DEFAULT_URL from "../../../../config";
import axios from "axios";
import Lottie from "react-lottie"; // Importing Lottie
import animationData from "../../../../images/admin-register-animation.json";
import { toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";

const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values) => {
    try {
      axios
        .post(`${DEFAULT_URL}/api/v1/customer/login`, {
          customer: {
            email: values.email,
            password: values.password,
          },
          client_id: "OT-Fkr2xgMFDGwjPO_cga2BiDwVZX5RDPwGtjTG1Vs8",
        })
        .then((res) => {
          localStorage.setItem("access-token", res.data.customer.access_token);
            localStorage.setItem("user-type", "customer");
          navigate("/customer/home");
          toast.success("Login successful!"); // Display success toast
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error("Error logging in:", error);
      if (error.response && error.response.status === 409) {
        setEmailExistsError(true);
      } else {
        setError("Failed to log in. Please check your credentials.");
      }
    }
  };

  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Customer Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <Field
                  as={TextField}
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  required
                  error={emailExistsError}
                  helperText={emailExistsError ? "Email already exists" : ""}
                  InputProps={{
                    startAdornment: <AccountCircle />,
                  }}
                  sx={{ mb: 2 }}
                />
                <Field
                  as={TextField}
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <Lock />,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#222831",
                    "&:hover": {
                      backgroundColor: "#31363F", // Keep the background color same on hover
                    },
                  }}
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "login..." : "Login"}
                </Button>
              </Form>
            )}
          </Formik>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                mt: { xs: 2, md: 4 },
                fontSize: { xs: "10px", sm: "15px", md: "20px", lg: "20px" },
              }}
            >
              <Link href="/forgot-password" color="inherit">
                Forgot Password?
              </Link>
            </Typography>
            <Typography
              sx={{
                mt: { xs: 2, md: 4 },
                fontSize: { xs: "10px", sm: "15px", md: "20px", lg: "20px" },
              }}
            >
              Don't have an account?{" "}
              <Link href="/customer/register" color="inherit">
                Register
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        sx={{
          display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
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
            height={400}
            width={400}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default CustomerLoginPage;
