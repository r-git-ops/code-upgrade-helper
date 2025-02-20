import React from 'react';
import { DollarSign } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface SavingsOverviewProps {
  monthlyContribution: number;
  annualIncome: number;
  currentSavings: number;
}

export default function SavingsOverview({ 
  monthlyContribution, 
  annualIncome,
  currentSavings 
}: SavingsOverviewProps) {
  const savingsRate = ((monthlyContribution * 12) / annualIncome) * 100;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <DollarSign className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Savings Overview</h3>
      </div>

      <div className="grid gap-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Monthly Savings</span>
            <span className="font-medium">{formatINR(monthlyContribution)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Current Portfolio</span>
            <span className="font-medium">{formatINR(currentSavings)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Savings Rate</span>
            <span className="font-medium">{savingsRate.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}