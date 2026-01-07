import React from 'react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title="Terms of Service" description="Terms and conditions for using DebtFreeCalc." />
      
      <div className="prose prose-lg prose-slate mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Terms of Service</h1>
        
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using DebtFreeCalc, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Disclaimer</h2>
        <p>
          <strong>This tool is for educational and informational purposes only.</strong> It is not intended to provide legal, investment, or financial advice. We cannot guarantee the accuracy of the calculations as they depend on the data you provide and simplified mathematical models.
        </p>
        <p>
          You should consult with a qualified financial advisor before making any major financial decisions.
        </p>

        <h2>3. Limitation of Liability</h2>
        <p>
          In no event shall DebtFreeCalc be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
        </p>

        <h2>4. Governing Law</h2>
        <p>
          Any claim relating to DebtFreeCalc's website shall be governed by the laws of the State of Delaware without regard to its conflict of law provisions.
        </p>
      </div>
    </div>
  );
};