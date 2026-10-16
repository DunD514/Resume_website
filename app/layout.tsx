import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Duncan D’Lima | Data Scientist, Applied AI Engineer & Software Developer",
  description:
    "Personal portfolio of Duncan D’Lima — B.Tech Data Science (3.89/4.0 CGPA) and CTO & Co-Founder at Tekkloom. Working across machine learning, analytical data pipelines, computer vision, and intelligent software.",
  keywords: [
    "Duncan D’Lima",
    "Data Scientist",
    "Applied AI Engineer",
    "Software Developer",
    "Tekkloom",
    "Machine Learning",
    "Deepfake Detection",
    "DuckDB SQL",
    "PyTorch",
    "Next.js",
  ],
  authors: [{ name: "Duncan D’Lima", url: "https://github.com/DunD514" }],
  creator: "Duncan D’Lima",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://duncandlima.dev",
    title: "Duncan D’Lima | Data Scientist & AI Builder",
    description:
      "Turning data into intelligence and ideas into products. Explore projects in deep learning, analytical SQL, exploratory healthcare ML, and document AI.",
    siteName: "Duncan D’Lima Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Duncan D’Lima | Data Scientist & AI Builder",
    description: "Turning data into intelligence and ideas into products.",
    creator: "@DunD514",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050812",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-[#050812] text-[#F8FAFC] antialiased selection:bg-blue-600/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
