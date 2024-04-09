import React, { useEffect, useState } from 'react';
import { api } from '../../Config/ApiConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get(`/api/admin/orders/`);
        console.log("Order data: ", response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
    fetchOrders();
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
    <div style={{ backgroundColor: 'gray', width: '100vw', height: '100vh', margin: '0', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
      <div style={{ backgroundColor: 'black', width: '48%', height: '50%', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
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
      <div style={{ backgroundColor: 'black', width: '48%', height: '50%', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>
          Category Distribution
        </div>
        <ResponsiveContainer width="100%" height="100%">
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
    </div>
  );
};

export default Dashboard;
