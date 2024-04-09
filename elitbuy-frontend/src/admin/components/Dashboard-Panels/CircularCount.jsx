import React, { useEffect, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { api } from '../../../Config/ApiConfig';

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

    const totalCount = {
        orders: orderData.length,
        products: productData?.content?.length || 0,
        users: userData.length
    };

    return (
        <div className='flex justify-center' style={{ display: 'flex', paddingTop: '55px', justifyContent: 'space-around', position: 'relative', height: '40vh', width: '100vh' }}>
            {Object.keys(totalCount).map((key, index) => (
                <div key={index} style={{ width: '120px' }}>
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
                                stroke: index === 0 ? '#9ccc65' : index === 1 ? '#64b5f6' : '#ef5350',
                            },
                            text: { fill: 'white', fontSize: '16px' }
                        }}
                        onAnimationEnd={() => setAnimationKey(animationKey + 1)}
                        animationDuration={200000} // Adjust this value to control the speed of the animation
                    />


                    <div style={{ textAlign: 'center', marginTop: '10px', color: 'white' }}>{key}</div>
                </div>
            ))}
        </div>
    );
};

export default CircularCount;
