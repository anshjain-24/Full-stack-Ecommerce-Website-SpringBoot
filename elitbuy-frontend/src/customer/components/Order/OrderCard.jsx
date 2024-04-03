import { Gif } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../Config/ApiConfig';


const OrderCard = ({order}) => {
    const navigate = useNavigate();
    

        function formatDate(dateString) {
            // Create a new Date object from the date string
            const date = new Date(dateString);
           
            // Format the date to dd mm yyyy
            // Note: The options object can be adjusted based on your specific requirements
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return date.toLocaleDateString('en-GB', options); // 'en-GB' uses day/month/year format
           }
        
        const formattedOrderDate = order?.orderDate ? formatDate(order.orderDate) : 'N/A';
        const formattedDeliveryDate = order?.deliveryDate ? formatDate(order.orderDate) : 'N/A';

    return (

        <div onClick={()=>navigate(`/account/order/${order?.id}`)} className='p-5 shadow-lg hover:shadow-xl mr-2'>
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>

                <Grid item xs={4}>

                    <div className='flex cursor-pointer'>
                        <img className='w-[5rem] h-[5rem] object-cover object-top' src="https://www.googleapis.com/drive/v3/files/1VWK1_pJtFimFxvmJQiwTmH_gFHZBp9e1?alt=media&key=AIzaSyAQUgAIF4uu06bSf6ZaXtZH4EWkENlkxr4"
                            alt='' />
                        <div className='ml-5 space-y-2'>
                            <p className=''>order Id : {order.id}</p>
                            <p className='opacity-50 text-xs font-semibold'>Customer Name: {order?.shippingAddress?.fname}</p>
                            <p className='opacity-50 text-xs font-semibold'>Date: {formattedOrderDate}</p>
                        </div>
                    </div>  

                </Grid>

                <Grid item xs={2}>
                    <p> paid price: ₹{order?.totalDiscountedPrice}  </p>
                    
                </Grid>

                <Grid item xs={4}>
                    {order?.orderStatus === 'Delivered' && <div>
                        <p>
                            <DoneAllIcon sx={{ width: "20px", height: "20px" }} className='text-green-600 mr-2 text-sm' />
                            <span> Dilevered on 3rd March </span>
                        </p>
                        <p className='text-xs'>  your item has been dilevered successfully  </p>
                    </div>}
                    {order?.orderStatus !== 'Delivered' && <p>
                        <span> Expected Dilevery on </span>
                        <p className='text-xs'>  your item will be delivered soon </p>
                    </p>}
                </Grid>

            </Grid>
        </div>
    )
}

export default OrderCard