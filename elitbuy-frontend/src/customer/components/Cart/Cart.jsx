import { Button, IconButton, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../../State/Cart/Action';
import { isAuthenticated } from "../../../utils/auth"
import './modal_style.css'

const Cart = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart } = useSelector(store => store)

    const [open, setOpen] = useState(!isAuthenticated());

    const handleCheckOut = () => {
        navigate("/checkout?step=2")
    }

    const { totalPrice, totalDiscountedPrice } = cart.cart || {};

    // Calculate the discount percentage
    const discountPercentage = totalPrice && totalDiscountedPrice
        ? ((totalPrice - totalDiscountedPrice) / totalPrice * 100).toFixed(2)
        : 0;

    // Calculate the delivery charge
    // const deliveryCharge = totalDiscountedPrice > 1000
    //     ? 0 : totalPrice * 0.2;

    useEffect(() => {
        dispatch(getCart())
    }, [cart.updateCartItem,cart.deleteCartItem])

    const handleClose = () => {
        setOpen(false);
        navigate(-1); // Navigate back to the previous page
    };


    return (
        <div>
            {isAuthenticated() ? (
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
                                        <span>Total Price after discount </span>
                                        <span className='text-green-600'>₹{cart.cart?.totalDiscountedPrice - cart.cart?.deliveryCharge}</span>
                                    </div>

                                    <div className=' flex justify-between pt-3  '>
                                        <span>Delivery Charge</span>
                                        <span className='text-green-600'>₹{cart.cart?.deliveryCharge}</span>
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
            ) : (
                <Modal open={open} onClose={handleClose}>
                    <div className="modal-container">
                        <h2 className="modal-header">You need to log in to add this product to cart.</h2>
                        <Button className="modal-button" onClick={handleClose}>OK</Button>
                    </div>
                </Modal>
            )}
        </div >

    );
};

export default Cart