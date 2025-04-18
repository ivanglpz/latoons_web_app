// components/SEO.js

import Head from "next/head";
import Script from "next/script";

type Props = {
  title: string;
  description: string;
  keywords: string;
  image: string;
  url: string; // Nuevo parámetro URL
};

const googleAnalytics = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;
const urlAnalytics = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`;
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const Seo = ({ title, description, keywords, image, url }: Props) => {
  return (
    <>
      <Script src={urlAnalytics} />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${googleAnalytics}');
        `}
      </Script>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        {/* <link rel="icon" type="image/png" href={`/icon.svg`} /> */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=7" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta name="keywords" content={keywords} />
        <meta
          name="google-site-verification"
          content={GOOGLE_SITE_VERIFICATION}
        />
        {/* Googlebot settings */}
        <meta name="googlebot" content="index,follow" />

        {/* Open Graph and Twitter meta tags for social sharing */}
        <meta property="og:locale" content="es_ES" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={image} />
        <meta property="og:image:secure_url" content={image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />

        {/* Twitter Card data */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:image" content={image} />

        {/* Schema.org for Google Rich Snippets */}
        <script type="application/ld+json">
          {`
          {
            "@context": "http://schema.org",
            "@type": "WebSite",
            "name": "${title}",
            "url": "${url}",
            "description": "${description}",
            "image": "${image}"
          }
        `}
        </script>
        {/* Add more Open Graph and Twitter meta tags if needed, e.g., for additional social sharing features. */}
      </Head>
    </>
  );
};
