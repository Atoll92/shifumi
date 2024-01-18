import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComputerBarChart = ({computerChoiceCounts }) => {
  //counts to array 4 Recharts
  const computerChartData = Object.entries(computerChoiceCounts).map(([choice, count]) => ({ choice, count }));

  return (
    <ResponsiveContainer width="100%" height={250}>
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

export default ComputerBarChart;