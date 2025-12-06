import 'leaflet/dist/leaflet.css';
import '../css/1-pages/user-location-map.scss';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { mockLocations } from "../data/mockUserLocations";
import useAuth from '../hooks/useAuth';
import NavBar from './../components/NavBar';

export default function UserLocationMap() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setLocations(mockLocations);
  }, []);

  useAuth();

  if (locations.length === 0) return <p>Brak danych o lokalizacji.</p>;

  const center = [
    locations[0].latitude,
    locations[0].longitude
  ];

  return (
    <div className="container">
      <NavBar />
      <div className="map-wrapper">
        <MapContainer center={center} zoom={6} className="user-map">
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
