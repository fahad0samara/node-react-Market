import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export default function SEO({
  title,
  description = 'Modern E-commerce Store with the latest products and best deals',
  keywords = ['ecommerce', 'online shopping', 'retail'],
  image = '/logo.png',
  url = window.location.href,
}: Props) {
  const siteTitle = `${title} | EStore`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}