import { Rating } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';

const UserWiseReview = ({ userId, productId }) => {
    const [rating, setRating] = useState();

    const fetchReviewByUserByProduct = async () => {
        try {
            console.log("Fetching review for productId:", productId, "and userId:", userId);
            const response = await api.get(`product/rating/product-user/${productId}/${userId}`);
            setRating(response.data);
        } catch (error) {
            console.log("Error occurred while fetching the data:", error);
        }
    }

    useEffect(() => {
        if (isNaN(productId)) {
            console.error("Invalid productId:", productId);
            return;
        }
        console.log("Fetching ratings for productId and userId:", productId, ":", userId);
        fetchReviewByUserByProduct();
    }, [productId, userId]);

    useEffect(() => {
        console.log("Rating data updated:", rating);
    }, [rating]); // Monitor changes in 'rating' state

    return (
        <Rating value={rating || 0} name="half-rating" readOnly precision={0.5} />
    )
}

export default UserWiseReview
