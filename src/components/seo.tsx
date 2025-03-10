// components/SEO.js

import Head from "next/head";

type Props = {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string; // Nuevo parámetro URL
};

export const Seo = ({ title, description, keywords, image, url }: Props) => {
  const metaTitle = title || "Mi Sitio Web";
  const metaDescription =
    description || "Descripción de mi sitio web para SEO.";
  const metaKeywords = keywords || "desarrollo, programación, Next.js, SEO";
  const metaImage = image || "/default-image.jpg";
  const metaUrl = url || "https://www.misitio.com";

  return (
    <Head>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={metaUrl} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};
