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

  const raw: unknown =
    (data as unknown as Record<string, unknown>)?.data ?? data;

  const toString = (v: unknown) =>
    typeof v === 'string' ? v : v === undefined || v === null ? '' : String(v);
  const toNumber = (v: unknown) => {
    const n = Number(v as unknown);
    return Number.isFinite(n) ? n : NaN;
  };

  const normalize = (item: unknown, idx: number): NormalizedLocation => {
    if (typeof item !== 'object' || item === null) {
      return {
        id: `loc_${idx}`,
        timestamp: '',
        ipAddress: '',
        city: '',
        country: '',
        latitude: NaN,
        longitude: NaN,
      };
    }
    const obj = item as Record<string, unknown>;

    const latitude = toNumber(obj.latitude ?? obj.lat);
    const longitude = toNumber(obj.longitude ?? obj.lon ?? obj.lng);

    const ipAddr = toString(obj.ipAddress ?? obj.ip);
    const idFromIp = ipAddr ? `${ipAddr}_${idx}` : `loc_${idx}`;

    return {
      id: toString(obj.id ?? idFromIp),
      timestamp:
        toString(obj.timestamp ?? obj.occuredAt ?? obj.occurredAt) ?? '',
      ipAddress: ipAddr,
      city: toString(obj.city ?? ''),
      country: toString(obj.country ?? ''),
      latitude,
      longitude,
    };
  };

  let locations: NormalizedLocation[] = [];
  if (Array.isArray(raw)) {
    locations = (raw as unknown[])
      .map(normalize)
      .filter(
        (l) => Number.isFinite(l.latitude) && Number.isFinite(l.longitude),
      );
  } else {
    const maybeLogs =
      typeof raw === 'object' && raw !== null
        ? (raw as Record<string, unknown>)?.logs
        : undefined;
    if (Array.isArray(maybeLogs)) {
      locations = (maybeLogs as unknown[])
        .map(normalize)
        .filter(
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
