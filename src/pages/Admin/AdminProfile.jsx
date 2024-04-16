import React from 'react'
import AdminSidebar from './components/AdminSidebar'
import AdminTopbar from './components/AdminTopbar'

const AdminProfile = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
    <AdminSidebar style={{ height: '100vh' }} />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
    <AdminTopbar pageTitle="Admin Profile" />
      
    </div>
  </div>
  )
}

export default AdminProfile