import React, { useEffect, useState } from 'react'
import { api } from '../../../Config/ApiConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';


const TimeSeriesPanel = () => {


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


    // Parse order date to only include date (without time)
    const parseDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    // Prepare data for time series graph
    const ordersByDate = data.reduce((acc, order) => {
        const orderDate = parseDate(order.orderDate);
        acc[orderDate] = (acc[orderDate] || 0) + 1;
        return acc;
    }, {});

    const ordersData = Object.keys(ordersByDate).map((date) => ({
        date,
        orders: ordersByDate[date],
    }));

    return (
        <div style={{ backgroundColor: 'black', width: '100%', height: '45vh', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
                Number of Orders with Time
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={ordersData}
                    margin={{ top: 40, right: 30, left: 20, bottom: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                    <XAxis dataKey="date" label={{ value: 'Date', position: 'insideBottom', offset: -5, fill: '#fff', fontSize: 14 }} tick={{ fill: '#fff', fontSize: 12 }} />
                    <YAxis label={{ value: 'Number of Orders', angle: -90, position: 'insideLeft', offset: -5, fill: '#fff', fontSize: 14 }} tick={{ fill: '#fff', fontSize: 12 }} />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 6, strokeWidth: 2, fill: '#82ca9d' }} animationDuration={1500} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default TimeSeriesPanel



