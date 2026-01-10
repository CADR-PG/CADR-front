import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
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
    if (Number.isFinite(center[0]) && Number.isFinite(center[1])) {
      map.setView(center, zoom);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}

export default function UserLocationMap() {
  const { data: response } = useLocationLogs();

  useAuth();

  if (!response) return null;
  const locations = response.data.logs;
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
              url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic3p5bW9ucGciLCJhIjoiY21rNGF4NHRwMDVvejNjcjUzZXNrOTV4MCJ9.KgG1tdy6ToVuCHCBZ0Sf9Q`,
              attribution:
                '&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              tileSize: 512,
              zoomOffset: -1,
            }}
          />
          <Recenter center={center as [number, number]} zoom={defaultZoom} />

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
