import { Button, Grid, Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderCard from './OrderCard'
import './../Cart/modal_style.css'
import { isAuthenticated } from "../../../utils/auth"
import { useNavigate } from 'react-router-dom'
import { api } from '../../../Config/ApiConfig'

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delevered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" }
]



const Order = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(!isAuthenticated());

    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        async function fetchUserOrders() {
            try {
                const response = await api.get(`api/orders/user`);
                console.log("Product data: ", response.data);
                setData(response.data); // Set the fetched data
            } catch (error) {
                console.error("Error fetching product data:", error);
                // Handle the error appropriately
            }
        }

        fetchUserOrders(); // Call the function to fetch products
    }, []);

    const handleClose = () => {
        setOpen(false);
        navigate(-1); // Navigate back to the previous page
    };

    return (

        <div>
            {isAuthenticated() ? (

                <div className='px:5 lg:px-20'>
                    <Grid container sx={{ justifyContent: "space-between" }}>

                        <Grid item xs={2.5}>

                            <div className='h-auto shadow-md bg-white p-t sticky top-5 ml-10'>

                                <h1 className='font-bold text-lg p-2 ml-2'>Filter</h1>
                                {data.map((order)=> (
                                    <div>
                                        {order.id}
                                        </div>
                                ))}
                                <div className='space-y-4 mt-6 p-2'>

                                    <h1 className='font-semibold '> Order Status </h1>

                                    {orderStatus.map((option) => <div className='flex items-center'>
                                        <input defaultValue={option.value} type='checkbox'
                                            className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500' />

                                        <label className="ml-3 text-sm text-gray-600" htmlFor={option.value}>
                                            {option.label}
                                        </label>
                                    </div>)}


                                </div>

                            </div>

                        </Grid>


                        <Grid item xs={9} >
                            <div className='space-y-5'>
                                {[1, 1, 1, 1, 1].map((item) => <OrderCard />)}
                            </div>


                        </Grid>

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

export default Order

