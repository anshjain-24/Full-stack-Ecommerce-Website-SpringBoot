import React, { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';
import { ResponsiveContainer,BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const BarChartPanel = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await api.get(`/api/admin/orders/`);
            console.log("Order data: ", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds

        return () => clearInterval(interval);
    }, []);

    // Prepare data for the bar chart
    const productQuantity = {};

    data.forEach(order => {
        order.orderItems.forEach(orderItem => {
            const productTitle = orderItem.product.title;
            if (productQuantity[productTitle]) {
                productQuantity[productTitle]++;
            } else {
                productQuantity[productTitle] = 1;
            }
        });
    });

    const productQuantityData = Object.keys(productQuantity).map((product) => ({
        product,
        quantity: productQuantity[product],
    }));

    return (
        <div style={{ backgroundColor: 'black', width: '100%', height: '45vh', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
          Quantity of Orders by Product
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={productQuantityData}
            margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis dataKey="product" label={{ value: 'Product', position: 'insideBottom', offset: -5, fill: '#fff', fontSize: 14 }} tick={{ fill: '#fff', fontSize: 12 }} />
            <YAxis label={{ value: 'Quantity', angle: -90, position: 'insideLeft', offset: -5, fill: '#fff', fontSize: 14 }} tick={{ fill: '#fff', fontSize: 12 }} />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
}

export default BarChartPanel