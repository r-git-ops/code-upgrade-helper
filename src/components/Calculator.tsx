import React, { useState } from 'react';
import { PieChart, Target, CheckSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCalculatorState } from '../hooks/useCalculatorState';
import { useCalculations } from '../hooks/useCalculations';
import type { LifeEvent } from '../types';
import InputField from './Calculator/InputField';
import ResultsCard from './Calculator/ResultsCard';
import ProjectionChart from './Calculator/ProjectionChart';
import InsightsCard from './Calculator/InsightsCard';
import ExpenseBreakdown from './Calculator/ExpenseBreakdown';
import { default as IncomeDetailsView } from './Calculator/IncomeDetails';
import { default as InvestmentAllocationView } from './Calculator/InvestmentAllocation';
import EventForm from './Calculator/LifeEvents/EventForm';
import EventList from './Calculator/LifeEvents/EventList';

export default function Calculator() {
  const { inputs, lifeEvents, handlers } = useCalculatorState();
  const calculations = useCalculations(inputs, lifeEvents);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90 p-6">
      <div className="glass-card p-8 max-w-4xl mx-auto space-y-8 animate-gradient">
        <div className="flex items-center gap-3 mb-8">
          <PieChart className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            FIRE Calculator
          </h1>
        </div>

        <Tabs defaultValue="why" className="space-y-8">
          <TabsList className="grid grid-cols-3 gap-4 p-1 glass-card">
            <TabsTrigger value="why" className="hover-scale flex items-center gap-2">
              <Target className="w-4 h-4" />
              WHY - Purpose
            </TabsTrigger>
            <TabsTrigger value="how" className="hover-scale flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              HOW - Strategy
            </TabsTrigger>
            <TabsTrigger value="what" className="hover-scale flex items-center gap-2">
              <CheckSquare className="w-4 h-4" />
              WHAT - Execute
            </TabsTrigger>
          </TabsList>

          <TabsContent value="why" className="space-y-8">
            <Card className="glass-card card-gradient">
              <CardHeader>
                <CardTitle>Define Your Investment Purpose</CardTitle>
                <CardDescription>Let's understand why you're investing and what you want to achieve</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </CardContent>
            </Card>

            <ResultsCard
              fireNumber={calculations.fireNumber}
              yearsToFI={calculations.yearsToFI}
              currentExpenses={inputs.annualExpenses}
              retirementExpenses={inputs.annualExpenses * Math.pow(1 + (inputs.inflationRate + inputs.expenseGrowthRate) / 100, calculations.yearsToFI)}
            />

            <InsightsCard
              analysis={{
                ...calculations.analysis,
                yearsToFI: calculations.yearsToFI
              }}
              targetAge={inputs.retirementAge}
            />
          </TabsContent>

          <TabsContent value="how" className="space-y-8">
            <Card className="glass-card card-gradient">
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
                    label="Salary Growth Rate"
                    name="salaryGrowthRate"
                    value={inputs.salaryGrowthRate}
                    onChange={handlers.handleInputChange}
                    suffix="%"
                    step="0.1"
                  />
                </div>

                <InvestmentAllocationView
                  allocation={inputs.investmentAllocation}
                  onChange={handlers.handleAllocationChange}
                />

                <ProjectionChart
                  inputs={inputs}
                  fireNumber={calculations.fireNumber}
                  projectionData={calculations.projectionData}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="what" className="space-y-8">
            <Card className="glass-card card-gradient">
              <CardHeader>
                <CardTitle>Execute Your Investment Plan</CardTitle>
                <CardDescription>Track your progress and manage your portfolio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpenseBreakdown
                  expenses={inputs.monthlyExpenses}
                  onChange={handlers.handleExpenseChange}
                />

                <IncomeDetailsView
                  income={inputs.incomeDetails}
                  onChange={handlers.handleIncomeChange}
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
                      onSubmit={handlers.handleAddEvent}
                      onCancel={() => {
                        setShowEventForm(false);
                        setEditingEventIndex(null);
                      }}
                      initialValues={editingEventIndex !== null ? lifeEvents.events[editingEventIndex] : undefined}
                    />
                  )}

                  <EventList
                    events={lifeEvents.events}
                    onEdit={handlers.handleEditEvent}
                    onDelete={handlers.handleDeleteEvent}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
