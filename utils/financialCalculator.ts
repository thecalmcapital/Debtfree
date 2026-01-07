import { Debt, PayoffResult, Strategy, MonthlyData } from '../types';

export const calculatePayoff = (
  debts: Debt[],
  strategy: Strategy,
  extraMonthlyPayment: number
): PayoffResult => {
  // Deep copy to avoid mutating original state during simulation
  let currentDebts = debts.map(d => ({ ...d }));
  const monthlyData: MonthlyData[] = [];
  let totalInterest = 0;
  let months = 0;
  const startDate = new Date();

  // Sort based on strategy
  const sortDebts = (ds: typeof currentDebts) => {
    return ds.sort((a, b) => {
      // If a debt is fully paid (balance <= 0), push it to the end
      if (a.balance <= 0.01 && b.balance > 0.01) return 1;
      if (b.balance <= 0.01 && a.balance > 0.01) return -1;
      if (a.balance <= 0.01 && b.balance <= 0.01) return 0;

      if (strategy === Strategy.SNOWBALL) {
        return a.balance - b.balance; // Smallest balance first
      } else {
        return b.rate - a.rate; // Highest rate first
      }
    });
  };

  // Safety break to prevent infinite loops (e.g. 50 years)
  const MAX_MONTHS = 600; 

  while (currentDebts.some(d => d.balance > 0.01) && months < MAX_MONTHS) {
    months++;
    let monthlyTotalInterest = 0;
    let totalAvailableBudget = extraMonthlyPayment;
    
    // 1. Accrue Interest and Calculate Mins
    currentDebts.forEach(debt => {
      if (debt.balance > 0.01) {
        const monthlyRate = debt.rate / 100 / 12;
        const interest = debt.balance * monthlyRate;
        debt.balance += interest;
        monthlyTotalInterest += interest;
        totalInterest += interest;

        // Add min payment to budget bucket, we will redistribute it
        // Actually, in Snowball/Avalanche, you pay min on ALL, then extra on target.
        // So `totalAvailableBudget` = extra + sum(minPayments)
        // Then we subtract minPayments as we pay them.
        // If a debt is paid off, its min payment stays in the `totalAvailableBudget` (Snowball effect).
        
        // Wait, strictly speaking:
        // You MUST pay min payment on active debts.
        // If a debt is paid off, you don't pay its min payment anymore, 
        // BUT that money is now "freed up" to be "extra" for the next debt.
        // So the Total Monthly Budget for Debt should be constant: Sum(Initial Min Payments) + Extra.
        // This is the classic definition of Snowball.
      }
    });

    // We need the initial minimum payments sum to keep the "Snowball" rolling
    // However, the inputs might change. 
    // Simplified model: 
    // 1. Pay minimums on all active debts.
    // 2. Any leftover money from the "Budget" goes to the top priority debt.
    // Budget = Sum of ALL original minimum payments + Extra Payment.
    
    // Let's assume the User commits to paying `Sum(Current Min Payments) + Extra` *at the start*.
    // As debts die, that total amount stays constant, effectively rolling over.
    const baseBudget = debts.reduce((sum, d) => sum + d.minPayment, 0) + extraMonthlyPayment;
    let remainingBudget = baseBudget;

    // 2. Pay Minimums
    currentDebts.forEach(debt => {
      if (debt.balance > 0.01) {
        let payment = debt.minPayment;
        
        // If min payment is more than balance, just pay balance
        if (payment > debt.balance) {
          payment = debt.balance;
        }

        debt.balance -= payment;
        remainingBudget -= payment;
      }
    });

    // 3. Apply Extra (Avalanche/Snowball)
    if (remainingBudget > 0) {
      sortDebts(currentDebts);
      // Target the first active debt
      const targetDebt = currentDebts.find(d => d.balance > 0.01);
      if (targetDebt) {
        // Apply all remaining budget
        targetDebt.balance -= remainingBudget;
        if (targetDebt.balance < 0) {
          // If we overpaid, arguably we could apply to next debt, 
          // but for monthly granularity, let's just say it's paid off.
          // Realistically, that small overflow goes to next debt.
          const overflow = Math.abs(targetDebt.balance);
          targetDebt.balance = 0;
          
          // Apply overflow to next
          const nextDebt = currentDebts.find(d => d.balance > 0.01 && d.id !== targetDebt.id);
          if (nextDebt) {
            nextDebt.balance -= overflow;
             if (nextDebt.balance < 0) nextDebt.balance = 0;
          }
        }
      }
    }

    // Snapshot for chart
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + months);
    
    const snapshot: MonthlyData = {
      month: months,
      date: date.toISOString().split('T')[0],
      totalBalance: Math.max(0, currentDebts.reduce((sum, d) => sum + d.balance, 0)),
      totalInterestPaid: totalInterest,
      debts: currentDebts.reduce((acc, d) => ({ ...acc, [d.id]: Math.max(0, d.balance) }), {})
    };
    monthlyData.push(snapshot);
  }

  const payoffDate = new Date(startDate);
  payoffDate.setMonth(startDate.getMonth() + months);

  return {
    strategy,
    totalInterest,
    monthsToPayoff: months,
    payoffDate,
    monthlyData,
    error: months >= MAX_MONTHS ? "Debts may not be payable with current parameters (interest > payments)" : undefined
  };
};