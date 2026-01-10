import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';
import type NormalizedLocation from '../types/UserLocationData';
import useLocationLogs from '../hooks/useLocationLogs';

function Recenter({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (Number.isFinite(center[0]) && Number.isFinite(center[1])) {
      map.setView(center, zoom);
    }
  }, []);
  return null;
}

const normalize = (item: unknown): NormalizedLocation => {
  if (typeof item !== 'object' || item === null) {
    return { timestamp: '' } as NormalizedLocation;
  }
  const obj = item as Record<string, unknown>;

  return {
    timestamp: String(obj.occuredAt ?? ''),
  } as NormalizedLocation;
};

export default function UserLocationMap() {
  const { data: response } = useLocationLogs();

  useAuth();

  if (!response) return null;
  const locations = (response.data.logs as unknown[]).map(
    (item) =>
      ({
        ...(item as Record<string, unknown>),
        ...normalize(item),
      }) as NormalizedLocation,
  );

  const center: [number, number] =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [0, 0];
  const defaultZoom = locations.length > 0 ? 6 : 2;

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer key={`${center[0]},${center[1]}`} className="user-map">
          <TileLayer
            {...{
              url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_MAPBOX_TOKEN ?? ''}`,
              attribution:
                '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              tileSize: 512,
              zoomOffset: -1,
            }}
          />
          <Recenter center={center as [number, number]} zoom={defaultZoom} />

          {locations.map((loc: NormalizedLocation) => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <b>
                  {loc.city}, {loc.country}
                </b>
                <br />
                {loc.timestamp ? new Date(loc.timestamp).toLocaleString() : ''}
                <br />
                IP: {loc.ipAddress}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
