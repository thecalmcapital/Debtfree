import React from 'react';
import { MonthlyData, Debt } from '../types';

interface AmortizationTableProps {
  data: MonthlyData[];
  debts: Debt[];
}

export const AmortizationTable: React.FC<AmortizationTableProps> = ({ data, debts }) => {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(val);
  };

  const downloadCSV = () => {
    const headers = ['Month', 'Date', 'Total Balance', 'Total Interest Paid', ...debts.map(d => d.name)];
    const rows = data.map(row => [
      row.month,
      row.date,
      row.totalBalance.toFixed(2),
      row.totalInterestPaid.toFixed(2),
      ...debts.map(d => (row.debts[d.id] || 0).toFixed(2))
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "debt_payoff_plan.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-sm font-semibold text-slate-700">Detailed Schedule</h3>
        <button 
          onClick={downloadCSV}
          className="text-xs font-medium text-brand-600 hover:text-brand-800 flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Download CSV
        </button>
      </div>
      
      <div className="flex-1 overflow-auto border border-slate-200 rounded-lg shadow-sm bg-white">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-20">Month</th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider w-32">Date</th>
              <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Total Bal</th>
              {debts.map(debt => (
                <th key={debt.id} scope="col" className="px-4 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {debt.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {data.map((row) => (
              <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm text-slate-900 font-medium">{row.month}</td>
                <td className="px-4 py-3 text-sm text-slate-500">{new Date(row.date).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</td>
                <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">{formatCurrency(row.totalBalance)}</td>
                {debts.map(debt => {
                  const balance = row.debts[debt.id] || 0;
                  const isPaidOff = balance === 0;
                  return (
                    <td key={debt.id} className={`px-4 py-3 text-sm text-right ${isPaidOff ? 'text-slate-300' : 'text-slate-600'}`}>
                      {isPaidOff ? '-' : formatCurrency(balance)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-400 mt-2 text-right">Scroll horizontal to view all debts</p>
    </div>
  );
};