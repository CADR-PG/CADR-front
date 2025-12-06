import 'leaflet/dist/leaflet.css';
import '../css/1-pages/user-location-map.scss';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { mockLocations } from "../data/mockUserLocations";
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';

export default function UserLocationMap() {
  const [locations, setLocations] = useState(mockLocations);

  useAuth();

  const center = locations.length > 0
    ? [locations[0].latitude, locations[0].longitude]
    : [0, 0];
  const defaultZoom = locations.length > 0 ? 6 : 2;

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer center={center} zoom={defaultZoom} className="user-map">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {locations.map(loc => (
            <Marker key={loc.id} position={[loc.latitude, loc.longitude]}>
              <Popup>
                <b>{loc.city}, {loc.country}</b><br />
                {new Date(loc.timestamp).toLocaleString()}<br />
                IP: {loc.ipAddress}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
