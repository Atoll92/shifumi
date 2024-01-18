import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import PropTypes from 'prop-types'

const COLORS = ['#0088FE', '#FF8042'];

const DonutChart = ({ wins, losses }) => {
  const data = [
    { name: 'Wins', value: wins },
    { name: 'Losses', value: losses },
  ];



  return (
    <div className={"absolute left-0 w-full"}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="70%"
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
    </div>
  );
};

DonutChart.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired,
};

const CustomLabel = ({ data }) => (
  <g>
    {data.map((entry, index) => (
      <text
        key={`label-${index}`}
        x={index === 0 ? '35%' : '65%'}
        y={`20%`}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={COLORS[index % COLORS.length]}
        fontSize="min(5vw,60px)"
        fontWeight={900}
      >
        {`${entry.value}`}
      </text>
    ))}
  </g>
);

CustomLabel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default DonutChart;
