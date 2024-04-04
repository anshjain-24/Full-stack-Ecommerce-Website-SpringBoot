import React, { useState } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {

  const Navigate = useNavigate();

  const dispatch = useDispatch();


  const [errorMessage, setErrorMessage] = useState('');
  // Selector to get error message from Redux store
  const error = useSelector(state => state.auth.error);


  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userData = {
      email: data.get("email"),
      password: data.get("password")
    }
    dispatch(login(userData))
    console.log("userData : ", userData)
  };

  // Update error message when error changes
  React.useEffect(() => {
    console.log(error);
    if (error) {
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
    <div >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
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
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>
      {errorMessage && (
        <Typography variant='body2' style={{ color: '#ff0000', marginTop: '0.5rem' }}>
          {errorMessage}
        </Typography>
      )}
      <div className='flex jutify-center flex-col items-center'>
        <div className='py-3 flex items-center'>
          Don't have account ?
          <Button onClick={() => Navigate("/Signup")} className='ml-5' size='small'>Sign Up</Button>
        </div>
      </div>
    </div>
    
  )
}

export default LoginForm