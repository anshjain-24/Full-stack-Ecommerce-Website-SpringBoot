import { Button, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getUser, register } from '../../State/Auth/Action';
import { store } from '../../State/Store';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => {

  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { auth } = useSelector(store => store)
  const error = useSelector(state => state.auth.error);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt))
    }
  }, [jwt, auth.jwt])

  // useEffect(()=>{

  // },[])


  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userData = {
      fname: data.get("fname"),
      lname: data.get("lname"),
      email: data.get("email"),
      password: data.get("password")
    }
    dispatch(register(userData))
    console.log("userData : ", userData)

  }
  // Update error message when error changes
  React.useEffect(() => {
    console.log(error);
    if (error) {
      toast.error("User with this ID already", {
        position: "bottom-center" // Set the position to bottom-center
      })
      setErrorMessage(mapErrorMessage(error));
      const timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000); // Clear error message after 3 seconds

      // Cleanup function to clear the timeout when the component unmounts
      return () => clearTimeout(timeoutId);
    }

  }, [error]);

  // Function to map server errors to custom error messages
  const mapErrorMessage = (error) => {
    switch (error) {
      case 'Request failed with status code 401':
        return 'Invalid email or password. Please try again.';
      default:
        return 'An error occurred. Please try again later.';
    }
  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='fname'
              name='fname'
              label="FirstName"
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='lname'
              name='lname'
              label="LastName"
              fullWidth
              autoComplete='given-name'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='email'
              name='email'
              label="Email Id"
              fullWidth
              autoComplete='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='password'
              name='password'
              label="Password"
              fullWidth
              autoComplete='password'
              type='password'
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              className='bg-[#9155FD] w-full '
              type='submit'
              variant='contained'
              size='large'
              sx={{ padding: ".8rem 0", bgcolor: "#9155FD" }}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
      <div className='flex jutify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          already registered ?
          <Button onClick={() => Navigate("/Login")} className='ml-5' size='small'>Log in </Button>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm