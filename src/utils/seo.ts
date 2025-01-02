// SEO utility functions
export const generateMetaTags = (data: {
  title: string;
  description: string;
  image?: string;
  url: string;
}) => {
  return {
    title: `${data.title} | EStore`,
    meta: [
      {
        name: 'description',
        content: data.description,
      },
      {
        property: 'og:title',
        content: data.title,
      },
      {
        property: 'og:description',
        content: data.description,
      },
      {
        property: 'og:image',
        content: data.image || '/default-og-image.jpg',
      },
      {
        property: 'og:url',
        content: data.url,
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  };
};