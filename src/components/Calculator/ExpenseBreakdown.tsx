
import React from 'react';
import { Receipt } from 'lucide-react';
import InputField from './InputField';
import type { MonthlyExpenses } from '../../types/calculations';

interface ExpenseBreakdownProps {
  expenses: MonthlyExpenses;
  onChange: (name: keyof MonthlyExpenses, value: number) => void;
}

export default function ExpenseBreakdown({ expenses, onChange }: ExpenseBreakdownProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Receipt className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">Monthly Expenses Breakdown</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(expenses).map(([name, value]) => (
          <InputField
            key={name}
            label={name.charAt(0).toUpperCase() + name.slice(1)}
            name={name}
            value={value}
            onChange={(e) => onChange(name as keyof MonthlyExpenses, parseFloat(e.target.value))}
            prefix="₹"
          />
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total Monthly Expenses</span>
          <span className="text-lg font-bold text-blue-600">
            ₹{Object.values(expenses).reduce((a, b) => a + b, 0).toLocaleString('en-IN')}
          </span>
        </div>
      </div>
    </div>
  );
}
