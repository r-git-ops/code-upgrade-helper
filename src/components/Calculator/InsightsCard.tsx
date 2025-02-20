
import React from 'react';
import { Lightbulb } from 'lucide-react';
import { formatINR } from '../../utils/formatters';
import type { FIREAnalysis } from '../../types';

interface InsightsCardProps {
  analysis: FIREAnalysis & { yearsToFI: number };
  targetAge: number;
}

export default function InsightsCard({ analysis, targetAge }: InsightsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">FIRE Insights</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Goal Achievement</h3>
            {analysis.achievable ? (
              <p className="text-green-600">
                You're on track to achieve FIRE by age {targetAge}! 
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-amber-600">
                  At current rate, you'll achieve FIRE {analysis.yearsToFI} years from now
                </p>
                <p className="text-gray-600">
                  Shortfall: {formatINR(analysis.shortfall)}
                </p>
              </div>
            )}
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Key Metrics</h3>
            <p className="text-gray-600">
              Savings Rate: {analysis.savingsRate.toFixed(1)}% of income
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Recommendations</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <ul className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span className="text-gray-600">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
