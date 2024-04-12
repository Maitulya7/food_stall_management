import { useEffect } from "react";
import VendorSidebar from "../components/VendorSidebar"
import VendorTopbar from "../components/VendorTopbar"
import { useNavigate } from "react-router-dom";

const VendorProfile = () => {

  const token = localStorage.getItem("access-token");
  const navigate = useNavigate()

  useEffect(()=>{
    if(token == null)
      navigate("/vendor/login")
    
  },[])


  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <VendorSidebar style={{ height: '100vh' }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <VendorTopbar pageTitle="Vendor Profile" />
        <div style={{ flexGrow: 1, padding: '20px', overflowX: 'auto' }}>

        </div>
      </div>
    </div>
  )
}

export default VendorProfile