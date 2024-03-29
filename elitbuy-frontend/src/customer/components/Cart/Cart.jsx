import { Button, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store)

    const handleCheckOut = () => {
        navigate("/checkout?step=2")
    }

    const { totalPrice, totalDiscountedPrice } = cart.cart || {};

    // Calculate the discount percentage
    const discountPercentage = totalPrice && totalDiscountedPrice
        ? ((totalPrice - totalDiscountedPrice) / totalPrice * 100).toFixed(2)
        : 0;

    // Calculate the delivery charge
    const deliveryCharge = totalDiscountedPrice > 1000
        ? 0 : totalPrice * 0.2;

    useEffect(() => {
        dispatch(getCart())
    }, [])

    return (

        <div>
            <div className='lg:grid grid-cols-3 lg:px-16 relative'>

                <div className='col-span-2'>
                    {cart.cart?.cartItems.map((item) => <CartItem item={item} />)}
                </div>
                <div className='px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0'>

                    <div className='border'>
                        <p className='uppercase font-bold opacity-60 pb-0 mb-5 text-center mt-5'>Price Details</p>
                        <hr />
                        <div className='space-y-3 font-semibold ml-5 mr-5 '>
                            <div className=' flex justify-between pt-3 text-black'>
                                <span>Price</span>
                                <span>₹{cart.cart?.totalPrice}</span>
                            </div>
                            <div className=' flex justify-between pt-3 '>
                                <span>Discount</span>
                                <span className='text-green-600'>{discountPercentage}% off</span>
                            </div>
                            <div className=' flex justify-between pt-3  '>
                                <span>Delivery Charge</span>
                                <span className='text-green-600'>₹{deliveryCharge}</span>
                            </div>
                            <div className=' flex justify-between pt-3 font-bold'>
                                <span>Total Amount</span>
                                <span className='text-green-600'>₹{cart.cart?.totalDiscountedPrice}</span>
                            </div>
                        </div>
                        <Button onClick={handleCheckOut} variant='contained' className='w-full mt-5' sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd", mt: "2rem" }}>
                            Proceed to Checkout
                        </Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart