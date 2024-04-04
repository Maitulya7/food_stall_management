import React from 'react';
import {  Route, Routes } from 'react-router-dom';

// Components for different user types
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';


function App() {
  return (
    <>
    <Routes>
        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/register" element={<AdminRegister/>} />

        {/* Vendor route */}
        {/* Customer route */}

    </Routes>
    </>
  );
}

export default App;
