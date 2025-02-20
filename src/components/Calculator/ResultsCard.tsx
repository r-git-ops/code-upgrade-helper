
import React from 'react';
import { Banknote, Calendar, TrendingUp } from 'lucide-react';
import { formatINR } from '../../utils/formatters';

interface ResultsCardProps {
  fireNumber: number;
  yearsToFI: number;
  currentExpenses: number;
  retirementExpenses: number;
}

export default function ResultsCard({
  fireNumber,
  yearsToFI,
  currentExpenses,
  retirementExpenses
}: ResultsCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg mt-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Banknote className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">FIRE Number</h3>
        </div>
        <p className="text-3xl font-bold text-blue-600">
          {formatINR(fireNumber)}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          The amount you need to achieve financial independence
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Calendar className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Years to FI</h3>
        </div>
        <p className="text-3xl font-bold text-green-600">
          {yearsToFI} years
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Estimated time to reach your FIRE number
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <TrendingUp className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Expenses Growth</h3>
        </div>
        <p className="text-xl font-bold text-purple-600">
          {formatINR(currentExpenses)} → {formatINR(retirementExpenses)}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Annual expenses now vs. retirement (adjusted for inflation)
        </p>
      </div>
    </div>
  );
}
