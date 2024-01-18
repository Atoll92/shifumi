import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const UserBarChart = ({ userChoiceCounts }) => {
  //counts to array 4 Recharts
  const userChartData = Object.entries(userChoiceCounts).map(([choice, count]) => ({ choice, count }));

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart data={userChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="choice" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0088FE" name="Player" />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

UserBarChart.propTypes = {
  userChoiceCounts: PropTypes.object.isRequired,
};

export default UserBarChart;
