import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { formatINR, formatCompactINR } from '../../utils/formatters';
import type { FIRECalculation } from '../../types';

interface ProjectionChartProps {
  inputs: FIRECalculation;
  fireNumber: number;
  projectionData: any[];
}

export default function ProjectionChart({ inputs, fireNumber, projectionData }: ProjectionChartProps) {
  const [showDetails, setShowDetails] = useState(true);
  
  return (
    <div className="space-y-4 mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Wealth & Expenses Projection</h3>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showDetails}
            onChange={(e) => setShowDetails(e.target.checked)}
            className="rounded text-blue-600"
          />
          <span className="text-sm text-gray-600">Show Details</span>
        </label>
      </div>
      
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
              formatter={(value: number, name: string) => [
                formatINR(value),
                name.replace(/([A-Z])/g, ' $1').trim()
              ]}
              labelFormatter={(label) => `Age: ${label}`}
            />
            <Legend />
            <ReferenceLine
              y={fireNumber}
              label="FIRE Target"
              stroke="#059669"
              strokeDasharray="3 3"
            />
            {/* Target Retirement Age Line */}
            <ReferenceLine
              x={inputs.retirementAge}
              label="Target Retirement"
              stroke="#dc2626"
              strokeDasharray="3 3"
            />
            {/* Actual FIRE Achievement Line */}
            {projectionData.find(d => d.isActualRetirementAge) && (
              <ReferenceLine
                x={projectionData.find(d => d.isActualRetirementAge)?.age}
                label="Actual FIRE"
                stroke="#047857"
                strokeDasharray="3 3"
              />
            )}
            <Area
              type="monotone"
              dataKey="balance"
              name="Portfolio Value"
              stroke="#3b82f6"
              fill="#93c5fd"
              fillOpacity={0.6}
            />
            {showDetails && (
              <>
                <Area
                  type="monotone"
                  dataKey="yearlyContribution"
                  name="Yearly Contribution"
                  stroke="#8b5cf6"
                  fill="#c4b5fd"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="yearlyReturns"
                  name="Yearly Returns"
                  stroke="#059669"
                  fill="#6ee7b7"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="annualExpenses"
                  name="Annual Expenses"
                  stroke="#dc2626"
                  fill="#fca5a5"
                  fillOpacity={0.6}
                />
              </>
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>* The chart shows portfolio growth until life expectancy (85 years)</p>
        <p>* Vertical lines indicate target retirement age and actual FIRE achievement age</p>
        <p>* Post-retirement phase shows the drawdown of the portfolio with no new contributions</p>
      </div>
    </div>
  );
}