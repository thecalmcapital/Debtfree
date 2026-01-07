import React, { useState, useEffect, useMemo } from 'react';
import { Debt, Strategy } from '../types';
import { DEFAULT_DEBTS } from '../constants';
import { calculatePayoff } from '../utils/financialCalculator';
import { DebtInput } from '../components/DebtInput';
import { AmortizationTable } from '../components/AmortizationTable';
import { ResultsChart } from '../components/ResultsChart';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const CalculatorPage: React.FC = () => {
  const [debts, setDebts] = useState<Debt[]>(() => {
    const saved = localStorage.getItem('debt_calculator_debts');
    return saved ? JSON.parse(saved) : DEFAULT_DEBTS;
  });

  const [extraPayment, setExtraPayment] = useState<number>(100);
  const [strategy, setStrategy] = useState<Strategy>(Strategy.SNOWBALL);
  const [activeTab, setActiveTab] = useState<'chart' | 'table'>('chart');

  useEffect(() => {
    localStorage.setItem('debt_calculator_debts', JSON.stringify(debts));
  }, [debts]);

  const snowballResult = useMemo(() => calculatePayoff(debts, Strategy.SNOWBALL, extraPayment), [debts, extraPayment]);
  const avalancheResult = useMemo(() => calculatePayoff(debts, Strategy.AVALANCHE, extraPayment), [debts, extraPayment]);

  const currentResult = strategy === Strategy.SNOWBALL ? snowballResult : avalancheResult;
  
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
  const formatDate = (date: Date) => date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Calculate potential savings by switching strategies
  const otherResult = strategy === Strategy.SNOWBALL ? avalancheResult : snowballResult;
  const savingsBySwitching = currentResult.totalInterest - otherResult.totalInterest;
  const betterStrategyName = strategy === Strategy.SNOWBALL ? 'Avalanche' : 'Snowball';

  const totalDebt = debts.reduce((acc, d) => acc + d.balance, 0);
  const totalMinPayment = debts.reduce((acc, d) => acc + d.minPayment, 0);

  // Schema: Software Application + FAQ
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Debt Payoff Calculator",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Web Browser",
        "description": "A professional financial tool to compare Debt Snowball vs. Debt Avalanche payoff strategies.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the Snowball Method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Snowball Method involves paying off debts from smallest balance to largest, regardless of interest rate. This creates psychological momentum."
            }
          },
          {
            "@type": "Question",
            "name": "What is the Avalanche Method?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Avalanche Method focuses on paying off debts with the highest interest rates first. This strategy saves the most money on interest over time."
            }
          },
          {
            "@type": "Question",
            "name": "Is this debt calculator secure?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. This calculator runs 100% on your device (client-side). No financial data is sent to any server."
            }
          }
        ]
      }
    ]
  };

  const shareTool = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Debt Payoff Calculator',
        text: 'I just calculated my debt-free date! Check it out:',
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert("Copy this URL to share: " + window.location.href);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SEO 
        title="Debt Payoff Calculator | Snowball vs Avalanche" 
        description="Free, secure debt calculator. Compare Snowball vs Avalanche strategies to see when you will be debt-free. Saves automatically to your browser." 
        keywords="debt snowball calculator, debt avalanche calculator, credit card payoff, loan payoff, financial freedom tool, debt free date"
        structuredData={calculatorSchema}
      />

      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Debt Payoff Calculator
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
          Visualize your path to financial freedom. Compare strategies and save on interest.
        </p>
      </div>

      {/* Summary Dashboard - Professional Grade */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Balance</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{currency.format(totalDebt)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Debt Free Date</p>
           <p className="text-2xl font-bold text-brand-600 mt-1">
             {currentResult.error ? '---' : formatDate(currentResult.payoffDate)}
           </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Interest</p>
           <p className="text-2xl font-bold text-slate-900 mt-1">{currency.format(currentResult.totalInterest)}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 opacity-10">
              <svg className="w-16 h-16 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path></svg>
           </div>
           <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time to Payoff</p>
           <p className="text-2xl font-bold text-slate-900 mt-1">{currentResult.monthsToPayoff} months</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Inputs */}
        <div className="xl:col-span-5 space-y-6">
          <DebtInput debts={debts} onChange={setDebts} />
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Strategy</h3>
            
            <div className="mb-8">
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="extra-payment-slider" className="block text-sm font-medium text-slate-700">
                  Monthly Extra Payment
                </label>
                <span className="text-sm font-semibold text-brand-600">{currency.format(extraPayment)}</span>
              </div>
              <input
                  id="extra-payment-slider"
                  type="range"
                  min="0"
                  max="5000"
                  step="25"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 mb-2"
                  aria-label="Adjust monthly extra payment"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>$0</span>
                <span>$5,000+</span>
              </div>
              <p className="text-xs text-slate-500 mt-3">
                You are paying <span className="font-semibold text-slate-700">{currency.format(totalMinPayment + extraPayment)}</span> per month total.
              </p>
            </div>

            {/* Strategy Toggle */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setStrategy(Strategy.SNOWBALL)}
                className={`w-full flex items-center p-4 border rounded-xl transition-all ${
                  strategy === Strategy.SNOWBALL
                    ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                    : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50'
                }`}
                aria-pressed={strategy === Strategy.SNOWBALL}
              >
                <div className={`p-2 rounded-full mr-4 ${strategy === Strategy.SNOWBALL ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                </div>
                <div className="text-left">
                  <div className={`font-bold ${strategy === Strategy.SNOWBALL ? 'text-brand-900' : 'text-slate-700'}`}>Snowball Method</div>
                  <div className="text-sm text-slate-500">Pay smallest balance first. Best for motivation.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setStrategy(Strategy.AVALANCHE)}
                className={`w-full flex items-center p-4 border rounded-xl transition-all ${
                  strategy === Strategy.AVALANCHE
                    ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-500'
                    : 'border-slate-200 hover:border-brand-200 hover:bg-slate-50'
                }`}
                aria-pressed={strategy === Strategy.AVALANCHE}
              >
                <div className={`p-2 rounded-full mr-4 ${strategy === Strategy.AVALANCHE ? 'bg-brand-100 text-brand-600' : 'bg-slate-100 text-slate-400'}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                </div>
                <div className="text-left">
                  <div className={`font-bold ${strategy === Strategy.AVALANCHE ? 'text-brand-900' : 'text-slate-700'}`}>Avalanche Method</div>
                  <div className="text-sm text-slate-500">Pay highest interest first. Best for savings.</div>
                </div>
              </button>
            </div>
            
            {savingsBySwitching > 50 && (
              <div className="mt-4 p-3 bg-emerald-50 text-emerald-800 text-sm rounded-lg border border-emerald-100 flex items-start">
                 <svg className="w-5 h-5 mr-2 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                 <span>
                   <strong>Pro Tip:</strong> Switching to the {betterStrategyName} method would save you an additional <strong>{currency.format(savingsBySwitching)}</strong>.
                 </span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Results & Visualization */}
        <div className="xl:col-span-7 space-y-6">
          
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden min-h-[500px] flex flex-col">
             <div className="border-b border-slate-200">
               <nav className="flex -mb-px">
                 <button
                   onClick={() => setActiveTab('chart')}
                   className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                     activeTab === 'chart' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                   }`}
                 >
                   Visual Chart
                 </button>
                 <button
                   onClick={() => setActiveTab('table')}
                   className={`flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm transition-colors ${
                     activeTab === 'table' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                   }`}
                 >
                   Amortization Table
                 </button>
               </nav>
             </div>

             <div className="p-6 flex-1 flex flex-col">
               {currentResult.error ? (
                 <div className="flex flex-col items-center justify-center h-64 text-red-500">
                   <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                   <p className="font-medium">Calculation Error</p>
                   <p className="text-sm text-slate-500 mt-1">{currentResult.error}</p>
                 </div>
               ) : (
                 activeTab === 'chart' ? (
                    <>
                      <div className="mb-4 text-center">
                        <p className="text-sm text-slate-500">Projected Balance Over Time</p>
                      </div>
                      <ResultsChart 
                        snowballResult={snowballResult} 
                        avalancheResult={avalancheResult}
                        currentMethod={strategy}
                      />
                      <div className="mt-4 text-xs text-slate-400 text-center">
                        *Chart compares both strategies. Shaded area represents your current selection.
                      </div>
                    </>
                 ) : (
                    <AmortizationTable data={currentResult.monthlyData} debts={debts} />
                 )
               )}
             </div>
          </div>

          {/* Ad Space / Share Container - Placeholder for AdSense */}
          <div className="bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 flex flex-col items-center justify-center text-center">
             <div id="ad-slot-1" className="w-full">
                {/* Google AdSense or Other Ad Networks can go here */}
                <h4 className="font-bold text-slate-800 text-lg mb-2">Help your friends get out of debt</h4>
                <p className="text-slate-500 text-sm mb-4 max-w-md mx-auto">
                   This tool is free and private. If you found it helpful, please share it with others who might benefit from financial clarity.
                </p>
                <button 
                  onClick={shareTool}
                  className="inline-flex items-center justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-600 hover:bg-brand-700 shadow-sm transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                  Share Calculator
                </button>
             </div>
          </div>
        </div>
      </div>
      
      {/* Educational SEO Content - FAQ Section */}
      <div className="mt-20 max-w-4xl mx-auto border-t border-slate-200 pt-10">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Common Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-10 mb-12">
           <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                 <span className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-2 text-sm">1</span>
                 The Snowball Method
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                This strategy prioritizes <strong>psychological wins</strong>. You organize your debts from smallest balance to largest. By paying off the small ones quickly, you free up cash flow (the "snowball") to tackle the larger ones. This momentum is powerful for staying motivated.
              </p>
              <Link to="/blog/snowball-method-explained" className="text-brand-600 text-sm font-semibold hover:underline">
                Read the full guide on the Snowball Method &rarr;
              </Link>
           </div>
           <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3 flex items-center">
                 <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mr-2 text-sm">2</span>
                 The Avalanche Method
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm mb-3">
                This strategy is <strong>mathematically optimal</strong>. You list debts from highest interest rate to lowest. By eliminating the most expensive debt first, you pay less total interest over the life of your loans, often finishing months earlier than the snowball method.
              </p>
              <Link to="/blog/avalanche-method-explained" className="text-brand-600 text-sm font-semibold hover:underline">
                Read the full guide on the Avalanche Method &rarr;
              </Link>
           </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Frequently Asked Questions</h3>
          
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-2">Is this calculator secure?</h4>
            <p className="text-slate-600 text-sm">Yes. We use local storage, meaning your data never leaves your device. We do not transmit your financial information to any server.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
            <h4 className="font-semibold text-slate-900 mb-2">Should I include my mortgage?</h4>
            <p className="text-slate-600 text-sm">Generally, no. The Debt Snowball and Avalanche methods are designed for consumer debt (credit cards, personal loans, car loans, student loans). Your mortgage is usually a long-term secured debt that shouldn't be included in this specific payoff plan unless you are completely consumer debt-free.</p>
          </div>
        </div>

        <div className="mt-10 bg-slate-50 p-6 rounded-lg text-sm text-slate-500 text-center">
           <p className="font-medium text-slate-700 mb-2">Why trust this calculator?</p>
           This tool runs entirely in your browser. Unlike other financial websites, we do not send your sensitive financial data to any server. Your privacy is paramount.
        </div>
      </div>
    </div>
  );
};