import React from 'react';
import { SEO } from '../components/SEO';

export const OffersPage: React.FC = () => {
  const offers = [
    {
      id: 1,
      name: 'SoFi Personal Loans',
      rate: '8.99% - 25.81%',
      aprLabel: 'APR',
      description: 'Award-winning lender. Best for high credit scores. No hidden fees and unemployment protection included.',
      logo: 'S',
      color: 'bg-indigo-600',
      tag: 'Best Overall',
      link: '#'
    },
    {
      id: 2,
      name: 'LightStream',
      rate: '7.49% - 21.49%',
      aprLabel: 'APR with AutoPay',
      description: 'Rate beat program available. Funding as soon as the same day. Best for large consolidation amounts.',
      logo: 'L',
      color: 'bg-emerald-600',
      tag: 'Lowest Rates',
      link: '#'
    },
    {
      id: 3,
      name: 'Upstart',
      rate: '6.40% - 35.99%',
      aprLabel: 'APR',
      description: 'AI-powered approval. Ideal for borrowers with limited credit history or lower scores. Fast funding.',
      logo: 'U',
      color: 'bg-violet-600',
      tag: 'Best for Fair Credit',
      link: '#'
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-16">
      <SEO title="Debt Consolidation Offers" description="Compare top debt consolidation loans to lower your interest rates and pay off debt faster." />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-bold tracking-wide uppercase text-sm">Marketplace</span>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-5xl font-serif">
            Refinance & Save
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto font-light">
            Stop paying 20%+ interest to credit card companies. Compare pre-screened offers from top lenders.
          </p>
        </div>

        <div className="space-y-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 hover:shadow-lg transition-all duration-300 relative overflow-hidden group">
              {/* Badge */}
              <div className="absolute top-0 right-0 bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-bl-lg border-b border-l border-slate-200">
                {offer.tag}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                {/* Logo */}
                <div className={`w-16 h-16 flex-shrink-0 ${offer.color} rounded-xl flex items-center justify-center text-white text-3xl font-serif shadow-md`}>
                  {offer.logo}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                    {offer.name}
                  </h3>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-slate-900">{offer.rate}</span>
                    <span className="text-xs text-slate-500 font-medium uppercase">{offer.aprLabel}</span>
                  </div>
                  <p className="text-slate-500 mt-3 text-sm leading-relaxed max-w-lg">
                    {offer.description}
                  </p>
                </div>

                {/* Action */}
                <div className="w-full sm:w-auto flex-shrink-0 flex flex-col gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100 mt-4 sm:mt-0">
                  <a 
                    href={offer.link} 
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-600 hover:bg-brand-500 shadow-sm hover:shadow-md transition-all w-full sm:w-40 text-center"
                    onClick={(e) => { e.preventDefault(); alert("This is a demo link."); }}
                  >
                    View Offer
                  </a>
                  <p className="text-[10px] text-slate-400 text-center">
                    Soft pull • Won't affect score
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl text-xs text-slate-400 border border-slate-100 text-center leading-relaxed">
          <p className="mb-2 font-bold text-slate-500">Advertiser Disclosure</p>
          <p>
            The offers that appear on this site are from companies that compensate us. This compensation may impact how and where products appear on this site (including, for example, the order in which they appear). This site does not include all financial companies or all available financial offers. Loan approval is subject to credit approval and lender terms. Rates and terms are subject to change without notice.
          </p>
        </div>
      </div>
    </div>
  );
};