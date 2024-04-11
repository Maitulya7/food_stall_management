import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { Grid, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import Lottie from 'react-lottie';
import animationData from '../../../images/admin-register-animation.json';
import DEFAULT_URL from '../../../config';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const VendorLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('vendor[email]', formValues.email);
      formData.append('vendor[password]', formValues.password);
      formData.append('client_id', "yNpIEDPaAAN_hAtS9zWYFKRJA9nlBhE7Xv1BORFSWQQ");

      axios.post(`${DEFAULT_URL}/api/v1/vendor/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        navigate("/vendor/home");
        toast.success('Login successful!');
        const categories = res.data.categories;
        const categoriesString = JSON.stringify(categories);
        localStorage.setItem("categories", categoriesString);
        localStorage.setItem("user-type" , "vendor")
        localStorage.setItem("access-token", res.data.access_token);
        localStorage.setItem("stall_name" , res.data.vendor.stall_name)
        localStorage.setItem("stall_logo", res.data.vendor.stall_logo_url)
        
      }).catch((err) => {
        if (err.response && err.response.status === 404) {
          setError('Invalid email or password.');
        } else {
          console.log(err);
        }
      });
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <Grid container sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <Box sx={{ p: 8, borderRadius: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 700, width: '100%' }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>Vendor Login</Typography>
          <form style={{width:"100%"}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  error={Boolean(error)}
                  helperText={error || ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formValues.password}
                  onChange={handleInputChange}
                  error={Boolean(error)}
                  helperText={error || ''}
                />
              </Grid>
            </Grid>
            <Button color="primary" variant="contained" fullWidth onClick={handleLogin} style={{ marginTop: '20px' }} disabled={!formValues.email || !formValues.password || Boolean(error)}>Login</Button>
          </form>
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
