import { Grid } from '@mui/material'
import React from 'react'
import OrderCard from './OrderCard'

const orderStatus = [
    { label: "On The Way", value: "on_the_way" },
    { label: "Delivered", value: "delevered" },
    { label: "Cancelled", value: "cancelled" },
    { label: "Returned", value: "returned" }
]


const Order = () => {

    return (
        <div className='px:5 lg:px-20'>
            <Grid container sx={{ justifyContent: "space-between" }}>

                <Grid item xs={2.5}>

                    <div className='h-auto shadow-md bg-white p-t sticky top-5 ml-10'>

                        <h1 className='font-bold text-lg p-2 ml-2'>Filter</h1>

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
    )
}

export default Order