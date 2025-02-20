
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { formatINR, formatCompactINR } from '../../utils/formatters';
import type { FIRECalculation } from '../../types';

interface ProjectionChartProps {
  inputs: FIRECalculation;
  fireNumber: number;
  projectionData: Array<{
    age: number;
    balance: number;
    expenses: number;
  }>;
}

export default function ProjectionChart({ inputs, fireNumber, projectionData }: ProjectionChartProps) {
  return (
    <div className="space-y-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-800">Wealth & Expenses Projection</h3>
      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={projectionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="age" 
              label={{ value: 'Age', position: 'bottom' }}
            />
            <YAxis
              tickFormatter={formatCompactINR}
              label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              formatter={(value: number) => [formatINR(value)]}
              labelFormatter={(label) => `Age: ${label}`}
            />
            <Legend />
            <ReferenceLine
              y={fireNumber}
              label="FIRE Target"
              stroke="#059669"
              strokeDasharray="3 3"
            />
            <Area
              type="monotone"
              dataKey="balance"
              name="Portfolio Value"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              name="Annual Expenses"
              stroke="#dc2626"
              fill="#fca5a5"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
