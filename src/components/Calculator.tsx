import React, { useState } from 'react';
import { PieChart, Target, CheckSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateFIRENumber, calculateYearsToFI, calculateProjection, calculateWithLifeEvents } from '../utils/calculations';
import { analyzeFIREPlan } from '../utils/analysis';
import { defaultLifeEvents } from '../data/defaultLifeEvents';
import { defaultCategoryInflationRates } from '../utils/inflationRates';
import type { FIRECalculation, LifeEvent } from '../types';
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
  const [inputs, setInputs] = useState<FIRECalculation>({
    currentAge: 30,
    retirementAge: 45,
    currentSavings: 2500000,
    monthlyContribution: 50000,
    expectedReturn: 12,
    annualExpenses: 1000000,
    withdrawalRate: 4,
    inflationRate: 6,
    salaryGrowthRate: 5,
    expenseGrowthRate: 2,
    monthlyExpenses: {
      housing: 25000,
      utilities: 5000,
      groceries: 15000,
      transportation: 8000,
      healthcare: 5000,
      insurance: 3000,
      entertainment: 10000,
      shopping: 10000,
      miscellaneous: 5000
    },
    incomeDetails: {
      primarySalary: 150000,
      bonuses: 25000,
      rentalIncome: 0,
      otherIncome: 0
    },
    investmentAllocation: {
      equityMutualFunds: 40,
      stocks: 20,
      ppf: 10,
      epf: 10,
      nps: 5,
      fixedDeposits: 5,
      gold: 5,
      realEstate: 0,
      cash: 5
    }
  });

  const [lifeEvents, setLifeEvents] = useState({
    events: defaultLifeEvents,
    enabled: true,
    defaultInflationRates: defaultCategoryInflationRates
  });

  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numericValue = value === '' ? 0 : parseFloat(value);
    
    if (!Number.isNaN(numericValue)) {
      setInputs((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    }
  };

  const handleExpenseChange = (name: keyof MonthlyExpenses, value: number) => {
    setInputs(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [name]: value
      },
      annualExpenses: Object.values({ ...prev.monthlyExpenses, [name]: value }).reduce((a, b) => a + b, 0) * 12
    }));
  };

  const handleIncomeChange = (name: keyof IncomeDetails, value: number) => {
    setInputs(prev => ({
      ...prev,
      incomeDetails: {
        ...prev.incomeDetails,
        [name]: value
      }
    }));
  };

  const handleAllocationChange = (name: keyof InvestmentAllocation, value: number) => {
    setInputs(prev => ({
      ...prev,
      investmentAllocation: {
        ...prev.investmentAllocation,
        [name]: value
      }
    }));
  };

  const handleAddEvent = (event: LifeEvent) => {
    if (editingEventIndex !== null) {
      setLifeEvents(prev => ({
        ...prev,
        events: prev.events.map((e, i) => i === editingEventIndex ? event : e)
      }));
      setEditingEventIndex(null);
    } else {
      setLifeEvents(prev => ({
        ...prev,
        events: [...prev.events, event]
      }));
    }
    setShowEventForm(false);
  };

  const handleEditEvent = (index: number) => {
    setEditingEventIndex(index);
    setShowEventForm(true);
  };

  const handleDeleteEvent = (index: number) => {
    setLifeEvents(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  const fireNumber = calculateFIRENumber(
    inputs.annualExpenses,
    inputs.withdrawalRate,
    inputs.currentAge,
    inputs.retirementAge,
    inputs.inflationRate,
    inputs.expenseGrowthRate
  );

  const yearsToFI = calculateYearsToFI(
    inputs.currentSavings,
    inputs.monthlyContribution,
    inputs.expectedReturn,
    fireNumber,
    inputs.inflationRate,
    inputs.salaryGrowthRate
  );

  let projectionData = calculateProjection(
    inputs.currentSavings,
    inputs.monthlyContribution,
    inputs.expectedReturn,
    fireNumber,
    inputs.currentAge,
    inputs.retirementAge,
    inputs.annualExpenses,
    inputs.inflationRate,
    inputs.salaryGrowthRate,
    inputs.expenseGrowthRate
  );

  if (lifeEvents.enabled) {
    projectionData = calculateWithLifeEvents(
      projectionData,
      lifeEvents.events,
      inputs.currentAge
    );
  }

  const analysis = analyzeFIREPlan(
    inputs.currentAge,
    inputs.retirementAge,
    inputs.currentSavings,
    inputs.monthlyContribution,
    Object.values(inputs.incomeDetails!).reduce((a, b) => a + b, 0) * 12,
    yearsToFI,
    fireNumber
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <PieChart className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Investment Planner</h2>
      </div>

      <Tabs defaultValue="why" className="space-y-6">
        <TabsList className="grid grid-cols-3 gap-4 bg-gray-100 p-1">
          <TabsTrigger value="why" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            WHY - Purpose
          </TabsTrigger>
          <TabsTrigger value="how" className="flex items-center gap-2">
            <PieChart className="w-4 h-4" />
            HOW - Strategy
          </TabsTrigger>
          <TabsTrigger value="what" className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4" />
            WHAT - Execute
          </TabsTrigger>
        </TabsList>

        <TabsContent value="why" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Define Your Investment Purpose</CardTitle>
              <CardDescription>Let's understand why you're investing and what you want to achieve</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Current Age"
                  name="currentAge"
                  value={inputs.currentAge}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Target Retirement Age"
                  name="retirementAge"
                  value={inputs.retirementAge}
                  onChange={handleInputChange}
                />
                <InputField
                  label="Current Savings"
                  name="currentSavings"
                  value={inputs.currentSavings}
                  onChange={handleInputChange}
                  prefix="₹"
                />
                <InputField
                  label="Monthly Contribution"
                  name="monthlyContribution"
                  value={inputs.monthlyContribution}
                  onChange={handleInputChange}
                  prefix="₹"
                />
              </div>
            </CardContent>
          </Card>

          <ResultsCard
            fireNumber={fireNumber}
            yearsToFI={yearsToFI}
            currentExpenses={inputs.annualExpenses}
            retirementExpenses={inputs.annualExpenses * Math.pow(1 + (inputs.inflationRate + inputs.expenseGrowthRate) / 100, yearsToFI)}
          />

          <InsightsCard
            analysis={{
              ...analysis,
              yearsToFI
            }}
            targetAge={inputs.retirementAge}
          />
        </TabsContent>

        <TabsContent value="how" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Build Your Investment Strategy</CardTitle>
              <CardDescription>Define your portfolio structure and risk management approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Expected Annual Return"
                  name="expectedReturn"
                  value={inputs.expectedReturn}
                  onChange={handleInputChange}
                  suffix="%"
                  step="0.1"
                />
                <InputField
                  label="Withdrawal Rate"
                  name="withdrawalRate"
                  value={inputs.withdrawalRate}
                  onChange={handleInputChange}
                  suffix="%"
                  step="0.1"
                />
                <InputField
                  label="Inflation Rate"
                  name="inflationRate"
                  value={inputs.inflationRate}
                  onChange={handleInputChange}
                  suffix="%"
                  step="0.1"
                />
                <InputField
                  label="Salary Growth Rate"
                  name="salaryGrowthRate"
                  value={inputs.salaryGrowthRate}
                  onChange={handleInputChange}
                  suffix="%"
                  step="0.1"
                />
              </div>

              <InvestmentAllocation
                allocation={inputs.investmentAllocation}
                onChange={handleAllocationChange}
              />

              <ProjectionChart
                inputs={inputs}
                fireNumber={fireNumber}
                projectionData={projectionData}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="what" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Execute Your Investment Plan</CardTitle>
              <CardDescription>Track your progress and manage your portfolio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ExpenseBreakdown
                expenses={inputs.monthlyExpenses}
                onChange={handleExpenseChange}
              />

              <IncomeDetails
                income={inputs.incomeDetails}
                onChange={handleIncomeChange}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Life Events & Major Expenses</h3>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={lifeEvents.enabled}
                        onChange={(e) => setLifeEvents(prev => ({ ...prev, enabled: e.target.checked }))}
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
                    onSubmit={handleAddEvent}
                    onCancel={() => {
                      setShowEventForm(false);
                      setEditingEventIndex(null);
                    }}
                    initialValues={editingEventIndex !== null ? lifeEvents.events[editingEventIndex] : undefined}
                  />
                )}

                <EventList
                  events={lifeEvents.events}
                  onEdit={handleEditEvent}
                  onDelete={handleDeleteEvent}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
