import type { Metadata, Viewport } from 'next';
import { Inter, Orbitron, Poppins } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Catálogo Pokémon TCG',
  description: 'Explore e monte seu deck de cartas Pokémon TCG com nosso catálogo interativo',
  keywords: ['pokemon', 'tcg', 'cartas', 'deck', 'catálogo', 'jogos'],
  authors: [{ name: 'Catálogo Pokémon TCG' }],
  openGraph: {
    title: 'Catálogo Pokémon TCG',
    description: 'Explore e monte seu deck de cartas Pokémon TCG',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Catálogo Pokémon TCG',
    description: 'Explore e monte seu deck de cartas Pokémon TCG',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3B82F6',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${orbitron.variable} ${poppins.variable}`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
