import { Button, IconButton } from '@mui/material'
import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import t1 from "../../../../src/data/Images/t1.jpg";

const CartItem = () => {
    return (
        <div className='p-5 shadow-lg border rounded-md mb-5'>

            <div className='flex items-center'>

                <div className='w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]'>

                    <img className='w-full h-full object-cover object-top'
                        src={t1}
                        alt='Image ?' />
                </div>

                <div className='ml-5 space-y-1'>
                    <p className='font-semibold'> Printed Tshirt  </p>
                    <p className='opacity-70'>  size: M, White</p>
                    <p className='opacity-70 mt-2'>Seller : Aero Armours </p>
                    <div className='flex space-x-5 items-center text-gray-900 pt-6 '>

                        <p className='font-semibold '> ₹1240 </p>
                        <p className='opacity-50 line-through'>  ₹3099  </p>
                        <p className='text-green-600 font-semibold'>  60% off </p>


                    </div>


                </div>


            </div>

            <div className='lg-flex items-center lg:space-x-10 pt-4'>
                <div className='flex items-center space-x-2'>

                    <IconButton>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                    <span className='py-1 px-7 border rounded-sm'> 3 </span>
                    
                        <IconButton sx={{color:"RGB(145 85 253)"}}>
                            <AddCircleIcon />
                        </IconButton>
                    
                
                <div>

                    <Button sx={{color:"Red"}}>
                        Remove
                    </Button>
                </div>

                </div>

            </div>

        </div>
    )

}

export default CartItem