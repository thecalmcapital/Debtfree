import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEO } from '../components/SEO';

export const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const siteUrl = "https://debtfreecalc.github.io";
  const articleUrl = `${siteUrl}/#/blog/${post.slug}`;
  const imageUrl = "https://placehold.co/1200x630/0ea5e9/ffffff?text=" + encodeURIComponent(post.title);

  // Schema.org Article Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": [imageUrl],
    "datePublished": post.date,
    "dateModified": post.date,
    "keywords": post.keywords.join(", "),
    "author": [{
      "@type": "Organization",
      "name": "DebtFreeCalc Editorial",
      "url": siteUrl
    }],
    "publisher": {
      "@type": "Organization",
      "name": "DebtFreeCalc",
      "logo": {
        "@type": "ImageObject",
        "url": "https://placehold.co/100x100/0ea5e9/ffffff?text=DFC"
      }
    },
    "description": post.metaDescription,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": articleUrl
    }
  };

  // Schema.org Breadcrumb Structured Data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": siteUrl
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": `${siteUrl}/#/blog`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": post.title,
      "item": articleUrl
    }]
  };

  // Combine schemas
  const structuredData = [articleSchema, breadcrumbSchema];

  return (
    <article className="bg-white min-h-screen">
      <SEO 
        title={post.title} 
        description={post.metaDescription} 
        keywords={post.keywords.join(', ')}
        type="article"
        image={imageUrl}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
        
        <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-flex items-center rounded-full bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-400 ring-1 ring-inset ring-brand-500/20">
              {post.category}
            </span>
            <time className="text-sm text-slate-400" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl font-serif leading-tight">
            {post.title}
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-slate-300 font-light max-w-2xl mx-auto">
            {post.excerpt}
          </p>

          <div className="mt-10 flex justify-center">
             <div className="flex items-center gap-x-3">
               <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-xs border-2 border-slate-600">
                  DFC
               </div>
               <div className="text-left">
                 <p className="text-sm font-semibold text-white">DebtFreeCalc Editorial</p>
                 <p className="text-xs text-slate-400">8 min read</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-t-3xl p-8 sm:p-12 shadow-2xl border border-slate-100">
          <div className="prose prose-lg prose-slate prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-8 prose-li:text-slate-600 prose-strong:text-brand-700 prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl max-w-none">
            {/* Breadcrumb Visual */}
            <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-slate-400 hover:text-brand-600 transition-colors">Home</Link>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-slate-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <Link to="/blog" className="text-slate-400 hover:text-brand-600 transition-colors">Blog</Link>
                  </div>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 text-slate-400 mx-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    <span className="text-slate-800 font-medium truncate max-w-[150px]">{post.title}</span>
                  </div>
                </li>
              </ol>
            </nav>

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            
            <hr className="my-12 border-slate-200" />
            
            <div className="bg-brand-50 rounded-2xl p-8 text-center not-prose border border-brand-100 shadow-inner">
               <h3 className="text-2xl font-bold text-brand-900 mb-3 font-serif">Put this advice into action</h3>
               <p className="mb-6 text-brand-700 max-w-lg mx-auto leading-relaxed">
                 Don't let this be just another article you read. Calculate your exact debt-free date right now.
               </p>
               <Link to="/" className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-8 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-500 hover:shadow-brand-500/30 transition-all duration-200 transform hover:-translate-y-1">
                 Start Your Calculator
                 <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
               </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer for bottom */}
      <div className="h-24 bg-white"></div>
    </article>
  );
};