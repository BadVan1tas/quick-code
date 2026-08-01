export default function SchemaOrg() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://quickcode.com";

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "QuickCode Agency",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "image": `${baseUrl}/logo.png`,
    "description": "Premier full-stack web development agency specializing in Next.js 16, React 19, Firebase, UPI, and Stripe custom application engineering.",
    "founder": {
      "@type": "Person",
      "name": "Shaurya Shashi"
    },
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://github.com",
      "https://twitter.com",
      "https://linkedin.com"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Full-Stack Web Application",
        "price": "1499.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "E-Commerce & Payment Portal",
        "price": "999.00",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Landing Page & UI Redesign",
        "price": "499.00",
        "priceCurrency": "USD"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
}
