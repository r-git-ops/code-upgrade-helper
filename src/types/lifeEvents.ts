
export interface LifeEvent {
  name: string;
  age: number;
  cost: number;
  recurring: boolean;
  frequency?: 'monthly' | 'yearly';
  inflationAdjusted: boolean;
  category?: string;
}
