import React, { useEffect, useState } from 'react';
import { api } from '../../Config/ApiConfig';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as PieTooltip } from 'recharts';
import BarChartPanel from './Dashboard-Panels/BarChartPanel';
import TimeSeriesPanel from './Dashboard-Panels/TimeSeriesPanel';
import PieChartPanel from './Dashboard-Panels/PieChartPanel';
import CircularCount from './Dashboard-Panels/CircularCount';

import image1 from '../../data/Images/image1.jpg';

const Dashboard = () => {
    return (
        <div style={{
            backgroundImage: `url(${image1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw', margin: '10', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'
        }}>


            <div style={{ backgroundColor: 'black', width: '48%', height: '40%', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
                <TimeSeriesPanel />
            </div>

            <div style={{ backgroundColor: 'black', width: '48%', height: '40%', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
                <PieChartPanel />
            </div>

            <div style={{ backgroundColor: 'black', width: '50%', height: '40%', padding: '5px', margin: "5px", marginLeft: '350px', fontFamily: 'Arial, sans-serif', position: 'relative' }}>

                <CircularCount />

            </div>

            <div style={{ backgroundColor: 'black', width: '100%', height: '40%', padding: '5px', margin: "5px", fontFamily: 'Arial, sans-serif', position: 'relative' }}>
                <BarChartPanel />
            </div>



        </div>
    );
};

export default Dashboard;