import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  structuredData?: object;
  type?: 'website' | 'article';
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  keywords, 
  structuredData,
  type = 'website',
  image = 'https://placehold.co/1200x630/0ea5e9/ffffff?text=Debt+Free+Calculator'
}) => {
  const location = useLocation();
  const siteUrl = 'https://debtfreecalc.github.io';
  // Construct canonical URL based on current hash path
  const canonicalUrl = `${siteUrl}/#${location.pathname}`;

  useEffect(() => {
    // 1. Update Title
    document.title = `${title} | DebtFree Calculator`;
    
    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // 3. Update Keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // 4. Update Open Graph
    const updateMeta = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    updateMeta('og:title', title);
    updateMeta('og:description', description);
    updateMeta('og:url', canonicalUrl);
    updateMeta('og:type', type);
    updateMeta('og:image', image);

    // 5. Update Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonicalUrl);

    // 6. Inject Structured Data (JSON-LD)
    if (structuredData) {
      const scriptId = 'json-ld-structured-data';
      // Remove existing script to avoid duplicates on route change
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      return () => {
        const s = document.getElementById(scriptId);
        if (s) s.remove();
      };
    }
  }, [title, description, keywords, structuredData, canonicalUrl, type, image]);

  return null;
};