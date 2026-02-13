import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
}

const BASE_URL = 'https://www.riyanhealth.com';

const PAGE_META: Record<string, PageMeta> = {
  '/': {
    title: 'RIYAN HEALTH — Healthcare Innovation & Solutions',
    description:
      'RIYAN HEALTH is pioneering healthcare innovation with cutting-edge solutions for wellness, diagnostics, and patient care across Africa and beyond.',
    canonical: `${BASE_URL}/`,
  },
  '/teams': {
    title: 'Our Team — RIYAN HEALTH',
    description:
      'Meet the talented team behind RIYAN HEALTH driving healthcare innovation, research, and digital transformation.',
    canonical: `${BASE_URL}/teams`,
  },
  '/about': {
    title: 'About Us — RIYAN HEALTH',
    description:
      'Learn about RIYAN HEALTH\'s mission to revolutionize healthcare through technology, innovation, and compassionate patient care.',
    canonical: `${BASE_URL}/about`,
  },
  '/partners': {
    title: 'Partners — RIYAN HEALTH',
    description:
      'Discover RIYAN HEALTH\'s strategic partnerships driving healthcare transformation and innovation globally.',
    canonical: `${BASE_URL}/partners`,
  },
  '/investors': {
    title: 'Investors & Partners — RIYAN HEALTH',
    description:
      'Explore investment opportunities and partnerships with RIYAN HEALTH — a leader in healthcare innovation and technology.',
    canonical: `${BASE_URL}/investors`,
  },
  '/blog': {
    title: 'Blog — RIYAN HEALTH',
    description:
      'Stay updated with the latest insights, research, and news from RIYAN HEALTH on healthcare innovation and wellness.',
    canonical: `${BASE_URL}/blog`,
  },
  '/contact': {
    title: 'Contact Us — RIYAN HEALTH',
    description:
      'Get in touch with RIYAN HEALTH. Reach out for partnerships, inquiries, or to learn more about our healthcare solutions.',
    canonical: `${BASE_URL}/contact`,
  },
};

function setMetaTag(name: string, content: string, attribute = 'name') {
  let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SEOHead({ currentPage }: { currentPage: string }) {
  useEffect(() => {
    const meta = PAGE_META[currentPage] || PAGE_META['/'];

    // Title
    document.title = meta.title;

    // Canonical
    setLinkTag('canonical', meta.canonical);

    // Meta description
    setMetaTag('description', meta.description);

    // Open Graph
    setMetaTag('og:title', meta.ogTitle || meta.title, 'property');
    setMetaTag('og:description', meta.ogDescription || meta.description, 'property');
    setMetaTag('og:url', meta.canonical, 'property');
    setMetaTag('og:type', 'website', 'property');
    setMetaTag('og:site_name', 'RIYAN HEALTH', 'property');

    // Twitter Card
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', meta.ogTitle || meta.title);
    setMetaTag('twitter:description', meta.ogDescription || meta.description);
  }, [currentPage]);

  return null;
}
