import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Dashboard = () => {
  const data = [
    { name: 'Red', uv: 12, pv: 2400, amt: 2400 },
    { name: 'Blue', uv: 19, pv: 2210, amt: 2210 },
    { name: 'Yellow', uv: 3, pv: 2290, amt: 2290 },
    { name: 'Green', uv: 5, pv: 2000, amt: 2000 },
    { name: 'Purple', uv: 2, pv: 2181, amt: 2181 },
    { name: 'Orange', uv: 3, pv: 2500, amt: 2500 },
  ];

  return (
    <div style={{backgroundColor:'black', width:'100%'}}>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="uv" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Dashboard;
