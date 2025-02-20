
import { useMemo } from 'react';
import type { FIRECalculation } from '../types';
import { calculateFIRENumber, calculateYearsToFI, calculateProjection } from '../utils/calculations';
import { analyzeFIREPlan } from '../utils/analysis';
import { calculateWithLifeEvents } from '../utils/calculations';

export const useCalculations = (inputs: FIRECalculation, lifeEvents: { events: any[], enabled: boolean }) => {
  const fireNumber = useMemo(() => calculateFIRENumber(
    inputs.annualExpenses,
    inputs.withdrawalRate,
    inputs.currentAge,
    inputs.retirementAge,
    inputs.inflationRate,
    inputs.expenseGrowthRate
  ), [inputs.annualExpenses, inputs.withdrawalRate, inputs.currentAge, inputs.retirementAge, inputs.inflationRate, inputs.expenseGrowthRate]);

  const yearsToFI = useMemo(() => calculateYearsToFI(
    inputs.currentSavings,
    inputs.monthlyContribution,
    inputs.expectedReturn,
    fireNumber,
    inputs.inflationRate,
    inputs.salaryGrowthRate
  ), [inputs.currentSavings, inputs.monthlyContribution, inputs.expectedReturn, fireNumber, inputs.inflationRate, inputs.salaryGrowthRate]);

  const projectionData = useMemo(() => {
    let data = calculateProjection(
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
      data = calculateWithLifeEvents(
        data,
        lifeEvents.events,
        inputs.currentAge
      );
    }

    return data;
  }, [inputs, lifeEvents, fireNumber]);

  const analysis = useMemo(() => analyzeFIREPlan(
    inputs.currentAge,
    inputs.retirementAge,
    inputs.currentSavings,
    inputs.monthlyContribution,
    Object.values(inputs.incomeDetails!).reduce((a, b) => a + b, 0) * 12,
    yearsToFI,
    fireNumber
  ), [inputs, yearsToFI, fireNumber]);

  return {
    fireNumber,
    yearsToFI,
    projectionData,
    analysis
  };
};
