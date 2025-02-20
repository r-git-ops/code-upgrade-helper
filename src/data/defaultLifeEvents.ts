
import type { LifeEvent } from '../types/lifeEvents';

export const defaultLifeEvents: LifeEvent[] = [
  {
    name: "House Purchase",
    age: 35,
    cost: 5000000,
    recurring: false,
    inflationAdjusted: true,
    category: "housing"
  },
  {
    name: "Child's Education",
    age: 40,
    cost: 200000,
    recurring: true,
    frequency: "yearly",
    inflationAdjusted: true,
    category: "education"
  }
];
