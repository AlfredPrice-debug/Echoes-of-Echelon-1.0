'use client';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map-component'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full w-full bg-parchment-50 text-ink-900 text-2xl animate-pulse">
      Loading Echelon...
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="fixed inset-0 z-0 bg-parchment-50">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-parchment-50/90 to-transparent pointer-events-none">
        <h1 className="text-3xl text-ink-900 text-center">Echelon Map</h1>
      </div>
      <MapComponent />
    </div>
  );
}
