import React from 'react';
import { PieChart } from 'lucide-react';
import type { InvestmentAllocation } from '../../types';

interface PortfolioSummaryProps {
  allocation: InvestmentAllocation;
  currentSavings: number;
  fireNumber: number;
}

export default function PortfolioSummary({ allocation, currentSavings, fireNumber }: PortfolioSummaryProps) {
  const progressPercentage = Math.min(100, (currentSavings / fireNumber) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <PieChart className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Asset Allocation</h3>
      </div>
      <div className="space-y-2">
        {Object.entries(allocation).map(([asset, percentage]) => (
          percentage > 0 && (
            <div key={asset} className="flex items-center justify-between">
              <span className="text-gray-600 capitalize">
                {asset.replace(/([A-Z])/g, ' $1').trim()}
              </span>
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
          )
        ))}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Progress to FIRE</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Current Progress</span>
            <span className="font-medium">{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full" 
              style={{ width: `${progressPercentage}%` }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}