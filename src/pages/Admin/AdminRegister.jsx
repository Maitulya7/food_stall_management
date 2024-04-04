import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, IconButton, InputAdornment, Link } from '@mui/material';
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import DEFAULT_URL from '../../config';
import axios from 'axios';
import Lottie from 'react-lottie'; // Importing Lottie
import animationData from '../../images/admin-register-animation.json'; // Assuming your Lottie animation JSON file is in the same directory

const AdminRegister = () => {
  const [emailExistsError, setEmailExistsError] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        `${DEFAULT_URL}/api/v1/admin/sign_up`,
        {
          admin: {
            email: values.email,
            password: values.password,
          },
          client_id: "egp44hMIRaN2k3e6zLlo0svH2HXi944QxHIqLc50CYI"
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error logging in:', error);
      if (error.response && error.response.status === 409) {
        // HTTP 409 indicates conflict, in this case, email already exists
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
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>Admin Register</Typography>
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
                  helperText={emailExistsError ? 'Email already exists' : ''}
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
                      backgroundColor: "#31363F", // Keep the background color same on hover
                    }
                  }}
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registering...' : 'Register'}
                </Button>

              </Form>
            )}
          </Formik>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
          )}
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
            <Typography variant="body2" sx={{ mt: 4 }}>
              <Link href="/forgot-password" color="inherit">Forgot Password?</Link>
            </Typography>
            <Typography variant="body2" sx={{ mt: 4 }}>
              Already registered? <Link href="/admin/login" color="inherit">Login</Link>
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

export default AdminRegister;
