import React, { useEffect, useState } from 'react';
import { api } from '../../../Config/ApiConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const PieChartPanel = () => {

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

    // Prepare data for the pie chart
    const categoryCounts = {};

    data.forEach(order => {
        order.orderItems.forEach(orderItem => {
            const topLevelCategory = orderItem.product.category.parentCategory.parentCategory.name; // Access topLevelCategory name
            if (categoryCounts[topLevelCategory]) {
                categoryCounts[topLevelCategory]++;
            } else {
                categoryCounts[topLevelCategory] = 1;
            }
        });
    });

    const categoryData = Object.keys(categoryCounts).map((category, index) => ({
        name: category,
        value: categoryCounts[category],
    }));

    // Define a set of predefined colors for categories
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff0000', '#00ff00', '#0000ff', '#ff00ff', '#00ffff', '#ffff00'];

    return (
        <div style={{ backgroundColor: 'black', width: '100%', height: '45vh', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
            <div style={{ position: 'relative',right: '1%', transform: 'translateX(-50%)',marginLeft:"200px", textAlign: 'left', color: '#fff', fontSize: '20px', fontWeight: 'bold', bottom:"4px" }}>
                Quantity of Orders by Product
            </div>
            <ResponsiveContainer width="100%" height="100%" style={{paddingBottom:"15px", paddingLeft:"50px", marginLeft:"30px"}}>
                <PieChart>
                    <Pie
                        data={categoryData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        animationDuration={1500}
                    >
                        {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <PieTooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartPanel