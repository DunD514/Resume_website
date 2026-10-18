import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://duncan-portfolio.onrender.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Duncan D'Lima | Data Scientist & Applied AI Engineer",
  description:
    "Portfolio of Duncan D'Lima — CTO & Co-Founder at Tekkloom, B.Tech Data Science (3.89 CGPA). Machine learning, data engineering, and applied AI systems.",
  keywords: [
    "Duncan D'Lima",
    "Data Scientist",
    "Applied AI Engineer",
    "Software Developer",
    "Tekkloom",
    "Machine Learning",
    "Deepfake Detection",
    "DuckDB",
    "PyTorch",
    "Next.js",
  ],
  authors: [{ name: "Duncan D'Lima", url: "https://github.com/DunD514" }],
  creator: "Duncan D'Lima",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Duncan D'Lima | Data Scientist & Applied AI Engineer",
    description:
      "From raw data to real-world systems. Machine learning, data engineering, and applied AI.",
    siteName: "Duncan D'Lima Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Duncan D'Lima — Data Scientist & Applied AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Duncan D'Lima | Data Scientist & Applied AI Engineer",
    description: "From raw data to real-world systems. Machine learning, data engineering, and applied AI.",
    creator: "@DunD514",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#060608",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Duncan D'Lima",
    jobTitle: "CTO & Co-Founder",
    worksFor: {
      "@type": "Organization",
      name: "Tekkloom",
      url: "https://github.com/tekkloom-a11y",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "SVKM's NMIMS MPSTME",
    },
    url: siteUrl,
    sameAs: [
      "https://github.com/DunD514",
      "https://github.com/tekkloom-a11y",
      "https://linkedin.com/in/duncan-dlima",
    ],
    description:
      "Data Scientist, Applied AI Engineer, Software Developer. CTO & Co-Founder at Tekkloom.",
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#060608] text-[#f4f4f6] antialiased selection:bg-[#ff7a1a]/20 selection:text-white">
        {children}
      </body>
    </html>
  );
}
