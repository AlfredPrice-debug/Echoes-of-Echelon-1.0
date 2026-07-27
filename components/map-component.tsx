'use client';

import { useSyncExternalStore } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const mapImage = 'https://picsum.photos/seed/echelonmap/1000/1000';
const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];

const locations = [
  { id: 'echelon-city', name: 'Echelon City', coords: [300, 550] as [number, number], desc: 'The capital and seat of the Vynn-Guard Council.' },
  { id: 'hyacinth-city', name: 'Hyacinth City', coords: [700, 750] as [number, number], desc: 'A northern coastal settlement near the Northechelon Sea.' },
  { id: 'new-et-tu-brutus', name: 'New Et-tu Brutus', coords: [800, 300] as [number, number], desc: 'A castle stronghold in the mountainous northwest.' },
  { id: 'felius-desert', name: 'Felius Desert', coords: [800, 500] as [number, number], desc: 'A vast, arid expanse to the north.' },
  { id: 'raven-tribe', name: 'Raven Tribe', coords: [350, 150] as [number, number], desc: 'The ancestral home of the near-extinct Raven Clan.' },
  { id: 'queen-freiyas', name: 'Queen Freiya\'s', coords: [150, 300] as [number, number], desc: 'A southern kingdom ruled by Queen Freiya.' },
];

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const createCustomIcon = () => {
  return L.divIcon({
    html: `<div class="w-6 h-6 bg-gold border-2 border-navy rounded-full shadow-md flex items-center justify-center"><div class="w-2 h-2 bg-navy rounded-full"></div></div>`,
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

  const icon = createCustomIcon();
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
              <button className="mt-3 w-full bg-navy text-gold py-1 rounded font-cinzel text-sm hover:bg-navy/90 transition-colors">
                View Lore
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
