'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-navy text-gold font-cinzel text-2xl animate-pulse">
      Loading Echelon...
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="fixed inset-0 z-0 bg-navy">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-navy/90 to-transparent pointer-events-none">
        <h1 className="text-3xl font-cinzel text-gold text-center drop-shadow-md">Echelon Map</h1>
      </div>
      <MapComponent />
    </div>
  );
}
