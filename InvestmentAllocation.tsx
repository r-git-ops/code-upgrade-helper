import React from 'react';
import { PieChart } from 'lucide-react';
import InputField from './InputField';
import type { InvestmentAllocation } from '../../types/calculations';

interface InvestmentAllocationProps {
  allocation: InvestmentAllocation;
  onChange: (name: keyof InvestmentAllocation, value: number) => void;
}

export default function InvestmentAllocation({ allocation, onChange }: InvestmentAllocationProps) {
  const total = Object.values(allocation).reduce((a, b) => a + b, 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Investment Allocation (%)</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Equity Mutual Funds"
          name="equityMutualFunds"
          value={allocation.equityMutualFunds}
          onChange={(e) => onChange('equityMutualFunds', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="Stocks"
          name="stocks"
          value={allocation.stocks}
          onChange={(e) => onChange('stocks', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="PPF"
          name="ppf"
          value={allocation.ppf}
          onChange={(e) => onChange('ppf', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="EPF"
          name="epf"
          value={allocation.epf}
          onChange={(e) => onChange('epf', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="NPS"
          name="nps"
          value={allocation.nps}
          onChange={(e) => onChange('nps', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="Fixed Deposits"
          name="fixedDeposits"
          value={allocation.fixedDeposits}
          onChange={(e) => onChange('fixedDeposits', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="Gold"
          name="gold"
          value={allocation.gold}
          onChange={(e) => onChange('gold', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="Real Estate"
          name="realEstate"
          value={allocation.realEstate}
          onChange={(e) => onChange('realEstate', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
        <InputField
          label="Cash"
          name="cash"
          value={allocation.cash}
          onChange={(e) => onChange('cash', parseFloat(e.target.value))}
          suffix="%"
          step="0.1"
        />
      </div>
      
      <div className="mt-4 p-4 bg-purple-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Allocation</span>
          <span className={`text-lg font-bold ${total === 100 ? 'text-green-600' : 'text-red-600'}`}>
            {total}%
          </span>
        </div>
        {total !== 100 && (
          <p className="text-sm text-red-600 mt-2">
            Total allocation should be 100%
          </p>
        )}
      </div>
    </div>
  );
}