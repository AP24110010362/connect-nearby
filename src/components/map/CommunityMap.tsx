import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import { useAppStore } from '@/store/appStore';
import { createUserIcon, createEventIcon, createCurrentUserIcon } from './MapMarkers';
import 'leaflet/dist/leaflet.css';

export default function CommunityMap() {
  const { nearbyUsers, events, currentUser, setSelectedUser } = useAppStore();

  const center: [number, number] = currentUser
    ? [currentUser.lat, currentUser.lng]
    : [42.3601, -71.0942];

  return (
    <MapContainer
      center={center}
      zoom={15}
      className="w-full h-full"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {/* Current user marker */}
      {currentUser && (
        <Marker
          position={[currentUser.lat, currentUser.lng]}
          icon={createCurrentUserIcon()}
        />
      )}

      {/* Nearby users */}
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

      {/* Events */}
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
