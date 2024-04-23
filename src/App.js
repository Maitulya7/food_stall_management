import React from 'react';
import {  Route, Routes } from 'react-router-dom';

// Components for different user types
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminHome from './pages/Admin/AdminHome';
import { ToastContainer } from 'react-toastify';
import VendorRegister from './pages/Vendor/Auth/VendorRegister';
import VendorLogin from './pages/Vendor/Auth/VendorLogin';
import VendorHome from './pages/Vendor/pages/VendorHome';
import VendorProfile from './pages/Vendor/pages/VendorProfile';
import CustomerLandingPage from './pages/Customer/pages/CustomerLandingPage';
import VendorAnalysis from './pages/Vendor/components/VendorAnalysis';
import AdminProfile from './pages/Admin/AdminProfile';
import CustomerLoginPage from './pages/Customer/pages/Auth/CustomerLoginPage';
import CustomerDashboard from './pages/Customer/pages/Dashboard/CustomerDashboard';


function App() {
  return (
    <>
    <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />
        
        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route path='/admin/profile' element={<AdminProfile/>}/>
        {/* Vendor route */}
        <Route path='/vendor/register' element={<VendorRegister/>}/>
        <Route path='/vendor/login' element={<VendorLogin/>}/>
        <Route path='/vendor/home' element={<VendorHome/>}/>
        <Route path='/vendor/profile' element={<VendorProfile/>}/>
        <Route path='/vendor/analysis' element={<VendorAnalysis/>}/>
        {/* Customer route */}
        <Route path="/" element={<CustomerLandingPage/>}/>
        <Route path="/customer/login" element={<CustomerLoginPage/>}/>
        <Route path="/customer/home" element={<CustomerDashboard/>}/>

    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
