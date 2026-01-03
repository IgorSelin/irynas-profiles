import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Екскурсовод Львів | Професійні екскурсії по Львову",
  description: "Професійний екскурсовод у Львові. Організація цікавих та незабутніх екскурсій по історичному центру Львова та околицях. Індивідуальні та групові тури.",
  keywords: "екскурсовод Львів, екскурсії Львів, тури Львів, гід Львів, екскурсії по Львову, львівський екскурсовод, індивідуальні екскурсії Львів, групові тури Львів, історичний центр Львова",
  authors: [{ name: "Екскурсовод Львів" }],
  creator: "Екскурсовод Львів",
  publisher: "Екскурсовод Львів",
  openGraph: {
    title: "Екскурсовод Львів | Професійні екскурсії по Львову",
    description: "Професійний екскурсовод у Львові. Організація цікавих та незабутніх екскурсій по історичному центру Львова та околицях.",
    type: "website",
    locale: "uk_UA",
    siteName: "Екскурсовод Львів",
    images: [
      {
        url: "/images/guide-photo.jpg",
        width: 1200,
        height: 630,
        alt: "Екскурсовод Львів",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Екскурсовод Львів | Професійні екскурсії по Львову",
    description: "Професійний екскурсовод у Львові. Організація цікавих та незабутніх екскурсій.",
    images: ["/images/guide-photo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TouristInformationCenter",
              "name": "Екскурсовод Львів",
              "description": "Професійний екскурсовод у Львові. Організація цікавих та незабутніх екскурсій по історичному центру Львова та околицях.",
              "url": process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Львів",
                "addressRegion": "Львівська область",
                "addressCountry": "UA"
              },
              "areaServed": {
                "@type": "City",
                "name": "Львів"
              },
              "offers": {
                "@type": "Offer",
                "category": "TouristAttraction"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Екскурсовод Львів",
              "jobTitle": "Екскурсовод",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Львів",
                "addressCountry": "UA"
              },
              "knowsAbout": ["Екскурсії", "Туризм", "Історія Львова", "Культура України"]
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

