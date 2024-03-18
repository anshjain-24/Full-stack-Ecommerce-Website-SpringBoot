import { Gif } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNavigate } from 'react-router-dom';
import t1 from "../../../../src/data/Images/t1.jpg";


const OrderCard = () => {
    const navigate = useNavigate();
    return (
        <div onClick={()=>navigate(`/account/order/${2}`)} className='p-5 shadow-lg hover:shadow-xl mr-2'>
            <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>

                <Grid item xs={6}>

                    <div className='flex cursor-pointer'>
                        <img className='w-[5rem] h-[5rem] object-cover object-top' src={t1}
                            alt='' />
                        <div className='ml-5 space-y-2'>
                            <p className=''>Men Printed T shirt</p>
                            <p className='opacity-50 text-xs font-semibold'>SIze: M</p>
                            <p className='opacity-50 text-xs font-semibold'>Color: White</p>
                        </div>
                    </div>

                </Grid>

                <Grid item xs={2}>
                    <p>  ₹1240  </p>
                </Grid>

                <Grid item xs={4}>
                    {true && <div>
                        <p>
                            <DoneAllIcon sx={{ width: "20px", height: "20px" }} className='text-green-600 mr-2 text-sm' />
                            <span> Dilevered on 3rd March </span>
                        </p>
                        <p className='text-xs'>  your item has been dilevered successfully  </p>
                    </div>}
                    {false && <p>
                        <span> Expected Dilevery on 3rd March</span>
                    </p>}
                </Grid>

            </Grid>
        </div>
    )
}

export default OrderCard