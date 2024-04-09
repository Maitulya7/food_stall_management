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


function App() {
  return (
    <>
    <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />
        <Route path='/admin/home' element={<AdminHome/>}/>

        {/* Vendor route */}
        <Route path='/vendor/register' element={<VendorRegister/>}/>
        <Route path='/vendor/login' element={<VendorLogin/>}/>
        <Route path='/vendor/home' element={<VendorHome/>}/>
        <Route path='/vendor/profile' element={<VendorProfile/>}/>
        {/* Customer route */}

    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
