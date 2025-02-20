
export function calculateFIRENumber(
  annualExpenses: number,
  withdrawalRate: number,
  currentAge: number,
  retirementAge: number,
  inflationRate: number,
  expenseGrowthRate: number
): number {
  const years = retirementAge - currentAge;
  const combinedRate = (1 + inflationRate / 100) * (1 + expenseGrowthRate / 100) - 1;
  return (annualExpenses * Math.pow(1 + combinedRate, years)) / (withdrawalRate / 100);
}

export function calculateYearsToFI(
  currentSavings: number,
  monthlyContribution: number,
  expectedReturn: number,
  targetAmount: number,
  inflationRate: number,
  salaryGrowthRate: number
): number {
  let years = 0;
  let balance = currentSavings;
  const monthlyRate = expectedReturn / 12 / 100;
  const monthlyInflationRate = inflationRate / 12 / 100;
  const monthlySalaryGrowthRate = salaryGrowthRate / 12 / 100;

  while (balance < targetAmount && years < 100) {
    balance *= (1 + monthlyRate);
    balance += monthlyContribution * Math.pow(1 + monthlySalaryGrowthRate, years * 12);
    years += 1/12;
  }

  return Math.round(years * 10) / 10;
}

export function calculateProjection(
  currentSavings: number,
  monthlyContribution: number,
  expectedReturn: number,
  fireNumber: number,
  currentAge: number,
  retirementAge: number,
  annualExpenses: number,
  inflationRate: number,
  salaryGrowthRate: number,
  expenseGrowthRate: number
): Array<{ age: number; balance: number; expenses: number }> {
  const projection = [];
  let balance = currentSavings;
  const monthlyRate = expectedReturn / 12 / 100;
  const monthlyInflationRate = inflationRate / 12 / 100;
  const monthlySalaryGrowthRate = salaryGrowthRate / 12 / 100;
  const monthlyExpenseGrowthRate = expenseGrowthRate / 12 / 100;

  for (let age = currentAge; age <= retirementAge; age++) {
    const expenses = annualExpenses * Math.pow(1 + monthlyExpenseGrowthRate + monthlyInflationRate, (age - currentAge) * 12);
    projection.push({ age, balance, expenses });
    balance *= Math.pow(1 + monthlyRate, 12);
    balance += monthlyContribution * 12 * Math.pow(1 + monthlySalaryGrowthRate, (age - currentAge) * 12);
  }

  return projection;
}

export function calculateWithLifeEvents(
  projectionData: Array<{ age: number; balance: number; expenses: number }>,
  events: Array<{ age: number; cost: number; recurring: boolean; frequency?: 'monthly' | 'yearly' }>,
  currentAge: number
): Array<{ age: number; balance: number; expenses: number }> {
  return projectionData.map(point => {
    const relevantEvents = events.filter(event => event.age <= point.age);
    const eventCosts = relevantEvents.reduce((total, event) => {
      if (event.recurring) {
        const yearsSinceEvent = point.age - event.age;
        return total + (event.cost * (event.frequency === 'monthly' ? 12 : 1) * (yearsSinceEvent + 1));
      }
      return total + event.cost;
    }, 0);
    
    return {
      ...point,
      balance: point.balance - eventCosts
    };
  });
}
