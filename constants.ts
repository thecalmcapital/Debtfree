import { Debt } from './types';

export const DEFAULT_DEBTS: Debt[] = [
  {
    id: '1',
    name: 'Credit Card A',
    balance: 5000,
    rate: 18.99,
    minPayment: 150,
  },
  {
    id: '2',
    name: 'Student Loan',
    balance: 12000,
    rate: 6.5,
    minPayment: 200,
  },
  {
    id: '3',
    name: 'Personal Loan',
    balance: 2500,
    rate: 12.0,
    minPayment: 100,
  },
];