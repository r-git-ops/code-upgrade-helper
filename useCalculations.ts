import { useMemo } from 'react';
import type { FIRECalculation } from '../../../types';
import { calculateFIRENumber, calculateYearsToFI, calculateProjection, calculateWithLifeEvents } from '../../../utils/calculations';
import { analyzeFIREPlan } from '../../../utils/analysis';
import type { LifeEvent } from '../../../types/lifeEvents';

export function useCalculations(
  inputs: FIRECalculation,
  lifeEvents: { events: LifeEvent[]; enabled: boolean }
) {
  return useMemo(() => {
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
      fireNumber,
      yearsToFI,
      projectionData,
      analysis
    };
  }, [inputs, lifeEvents]);
}