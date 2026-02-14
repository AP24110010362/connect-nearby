import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useAppStore } from '@/store/appStore';
import { createUserIcon, createEventIcon, createCurrentUserIcon } from './MapMarkers';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// India bounds
const INDIA_BOUNDS: L.LatLngBoundsExpression = [
  [6.5, 68.0],   // SW
  [35.5, 97.5],  // NE
];

export default function CommunityMap() {
  const { nearbyUsers, events, currentUser, setSelectedUser } = useAppStore();

  const center: [number, number] = currentUser
    ? [currentUser.lat, currentUser.lng]
    : [28.5459, 77.1926];

  return (
    <MapContainer
      center={center}
      zoom={15}
      className="w-full h-full"
      zoomControl={false}
      attributionControl={false}
      minZoom={5}
      maxBounds={INDIA_BOUNDS}
      maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {currentUser && (
        <Marker
          position={[currentUser.lat, currentUser.lng]}
          icon={createCurrentUserIcon()}
        />
      )}

      {nearbyUsers.map((user) => (
        <Marker
          key={user.id}
          position={[user.lat, user.lng]}
          icon={createUserIcon(user.status, user.avatar)}
          eventHandlers={{
            click: () => setSelectedUser(user),
          }}
        />
      ))}

      {events.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={createEventIcon(event.emoji)}
        />
      ))}
    </MapContainer>
  );
}
