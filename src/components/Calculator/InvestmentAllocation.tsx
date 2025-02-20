
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
        {Object.entries(allocation).map(([name, value]) => (
          <InputField
            key={name}
            label={name.split(/(?=[A-Z])/).join(' ')}
            name={name}
            value={value}
            onChange={(e) => onChange(name as keyof InvestmentAllocation, parseFloat(e.target.value))}
            suffix="%"
            step="0.1"
          />
        ))}
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
