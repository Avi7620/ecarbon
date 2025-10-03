import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'eCARBON - Carbon Credit Marketplace',
  description: 'Offset your carbon footprint with verified carbon credits from sustainable projects worldwide',
  keywords: [
    'carbon credits', 
    'carbon offset', 
    'sustainable projects', 
    'carbon trading', 
    'eco-friendly investments', 
    'carbon footprint reduction', 
    'carbon credit marketplace','ecarbon','eCARBON','ecarbon render',
    'best website for carbon credits','carbon credits website','carbon credits platform','low price carbon credits','carbon credits for sale',
    'carbon credits online','carbon credits trading','carbon credits exchange','carbon credits projects','carbon credits providers',
    'carbon credits companies','carbon credits services','carbon credits solutions','carbon credits management','carbon credits consulting',
    'carbon credits verification','carbon credits certification','carbon credits standards','carbon credits regulations','carbon credits policies',
    'carbon credits impact','carbon credits benefits','carbon credits advantages','carbon credits opportunities','carbon credits challenges',
    'carbon credits trends','carbon credits innovations','carbon credits technologies','carbon credits research','carbon credits development',
    'carbon credits education','carbon credits awareness','carbon credits advocacy','carbon credits activism','carbon credits community',
    'carbon credits network','carbon credits partnerships','carbon credits collaborations','carbon credits alliances','carbon credits coalitions',
    'carbon credits initiatives','carbon credits campaigns','carbon credits movements','carbon credits events','carbon credits conferences',
    'carbon credits workshops','carbon credits seminars','carbon credits webinars','carbon credits podcasts','carbon credits blogs',
  ],
  authors: [{ name: 'eCARBON', url: 'https://ecarbon5.onrender.com' }],
  openGraph: {
    title: 'eCARBON - Carbon Credit Marketplace',
    description: 'Offset your carbon footprint with verified carbon credits from sustainable projects worldwide',
    url: 'https://ecarbon5.onrender.com',
    siteName: 'eCARBON',
    images: [
      {
        url: 'https://ecarbon.com/https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
        width: 1200,
        height: 630,
        alt: 'eCARBON - Carbon Credit Marketplace',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eCARBON - Carbon Credit Marketplace',
    description: 'Offset your carbon footprint with verified carbon credits from sustainable projects worldwide',
    site: '@eCARBON',
    creator: '@eCARBON',
    images: ['https://ecarbon.com/https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Head>
          {/* Extra meta tags if needed */}
          <meta name="robots" content="index, follow" />
          <meta name="theme-color" content="#0A9D58" />
        </Head>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
