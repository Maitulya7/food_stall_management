import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { CartProvider } from './pages/Customer/pages/context/CartContext'; // Import CartProvider here

// Components for different user types
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminHome from './pages/Admin/AdminHome';
import VendorRegister from './pages/Vendor/Auth/VendorRegister';
import VendorLogin from './pages/Vendor/Auth/VendorLogin';
import VendorHome from './pages/Vendor/pages/VendorHome';
import VendorProfile from './pages/Vendor/pages/VendorProfile';
import VendorAnalysis from './pages/Vendor/components/VendorAnalysis';
import AdminProfile from './pages/Admin/AdminProfile';
import CustomerLandingPage from './pages/Customer/LandingPage/CustomerLandingPage';
import CustomerLoginPage from './pages/Customer/pages/Auth/CustomerLoginPage';
import CustomerDashboard from './pages/Customer/pages/CustomerDashboard';
import SelectedCategoryPage from './pages/Customer/pages/CustomerHomeSection/SelectedCategoryPage';
import Footer from './pages/Customer/LandingPage/components/Footer';
import FoodItemPage from './pages/Customer/pages/CustomerHomeSection/FoodItemPage';
import CustomerStall from './pages/Customer/pages/CustomerStallSection/CustomerStall';
import CustomerStallFoodItems from './pages/Customer/pages/CustomerStallSection/CustomerStallFoodItems';
import CustomerCart from './pages/Customer/pages/CustomerCartSection/CustomerCart';

function App() {
  return (
    <>
      <CartProvider>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/profile" element={<AdminProfile />} />

          {/* Vendor route */}
          <Route path="/vendor/register" element={<VendorRegister />} />
          <Route path="/vendor/login" element={<VendorLogin />} />
          <Route path="/vendor/home" element={<VendorHome />} />
          <Route path="/vendor/profile" element={<VendorProfile />} />
          <Route path="/vendor/analysis" element={<VendorAnalysis />} />

          {/* Customer routes wrapped with CartProvider */}

          <Route path="/" element={<CustomerLandingPage />} />
          <Route path="/customer/login" element={<CustomerLoginPage />} />
          <Route path="/customer/home" element={<CustomerDashboard />} />
          <Route path="/customer/:id" element={<SelectedCategoryPage />} />
          <Route path="/customer/:vendorId/foodItem/:categoryId" element={<FoodItemPage />} />
          <Route path="/customer/stall" element={<CustomerStall />} />
          <Route path="/customer/stall/:vendorId" element={<CustomerStallFoodItems />} />
          <Route path="/customer/cart" element={<CustomerCart />} />

        </Routes>
        <ToastContainer />
      </CartProvider>
    </>
  );
}

export default App;
