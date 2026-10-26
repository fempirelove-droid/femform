import { useEffect } from 'react';

type SEOProps = {
  title: string;
  description?: string;
  image?: string;
  type?: string;
  jsonLd?: object | object[];
  canonical?: string;
};

export function useSEO({ title, description, image, type = 'website', jsonLd, canonical }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const fullUrl = canonical
      ? `https://fempire.love${canonical}`
      : `https://fempire.love${window.location.pathname}`;

    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', fullUrl);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:card', 'summary_large_image');

    if (image) {
      setMeta('property', 'og:image', image);
      setMeta('name', 'twitter:image', image);
    }

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', fullUrl);

    const existing = document.getElementById('structured-data');
    if (existing) existing.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'structured-data';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd]);
      document.head.appendChild(script);
    }

    return () => {
      const el = document.getElementById('structured-data');
      if (el) el.remove();
    };
  }, [title, description, image, type, jsonLd, canonical]);
}
