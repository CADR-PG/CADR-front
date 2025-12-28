import 'leaflet/dist/leaflet.css';
import '../css/1-pages/user-location-map.scss';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { MapContainerProps } from 'react-leaflet';
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
  const { locations } = useLocationLogs();
  // kept local state removed — data comes from hook

  useAuth();

  const locArray: NormalizedLocation[] = Array.isArray(locations)
    ? (locations as NormalizedLocation[])
    : [];

  const validLocations = locArray.filter(
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
