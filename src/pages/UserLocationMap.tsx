import 'leaflet/dist/leaflet.css';
import '../css/1-pages/user-location-map.scss';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';
import { fetchLocationLogs } from '../api/client';

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

type LocationRaw = {
  id?: string;
  ipAddress?: string;
  ip?: string;
  timestamp?: string;
  occuredAt?: string;
  occurredAt?: string;
  city?: string;
  country?: string;
  latitude?: number | string;
  longitude?: number | string;
  lat?: number | string;
  lon?: number | string;
  lng?: number | string;
  [key: string]: unknown;
};

type NormalizedLocation = {
  id: string;
  timestamp: string;
  ipAddress: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};

export default function UserLocationMap() {
  const [locations, setLocations] = useState<NormalizedLocation[]>([]);

  useAuth();

  useEffect(() => {
    let mounted = true;
    const getLocationLogs = async () => {
      try {
        const resp = await fetchLocationLogs();
        console.log('fetchLocationLogs resp:', resp);
        console.log('fetchLocationLogs resp.data:', resp?.data);
        const raw = resp?.data ?? resp;
        console.log('raw logs:', raw);

        const normalize = (
          item: LocationRaw,
          idx: number,
        ): NormalizedLocation => ({
          id: item.id ?? `${(item.ipAddress ?? 'loc') as string}_${idx}`,
          timestamp:
            (item.timestamp as string) ??
            (item.occuredAt as string) ??
            (item.occurredAt as string) ??
            '',
          ipAddress: (item.ipAddress ?? item.ip ?? '') as string,
          city: (item.city ?? '') as string,
          country: (item.country ?? '') as string,
          latitude: Number(item.latitude ?? item.lat ?? 0),
          longitude: Number(item.longitude ?? item.lon ?? item.lng ?? 0),
        });

        if (!mounted) return;

        let normalized: NormalizedLocation[] = [];
        if (Array.isArray(raw)) {
          normalized = (raw as LocationRaw[]).map(normalize);
        } else {
          const maybeLogs = (raw as { logs?: unknown })?.logs;
          if (Array.isArray(maybeLogs)) {
            normalized = (maybeLogs as LocationRaw[]).map(normalize);
          } else {
            normalized = [];
          }
        }

        console.log('normalized locations:', normalized);
        setLocations(normalized);
      } catch (err) {
        console.error('fetchLocationLogs error', err);
      }
    };

    getLocationLogs();
    return () => {
      mounted = false;
    };
  }, []);

  console.log('UserLocationMap locations', locations);

  const validLocations = locations.filter(
    (l: NormalizedLocation) =>
      Number.isFinite(l.latitude) &&
      Number.isFinite(l.longitude) &&
      !(l.latitude === 0 && l.longitude === 0),
  );

  const center: [number, number] =
    validLocations.length > 0
      ? [validLocations[0].latitude, validLocations[0].longitude]
      : [0, 0];
  const defaultZoom = validLocations.length > 0 ? 6 : 2;

  const mapProps = {
    center,
    zoom: defaultZoom,
    className: 'user-map',
    key: String(center[0]) + ',' + String(center[1]),
  } as MapContainerProps;

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer {...mapProps}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Recenter center={center as [number, number]} zoom={defaultZoom} />

          {validLocations.map((loc: NormalizedLocation) => (
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
