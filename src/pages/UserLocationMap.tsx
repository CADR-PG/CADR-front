import 'leaflet/dist/leaflet.css';
import '../css/1-pages/user-location-map.scss';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';
import type NormalizedLocation from '../types/NormalizedLocation';
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
  const { data: locations } = useLocationLogs();

  useAuth();

  const MAPBOX_TOKEN: string | undefined = (
    import.meta as unknown as {
      env?: { VITE_MAPBOX_TOKEN?: string };
    }
  ).env?.VITE_MAPBOX_TOKEN;

  const locArray: NormalizedLocation[] = Array.isArray(locations)
    ? (locations as NormalizedLocation[])
    : [];

  const validLocations = locArray.map((l: NormalizedLocation) => ({
    ...l,
    latitude: Number(l.latitude),
    longitude: Number(l.longitude),
  }));

  const center: [number, number] =
    validLocations.length > 0
      ? [validLocations[0].latitude, validLocations[0].longitude]
      : [0, 0];
  const defaultZoom = validLocations.length > 0 ? 6 : 2;

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer key={`${center[0]},${center[1]}`} className="user-map">
          <TileLayer
            {...{
              url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_TOKEN ?? ''}`,
              attribution:
                '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              tileSize: 512,
              zoomOffset: -1,
            }}
          />
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
