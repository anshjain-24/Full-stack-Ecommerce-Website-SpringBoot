import React from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {

  const Navigate = useNavigate();

  const dispatch = useDispatch();


  const handleSubmit= (event)=>{
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const userData = {
      email:data.get("email"),
      password:data.get("password")
    }
    dispatch(login(userData))
    console.log("userData : ", userData)
  
  }
  return (
    <div>
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
                  sx={{padding:".8rem 0", bgcolor:"#9155FD"}}>
                    Log In
                  </Button>
              </Grid>
            </Grid>
          </form>
          <div className='flex jutify-center flex-col items-center'>
            <div className='py-3 flex items-center'>
              Don't have account ? 
              <Button onClick={()=>Navigate("/Signup")} className='ml-5' size='small'>Sign Up</Button>
            </div>
          </div>
    </div>
  )
}

export default LoginForm