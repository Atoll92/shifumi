import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';

const COLORS = ['#0088FE', '#FF8042'];

const DonutChart = ({ wins, losses }) => {
  const data = [
    { name: 'Wins', value: wins },
    { name: 'Losses', value: losses },
  ];



  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
          <Label position="center" content={<CustomLabel data={data} />} />
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomLabel = ({ data }) => (
  <g>
    {data.map((entry, index) => (
      <text
        key={`label-${index}`}
        x={index === 0 ? '40%' : '60%'}
        y={`50%`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={COLORS[index % COLORS.length]}
        fontSize="20px"
      >
        {`${entry.value}`}
      </text>
    ))}
  </g>
);

export default DonutChart;
