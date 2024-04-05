import React from 'react';
import {  Route, Routes } from 'react-router-dom';

// Components for different user types
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminHome from './pages/Admin/AdminHome';
import { ToastContainer } from 'react-toastify';
import VendorRegister from './pages/Vendor/Auth/VendorRegister';


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
        {/* Customer route */}

    </Routes>
    <ToastContainer />
    </>
  );
}

export default App;
