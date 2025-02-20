
import { useState } from 'react';
import type { FIRECalculation, LifeEvent } from '../types';
import { defaultLifeEvents } from '../data/defaultLifeEvents';
import { defaultCategoryInflationRates } from '../utils/inflationRates';

export const useCalculatorState = () => {
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

  const handleExpenseChange = (name: keyof typeof inputs.monthlyExpenses, value: number) => {
    setInputs(prev => ({
      ...prev,
      monthlyExpenses: {
        ...prev.monthlyExpenses,
        [name]: value
      },
      annualExpenses: Object.values({ ...prev.monthlyExpenses, [name]: value }).reduce((a, b) => a + b, 0) * 12
    }));
  };

  const handleIncomeChange = (name: keyof typeof inputs.incomeDetails, value: number) => {
    setInputs(prev => ({
      ...prev,
      incomeDetails: {
        ...prev.incomeDetails,
        [name]: value
      }
    }));
  };

  const handleAllocationChange = (name: keyof typeof inputs.investmentAllocation, value: number) => {
    setInputs(prev => ({
      ...prev,
      investmentAllocation: {
        ...prev.investmentAllocation,
        [name]: value
      }
    }));
  };

  const handleAddLifeEvent = (event: LifeEvent) => {
    setLifeEvents(prev => ({
      ...prev,
      events: [...prev.events, event]
    }));
  };

  const handleEditLifeEvent = (index: number, event: LifeEvent) => {
    setLifeEvents(prev => ({
      ...prev,
      events: prev.events.map((e, i) => i === index ? event : e)
    }));
  };

  const handleDeleteLifeEvent = (index: number) => {
    setLifeEvents(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  const handleLifeEventToggle = (enabled: boolean) => {
    setLifeEvents(prev => ({ ...prev, enabled }));
  };

  return {
    inputs,
    lifeEvents,
    handlers: {
      handleInputChange,
      handleExpenseChange,
      handleIncomeChange,
      handleAllocationChange,
      handleAddLifeEvent,
      handleEditLifeEvent,
      handleDeleteLifeEvent,
      handleLifeEventToggle
    }
  };
};
