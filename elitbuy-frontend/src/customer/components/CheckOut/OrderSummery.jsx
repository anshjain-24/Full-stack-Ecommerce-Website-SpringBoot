import React, { useEffect } from 'react'
import AddressCard from '../AddressCard/AddressCard'
import CartItem from '../Cart/CartItem'
import { Button } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux' 
import { getOrderById } from '../../../State/Order/Action'
import { useLocation } from 'react-router-dom'
import { createPayment } from '../../../State/Payment/Action'


const OrderSummery = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const {order} = useSelector(store=>store);
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get("order_id")


    const totalPrice = order.order?.totalPrice ;
    const totalDiscountedPrice = order.order?.totalDiscountedPrice;


    useEffect(()=>{
        dispatch(getOrderById(orderId))
    },[orderId]) 


    const handleCheckout = () => {
        dispatch(createPayment(orderId))
    }


    // Calculate the discount percentage
    const discountPercentage = totalPrice && totalDiscountedPrice
        ? ((totalPrice - totalDiscountedPrice) / totalPrice * 100).toFixed(2)
        : 0;

    return (
        <div>
            <div className='p-5 shadow-lg rounded-s-md border'>
                <AddressCard address={order.order?.shippingAddress} />
            </div>
            
            <div>
            <div className='lg:grid grid-cols-3 relative'>

                <div className='col-span-2'>
                    {order.order?.orderItems.map((item)=><CartItem item={item}/>)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>

                    <div className='border'>
                        <p className='uppercase font-bold opacity-60 pb-0 mb-5 text-center mt-5'>Price Details</p>
                        <hr />
                        <div className='space-y-3 font-semibold ml-5 mr-5 '>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹{order.order?.totalPrice}</span>
                            </div>
                            <div className=' flex justify-between pt-3 '>
                                <span>Discount</span>
                                <span className='text-green-600'>{discountPercentage}% off</span>
                            </div>
                            <div className=' flex justify-between pt-3 '>
                                <span>Total Price after discount</span>
                                <span className='text-green-600'>₹{order.order?.totalDiscountedPrice - order.order?.deliveryCharge}</span>
                            </div>
                            <div className=' flex justify-between pt-3  '>
                                <span>Dilevery Charge</span>
                                <span className='text-green-600'>₹{order.order?.deliveryCharge}</span>
                            </div>
                            <div className=' flex justify-between pt-3 font-bold'>
                                <span>Total Amount</span>
                                <span className='text-green-600'>₹{order.order?.totalDiscountedPrice}</span>
                            </div>
                        </div>
                        <Button variant='contained' className='w-full mt-5' sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd", mt: "2rem" }}
                        onClick={handleCheckout}
                        >
                            Proceed to Checkout
                        </Button>
                    </div>

                </div>
            </div>
        </div>

        </div>
    )
}

export default OrderSummery