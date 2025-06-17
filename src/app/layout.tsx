import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
subsets: ["latin"],
variable: "--font-inter",
display: "swap",
});

export const metadata: Metadata = {
title: "Crayont - Premium Digital Agency | Web Development & Design Studio",
description: "Crayont is a leading digital agency specializing in custom web development, UI/UX design, and digital solutions. Transform your business with our expert team.",
keywords: "Crayont, Crayont India, digital agency, web development, UI UX design, custom websites, React development, Next.js development",
authors: [{ name: "Crayont" }],
creator: "Crayont",
publisher: "Crayont India Private Limited",
robots: "index, follow",
openGraph: {
  type: "website",
  locale: "en_US",
  url: "https://crayont.com",
  siteName: "Crayont",
  title: "Crayont - Premium Digital Agency | Web Development & Design",
  description: "Transform your business with Crayont's expert web development and design services. Custom solutions for modern businesses.",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Crayont Digital Agency",
    },
  ],
},
alternates: {
  canonical: "https://crayont.com",
},
icons: {
  icon: [
    { url: '/favicon/favicon.ico' },
    { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
  ],
  apple: [
    { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  ],
},
};

export default function RootLayout({
children,
}: Readonly<{
children: React.ReactNode;
}>) {
return (
  <html lang="en">
    <head>
      <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
      <link rel="icon" href="/favicon/favicon-16x16.png" sizes="16x16" type="image/png" />
      <link rel="icon" href="/favicon/favicon-32x32.png" sizes="32x32" type="image/png" />
      <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
    </head>
    <body className={`${inter.variable} font-sans antialiased`}>
      {children}
    </body>
  </html>
);
}