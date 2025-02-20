
import React from 'react';
import { Calculator as CalculatorIcon } from 'lucide-react';
import useCalculator from '../hooks/useCalculator';
import InputField from './Calculator/InputField';
import ResultsCard from './Calculator/ResultsCard';
import ProjectionChart from './Calculator/ProjectionChart';
import InsightsCard from './Calculator/InsightsCard';
import ExpenseBreakdown from './Calculator/ExpenseBreakdown';
import IncomeDetails from './Calculator/IncomeDetails';
import InvestmentAllocation from './Calculator/InvestmentAllocation';
import EventForm from './Calculator/LifeEvents/EventForm';
import EventList from './Calculator/LifeEvents/EventList';

export default function Calculator() {
  const { inputs, lifeEvents, fireNumber, yearsToFI, projectionData, analysis, handlers } = useCalculator();
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [editingEventIndex, setEditingEventIndex] = React.useState<number | null>(null);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <CalculatorIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">FIRE Calculator (INR)</h2>
      </div>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <InputField
              label="Current Age"
              name="currentAge"
              value={inputs.currentAge}
              onChange={handlers.handleInputChange}
            />
            <InputField
              label="Target Retirement Age"
              name="retirementAge"
              value={inputs.retirementAge}
              onChange={handlers.handleInputChange}
            />
            <InputField
              label="Current Savings"
              name="currentSavings"
              value={inputs.currentSavings}
              onChange={handlers.handleInputChange}
              prefix="₹"
            />
            <InputField
              label="Monthly Contribution"
              name="monthlyContribution"
              value={inputs.monthlyContribution}
              onChange={handlers.handleInputChange}
              prefix="₹"
            />
          </div>
          
          <div className="space-y-4">
            <InputField
              label="Expected Annual Return"
              name="expectedReturn"
              value={inputs.expectedReturn}
              onChange={handlers.handleInputChange}
              suffix="%"
              step="0.1"
            />
            <InputField
              label="Withdrawal Rate"
              name="withdrawalRate"
              value={inputs.withdrawalRate}
              onChange={handlers.handleInputChange}
              suffix="%"
              step="0.1"
            />
            <InputField
              label="Inflation Rate"
              name="inflationRate"
              value={inputs.inflationRate}
              onChange={handlers.handleInputChange}
              suffix="%"
              step="0.1"
            />
            <InputField
              label="Expense Growth Rate"
              name="expenseGrowthRate"
              value={inputs.expenseGrowthRate}
              onChange={handlers.handleInputChange}
              suffix="%"
              step="0.1"
            />
          </div>
        </div>

        <ResultsCard
          fireNumber={fireNumber}
          yearsToFI={yearsToFI}
          currentExpenses={inputs.annualExpenses}
          retirementExpenses={inputs.annualExpenses * Math.pow(1 + (inputs.inflationRate + inputs.expenseGrowthRate) / 100, yearsToFI)}
        />

        <ExpenseBreakdown
          expenses={inputs.monthlyExpenses!}
          onChange={handlers.handleExpenseChange}
        />

        <IncomeDetails
          income={inputs.incomeDetails!}
          onChange={handlers.handleIncomeChange}
        />

        <InvestmentAllocation
          allocation={inputs.investmentAllocation!}
          onChange={handlers.handleAllocationChange}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Life Events & Major Expenses</h3>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={lifeEvents.enabled}
                  onChange={(e) => handlers.handleLifeEvents.onToggle(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-sm text-gray-600">Include in calculations</span>
              </label>
              <button
                onClick={() => {
                  setEditingEventIndex(null);
                  setShowEventForm(true);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Event
              </button>
            </div>
          </div>

          {showEventForm && (
            <EventForm
              onSubmit={(event) => {
                if (editingEventIndex !== null) {
                  handlers.handleLifeEvents.onEdit(editingEventIndex, event);
                } else {
                  handlers.handleLifeEvents.onAdd(event);
                }
                setShowEventForm(false);
                setEditingEventIndex(null);
              }}
              onCancel={() => {
                setShowEventForm(false);
                setEditingEventIndex(null);
              }}
              initialValues={editingEventIndex !== null ? lifeEvents.events[editingEventIndex] : undefined}
            />
          )}

          <EventList
            events={lifeEvents.events}
            onEdit={(index) => {
              setEditingEventIndex(index);
              setShowEventForm(true);
            }}
            onDelete={handlers.handleLifeEvents.onRemove}
          />
        </div>

        <InsightsCard
          analysis={{
            ...analysis,
            yearsToFI
          }}
          targetAge={inputs.retirementAge}
        />
        
        <ProjectionChart
          inputs={inputs}
          fireNumber={fireNumber}
          projectionData={projectionData}
        />
      </div>
    </div>
  );
}
