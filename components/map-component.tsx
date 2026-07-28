'use client';

import { useSyncExternalStore } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const mapImage = '/images/alistair-map.png';
const bounds: L.LatLngBoundsExpression = [[0, 0], [1376, 768]];

const locations = [
  { id: 'north-city', name: 'North City', coords: [977, 369] as [number, number], desc: 'A great walled city rising from the desert dunes, its spiral streets encircling the King\'s seat.' },
  { id: 'kuuz-duma', name: 'Kuuz-Duma', coords: [1142, 154] as [number, number], desc: 'An ancient fortress carved into the frozen peaks of the Frostfell Tundra.' },
  { id: 'double-bridge', name: 'Great Alistair\'s Double Bridge', coords: [716, 330] as [number, number], desc: 'The twin-bridged island city at the heart of the South Echelon Sea.' },
  { id: 'gloomwood', name: 'Gloomwood', coords: [413, 630] as [number, number], desc: 'Crumbling ruins swallowed by the shadowed trees of Gloomwood.' },
];

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const createLocationIcon = () => {
  return L.divIcon({
    html: `<div class="w-6 h-6 bg-green-500 border-2 border-navy rounded-full shadow-md flex items-center justify-center"><div class="w-2 h-2 bg-navy rounded-full"></div></div>`,
    className: 'custom-leaflet-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

export default function MapComponent() {
  const isClient = useIsClient();

  if (!isClient) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-navy text-gold font-cinzel text-xl animate-pulse">
        Loading Echelon Map...
      </div>
    );
  }

  const icon = createLocationIcon();
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

      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.coords} icon={icon}>
          <Popup className="font-lora">
            <div className="p-2 min-w-[200px]">
              <h3 className="text-xl font-cinzel text-navy font-bold mb-2 border-b border-gold pb-1">{loc.name}</h3>
              <p className="text-sm text-navy/80">{loc.desc}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
