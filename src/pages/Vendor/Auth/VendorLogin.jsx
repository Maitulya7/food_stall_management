import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Formik, Form, Field } from 'formik';
import { Grid, Box, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import Lottie from 'react-lottie'; // Importing Lottie
import animationData from '../../../images/admin-register-animation.json';
import DEFAULT_URL from '../../../config';
import {toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; 

const VendorLogin = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState(false);

  const handleSubmit =  (values) => {
    try {
     axios.post(
        `${DEFAULT_URL}/api/v1/vendor/login`,
        {
          vendor: {
            email: values.email,
            password: values.password,
          },
          client_id: "IIpISXH-UMnUpwIXxq46QG_VY9HU7-yMdT5cAT2fS3I"
        }
      ).then((res)=>{
        navigate('/vendor/home')
        localStorage.setItem("access-token", res.data.vendor.access_token);
        toast.success('Login successful!'); // Display success toast
        console.log(res)
      }).catch((err)=>{
        console.log(err)
      });
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 409) {
        setEmailExistsError(true);
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    }
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
    {/* Left Side */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
      <Box sx={{ p: 4, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 600, width: '100%' }}>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>Vendor Login</Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: '100%' }}>
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                error={emailExistsError}
                InputProps={{
                  startAdornment: (
                    <AccountCircle />
                  ),
                }}
                sx={{ mb: 2 }}
              />
             <Field
                  as={TextField}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <Lock />
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 2 }}
                />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: "#222831",
                  '&:hover': {
                    backgroundColor: "#31363F",
                  }
                }}
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
          )}
        </Formik>
        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mt: 2 }}>
          <Typography variant="body2">
            <Link href="/forgot-password" color="inherit">Forgot Password?</Link>
          </Typography>
          <Typography variant="body2">
            Don't have an account? <Link href="/vendor/register" color="inherit">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Grid>
    {/* Right Side */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: animationData,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            height={600}
            width={600}
          />
        </Box>
      </Grid>
  </Grid>
  );
};

export default VendorLogin;
