import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bebas_Neue } from 'next/font/google';
import "./globals.css";
import ClientLayout from "../components/layouts/ClientLayout";

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Crayont - Modern Web & App Development | GSAP Animations, 3D Design & SaaS Products",
  description: "Crayont builds cutting-edge websites and apps with advanced animations, 3D elements, and modern UI/UX. We specialize in Next.js, Flutter, React Native, GSAP animations, and SaaS product development.",
  keywords: "Crayont, Crayont India, web development, app development, GSAP animations, 3D web design, Next.js development, Flutter apps, React Native, Webflow, Framer, SaaS products, modern web applications, UI UX design, end-to-end development",
  authors: [{ name: "Crayont", url: "https://crayont.com" }, { name: "Riyaz Mohammed", url: "https://www.linkedin.com/in/mohammed--riyaz" }],
  creator: "Crayont",
  publisher: "Crayont India Private Limited",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crayont.com",
    siteName: "Crayont",
    title: "Crayont - Modern Web & App Development | GSAP Animations & 3D Design",
    description: "Build cutting-edge websites and apps with Crayont. We create modern web applications with advanced animations, 3D elements, and exceptional UI/UX using Next.js, Flutter, and GSAP.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Crayont - Modern Web & App Development Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@CrayontOfficial",
    creator: "@CrayontOfficial",
    title: "Crayont - Modern Web & App Development | GSAP Animations & 3D Design",
    description: "Build cutting-edge websites and apps with Crayont. We create modern web applications with advanced animations, 3D elements, and exceptional UI/UX.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://crayont.com",
  },
  other: {
    "product-url": "https://myspace.crayont.com",
    "social-instagram": "https://instagram.com/crayontofficial",
    "social-linkedin": "https://linkedin.com/company/crayont-riyaz",
    "founder-instagram": "https://instagram.com/md.riyazz_",
    "founder-linkedin": "https://www.linkedin.com/in/mohammed--riyaz",
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
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.variable} ${bebasNeue.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}