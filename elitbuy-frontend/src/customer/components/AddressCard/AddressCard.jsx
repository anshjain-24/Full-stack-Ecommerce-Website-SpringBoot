import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder, createReOrder } from '../../../State/Order/Action';

const AddressCard = ({ addresses }) => {


  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Check if addresses is undefined or null
  if (!addresses) {
    return <div>Addresses data is not available.</div>;
  }

  const handleSubmit = (event, address) => {
    event.preventDefault(); // Prevent default form submission
    console.log("here in handleSubmit");
    const orderData = { address, navigate };
    console.log("orderData address from stored: ", orderData);
    dispatch(createReOrder(orderData));
   };
   


  return (
    <div>
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div key={index} className='border rounded p-4 mb-4 shadow bg-white'>
            <p className='font-semibold'>{address?.fname} {address?.lname}</p>
            <p>
              {address?.streetAddress} <br />
              {address?.city}, {address?.state} - {address?.zipCode}
            </p>
            <div className='mt-2'>
              <p>{address?.mobile}</p>
            </div>
            <form onSubmit={(event) => handleSubmit(event, address)}>
              <Button sx={{ py: 1, mt: 1, bgcolor: "RGB(145 85 253)" }} type='submit' size='medium' variant='contained'
              >
                Delivery Here
              </Button>
            </form>
          </div>

        ))
      ) : addresses.length === 0 ? (
        <div>You do not have any stored address.</div>
      ) : (
        <div className='space-y-3'>
          <p className='font-semibold'>{addresses?.fname} {addresses?.lname}</p>
          <p>
            {addresses?.streetAddress} <br />
            {addresses?.city}, {addresses?.state} - {addresses?.zipCode}
          </p>
          <div className='space-y-1'>
            <p>{addresses?.mobile}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
