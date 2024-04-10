import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { api } from '../../../Config/ApiConfig';
import './CircularCount.css'; // Import CSS file for styling

const CircularCount = () => {
    const [orderData, setOrderData] = useState([]);
    const [productData, setProductData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [animationKey, setAnimationKey] = useState(0); // State to control animation

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await api.get(`/api/admin/orders/`);
                console.log("Order data: ", response.data);
                setOrderData(response.data);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        const fetchProductData = async () => {
            try {
                const response = await api.get(`product/products?colors=&sizes=&minPrice=0&maxPrice=1000000&minDiscount=0&category=&stock=null&sort=price_high&pageNumber=0&pageSize=10000`);
                console.log("Product data: ", response.data);
                setProductData(response.data);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        const fetchUserData = async () => {
            try {
                const response = await api.get(`/api/user/all`);
                console.log("User data: ", response.data);
                setUserData(response.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchOrderData();
        fetchProductData();
        fetchUserData();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey(prevKey => prevKey + 1);
        }, 4000); // Restart animation every 4 seconds

        return () => clearInterval(interval); // Clear interval on component unmount

    }, []);

    const totalCount = {
        orders: orderData.length,
        products: productData?.content?.length || 0,
        users: userData.length
    };

    return (
        <div className='flex justify-center' style={{ display: 'flex', paddingTop: '55px', justifyContent: 'space-around', position: 'relative', height: '40vh', width: '100vh' }}>
            {Object.keys(totalCount).map((key, index) => (
                <div key={index} className="circle-container">
                    <div className="glowing-circle">
                        <CircularProgressbar
                            key={`${animationKey}-${key}`}
                            value={0}
                            maxValue={totalCount[key]}
                            text={`${totalCount[key]}`}
                            strokeWidth={5}
                            styles={{
                                path: {
                                    stroke: index === 0 ? 'green' : index === 1 ? 'blue' : 'red',
                                    strokeLinecap: 'round',
                                },
                                trail: {
                                    stroke: 'rgba(255, 255, 255, 0.3)', // Gray shaded gradient
                                    strokeWidth: 5,
                                    strokeLinecap: 'round',
                                    strokeDasharray: '2000',
                                    strokeDashoffset: '0', // Start the animation from the beginning
                                    transition: 'stroke-dashoffset 10s ease-in-out', // Duration of animation
                                },
                                text: { fill: 'white', fontSize: '16px' }
                            }}
                            onAnimationEnd={() => setAnimationKey(animationKey + 1)}
                            animationDuration={10000} // Adjust this value to control the speed of the animation
                        />
                        {/* Add a div to create a black circle as background */}
                        <div className="background-circle"></div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>{key}</div>
                </div>
            ))}
        </div>
    );
};

export default CircularCount;
