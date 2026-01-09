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
  }, [center, zoom, map]);
  return null;
}

export default function UserLocationMap() {

  const { data } = useLocationLogs();

  useAuth();

  if (!data) return null;

  const raw = (data as any)?.data ?? data;

  const normalize = (item: any, idx: number): NormalizedLocation => {
    const latitude = Number(item.latitude ?? item.lat ?? NaN);
    const longitude = Number(
      item.longitude ?? item.lon ?? item.lng ?? NaN,
    );
    return {
      id: item.id ?? `${(item.ipAddress ?? 'loc') as string}_${idx}`,
      timestamp:
        (item.timestamp as string) ??
        (item.occuredAt as string) ??
        (item.occurredAt as string) ??
        '',
      ipAddress: (item.ipAddress ?? item.ip ?? '') as string,
      city: (item.city ?? '') as string,
      country: (item.country ?? '') as string,
      latitude,
      longitude,
    };
  };

  let locations: NormalizedLocation[] = [];
  if (Array.isArray(raw)) {
    locations = (raw as any[]).map(normalize).filter(
      (l) => Number.isFinite(l.latitude) && Number.isFinite(l.longitude),
    );
  } else {
    const maybeLogs = (raw as { logs?: unknown })?.logs;
    if (Array.isArray(maybeLogs)) {
      locations = (maybeLogs as any[]).map(normalize).filter(
        (l) => Number.isFinite(l.latitude) && Number.isFinite(l.longitude),
      );
    }
  }
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
