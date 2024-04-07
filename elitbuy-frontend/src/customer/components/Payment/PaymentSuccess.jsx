import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { getOrderById } from '../../../State/Order/Action';
import { updatePayment } from '../../../State/Payment/Action';
import { Alert, AlertTitle, Button, Grid, Modal } from '@mui/material';
import OrderTracker from '../Order/OrderTracker';
import { isAuthenticated } from '../../../utils/auth';
import '../Payment/paymentSuccessStyle.css'
import { getUser } from '../../../State/Auth/Action';

const PaymentSuccess = () => {
    const [paymentId, setPaymentId] = useState();
    const [referenceId, setReferenceId] = useState();
    const [paymentStatus, setPaymentStatus] = useState();
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { auth } = useSelector(store => store)
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        if (jwt) {
            dispatch(getUser(jwt))
        }
    }, [jwt, auth.jwt])


    const [open, setOpen] = useState(!isAuthenticated());

    console.log("orderId in payment success page  : ", orderId)

    const dispatch = useDispatch();
    const { order } = useSelector(store => store);

    console.log("order after payment success : ", order.order)

    useEffect(() => {
        const urlParam = new URLSearchParams(window.location.search);

        setPaymentId(urlParam.get("razorpay_payment_id"))
        setPaymentStatus(urlParam.get("razorpay_payment_link_status"))
    }, [])

    useEffect(() => {
        const data = { orderId, paymentId }
        dispatch(getOrderById(orderId))
        dispatch(updatePayment(data))
    }, [orderId, paymentId])

    useEffect(() => {
        dispatch(getOrderById(orderId))

    }, [orderId])

    useEffect(() => {
        const fetchOrder = () => {
            dispatch(getOrderById(orderId));
        };

        // Fetch order immediately on component mount
        fetchOrder();

        // Set up polling to fetch order every 5 seconds
        const intervalId = setInterval(fetchOrder, 50);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [dispatch, orderId]);

    const handleClose = () => {
        setOpen(false);
        navigate(-1); // Navigate back to the previous page
    };


    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        // Show the alert after a delay
        const showTimer = setTimeout(() => {
            setShowAlert(true);
        }, 500); // Adjust the delay as needed

        // Hide the alert after 5 seconds
        const hideTimer = setTimeout(() => {
            setShowAlert(false);
        }, 6000); //  seconds

        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, [dispatch, orderId]);




    console.log("order in here :  ", order)


    return (
        <div>
            {isAuthenticated() ? (
                <div className='px-2 lg:px-36'>
                    <div>
                        {order.order?.user?.id === auth.user?.id ? (
                            <div>
                                {order.order?.orderStatus !== 'PENDING' ? (
                                    <div>
                                        <div>

                                            <div className='flex flex-col justify-center items-center'>
                                                {showAlert && (
                                                    <Alert
                                                        variant='filled'
                                                        severity='success'
                                                        sx={{
                                                            mb: 6,
                                                            width: 'fit-content',
                                                            animation: 'fadeInOut 5s forwards',
                                                        }}
                                                    >
                                                        <AlertTitle>Payment Success</AlertTitle>
                                                        Congratulation, Your order is placed.. Thanks for choosing EliteBuy..
                                                    </Alert>
                                                )}
                                            </div>
                                            <OrderTracker activeStep={1} />


                                            <Grid container className='space-y-5 py-5 pt-20' >

                                                {order.order?.orderItems?.map((item) =>

                                                    <Grid container item className='shadow-xl rounded-md p-5'
                                                        sx={{ alignItems: "center", justifyContent: "space-between" }}>

                                                        <Grid item xs={6} >

                                                            <div className='flex items-center'>
                                                                <img className='w-[5rem] h-[5rem] object-cover object-top'
                                                                    src={item.product.imageUrl}
                                                                    alt='img' />

                                                                <div className='ml-5 space-y-2'>
                                                                    <p>{item.product.title}</p>
                                                                    <div className='opacity-50 text-xs font-semibold space-x-5'>
                                                                        <span>Color: {item.product.color}</span>
                                                                        <span>Size: {item.size}</span>
                                                                    </div>
                                                                    <p> Seller : {item.product.brand} </p>
                                                                    <p>₹ {item.discountedPrice} </p>
                                                                </div>
                                                            </div>

                                                        </Grid>
                                                        <Grid item>
                                                            <div className='space-y-3'>
                                                                <p className='font-semibold'>{order.order?.shippingAddress?.fname} {order.order?.shippingAddress?.lname}</p>
                                                                <p>
                                                                    {order.order?.shippingAddress?.streetAddress} <br />
                                                                    {order.order?.shippingAddress?.city}, {order.order?.shippingAddress?.state} - {order.order?.shippingAddress?.zipCode}
                                                                </p>
                                                                <div className='space-y-1'>
                                                                    <p>{order.order?.shippingAddress?.mobile}</p>
                                                                </div>
                                                            </div>
                                                        </Grid>

                                                    </Grid>
                                                )}

                                            </Grid>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '100vh',
                                            fontFamily: 'Cascadia Mono SemiBold',
                                            color: 'red',
                                            fontSize: '24px'
                                        }}>
                                            <div>your payment for this order is not done yet</div>
                                            <div>This is an unauthorized access</div>
                                        </div>
                                    </div>
                                )
                                }

                            </div>
                        ) : (
                            <div>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: '100vh',
                                    fontFamily: 'Cascadia Mono SemiBold',
                                    color: 'red',
                                    fontSize: '24px'
                                }}>
                                    <div>Access Denied, you are not entitled to access this page</div>
                                    <div>This is an unauthorized access</div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            ) : (
                <Modal open={open} onClose={handleClose}>
                    <div className="modal-container">
                        <h2 className="modal-header">You need to log in to access this page.</h2>
                        <Button className="modal-button" onClick={handleClose}>OK</Button>
                    </div>
                </Modal>
            )}
        </div >

    )
}

export default PaymentSuccess
