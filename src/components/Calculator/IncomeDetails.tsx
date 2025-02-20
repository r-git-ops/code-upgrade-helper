
import React from 'react';
import { Wallet } from 'lucide-react';
import InputField from './InputField';
import type { IncomeDetails } from '../../types/calculations';

interface IncomeDetailsProps {
  income: IncomeDetails;
  onChange: (name: keyof IncomeDetails, value: number) => void;
}

export default function IncomeDetails({ income, onChange }: IncomeDetailsProps) {
  const totalIncome = Object.values(income).reduce((a, b) => a + b, 0);
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-green-600" />
        <h3 className="text-lg font-semibold">Monthly Income Sources</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(income).map(([name, value]) => (
          <InputField
            key={name}
            label={name.split(/(?=[A-Z])/).join(' ')}
            name={name}
            value={value}
            onChange={(e) => onChange(name as keyof IncomeDetails, parseFloat(e.target.value))}
            prefix="₹"
          />
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-green-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Monthly Income</span>
          <span className="text-lg font-bold text-green-600">
            ₹{totalIncome.toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
