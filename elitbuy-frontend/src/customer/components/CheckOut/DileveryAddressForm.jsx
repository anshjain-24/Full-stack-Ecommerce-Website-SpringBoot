import { Box, Button, ButtonBase, Grid, TextField } from '@mui/material'
import React from 'react'
import AddressCard from '../AddressCard/AddressCard'
import { useDispatch } from 'react-redux';
import { createOrder } from '../../../State/Order/Action';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';

const DileveryAddressForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()



    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await api.get(`api/address/get`);
                console.log(" Address data: ", response.data);
                setData(response.data); // Set the fetched data
            } catch (error) {
                console.error("Error fetching Address data:", error);
                // Handle the error appropriately
            }
        } fetchAddresses(); // Call the function to fetch products
    }, []);
    useEffect(() => {
        // console.log("data length : ", data.length);
       }, [data]);
       


    const handleSubmit = (e) => {

        e.preventDefault();

        const data = new FormData(e.currentTarget);


        const address = {
            fname: data.get("firstName"),
            lname: data.get("lastName"),
            streetAddress: data.get("address"),
            city: data.get("city"),
            state: data.get("state"),
            zipCode: data.get("zip"),
            mobile: data.get("phoneNumber")

        }
        const orderData = { address, navigate }
        dispatch(createOrder(orderData))
        console.log("orderData address :  ", orderData);
    }

    return (
        <div>

            <Grid container spacing={4}>

                <Grid xs={12} lg={5} className='border rounded-e-md shadow-md h-[30.5rem] overflow-y-scroll'>

                    <div className='p-5 py-7 border-b cursor-pointer'>
                        < AddressCard addresses={data}/>
                    </div>

                </Grid>

                <Grid item xs={12} lg={7}>

                    <Box className="border rounded-s-md shadow-md p-5">

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='firstName'
                                        name='firstName'
                                        label='FirstName'
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='lastName'
                                        name='lastName'
                                        label='LastName'
                                        fullWidth
                                        autoComplete='given-name'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id='address'
                                        name='address'
                                        label='Address'
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                        rows={5}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='city'
                                        name='city'
                                        label='City'
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='state'
                                        name='state'
                                        label='State / Province / Region'
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='zip'
                                        name='zip'
                                        label='zip / Postal Code'
                                        fullWidth
                                        autoComplete='shipping postal-code'
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id='phoneNumber'
                                        name='phoneNumber'
                                        label='Phone Number'
                                        fullWidth
                                        autoComplete='given-name'
                                        multiline
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button sx={{ py: 1.5, mt: 2, bgcolor: "RGB(145 85 253)" }} type='submit' size='large' variant='contained'>
                                        Dilevery Here
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>

                    </Box>

                </Grid>

            </Grid>

        </div>
    )
}

export default DileveryAddressForm