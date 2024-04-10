
import { Box, Grid, LinearProgress, Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';

const ProductRatingCard = ({ productId }) => {

    const ratingMapping = {
        5: 'Excellent',
        4: 'Good',
        3: 'Average',
        2: 'Poor',
        1: 'Very Bad',
    };

    const [ratingData, setRatingData] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [ratingPercentages, setRatingPercentages] = useState({});

    const fetchRatingData = async () => {
        try {
            const response = await api.get(`/api/rating/product/${productId}`);
            setRatingData(response.data);
        } catch (error) {
            console.log("error occurred while fetching the data:", error);
        }
    };

    useEffect(() => {
        if (isNaN(productId)) {
            console.error("Invalid productId:", productId);
            return;
        }

        fetchRatingData();
    }, [productId]);

    useEffect(() => {
        if (ratingData.length === 0) return;

        const sum = ratingData.reduce((acc, curr) => acc + curr.rating, 0);
        const avg = sum / ratingData.length;
        setAverageRating(avg);

        const counts = ratingData.reduce((acc, curr) => {
            const roundedRating = Math.round(curr.rating);
            acc[roundedRating] = (acc[roundedRating] || 0) + 1;
            return acc;
        }, {});

        const percentages = {};
        Object.keys(counts).forEach(rating => {
            percentages[rating] = (counts[rating] / ratingData.length) * 100;
        });
        setRatingPercentages(percentages);
    }, [ratingData]);

    return (
        <div>
            <h1 className='text-x1 font-semibold pb-2'> Product Rating </h1>

            <div className='flex items-center space-x-3'>
                <Rating value={averageRating} precision={0.5} readOnly />
                <p className='opacity-60'> {ratingData.length} Ratings</p>
            </div>

            <Box className="mt-5 space-y-2">
                {Object.entries(ratingMapping)
                    .reverse() // Reverse the array of entries
                    .map(([rating, label]) => (
                        <Grid key={rating} container justifyContent="center" alignItems="center" gap={2}>
                            <Grid item xs={2}>
                                <p>{label}</p>
                            </Grid>
                            <Grid item xs={7}>
                                <LinearProgress
                                    sx={{ bgcolor: "#dododo", borderRadius: 4, height: 7 }}
                                    variant='determinate'
                                    value={ratingPercentages[rating] || 0} // Handle case where rating doesn't exist
                                    color={
                                        rating === '5' || rating === 5 ? 'success' :
                                            rating === '4' || rating === 4 ? 'success' :
                                                rating === '3' || rating === 3 ? 'warning' :
                                                    rating === '2' || rating === 2 ? 'warning' :
                                                        'error'
                                    }
                                />
                            </Grid>
                        </Grid>
                    ))}
            </Box>

        </div>
    )
}

export default ProductRatingCard
