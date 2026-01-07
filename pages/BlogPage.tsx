import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO } from '../components/SEO';

export const BlogPage: React.FC = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "DebtFreeCalc Financial Journal",
    "description": "Expert advice on getting out of debt, budgeting, and building wealth.",
    "url": "https://debtfreecalc.github.io/#/blog",
    "blogPost": BLOG_POSTS.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://debtfreecalc.github.io/#/blog/${post.slug}`,
      "author": {
        "@type": "Organization",
        "name": "DebtFreeCalc Editorial"
      }
    }))
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <SEO 
        title="Financial Freedom Blog" 
        description="Expert advice on getting out of debt, budgeting, and building wealth. Read our latest guides on Snowball vs Avalanche methods." 
        keywords="personal finance blog, debt freedom advice, money management tips, wealth building, financial literacy"
        structuredData={structuredData}
      />
      
      {/* Premium Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-brand-600 font-semibold tracking-wide uppercase text-sm mb-3">Financial Intelligence</p>
          <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl font-serif tracking-tight mb-6">
            The Journal
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 font-light leading-relaxed">
            Strategies, deep dives, and psychological frameworks to help you master your money and destroy debt.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-3 md:grid-cols-2">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="flex flex-col group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 border border-slate-100 overflow-hidden transform hover:-translate-y-1">
              <div className="p-8 flex flex-col h-full">
                <div className="flex items-center gap-x-3 text-xs mb-4">
                  <span className="relative z-10 rounded-full bg-slate-50 px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100">
                    {post.category}
                  </span>
                  <time dateTime={post.date} className="text-slate-400">
                    {new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
                
                <div className="group relative">
                  <h3 className="mt-3 text-xl font-bold leading-7 text-slate-900 group-hover:text-brand-600 transition-colors font-serif">
                    <Link to={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-4 text-base leading-7 text-slate-600 line-clamp-3 font-light">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="mt-auto pt-6 flex items-center gap-x-4 border-t border-slate-50">
                   <div className="text-sm font-semibold leading-6 text-brand-600 flex items-center">
                     Read Article <span className="ml-1 transition-transform group-hover:translate-x-1">&rarr;</span>
                   </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};