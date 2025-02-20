
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

export * from './calculations';
