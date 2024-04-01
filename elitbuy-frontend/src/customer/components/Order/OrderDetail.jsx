import React, { useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid, Modal } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import t1 from "../../../../src/data/Images/t1.jpg";
import './../Cart/modal_style.css'
import { isAuthenticated } from "../../../utils/auth"
import { useNavigate } from 'react-router-dom'


const OrderDetail = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(!isAuthenticated());

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // Navigate back to the previous page
  };

  return (

    <div>
      {isAuthenticated() ? (

        <div className='px-5 lg:px-20'>
          <div>
            <h1 className='font-bold text-xl py-7 '> Delivery </h1>
            <AddressCard />
          </div>

          <div className='py-20'>
            <OrderTracker activeStep={3} />
          </div>

          <Grid container className='space-y-5'>
            {[1, 1, 1, 1].map((item) =>

              <Grid item container className='shadow -xl rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: "space-between" }}>

                <Grid item xs={6}>

                  <div className='flex items-center space-x-4'>
                    <img className='w-[10rem] h-[10rem] object-cover object-top'
                      src={t1}
                      alt='' />

                    <div className='space-y-2 ml-5'>
                      <p className='font-semibold'>  Men Printed T shirt </p>
                      <p className='space-x-5 opacity-50 text-xs font-semibold '>  <span> Color: white </span> <span> Size: M </span></p>
                      <p> Seller: Aero Armours</p>
                      <p> ₹1240 </p>
                    </div>

                  </div>

                </Grid>

                <Grid item >

                  <Box sx={{ color: deepPurple[500] }}>

                    <StarOutlineIcon sx={{ fontSize: "2.5rem" }} className='px-2 text-5xl' />
                    <span className='text-md'>Rate & Review Product</span>
                  </Box>

                </Grid>

              </Grid>
            )}



          </Grid>

        </div>

      ) : (
        <Modal open={open} onClose={handleClose}>
          <div className="modal-container">
            <h2 className="modal-header">You need to log in to add this product to cart.</h2>
            <Button className="modal-button" onClick={handleClose}>OK</Button>
          </div>
        </Modal>
      )}


    </div>


  )
}

export default OrderDetail



