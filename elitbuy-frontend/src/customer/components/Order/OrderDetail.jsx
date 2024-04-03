import React, { useEffect, useState } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import OrderTracker from './OrderTracker'
import { Box, Button, Grid, Modal } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import t1 from "../../../../src/data/Images/t1.jpg";
import './../Cart/modal_style.css'
import { isAuthenticated } from "../../../utils/auth"
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../../State/Order/Action'


const OrderDetail = () => {

  const navigate = useNavigate();
  const [open, setOpen] = useState(!isAuthenticated());
  const params = useParams()
  const dispatch = useDispatch();
  const { order } = useSelector(store => store);

  const handleClose = () => {
    setOpen(false);
    navigate(-1); // Navigate back to the previous page
  };

  const { orderId } = useParams(); // Extract orderId from the URL

  useEffect(() => {
     window.scrollTo(0, 0);
     const data = { orderId }; // Use the extracted orderId
     console.log("data in orderDetails : ", data);
     // Assuming dispatch and getOrderById are defined elsewhere
     dispatch(getOrderById(orderId));
  }, [orderId]); // Depend on orderId to re-run the effect if it changes
  return (

    <div>
      {isAuthenticated() ? (

        <div className='px-5 lg:px-20'>
          <div>
            {/* {order.order?.id} */}
            <h1 className='font-bold text-xl py-7 '> Delivery </h1>
            <AddressCard addresses={order.order?.shippingAddress}/>
          </div>

          <div className='py-20'>
          {order.order?.orderStatus === 'PLACED' &&( <OrderTracker activeStep={1} /> )}
          {order.order?.orderStatus === 'SHIPPED' &&( <OrderTracker activeStep={2} /> )}
          {order.order?.orderStatus === 'OUT FOR DELIVERY' &&( <OrderTracker activeStep={3} /> )}
          {order.order?.orderStatus === 'DELIVERED' &&( <OrderTracker activeStep={4} /> )}
          </div>

          <Grid container className='space-y-5'>
            {order.order?.orderItems?.map((item) =>

              <Grid item container className='shadow -xl rounded-md p-5 border' sx={{ alignItems: "center", justifyContent: "space-between" }}>

                <Grid item xs={6}>

                  <div className='flex items-center space-x-4'>
                    <img className='w-[10rem] h-[10rem] object-cover object-top'
                      src={item.product?.imageUrl}
                      alt='' />

                    <div className='space-y-2 ml-5'>
                      <p className='font-semibold'>  {item.product?.title} </p>
                      <p className='space-x-5 opacity-50 text-xs font-semibold '>  <span> Color: {item.product?.color} </span> <span> Size: {item.size} </span></p>
                      <p> Seller: {item.product?.brand}</p>
                      <p> ₹{item.discountedPrice} </p>
                    </div>

                  </div>

                </Grid>

                <Grid item >

                  {order.order?.orderStatus === 'DELIVERED' &&( <Box sx={{ color: deepPurple[500] }}>

                    <StarOutlineIcon sx={{ fontSize: "2.5rem" }} className='px-2 text-5xl' />
                    <span className='text-md'>Rate & Review Product</span>
                  </Box> )}

                </Grid>

              </Grid>
            )}



          </Grid>

        </div>

      ) : (
        <Modal open={open} onClose={handleClose}>
          <div className="modal-container">
            <h2 className="modal-header">You need to log in to order products.</h2>
            <Button className="modal-button" onClick={handleClose}>OK</Button>
          </div>
        </Modal>
      )}


    </div>


  )
}

export default OrderDetail



