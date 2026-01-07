import React from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO title="Privacy Policy" description="Read our privacy policy to understand how we protect your data." />
      
      <div className="prose prose-lg prose-slate mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mb-8">Last Updated: January 1, 2024</p>
        
        <h2>1. Data Collection</h2>
        <p>
          DebtFreeCalc is designed with privacy as a core principle. <strong>We do not collect, store, or transmit the financial data you enter into our calculator.</strong>
        </p>
        <p>
          All data regarding your debts, interest rates, and payments is stored locally on your device using your browser's LocalStorage. This means if you clear your browser cache, your data will be deleted.
        </p>

        <h2>2. Analytics</h2>
        <p>
          We may use anonymous analytics tools to understand how users interact with our website (e.g., which pages are visited most). These tools do not track personally identifiable information.
        </p>

        <h2>3. Third-Party Links</h2>
        <p>
          Our website may contain links to third-party websites (e.g., loan providers). We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies.
        </p>

        <h2>4. Changes to This Policy</h2>
        <p>
          We may update this privacy policy from time to time. Any changes will be posted on this page.
        </p>
      </div>
    </div>
  );
};