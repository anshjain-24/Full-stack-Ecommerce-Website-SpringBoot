import { Button } from '@mui/material'
import React from 'react'

const AddressCard = ({ address }) => {
  return (
    <div>
      {address?.fname ? (
        <div className='space-y-3'>
          <p className=' font-semibold '>{address?.fname} {address?.lname}</p>
          <p>{address?.streetAddress} <br></br>{address?.city}, {address?.state} - {address?.zipCode}</p>
          <div className='space-y-1'>
            {/* <p className=' font-semibold '> phone number </p> */}
            <p>  {address?.mobile} </p>
          </div>
          <Button sx={{ mt: 2, bgcolor: "RGB(145 85 253)" }} size='large' variant='contained'>
            Dilevery Here
          </Button>
        </div>

      ) : (
        <div>
          you do not have any stored address. 
        </div>
      )}

    </div>
  )
}

export default AddressCard