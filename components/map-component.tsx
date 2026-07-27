'use client';

import { useSyncExternalStore } from 'react';
import { MapContainer, ImageOverlay } from 'react-leaflet';
import L from 'leaflet';

const mapImage = '/images/alistair-map.png';
const bounds: L.LatLngBoundsExpression = [[0, 0], [1376, 768]];

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export default function MapComponent() {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-navy text-gold font-cinzel text-xl animate-pulse">
        Loading Echelon Map...
      </div>
    );
  }

  return (
    <MapContainer
      bounds={bounds}
      maxBounds={bounds}
      zoom={1}
      minZoom={0}
      maxZoom={3}
      scrollWheelZoom={true}
      className="w-full h-full bg-navy z-0"
      attributionControl={false}
      crs={L.CRS.Simple}
    >
      <ImageOverlay url={mapImage} bounds={bounds} />
    </MapContainer>
  );
}
