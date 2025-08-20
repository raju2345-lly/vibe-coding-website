import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ComedyAI Studio - AI-Generated Comedy for Working Professionals",
  description: "Experience fresh, relatable stand-up comedy created by AI. Interactive comedy generation, multiple AI characters, and daily laughs for ages 25-50.",
  keywords: "AI comedy, stand-up comedy, funny videos, AI entertainment, comedy generator, TikTok comedy",
  openGraph: {
    title: "ComedyAI Studio - AI Comedy That Gets You",
    description: "Interactive AI comedy platform with multiple characters delivering personalized humor",
    url: "https://comedyai-studio.com",
    siteName: "ComedyAI Studio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ComedyAI Studio - AI Comedy Platform",
    description: "Generate personalized comedy with AI characters",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
