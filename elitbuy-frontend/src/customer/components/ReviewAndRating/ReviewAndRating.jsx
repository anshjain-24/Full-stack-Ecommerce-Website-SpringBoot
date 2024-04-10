import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findProductsById } from '../../../State/Product/Action';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { api } from '../../../Config/ApiConfig';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ReviewAndRating = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { products } = useSelector(store => store);
    const jwt = localStorage.getItem("jwt");

    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    const handleReviewSubmit = async () => {
        // Implement your submission logic here
        // For example, you might want to dispatch an action to save the review and rating
        console.log("Rating:", rating);
        console.log("Review:", review);
        // Navigate back or to another page after submission
        const data = {productId : products.product.id, rating:rating}
        const response = await api.post("/api/rating/create",data)
        const responseData  = response.data
        console.log("got this response for rating : ",responseData)

        const data1 = {productId : products.product.id, review:review}
        const response1 = await api.post("/api/reviews/create",data1)
        const responseData1  = response1.data

        console.log("got response this for review  : ",responseData1)
        toast.success("Product rating and reviews are submitted", {
            position: "bottom-center" // Set the position to bottom-center
          })
          navigate(-1)
        
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const data = { productId: params.productId };
        dispatch(findProductsById(data));
        console.log("Product data in review form: ", products.product);
    }, [params.productId, dispatch]);

    return (
        <div className="flex items-center" style={{ justifyContent: 'center' }}>
            <div style={{ margin: "15px" }}>
                {/* Image gallery */}
                <div className="overflow-hidden rounded-lg max-w-[15rem] max-h-[18rem]">
                    <img
                        src={products.product?.imageUrl}
                        alt=""
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                {/* Product info */}
                <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg:px-8 lg:px-24" style={{ marginTop: "4px", padding: "4px" }}>
                    <div className="lg:col-span-2">
                        <h1 className="text-lg lg:text-xl font-semibold text-gray-900 ">{products.product?.brand}</h1>
                        <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>{products.product?.title}</h1>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className='relative flex flex-col justify-center w-[50rem]'>
                <form className="w-full max-w-lg bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="rating">
                            Rating
                        </label>
                        {/* Star Rating */}
                        <div className="w-full">
                            <Rating
                                name="rating"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                precision={0.5} // Allows for half-star ratings
                                size="large" // Adjust the size of the rating component
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="review">
                            Review
                        </label>
                        <textarea
                            className="resize-none shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="review"
                            rows="4"
                            placeholder="Enter your review here..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-center">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleReviewSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewAndRating;
