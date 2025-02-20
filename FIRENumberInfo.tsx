import React, { useState } from 'react';
import { Info } from 'lucide-react';

export default function FIRENumberInfo() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowInfo(!showInfo)}
        className="text-gray-500 hover:text-gray-700 ml-2"
        aria-label="Show FIRE number calculation info"
      >
        <Info className="w-4 h-4" />
      </button>
      
      {showInfo && (
        <div className="absolute z-10 w-96 p-6 mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
          <h4 className="font-semibold mb-4">How is FIRE Number calculated?</h4>
          
          <div className="space-y-4">
            <div>
              <h5 className="font-medium mb-2">Formula:</h5>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="font-mono text-sm">
                  FIRE Number = (Future Annual Expenses × 100) ÷ Withdrawal Rate
                </p>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium mb-2">Example Calculation:</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Current Annual Expenses</td>
                      <td className="py-2 text-right">₹10,00,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Years to Retirement</td>
                      <td className="py-2 text-right">15</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Inflation Rate</td>
                      <td className="py-2 text-right">6%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Lifestyle Growth</td>
                      <td className="py-2 text-right">2%</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Future Annual Expenses</td>
                      <td className="py-2 text-right">₹23,97,000</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-2">Withdrawal Rate</td>
                      <td className="py-2 text-right">4%</td>
                    </tr>
                    <tr className="font-medium bg-blue-50">
                      <td className="py-2">FIRE Number</td>
                      <td className="py-2 text-right">₹5,99,25,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <p>* Future expenses consider both inflation and lifestyle growth</p>
              <p>* The 4% withdrawal rate is based on the Trinity Study</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}