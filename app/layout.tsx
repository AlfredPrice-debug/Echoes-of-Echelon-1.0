import type {Metadata} from 'next';
import { Cinzel, Lora } from 'next/font/google';
import './globals.css'; // Global styles
import { Navigation } from '@/components/navigation';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Echoes of Echelon',
  description: 'D&D Companion App',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable}`} suppressHydrationWarning>
      <head>
        <meta name="referrer" content="no-referrer" />
      </head>
      <body className="bg-navy text-parchment font-lora antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <main className="flex-1 overflow-y-auto pb-16">
          {children}
        </main>
        <Navigation />
      </body>
    </html>
  );
}
