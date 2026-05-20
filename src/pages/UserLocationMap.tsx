import 'leaflet/dist/leaflet.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet';
import { Fragment, useEffect, useMemo } from 'react';
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';
import type UserLocationData from '../types/UserLocationData';
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
    const lat = Number(center[0]);
    const lng = Number(center[1]);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const diameterKm = 50;
    const radiusKm = diameterKm / 2;
    const latDelta = radiusKm / 111;
    const lngDelta = radiusKm / (111 * Math.cos((lat * Math.PI) / 180) || 1);
    const southWest: [number, number] = [lat - latDelta, lng - lngDelta];
    const northEast: [number, number] = [lat + latDelta, lng + lngDelta];

    try {
      map.fitBounds([southWest, northEast], {
        maxZoom: zoom,
        padding: [50, 50],
      });
    } catch {
      map.setView(center, zoom);
    }
  }, [center, map, zoom]);

  return null;
}

function HeatmapLayer({ points }: { points: [number, number, number][] }) {
  const outerRadiusMeters = 250000;
  const midOuterRadiusMeters = 180000;
  const midInnerRadiusMeters = 110000;
  const coreRadiusMeters = 50000;

  return (
    <>
      {points.map(([lat, lng, weight], index) => {
        const yellowOpacity = Math.min(0.35, 0.08 + weight * 0.2);
        const orangeOpacity = Math.min(0.45, 0.12 + weight * 0.25);
        const deepOrangeOpacity = Math.min(0.55, 0.16 + weight * 0.3);
        const redOpacity = Math.min(0.75, 0.24 + weight * 0.4);
        return (
          <Fragment key={`heat-${lat}-${lng}-${index}`}>
            <Circle
              center={[lat, lng]}
              radius={outerRadiusMeters}
              pathOptions={{
                className: 'heatmap-ring--outer',
                fillOpacity: yellowOpacity,
              }}
            />
            <Circle
              center={[lat, lng]}
              radius={midOuterRadiusMeters}
              pathOptions={{
                className: 'heatmap-ring--mid-outer',
                fillOpacity: orangeOpacity,
              }}
            />
            <Circle
              center={[lat, lng]}
              radius={midInnerRadiusMeters}
              pathOptions={{
                className: 'heatmap-ring--mid-inner',
                fillOpacity: deepOrangeOpacity,
              }}
            />
            <Circle
              center={[lat, lng]}
              radius={coreRadiusMeters}
              pathOptions={{
                className: 'heatmap-ring--core',
                fillOpacity: redOpacity,
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

export default function UserLocationMap() {
  const { data: response } = useLocationLogs();

  useAuth();

  const mapboxAccessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN as
    | string
    | undefined;
  const locations = useMemo(() => response?.data?.logs ?? [], [response]);
  const center: [number, number] =
    locations.length > 0
      ? [locations[0].latitude, locations[0].longitude]
      : [0, 0];
  const defaultZoom = locations.length > 0 ? 6 : 2;

  const points = useMemo(() => {
    const buckets = new Map<string, number>();
    for (const l of locations) {
      const lat = Number(l.latitude);
      const lng = Number(l.longitude);
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;
      const key = `${lat.toFixed(4)},${lng.toFixed(4)}`;
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
    const counts = Array.from(buckets.values());
    const maxCount = counts.length > 0 ? Math.max(...counts) : 1;
    const weightMultiplier = 1.5;
    return Array.from(buckets.entries()).map(([k, count]) => {
      const [lat, lng] = k.split(',').map(Number);
      const weight = Math.min(1, (count / maxCount) * weightMultiplier);
      return [lat, lng, weight] as [number, number, number];
    });
  }, [locations]);

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer key={`${center[0]},${center[1]}`} className="user-map">
          {mapboxAccessToken ? (
            <TileLayer
              url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=${mapboxAccessToken}`}
              attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              tileSize={512}
              zoomOffset={-1}
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          )}
          <Recenter center={center as [number, number]} zoom={defaultZoom} />
          <HeatmapLayer points={points} />

          {locations.map((loc: UserLocationData) => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <b>
                  {loc.city}, {loc.country}
                </b>
                <br />
                {loc.occuredAt ? new Date(loc.occuredAt).toLocaleString() : ''}
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
