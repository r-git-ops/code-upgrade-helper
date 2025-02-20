import React from 'react';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">FIRE Calculator & Tracker</h1>
          <p className="text-lg text-gray-600">
            Plan your journey to Financial Independence and Early Retirement
          </p>
        </div>
        
        <Calculator />
      </div>
    </div>
  );
}

export default App;