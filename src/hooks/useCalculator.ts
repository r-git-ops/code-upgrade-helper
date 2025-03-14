
import { useState } from 'react';
import { defaultLifeEvents } from '../data/defaultLifeEvents';
import { defaultCategoryInflationRates } from '../utils/inflationRates';
import { calculateFIRENumber, calculateYearsToFI, calculateProjection, calculateWithLifeEvents } from '../utils/calculations';
import { analyzeFIREPlan } from '../utils/analysis';
import type { FIRECalculation } from '../types';
import type { LifeEvent } from '../types/lifeEvents';

export default function useCalculator() {
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

  const handlers = {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const numericValue = value === '' ? 0 : parseFloat(value);
      
      if (!Number.isNaN(numericValue)) {
        setInputs((prev) => ({
          ...prev,
          [name]: numericValue,
        }));
      }
    },

    handleExpenseChange: (name: keyof NonNullable<typeof inputs.monthlyExpenses>, value: number) => {
      setInputs(prev => {
        const updatedExpenses = { ...prev.monthlyExpenses!, [name]: value };
        return {
          ...prev,
          monthlyExpenses: updatedExpenses,
          annualExpenses: Object.values(updatedExpenses).reduce((a, b) => a + b, 0) * 12
        };
      });
    },

    handleIncomeChange: (name: keyof NonNullable<typeof inputs.incomeDetails>, value: number) => {
      setInputs(prev => ({
        ...prev,
        incomeDetails: {
          ...prev.incomeDetails!,
          [name]: value
        }
      }));
    },

    handleAllocationChange: (name: keyof NonNullable<typeof inputs.investmentAllocation>, value: number) => {
      setInputs(prev => ({
        ...prev,
        investmentAllocation: {
          ...prev.investmentAllocation!,
          [name]: value
        }
      }));
    },

    handleLifeEvents: {
      onToggle: (enabled: boolean) => setLifeEvents(prev => ({ ...prev, enabled })),
      onAdd: (event: LifeEvent) => setLifeEvents(prev => ({
        ...prev,
        events: [...prev.events, event]
      })),
      onRemove: (index: number) => setLifeEvents(prev => ({
        ...prev,
        events: prev.events.filter((_, i) => i !== index)
      })),
      onEdit: (index: number, event: LifeEvent) => setLifeEvents(prev => ({
        ...prev,
        events: prev.events.map((e, i) => i === index ? event : e)
      }))
    }
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

  return {
    inputs,
    lifeEvents,
    fireNumber,
    yearsToFI,
    projectionData,
    analysis,
    handlers
  };
}
