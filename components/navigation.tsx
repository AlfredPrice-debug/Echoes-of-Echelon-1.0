'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, Users, FileText, BookOpen, Settings, Sword } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Map', icon: Map },
    { href: '/play', label: 'Play', icon: Sword },
    { href: '/character', label: 'Champions', icon: Users },
    { href: '/journal', label: 'Journal', icon: FileText },
    { href: '/lore', label: 'Lore', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-forest-800 border-t border-border-tan/40 flex justify-around p-2 z-50">
      {links.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`focus-ring relative flex flex-col items-center p-2 transition-colors ${
              isActive ? 'text-gold-leaf' : 'text-parchment-100/70 hover:text-parchment-100'
            }`}
          >
            {isActive && (
              <span
                aria-hidden="true"
                className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-gold-leaf"
              />
            )}
            <Icon size={24} />
            <span className="text-xs mt-1 font-cinzel">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
