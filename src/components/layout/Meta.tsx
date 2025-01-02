import React from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
}

export default function Meta({ 
  title, 
  description = 'Modern E-commerce Store with the latest products and best deals',
  keywords = ['ecommerce', 'online shopping', 'retail'],
  image = '/logo.png'
}: Props) {
  return (
    <Helmet>
      <title>{title} | EStore</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}