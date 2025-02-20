
export interface MonthlyExpenses {
  housing: number;
  utilities: number;
  groceries: number;
  transportation: number;
  healthcare: number;
  insurance: number;
  entertainment: number;
  shopping: number;
  miscellaneous: number;
}

export interface IncomeDetails {
  primarySalary: number;
  bonuses: number;
  rentalIncome: number;
  otherIncome: number;
}

export interface InvestmentAllocation {
  equityMutualFunds: number;
  stocks: number;
  ppf: number;
  epf: number;
  nps: number;
  fixedDeposits: number;
  gold: number;
  realEstate: number;
  cash: number;
}

export interface FIRECalculation {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  expectedReturn: number;
  annualExpenses: number;
  withdrawalRate: number;
  inflationRate: number;
  salaryGrowthRate: number;
  expenseGrowthRate: number;
  monthlyExpenses: MonthlyExpenses;
  incomeDetails: IncomeDetails;
  investmentAllocation: InvestmentAllocation;
}

export interface LifeEvent {
  name: string;
  age: number;
  cost: number;
  description?: string;
  category: 'milestone' | 'education' | 'health' | 'family' | 'lifestyle';
  priority: 'essential' | 'important' | 'optional';
  recurring: boolean;
  inflationAdjusted: boolean;
  frequency?: 'monthly' | 'yearly';
}

export interface FIREAnalysis {
  achievable: boolean;
  actualRetirementAge: number;
  shortfall: number;
  savingsRate: number;
  recommendations: string[];
}

export * from './calculations';
