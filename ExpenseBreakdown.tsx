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
        <InputField
          label="Housing (Rent/EMI)"
          name="housing"
          value={expenses.housing}
          onChange={(e) => onChange('housing', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Utilities"
          name="utilities"
          value={expenses.utilities}
          onChange={(e) => onChange('utilities', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Groceries"
          name="groceries"
          value={expenses.groceries}
          onChange={(e) => onChange('groceries', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Transportation"
          name="transportation"
          value={expenses.transportation}
          onChange={(e) => onChange('transportation', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Healthcare"
          name="healthcare"
          value={expenses.healthcare}
          onChange={(e) => onChange('healthcare', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Insurance"
          name="insurance"
          value={expenses.insurance}
          onChange={(e) => onChange('insurance', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Entertainment"
          name="entertainment"
          value={expenses.entertainment}
          onChange={(e) => onChange('entertainment', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Shopping"
          name="shopping"
          value={expenses.shopping}
          onChange={(e) => onChange('shopping', parseFloat(e.target.value))}
          prefix="₹"
        />
        <InputField
          label="Miscellaneous"
          name="miscellaneous"
          value={expenses.miscellaneous}
          onChange={(e) => onChange('miscellaneous', parseFloat(e.target.value))}
          prefix="₹"
        />
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