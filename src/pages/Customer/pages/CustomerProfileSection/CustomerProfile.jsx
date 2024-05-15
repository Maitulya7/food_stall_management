import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import axios from 'axios'
import DEFAULT_URL from '../../../../config'

const CustomerProfile = () => {

  const [cusotmerOders , setCustomerOrders] = useState([])
  console.log(cusotmerOders) 

  useEffect(()=>{
    axios.get(`${DEFAULT_URL}/api/v1/customer/orders`, {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
        "ngrok-skip-browser-warning": true,
      }
    }).then((res)=>{
      setCustomerOrders(res.data.orders)
    })
  },[])

  return (
    <div>
        <Footer/>
    </div>
  )
}

export default CustomerProfile