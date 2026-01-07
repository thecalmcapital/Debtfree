import React from 'react';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DebtFreeCalc",
    "url": "https://debtfreecalc.github.io",
    "logo": "https://placehold.co/100x100/0ea5e9/ffffff?text=DFC",
    "description": "DebtFreeCalc provides professional financial tools to help individuals calculate debt payoff dates using Snowball and Avalanche methods.",
    "sameAs": [
      "https://twitter.com/debtfreecalc",
      "https://facebook.com/debtfreecalc"
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SEO 
        title="About Us" 
        description="Learn more about the mission behind DebtFreeCalc and our commitment to financial freedom." 
        structuredData={structuredData}
      />
      
      <div className="prose prose-lg prose-slate mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-6">About DebtFreeCalc</h1>
        
        <p>
          Welcome to DebtFreeCalc. Our mission is simple: <strong>Empower individuals to break free from the chains of debt through clarity and strategy.</strong>
        </p>

        <p>
          We believe that personal finance is 80% behavior and 20% head knowledge. That's why we've built tools that not only do the math for you but also help you visualize your progress, keeping you motivated on the long road to financial freedom.
        </p>

        <h2>Why We Built This</h2>
        <p>
          Most debt calculators are cluttered, confusing, or require you to hand over your email address just to see a result. We wanted to build something different:
        </p>
        <ul>
          <li><strong>Private:</strong> All calculations happen right in your browser. Your financial data never touches our servers.</li>
          <li><strong>Simple:</strong> No complex jargon. Just clear steps to becoming debt-free.</li>
          <li><strong>Free:</strong> No paywalls. No subscriptions. Just help.</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          Have a suggestion? Found a bug? We'd love to hear from you. Reach out to us at <a href="mailto:finclarityhqofficial@gmail.com">finclarityhqofficial@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};