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
import { api } from '../../Config/ApiConfig';

const Users = () => {

  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);



  const fetchUserData = async () => {
    try {
      const response = await api.get(`/api/user/all`);
      console.log("User data: ", response.data);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };



  useEffect(() => {
    fetchUserData();

    const interval = setInterval(fetchUserData, 1000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  console.log("user data in userData : : ", userData);


  const handleDeletedOrder = async (orderId) => {
    try {
      const response = await api.delete(`/api/user/delete/${orderId}`);
      console.log("status  of deletion: ", response.data);
    }
    catch (error) {
      console.error("Error while deleting data:", error);
    }
    toast.error("user deleted")
  }

  return (
    <div className='flex w-full h-full overflow-hidden fixed'>
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
            Elite Buy Users List
          </div>

        </div>
        {/* Add more filter options as needed */}
      </div>
      {/* Table container */}
      <div className='flex-grow h-full overflow-y-auto h-full' style={{ backgroundColor: 'white' }}>
        <Card className='p-1 m-1' style={{ backgroundColor: 'black', color: 'white' }}>
          <div className='flex justify-center' >
            <CardHeader title="All Users" />
          </div>
          <TableContainer sx={{ bgcolor: '#242B2E', color: '#000000' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ color: 'white' }}>User Id</TableCell>
                  <TableCell align='center' sx={{ color: 'white' }}>Avatar</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>First name</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Last Name</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Email ID</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Role</TableCell>
                  <TableCell align="center" sx={{ color: 'white' }}>Delete</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {userData?.map((item) => (

                  <TableRow
                  // key={row?.title}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 }, color: 'white' }}
                  >

                    <TableCell align="center" sx={{ color: 'white' }}>{item?.id}</TableCell>

                    <TableCell align='center' className=''>
                      <div className="ml-auto flex items-center">

                      </div>
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6 ">
                        <Avatar
                          className='text-white'
                          aria-haspopup="true"
                          sx={{
                            bgcolor: "#673ab7",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          {item?.fname[0].toUpperCase()}
                        </Avatar>
                      </div>
                    </TableCell>

                    <TableCell align='center' className='' style={{ color: 'white' }}>
                      <p> {item?.fname}</p>
                    </TableCell>
                    {/* <TableCell align="center" sx={{ color: 'white' }}>{row?.product?.title}</TableCell> */}

                    <TableCell align="center" sx={{ color: 'white' }}>{item?.lname}</TableCell>


                    <TableCell align="center" sx={{ color: 'white' }}>{item?.email}</TableCell>

                    <TableCell align="center" sx={{ color: 'white' }}>{item?.role}</TableCell>

                    <TableCell align="center" className='text-white' sx={{ color: 'white' }}>
                      <div className={`rounded-full bg-[red]`} style={{ color: 'white' }}>
                        <Button onClick={() => handleDeletedOrder(item?.id)}
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

export default Users;
