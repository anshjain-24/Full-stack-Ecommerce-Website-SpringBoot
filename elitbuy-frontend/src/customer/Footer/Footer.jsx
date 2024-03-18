import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

function Footer() {
    return (
        <div>

            <Grid className='bg-black text-white text-center mt-10'
                container
                sx={{ bgcolor: 'black', color: 'white', py: 3 }}
            >


                    <Grid item xs={12} sm={6} md={3} >

                    <Typography className='pb-5' variant='h6'> {" "} company{" "}</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} About{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Blog{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} job{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} partners{" "}</Button>
                    </div>
                    </Grid>

                <Grid item xs={12} sm={6} md={3} >

                    <Typography className='pb-5' variant='h6'> {" "} solution{" "}</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Marketing{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Analytics{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} commerce{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} insight{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} support{" "}</Button>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} >

                    <Typography className='pb-5' variant='h6'> {" "} Documents{" "}</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} GUide{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} API Status{" "}</Button>
                    </div>
                </Grid>

                <Grid item xs={12} sm={6} md={3} >

                    <Typography className='pb-5' variant='h6'> {" "} Legel{" "}</Typography>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Claim{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Privacy{" "}</Button>
                    </div>
                    <div>
                        <Button className='pb-5' variant='h6' gutterBottom> {" "} Terms{" "}</Button>
                    </div>
                </Grid>
        
                <Grid className='pt-20' item xs={12}>
                <Typography variant='body2' component="p" align='center'>
                    &copy;EliteBuy, All right Reserved
                </Typography>
                    
                </Grid>

            </Grid>


        </div>
    )
}

export default Footer