import React from 'react';
import { Debt } from '../types';

interface DebtInputProps {
  debts: Debt[];
  onChange: (debts: Debt[]) => void;
}

export const DebtInput: React.FC<DebtInputProps> = ({ debts, onChange }) => {
  const addDebt = () => {
    const newId = (Math.max(...debts.map(d => parseInt(d.id) || 0), 0) + 1).toString();
    onChange([
      ...debts,
      { id: newId, name: `Debt #${debts.length + 1}`, balance: 2000, rate: 15.0, minPayment: 50 }
    ]);
  };

  const removeDebt = (id: string) => {
    onChange(debts.filter(d => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string | number) => {
    onChange(debts.map(d => {
      if (d.id === id) {
        return { ...d, [field]: value };
      }
      return d;
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-gray-50 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Debt Portfolio</h2>
          <p className="text-xs text-slate-500">List all your current credit cards and loans</p>
        </div>
        <button
          onClick={addDebt}
          className="inline-flex items-center px-4 py-2 border border-brand-200 shadow-sm text-sm font-medium rounded-lg text-brand-700 bg-white hover:bg-brand-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
          aria-label="Add new debt"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          Add Liability
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {debts.map((debt, index) => (
          <div key={debt.id} className="p-4 sm:p-5 hover:bg-slate-50 transition-colors group">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-start sm:items-center">
              
              {/* Name */}
              <div className="sm:col-span-4">
                <label className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 sm:hidden">Name</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-400 sm:text-sm">#</span>
                  </div>
                  <input
                    type="text"
                    value={debt.name}
                    onChange={(e) => updateDebt(debt.id, 'name', e.target.value)}
                    className="block w-full pl-7 rounded-md border-slate-300 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 sm:text-sm border p-2 text-slate-900 transition-colors"
                    placeholder="e.g. Visa Card"
                    aria-label={`Name of debt ${index + 1}`}
                  />
                </div>
              </div>
              
              {/* Balance */}
              <div className="sm:col-span-3">
                <label className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 sm:hidden">Balance</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={debt.balance}
                    onChange={(e) => updateDebt(debt.id, 'balance', parseFloat(e.target.value) || 0)}
                    className="block w-full pl-7 rounded-md border-slate-300 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 sm:text-sm border p-2 font-medium text-slate-900 transition-colors"
                    placeholder="0.00"
                    aria-label={`Balance for ${debt.name}`}
                  />
                </div>
              </div>

              {/* Interest */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 sm:hidden">Rate %</label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={debt.rate}
                    onChange={(e) => updateDebt(debt.id, 'rate', parseFloat(e.target.value) || 0)}
                    className="block w-full pr-8 rounded-md border-slate-300 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 sm:text-sm border p-2 text-slate-900 transition-colors"
                    placeholder="0.0"
                    aria-label={`Interest rate for ${debt.name}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>

              {/* Min Payment */}
              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wide font-semibold text-slate-500 mb-1 sm:hidden">Min Pay</label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-slate-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={debt.minPayment}
                    onChange={(e) => updateDebt(debt.id, 'minPayment', parseFloat(e.target.value) || 0)}
                    className="block w-full pl-7 rounded-md border-slate-300 bg-slate-50 focus:bg-white focus:ring-brand-500 focus:border-brand-500 sm:text-sm border p-2 text-slate-900 transition-colors"
                    placeholder="0"
                    aria-label={`Minimum payment for ${debt.name}`}
                  />
                </div>
              </div>

              {/* Remove */}
              <div className="sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  onClick={() => removeDebt(debt.id)}
                  className={`text-slate-300 hover:text-red-500 p-2 transition-colors ${debts.length <= 1 ? 'invisible' : ''}`}
                  title="Remove Debt"
                  disabled={debts.length <= 1}
                  aria-label={`Remove ${debt.name}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </div>
            </div>
            
            {/* Warning if min payment too low */}
            {debt.balance > 0 && debt.minPayment < (debt.balance * (debt.rate / 100 / 12)) && (
               <div className="mt-2 text-xs text-red-600 flex items-center" role="alert">
                 <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                 Minimum payment is lower than monthly interest (${(debt.balance * (debt.rate / 100 / 12)).toFixed(2)})
               </div>
            )}
          </div>
        ))}
      </div>
      <div className="bg-gray-50 px-5 py-3 border-t border-slate-200">
         <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1">
            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            Data is stored locally in your browser and never shared.
         </p>
      </div>
    </div>
  );
};