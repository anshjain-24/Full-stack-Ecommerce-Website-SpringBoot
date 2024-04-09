import React, { Fragment, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { cancelOrder, deleteOrder, deliverOrder, getAllOrders, shipOrder } from '../../State/Admin/Order/Action';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarGroup, Button, Card, CardHeader } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'; // Import Radio and RadioGroup
import { filters, singleFilter, sortOptions } from './FilterOptions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Orders = () => {
  const dispatch = useDispatch();
  const { adminOrder } = useSelector(store => store);

  const [anchorEl, setAnchorEl] = React.useState([]);
  const open = Boolean(anchorEl);



  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };


  const handleShippedOrder = (orderId, index) => {
    dispatch(shipOrder(orderId))
    console.log("shipped order orderID : ", orderId)
    handleClose(index)
    toast.success("order status updated")
  }

  const handleDeliveredOrder = (orderId, index) => {
    dispatch(deliverOrder(orderId))
    console.log("Delivered order orderID : ", orderId)
    handleClose(index)
    toast.success("order status updated")
  }

  const handleCancelledOrder = (orderId, index) => {
    dispatch(cancelOrder(orderId))
    console.log("Cancel order orderID : ", orderId)
    handleClose(index)
    toast.error("order cancelled")
  }

  const handleDeletedOrder = (orderId) => {
    dispatch(deleteOrder(orderId))
    handleClose()
    toast.error("order deleted")
  }

  useEffect(() => {
    dispatch(getAllOrders())
  }, [adminOrder.shipped, adminOrder.delivered, adminOrder.canceled, adminOrder.deletedOrder])

  console.log(adminOrder);
  return (
    <div className='flex w-full h-full overflow-hidden'>
      {/* Filter options */}
      <div className='p-4 w-1/5 flex flex-col' style={{ backgroundColor: '#34393B', minHeight: '100vh', overflow: 'hidden', flex: 'none' }}>
        {/* Filter options */}
        <div className='m-2 p-1 flex items-center justify-between fixed'>
          {/* <div className='p-2 pr-6' style={{ backgroundColor: 'lightgray' }} >
            
          </div> */}
          {/* FilterAltOffIcon button */}
          <div className="ml-6">
            <button type="button">
              <span className="sr-only">View grid</span>
              {/* <FilterAltOffIcon style={{ color: 'black', fontSize: '30px' }} /> */}
            </button>
          </div>
        </div>
        {/* Sorting options */}
        <div style={{
          fontSize: '36px', // Bigger font size
          fontWeight: 'bold', // Bold font weight
          backgroundImage: 'linear-gradient(to right, #777, #777)', // Gray to black gradient color
          WebkitBackgroundClip: 'text', // Clip text to background
          color: 'transparent', // Make text transparent
          margin: '20px', // Add margin for spacing
        }}>
        {/* <RadioGroup  >
            here will be the filter options
          </RadioGroup> */}
        <div>
          Elite Buy Order List
        </div>

      </div>
      {/* Add more filter options as needed */}
    </div>
      {/* Table container */ }
  <div className='flex-grow h-full overflow-y-auto h-full' style={{ backgroundColor: 'white' }}>
    <Card className='p-1 m-1' style={{ backgroundColor: 'black', color: 'white' }}>
      <div className='flex justify-center' >
        <CardHeader title="All Orders" />
      </div>
      <TableContainer sx={{ bgcolor: '#242B2E', color: '#000000' }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ color: 'white' }}>Order Id</TableCell>
              <TableCell align='left' sx={{ color: 'white' }}>Images</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Title</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Price</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>total Items</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>User Id</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Status</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Update Status</TableCell>
              <TableCell align="center" sx={{ color: 'white' }}>Delete</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>

            {adminOrder?.orders?.map((row, index) => (

              <TableRow
              // key={row?.title}
              // sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'white' }}
              >

                <TableCell align="center" sx={{ color: 'white' }}>{row?.id}</TableCell>

                <TableCell align='left' className=''>
                  <AvatarGroup align='left' max={2} sx={{ justifyContent: 'start' }}>
                    {row.orderItems.map((orderItem) => <Avatar
                      // src='https://drive.google.com/thumbnail?id=1VWK1_pJtFimFxvmJQiwTmH_gFHZBp9e1'
                      src={orderItem.product?.imageUrl}
                      style={{ backgroundColor: 'white' }}
                    >
                    </Avatar>)}
                  </AvatarGroup>
                </TableCell>

                <TableCell align='center' className='' style={{ color: 'white' }}>
                  {row.orderItems.map((orderItem) => <p> {orderItem.product.title}</p>)}
                </TableCell>
                {/* <TableCell align="center" sx={{ color: 'white' }}>{row?.product?.title}</TableCell> */}

                <TableCell align="center" sx={{ color: 'white' }}>₹{row?.totalDiscountedPrice}</TableCell>


                <TableCell align="center" sx={{ color: 'white' }}>{row?.totalItem}</TableCell>

                <TableCell align="center" sx={{ color: 'white' }}>{row?.user?.id}</TableCell>

                <TableCell align="center" sx={{ color: 'white' }}><span
                  className={` text-white px-3 py-2 rounded-full ${row.orderStatus === "PENDING" ? "bg-[red]" :
                    row.orderStatus === 'PLACED' ? "bg-[blue]" :
                      row.orderStatus === 'SHIPPED' ? "bg-[gray]" :
                        row.orderStatus === 'DELIVERED' ? "bg-[green]" :
                          "bg-[red]"}`}>
                  {row?.orderStatus}
                </span></TableCell>

                <TableCell align="center" sx={{ color: 'white' }}>
                  <div className={`rounded-full bg-[gray]`} >
                    <Button
                      id="basic-button"
                      aria-haspopup="true"
                      onClick={(event) => handleClick(event, index)}
                      aria-controls={`basic-menu-${row.id}`}
                      aria-expanded={Boolean(anchorEl[index])}
                      sx={{ color: 'white' }}
                    >
                      Status
                    </Button>
                  </div>
                  <Menu
                    id={`basic-menu-${row.id}`}
                    anchorEl={anchorEl[index]}
                    open={Boolean(anchorEl[index])}
                    onClose={() => handleClose(index)}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={() => handleShippedOrder(row.id, index)}>Shipped</MenuItem>
                    <MenuItem onClick={() => handleDeliveredOrder(row.id, index)}>Delivered</MenuItem>
                    <MenuItem onClick={() => handleCancelledOrder(row.id, index)}>Cancelled</MenuItem>
                  </Menu>
                </TableCell>

                <TableCell align="center" className='text-white' sx={{ color: 'white' }}>
                  <div className={`rounded-full bg-[red]`} style={{ color: 'white' }}>
                    <Button onClick={() => handleDeletedOrder(row.id)}
                      sx={{ color: 'white' }}
                    >Delete</Button>
                  </div>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  </div>
    </div >
  )
}

export default Orders
