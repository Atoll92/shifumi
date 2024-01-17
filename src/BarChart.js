// BarChart.js
import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChart = ({ userChoiceCounts, computerChoiceCounts }) => {
  // Transform the counts into an array of objects for Recharts
  const userChartData = Object.entries(userChoiceCounts).map(([choice, count]) => ({ choice, count }));
  const computerChartData = Object.entries(computerChoiceCounts).map(([choice, count]) => ({ choice, count }));
  const COLORS = ['#0088FE', '#FF8042']; // You can change these colors as needed

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={userChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="choice" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0088FE" name="User" />
      </RechartsBarChart>
      <RechartsBarChart data={computerChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="choice" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#FF8042" name="Computer" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
