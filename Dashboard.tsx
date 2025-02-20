import React from 'react';
import { TrendingUp, PieChart, DollarSign, Target } from 'lucide-react';
import type { PortfolioAllocation } from '../types';

export default function Dashboard() {
  const portfolioAllocation: PortfolioAllocation = {
    stocks: 70,
    bonds: 20,
    cash: 5,
    other: 5,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto mt-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Portfolio Overview</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <PieChart className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Asset Allocation</h3>
          </div>
          <div className="space-y-2">
            {Object.entries(portfolioAllocation).map(([asset, percentage]) => (
              <div key={asset} className="flex items-center justify-between">
                <span className="text-gray-600 capitalize">{asset}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Progress to Goal</h3>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Current Progress</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '45%' }} />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-6">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Monthly Savings Rate</h3>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600">Savings Rate</span>
              <span className="font-medium">35%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: '35%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}