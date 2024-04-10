import { Avatar, Box, Grid, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';
import UserWiseReview from './UserWiseReview';

const ProductReviewCard = ({ productId }) => {

    console.log("product ID got in review card : ", productId);

    const [reviewData, setReviewData] = useState([]);

    const fetchReviewData = async () => {
        try {
            const response = await api.get(`/api/reviews/product/${productId}`);
            setReviewData(response.data);
            console.log("Review data updated: ", reviewData);
        } catch (error) {
            console.log("error occured while fetching the data , : ", error);
        }
    };

    useEffect(() => {
        // Check if productId is NaN
        if (isNaN(productId)) {
            console.error("Invalid productId:", productId);
            return; // Skip fetching if productId is NaN
        }

        console.log("Fetching reviews for productId:", productId);
        fetchReviewData();
    }, [productId]); // Include productId in the dependency array

    return (
        <div>
            {reviewData.map((review, index) => (
                <Grid container spacing={2} gap={3} key={index}>
                    <Grid item xs={1}>
                        <Box>
                            <Avatar className='text-white' sx={{ width: 45, height: 45, bgcolor: "#9155fd" }}></Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                        <div className='space-y-1'>
                            <div>
                                <p className='font-semibold text-lg'>{review?.user?.fname}</p> {/* Assuming reviewData includes userFirstName */}
                                <p className='opacity-70'>{review?.createdAt}</p>
                            </div>
                        </div>
                        <UserWiseReview userId={review?.user?.id} productId={productId} />
                        <p>{review?.review}</p> {/* Assuming reviewData includes a review property */}
                    </Grid>
                </Grid>
            ))}
        </div>
    );
};

export default ProductReviewCard;
