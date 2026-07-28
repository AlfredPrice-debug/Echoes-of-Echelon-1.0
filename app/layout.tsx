import type {Metadata} from 'next';
import { Cinzel, EB_Garamond, IBM_Plex_Mono } from 'next/font/google';
import './globals.css'; // Global styles
import { Navigation } from '@/components/navigation';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});

export const metadata: Metadata = {
  title: 'Echoes of Echelon',
  description: 'D&D Companion App',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${garamond.variable} ${plexMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="bg-parchment-50 text-ink-900 font-garamond text-base antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <main className="flex-1 overflow-y-auto pb-16">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
