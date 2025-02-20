
export function analyzeFIREPlan(
  currentAge: number,
  targetRetirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualIncome: number,
  yearsToFI: number,
  fireNumber: number
): {
  achievable: boolean;
  actualRetirementAge: number;
  shortfall: number;
  savingsRate: number;
  recommendations: string[];
} {
  const savingsRate = (monthlyContribution * 12) / annualIncome * 100;
  const achievable = yearsToFI <= (targetRetirementAge - currentAge);
  const actualRetirementAge = currentAge + yearsToFI;
  const shortfall = achievable ? 0 : fireNumber - (currentSavings + monthlyContribution * 12 * (targetRetirementAge - currentAge));

  const recommendations = [];
  if (!achievable) {
    recommendations.push("Consider increasing your monthly contributions");
    recommendations.push("Look for ways to reduce your annual expenses");
    if (savingsRate < 20) {
      recommendations.push("Try to increase your savings rate to at least 20%");
    }
  }
  if (savingsRate > 50) {
    recommendations.push("Your savings rate is very high - ensure you're maintaining a good work-life balance");
  }

  return {
    achievable,
    actualRetirementAge,
    shortfall,
    savingsRate,
    recommendations
  };
}
