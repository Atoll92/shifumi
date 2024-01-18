import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';

const BarChart = ({ data, fillColor, name }) => {
    //counts to array 4 Recharts
    const chartData = Object.entries(data).map(([choice, count]) => ({ choice, count }));

    return (
        <ResponsiveContainer width="100%" height={250}>
        <RechartsBarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="choice" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill={fillColor} name={name} />
        </RechartsBarChart>
        </ResponsiveContainer>
    );
};

BarChart.propTypes = {
    data: PropTypes.object.isRequired,
    fillColor: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default BarChart;